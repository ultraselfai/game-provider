import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { createHmac, randomBytes } from 'crypto';
import { Agent, GameSession, Transaction, TransactionType, TransactionStatus } from '../database/entities';
import { RedisService } from '../redis';
import {
  BalanceCallbackDto,
  DebitCallbackDto,
  CreditCallbackDto,
  BalanceResponse,
  TransactionResponse,
} from './dto/webhook.dto';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    @InjectRepository(Agent)
    private readonly agentRepo: Repository<Agent>,
    @InjectRepository(GameSession)
    private readonly sessionRepo: Repository<GameSession>,
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Chama o endpoint de balance do agente para obter saldo atual
   * NOTA: Este método só é usado quando o agente tem webhooks configurados
   */
  async getBalance(sessionToken: string): Promise<BalanceResponse> {
    const session = await this.getSessionWithAgent(sessionToken);
    const { agent } = session;

    if (!agent.balanceCallbackUrl) {
      this.logger.warn(`[WEBHOOK] Agent ${agent.name} has no balance callback URL`);
      throw new HttpException('Balance callback not configured', HttpStatus.SERVICE_UNAVAILABLE);
    }

    const payload: BalanceCallbackDto = {
      sessionToken,
      playerId: session.playerId,
    };

    try {
      const response = await this.callAgentWebhook<BalanceResponse>(
        agent,
        agent.balanceCallbackUrl,
        payload,
      );

      // Atualizar cache
      await this.redisService.updateSessionBalance(sessionToken, response.balance);

      this.logger.log(`[WEBHOOK] Balance for ${session.playerId}: ${response.balance} ${response.currency}`);
      return response;
    } catch (error) {
      this.logger.error(`[WEBHOOK] Balance callback failed: ${error.message}`);
      throw new HttpException('Failed to get balance', HttpStatus.BAD_GATEWAY);
    }
  }

  /**
   * Chama o endpoint de débito do agente (aposta)
   * NOTA: Este método só é usado quando o agente tem webhooks configurados
   */
  async debit(dto: DebitCallbackDto): Promise<TransactionResponse> {
    const session = await this.getSessionWithAgent(dto.sessionToken);
    const { agent } = session;

    if (!agent.debitCallbackUrl) {
      this.logger.warn(`[WEBHOOK] Agent ${agent.name} has no debit callback URL`);
      throw new HttpException('Debit callback not configured', HttpStatus.SERVICE_UNAVAILABLE);
    }

    // Criar transação pendente
    const transaction = this.transactionRepo.create({
      transactionId: `tx_${randomBytes(16).toString('hex')}`,
      sessionId: session.id,
      operatorId: agent.id,
      playerId: dto.playerId,
      roundId: dto.roundId,
      type: TransactionType.DEBIT,
      amount: dto.amount,
      status: TransactionStatus.PENDING,
      webhookUrl: agent.debitCallbackUrl,
    });
    await this.transactionRepo.save(transaction);

    try {
      const response = await this.callAgentWebhook<TransactionResponse>(
        agent,
        agent.debitCallbackUrl,
        dto,
      );

      // Atualizar transação
      transaction.status = response.success ? TransactionStatus.SUCCESS : TransactionStatus.FAILED;
      transaction.webhookResponse = response;
      transaction.webhookAttempts = 1;
      transaction.lastWebhookAttempt = new Date();
      if (response.success) {
        transaction.completedAt = new Date();
      }
      await this.transactionRepo.save(transaction);

      if (response.success) {
        // Atualizar cache de balance
        await this.redisService.updateSessionBalance(dto.sessionToken, response.balance);
        this.logger.log(`[WEBHOOK] Debit success: ${dto.amount} - Round: ${dto.roundId}`);
      } else {
        this.logger.warn(`[WEBHOOK] Debit failed: ${response.error}`);
      }

      return response;
    } catch (error) {
      transaction.status = TransactionStatus.FAILED;
      transaction.webhookResponse = { error: error.message };
      transaction.webhookAttempts = 1;
      transaction.lastWebhookAttempt = new Date();
      await this.transactionRepo.save(transaction);

      this.logger.error(`[WEBHOOK] Debit callback failed: ${error.message}`);
      throw new HttpException('Failed to process debit', HttpStatus.BAD_GATEWAY);
    }
  }

  /**
   * Chama o endpoint de crédito do agente (ganho)
   * NOTA: Este método só é usado quando o agente tem webhooks configurados
   */
  async credit(dto: CreditCallbackDto): Promise<TransactionResponse> {
    const session = await this.getSessionWithAgent(dto.sessionToken);
    const { agent } = session;

    if (!agent.creditCallbackUrl) {
      this.logger.warn(`[WEBHOOK] Agent ${agent.name} has no credit callback URL`);
      throw new HttpException('Credit callback not configured', HttpStatus.SERVICE_UNAVAILABLE);
    }

    // Criar transação pendente
    const transaction = this.transactionRepo.create({
      transactionId: `tx_${randomBytes(16).toString('hex')}`,
      sessionId: session.id,
      operatorId: agent.id,
      playerId: dto.playerId,
      roundId: dto.roundId,
      type: TransactionType.CREDIT,
      amount: dto.amount,
      status: TransactionStatus.PENDING,
      webhookUrl: agent.creditCallbackUrl,
    });
    await this.transactionRepo.save(transaction);

    try {
      const response = await this.callAgentWebhook<TransactionResponse>(
        agent,
        agent.creditCallbackUrl,
        dto,
      );

      // Atualizar transação
      transaction.status = response.success ? TransactionStatus.SUCCESS : TransactionStatus.FAILED;
      transaction.webhookResponse = response;
      transaction.webhookAttempts = 1;
      transaction.lastWebhookAttempt = new Date();
      if (response.success) {
        transaction.completedAt = new Date();
      }
      await this.transactionRepo.save(transaction);

      if (response.success) {
        // Atualizar cache de balance
        await this.redisService.updateSessionBalance(dto.sessionToken, response.balance);
        this.logger.log(`[WEBHOOK] Credit success: ${dto.amount} - Round: ${dto.roundId}`);
      } else {
        this.logger.warn(`[WEBHOOK] Credit failed: ${response.error}`);
      }

      return response;
    } catch (error) {
      transaction.status = TransactionStatus.FAILED;
      transaction.webhookResponse = { error: error.message };
      transaction.webhookAttempts = 1;
      transaction.lastWebhookAttempt = new Date();
      await this.transactionRepo.save(transaction);

      this.logger.error(`[WEBHOOK] Credit callback failed: ${error.message}`);
      throw new HttpException('Failed to process credit', HttpStatus.BAD_GATEWAY);
    }
  }

  // === Private Helpers ===

  private async getSessionWithAgent(sessionToken: string): Promise<GameSession & { agent: Agent }> {
    const session = await this.sessionRepo.findOne({
      where: { sessionToken },
      relations: ['agent'],
    });

    if (!session) {
      throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
    }

    if (!session.agent) {
      throw new HttpException('Agent not found for session', HttpStatus.NOT_FOUND);
    }

    return session as GameSession & { agent: Agent };
  }

  private async callAgentWebhook<T>(
    agent: Agent,
    url: string,
    payload: any,
  ): Promise<T> {
    const timestamp = Date.now();
    const signature = this.generateSignature(agent.apiSecret, payload, timestamp);

    this.logger.log(`[WEBHOOK] Calling: ${url}`);
    this.logger.log(`[WEBHOOK] Payload: ${JSON.stringify(payload)}`);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Signature': signature,
          'X-Timestamp': timestamp.toString(),
          'X-Agent-Id': agent.id,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000), // 10 segundos timeout
      });

      this.logger.log(`[WEBHOOK] Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Webhook failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json() as T;
      this.logger.log(`[WEBHOOK] Response: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`[WEBHOOK] Error calling ${url}: ${error.message}`);
      throw error;
    }
  }

  private generateSignature(secret: string, payload: any, timestamp: number): string {
    const data = `${timestamp}.${JSON.stringify(payload)}`;
    return createHmac('sha256', secret).update(data).digest('hex');
  }
}
