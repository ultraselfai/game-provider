import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  Logger,
  UseGuards,
  Request,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PoolService } from './pool.service';
import { PoolPhase } from '../database/entities/agent-pool.entity';

// DTOs para as requisições
interface DepositDto {
  amount: number;
  description?: string;
}

interface WithdrawDto {
  amount: number;
  description?: string;
}

interface SetPhaseDto {
  phase: PoolPhase;
}

interface UpdateConfigDto {
  maxRiskPercent?: number;
  maxAbsolutePayout?: number;
  minPoolForPlay?: number;
  autoPhaseEnabled?: boolean;
  
  // Configurações de Retenção
  retentionWinChance?: number;
  retentionMaxMultiplier?: number;
  
  // Configurações de Normal
  normalWinChance?: number;
  normalMaxMultiplier?: number;
  
  // Configurações de Liberação
  releaseWinChance?: number;
  releaseMaxMultiplier?: number;
  
  // Thresholds para mudança automática de fase
  retentionThreshold?: number;
  releaseThreshold?: number;
}

interface TransactionFilters {
  type?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

/**
 * Controller para gerenciamento de Pool de Agentes
 * 
 * Endpoints disponíveis:
 * - GET /pool/:agentId - Obtém informações do pool
 * - POST /pool/:agentId/deposit - Deposita no pool
 * - POST /pool/:agentId/withdraw - Retira do pool
 * - PUT /pool/:agentId/phase - Define fase manualmente
 * - PUT /pool/:agentId/config - Atualiza configurações
 * - GET /pool/:agentId/transactions - Histórico de transações
 * - GET /pool/:agentId/stats - Estatísticas detalhadas
 */
@Controller('api/v1/pool')
export class PoolController {
  private readonly logger = new Logger(PoolController.name);

  constructor(private readonly poolService: PoolService) {}

  /**
   * Obtém informações completas do pool de um agente
   */
  @Get(':agentId')
  async getPool(@Param('agentId') agentId: string) {
    this.logger.log(`[POOL API] GET pool for agent: ${agentId}`);
    
    const pool = await this.poolService.getOrCreatePool(agentId);
    
    return {
      success: true,
      data: {
        id: pool.id,
        agentId: pool.agentId,
        balance: Number(pool.balance),
        currentPhase: pool.currentPhase,
        
        // Configurações de risco
        maxRiskPercent: Number(pool.maxRiskPercent),
        maxAbsolutePayout: Number(pool.maxAbsolutePayout),
        minPoolForPlay: Number(pool.minPoolForPlay),
        
        // Configurações por fase
        phases: {
          retention: {
            winChance: pool.retentionWinChance,
            maxMultiplier: pool.retentionMaxMultiplier,
          },
          normal: {
            winChance: pool.normalWinChance,
            maxMultiplier: pool.normalMaxMultiplier,
          },
          release: {
            winChance: pool.releaseWinChance,
            maxMultiplier: pool.releaseMaxMultiplier,
          },
        },
        
        // Thresholds
        thresholds: {
          retention: Number(pool.retentionThreshold),
          release: Number(pool.releaseThreshold),
        },
        
        // Estatísticas
        stats: {
          totalBets: Number(pool.totalBets),
          totalPayouts: Number(pool.totalPayouts),
          totalSpins: pool.totalSpins,
          totalWins: pool.totalWins,
          biggestPayout: Number(pool.biggestPayout),
          realRtp: pool.realRtp,
          netProfit: pool.netProfit,
          winRate: pool.winRate,
        },
        
        // Configurações
        autoPhaseEnabled: pool.autoPhaseEnabled,
        
        // Timestamps
        createdAt: pool.createdAt,
        updatedAt: pool.updatedAt,
      },
    };
  }

  /**
   * Verifica limites de pagamento atuais
   */
  @Get(':agentId/limits')
  async getPayoutLimits(
    @Param('agentId') agentId: string,
    @Query('bet') bet: string = '1',
    @Query('cpl') cpl: string = '1',
  ) {
    this.logger.log(`[POOL API] GET limits for agent: ${agentId}, bet=${bet}, cpl=${cpl}`);
    
    const limits = await this.poolService.checkPayoutLimits(
      agentId,
      parseFloat(bet),
      parseFloat(cpl),
    );
    
    return {
      success: true,
      data: limits,
    };
  }

  /**
   * Deposita no pool do agente
   */
  @Post(':agentId/deposit')
  async deposit(
    @Param('agentId') agentId: string,
    @Body() dto: DepositDto,
  ) {
    this.logger.log(`[POOL API] DEPOSIT ${dto.amount} for agent: ${agentId}`);
    
    if (!dto.amount || dto.amount <= 0) {
      throw new BadRequestException('Amount must be greater than 0');
    }
    
    const pool = await this.poolService.manualDeposit(
      agentId,
      dto.amount,
      dto.description || 'Depósito manual via API',
      'api', // createdBy
    );
    
    return {
      success: true,
      message: `Deposited ${dto.amount} to pool`,
      data: {
        newBalance: Number(pool.balance),
      },
    };
  }

  /**
   * Retira do pool do agente
   */
  @Post(':agentId/withdraw')
  async withdraw(
    @Param('agentId') agentId: string,
    @Body() dto: WithdrawDto,
  ) {
    this.logger.log(`[POOL API] WITHDRAW ${dto.amount} for agent: ${agentId}`);
    
    if (!dto.amount || dto.amount <= 0) {
      throw new BadRequestException('Amount must be greater than 0');
    }
    
    const pool = await this.poolService.manualWithdraw(
      agentId,
      dto.amount,
      dto.description || 'Retirada manual via API',
      'api', // createdBy
    );
    
    return {
      success: true,
      message: `Withdrew ${dto.amount} from pool`,
      data: {
        newBalance: Number(pool.balance),
      },
    };
  }

  /**
   * Define a fase manualmente
   */
  @Put(':agentId/phase')
  async setPhase(
    @Param('agentId') agentId: string,
    @Body() dto: SetPhaseDto,
  ) {
    this.logger.log(`[POOL API] SET PHASE ${dto.phase} for agent: ${agentId}`);
    
    const validPhases = ['retention', 'normal', 'release'] as const;
    if (!validPhases.includes(dto.phase as any)) {
      throw new BadRequestException(`Invalid phase. Must be one of: ${validPhases.join(', ')}`);
    }
    
    const pool = await this.poolService.setPhase(agentId, dto.phase);
    
    return {
      success: true,
      message: `Phase set to ${dto.phase}`,
      data: {
        currentPhase: pool.currentPhase,
        autoPhaseEnabled: pool.autoPhaseEnabled,
      },
    };
  }

  /**
   * Atualiza configurações do pool
   */
  @Put(':agentId/config')
  async updateConfig(
    @Param('agentId') agentId: string,
    @Body() dto: UpdateConfigDto,
  ) {
    this.logger.log(`[POOL API] UPDATE CONFIG for agent: ${agentId}`);
    
    const pool = await this.poolService.updateConfig(agentId, dto);
    
    return {
      success: true,
      message: 'Pool configuration updated',
      data: {
        maxRiskPercent: Number(pool.maxRiskPercent),
        maxAbsolutePayout: Number(pool.maxAbsolutePayout),
        minPoolForPlay: Number(pool.minPoolForPlay),
        autoPhaseEnabled: pool.autoPhaseEnabled,
        phases: {
          retention: {
            winChance: pool.retentionWinChance,
            maxMultiplier: pool.retentionMaxMultiplier,
          },
          normal: {
            winChance: pool.normalWinChance,
            maxMultiplier: pool.normalMaxMultiplier,
          },
          release: {
            winChance: pool.releaseWinChance,
            maxMultiplier: pool.releaseMaxMultiplier,
          },
        },
        thresholds: {
          retention: Number(pool.retentionThreshold),
          release: Number(pool.releaseThreshold),
        },
      },
    };
  }

  /**
   * Obtém histórico de transações do pool
   */
  @Get(':agentId/transactions')
  async getTransactions(
    @Param('agentId') agentId: string,
    @Query() filters: TransactionFilters,
  ) {
    this.logger.log(`[POOL API] GET transactions for agent: ${agentId}`);
    
    const { transactions, total } = await this.poolService.getTransactionHistory(
      agentId,
      {
        type: filters.type,
        startDate: filters.startDate ? new Date(filters.startDate) : undefined,
        endDate: filters.endDate ? new Date(filters.endDate) : undefined,
        limit: filters.limit ? parseInt(filters.limit.toString()) : 50,
        offset: filters.offset ? parseInt(filters.offset.toString()) : 0,
      },
    );
    
    return {
      success: true,
      data: {
        transactions: transactions.map(tx => ({
          id: tx.id,
          type: tx.type,
          amount: Number(tx.amount),
          balanceBefore: Number(tx.balanceBefore),
          balanceAfter: Number(tx.balanceAfter),
          gameCode: tx.gameCode,
          playerId: tx.playerId,
          note: tx.note,
          createdAt: tx.createdAt,
        })),
        pagination: {
          total,
          limit: filters.limit || 50,
          offset: filters.offset || 0,
        },
      },
    };
  }

  /**
   * Obtém estatísticas detalhadas do pool
   */
  @Get(':agentId/stats')
  async getStats(
    @Param('agentId') agentId: string,
    @Query('period') period: string = '24h',
  ) {
    this.logger.log(`[POOL API] GET stats for agent: ${agentId}, period=${period}`);
    
    const stats = await this.poolService.getDetailedStats(agentId, period);
    
    return {
      success: true,
      data: stats,
    };
  }

  /**
   * Reseta estatísticas do pool (mantém saldo)
   */
  @Post(':agentId/reset-stats')
  async resetStats(@Param('agentId') agentId: string) {
    this.logger.log(`[POOL API] RESET stats for agent: ${agentId}`);
    
    const pool = await this.poolService.resetStats(agentId);
    
    return {
      success: true,
      message: 'Pool statistics reset',
      data: {
        balance: Number(pool.balance),
        totalBets: Number(pool.totalBets),
        totalPayouts: Number(pool.totalPayouts),
      },
    };
  }
}
