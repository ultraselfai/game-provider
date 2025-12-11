import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, MoreThanOrEqual } from 'typeorm';
import { AgentPool, PoolPhase } from '../database/entities/agent-pool.entity';
import { PoolTransaction, PoolTransactionType } from '../database/entities/pool-transaction.entity';

/**
 * Resultado da verificação de pagamento
 */
export interface PayoutCheckResult {
  canPay: boolean;
  maxPayout: number;
  maxMultiplier: number;
  currentPhase: PoolPhase;
  effectiveWinChance: number;
  effectiveMaxMultiplier: number;
  poolBalance: number;
  reason?: string;
}

/**
 * Configuração efetiva baseada na fase atual
 */
export interface EffectiveConfig {
  winChance: number;
  maxMultiplier: number;
  phase: PoolPhase;
}

/**
 * Serviço de gerenciamento do Pool de Liquidez
 * 
 * Responsável por:
 * - Gerenciar saldo do pool por agente
 * - Calcular limites de pagamento
 * - Controlar fases (retenção/normal/liberação)
 * - Registrar transações
 */
@Injectable()
export class PoolService {
  private readonly logger = new Logger(PoolService.name);

  constructor(
    @InjectRepository(AgentPool)
    private readonly poolRepository: Repository<AgentPool>,
    @InjectRepository(PoolTransaction)
    private readonly transactionRepository: Repository<PoolTransaction>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Busca ou cria o pool de um agente
   */
  async getOrCreatePool(agentId: string): Promise<AgentPool> {
    let pool = await this.poolRepository.findOne({
      where: { agentId },
    });

    if (!pool) {
      this.logger.log(`[POOL] Criando pool para agente ${agentId}`);
      pool = this.poolRepository.create({
        agentId,
        balance: 0,
        currentPhase: 'retention', // Começa em retenção (pool zerado)
        phaseStartedAt: new Date(),
      });
      pool = await this.poolRepository.save(pool);
    }

    return pool;
  }

  /**
   * Busca o pool de um agente (sem criar)
   */
  async getPool(agentId: string): Promise<AgentPool | null> {
    return this.poolRepository.findOne({
      where: { agentId },
    });
  }

  /**
   * Verifica se pode pagar um prêmio e retorna os limites
   * 
   * Esta é a função principal chamada ANTES do spin
   */
  async checkPayoutLimits(
    agentId: string,
    bet: number,
    cpl: number,
  ): Promise<PayoutCheckResult> {
    const pool = await this.getOrCreatePool(agentId);
    const totalBet = bet * cpl;

    // Atualiza fase automática se habilitado
    const updatedPhase = await this.updatePhaseIfNeeded(pool);
    
    // Calcula limite baseado no pool
    const poolLimit = Number(pool.balance) * (Number(pool.maxRiskPercent) / 100);
    
    // Limite absoluto configurado
    const absoluteLimit = Number(pool.maxAbsolutePayout);
    
    // O menor dos limites prevalece
    const maxPayout = Math.min(poolLimit, absoluteLimit);
    
    // Calcula multiplicador máximo baseado no limite
    const maxMultiplierFromPool = totalBet > 0 ? Math.floor(maxPayout / totalBet) : 0;
    
    // Pega configuração efetiva da fase
    const effectiveConfig = this.getEffectiveConfig(pool);
    
    // O multiplicador máximo é o menor entre: limite do pool e limite da fase
    const effectiveMaxMultiplier = Math.min(
      maxMultiplierFromPool,
      effectiveConfig.maxMultiplier,
    );

    // =========================================================================
    // LÓGICA DO "PONTO ZERO" - Pool zerado ou muito baixo
    // 
    // Quando o pool está zerado/baixo, NÃO bloqueamos o jogo!
    // Apenas reduzimos a winChance para que o jogador perca naturalmente.
    // Isso garante experiência fluida sem mensagens de erro.
    // =========================================================================
    
    let adjustedWinChance = effectiveConfig.winChance;
    let adjustedMaxMultiplier = effectiveMaxMultiplier;
    
    // CASO 1: Pool zerado - winChance vai para 0% (sempre perde)
    if (Number(pool.balance) <= 0) {
      adjustedWinChance = 0;
      adjustedMaxMultiplier = 0;
      this.logger.log(`[POOL] Pool ZERADO - WinChance forçada para 0%`);
    }
    // CASO 2: Pool muito baixo - não consegue pagar nem 3x (menor prêmio)
    else if (effectiveMaxMultiplier < 3) {
      // WinChance extremamente baixa (1-2%) para dar "esperança" ocasional
      // Quando ganhar, vai pagar o mínimo absoluto
      adjustedWinChance = Math.min(2, effectiveConfig.winChance * 0.1);
      adjustedMaxMultiplier = Math.max(1, effectiveMaxMultiplier); // Permite pelo menos 1x
      this.logger.log(`[POOL] Pool MUITO BAIXO - WinChance reduzida para ${adjustedWinChance}%, MaxMult: ${adjustedMaxMultiplier}x`);
    }
    // CASO 3: Pool baixo - pode pagar alguns pequenos prêmios
    else if (effectiveMaxMultiplier < 10) {
      // Reduz winChance proporcionalmente
      const reductionFactor = effectiveMaxMultiplier / 10; // 3x = 30%, 5x = 50%, etc.
      adjustedWinChance = effectiveConfig.winChance * reductionFactor;
      this.logger.log(`[POOL] Pool BAIXO - WinChance reduzida para ${adjustedWinChance.toFixed(1)}%, MaxMult: ${adjustedMaxMultiplier}x`);
    }

    // NUNCA bloqueia o jogo - apenas ajusta as chances
    // O jogo SEMPRE pode ser jogado, apenas as chances de ganhar variam
    const canPay = true; // Sempre permite jogar

    const result: PayoutCheckResult = {
      canPay,
      maxPayout,
      maxMultiplier: adjustedMaxMultiplier,
      currentPhase: updatedPhase,
      effectiveWinChance: adjustedWinChance, // Usa chance ajustada!
      effectiveMaxMultiplier: adjustedMaxMultiplier,
      poolBalance: Number(pool.balance),
      reason: undefined, // Nunca mostra erro ao usuário
    };

    this.logger.debug(`[POOL] Check para agente ${agentId}: ` +
      `Balance=${pool.balance}, Phase=${updatedPhase}, ` +
      `MaxPayout=${maxPayout.toFixed(2)}, MaxMulti=${effectiveMaxMultiplier}, ` +
      `WinChance=${effectiveConfig.winChance}%`);

    return result;
  }

  /**
   * Retorna a configuração efetiva baseada na fase atual
   */
  getEffectiveConfig(pool: AgentPool): EffectiveConfig {
    switch (pool.currentPhase) {
      case 'retention':
        return {
          winChance: Number(pool.retentionWinChance),
          maxMultiplier: pool.retentionMaxMultiplier,
          phase: 'retention',
        };
      case 'release':
        return {
          winChance: Number(pool.releaseWinChance),
          maxMultiplier: pool.releaseMaxMultiplier,
          phase: 'release',
        };
      case 'normal':
      default:
        return {
          winChance: Number(pool.normalWinChance),
          maxMultiplier: pool.normalMaxMultiplier,
          phase: 'normal',
        };
    }
  }

  /**
   * Atualiza a fase automaticamente se necessário
   */
  async updatePhaseIfNeeded(pool: AgentPool): Promise<PoolPhase> {
    // Se fase é manual ou auto-fase desabilitada, mantém
    if (pool.phaseManual || !pool.autoPhaseEnabled) {
      // Verifica se fase agendada expirou
      if (pool.phaseEndsAt && new Date() > pool.phaseEndsAt) {
        pool.phaseManual = false;
        pool.phaseEndsAt = null;
        // Continua para recalcular fase automática
      } else {
        return pool.currentPhase;
      }
    }

    const balance = Number(pool.balance);
    const retentionThreshold = Number(pool.retentionThreshold);
    const releaseThreshold = Number(pool.releaseThreshold);
    
    let newPhase: PoolPhase = pool.currentPhase;

    if (balance < retentionThreshold) {
      newPhase = 'retention';
    } else if (balance >= releaseThreshold) {
      newPhase = 'release';
    } else {
      newPhase = 'normal';
    }

    // Só atualiza se mudou
    if (newPhase !== pool.currentPhase) {
      this.logger.log(`[POOL] Mudança automática de fase: ${pool.currentPhase} → ${newPhase} (balance: ${balance})`);
      pool.currentPhase = newPhase;
      pool.phaseStartedAt = new Date();
      await this.poolRepository.save(pool);
    }

    return newPhase;
  }

  /**
   * Registra uma aposta (entrada no pool)
   * 
   * Chamado quando jogador faz um spin
   */
  async recordBet(
    agentId: string,
    amount: number,
    context: {
      sessionId?: string;
      roundId?: string;
      gameCode?: string;
      playerId?: string;
    },
  ): Promise<AgentPool> {
    return this.dataSource.transaction(async (manager) => {
      const poolRepo = manager.getRepository(AgentPool);
      const txRepo = manager.getRepository(PoolTransaction);

      // Lock para evitar race condition
      const pool = await poolRepo.findOne({
        where: { agentId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!pool) {
        throw new Error(`Pool não encontrado para agente ${agentId}`);
      }

      const balanceBefore = Number(pool.balance);
      const balanceAfter = balanceBefore + amount;

      // Atualiza pool
      pool.balance = balanceAfter;
      pool.totalBets = Number(pool.totalBets) + amount;
      pool.totalSpins = pool.totalSpins + 1;

      await poolRepo.save(pool);

      // Registra transação
      const tx = txRepo.create({
        poolId: pool.id,
        type: 'bet' as PoolTransactionType,
        amount: amount,
        balanceBefore,
        balanceAfter,
        sessionId: context.sessionId,
        roundId: context.roundId,
        gameCode: context.gameCode,
        playerId: context.playerId,
        phase: pool.currentPhase,
        betAmount: amount,
      });

      await txRepo.save(tx);

      this.logger.debug(`[POOL] Bet registrado: +${amount.toFixed(2)} | Balance: ${balanceAfter.toFixed(2)}`);

      return pool;
    });
  }

  /**
   * Registra um pagamento de prêmio (saída do pool)
   * 
   * Chamado quando jogador ganha
   */
  async recordPayout(
    agentId: string,
    amount: number,
    multiplier: number,
    context: {
      sessionId?: string;
      roundId?: string;
      gameCode?: string;
      playerId?: string;
      betAmount?: number;
    },
  ): Promise<AgentPool> {
    return this.dataSource.transaction(async (manager) => {
      const poolRepo = manager.getRepository(AgentPool);
      const txRepo = manager.getRepository(PoolTransaction);

      // Lock para evitar race condition
      const pool = await poolRepo.findOne({
        where: { agentId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!pool) {
        throw new Error(`Pool não encontrado para agente ${agentId}`);
      }

      const balanceBefore = Number(pool.balance);
      const balanceAfter = balanceBefore - amount;

      // Atualiza pool
      pool.balance = balanceAfter;
      pool.totalPayouts = Number(pool.totalPayouts) + amount;
      pool.totalWins = pool.totalWins + 1;

      // Atualiza maior prêmio se necessário
      if (amount > Number(pool.biggestPayout)) {
        pool.biggestPayout = amount;
      }

      await poolRepo.save(pool);

      // Registra transação
      const tx = txRepo.create({
        poolId: pool.id,
        type: 'payout' as PoolTransactionType,
        amount: -amount, // Negativo pois é saída
        balanceBefore,
        balanceAfter,
        sessionId: context.sessionId,
        roundId: context.roundId,
        gameCode: context.gameCode,
        playerId: context.playerId,
        phase: pool.currentPhase,
        betAmount: context.betAmount,
        multiplier,
      });

      await txRepo.save(tx);

      this.logger.debug(`[POOL] Payout registrado: -${amount.toFixed(2)} (${multiplier}x) | Balance: ${balanceAfter.toFixed(2)}`);

      return pool;
    });
  }

  /**
   * Processa um spin completo (bet + possível payout)
   * 
   * Método de conveniência que faz tudo em uma transação
   */
  async processSpin(
    agentId: string,
    betAmount: number,
    payoutAmount: number,
    multiplier: number,
    context: {
      sessionId?: string;
      roundId?: string;
      gameCode?: string;
      playerId?: string;
    },
  ): Promise<AgentPool> {
    return this.dataSource.transaction(async (manager) => {
      const poolRepo = manager.getRepository(AgentPool);
      const txRepo = manager.getRepository(PoolTransaction);

      // Lock para evitar race condition
      let pool = await poolRepo.findOne({
        where: { agentId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!pool) {
        // Cria pool se não existe
        pool = poolRepo.create({
          agentId,
          balance: 0,
          currentPhase: 'retention',
          phaseStartedAt: new Date(),
        });
        pool = await poolRepo.save(pool);
      }

      const balanceBefore = Number(pool.balance);
      
      // Primeiro: registra a aposta (entrada)
      const balanceAfterBet = balanceBefore + betAmount;
      
      // Segundo: registra o payout se houver (saída)
      const balanceAfter = balanceAfterBet - payoutAmount;
      const isWin = payoutAmount > 0;

      // Atualiza pool
      pool.balance = balanceAfter;
      pool.totalBets = Number(pool.totalBets) + betAmount;
      pool.totalSpins = pool.totalSpins + 1;

      if (isWin) {
        pool.totalPayouts = Number(pool.totalPayouts) + payoutAmount;
        pool.totalWins = pool.totalWins + 1;

        if (payoutAmount > Number(pool.biggestPayout)) {
          pool.biggestPayout = payoutAmount;
        }
      }

      await poolRepo.save(pool);

      // Registra transação de BET
      const betTx = txRepo.create({
        poolId: pool.id,
        type: 'bet' as PoolTransactionType,
        amount: betAmount,
        balanceBefore,
        balanceAfter: balanceAfterBet,
        sessionId: context.sessionId,
        roundId: context.roundId,
        gameCode: context.gameCode,
        playerId: context.playerId,
        phase: pool.currentPhase,
        betAmount: betAmount,
      });
      await txRepo.save(betTx);

      // Registra transação de PAYOUT se ganhou
      if (isWin) {
        const payoutTx = txRepo.create({
          poolId: pool.id,
          type: 'payout' as PoolTransactionType,
          amount: -payoutAmount,
          balanceBefore: balanceAfterBet,
          balanceAfter,
          sessionId: context.sessionId,
          roundId: context.roundId,
          gameCode: context.gameCode,
          playerId: context.playerId,
          phase: pool.currentPhase,
          betAmount: betAmount,
          multiplier,
        });
        await txRepo.save(payoutTx);
      }

      // Log consolidado
      const netChange = betAmount - payoutAmount;
      const emoji = isWin ? '💰' : '✅';
      this.logger.log(`[POOL] ${emoji} Spin processado: Bet=${betAmount}, Payout=${payoutAmount} (${multiplier}x), Net=${netChange >= 0 ? '+' : ''}${netChange.toFixed(2)} | Balance: ${balanceAfter.toFixed(2)}`);

      return pool;
    });
  }

  /**
   * Define fase manualmente
   */
  async setPhase(
    agentId: string,
    phase: PoolPhase,
    duration?: number, // em minutos
  ): Promise<AgentPool> {
    const pool = await this.getOrCreatePool(agentId);

    pool.currentPhase = phase;
    pool.phaseManual = true;
    pool.phaseStartedAt = new Date();
    
    if (duration) {
      pool.phaseEndsAt = new Date(Date.now() + duration * 60 * 1000);
    } else {
      pool.phaseEndsAt = null;
    }

    await this.poolRepository.save(pool);

    this.logger.log(`[POOL] Fase definida manualmente: ${phase} (duração: ${duration ? duration + 'min' : 'indefinido'})`);

    return pool;
  }

  /**
   * Volta para modo automático
   */
  async setAutoPhase(agentId: string): Promise<AgentPool> {
    const pool = await this.getOrCreatePool(agentId);

    pool.phaseManual = false;
    pool.phaseEndsAt = null;

    // Recalcula fase baseado no balance atual
    await this.updatePhaseIfNeeded(pool);

    await this.poolRepository.save(pool);

    this.logger.log(`[POOL] Modo automático ativado. Fase atual: ${pool.currentPhase}`);

    return pool;
  }

  /**
   * Atualiza configurações do pool
   */
  async updateConfig(
    agentId: string,
    config: Partial<{
      maxRiskPercent: number;
      maxAbsolutePayout: number;
      minPoolForPlay: number;
      retentionThreshold: number;
      releaseThreshold: number;
      autoPhaseEnabled: boolean;
      retentionWinChance: number;
      retentionMaxMultiplier: number;
      normalWinChance: number;
      normalMaxMultiplier: number;
      releaseWinChance: number;
      releaseMaxMultiplier: number;
    }>,
  ): Promise<AgentPool> {
    const pool = await this.getOrCreatePool(agentId);

    Object.assign(pool, config);

    await this.poolRepository.save(pool);

    this.logger.log(`[POOL] Configurações atualizadas para agente ${agentId}`);

    return pool;
  }

  /**
   * Busca histórico de transações
   */
  async getTransactions(
    poolId: string,
    options?: {
      type?: PoolTransactionType;
      gameCode?: string;
      limit?: number;
      offset?: number;
    },
  ): Promise<{ transactions: PoolTransaction[]; total: number }> {
    const query = this.transactionRepository.createQueryBuilder('tx')
      .where('tx.pool_id = :poolId', { poolId })
      .orderBy('tx.created_at', 'DESC');

    if (options?.type) {
      query.andWhere('tx.type = :type', { type: options.type });
    }

    if (options?.gameCode) {
      query.andWhere('tx.game_code = :gameCode', { gameCode: options.gameCode });
    }

    const total = await query.getCount();

    if (options?.limit) {
      query.limit(options.limit);
    }

    if (options?.offset) {
      query.offset(options.offset);
    }

    const transactions = await query.getMany();

    return { transactions, total };
  }

  /**
   * Depósito manual (admin)
   */
  async manualDeposit(
    agentId: string,
    amount: number,
    note?: string,
    ipAddress?: string,
  ): Promise<AgentPool> {
    return this.dataSource.transaction(async (manager) => {
      const poolRepo = manager.getRepository(AgentPool);
      const txRepo = manager.getRepository(PoolTransaction);

      const pool = await poolRepo.findOne({
        where: { agentId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!pool) {
        throw new Error(`Pool não encontrado para agente ${agentId}`);
      }

      const balanceBefore = Number(pool.balance);
      const balanceAfter = balanceBefore + amount;

      pool.balance = balanceAfter;
      await poolRepo.save(pool);

      const tx = txRepo.create({
        poolId: pool.id,
        type: 'manual_deposit' as PoolTransactionType,
        amount,
        balanceBefore,
        balanceAfter,
        note,
        ipAddress,
        phase: pool.currentPhase,
      });
      await txRepo.save(tx);

      this.logger.log(`[POOL] Depósito manual: +${amount.toFixed(2)} | Balance: ${balanceAfter.toFixed(2)}`);

      return pool;
    });
  }

  /**
   * Saque manual (admin)
   */
  async manualWithdraw(
    agentId: string,
    amount: number,
    note?: string,
    ipAddress?: string,
  ): Promise<AgentPool> {
    return this.dataSource.transaction(async (manager) => {
      const poolRepo = manager.getRepository(AgentPool);
      const txRepo = manager.getRepository(PoolTransaction);

      const pool = await poolRepo.findOne({
        where: { agentId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!pool) {
        throw new Error(`Pool não encontrado para agente ${agentId}`);
      }

      const balanceBefore = Number(pool.balance);
      const balanceAfter = balanceBefore - amount;

      pool.balance = balanceAfter;
      await poolRepo.save(pool);

      const tx = txRepo.create({
        poolId: pool.id,
        type: 'manual_withdraw' as PoolTransactionType,
        amount: -amount,
        balanceBefore,
        balanceAfter,
        note,
        ipAddress,
        phase: pool.currentPhase,
      });
      await txRepo.save(tx);

      this.logger.log(`[POOL] Saque manual: -${amount.toFixed(2)} | Balance: ${balanceAfter.toFixed(2)}`);

      return pool;
    });
  }

  /**
   * Estatísticas do pool
   */
  async getStats(agentId: string): Promise<{
    pool: AgentPool;
    stats: {
      realRtp: number;
      netProfit: number;
      winRate: number;
      avgBet: number;
      avgPayout: number;
    };
  }> {
    const pool = await this.getOrCreatePool(agentId);

    const avgBet = pool.totalSpins > 0 
      ? Number(pool.totalBets) / pool.totalSpins 
      : 0;

    const avgPayout = pool.totalWins > 0 
      ? Number(pool.totalPayouts) / pool.totalWins 
      : 0;

    return {
      pool,
      stats: {
        realRtp: pool.realRtp,
        netProfit: pool.netProfit,
        winRate: pool.winRate,
        avgBet,
        avgPayout,
      },
    };
  }

  /**
   * Obtém histórico de transações do pool com filtros
   */
  async getTransactionHistory(
    agentId: string,
    filters: {
      type?: string;
      startDate?: Date;
      endDate?: Date;
      limit?: number;
      offset?: number;
    },
  ): Promise<{ transactions: PoolTransaction[]; total: number }> {
    const pool = await this.getOrCreatePool(agentId);

    const queryBuilder = this.transactionRepository
      .createQueryBuilder('tx')
      .where('tx.poolId = :poolId', { poolId: pool.id });

    if (filters.type) {
      queryBuilder.andWhere('tx.type = :type', { type: filters.type });
    }

    if (filters.startDate) {
      queryBuilder.andWhere('tx.createdAt >= :startDate', { startDate: filters.startDate });
    }

    if (filters.endDate) {
      queryBuilder.andWhere('tx.createdAt <= :endDate', { endDate: filters.endDate });
    }

    const total = await queryBuilder.getCount();

    queryBuilder
      .orderBy('tx.createdAt', 'DESC')
      .limit(filters.limit || 50)
      .offset(filters.offset || 0);

    const transactions = await queryBuilder.getMany();

    return { transactions, total };
  }

  /**
   * Obtém estatísticas detalhadas por período
   */
  async getDetailedStats(
    agentId: string,
    period: string = '24h',
  ): Promise<{
    period: string;
    balance: number;
    bets: { count: number; total: number };
    payouts: { count: number; total: number };
    netProfit: number;
    rtp: number;
    winRate: number;
    phaseDistribution: Record<string, number>;
    topPayouts: Array<{ amount: number; gameCode: string; createdAt: Date }>;
  }> {
    const pool = await this.getOrCreatePool(agentId);

    // Calcula data inicial baseada no período
    const now = new Date();
    let startDate: Date;
    switch (period) {
      case '1h':
        startDate = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    // Busca transações do período
    const transactions = await this.transactionRepository.find({
      where: {
        poolId: pool.id,
        createdAt: MoreThanOrEqual(startDate),
      },
      order: { createdAt: 'DESC' },
    });

    // Calcula estatísticas
    let betCount = 0;
    let betTotal = 0;
    let payoutCount = 0;
    let payoutTotal = 0;
    const phaseDistribution: Record<string, number> = {
      retention: 0,
      normal: 0,
      release: 0,
    };
    const topPayouts: Array<{ amount: number; gameCode: string; createdAt: Date }> = [];

    for (const tx of transactions) {
      if (tx.type === 'bet') {
        betCount++;
        betTotal += Math.abs(Number(tx.amount));
        if (tx.phase) {
          phaseDistribution[tx.phase] = (phaseDistribution[tx.phase] || 0) + 1;
        }
      } else if (tx.type === 'payout') {
        payoutCount++;
        payoutTotal += Number(tx.amount);
        topPayouts.push({
          amount: Number(tx.amount),
          gameCode: tx.gameCode || 'unknown',
          createdAt: tx.createdAt,
        });
      }
    }

    // Ordena e limita top payouts
    topPayouts.sort((a, b) => b.amount - a.amount);
    const limitedTopPayouts = topPayouts.slice(0, 10);

    const netProfit = betTotal - payoutTotal;
    const rtp = betTotal > 0 ? (payoutTotal / betTotal) * 100 : 0;
    const winRate = betCount > 0 ? (payoutCount / betCount) * 100 : 0;

    return {
      period,
      balance: Number(pool.balance),
      bets: { count: betCount, total: betTotal },
      payouts: { count: payoutCount, total: payoutTotal },
      netProfit,
      rtp,
      winRate,
      phaseDistribution,
      topPayouts: limitedTopPayouts,
    };
  }

  /**
   * Reseta estatísticas do pool (mantém saldo)
   */
  async resetStats(agentId: string): Promise<AgentPool> {
    const pool = await this.getOrCreatePool(agentId);

    pool.totalBets = 0;
    pool.totalPayouts = 0;
    pool.totalSpins = 0;
    pool.totalWins = 0;
    // Nota: realRtp, netProfit e winRate são getters calculados automaticamente

    await this.poolRepository.save(pool);

    this.logger.log(`[POOL] Estatísticas resetadas para agente ${agentId}`);

    return pool;
  }
}
