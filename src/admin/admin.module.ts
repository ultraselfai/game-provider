import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { GameSettingsService } from './game-settings.service';
import { Agent } from '../database/entities/agent.entity';
import { AgentTransaction } from '../database/entities/agent-transaction.entity';
import { GameSession } from '../database/entities/game-session.entity';
import { GameRound } from '../database/entities/game-round.entity';
import { Transaction } from '../database/entities/transaction.entity';
import { GameSettings } from '../database/entities/game-settings.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agent, AgentTransaction, GameSession, GameRound, Transaction, GameSettings]),
  ],
  controllers: [AdminController],
  providers: [AdminService, GameSettingsService],
  exports: [AdminService, GameSettingsService],
})
export class AdminModule {}
