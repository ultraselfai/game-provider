import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Agent } from '../database/entities/agent.entity';
import { AgentTransaction, AgentTransactionType } from '../database/entities/agent-transaction.entity';
import { GameSession, SessionStatus as EntitySessionStatus } from '../database/entities/game-session.entity';
import { GameRound } from '../database/entities/game-round.entity';
import { Transaction, TransactionType as EntityTransactionType } from '../database/entities/transaction.entity';
import {
  DashboardStatsDto,
  SessionsQueryDto,
  SessionDto,
  SessionStatus,
  TransactionsQueryDto,
  TransactionDto,
  TransactionType,
  RoundsQueryDto,
  RoundDto,
  PaginatedResponseDto,
  OperatorDetailDto,
  UpdateOperatorDto,
} from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
    @InjectRepository(AgentTransaction)
    private readonly agentTransactionRepository: Repository<AgentTransaction>,
    @InjectRepository(GameSession)
    private readonly sessionRepository: Repository<GameSession>,
    @InjectRepository(GameRound)
    private readonly roundRepository: Repository<GameRound>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  // =============================
  // Dashboard Stats
  // =============================
  async getDashboardStats(): Promise<DashboardStatsDto> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Counts
    const [totalAgents, totalSessions, totalRounds] = await Promise.all([
      this.agentRepository.count(),
      this.sessionRepository.count(),
      this.roundRepository.count(),
    ]);

    // Active sessions (not expired)
    const activeSessions = await this.sessionRepository.count({
      where: {
        expiresAt: MoreThanOrEqual(new Date()),
        status: EntitySessionStatus.ACTIVE,
      },
    });

    // Transaction totals - debit = bet, credit = win
    const betTotal = await this.transactionRepository
      .createQueryBuilder('t')
      .select('COALESCE(SUM(t.amount), 0)', 'total')
      .where('t.type = :type', { type: EntityTransactionType.DEBIT })
      .getRawOne();

    const winTotal = await this.transactionRepository
      .createQueryBuilder('t')
      .select('COALESCE(SUM(t.amount), 0)', 'total')
      .where('t.type = :type', { type: EntityTransactionType.CREDIT })
      .getRawOne();

    // GGR collected from agents
    const ggrCollected = await this.agentTransactionRepository
      .createQueryBuilder('at')
      .select('COALESCE(SUM(at.amount), 0)', 'total')
      .where('at.type = :type', { type: AgentTransactionType.GGR_DEDUCTION })
      .getRawOne();

    // Total credits added to agents
    const creditsAdded = await this.agentTransactionRepository
      .createQueryBuilder('at')
      .select('COALESCE(SUM(at.amount), 0)', 'total')
      .where('at.type = :type', { type: AgentTransactionType.CREDIT_ADDITION })
      .getRawOne();

    // Today's stats
    const todayRounds = await this.roundRepository.count({
      where: {
        createdAt: MoreThanOrEqual(today),
      },
    });

    const todayBetTotal = await this.transactionRepository
      .createQueryBuilder('t')
      .select('COALESCE(SUM(t.amount), 0)', 'total')
      .where('t.type = :type', { type: EntityTransactionType.DEBIT })
      .andWhere('t.createdAt >= :today', { today })
      .getRawOne();

    const todayWinTotal = await this.transactionRepository
      .createQueryBuilder('t')
      .select('COALESCE(SUM(t.amount), 0)', 'total')
      .where('t.type = :type', { type: EntityTransactionType.CREDIT })
      .andWhere('t.createdAt >= :today', { today })
      .getRawOne();

    const todayGgrCollected = await this.agentTransactionRepository
      .createQueryBuilder('at')
      .select('COALESCE(SUM(at.amount), 0)', 'total')
      .where('at.type = :type', { type: AgentTransactionType.GGR_DEDUCTION })
      .andWhere('at.createdAt >= :today', { today })
      .getRawOne();

    const totalBets = parseFloat(betTotal?.total || '0');
    const totalWins = parseFloat(winTotal?.total || '0');
    const todayBets = parseFloat(todayBetTotal?.total || '0');
    const todayWins = parseFloat(todayWinTotal?.total || '0');

    return {
      totalOperators: totalAgents, // Mantém nome para compatibilidade com frontend
      activeSessions,
      totalSessions,
      totalRounds,
      totalBets,
      totalWins,
      ggr: parseFloat(ggrCollected?.total || '0'), // GGR real coletado dos agentes
      todayRounds,
      todayBets,
      todayWins,
      todayGgr: parseFloat(todayGgrCollected?.total || '0'),
      // Novos campos
      totalCreditsAdded: parseFloat(creditsAdded?.total || '0'),
    };
  }

  // =============================
  // Sessions
  // =============================
  async getSessions(query: SessionsQueryDto): Promise<PaginatedResponseDto<SessionDto>> {
    const { page = 1, limit = 20, search, operatorId, status, startDate, endDate } = query;
    const skip = (page - 1) * limit;

    const qb = this.sessionRepository
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.agent', 'agent');

    // Apply filters
    if (search) {
      qb.andWhere('(s.playerId LIKE :search OR s.sessionToken LIKE :search)', {
        search: `%${search}%`,
      });
    }

    if (operatorId) {
      qb.andWhere('s.operatorId = :operatorId', { operatorId });
    }

    if (status === SessionStatus.ACTIVE) {
      qb.andWhere('s.expiresAt > :now', { now: new Date() });
      qb.andWhere('s.status = :activeStatus', { activeStatus: EntitySessionStatus.ACTIVE });
    } else if (status === SessionStatus.EXPIRED) {
      qb.andWhere('(s.expiresAt <= :now OR s.status = :expiredStatus)', {
        now: new Date(),
        expiredStatus: EntitySessionStatus.EXPIRED,
      });
    }

    if (startDate) {
      qb.andWhere('s.createdAt >= :startDate', { startDate: new Date(startDate) });
    }

    if (endDate) {
      qb.andWhere('s.createdAt <= :endDate', { endDate: new Date(endDate) });
    }

    const [sessions, total] = await qb
      .orderBy('s.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    // Map to DTOs with additional data
    const data: SessionDto[] = await Promise.all(
      sessions.map(async (session) => {
        // Get session stats
        const roundStats = await this.roundRepository
          .createQueryBuilder('r')
          .select('COUNT(*)', 'count')
          .addSelect('COALESCE(SUM(r.betAmount), 0)', 'totalBets')
          .addSelect('COALESCE(SUM(r.winAmount), 0)', 'totalWins')
          .where('r.sessionId = :sessionId', { sessionId: session.id })
          .getRawOne();

        return {
          id: session.id,
          sessionToken: session.sessionToken.substring(0, 20) + '...',
          userId: session.playerId,
          gameId: session.gameCode,
          operatorId: session.operatorId, // Mantém nome para compatibilidade (agora é agentId)
          operatorName: session.agent?.name || 'Unknown',
          currency: session.playerCurrency,
          status: new Date() > new Date(session.expiresAt) ? SessionStatus.EXPIRED : SessionStatus.ACTIVE,
          totalBets: parseFloat(roundStats?.totalBets || '0'),
          totalWins: parseFloat(roundStats?.totalWins || '0'),
          roundsPlayed: parseInt(roundStats?.count || '0'),
          createdAt: session.createdAt,
          expiresAt: session.expiresAt,
        };
      }),
    );

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getSessionById(id: string): Promise<SessionDto | null> {
    const session = await this.sessionRepository.findOne({
      where: { id },
      relations: ['agent'],
    });

    if (!session) return null;

    const roundStats = await this.roundRepository
      .createQueryBuilder('r')
      .select('COUNT(*)', 'count')
      .addSelect('COALESCE(SUM(r.betAmount), 0)', 'totalBets')
      .addSelect('COALESCE(SUM(r.winAmount), 0)', 'totalWins')
      .where('r.sessionId = :sessionId', { sessionId: session.id })
      .getRawOne();

    return {
      id: session.id,
      sessionToken: session.sessionToken,
      userId: session.playerId,
      gameId: session.gameCode,
      operatorId: session.operatorId,
      operatorName: session.agent?.name || 'Unknown',
      currency: session.playerCurrency,
      status: new Date() > new Date(session.expiresAt) ? SessionStatus.EXPIRED : SessionStatus.ACTIVE,
      totalBets: parseFloat(roundStats?.totalBets || '0'),
      totalWins: parseFloat(roundStats?.totalWins || '0'),
      roundsPlayed: parseInt(roundStats?.count || '0'),
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
    };
  }

  // =============================
  // Transactions
  // =============================
  async getTransactions(
    query: TransactionsQueryDto,
  ): Promise<PaginatedResponseDto<TransactionDto>> {
    const { page = 1, limit = 20, type, operatorId, sessionId, userId, startDate, endDate } = query;
    const skip = (page - 1) * limit;

    const qb = this.transactionRepository
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.agent', 'agent')
      .leftJoinAndSelect('t.session', 'session');

    if (type) {
      // Map DTO type to entity type
      const entityType = type === TransactionType.BET ? EntityTransactionType.DEBIT
        : type === TransactionType.WIN ? EntityTransactionType.CREDIT
        : type === TransactionType.REFUND ? EntityTransactionType.REFUND
        : null;
      if (entityType) {
        qb.andWhere('t.type = :type', { type: entityType });
      }
    }

    if (operatorId) {
      qb.andWhere('t.operatorId = :operatorId', { operatorId });
    }

    if (sessionId) {
      qb.andWhere('t.sessionId = :sessionId', { sessionId });
    }

    if (userId) {
      qb.andWhere('t.playerId = :userId', { userId });
    }

    if (startDate) {
      qb.andWhere('t.createdAt >= :startDate', { startDate: new Date(startDate) });
    }

    if (endDate) {
      qb.andWhere('t.createdAt <= :endDate', { endDate: new Date(endDate) });
    }

    const [transactions, total] = await qb
      .orderBy('t.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    // Map entity types to DTO types
    const mapType = (entityType: EntityTransactionType): TransactionType => {
      switch (entityType) {
        case EntityTransactionType.DEBIT: return TransactionType.BET;
        case EntityTransactionType.CREDIT: return TransactionType.WIN;
        case EntityTransactionType.REFUND: return TransactionType.REFUND;
        default: return TransactionType.BET;
      }
    };

    const data: TransactionDto[] = transactions.map((t) => ({
      id: t.id,
      type: mapType(t.type),
      amount: Number(t.amount),
      currency: t.currency,
      userId: t.playerId,
      sessionId: t.sessionId,
      operatorId: t.operatorId,
      operatorName: t.agent?.name || 'Unknown',
      gameId: t.session?.gameCode || 'Unknown',
      roundId: t.roundId,
      status: t.status as 'pending' | 'completed' | 'failed',
      createdAt: t.createdAt,
    }));

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // =============================
  // Game Rounds
  // =============================
  async getRounds(query: RoundsQueryDto): Promise<PaginatedResponseDto<RoundDto>> {
    const { page = 1, limit = 20, operatorId, sessionId, userId, gameId, startDate, endDate } = query;
    const skip = (page - 1) * limit;

    const qb = this.roundRepository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.session', 'session');

    if (operatorId) {
      qb.andWhere('r.operatorId = :operatorId', { operatorId });
    }

    if (sessionId) {
      qb.andWhere('r.sessionId = :sessionId', { sessionId });
    }

    if (userId) {
      qb.andWhere('r.playerId = :userId', { userId });
    }

    if (gameId) {
      qb.andWhere('r.gameCode = :gameId', { gameId });
    }

    if (startDate) {
      qb.andWhere('r.createdAt >= :startDate', { startDate: new Date(startDate) });
    }

    if (endDate) {
      qb.andWhere('r.createdAt <= :endDate', { endDate: new Date(endDate) });
    }

    const [rounds, total] = await qb
      .orderBy('r.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const data: RoundDto[] = rounds.map((r) => ({
      id: r.id,
      sessionId: r.sessionId,
      operatorId: r.operatorId,
      userId: r.playerId,
      gameId: r.gameCode,
      betAmount: Number(r.betAmount),
      winAmount: Number(r.winAmount),
      currency: r.currency,
      result: r.resultData,
      createdAt: r.createdAt,
    }));

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // =============================
  // Agents (Admin CRUD) - Antigo "Operators"
  // =============================
  async getOperators(): Promise<OperatorDetailDto[]> {
    const agents = await this.agentRepository.find({
      order: { createdAt: 'DESC' },
    });

    return Promise.all(
      agents.map(async (agent) => {
        const stats = await this.getAgentStats(agent.id);
        return {
          id: agent.id,
          name: agent.name,
          apiKey: agent.apiKey.substring(0, 20) + '...',
          webhookUrl: agent.webhookUrl || '',
          status: agent.isActive ? 'active' as const : 'inactive' as const,
          allowedGames: agent.allowedGames || [],
          allowedCurrencies: ['BRL', 'USD'],
          settings: {
            balance: Number(agent.balance),
            ggrRate: Number(agent.ggrRate),
            email: agent.email,
          },
          ...stats,
          createdAt: agent.createdAt,
          updatedAt: agent.updatedAt,
        };
      }),
    );
  }

  async getOperatorById(id: string): Promise<OperatorDetailDto | null> {
    const agent = await this.agentRepository.findOne({ where: { id } });
    if (!agent) return null;

    const stats = await this.getAgentStats(agent.id);

    return {
      id: agent.id,
      name: agent.name,
      apiKey: agent.apiKey,
      webhookUrl: agent.webhookUrl || '',
      status: agent.isActive ? 'active' as const : 'inactive' as const,
      allowedGames: agent.allowedGames || [],
      allowedCurrencies: ['BRL', 'USD'],
      settings: {
        balance: Number(agent.balance),
        ggrRate: Number(agent.ggrRate),
        email: agent.email,
      },
      ...stats,
      createdAt: agent.createdAt,
      updatedAt: agent.updatedAt,
    };
  }

  async updateOperator(id: string, dto: UpdateOperatorDto): Promise<OperatorDetailDto | null> {
    const agent = await this.agentRepository.findOne({ where: { id } });
    if (!agent) return null;

    if (dto.name) agent.name = dto.name;
    if (dto.webhookUrl) agent.webhookUrl = dto.webhookUrl;
    if (dto.status) agent.isActive = dto.status === 'active';

    await this.agentRepository.save(agent);

    return this.getOperatorById(id);
  }

  async regenerateApiKey(id: string): Promise<{ apiKey: string } | null> {
    const agent = await this.agentRepository.findOne({ where: { id } });
    if (!agent) return null;

    const newApiKey = this.generateApiKey();
    agent.apiKey = newApiKey;
    await this.agentRepository.save(agent);

    return { apiKey: newApiKey };
  }

  private async getAgentStats(agentId: string) {
    const totalSessions = await this.sessionRepository.count({
      where: { operatorId: agentId }, // operatorId aponta para agent
    });

    const roundStats = await this.roundRepository
      .createQueryBuilder('r')
      .select('COUNT(*)', 'count')
      .addSelect('COALESCE(SUM(r.betAmount), 0)', 'totalBets')
      .addSelect('COALESCE(SUM(r.winAmount), 0)', 'totalWins')
      .where('r.operatorId = :agentId', { agentId })
      .getRawOne();

    // GGR coletado deste agente
    const ggrStats = await this.agentTransactionRepository
      .createQueryBuilder('at')
      .select('COALESCE(SUM(at.amount), 0)', 'totalGgr')
      .where('at.agentId = :agentId', { agentId })
      .andWhere('at.type = :type', { type: AgentTransactionType.GGR_DEDUCTION })
      .getRawOne();

    // Créditos adicionados a este agente
    const creditStats = await this.agentTransactionRepository
      .createQueryBuilder('at')
      .select('COALESCE(SUM(at.amount), 0)', 'totalCredits')
      .where('at.agentId = :agentId', { agentId })
      .andWhere('at.type = :type', { type: AgentTransactionType.CREDIT_ADDITION })
      .getRawOne();

    const totalRounds = parseInt(roundStats?.count || '0');
    const totalBets = parseFloat(roundStats?.totalBets || '0');
    const totalWins = parseFloat(roundStats?.totalWins || '0');

    return {
      totalSessions,
      totalRounds,
      totalBets,
      totalWins,
      ggr: parseFloat(ggrStats?.totalGgr || '0'),
      totalCreditsAdded: parseFloat(creditStats?.totalCredits || '0'),
    };
  }

  private generateApiKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'gp_';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
