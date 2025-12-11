import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { AgentPool } from './agent-pool.entity';

/**
 * Tipos de transação do pool
 */
export type PoolTransactionType = 
  | 'bet'              // Aposta recebida
  | 'payout'           // Prêmio pago
  | 'manual_deposit'   // Depósito manual (admin)
  | 'manual_withdraw'  // Saque manual (admin)
  | 'adjustment';      // Ajuste/correção

/**
 * Histórico de transações do Pool
 * 
 * Registra toda movimentação de entrada e saída do pool
 * para auditoria e análise.
 */
@Entity('pool_transactions')
@Index(['poolId', 'createdAt'])
@Index(['poolId', 'type'])
export class PoolTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'pool_id', type: 'uuid' })
  poolId: string;

  @ManyToOne(() => AgentPool, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pool_id' })
  pool: AgentPool;

  /**
   * Tipo da transação
   */
  @Column({ name: 'type', type: 'varchar', length: 20 })
  type: PoolTransactionType;

  /**
   * Valor da transação
   * Positivo = entrada (bet, deposit)
   * Negativo = saída (payout, withdraw)
   */
  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 18,
    scale: 2,
  })
  amount: number;

  /**
   * Saldo antes da transação
   */
  @Column({
    name: 'balance_before',
    type: 'decimal',
    precision: 18,
    scale: 2,
  })
  balanceBefore: number;

  /**
   * Saldo após a transação
   */
  @Column({
    name: 'balance_after',
    type: 'decimal',
    precision: 18,
    scale: 2,
  })
  balanceAfter: number;

  // === REFERÊNCIAS DO JOGO ===

  /**
   * ID da sessão do jogador (se bet/payout)
   */
  @Column({ name: 'session_id', type: 'uuid', nullable: true })
  sessionId: string;

  /**
   * ID do round/spin (se bet/payout)
   */
  @Column({ name: 'round_id', type: 'uuid', nullable: true })
  roundId: string;

  /**
   * Código do jogo
   */
  @Column({ name: 'game_code', type: 'varchar', length: 50, nullable: true })
  gameCode: string;

  /**
   * ID do jogador
   */
  @Column({ name: 'player_id', type: 'varchar', length: 100, nullable: true })
  playerId: string;

  // === DETALHES ===

  /**
   * Valor da aposta (contexto)
   */
  @Column({
    name: 'bet_amount',
    type: 'decimal',
    precision: 18,
    scale: 2,
    nullable: true,
  })
  betAmount: number;

  /**
   * Multiplicador ganho (se payout)
   */
  @Column({ name: 'multiplier', type: 'integer', nullable: true })
  multiplier: number;

  /**
   * Fase do pool no momento da transação
   */
  @Column({ name: 'phase', type: 'varchar', length: 20, nullable: true })
  phase: string;

  /**
   * Observação (para ajustes manuais)
   */
  @Column({ name: 'note', type: 'text', nullable: true })
  note: string;

  /**
   * IP de origem (para auditoria)
   */
  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress: string;

  // === TIMESTAMP ===

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
