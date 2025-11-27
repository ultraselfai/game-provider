import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Agent } from './agent.entity';
import { GameRound } from './game-round.entity';

export enum SessionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CLOSED = 'closed',
}

@Entity('game_sessions')
export class GameSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'session_token', length: 128, unique: true })
  sessionToken: string;

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

  @Column({ name: 'player_currency', length: 3, default: 'BRL' })
  playerCurrency: string;

  @Column({ name: 'game_code', length: 50 })
  gameCode: string;

  @Column({
    name: 'cached_balance',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0,
  })
  cachedBalance: number;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 20,
    default: SessionStatus.ACTIVE,
  })
  status: SessionStatus;

  @Column({ name: 'ip_address', length: 45, nullable: true })
  ipAddress: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent: string;

  @Column({ name: 'metadata', type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt: Date;

  // Relations
  @ManyToOne(() => Agent, (agent) => agent.sessions)
  @JoinColumn({ name: 'agent_id' })
  agent: Agent;

  @OneToMany(() => GameRound, (round) => round.session)
  rounds: GameRound[];
}
