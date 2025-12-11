import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Agent, AgentTransaction, AgentGameSettings, AgentPool, PoolTransaction, GameSession, GameRound, Transaction, GameSettings } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER', 'gameadmin'),
        password: configService.get<string>('DB_PASSWORD', 'gamepass123'),
        database: configService.get<string>('DB_NAME', 'game_provider'),
        entities: [Agent, AgentTransaction, AgentGameSettings, AgentPool, PoolTransaction, GameSession, GameRound, Transaction, GameSettings],
        // SSL para conexões em produção (desabilitar verificação de certificado para conexões internas)
        ssl: configService.get<string>('DB_SSL', 'false') === 'true' 
          ? { rejectUnauthorized: false } 
          : false,
        // Usar DB_SYNC=true para sincronizar tabelas (útil no primeiro deploy)
        synchronize: configService.get<string>('DB_SYNC', 'false') === 'true',
        logging: configService.get<string>('NODE_ENV') === 'development',
        // Pool de conexões - timeout maior para ambientes containerizados
        extra: {
          max: 20, // máximo de conexões
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 10000, // 10 segundos para conexão inicial
        },
        // Retry automático na conexão
        retryAttempts: 10,
        retryDelay: 3000,
      }),
    }),
    // Exportar repositórios para uso em outros módulos
    TypeOrmModule.forFeature([Agent, AgentTransaction, AgentGameSettings, AgentPool, PoolTransaction, GameSession, GameRound, Transaction, GameSettings]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
