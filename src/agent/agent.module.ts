import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { Agent } from '../database/entities/agent.entity';
import { AgentTransaction } from '../database/entities/agent-transaction.entity';
import { GameSession } from '../database/entities/game-session.entity';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agent, AgentTransaction, GameSession]),
    RedisModule,
  ],
  controllers: [AgentController],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
