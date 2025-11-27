import { IsString, IsNumber, IsNotEmpty, IsOptional, IsUUID, Min } from 'class-validator';

export class BalanceCallbackDto {
  @IsString()
  @IsNotEmpty()
  sessionToken: string;

  @IsString()
  @IsNotEmpty()
  playerId: string;
}

export class DebitCallbackDto {
  @IsString()
  @IsNotEmpty()
  sessionToken: string;

  @IsString()
  @IsNotEmpty()
  playerId: string;

  @IsString()
  @IsNotEmpty()
  roundId: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsNotEmpty()
  gameCode: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CreditCallbackDto {
  @IsString()
  @IsNotEmpty()
  sessionToken: string;

  @IsString()
  @IsNotEmpty()
  playerId: string;

  @IsString()
  @IsNotEmpty()
  roundId: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsNotEmpty()
  gameCode: string;

  @IsString()
  @IsOptional()
  description?: string;
}

// Responses esperadas do operador
export interface BalanceResponse {
  success: boolean;
  balance: number;
  currency: string;
}

export interface TransactionResponse {
  success: boolean;
  transactionId: string;
  balance: number;
  currency: string;
  error?: string;
}
