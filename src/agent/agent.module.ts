import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { Agent } from '../database/entities/agent.entity';
import { AgentTransaction } from '../database/entities/agent-transaction.entity';
import { AgentGameSettings } from '../database/entities/agent-game-settings.entity';
import { GameSession } from '../database/entities/game-session.entity';
import { GameSettings } from '../database/entities/game-settings.entity';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agent, AgentTransaction, AgentGameSettings, GameSession, GameSettings]),
    RedisModule,
  ],
  controllers: [AgentController],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
