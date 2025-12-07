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

  // Bet sizes available (JSON array)
  @Column({ name: 'bet_sizes', type: 'jsonb', default: '[0.20, 0.50, 1.00, 2.00, 5.00, 10.00, 20.00, 50.00, 100.00]' })
  betSizes: number[];

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
