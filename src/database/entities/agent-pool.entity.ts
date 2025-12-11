import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Agent } from './agent.entity';

/**
 * Pool de Liquidez por Agente
 * 
 * Controla o saldo disponível para pagamento de prêmios.
 * - Recebe dinheiro quando jogadores apostam e perdem
 * - Paga quando jogadores ganham
 * - Controla fases de retenção/normal/liberação
 */
export type PoolPhase = 'retention' | 'normal' | 'release';

@Entity('agent_pools')
export class AgentPool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'agent_id', type: 'uuid', unique: true })
  agentId: string;

  @OneToOne(() => Agent, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'agent_id' })
  agent: Agent;

  // === SALDO ===
  
  /**
   * Saldo atual do pool (pode ser negativo temporariamente)
   */
  @Column({
    name: 'balance',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0,
  })
  balance: number;

  /**
   * Total de apostas recebidas (entradas)
   */
  @Column({
    name: 'total_bets',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0,
  })
  totalBets: number;

  /**
   * Total de prêmios pagos (saídas)
   */
  @Column({
    name: 'total_payouts',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0,
  })
  totalPayouts: number;

  // === CONFIGURAÇÕES DE RISCO ===

  /**
   * % máximo do pool que pode pagar num único spin
   * Ex: 30 = no máximo 30% do pool pode ser pago
   */
  @Column({
    name: 'max_risk_percent',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 30,
  })
  maxRiskPercent: number;

  /**
   * Valor máximo absoluto que pode pagar (independente do pool)
   * Ex: 50000 = nunca pagar mais que R$ 50.000
   */
  @Column({
    name: 'max_absolute_payout',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 50000,
  })
  maxAbsolutePayout: number;

  /**
   * Pool mínimo para aceitar novas apostas
   * Abaixo disso, bloqueia o jogo
   */
  @Column({
    name: 'min_pool_for_play',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0,
  })
  minPoolForPlay: number;

  // === FASE ATUAL ===

  /**
   * Fase atual do pool:
   * - retention: acumulando, paga pouco
   * - normal: operação balanceada
   * - release: liberando prêmios maiores
   */
  @Column({
    name: 'current_phase',
    type: 'varchar',
    length: 20,
    default: 'normal',
  })
  currentPhase: PoolPhase;

  /**
   * Quando a fase atual começou
   */
  @Column({ name: 'phase_started_at', type: 'timestamptz', nullable: true })
  phaseStartedAt: Date;

  /**
   * Quando a fase deve terminar (para fases agendadas)
   */
  @Column({ name: 'phase_ends_at', type: 'timestamptz', nullable: true })
  phaseEndsAt: Date;

  /**
   * Se a fase foi definida manualmente pelo agente
   */
  @Column({ name: 'phase_manual', type: 'boolean', default: false })
  phaseManual: boolean;

  // === THRESHOLDS PARA MUDANÇA DE FASE AUTOMÁTICA ===

  /**
   * Se pool cair abaixo deste valor, entra em retenção automática
   */
  @Column({
    name: 'retention_threshold',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 1000,
  })
  retentionThreshold: number;

  /**
   * Se pool subir acima deste valor, pode liberar prêmios maiores
   */
  @Column({
    name: 'release_threshold',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 10000,
  })
  releaseThreshold: number;

  /**
   * Habilita mudança automática de fase baseado nos thresholds
   */
  @Column({ name: 'auto_phase_enabled', type: 'boolean', default: true })
  autoPhaseEnabled: boolean;

  // === CONFIGURAÇÕES POR FASE ===

  /**
   * WinChance durante retenção (%)
   */
  @Column({
    name: 'retention_win_chance',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 10,
  })
  retentionWinChance: number;

  /**
   * Multiplicador máximo durante retenção
   */
  @Column({ name: 'retention_max_multiplier', type: 'integer', default: 30 })
  retentionMaxMultiplier: number;

  /**
   * WinChance durante operação normal (%)
   */
  @Column({
    name: 'normal_win_chance',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 35,
  })
  normalWinChance: number;

  /**
   * Multiplicador máximo durante operação normal
   */
  @Column({ name: 'normal_max_multiplier', type: 'integer', default: 100 })
  normalMaxMultiplier: number;

  /**
   * WinChance durante liberação (%)
   */
  @Column({
    name: 'release_win_chance',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 65,
  })
  releaseWinChance: number;

  /**
   * Multiplicador máximo durante liberação
   */
  @Column({ name: 'release_max_multiplier', type: 'integer', default: 250 })
  releaseMaxMultiplier: number;

  // === ESTATÍSTICAS ===

  /**
   * Maior prêmio já pago
   */
  @Column({
    name: 'biggest_payout',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0,
  })
  biggestPayout: number;

  /**
   * Total de spins processados
   */
  @Column({ name: 'total_spins', type: 'integer', default: 0 })
  totalSpins: number;

  /**
   * Total de vitórias
   */
  @Column({ name: 'total_wins', type: 'integer', default: 0 })
  totalWins: number;

  // === TIMESTAMPS ===

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  // === COMPUTED ===

  /**
   * RTP real calculado (payouts / bets * 100)
   */
  get realRtp(): number {
    if (this.totalBets === 0) return 0;
    return (Number(this.totalPayouts) / Number(this.totalBets)) * 100;
  }

  /**
   * Lucro líquido (bets - payouts)
   */
  get netProfit(): number {
    return Number(this.totalBets) - Number(this.totalPayouts);
  }

  /**
   * Taxa de vitória (wins / spins * 100)
   */
  get winRate(): number {
    if (this.totalSpins === 0) return 0;
    return (this.totalWins / this.totalSpins) * 100;
  }
}
