import {
  IsOptional,
  IsString,
  IsInt,
  IsEnum,
  IsDateString,
  IsBoolean,
  IsNumber,
  IsArray,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

// =============================
// Stats DTOs
// =============================
export class DashboardStatsDto {
  totalOperators: number; // Mantém nome para compatibilidade (agora são agents)
  activeSessions: number;
  totalSessions: number;
  totalRounds: number;
  totalBets: number;
  totalWins: number;
  ggr: number; // Gross Gaming Revenue coletado dos agentes
  todayRounds: number;
  todayBets: number;
  todayWins: number;
  todayGgr: number;
  totalCreditsAdded?: number; // Total de créditos adicionados aos agentes
}

// =============================
// Pagination DTOs
// =============================
export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

export class PaginatedResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// =============================
// Sessions DTOs
// =============================
export enum SessionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CLOSED = 'closed',
}

export class SessionsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  operatorId?: string;

  @IsOptional()
  @IsEnum(SessionStatus)
  status?: SessionStatus;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class SessionDto {
  id: string;
  sessionToken: string;
  userId: string;
  gameId: string;
  operatorId: string;
  operatorName: string;
  currency: string;
  status: SessionStatus;
  totalBets: number;
  totalWins: number;
  roundsPlayed: number;
  createdAt: Date;
  expiresAt: Date;
  lastActivityAt?: Date;
}

// =============================
// Transactions DTOs
// =============================
export enum TransactionType {
  BET = 'bet',
  WIN = 'win',
  BONUS = 'bonus',
  REFUND = 'refund',
}

export class TransactionsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @IsOptional()
  @IsString()
  operatorId?: string;

  @IsOptional()
  @IsString()
  sessionId?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class TransactionDto {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  userId: string;
  sessionId: string;
  operatorId: string;
  operatorName: string;
  gameId: string;
  roundId: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

// =============================
// Game Rounds DTOs
// =============================
export class RoundsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  operatorId?: string;

  @IsOptional()
  @IsString()
  sessionId?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  gameId?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class RoundDto {
  id: string;
  sessionId: string;
  operatorId: string;
  userId: string;
  gameId: string;
  betAmount: number;
  winAmount: number;
  currency: string;
  result: any;
  createdAt: Date;
}

// =============================
// Operators Admin DTOs
// =============================
export class OperatorDetailDto {
  id: string;
  name: string;
  apiKey: string;
  webhookUrl: string;
  status: 'active' | 'inactive' | 'suspended';
  allowedGames: string[];
  allowedCurrencies: string[];
  settings: Record<string, any>;
  totalSessions: number;
  totalRounds: number;
  totalBets: number;
  totalWins: number;
  ggr: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateOperatorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  webhookUrl?: string;

  @IsOptional()
  @IsEnum(['active', 'inactive', 'suspended'])
  status?: 'active' | 'inactive' | 'suspended';

  @IsOptional()
  @IsString({ each: true })
  allowedGames?: string[];

  @IsOptional()
  @IsString({ each: true })
  allowedCurrencies?: string[];
}

// =============================
// Game Settings DTOs
// =============================
export class GameSettingsDto {
  id: string;
  gameCode: string;
  gameName: string;
  isActive: boolean;
  rtp: number;
  volatility: string;
  minBet: number;
  maxBet: number;
  defaultBet: number;
  betSizes: number[];
  winChance: number;
  loseChance: number;
  hasFreeSpin: boolean;
  hasBonusGame: boolean;
  hasJackpot: boolean;
  jackpotMini: number;
  jackpotMinor: number;
  jackpotMajor: number;
  jackpotGrand: number;
  thumbnailUrl?: string;
  description?: string;
  category: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateGameSettingsDto {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(99.99)
  rtp?: number;

  @IsOptional()
  @IsString()
  volatility?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0.000001)
  minBet?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0.000001)
  maxBet?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0.000001)
  defaultBet?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  betSizes?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  baseBets?: number[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  maxLevel?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200000) // Suporta Megaways (até 117649+)
  numLines?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  winChance?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  loseChance?: number;

  @IsOptional()
  @IsBoolean()
  hasFreeSpin?: boolean;

  @IsOptional()
  @IsBoolean()
  hasBonusGame?: boolean;

  @IsOptional()
  @IsBoolean()
  hasJackpot?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  jackpotMini?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  jackpotMinor?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  jackpotMajor?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  jackpotGrand?: number;

  // =============================================
  // CONFIGURAÇÕES DE PRÊMIOS (Promoções)
  // =============================================

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxWinPerSpin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxMultiplier?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  promoMultiplier?: number;

  @IsOptional()
  @IsBoolean()
  promoMode?: boolean;

  @IsOptional()
  @IsString()
  promoName?: string;

  @IsOptional()
  @IsDateString()
  promoStart?: string;

  @IsOptional()
  @IsDateString()
  promoEnd?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;
}
