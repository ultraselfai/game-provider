import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameSettings } from '../database/entities/game-settings.entity';
import { GAME_CONFIGS } from '../games/configs';

/**
 * Service para gerenciar configurações de jogos
 * Prioridade: DB (GameSettings) > Config estático (configs/*.ts)
 * 
 * NOTA: Os valores são passados diretamente para o jogo SEM conversão.
 * O jogo Fortune tem lógica interna de multiplicação por numLines.
 * 
 * Guia de configuração (Fortune Ox/Tiger - 10 linhas):
 * - Aposta Mínima: 10 (representa R$10 no jogo)
 * - Aposta Padrão: 2 (representa R$10 inicial no jogo, pois 2*5=10 ou algo interno)
 * - Valores Disponíveis: primeiro valor 1 representa a aposta mínima
 */
@Injectable()
export class GameSettingsService implements OnModuleInit {
  private readonly logger = new Logger(GameSettingsService.name);

  constructor(
    @InjectRepository(GameSettings)
    private readonly gameSettingsRepository: Repository<GameSettings>,
  ) {}

  /**
   * Ao iniciar o módulo, sincroniza os jogos do config estático com o DB
   */
  async onModuleInit() {
    await this.syncGamesFromConfig();
  }

  /**
   * Sincroniza jogos definidos em GAME_CONFIGS para o banco de dados
   * Se o jogo já existe no DB, não sobrescreve (permite customização)
   */
  async syncGamesFromConfig(): Promise<void> {
    this.logger.log('Sincronizando configurações de jogos...');

    for (const [gameCode, config] of Object.entries(GAME_CONFIGS)) {
      const existing = await this.gameSettingsRepository.findOne({
        where: { gameCode },
      });

      if (!existing) {
        this.logger.log(`Criando configuração para: ${gameCode}`);
        const settings = this.gameSettingsRepository.create({
          gameCode: config.gameId,
          gameName: config.gameName,
          isActive: true,
          rtp: config.baseRtp,
          volatility: config.volatility,
          minBet: config.minBet,
          maxBet: config.maxBet,
          defaultBet: config.defaultBet,
          betSizes: config.betSizes,
          winChance: config.winChance,
          loseChance: config.loseChance,
          hasFreeSpin: config.hasFreeSpin,
          hasBonusGame: config.hasBonusGame,
          hasJackpot: config.hasJackpot,
          jackpotMini: config.jackpots?.mini || 100,
          jackpotMinor: config.jackpots?.minor || 500,
          jackpotMajor: config.jackpots?.major || 2500,
          jackpotGrand: config.jackpots?.grand || 50000,
          category: 'slots',
          provider: 'internal',
        });
        await this.gameSettingsRepository.save(settings);
      } else {
        this.logger.debug(`Jogo já configurado no DB: ${gameCode}`);
      }
    }

    this.logger.log('Sincronização de jogos concluída');
  }

  /**
   * Lista todos os jogos configurados
   */
  async getAllGames(): Promise<GameSettings[]> {
    return this.gameSettingsRepository.find({
      order: { gameName: 'ASC' },
    });
  }

  /**
   * Busca configuração de um jogo específico
   */
  async getGameByCode(gameCode: string): Promise<GameSettings | null> {
    return this.gameSettingsRepository.findOne({
      where: { gameCode },
    });
  }

  /**
   * Atualiza configurações de um jogo
   */
  async updateGame(gameCode: string, updates: Partial<GameSettings>): Promise<GameSettings | null> {
    const game = await this.gameSettingsRepository.findOne({
      where: { gameCode },
    });

    if (!game) return null;

    // Campos atualizáveis
    if (updates.isActive !== undefined) game.isActive = updates.isActive;
    if (updates.rtp !== undefined) game.rtp = updates.rtp;
    if (updates.volatility !== undefined) game.volatility = updates.volatility;
    if (updates.minBet !== undefined) game.minBet = updates.minBet;
    if (updates.maxBet !== undefined) game.maxBet = updates.maxBet;
    if (updates.defaultBet !== undefined) game.defaultBet = updates.defaultBet;
    if (updates.betSizes !== undefined) game.betSizes = updates.betSizes;
    if (updates.winChance !== undefined) game.winChance = updates.winChance;
    if (updates.loseChance !== undefined) game.loseChance = updates.loseChance;
    if (updates.hasFreeSpin !== undefined) game.hasFreeSpin = updates.hasFreeSpin;
    if (updates.hasBonusGame !== undefined) game.hasBonusGame = updates.hasBonusGame;
    if (updates.hasJackpot !== undefined) game.hasJackpot = updates.hasJackpot;
    if (updates.jackpotMini !== undefined) game.jackpotMini = updates.jackpotMini;
    if (updates.jackpotMinor !== undefined) game.jackpotMinor = updates.jackpotMinor;
    if (updates.jackpotMajor !== undefined) game.jackpotMajor = updates.jackpotMajor;
    if (updates.jackpotGrand !== undefined) game.jackpotGrand = updates.jackpotGrand;
    if (updates.description !== undefined) game.description = updates.description;
    if (updates.thumbnailUrl !== undefined) game.thumbnailUrl = updates.thumbnailUrl;

    await this.gameSettingsRepository.save(game);
    this.logger.log(`Configurações atualizadas para: ${gameCode}`);

    return game;
  }

  /**
   * Retorna o numLines de um jogo (fator de multiplicação)
   * Por padrão jogos Fortune têm 10 linhas
   */
  getNumLines(gameCode: string): number {
    const staticConfig = GAME_CONFIGS[gameCode];
    return staticConfig?.numLines || 10;
  }

  /**
   * Retorna configuração efetiva do jogo (DB > Config estático)
   * Usado pelo games.controller para obter valores dinâmicos
   * 
   * NOTA: Valores são passados DIRETAMENTE, sem conversão.
   * A lógica do jogo Construct 3 já faz suas próprias multiplicações.
   */
  async getEffectiveConfig(gameCode: string): Promise<{
    minBet: number;
    maxBet: number;
    defaultBet: number;
    betSizes: number[];
    rtp: number;
    winChance: number;
    loseChance: number;
    numLines: number;
  }> {
    const dbSettings = await this.gameSettingsRepository.findOne({
      where: { gameCode },
    });

    const staticConfig = GAME_CONFIGS[gameCode];
    const numLines = this.getNumLines(gameCode);

    if (dbSettings) {
      // Passa valores diretamente do DB (sem conversão)
      return {
        minBet: Number(dbSettings.minBet),
        maxBet: Number(dbSettings.maxBet),
        defaultBet: Number(dbSettings.defaultBet),
        betSizes: dbSettings.betSizes,
        rtp: Number(dbSettings.rtp),
        winChance: dbSettings.winChance,
        loseChance: dbSettings.loseChance,
        numLines,
      };
    }

    if (staticConfig) {
      return {
        minBet: staticConfig.minBet,
        maxBet: staticConfig.maxBet,
        defaultBet: staticConfig.defaultBet,
        betSizes: staticConfig.betSizes,
        rtp: staticConfig.baseRtp,
        winChance: staticConfig.winChance,
        loseChance: staticConfig.loseChance,
        numLines,
      };
    }

    // Fallback padrão
    return {
      minBet: 0.20,
      maxBet: 500,
      defaultBet: 1.00,
      betSizes: [0.20, 0.50, 1.00, 2.00, 5.00, 10.00, 20.00, 50.00, 100.00],
      rtp: 96.5,
      winChance: 35,
      loseChance: 65,
      numLines,
    };
  }
}
