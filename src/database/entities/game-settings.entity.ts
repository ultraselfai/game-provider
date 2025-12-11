import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

/**
 * Configurações customizáveis de jogos
 * Permite ajustar RTP, apostas min/max, etc. sem alterar código
 */
@Entity('game_settings')
@Unique(['gameCode'])
export class GameSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'game_code', length: 50 })
  gameCode: string;

  @Column({ name: 'game_name', length: 100 })
  gameName: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  // RTP Configuration
  @Column({ name: 'rtp', type: 'decimal', precision: 5, scale: 2, default: 96.5 })
  rtp: number;

  @Column({ name: 'volatility', length: 20, default: 'medium' })
  volatility: string;

  // Bet Configuration
  @Column({ name: 'min_bet', type: 'decimal', precision: 12, scale: 6, default: 0.20 })
  minBet: number;

  @Column({ name: 'max_bet', type: 'decimal', precision: 12, scale: 6, default: 500.00 })
  maxBet: number;

  @Column({ name: 'default_bet', type: 'decimal', precision: 12, scale: 6, default: 1.00 })
  defaultBet: number;

  // Bet sizes available (JSON array) - valores finais para validação
  @Column({ name: 'bet_sizes', type: 'jsonb', default: '[0.20, 0.50, 1.00, 2.00, 5.00, 10.00, 20.00, 50.00, 100.00]' })
  betSizes: number[];

  // Base bets (valores base que o jogo multiplica por level × lines)
  @Column({ name: 'base_bets', type: 'jsonb', default: '[0.08, 0.80, 3.00, 10.00]', nullable: true })
  baseBets: number[];

  // Nível máximo de aposta (1-10, etc)
  @Column({ name: 'max_level', type: 'integer', default: 10, nullable: true })
  maxLevel: number;

  // Número de linhas (paylines) do jogo
  @Column({ name: 'num_lines', type: 'integer', default: 5, nullable: true })
  numLines: number;

  // Win/Loss Chance (for predefined results selection)
  @Column({ name: 'win_chance', type: 'integer', default: 35 })
  winChance: number;

  @Column({ name: 'lose_chance', type: 'integer', default: 65 })
  loseChance: number;

  // Features enabled
  @Column({ name: 'has_free_spin', default: true })
  hasFreeSpin: boolean;

  @Column({ name: 'has_bonus_game', default: false })
  hasBonusGame: boolean;

  @Column({ name: 'has_jackpot', default: false })
  hasJackpot: boolean;

  // Jackpot values
  @Column({ name: 'jackpot_mini', type: 'decimal', precision: 12, scale: 2, default: 100.00 })
  jackpotMini: number;

  @Column({ name: 'jackpot_minor', type: 'decimal', precision: 12, scale: 2, default: 500.00 })
  jackpotMinor: number;

  @Column({ name: 'jackpot_major', type: 'decimal', precision: 12, scale: 2, default: 2500.00 })
  jackpotMajor: number;

  @Column({ name: 'jackpot_grand', type: 'decimal', precision: 12, scale: 2, default: 50000.00 })
  jackpotGrand: number;

  // =============================================
  // CONFIGURAÇÕES DE PRÊMIOS (Promoções)
  // =============================================

  // Prêmio máximo por spin (0 = sem limite)
  @Column({ name: 'max_win_per_spin', type: 'decimal', precision: 12, scale: 2, default: 0 })
  maxWinPerSpin: number;

  // Multiplicador máximo permitido (0 = usar padrão do jogo)
  @Column({ name: 'max_multiplier', type: 'decimal', precision: 8, scale: 2, default: 0 })
  maxMultiplier: number;

  // Multiplicador promocional (aplica sobre os ganhos, 1 = normal, 2 = dobro)
  @Column({ name: 'promo_multiplier', type: 'decimal', precision: 5, scale: 2, default: 1.00 })
  promoMultiplier: number;

  // Modo promoção ativo
  @Column({ name: 'promo_mode', default: false })
  promoMode: boolean;

  // Nome da promoção (ex: "Natal 2025", "Black Friday")
  @Column({ name: 'promo_name', length: 100, nullable: true })
  promoName: string;

  // Data de início da promoção
  @Column({ name: 'promo_start', type: 'timestamptz', nullable: true })
  promoStart: Date;

  // Data de fim da promoção
  @Column({ name: 'promo_end', type: 'timestamptz', nullable: true })
  promoEnd: Date;

  // Metadata
  @Column({ name: 'thumbnail_url', length: 500, nullable: true })
  thumbnailUrl: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'category', length: 50, default: 'slots' })
  category: string;

  @Column({ name: 'provider', length: 50, default: 'internal' })
  provider: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
