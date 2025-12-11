import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentPool } from '../database/entities/agent-pool.entity';
import { PoolTransaction } from '../database/entities/pool-transaction.entity';
import { PoolService } from './pool.service';
import { PoolController } from './pool.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AgentPool, PoolTransaction]),
  ],
  controllers: [PoolController],
  providers: [PoolService],
  exports: [PoolService],
})
export class PoolModule {}
