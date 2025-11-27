import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookService } from './webhook.service';
import { Agent, GameSession, Transaction } from '../database/entities';
import { RedisModule } from '../redis';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agent, GameSession, Transaction]),
    RedisModule,
  ],
  providers: [WebhookService],
  exports: [WebhookService],
})
export class WebhookModule {}
