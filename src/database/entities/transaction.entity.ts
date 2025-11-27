import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { GameRound } from './game-round.entity';
import { GameSession } from './game-session.entity';
import { Agent } from './agent.entity';

export enum TransactionType {
  DEBIT = 'debit',
  CREDIT = 'credit',
  REFUND = 'refund',
}

export enum TransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  TIMEOUT = 'timeout',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'transaction_id', length: 64, unique: true })
  transactionId: string;

  @Column({ name: 'round_id', type: 'uuid', nullable: true })
  roundId: string;

  @Column({ name: 'session_id', type: 'uuid', nullable: true })
  sessionId: string;

  @Column({ name: 'agent_id', type: 'uuid', nullable: true })
  agentId: string;

  // Alias para compatibilidade (operatorId = agentId)
  get operatorId(): string {
    return this.agentId;
  }
  set operatorId(value: string) {
    this.agentId = value;
  }

  @Column({ name: 'player_id', length: 100 })
  playerId: string;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 20,
  })
  type: TransactionType;

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 18,
    scale: 2,
  })
  amount: number;

  @Column({ name: 'currency', length: 3, default: 'BRL' })
  currency: string;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({ name: 'webhook_url', length: 500, nullable: true })
  webhookUrl: string;

  @Column({ name: 'webhook_response', type: 'jsonb', nullable: true })
  webhookResponse: Record<string, any>;

  @Column({ name: 'webhook_attempts', type: 'int', default: 0 })
  webhookAttempts: number;

  @Column({ name: 'last_webhook_attempt', type: 'timestamptz', nullable: true })
  lastWebhookAttempt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt: Date;

  // Relations
  @ManyToOne(() => GameRound)
  @JoinColumn({ name: 'round_id' })
  round: GameRound;

  @ManyToOne(() => GameSession)
  @JoinColumn({ name: 'session_id' })
  session: GameSession;

  @ManyToOne(() => Agent)
  @JoinColumn({ name: 'agent_id' })
  agent: Agent;
}
