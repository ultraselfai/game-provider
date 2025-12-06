import { Injectable, UnauthorizedException, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { createHash, randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Agent, AgentTransaction, AgentTransactionType, AgentGameSettings, GameSession, SessionStatus, GameSettings } from '../database/entities';
import { RedisService } from '../redis';
import { AgentAuthDto, CreateSessionDto, AuthResponse, SessionResponse, GameMode } from './dto/agent.dto';

@Injectable()
export class AgentService {
  private readonly logger = new Logger(AgentService.name);

  constructor(
    @InjectRepository(Agent)
    private readonly agentRepo: Repository<Agent>,
    @InjectRepository(AgentTransaction)
    private readonly agentTransactionRepo: Repository<AgentTransaction>,
    @InjectRepository(AgentGameSettings)
    private readonly agentGameSettingsRepo: Repository<AgentGameSettings>,
    @InjectRepository(GameSession)
    private readonly sessionRepo: Repository<GameSession>,
    @InjectRepository(GameSettings)
    private readonly gameSettingsRepo: Repository<GameSettings>,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  // =============================================
  // AUTENTICAÇÃO B2B (para integração da Bet)
  // =============================================

  /**
   * Autentica um agente via API Key/Secret
   * Retorna um token para requisições subsequentes
   */
  async authenticate(dto: AgentAuthDto): Promise<AuthResponse> {
    this.logger.log(`[AUTH] Attempting authentication for API Key: ${dto.apiKey.slice(0, 8)}...`);

    const agent = await this.agentRepo.findOne({
      where: { apiKey: dto.apiKey, isActive: true },
    });

    if (!agent) {
      this.logger.warn(`[AUTH] Invalid API Key: ${dto.apiKey.slice(0, 8)}...`);
      throw new UnauthorizedException('Invalid API credentials');
    }

    // Validar secret
    const secretHash = this.hashSecret(dto.apiSecret);
    if (agent.apiSecret !== secretHash) {
      this.logger.warn(`[AUTH] Invalid API Secret for agent: ${agent.name}`);
      throw new UnauthorizedException('Invalid API credentials');
    }

    // Gerar access token
    const accessToken = this.generateAccessToken(agent.id);
    const expiresIn = 3600; // 1 hora

    // Salvar no Redis
    await this.redisService.set(`agent:token:${accessToken}`, {
      agentId: agent.id,
      agentName: agent.name,
      createdAt: new Date().toISOString(),
    }, expiresIn);

    this.logger.log(`[AUTH] Agent authenticated: ${agent.name}`);

    return {
      accessToken,
      expiresIn,
      agentId: agent.id,
      operatorId: agent.id, // backward compatibility
    };
  }

  /**
   * Valida um access token e retorna o agente
   */
  async validateToken(accessToken: string): Promise<{ operatorId: string; operatorName: string }> {
    const tokenData = await this.redisService.get<{
      agentId: string;
      agentName: string;
    }>(`agent:token:${accessToken}`);

    if (!tokenData) {
      throw new UnauthorizedException('Invalid or expired access token');
    }

    // Backward compatibility
    return {
      operatorId: tokenData.agentId,
      operatorName: tokenData.agentName,
    };
  }

  // =============================================
  // LOGIN DO AGENTE (Email + Senha) - Para o Painel
  // =============================================

  /**
   * Altera a senha do agente autenticado
   */
  async changePassword(agentId: string, currentPassword: string, newPassword: string): Promise<void> {
    const agent = await this.agentRepo.findOne({ where: { id: agentId } });
    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    // Verificar senha atual
    const isValidPassword = await bcrypt.compare(currentPassword, agent.passwordHash || '');
    if (!isValidPassword) {
      throw new BadRequestException('Senha atual incorreta');
    }

    // Validar nova senha
    if (newPassword.length < 6) {
      throw new BadRequestException('Nova senha deve ter pelo menos 6 caracteres');
    }

    // Atualizar senha
    agent.passwordHash = await bcrypt.hash(newPassword, 10);
    await this.agentRepo.save(agent);

    this.logger.log(`[AGENT] Password changed for: ${agent.email}`);
  }

  /**
   * Admin altera a senha de um agente
   */
  async adminResetAgentPassword(agentId: string, newPassword: string): Promise<void> {
    const agent = await this.agentRepo.findOne({ where: { id: agentId } });
    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    // Validar nova senha
    if (newPassword.length < 6) {
      throw new BadRequestException('Nova senha deve ter pelo menos 6 caracteres');
    }

    // Atualizar senha
    agent.passwordHash = await bcrypt.hash(newPassword, 10);
    await this.agentRepo.save(agent);

    this.logger.log(`[ADMIN] Password reset for agent: ${agent.email}`);
  }

  /**
   * Login do agente usando email e senha
   * Para uso no painel do agente
   */
  async loginWithPassword(email: string, password: string): Promise<{
    token: string;
    expiresIn: number;
    agent: Partial<Agent>;
  }> {
    this.logger.log(`[LOGIN] Attempting login for: ${email}`);

    const agent = await this.agentRepo.findOne({
      where: { email, isActive: true },
    });

    if (!agent) {
      this.logger.warn(`[LOGIN] Agent not found: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, agent.passwordHash || '');
    if (!isValidPassword) {
      this.logger.warn(`[LOGIN] Invalid password for: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Gerar token de acesso
    const accessToken = this.generateAccessToken(agent.id);
    const expiresIn = 86400; // 24 horas

    // Salvar no Redis
    await this.redisService.set(`agent:token:${accessToken}`, {
      agentId: agent.id,
      agentName: agent.name,
      createdAt: new Date().toISOString(),
    }, expiresIn);

    // Atualizar último login
    agent.lastLoginAt = new Date();
    await this.agentRepo.save(agent);

    this.logger.log(`[LOGIN] Agent logged in: ${agent.name}`);

    return {
      token: accessToken,
      expiresIn,
      agent: {
        id: agent.id,
        name: agent.name,
        email: agent.email,
        spinCredits: agent.spinCredits,
        totalSpinsConsumed: agent.totalSpinsConsumed,
        totalCreditsPurchased: agent.totalCreditsPurchased,
        creditPrice: agent.creditPrice,
        isActive: agent.isActive,
        apiKey: agent.apiKey,
        apiSecret: agent.apiSecret, // Mostrar para o agente no painel
      },
    };
  }

  /**
   * Lista todos os jogos disponíveis (para admin)
   */
  async getAllGames(): Promise<any[]> {
    // Lista estática dos jogos disponíveis
    // TODO: Mover para banco de dados quando necessário
    return [
      { id: '1', gameCode: 'fortunetiger', gameName: 'Fortune Tiger', provider: 'PGSoft', rtp: 96.81, volatility: 'medium', isActive: true },
      { id: '2', gameCode: 'fortuneox', gameName: 'Fortune Ox', provider: 'PGSoft', rtp: 96.75, volatility: 'medium', isActive: true },
      { id: '3', gameCode: 'fortunerabbit', gameName: 'Fortune Rabbit', provider: 'PGSoft', rtp: 96.71, volatility: 'medium', isActive: true },
      { id: '4', gameCode: 'fortunepanda', gameName: 'Fortune Panda', provider: 'PGSoft', rtp: 96.50, volatility: 'medium', isActive: true },
      { id: '5', gameCode: 'fortunemouse', gameName: 'Fortune Mouse', provider: 'PGSoft', rtp: 96.82, volatility: 'low', isActive: true },
      { id: '6', gameCode: 'bikiniparadise', gameName: 'Bikini Paradise', provider: 'PGSoft', rtp: 96.88, volatility: 'medium', isActive: true },
      { id: '7', gameCode: 'hoodvswoolf', gameName: 'Hood vs Wolf', provider: 'PGSoft', rtp: 96.50, volatility: 'high', isActive: true },
      { id: '8', gameCode: 'jackfrost', gameName: 'Jack Frost', provider: 'PGSoft', rtp: 96.45, volatility: 'medium', isActive: true },
      { id: '9', gameCode: 'phoenixrises', gameName: 'Phoenix Rises', provider: 'PGSoft', rtp: 96.67, volatility: 'high', isActive: true },
      { id: '10', gameCode: 'queenofbounty', gameName: 'Queen of Bounty', provider: 'PGSoft', rtp: 96.55, volatility: 'medium', isActive: true },
      { id: '11', gameCode: 'songkranparty', gameName: 'Songkran Party', provider: 'PGSoft', rtp: 96.60, volatility: 'low', isActive: true },
      { id: '12', gameCode: 'treasuresofaztec', gameName: 'Treasures of Aztec', provider: 'PGSoft', rtp: 96.70, volatility: 'high', isActive: true },
    ];
  }

  /**
   * Lista jogos disponíveis para o agente (filtrado por allowedGames)
   */
  async getAvailableGames(agentId?: string): Promise<any[]> {
    const allGames = await this.getAllGames();

    // Se não passou agentId, retornar todos (compatibilidade)
    if (!agentId) {
      return allGames;
    }

    // Buscar agente para verificar jogos permitidos
    const agent = await this.agentRepo.findOne({ where: { id: agentId } });
    if (!agent) {
      return allGames;
    }

    // Se allowedGames está vazio ou undefined, todos os jogos são permitidos
    if (!agent.allowedGames || agent.allowedGames.length === 0) {
      this.logger.log(`[GAMES] Agent ${agent.name} has access to ALL games`);
      return allGames;
    }

    // Filtrar apenas jogos permitidos
    const filteredGames = allGames.filter(game => agent.allowedGames.includes(game.gameCode));
    this.logger.log(`[GAMES] Agent ${agent.name} has access to ${filteredGames.length}/${allGames.length} games`);
    
    return filteredGames;
  }

  // =============================================
  // SESSÕES DE JOGO
  // =============================================

  /**
   * Cria uma sessão de jogo para um jogador
   */
  async createSession(agentId: string, dto: CreateSessionDto): Promise<SessionResponse> {
    this.logger.log(`[SESSION] Creating session for player: ${dto.userId}, game: ${dto.gameId}`);

    const agent = await this.agentRepo.findOne({
      where: { id: agentId, isActive: true },
    });

    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    // Verificar se agente tem créditos de spin
    if (Number(agent.spinCredits) <= 0) {
      throw new BadRequestException('Agent has no spin credits');
    }

    // Verificar se o jogo está permitido para este agente
    if (agent.allowedGames && agent.allowedGames.length > 0) {
      if (!agent.allowedGames.includes(dto.gameId)) {
        this.logger.warn(`[SESSION] Agent ${agent.name} tried to access unauthorized game: ${dto.gameId}`);
        throw new BadRequestException(`Game '${dto.gameId}' is not allowed for this agent`);
      }
    }

    const sessionToken = this.generateSessionToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const session = this.sessionRepo.create({
      sessionToken,
      agentId,
      playerId: dto.userId,
      gameCode: dto.gameId,
      playerCurrency: dto.currency || 'BRL',
      status: SessionStatus.ACTIVE,
      cachedBalance: dto.playerBalance || 1000, // Saldo inicial do jogador
      metadata: {
        mode: dto.mode || GameMode.REAL,
        returnUrl: dto.returnUrl,
        ...dto.metadata,
      },
      expiresAt,
    });

    await this.sessionRepo.save(session);

    // Cache no Redis
    await this.redisService.cacheSession(sessionToken, {
      playerId: dto.userId,
      gameCode: dto.gameId,
      balance: dto.playerBalance || 1000,
      operatorId: agentId,
    });

    const baseUrl = this.configService.get<string>('BASE_URL', 'http://localhost:3006');
    const launchUrl = `${baseUrl}/${dto.gameId}/?token=${sessionToken}`;

    this.logger.log(`[SESSION] Session created: ${sessionToken.slice(0, 16)}... for player ${dto.userId}`);

    return {
      sessionToken,
      launchUrl,
      expiresAt: expiresAt.toISOString(),
    };
  }

  /**
   * Busca sessão por token
   */
  async getSessionByToken(token: string): Promise<GameSession | null> {
    return this.sessionRepo.findOne({
      where: { sessionToken: token },
      relations: ['agent'],
    });
  }

  /**
   * Encerra uma sessão
   */
  async closeSession(sessionToken: string): Promise<void> {
    await this.sessionRepo.update(
      { sessionToken },
      { status: SessionStatus.CLOSED },
    );
    await this.redisService.invalidateSession(sessionToken);
    this.logger.log(`[SESSION] Session closed: ${sessionToken.slice(0, 16)}...`);
  }

  // =============================================
  // CRUD DE AGENTES (para Admin)
  // =============================================

  /**
   * Lista todos os agentes
   */
  async listAgents(): Promise<Agent[]> {
    return this.agentRepo.find({
      select: ['id', 'name', 'email', 'apiKey', 'isActive', 'spinCredits', 'totalCreditsPurchased', 'totalSpinsConsumed', 'totalDeposited', 'createdAt', 'lastLoginAt'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Busca agente por ID
   */
  async getAgentById(id: string): Promise<Agent | null> {
    return this.agentRepo.findOne({ where: { id } });
  }

  /**
   * Cria novo agente
   */
  async createAgent(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    initialCredits?: number; // Créditos de spin iniciais
  }): Promise<{ agent: Agent; apiSecret: string }> {
    // Verificar se email já existe
    const existing = await this.agentRepo.findOne({ where: { email: data.email } });
    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    const apiKey = `ag_${randomBytes(16).toString('hex')}`;
    const apiSecret = randomBytes(32).toString('hex');
    const passwordHash = await bcrypt.hash(data.password, 10);

    const initialCredits = data.initialCredits || 0;
    const creditPrice = 0.10; // R$ 0,10 por spin
    const initialBalance = initialCredits * creditPrice;

    const agent = this.agentRepo.create({
      name: data.name,
      email: data.email,
      passwordHash,
      phone: data.phone,
      apiKey,
      apiSecret: this.hashSecret(apiSecret),
      spinCredits: initialCredits,
      balance: initialBalance,
      creditPrice,
      totalCreditsPurchased: initialCredits,
      totalSpinsConsumed: 0,
      totalDeposited: initialBalance,
      isActive: true,
      useLocalBalance: true,
    });

    await this.agentRepo.save(agent);

    // Registrar compra inicial de créditos se houver
    if (initialCredits > 0) {
      await this.recordAgentTransaction(agent.id, {
        type: AgentTransactionType.CREDIT_ADDITION,
        amount: initialCredits,
        previousBalance: 0,
        newBalance: initialCredits,
        description: `Compra inicial: ${initialCredits} créditos de spin`,
        createdBy: 'admin',
      });
    }

    this.logger.log(`[AGENT] Created agent: ${data.name} with ${initialCredits} spin credits`);

    return {
      agent: { ...agent, apiSecret: '***HIDDEN***', passwordHash: '***HIDDEN***' } as Agent,
      apiSecret,
    };
  }

  /**
   * Atualiza dados do agente
   */
  async updateAgent(id: string, data: Partial<{
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
    useLocalBalance: boolean;
    webhookUrl: string;
    balanceCallbackUrl: string;
    debitCallbackUrl: string;
    creditCallbackUrl: string;
    allowedGames: string[];
  }>): Promise<Agent | null> {
    const agent = await this.agentRepo.findOne({ where: { id } });
    if (!agent) return null;

    // Validação de jogos permitidos
    if (data.allowedGames !== undefined) {
      this.logger.log(`[UPDATE_AGENT] Updating allowed games for ${agent.name}: ${data.allowedGames.length === 0 ? 'ALL' : data.allowedGames.join(', ')}`);
    }

    Object.assign(agent, data);
    await this.agentRepo.save(agent);

    return agent;
  }

  // =============================================
  // GESTÃO DE CRÉDITOS DE SPIN DO AGENTE
  // =============================================

  /**
   * Adiciona créditos de spin ao agente (você recebeu PIX e adiciona aqui)
   * 1 crédito = 1 spin
   */
  async addSpinCredits(agentId: string, credits: number, description?: string): Promise<Agent> {
    if (credits <= 0) {
      throw new BadRequestException('Credits must be positive');
    }

    const agent = await this.agentRepo.findOne({ where: { id: agentId } });
    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    const creditsBefore = Number(agent.spinCredits);
    const creditsAfter = creditsBefore + credits;
    const valueInReais = credits * Number(agent.creditPrice);

    agent.spinCredits = creditsAfter;
    agent.totalCreditsPurchased = Number(agent.totalCreditsPurchased) + credits;
    agent.totalDeposited = Number(agent.totalDeposited) + valueInReais;
    agent.balance = Number(agent.balance) + valueInReais;
    await this.agentRepo.save(agent);

    await this.recordAgentTransaction(agentId, {
      type: AgentTransactionType.CREDIT_ADDITION,
      amount: credits,
      previousBalance: creditsBefore,
      newBalance: creditsAfter,
      description: description || `Compra de ${credits} créditos de spin (R$ ${valueInReais.toFixed(2)})`,
      createdBy: 'admin',
    });

    this.logger.log(`[AGENT] Added ${credits} spin credits to ${agent.name}. Total: ${creditsAfter}`);

    return agent;
  }

  /**
   * Remove créditos do agente (ajuste manual)
   */
  async removeSpinCredits(agentId: string, credits: number, description?: string): Promise<Agent> {
    if (credits <= 0) {
      throw new BadRequestException('Credits must be positive');
    }

    const agent = await this.agentRepo.findOne({ where: { id: agentId } });
    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    const creditsBefore = Number(agent.spinCredits);
    if (creditsBefore < credits) {
      throw new BadRequestException('Insufficient credits');
    }

    const creditsAfter = creditsBefore - credits;
    agent.spinCredits = creditsAfter;
    await this.agentRepo.save(agent);

    await this.recordAgentTransaction(agentId, {
      type: AgentTransactionType.MANUAL_ADJUSTMENT,
      amount: -credits,
      previousBalance: creditsBefore,
      newBalance: creditsAfter,
      description: description || `Ajuste manual: -${credits} créditos`,
      createdBy: 'admin',
    });

    this.logger.log(`[AGENT] Removed ${credits} credits from ${agent.name}. Remaining: ${creditsAfter}`);

    return agent;
  }

  /**
   * Consome 1 crédito do agente quando jogador faz SPIN
   * Chamado pelo motor de jogos a cada spin
   * Retorna false se não há créditos suficientes
   */
  async consumeSpinCredit(agentId: string, roundId: string): Promise<boolean> {
    const agent = await this.agentRepo.findOne({ where: { id: agentId } });
    if (!agent) return false;

    const creditsBefore = Number(agent.spinCredits);
    if (creditsBefore < 1) {
      this.logger.warn(`[AGENT] No credits left for agent ${agent.name}`);
      return false;
    }

    const creditsAfter = creditsBefore - 1;
    agent.spinCredits = creditsAfter;
    agent.totalSpinsConsumed = Number(agent.totalSpinsConsumed) + 1;
    await this.agentRepo.save(agent);

    await this.recordAgentTransaction(agentId, {
      type: AgentTransactionType.GGR_DEDUCTION,
      amount: -1,
      previousBalance: creditsBefore,
      newBalance: creditsAfter,
      description: `Spin consumido`,
      reference: roundId,
      createdBy: 'system',
    });

    this.logger.debug(`[AGENT] Spin consumed for ${agent.name}. Remaining: ${creditsAfter}`);

    return true;
  }

  /**
   * @deprecated Use addSpinCredits instead
   */
  async addCredit(agentId: string, amount: number, description?: string): Promise<Agent> {
    // Converte valor em R$ para créditos (assumindo R$ 0,10 por crédito)
    const credits = Math.floor(amount * 10);
    return this.addSpinCredits(agentId, credits, description);
  }

  /**
   * @deprecated Use removeSpinCredits instead
   */
  async removeCredit(agentId: string, amount: number, description?: string): Promise<Agent> {
    const credits = Math.floor(amount * 10);
    return this.removeSpinCredits(agentId, credits, description);
  }

  /**
   * @deprecated Não usado mais - agora é 1 spin = 1 crédito
   */
  async debitAgentBalance(agentId: string, amount: number, roundId: string): Promise<boolean> {
    // Ignora o amount, apenas consome 1 crédito por spin
    return this.consumeSpinCredit(agentId, roundId);
  }

  /**
   * @deprecated Não usado mais - o agente não recebe crédito quando jogador ganha
   * O prêmio é pago pela BET do agente, não pelo provedor
   */
  async creditAgentBalance(agentId: string, amount: number, roundId: string): Promise<void> {
    // Não faz nada - o prêmio é problema do agente, não do provedor
    this.logger.debug(`[AGENT] Player win of ${amount} - handled by agent's bet platform`);
  }

  /**
   * Lista transações do agente
   */
  async getAgentTransactions(agentId: string, limit = 50, offset = 0): Promise<AgentTransaction[]> {
    return this.agentTransactionRepo.find({
      where: { agentId },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  /**
   * Regenera API Key do agente
   */
  async regenerateApiKey(agentId: string): Promise<{ apiKey: string; apiSecret: string }> {
    const agent = await this.agentRepo.findOne({ where: { id: agentId } });
    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    const apiKey = `ag_${randomBytes(16).toString('hex')}`;
    const apiSecret = randomBytes(32).toString('hex');

    agent.apiKey = apiKey;
    agent.apiSecret = this.hashSecret(apiSecret);
    await this.agentRepo.save(agent);

    this.logger.log(`[AGENT] Regenerated API key for agent: ${agent.name}`);

    return { apiKey, apiSecret };
  }

  // =============================================
  // CONFIGURAÇÕES DE JOGOS DO AGENTE
  // =============================================

  /**
   * Lista configurações de jogos do agente
   * SEMPRE retorna as configurações DO AGENTE (cria padrão se não existir)
   * RTP e WinChance são exclusivamente do agente
   */
  async getAgentGameSettings(agentId: string): Promise<Array<{
    gameCode: string;
    gameName: string;
    rtp: number;
    winChance: number;
    isCustomized: boolean;
  }>> {
    // Busca jogos permitidos do agente
    const agent = await this.agentRepo.findOne({ where: { id: agentId } });
    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    // Busca todas as configurações globais de jogos (para nomes e lista de jogos)
    const globalSettings = await this.gameSettingsRepo.find();
    
    // Busca configurações do agente
    const agentSettings = await this.agentGameSettingsRepo.find({
      where: { agentId },
    });

    // Monta mapa de configurações do agente
    const agentSettingsMap = new Map(
      agentSettings.map(s => [s.gameCode, s])
    );

    // Filtra apenas jogos permitidos para o agente
    const allowedGames = agent.allowedGames || [];
    
    // Valores padrão para novos jogos
    const defaultRtp = 96.5;
    const defaultWinChance = 35;

    // Para cada jogo permitido, retorna a config do agente (ou cria padrão)
    const result = await Promise.all(
      globalSettings
        .filter(g => allowedGames.includes(g.gameCode))
        .map(async (global) => {
          let agentSetting = agentSettingsMap.get(global.gameCode);
          
          // Se não existe config do agente, cria uma padrão
          if (!agentSetting) {
            agentSetting = this.agentGameSettingsRepo.create({
              agentId,
              gameCode: global.gameCode,
              rtp: defaultRtp,
              winChance: defaultWinChance,
              isCustomized: false,
            });
            await this.agentGameSettingsRepo.save(agentSetting);
            this.logger.log(`[AGENT] Created default game settings for ${agent.name}: ${global.gameCode}`);
          }

          return {
            gameCode: global.gameCode,
            gameName: global.gameName,
            rtp: Number(agentSetting.rtp),
            winChance: agentSetting.winChance,
            isCustomized: agentSetting.isCustomized,
          };
        })
    );

    return result;
  }

  /**
   * Atualiza configurações de um jogo específico para o agente
   * RTP e WinChance são exclusivamente configurados pelo agente
   */
  async updateAgentGameSettings(
    agentId: string,
    gameCode: string,
    updates: { rtp?: number; winChance?: number }
  ): Promise<{
    gameCode: string;
    rtp: number;
    winChance: number;
    isCustomized: boolean;
  }> {
    // Validar agente
    const agent = await this.agentRepo.findOne({ where: { id: agentId } });
    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    // Validar se o jogo está permitido para o agente
    if (!agent.allowedGames?.includes(gameCode)) {
      throw new BadRequestException(`Game ${gameCode} is not allowed for this agent`);
    }

    // Validar RTP (0-99%)
    if (updates.rtp !== undefined && (updates.rtp < 0 || updates.rtp > 99)) {
      throw new BadRequestException('RTP must be between 0% and 99%');
    }

    // Validar winChance (0-99%)
    if (updates.winChance !== undefined && (updates.winChance < 0 || updates.winChance > 99)) {
      throw new BadRequestException('Win chance must be between 0% and 99%');
    }

    // Valores padrão
    const defaultRtp = 96.5;
    const defaultWinChance = 35;

    // Busca ou cria configuração do agente
    let agentSetting = await this.agentGameSettingsRepo.findOne({
      where: { agentId, gameCode },
    });

    if (!agentSetting) {
      agentSetting = this.agentGameSettingsRepo.create({
        agentId,
        gameCode,
        rtp: updates.rtp ?? defaultRtp,
        winChance: updates.winChance ?? defaultWinChance,
        isCustomized: true,
      });
    } else {
      if (updates.rtp !== undefined) agentSetting.rtp = updates.rtp;
      if (updates.winChance !== undefined) agentSetting.winChance = updates.winChance;
      agentSetting.isCustomized = true;
    }

    await this.agentGameSettingsRepo.save(agentSetting);

    this.logger.log(`[AGENT] Updated game settings for ${agent.name}: ${gameCode} - RTP: ${agentSetting.rtp}%, WinChance: ${agentSetting.winChance}%`);

    return {
      gameCode: agentSetting.gameCode,
      rtp: Number(agentSetting.rtp),
      winChance: agentSetting.winChance,
      isCustomized: agentSetting.isCustomized,
    };
  }

  /**
   * Reseta configurações de um jogo para os valores padrão
   * Valores padrão: RTP 96.5%, WinChance 35%
   */
  async resetAgentGameSettings(agentId: string, gameCode: string): Promise<void> {
    const agentSetting = await this.agentGameSettingsRepo.findOne({
      where: { agentId, gameCode },
    });
    
    if (agentSetting) {
      agentSetting.rtp = 96.5;
      agentSetting.winChance = 35;
      agentSetting.isCustomized = false;
      await this.agentGameSettingsRepo.save(agentSetting);
    }
    
    this.logger.log(`[AGENT] Reset game settings for agent ${agentId}: ${gameCode} to defaults (RTP: 96.5%, WinChance: 35%)`);
  }

  /**
   * Obtém configuração efetiva de um jogo para um agente
   * Prioridade: AgentGameSettings > GameSettings (global) > Default
   */
  async getEffectiveGameConfig(agentId: string, gameCode: string): Promise<{
    rtp: number;
    winChance: number;
  }> {
    // Busca ou cria configuração do agente
    let agentSetting = await this.agentGameSettingsRepo.findOne({
      where: { agentId, gameCode },
    });

    // Se não existe, cria com valores padrão
    if (!agentSetting) {
      agentSetting = this.agentGameSettingsRepo.create({
        agentId,
        gameCode,
        rtp: 96.5,
        winChance: 35,
        isCustomized: false,
      });
      await this.agentGameSettingsRepo.save(agentSetting);
      this.logger.log(`[AGENT] Auto-created game settings for agent ${agentId}: ${gameCode} with defaults`);
    }

    return {
      rtp: Number(agentSetting.rtp),
      winChance: agentSetting.winChance,
    };
  }

  // =============================================
  // HELPERS PRIVADOS
  // =============================================

  private async recordAgentTransaction(agentId: string, data: {
    type: AgentTransactionType;
    amount: number;
    previousBalance: number;
    newBalance: number;
    description?: string;
    reference?: string;
    createdBy?: string;
  }): Promise<void> {
    const transaction = this.agentTransactionRepo.create({
      agentId,
      ...data,
    });
    await this.agentTransactionRepo.save(transaction);
  }

  private generateAccessToken(agentId: string): string {
    const payload = `${agentId}:${Date.now()}:${randomBytes(16).toString('hex')}`;
    return createHash('sha256').update(payload).digest('hex');
  }

  private generateSessionToken(): string {
    return `sess_${uuidv4().replace(/-/g, '')}${randomBytes(8).toString('hex')}`;
  }

  private hashSecret(secret: string): string {
    return createHash('sha256').update(secret).digest('hex');
  }

  // =============================================
  // BACKWARD COMPATIBILITY ALIASES
  // =============================================
  async listOperators() { return this.listAgents(); }
  
  async createOperator(data: {
    name: string;
    webhookUrl?: string;
    balanceCallbackUrl?: string;
    debitCallbackUrl?: string;
    creditCallbackUrl?: string;
  }) {
    // Criar agente com dados básicos para compatibilidade
    return this.createAgent({
      name: data.name,
      email: `${data.name.toLowerCase().replace(/\s/g, '')}@temp.com`,
      password: randomBytes(8).toString('hex'),
      initialCredits: 0,
    });
  }
}
