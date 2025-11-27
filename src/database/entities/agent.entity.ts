import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { GameSession } from './game-session.entity';
import { GameRound } from './game-round.entity';

/**
 * Agent = Cliente que compra créditos do Provider
 * Cada Agent tem:
 * - Saldo próprio (balance) que você adiciona manualmente
 * - Credenciais de API para integrar jogos na Bet dele
 * - Histórico de consumo (GGR)
 */
@Entity('agents')
export class Agent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // === Dados Básicos ===
  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  // === Créditos de Spin (1 spin = 1 crédito) ===
  @Column({
    name: 'spin_credits',
    type: 'integer',
    default: 0,
  })
  spinCredits: number;

  // === Saldo em R$ (para compatibilidade/display) ===
  @Column({
    name: 'balance',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0,
  })
  balance: number;

  // === Preço por crédito (quanto o agente pagou) ===
  @Column({
    name: 'credit_price',
    type: 'decimal',
    precision: 10,
    scale: 4,
    default: 0.10, // R$ 0,10 por spin (1000 spins = R$ 100)
  })
  creditPrice: number;

  // === Taxa de GGR (para estatísticas apenas) ===
  @Column({
    name: 'ggr_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 10, // 10% padrão
  })
  ggrRate: number;

  // === Jogos Permitidos ===
  @Column({
    name: 'allowed_games',
    type: 'jsonb',
    default: [],
  })
  allowedGames: string[]; // Lista de gameCode permitidos, vazio = todos

  // === Credenciais de API ===
  @Column({ name: 'api_key', length: 64, unique: true })
  apiKey: string;

  @Column({ name: 'api_secret', length: 128 })
  apiSecret: string;

  // === Configurações de Webhook (opcional - para modo avançado) ===
  @Column({ name: 'webhook_url', length: 500, nullable: true })
  webhookUrl: string;

  @Column({ name: 'webhook_secret', length: 128, nullable: true })
  webhookSecret: string;

  @Column({ name: 'balance_callback_url', length: 500, nullable: true })
  balanceCallbackUrl: string;

  @Column({ name: 'debit_callback_url', length: 500, nullable: true })
  debitCallbackUrl: string;

  @Column({ name: 'credit_callback_url', length: 500, nullable: true })
  creditCallbackUrl: string;

  // === Status e Controle ===
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'use_local_balance', default: true })
  useLocalBalance: boolean; // true = usa saldo do Agent, false = usa webhooks

  // === Estatísticas (cache para dashboard) ===
  @Column({
    name: 'total_credits_purchased',
    type: 'integer',
    default: 0,
  })
  totalCreditsPurchased: number; // Total de créditos comprados

  @Column({
    name: 'total_spins_consumed',
    type: 'integer',
    default: 0,
  })
  totalSpinsConsumed: number; // Total de spins consumidos

  @Column({
    name: 'total_deposited',
    type: 'decimal',
    precision: 18,
    scale: 2,
    default: 0,
  })
  totalDeposited: number; // Total em R$ que você recebeu

  // === Timestamps ===
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt: Date;

  // === Relations ===
  @OneToMany(() => GameSession, (session) => session.agent)
  sessions: GameSession[];

  @OneToMany(() => GameRound, (round) => round.agent)
  rounds: GameRound[];

  // === Computed (não salva no DB) ===
  get creditsRemaining(): number {
    return this.spinCredits;
  }

  get creditsUsedPercent(): number {
    if (this.totalCreditsPurchased === 0) return 0;
    return (this.totalSpinsConsumed / this.totalCreditsPurchased) * 100;
  }
}
