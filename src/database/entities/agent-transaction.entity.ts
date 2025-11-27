import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Agent } from './agent.entity';

export enum AgentTransactionType {
  CREDIT_ADDITION = 'credit_addition',   // Admin adiciona crédito
  GGR_DEDUCTION = 'ggr_deduction',       // Dedução de GGR
  MANUAL_ADJUSTMENT = 'manual_adjustment', // Ajuste manual
  REFUND = 'refund',                     // Estorno
}

/**
 * Histórico de transações do saldo do Agent
 * Registra todas movimentações do balance
 */
@Entity('agent_transactions')
export class AgentTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'agent_id', type: 'uuid' })
  agentId: string;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 30,
  })
  type: AgentTransactionType;

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 18,
    scale: 2,
  })
  amount: number;

  @Column({
    name: 'previous_balance',
    type: 'decimal',
    precision: 18,
    scale: 2,
  })
  previousBalance: number;

  @Column({
    name: 'new_balance',
    type: 'decimal',
    precision: 18,
    scale: 2,
  })
  newBalance: number;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column({ name: 'reference', length: 255, nullable: true })
  reference: string; // Comprovante PIX, ID de sessão, etc.

  @Column({ name: 'created_by', length: 100, nullable: true })
  createdBy: string; // 'admin', 'system', ou ID do admin

  @Column({ name: 'metadata', type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => Agent)
  @JoinColumn({ name: 'agent_id' })
  agent: Agent;
}
