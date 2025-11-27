import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games.controller';
import { GameSession } from '../database/entities/game-session.entity';
import { GameRound } from '../database/entities/game-round.entity';
import { Transaction } from '../database/entities/transaction.entity';
import { Agent } from '../database/entities/agent.entity';
import { AgentTransaction } from '../database/entities/agent-transaction.entity';
import { GameSettings } from '../database/entities/game-settings.entity';
import { SlotEngine } from '../engine/slot-engine';
import { RngService } from '../engine/rng.service';
import { WebhookModule } from '../webhook/webhook.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameSession, GameRound, Transaction, Agent, AgentTransaction, GameSettings]),
    WebhookModule,
    AdminModule, // Para usar GameSettingsService
  ],
  controllers: [GamesController],
  providers: [SlotEngine, RngService],
})
export class GamesModule {}
