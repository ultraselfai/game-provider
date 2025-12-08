import { Controller, Get, Post, Param, Body, Logger, Res, Req, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { decToken, makeToken } from '../utils/token.util';
import { SlotEngine } from '../engine/slot-engine';
import { getGameConfig, GAME_CONFIGS } from './configs';
import { GameSession, SessionStatus } from '../database/entities/game-session.entity';
import { GameRound, RoundStatus } from '../database/entities/game-round.entity';
import { Transaction, TransactionType, TransactionStatus } from '../database/entities/transaction.entity';
import { Agent } from '../database/entities/agent.entity';
import { AgentTransaction, AgentTransactionType } from '../database/entities/agent-transaction.entity';
import { AgentGameSettings } from '../database/entities/agent-game-settings.entity';
import { WebhookService } from '../webhook/webhook.service';
import { GameSettingsService } from '../admin/game-settings.service';

interface SpinBody {
  betamount?: string;
  numline?: string;
  cpl?: string;
}

@Controller('api/vgames')
export class GamesController {
  private readonly logger = new Logger(GamesController.name);

  constructor(
    private readonly slotEngine: SlotEngine,
    private readonly webhookService: WebhookService,
    private readonly gameSettingsService: GameSettingsService,
    @InjectRepository(GameSession)
    private readonly sessionRepository: Repository<GameSession>,
    @InjectRepository(GameRound)
    private readonly roundRepository: Repository<GameRound>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
    @InjectRepository(AgentTransaction)
    private readonly agentTransactionRepository: Repository<AgentTransaction>,
    @InjectRepository(AgentGameSettings)
    private readonly agentGameSettingsRepository: Repository<AgentGameSettings>,
  ) {}

  /**
   * Verifica se agente usa webhooks remotos ou saldo local (modelo de créditos)
   * No novo modelo, a maioria dos agentes usará saldo local (balance)
   */
  private hasRemoteWebhooks(agent: Agent | null): boolean {
    return !!(agent?.debitCallbackUrl && agent?.creditCallbackUrl);
  }

  /**
   * Busca configurações efetivas do jogo para um agente específico
   * SEMPRE usa a configuração do agente - cria uma padrão se não existir
   * RTP e WinChance são exclusivamente configurados pelo agente
   */
  private async getAgentEffectiveConfig(agentId: string | undefined, gameCode: string): Promise<{
    rtp: number;
    winChance: number;
  }> {
    // Valores padrão caso não tenha agentId
    const defaultConfig = { rtp: 96.5, winChance: 35 };
    
    if (!agentId) {
      this.logger.log(`[CONFIG] No agent ID, using defaults for ${gameCode}: RTP=${defaultConfig.rtp}%, WinChance=${defaultConfig.winChance}%`);
      return defaultConfig;
    }

    // Busca config do agente
    let agentSetting = await this.agentGameSettingsRepository.findOne({
      where: { agentId, gameCode },
    });

    // Se não existe, cria uma config padrão para o agente
    if (!agentSetting) {
      this.logger.log(`[CONFIG] Creating default settings for agent ${agentId}, game ${gameCode}`);
      agentSetting = this.agentGameSettingsRepository.create({
        agentId,
        gameCode,
        rtp: defaultConfig.rtp,
        winChance: defaultConfig.winChance,
        isCustomized: false, // Indica que está usando valores padrão
      });
      await this.agentGameSettingsRepository.save(agentSetting);
    }

    this.logger.log(`[CONFIG] Using AGENT settings for ${gameCode}: RTP=${agentSetting.rtp}%, WinChance=${agentSetting.winChance}%`);
    return {
      rtp: Number(agentSetting.rtp),
      winChance: agentSetting.winChance,
    };
  }

  /**
   * Deduz GGR do saldo do agente
   * @param agent - Agente
   * @param totalBets - Valor total apostado na rodada
   */
  private async deductAgentGGR(agent: Agent, totalBets: number, sessionId: string): Promise<void> {
    if (!agent || totalBets <= 0) return;
    
    const ggrAmount = (totalBets * agent.ggrRate) / 100;
    if (ggrAmount <= 0) return;

    const previousBalance = Number(agent.balance);
    agent.balance = Math.max(0, previousBalance - ggrAmount);
    await this.agentRepository.save(agent);

    // Registra transação de GGR
    const ggrTransaction = this.agentTransactionRepository.create({
      agentId: agent.id,
      type: AgentTransactionType.GGR_DEDUCTION,
      amount: ggrAmount,
      previousBalance,
      newBalance: Number(agent.balance),
      description: `GGR ${agent.ggrRate}% de R$${totalBets.toFixed(2)} apostado`,
      reference: sessionId,
    });
    await this.agentTransactionRepository.save(ggrTransaction);

    this.logger.log(`[GGR] Agente ${agent.name}: -R$${ggrAmount.toFixed(2)} (${agent.ggrRate}% de R$${totalBets.toFixed(2)})`);
  }

  /**
   * Busca sessão no banco de dados
   */
  private async getSessionFromToken(token: string): Promise<GameSession | null> {
    const session = await this.sessionRepository.findOne({
      where: { sessionToken: token },
      relations: ['agent'],
    });

    if (!session) {
      this.logger.warn(`Sessão não encontrada para token: ${token}`);
      return null;
    }

    if (session.status !== SessionStatus.ACTIVE) {
      this.logger.warn(`Sessão inativa: ${session.id} (${session.status})`);
      return null;
    }

    if (new Date() > session.expiresAt) {
      this.logger.warn(`Sessão expirada: ${session.id}`);
      session.status = SessionStatus.EXPIRED;
      await this.sessionRepository.save(session);
      return null;
    }

    return session;
  }

  /**
   * Endpoint de informações
   */
  @Get()
  getInfo() {
    return {
      success: true,
      message: 'Game Provider API (DB Connected)',
      version: '1.0.0',
      availableGames: Object.keys(GAME_CONFIGS),
    };
  }

  /**
   * Gera token de teste e cria sessão no banco
   */
  @Get('test/generate-token/:userId/:game')
  async generateToken(
    @Param('userId') userId: string, 
    @Param('game') game: string,
    @Req() req: Request,
  ) {
    // Busca ou cria agente de teste
    let agent = await this.agentRepository.findOne({ where: { name: 'Test Agent' } });
    if (!agent) {
      agent = this.agentRepository.create({
        name: 'Test Agent',
        email: 'test@agent.local',
        passwordHash: 'test_hash',
        apiKey: 'test_api_key_' + Date.now(),
        apiSecret: 'test_secret',
        balance: 10000, // Saldo inicial de teste
        ggrRate: 10, // 10% GGR
        isActive: true,
      });
      await this.agentRepository.save(agent);
    }

    const token = makeToken({ 
      id: parseInt(userId), 
      game, 
      ts: Date.now() 
    });
    
    // Cria sessão no banco
    const session = this.sessionRepository.create({
      sessionToken: token,
      operatorId: agent.id, // Mantém operatorId por compatibilidade (refere-se ao agent)
      playerId: userId,
      gameCode: game,
      playerCurrency: 'BRL',
      cachedBalance: 1000.00, // Saldo inicial do jogador de teste
      status: SessionStatus.ACTIVE,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
    });
    
    await this.sessionRepository.save(session);

    // Detecta URL base do request (funciona tanto local quanto produção)
    const forwardedProto = req.headers['x-forwarded-proto'] as string;
    const forwardedHost = req.headers['x-forwarded-host'] as string;
    const hostHeader = req.headers['host'] as string;
    const protocol = forwardedProto || 'https';
    const host = forwardedHost || hostHeader || 'api.ultraself.space';
    const baseUrl = process.env.API_URL || `${protocol}://${host}`;

    return {
      success: true,
      token,
      gameUrl: `${baseUrl}/${game}/?token=${token}`
    };
  }

  /**
   * SESSION - Retorna estrutura que o frontend espera
   * Se operador tiver balanceCallbackUrl configurado, consulta saldo via webhook
   * IMPORTANTE: Usa configurações dinâmicas do DB (GameSettings) quando disponíveis
   */
  @Get(':token/session')
  async getSession(@Param('token') token: string, @Res() res: Response) {
    this.logger.log(`[SESSION] Token: ${token}`);

    const session = await this.getSessionFromToken(token);

    if (!session) {
      return res.status(200).json({ success: false, message: 'Invalid session' });
    }

    const config = getGameConfig(session.gameCode) || GAME_CONFIGS.fortunetiger;
    
    // Busca configurações dinâmicas do banco de dados (prioridade sobre config estático)
    const dynamicSettings = await this.gameSettingsService.getEffectiveConfig(session.gameCode);
    this.logger.log(`[SESSION] Dynamic settings for ${session.gameCode}: minBet=${dynamicSettings.minBet}, maxBet=${dynamicSettings.maxBet}`);
    
    // Determina o saldo: via webhook (REMOTE) ou cache local (LOCAL)
    let balance = Number(session.cachedBalance);
    
    if (session.agent?.balanceCallbackUrl) {
      try {
        this.logger.log(`[SESSION] Using REMOTE balance webhook for agent: ${session.agent.name}`);
        const balanceResponse = await this.webhookService.getBalance(token);
        balance = balanceResponse.balance;
        
        // Atualiza cache local
        session.cachedBalance = balance;
        await this.sessionRepository.save(session);
        this.logger.log(`[SESSION] Remote balance fetched: ${balance}`);
      } catch (error) {
        this.logger.warn(`[SESSION] Failed to get remote balance, using cached: ${error.message}`);
        // Continua com o saldo em cache
      }
    } else {
      this.logger.log(`[SESSION] Using LOCAL cached balance`);
    }
    
    this.logger.log(`[SESSION] User: ${session.playerId}, Game: ${config.gameId}, Balance: ${balance}`);

    // Gera grid inicial aleatório
    const initialIconsFlat = this.slotEngine.generateRandomGrid(config);
    const initialIcons = this.slotEngine.iconsToMatrix(initialIconsFlat, config.rows, config.cols);

    // Monta betSizes dinâmicos (do DB ou fallback para config estático)
    const betSizes = dynamicSettings.betSizes.length > 0 
      ? dynamicSettings.betSizes 
      : config.betSizes;

    const data = {
      user_name: `Player ${session.playerId}`,
      credit: balance,
      num_line: config.numLines,
      line_num: config.numLines,
      bet_amount: dynamicSettings.defaultBet, // USA CONFIG DINÂMICO
      min_bet: dynamicSettings.minBet,        // NOVO: Aposta mínima
      max_bet: dynamicSettings.maxBet,        // NOVO: Aposta máxima
      free_num: 0, // TODO: Implementar persistência de free spins
      free_total: 10,
      free_amount: 0,
      free_multi: 1,
      freespin_mode: 1,
      multiple_list: [1, 2, 3, 5],
      credit_line: 1,
      buy_feature: 50,
      buy_max: 1300,
      feature: {
        bigwin: [
          ['Big Win', '15'],
          ['Mega Win', '35'],
          ['Super Win', '70'],
          ['Epic Win', '100']
        ],
        betsize: betSizes.map(b => b.toString()), // USA CONFIG DINÂMICO
        betlevel: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        linedata: config.paylines.map(p => p.positions.map(pos => pos + 1).join('|'))
      },
      total_way: 0,
      multiply: 0,
      icon_data: initialIcons,
      active_icons: [],
      active_lines: [],
      drop_line: [],
      currency_prefix: 'R$',
      currency_suffix: '',
      currency_thousand: '.',
      currency_decimal: ',',
      bet_size_list: betSizes.map(b => b.toString()), // USA CONFIG DINÂMICO
      previous_session: false,
      game_state: null,
      feature_symbol: '',
      feature_result: {
        left_feature: 9,
        select_count: 0,
        right_feature: 9,
        select_finish: false,
        access_feature: false
      }
    };

    return res.status(200).json({
      success: true,
      data: data,
      message: 'Load sessions success'
    });
  }

  /**
   * SPIN - Executa uma rodada usando o SlotEngine e Banco de Dados
   * Suporta dois modos:
   * - LOCAL: Usa saldo cacheado no DB (para testes)
   * - REMOTE: Usa webhooks para debitar/creditar no operador (produção)
   */
  @Post(':token/spin')
  async spin(@Param('token') token: string, @Body() body: SpinBody, @Res() res: Response) {
    const session = await this.getSessionFromToken(token);

    if (!session) {
      return res.status(200).json({ success: false, message: 'Invalid session' });
    }

    const config = getGameConfig(session.gameCode) || GAME_CONFIGS.fortunetiger;
    const useRemoteWebhooks = this.hasRemoteWebhooks(session.agent);

    // Parâmetros do spin
    const betAmount = parseFloat(body.betamount || config.defaultBet.toString());
    const numLinesFromGame = parseInt(body.numline || config.numLines.toString());
    const cpl = parseFloat(body.cpl || '1');
    
    // CÁLCULO DO TOTAL BET
    // Jogos "243 Ways" (Phoenix Rises, etc): o betAmount JÁ É o valor total da aposta
    // Jogos de linhas (Fortune Tiger, etc): betAmount * numLines = total
    const isWaysGame = config.numLines >= 243; // 243 ways, 1024 ways, etc.
    const numLines = numLinesFromGame;
    const totalBet = isWaysGame ? (betAmount * cpl) : (betAmount * numLines * cpl);

    // LOG DETALHADO para debug
    this.logger.log(`[SPIN] === REQUISIÇÃO DO JOGO ===`);
    this.logger.log(`[SPIN] Game: ${session.gameCode}, betamount="${body.betamount}", numline="${body.numline}", cpl="${body.cpl}", isWaysGame=${isWaysGame}`);
    this.logger.log(`[SPIN] totalBet=${totalBet}${isWaysGame ? ` (${betAmount} * ${cpl} - 243 Ways)` : ` (${betAmount} * ${numLines} * ${cpl})`}, saldoAtual=${session.cachedBalance}, mode=${useRemoteWebhooks ? 'REMOTE' : 'LOCAL'}`);

    // =============================================
    // VERIFICAÇÃO DE CRÉDITOS DO AGENTE (antes de qualquer operação)
    // Apenas verifica - o consumo será feito após confirmar o debit
    // =============================================
    let agentForSpin: Agent | null = null;
    if (session.agent) {
      agentForSpin = await this.agentRepository.findOne({ where: { id: session.agent.id } });
      if (!agentForSpin) {
        this.logger.error(`[SPIN] Agent not found: ${session.agent.id}`);
        return res.status(200).json({
          success: false,
          message: 'Agent not found',
        });
      }

      const currentSpinCredits = Number(agentForSpin.spinCredits);
      if (currentSpinCredits < 1) {
        this.logger.warn(`[SPIN] BLOQUEADO - Agente ${agentForSpin.name} sem créditos de spin: ${currentSpinCredits}`);
        return res.status(200).json({
          success: false,
          message: 'Agent has no spin credits. Please contact the game provider.',
        });
      }
      
      this.logger.log(`[SPIN] Agente ${agentForSpin.name} tem ${currentSpinCredits} créditos`);
    }

    // VALIDAÇÃO DE SALDO: Só valida cache no modo LOCAL
    // No modo REMOTE, o webhook de debit fará a validação real
    if (!useRemoteWebhooks) {
      const currentCachedBalance = Number(session.cachedBalance);
      if (currentCachedBalance < totalBet) {
        this.logger.warn(`[SPIN] BLOQUEADO - Saldo insuficiente (LOCAL): ${currentCachedBalance} < ${totalBet}`);
        return res.status(200).json({
          success: false,
          message: 'Saldo insuficiente',
          data: {
            credit: currentCachedBalance,
            required: totalBet,
          }
        });
      }
    }

    // 1. Cria Round (Pendente)
    const round = this.roundRepository.create({
      roundId: uuidv4(),
      sessionId: session.id,
      operatorId: session.operatorId,
      playerId: session.playerId,
      gameCode: session.gameCode,
      betAmount: totalBet,
      currency: session.playerCurrency,
      status: RoundStatus.PENDING,
      requestData: body as any,
    });
    await this.roundRepository.save(round);

    // 2. DÉBITO - Processa aposta
    let currentBalance: number;

    if (useRemoteWebhooks) {
      // MODO REMOTE: Chama webhook do operador para debitar
      this.logger.log(`[SPIN] Using REMOTE webhooks for agent: ${session.agent?.name}`);
      try {
        const debitResponse = await this.webhookService.debit({
          sessionToken: token,
          playerId: session.playerId,
          roundId: round.id,
          amount: totalBet,
          gameCode: session.gameCode,
        });

        if (!debitResponse.success) {
          this.logger.warn(`[SPIN] Remote debit failed: ${debitResponse.error}`);
          round.status = RoundStatus.CANCELLED;
          await this.roundRepository.save(round);
          return res.status(200).json({
            success: false,
            message: debitResponse.error || 'Insufficient balance',
          });
        }

        currentBalance = debitResponse.balance;
        session.cachedBalance = currentBalance; // Atualiza cache
        await this.sessionRepository.save(session);
        
        // CONSUMO DE CRÉDITO DO AGENTE - Só após debit confirmado
        if (agentForSpin) {
          const creditsBefore = Number(agentForSpin.spinCredits);
          const creditsAfter = creditsBefore - 1;
          agentForSpin.spinCredits = creditsAfter;
          agentForSpin.totalSpinsConsumed = Number(agentForSpin.totalSpinsConsumed) + 1;
          await this.agentRepository.save(agentForSpin);

          // Registra transação de consumo de spin (não bloqueia - fire and forget)
          this.agentTransactionRepository.save(
            this.agentTransactionRepository.create({
              agentId: agentForSpin.id,
              type: AgentTransactionType.GGR_DEDUCTION,
              amount: -1,
              previousBalance: creditsBefore,
              newBalance: creditsAfter,
              description: `Spin consumido - ${session.gameCode}`,
              reference: round.id,
              createdBy: 'system',
            })
          ).catch(err => this.logger.error(`[SPIN] Erro ao salvar transação: ${err.message}`));

          this.logger.log(`[SPIN] Crédito consumido: ${agentForSpin.name}. Restante: ${creditsAfter}`);
        }
      } catch (error) {
        this.logger.error(`[SPIN] Remote debit error: ${error.message}`);
        round.status = RoundStatus.CANCELLED;
        await this.roundRepository.save(round);
        return res.status(200).json({
          success: false,
          message: 'Failed to process bet',
        });
      }
    } else {
      // MODO LOCAL: Usa saldo cacheado no DB
      this.logger.log(`[SPIN] Using LOCAL balance for session`);
      
      if (Number(session.cachedBalance) < totalBet) {
        this.logger.warn(`[SPIN] Insufficient balance: ${session.cachedBalance} < ${totalBet}`);
        round.status = RoundStatus.CANCELLED;
        await this.roundRepository.save(round);
        
        // IMPORTANTE: Retorna success: false para que o jogo trate como erro
        return res.status(200).json({
          success: false,
          message: 'Saldo insuficiente',
          data: {
            credit: Number(session.cachedBalance),
            required: totalBet,
          }
        });
      }

      // Cria Transação de Débito local
      const debitTx = this.transactionRepository.create({
        transactionId: uuidv4(),
        roundId: round.id,
        sessionId: session.id,
        operatorId: session.operatorId,
        playerId: session.playerId,
        type: TransactionType.DEBIT,
        amount: totalBet,
        currency: session.playerCurrency,
        status: TransactionStatus.SUCCESS,
      });
      await this.transactionRepository.save(debitTx);

      // Atualiza saldo local
      session.cachedBalance = Number(session.cachedBalance) - totalBet;
      await this.sessionRepository.save(session);
      currentBalance = Number(session.cachedBalance);
      
      // CONSUMO DE CRÉDITO DO AGENTE - Modo LOCAL
      if (agentForSpin) {
        const creditsBefore = Number(agentForSpin.spinCredits);
        const creditsAfter = creditsBefore - 1;
        agentForSpin.spinCredits = creditsAfter;
        agentForSpin.totalSpinsConsumed = Number(agentForSpin.totalSpinsConsumed) + 1;
        await this.agentRepository.save(agentForSpin);

        // Registra transação (fire and forget)
        this.agentTransactionRepository.save(
          this.agentTransactionRepository.create({
            agentId: agentForSpin.id,
            type: AgentTransactionType.GGR_DEDUCTION,
            amount: -1,
            previousBalance: creditsBefore,
            newBalance: creditsAfter,
            description: `Spin consumido - ${session.gameCode}`,
            reference: round.id,
            createdBy: 'system',
          })
        ).catch(err => this.logger.error(`[SPIN] Erro ao salvar transação: ${err.message}`));

        this.logger.log(`[SPIN] Crédito consumido: ${agentForSpin.name}. Restante: ${creditsAfter}`);
      }
    }

    // 3. Busca configurações dinâmicas - PRIORIZA config do AGENTE
    const agentConfig = await this.getAgentEffectiveConfig(session.agent?.id, session.gameCode);
    this.logger.log(`[SPIN] Effective config for agent ${session.agent?.name || 'unknown'} - RTP: ${agentConfig.rtp}%, WinChance: ${agentConfig.winChance}%`);

    // 4. Executa Lógica do Jogo COM configurações do agente
    const spinResult = this.slotEngine.spinPredefined(config, betAmount, cpl, {
      rtp: agentConfig.rtp,
      winChance: agentConfig.winChance,
    });

    // 5. Atualiza Round com resultado
    round.winAmount = spinResult.totalWin;
    round.resultData = spinResult as any;
    round.gridSymbols = spinResult.iconData as any;
    round.status = RoundStatus.COMPLETED;
    round.completedAt = new Date();
    await this.roundRepository.save(round);

    // 6. CRÉDITO - Se houve ganho
    if (spinResult.totalWin > 0) {
      if (useRemoteWebhooks) {
        // MODO REMOTE: Chama webhook do operador para creditar
        try {
          const creditResponse = await this.webhookService.credit({
            sessionToken: token,
            playerId: session.playerId,
            roundId: round.id,
            amount: spinResult.totalWin,
            gameCode: session.gameCode,
          });

          if (creditResponse.success) {
            currentBalance = creditResponse.balance;
            session.cachedBalance = currentBalance;
            await this.sessionRepository.save(session);
          } else {
            this.logger.error(`[SPIN] Remote credit failed: ${creditResponse.error}`);
            // Ainda assim retorna o resultado, mas loga o erro
          }
        } catch (error) {
          this.logger.error(`[SPIN] Remote credit error: ${error.message}`);
          // Ainda assim retorna o resultado, mas loga o erro
        }
      } else {
        // MODO LOCAL: Credita no saldo cacheado
        const creditTx = this.transactionRepository.create({
          transactionId: uuidv4(),
          roundId: round.id,
          sessionId: session.id,
          operatorId: session.operatorId,
          playerId: session.playerId,
          type: TransactionType.CREDIT,
          amount: spinResult.totalWin,
          currency: session.playerCurrency,
          status: TransactionStatus.SUCCESS,
        });
        await this.transactionRepository.save(creditTx);

        session.cachedBalance = Number(session.cachedBalance) + spinResult.totalWin;
        await this.sessionRepository.save(session);
        currentBalance = Number(session.cachedBalance);
      }
    }

    // NOTA: Dedução de crédito do agente já foi feita no início do spin (1 spin = 1 crédito)
    // O modelo antigo de GGR percentual foi removido em favor do modelo de créditos por spin

    this.logger.log(`[SPIN] Round: ${round.roundId}, Bet: ${totalBet}, Win: ${spinResult.totalWin}, Balance: ${currentBalance}, Mode: ${useRemoteWebhooks ? 'REMOTE' : 'LOCAL'}`);

    // 8. Retorna resposta no formato que o NhutCorp_SlotGenPHP espera
    const activeLines = spinResult.winLines.map(line => ({
      index: line.index,
      name: line.name,
      combine: line.combine,
      way_243: line.way_243,
      payout: line.payout,
      multiply: line.multiply || 0,
      win_amount: line.win_amount,
      active_icon: line.active_icon,
    }));

    const activeIcons = spinResult.totalWin > 0 
      ? [...new Set(spinResult.winLines.flatMap(l => l.active_icon))]
      : [];

    const slotIconsFlat = spinResult.iconData.flat();

    const data = {
      credit: currentBalance,
      free_num: 0,
      num_line: numLines,
      bet_amount: betAmount,
      free_spin: 0,
      jackpot: 0,
      scaler: 0,
      feature_symbol: '',
      pull: {
        SlotIcons: slotIconsFlat,
        WinAmount: spinResult.totalWin,
        WinOnDrop: 0,
        ActiveIcons: activeIcons,
        ActiveLines: activeLines,
        TotalWay: spinResult.totalWin > 0 ? spinResult.winLines.length : 0,
        WildColumIcon: '',
        DropLine: 0,
        DropLineData: [],
        FeatureResult: null
      }
    };

    return res.status(200).json({
      success: true,
      data: data,
      message: spinResult.totalWin > 0 ? 'You won!' : 'Try again'
    });
  }

  /**
   * Retorna ícones do jogo
   */
  @Get(':token/icons')
  async getIcons(@Param('token') token: string, @Res() res: Response) {
    const session = await this.getSessionFromToken(token);
    const config = session ? (getGameConfig(session.gameCode) || GAME_CONFIGS.fortunetiger) : GAME_CONFIGS.fortunetiger;

    const icons = config.symbols.map(symbol => ({
      id: symbol.id,
      icon_name: symbol.name,
      win_1: symbol.payouts[0] || 0,
      win_2: symbol.payouts[1] || 0,
      win_3: symbol.payouts[2] || 0,
      win_4: symbol.payouts[3] || 0,
      win_5: symbol.payouts[4] || 0,
      wild_card: symbol.isWild ? 1 : null,
      free_spin: symbol.isScatter ? 1 : null,
      free_num: 0,
      scaler_spin: null,
    }));

    return res.status(200).json(icons);
  }

  /**
   * Retorna informações do jogo COM configurações dinâmicas do DB
   */
  @Get(':token/info')
  async getGameInfo(@Param('token') token: string, @Res() res: Response) {
    const session = await this.getSessionFromToken(token);
    const config = session ? (getGameConfig(session.gameCode) || GAME_CONFIGS.fortunetiger) : GAME_CONFIGS.fortunetiger;
    
    // Busca configurações dinâmicas
    const gameCode = session?.gameCode || 'fortunetiger';
    const dynamicSettings = await this.gameSettingsService.getEffectiveConfig(gameCode);

    return res.status(200).json({
      success: true,
      data: {
        game_id: config.gameId,
        game_name: config.gameName,
        rtp: dynamicSettings.rtp,
        volatility: config.volatility,
        min_bet: dynamicSettings.minBet,
        max_bet: dynamicSettings.maxBet,
        default_bet: dynamicSettings.defaultBet,
        bet_sizes: dynamicSettings.betSizes,
        jackpot_sum: 0,
        credit_line: 1,
        title: config.gameName
      }
    });
  }

  /**
   * NOVO: Endpoint para refresh de configurações em tempo real
   * O frontend pode chamar isso periodicamente ou ao voltar ao foco
   */
  @Get(':token/config')
  async getConfig(@Param('token') token: string, @Res() res: Response) {
    const session = await this.getSessionFromToken(token);
    
    if (!session) {
      return res.status(200).json({ success: false, message: 'Invalid session' });
    }

    const dynamicSettings = await this.gameSettingsService.getEffectiveConfig(session.gameCode);
    
    // Também retorna saldo atualizado
    let balance = Number(session.cachedBalance);
    if (session.agent?.balanceCallbackUrl) {
      try {
        const balanceResponse = await this.webhookService.getBalance(token);
        balance = balanceResponse.balance;
        session.cachedBalance = balance;
        await this.sessionRepository.save(session);
      } catch (error) {
        this.logger.warn(`[CONFIG] Failed to refresh balance: ${error.message}`);
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        credit: balance,
        min_bet: dynamicSettings.minBet,
        max_bet: dynamicSettings.maxBet,
        default_bet: dynamicSettings.defaultBet,
        bet_sizes: dynamicSettings.betSizes.map(b => b.toString()),
        rtp: dynamicSettings.rtp,
      }
    });
  }

  /**
   * Retorna histórico de jogadas (Logs)
   * Frontend espera array direto em data, não data.logs
   */
  @Get(':token/logs')
  async getLogs(@Param('token') token: string, @Res() res: Response) {
    // TODO: Implementar busca real de logs no banco
    return res.status(200).json({
      success: true,
      data: []
    });
  }
}
