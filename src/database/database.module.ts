import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Agent, AgentTransaction, GameSession, GameRound, Transaction, GameSettings } from './entities';

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
        entities: [Agent, AgentTransaction, GameSession, GameRound, Transaction, GameSettings],
        // Em produção, usar migrations ao invés de synchronize
        synchronize: configService.get<string>('NODE_ENV') === 'development',
        logging: configService.get<string>('NODE_ENV') === 'development',
        // Pool de conexões
        extra: {
          max: 20, // máximo de conexões
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 2000,
        },
      }),
    }),
    // Exportar repositórios para uso em outros módulos
    TypeOrmModule.forFeature([Agent, AgentTransaction, GameSession, GameRound, Transaction, GameSettings]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
