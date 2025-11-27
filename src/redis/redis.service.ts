import {
  Injectable,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import Redis from 'ioredis';

interface RedisOptions {
  host: string;
  port: number;
  password: string;
}

/**
 * Serviço Redis para cache de sessões e estado de jogo
 */
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis;

  constructor(@Inject('REDIS_OPTIONS') private readonly options: RedisOptions) {}

  async onModuleInit() {
    this.client = new Redis({
      host: this.options.host,
      port: this.options.port,
      password: this.options.password,
      retryStrategy: (times) => {
        if (times > 3) {
          this.logger.error('Redis connection failed after 3 retries');
          return null; // Stop retrying
        }
        return Math.min(times * 200, 2000);
      },
      lazyConnect: true,
    });

    this.client.on('connect', () => {
      this.logger.log('Redis connected successfully');
    });

    this.client.on('error', (err) => {
      this.logger.error('Redis error:', err.message);
    });

    try {
      await this.client.connect();
    } catch (error) {
      this.logger.warn('Redis not available, running without cache');
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
    }
  }

  /**
   * Verifica se Redis está conectado
   */
  isConnected(): boolean {
    return this.client?.status === 'ready';
  }

  /**
   * Obtém valor do cache
   */
  async get<T>(key: string): Promise<T | null> {
    if (!this.isConnected()) return null;
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      this.logger.error(`Redis GET error for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Define valor no cache com TTL opcional
   */
  async set(key: string, value: any, ttlSeconds?: number): Promise<boolean> {
    if (!this.isConnected()) return false;
    try {
      const serialized = JSON.stringify(value);
      if (ttlSeconds) {
        await this.client.setex(key, ttlSeconds, serialized);
      } else {
        await this.client.set(key, serialized);
      }
      return true;
    } catch (error) {
      this.logger.error(`Redis SET error for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Remove chave do cache
   */
  async del(key: string): Promise<boolean> {
    if (!this.isConnected()) return false;
    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      this.logger.error(`Redis DEL error for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Verifica se chave existe
   */
  async exists(key: string): Promise<boolean> {
    if (!this.isConnected()) return false;
    try {
      return (await this.client.exists(key)) === 1;
    } catch (error) {
      return false;
    }
  }

  /**
   * Incrementa valor numérico
   */
  async incr(key: string): Promise<number | null> {
    if (!this.isConnected()) return null;
    try {
      return await this.client.incr(key);
    } catch (error) {
      this.logger.error(`Redis INCR error for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Define TTL para uma chave existente
   */
  async expire(key: string, ttlSeconds: number): Promise<boolean> {
    if (!this.isConnected()) return false;
    try {
      await this.client.expire(key, ttlSeconds);
      return true;
    } catch (error) {
      return false;
    }
  }

  // ===================================================
  // Métodos específicos para Game Provider
  // ===================================================

  /**
   * Cache de sessão do jogador
   * Key format: session:{token}
   */
  async cacheSession(
    token: string,
    sessionData: {
      playerId: string;
      gameCode: string;
      balance: number;
      operatorId?: string;
    },
    ttlSeconds = 86400, // 24 horas
  ): Promise<boolean> {
    return this.set(`session:${token}`, sessionData, ttlSeconds);
  }

  async getSessionCache(token: string): Promise<{
    playerId: string;
    gameCode: string;
    balance: number;
    operatorId?: string;
  } | null> {
    return this.get(`session:${token}`);
  }

  /**
   * Atualiza apenas o balance da sessão no cache
   */
  async updateSessionBalance(token: string, newBalance: number): Promise<boolean> {
    const session = await this.getSessionCache(token);
    if (!session) return false;
    session.balance = newBalance;
    return this.set(`session:${token}`, session, 86400);
  }

  async invalidateSession(token: string): Promise<boolean> {
    return this.del(`session:${token}`);
  }

  /**
   * Estado de Free Spins
   * Key format: freespins:{playerId}:{gameCode}
   */
  async setFreeSpinsState(
    playerId: string,
    gameCode: string,
    state: {
      remaining: number;
      multiplier: number;
      totalWin: number;
      triggerRoundId: string;
    },
    ttlSeconds = 3600, // 1 hora
  ): Promise<boolean> {
    return this.set(`freespins:${playerId}:${gameCode}`, state, ttlSeconds);
  }

  async getFreeSpinsState(
    playerId: string,
    gameCode: string,
  ): Promise<{
    remaining: number;
    multiplier: number;
    totalWin: number;
    triggerRoundId: string;
  } | null> {
    return this.get(`freespins:${playerId}:${gameCode}`);
  }

  async clearFreeSpinsState(
    playerId: string,
    gameCode: string,
  ): Promise<boolean> {
    return this.del(`freespins:${playerId}:${gameCode}`);
  }

  /**
   * Rate limiting por IP
   * Key format: ratelimit:{ip}
   */
  async checkRateLimit(
    ip: string,
    maxRequests = 100,
    windowSeconds = 60,
  ): Promise<{ allowed: boolean; remaining: number }> {
    if (!this.isConnected()) {
      return { allowed: true, remaining: maxRequests };
    }

    const key = `ratelimit:${ip}`;
    try {
      const current = await this.client.incr(key);
      if (current === 1) {
        await this.client.expire(key, windowSeconds);
      }
      return {
        allowed: current <= maxRequests,
        remaining: Math.max(0, maxRequests - current),
      };
    } catch (error) {
      return { allowed: true, remaining: maxRequests };
    }
  }

  /**
   * Lock distribuído para operações críticas
   * Key format: lock:{resource}
   */
  async acquireLock(
    resource: string,
    ttlSeconds = 30,
  ): Promise<boolean> {
    if (!this.isConnected()) return true; // Permite sem Redis
    const key = `lock:${resource}`;
    try {
      const result = await this.client.set(key, '1', 'EX', ttlSeconds, 'NX');
      return result === 'OK';
    } catch (error) {
      return true;
    }
  }

  async releaseLock(resource: string): Promise<boolean> {
    return this.del(`lock:${resource}`);
  }

  /**
   * Contador de rounds por sessão (para análise)
   * Key format: rounds:{sessionToken}
   */
  async incrementRoundCount(sessionToken: string): Promise<number | null> {
    return this.incr(`rounds:${sessionToken}`);
  }

  async getRoundCount(sessionToken: string): Promise<number> {
    const count = await this.get<number>(`rounds:${sessionToken}`);
    return count || 0;
  }
}
