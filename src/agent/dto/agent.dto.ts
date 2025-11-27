import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, IsEmail, IsArray, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export enum GameMode {
  REAL = 'REAL',
  DEMO = 'DEMO',
}

export enum TransactionType {
  CREDIT_ADDITION = 'credit_addition',
  GGR_DEDUCTION = 'ggr_deduction',
  MANUAL_ADJUSTMENT = 'manual_adjustment',
  REFUND = 'refund',
}

// =====================================================
// DTOs para Criação e Atualização de Agente
// =====================================================

/**
 * DTO para criação de agente
 * POST /api/v1/agents
 */
export class CreateAgentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  webhookUrl?: string;

  @IsString()
  @IsOptional()
  webhookSecret?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  ggrRate?: number = 10;

  @IsArray()
  @IsOptional()
  allowedGames?: string[];

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  initialBalance?: number = 0;
}

/**
 * DTO para atualização de agente
 * PUT /api/v1/agents/:id
 */
export class UpdateAgentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  webhookUrl?: string;

  @IsString()
  @IsOptional()
  webhookSecret?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  ggrRate?: number;

  @IsArray()
  @IsOptional()
  allowedGames?: string[];

  @IsOptional()
  isActive?: boolean;
}

// =====================================================
// DTOs para Gerenciamento de Créditos
// =====================================================

/**
 * DTO para adicionar créditos ao agente
 * POST /api/v1/agents/:id/credit
 */
export class AddCreditDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  @Type(() => Number)
  amount: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  reference?: string; // Ex: comprovante PIX
}

/**
 * DTO para deduzir GGR do agente
 * POST /api/v1/agents/:id/debit-ggr
 */
export class DebitGgrDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  @Type(() => Number)
  totalBets: number;

  @IsString()
  @IsOptional()
  sessionId?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

// =====================================================
// DTOs para Autenticação e Sessões
// =====================================================

/**
 * DTO para autenticação de agente (B2B)
 * POST /api/v1/agents/auth
 */
export class AgentAuthDto {
  @IsString()
  @IsNotEmpty()
  apiKey: string;

  @IsString()
  @IsNotEmpty()
  apiSecret: string;
}

/**
 * DTO para login do agente no painel
 * POST /api/v1/agents/login
 */
export class AgentLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

/**
 * DTO para criação de sessão de jogo
 * POST /api/v1/agents/sessions
 */
export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  gameId: string;

  @IsString()
  @IsOptional()
  currency?: string = 'BRL';

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  playerBalance?: number = 1000; // Saldo inicial do jogador na sessão

  @IsEnum(GameMode)
  @IsOptional()
  mode?: GameMode = GameMode.REAL;

  @IsString()
  @IsOptional()
  returnUrl?: string;

  @IsOptional()
  metadata?: Record<string, any>;
}

// =====================================================
// Interfaces de Resposta
// =====================================================

/**
 * Resposta de autenticação B2B
 */
export interface AuthResponse {
  accessToken: string;
  expiresIn: number;
  agentId: string;
  operatorId?: string; // Alias para compatibilidade
}

/**
 * Resposta de login do painel
 */
export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  agent: {
    id: string;
    name: string;
    email: string;
    balance: number;
    ggrRate: number;
  };
}

/**
 * Resposta de criação de sessão
 */
export interface SessionResponse {
  sessionToken: string;
  launchUrl: string;
  expiresAt: string;
}

/**
 * Resposta de transação de crédito
 */
export interface CreditResponse {
  success: boolean;
  transactionId: string;
  previousBalance: number;
  newBalance: number;
  amount: number;
  type: TransactionType;
}

/**
 * Resposta de agente com estatísticas
 */
export interface AgentDetailResponse {
  id: string;
  name: string;
  email: string;
  apiKey: string;
  balance: number;
  ggrRate: number;
  allowedGames: string[];
  isActive: boolean;
  createdAt: Date;
  stats: {
    totalSessions: number;
    totalTransactions: number;
    totalCreditsAdded: number;
    totalGgrDeducted: number;
  };
}

/**
 * Resposta de listagem de agentes
 */
export interface AgentListResponse {
  id: string;
  name: string;
  email: string;
  balance: number;
  ggrRate: number;
  isActive: boolean;
  createdAt: Date;
}
