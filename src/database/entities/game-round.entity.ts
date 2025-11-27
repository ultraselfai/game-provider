import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Agent } from './agent.entity';
import { GameSession } from './game-session.entity';

export enum RoundStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  ERROR = 'error',
}

@Entity('game_rounds')
export class GameRound {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'round_id', length: 64, unique: true })
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

  @Column({ name: 'game_code', length: 50 })
  gameCode: string;

  // Valores financeiros
  @Column({
    name: 'bet_amount',
    type: 'decimal',
    precision: 18,
    scale: 2,
  })
  betAmount: number;

  @Column({
    name: 'win_amount',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0,
  })
  winAmount: number;

  @Column({ name: 'currency', length: 3, default: 'BRL' })
  currency: string;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: RoundStatus.PENDING,
  })
  status: RoundStatus;

  // Detalhes do jogo (auditoria)
  @Column({ name: 'rng_seed', length: 128, nullable: true })
  rngSeed: string;

  @Column({ name: 'request_data', type: 'jsonb', nullable: true })
  requestData: Record<string, any>;

  @Column({ name: 'result_data', type: 'jsonb', nullable: true })
  resultData: Record<string, any>;

  // Símbolos e paylines
  @Column({ name: 'grid_symbols', type: 'jsonb', nullable: true })
  gridSymbols: number[][];

  @Column({ name: 'winning_lines', type: 'jsonb', nullable: true })
  winningLines: Array<{
    line: number;
    symbols: number[];
    payout: number;
  }>;

  // Free spins
  @Column({ name: 'is_free_spin', default: false })
  isFreeSpin: boolean;

  @Column({ name: 'free_spins_remaining', type: 'int', default: 0 })
  freeSpinsRemaining: number;

  @Column({
    name: 'free_spins_total_win',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0,
  })
  freeSpinsTotalWin: number;

  @Column({ name: 'parent_round_id', type: 'uuid', nullable: true })
  parentRoundId: string;

  // Timestamps
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt: Date;

  // Webhook status
  @Column({ name: 'debit_webhook_sent', default: false })
  debitWebhookSent: boolean;

  @Column({ name: 'credit_webhook_sent', default: false })
  creditWebhookSent: boolean;

  @Column({ name: 'webhook_errors', type: 'jsonb', default: [] })
  webhookErrors: Array<{
    type: string;
    error: string;
    timestamp: string;
  }>;

  // Relations
  @ManyToOne(() => Agent, (agent) => agent.rounds)
  @JoinColumn({ name: 'agent_id' })
  agent: Agent;

  @ManyToOne(() => GameSession, (session) => session.rounds)
  @JoinColumn({ name: 'session_id' })
  session: GameSession;

  @ManyToOne(() => GameRound)
  @JoinColumn({ name: 'parent_round_id' })
  parentRound: GameRound;
}
