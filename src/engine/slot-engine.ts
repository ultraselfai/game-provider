import { Injectable, Logger } from '@nestjs/common';
import { RngService } from './rng.service';
import {
  GameConfig,
  SpinResult,
  PredefinedResult,
  WinLine,
  FeatureResult,
  RespinData,
} from './types';

/**
 * Slot Engine - Motor universal de slots
 *
 * Funciona em dois modos:
 * 1. Modo PHP (predefinido): Usa arrays de resultados pré-definidos (Win/Lose)
 * 2. Modo Matemático: Calcula resultado em tempo real (futuro)
 *
 * Inclui Feature Especial "Tigre da Sorte":
 * - Ativada aleatoriamente durante qualquer spin
 * - Escolhe um símbolo, faz respins até não aparecer mais
 * - Grid cheio = multiplicador x10
 */

/**
 * Configuração da Feature Especial por jogo
 */
interface FeatureConfig {
  enabled: boolean;           // Se a feature está habilitada
  triggerChance: number;      // Chance de ativar (0-100%)
  maxRespins: number;         // Máximo de respins
  fullGridMultiplier: number; // Multiplicador quando grid fica cheio
  symbolAppearChance: number; // Chance de símbolo aparecer em cada posição durante respin
}

/**
 * Tipo para fases do Pool
 */
type PoolPhase = 'retention' | 'normal' | 'release';

/**
 * ============================================================================
 * MAPAS DE PROBABILIDADES POR FASE DO POOL
 * 
 * Cada fase tem sua própria distribuição de probabilidades para quando há vitória.
 * Isso permite que na RETENÇÃO pague apenas pequenos prêmios, e na LIBERAÇÃO
 * favoreça prêmios maiores conforme definido no PRD.
 * ============================================================================
 */

/**
 * FASE RETENÇÃO - Foco em acumular pool, pagar muito pouco
 * 
 * - Pequenos (3x-5x): ~98% das vitórias
 * - Médios (15x-30x): ~2% das vitórias  
 * - Grandes (50x+): BLOQUEADOS (peso 0)
 */
const RETENTION_PAYOUT_WEIGHTS: Record<number, number> = {
  // === PEQUENOS (altíssima probabilidade) ===
  3: 70,       // 70%
  4: 20,       // 20%
  5: 8,        // 8%
  6: 7,
  8: 6,
  10: 5,
  
  // === MÉDIOS (baixíssima probabilidade) ===
  15: 1.5,     // 1.5%
  16: 1.2,
  18: 1,
  20: 0.8,
  25: 0.6,
  30: 0.5,     // 0.5%
  35: 0,
  40: 0,
  45: 0,
  48: 0,
  50: 0,       // BLOQUEADO
  60: 0,
  64: 0,
  75: 0,
  80: 0,
  90: 0,
  
  // === GRANDES (BLOQUEADOS) ===
  100: 0,
  120: 0,
  150: 0,
  160: 0,
  250: 0,
  256: 0,
  300: 0,
  
  // === MEGA (BLOQUEADOS) ===
  500: 0,
  640: 0,
  800: 0,
  1000: 0,
  
  // === JACKPOT (BLOQUEADOS) ===
  4000: 0,
  10000: 0,
};

/**
 * FASE NORMAL - Operação balanceada padrão
 * 
 * - Pequenos (3x-10x): ~85% das vitórias
 * - Médios (15x-50x): ~10% das vitórias
 * - Grandes (100x-250x): ~3.5% das vitórias
 * - Mega/Jackpot: ~1.5% das vitórias
 */
const NORMAL_PAYOUT_WEIGHTS: Record<number, number> = {
  // === PEQUENOS (alta probabilidade) ===
  3: 50,       // 50%
  4: 20,       // 20%
  5: 15,       // 15%
  6: 14,
  8: 12,
  10: 10,
  
  // === MÉDIOS (média probabilidade) ===
  15: 5.5,     // 5.5%
  16: 5,
  18: 4.5,
  20: 4,
  25: 3.5,
  30: 4.5,     // 4.5%
  35: 3,
  40: 2.5,
  45: 2,
  48: 1.8,
  50: 3,       // 3%
  60: 2,
  64: 1.8,
  75: 1.5,
  80: 1.2,
  90: 1,
  
  // === GRANDES (baixa probabilidade) ===
  100: 1.5,    // 1.5%
  120: 1.2,
  150: 1,
  160: 0.9,
  250: 0.5,    // 0.5%
  256: 0.5,
  300: 0.4,
  
  // === MEGA (muito baixa probabilidade) ===
  500: 0.2,
  640: 0.15,
  800: 0.1,
  1000: 0.08,
  
  // === JACKPOT (raridade extrema) ===
  4000: 0.02,
  10000: 0.01,
};

/**
 * FASE LIBERAÇÃO - Foco em pagar, esvaziar pool controladamente
 * 
 * - Pequenos (3x-10x): ~45% das vitórias
 * - Médios (15x-50x): ~40% das vitórias
 * - Grandes (100x-250x): ~12% das vitórias
 * - Mega/Jackpot: ~3% das vitórias
 */
const RELEASE_PAYOUT_WEIGHTS: Record<number, number> = {
  // === PEQUENOS (menor probabilidade que normal) ===
  3: 15,       // 15%
  4: 15,       // 15%
  5: 15,       // 15%
  6: 12,
  8: 10,
  10: 8,
  
  // === MÉDIOS (alta probabilidade - favorece estes) ===
  15: 15,      // 15%
  16: 12,
  18: 10,
  20: 8,
  25: 7,
  30: 15,      // 15%
  35: 10,
  40: 8,
  45: 6,
  48: 5,
  50: 12,      // 12%
  60: 8,
  64: 6,
  75: 5,
  80: 4,
  90: 3,
  
  // === GRANDES (probabilidade aumentada) ===
  100: 8,      // 8%
  120: 6,
  150: 5,
  160: 4,
  250: 5,      // 5%
  256: 4,
  300: 3,
  
  // === MEGA (probabilidade aumentada) ===
  500: 2,
  640: 1.5,
  800: 1,
  1000: 0.8,
  
  // === JACKPOT (probabilidade aumentada) ===
  4000: 0.2,
  10000: 0.1,
};

/**
 * Retorna o mapa de pesos correto baseado na fase do pool
 */
function getPayoutWeightsForPhase(phase?: PoolPhase): Record<number, number> {
  switch (phase) {
    case 'retention':
      return RETENTION_PAYOUT_WEIGHTS;
    case 'release':
      return RELEASE_PAYOUT_WEIGHTS;
    case 'normal':
    default:
      return NORMAL_PAYOUT_WEIGHTS;
  }
}

@Injectable()
export class SlotEngine {
  private readonly logger = new Logger(SlotEngine.name);

  constructor(private readonly rng: RngService) {}

  /**
   * Executa um spin usando o modo PHP (resultados pré-definidos)
   *
   * Este é o modo usado pelo backend PHP original:
   * 1. Embaralha arrays de win e lose
   * 2. Baseado no RTP, define proporção win/lose
   * 3. Seleciona aleatoriamente um resultado
   * 4. Calcula ganho baseado na aposta
   */
  spinPredefined(
    config: GameConfig,
    bet: number,
    cpl: number,
    dynamicConfig?: {
      rtp?: number;
      winChance?: number;
      maxPayout?: number; // Multiplicador máximo permitido pelo Pool (ex: 30 = máx 30x)
      phase?: PoolPhase;  // Fase do pool: 'retention' | 'normal' | 'release'
    },
  ): SpinResult {
    // winChance define diretamente a % de spins que ganham (0-100)
    // Se não fornecido, usa config.winChance ou calcula do RTP
    const effectiveWinChance = dynamicConfig?.winChance ?? config.winChance ?? 35;
    const maxPayout = dynamicConfig?.maxPayout;
    const phase = dynamicConfig?.phase ?? 'normal';
    
    // Converte para decimal (0-1)
    const winChanceDecimal = effectiveWinChance / 100;
    
    this.logger.log(`[SPIN] WinChance: ${effectiveWinChance}%${maxPayout ? `, MaxPayout: ${maxPayout}x` : ''}, Phase: ${phase.toUpperCase()}`);

    // CORREÇÃO DO BUG: Primeiro decide SE vai ganhar ou perder
    // Depois escolhe QUAL resultado daquela categoria
    // Isso garante que a % configurada seja respeitada independente
    // da quantidade de resultados cadastrados em cada categoria
    
    const randomRoll = this.rng.random(); // Número entre 0 e 1
    const isWinSpin = randomRoll < winChanceDecimal;
    
    this.logger.log(`[SPIN] Sorteio: ${(randomRoll * 100).toFixed(2)}% | Threshold: ${effectiveWinChance}% | Resultado: ${isWinSpin ? '🎰 VITÓRIA' : '❌ DERROTA'}`);

    let selectedResult: PredefinedResult;
    
    if (isWinSpin && config.predefinedWins.length > 0) {
      // Sorteou VITÓRIA - escolhe um resultado usando probabilidades ponderadas
      // Passa maxPayout para filtrar resultados que excedem o limite do pool
      // Passa phase para usar a tabela de pesos correta
      selectedResult = this.pickWeightedWin(config.predefinedWins, maxPayout, phase);
      this.logger.log(`[SPIN] Selecionado resultado de VITÓRIA (payout: ${selectedResult.payout}x)`);
    } else {
      // Sorteou DERROTA (ou não tem vitórias cadastradas) - escolhe um resultado de derrota
      selectedResult = this.rng.pick(config.predefinedLosses);
      this.logger.log(`[SPIN] Selecionado resultado de DERROTA`);
    }

    // ===== FEATURE ESPECIAL: TIGRE DA SORTE =====
    // Verifica se deve ativar a feature especial
    const featureConfig = this.getFeatureConfig(config.gameId);
    let featureTriggered = false;
    let featureResult: FeatureResult | undefined;
    let finalIcons = selectedResult.icons;
    let finalWinAmount = cpl * bet * selectedResult.payout;
    let finalMultiplier = selectedResult.multiplyCount;

    if (featureConfig.enabled) {
      const featureRoll = this.rng.random() * 100;
      featureTriggered = featureRoll < featureConfig.triggerChance;
      
      if (featureTriggered) {
        this.logger.log(`[FEATURE] 🐯 TIGRE DA SORTE ATIVADO! (roll: ${featureRoll.toFixed(2)}% < ${featureConfig.triggerChance}%)`);
        
        // Executa a feature especial
        featureResult = this.executeFeature(config, featureConfig, bet, cpl);
        
        // Usa os resultados da feature
        finalIcons = featureResult.respinHistory.length > 0 
          ? featureResult.respinHistory[featureResult.respinHistory.length - 1].icons 
          : finalIcons;
        
        // Se grid cheio, aplica multiplicador x10
        if (featureResult.isFullGrid) {
          finalMultiplier = featureResult.finalMultiplier;
          // Recalcula ganho com o multiplicador da feature
          const symbolConfig = config.symbols.find(s => s.name === featureResult!.featureSymbol);
          const basePayout = symbolConfig?.payouts[config.cols] || selectedResult.payout;
          finalWinAmount = cpl * bet * basePayout * finalMultiplier;
          this.logger.log(`[FEATURE] 🎉 GRID CHEIO! Multiplicador x${finalMultiplier}! Ganho: ${finalWinAmount}`);
        } else {
          // Ganho baseado em quantas posições foram preenchidas
          const filledPositions = featureResult.lockedPositions.length;
          const symbolConfig = config.symbols.find(s => s.name === featureResult!.featureSymbol);
          if (filledPositions >= 3 && symbolConfig) {
            const payoutIndex = Math.min(filledPositions, symbolConfig.payouts.length - 1);
            finalWinAmount = cpl * bet * (symbolConfig.payouts[payoutIndex] || 0);
          }
        }
      }
    }

    // Calcula valor do ganho (pode ter sido modificado pela feature)
    const winAmount = finalWinAmount;

    // Atualiza win_amount nas linhas ativas
    const activeLines: WinLine[] = selectedResult.activeLines.map(line => ({
      ...line,
      win_amount: cpl * bet * line.payout,
    }));

    // Converte icons para matriz (para frontend)
    const iconData = this.iconsToMatrix(finalIcons, config.rows, config.cols);

    return {
      icons: finalIcons,
      iconData,
      totalWin: winAmount,
      winLines: activeLines,
      activeIcons: featureTriggered && featureResult 
        ? featureResult.lockedPositions 
        : selectedResult.activeIcons,
      multiply: finalMultiplier,
      totalWay: activeLines.length > 0 ? activeLines.reduce((sum, l) => sum + l.way_243, 0) : 0,
      isWin: winAmount > 0,
      isBigWin: winAmount >= bet * 10,
      isMegaWin: winAmount >= bet * 25,
      triggerFreeSpin: false, // TODO: implementar lógica de scatter
      freeSpinsAwarded: 0,
      triggerBonus: false,
      featureTriggered,
      featureResult,
    };
  }

  /**
   * Retorna configuração da feature especial para cada jogo
   * 
   * ⚠️ FEATURE DESABILITADA TEMPORARIAMENTE
   * Motivo: Bug crítico - Feature ignora configurações do Pool de Liquidez
   * Data: 12/12/2025
   * Ver: DOSSIE-BUG-POOL.md para detalhes
   * 
   * TODO: Reabilitar após implementar integração com Pool
   */
  private getFeatureConfig(gameId: string): FeatureConfig {
    // 🚨 DESABILITADO: Feature ignora Pool de Liquidez e pode pagar prêmios ilimitados
    // Retorna config desabilitada para TODOS os jogos até correção completa
    this.logger.warn(`[FEATURE] Feature especial DESABILITADA para ${gameId} - Bug do Pool`);
    
    return {
      enabled: false,
      triggerChance: 0,
      maxRespins: 0,
      fullGridMultiplier: 1,
      symbolAppearChance: 0,
    };
    
    /* CONFIGURAÇÕES ORIGINAIS (comentadas para referência futura)
    const configs: Record<string, FeatureConfig> = {
      fortunetiger: {
        enabled: true,
        triggerChance: 8,
        maxRespins: 10,
        fullGridMultiplier: 10,
        symbolAppearChance: 35,
      },
      fortuneox: {
        enabled: true,
        triggerChance: 7,
        maxRespins: 10,
        fullGridMultiplier: 10,
        symbolAppearChance: 30,
      },
      fortunemouse: {
        enabled: true,
        triggerChance: 8,
        maxRespins: 10,
        fullGridMultiplier: 10,
        symbolAppearChance: 35,
      },
      fortunerabbit: {
        enabled: true,
        triggerChance: 8,
        maxRespins: 10,
        fullGridMultiplier: 10,
        symbolAppearChance: 35,
      },
    };

    return configs[gameId] || {
      enabled: false,
      triggerChance: 0,
      maxRespins: 0,
      fullGridMultiplier: 1,
      symbolAppearChance: 0,
    };
    */
  }

  /**
   * Executa a Feature Especial (Tigre da Sorte)
   * 
   * Mecânica:
   * 1. Escolhe um símbolo aleatório (exceto Wild)
   * 2. Faz respins até não aparecer mais símbolos OU grid cheio
   * 3. Se grid cheio, aplica multiplicador x10
   */
  private executeFeature(
    config: GameConfig,
    featureConfig: FeatureConfig,
    bet: number,
    cpl: number
  ): FeatureResult {
    // 1. Escolhe um símbolo aleatório (exceto Wild e Scatter)
    const eligibleSymbols = config.symbols.filter(s => !s.isWild && !s.isScatter);
    const chosenSymbol = this.rng.pick(eligibleSymbols);
    const wildSymbol = config.symbols.find(s => s.isWild);
    
    this.logger.log(`[FEATURE] Símbolo escolhido: ${chosenSymbol.displayName} (${chosenSymbol.name})`);

    const gridSize = config.rows * config.cols;
    const lockedPositions: number[] = [];
    const respinHistory: RespinData[] = [];
    let currentGrid: string[] = new Array(gridSize).fill('');
    let respinCount = 0;

    // 2. Loop de respins
    while (respinCount < featureConfig.maxRespins) {
      respinCount++;
      let newSymbolsThisRespin = 0;

      // Gera novos símbolos para posições não travadas
      for (let pos = 0; pos < gridSize; pos++) {
        if (lockedPositions.includes(pos)) {
          // Posição já travada, mantém o símbolo
          continue;
        }

        // Chance de aparecer o símbolo escolhido ou Wild
        const roll = this.rng.random() * 100;
        
        if (roll < featureConfig.symbolAppearChance) {
          // Apareceu símbolo! 90% chance do escolhido, 10% Wild
          const isWild = this.rng.random() < 0.1 && wildSymbol;
          currentGrid[pos] = isWild ? wildSymbol!.name : chosenSymbol.name;
          lockedPositions.push(pos);
          newSymbolsThisRespin++;
          this.logger.log(`[FEATURE] Respin ${respinCount}: Posição ${pos} = ${currentGrid[pos]} (${isWild ? 'WILD' : 'símbolo'})`);
        } else {
          // Posição vazia (ou símbolo diferente que não conta)
          currentGrid[pos] = '_empty';
        }
      }

      // Registra histórico do respin
      respinHistory.push({
        respinNumber: respinCount,
        icons: [...currentGrid],
        newSymbolsCount: newSymbolsThisRespin,
        lockedPositions: [...lockedPositions],
      });

      this.logger.log(`[FEATURE] Respin ${respinCount}: ${newSymbolsThisRespin} novos símbolos, ${lockedPositions.length}/${gridSize} travados`);

      // Verifica condições de parada
      if (lockedPositions.length >= gridSize) {
        this.logger.log(`[FEATURE] 🎉 GRID CHEIO! Feature termina com multiplicador x${featureConfig.fullGridMultiplier}`);
        break;
      }

      if (newSymbolsThisRespin === 0) {
        this.logger.log(`[FEATURE] Nenhum símbolo novo. Feature termina.`);
        break;
      }
    }

    const isFullGrid = lockedPositions.length >= gridSize;

    // Preenche posições vazias com símbolos aleatórios para o grid final
    const finalGrid = currentGrid.map((icon, pos) => {
      if (icon === '_empty') {
        // Escolhe um símbolo aleatório diferente do escolhido
        const otherSymbols = config.symbols.filter(s => 
          s.name !== chosenSymbol.name && !s.isWild && !s.isScatter
        );
        return this.rng.pick(otherSymbols).name;
      }
      return icon;
    });

    // Atualiza o último respin com o grid final
    if (respinHistory.length > 0) {
      respinHistory[respinHistory.length - 1].icons = finalGrid;
    }

    return {
      featureSymbol: chosenSymbol.name,
      featureSymbolId: chosenSymbol.id,
      totalRespins: respinCount,
      finalMultiplier: isFullGrid ? featureConfig.fullGridMultiplier : 1,
      isFullGrid,
      respinHistory,
      lockedPositions,
    };
  }

  /**
   * Gera um grid aleatório de símbolos (para session inicial)
   */
  generateRandomGrid(config: GameConfig): string[] {
    const icons: string[] = [];
    const symbolNames = config.symbols.map(s => s.name);

    for (let i = 0; i < config.rows * config.cols; i++) {
      icons.push(this.rng.pick(symbolNames));
    }

    return icons;
  }

  /**
   * Converte array plano de ícones para matriz
   * Ex: [a,b,c,d,e,f,g,h,i] -> [[a,b,c],[d,e,f],[g,h,i]]
   */
  iconsToMatrix(icons: string[], rows: number, cols: number): string[][] {
    const matrix: string[][] = [];
    for (let r = 0; r < rows; r++) {
      matrix.push(icons.slice(r * cols, (r + 1) * cols));
    }
    return matrix;
  }

  /**
   * Converte matriz para array plano
   */
  matrixToIcons(matrix: string[][]): string[] {
    return matrix.flat();
  }

  /**
   * Verifica se há linhas vencedoras no grid (para modo matemático futuro)
   */
  checkWinLines(
    icons: string[],
    config: GameConfig,
  ): WinLine[] {
    const winLines: WinLine[] = [];

    for (const payline of config.paylines) {
      const symbolsOnLine = payline.positions.map(pos => icons[pos]);
      const firstSymbol = symbolsOnLine[0];

      // Pula se primeiro símbolo é scatter (scatter tem regras próprias)
      const symbolConfig = config.symbols.find(s => s.name === firstSymbol);
      if (symbolConfig?.isScatter) continue;

      // Conta símbolos consecutivos iguais (considerando wilds)
      let matchCount = 1;
      for (let i = 1; i < symbolsOnLine.length; i++) {
        const currentSymbol = symbolsOnLine[i];
        const currentConfig = config.symbols.find(s => s.name === currentSymbol);

        if (currentSymbol === firstSymbol || currentConfig?.isWild) {
          matchCount++;
        } else {
          break;
        }
      }

      // Precisa de pelo menos 3 para ganhar
      if (matchCount >= 3 && symbolConfig) {
        const payout = symbolConfig.payouts[matchCount] || 0;

        if (payout > 0) {
          winLines.push({
            index: payline.id,
            name: firstSymbol,
            combine: matchCount,
            way_243: 1,
            payout,
            multiply: 0,
            win_amount: 0, // Será calculado depois
            active_icon: payline.positions.slice(0, matchCount),
          });
        }
      }
    }

    return winLines;
  }

  /**
   * Conta scatters no grid
   */
  countScatters(icons: string[], config: GameConfig): number {
    const scatterSymbols = config.symbols.filter(s => s.isScatter).map(s => s.name);
    return icons.filter(icon => scatterSymbols.includes(icon)).length;
  }

  /**
   * Seleciona um resultado de vitória usando probabilidades ponderadas por FASE
   * 
   * Agrupa resultados por payout, aplica peso de cada grupo baseado na fase,
   * sorteia o grupo primeiro, depois sorteia resultado dentro do grupo.
   * 
   * FASES:
   * - retention: Favorece fortemente pequenos prêmios (3x-5x), bloqueia grandes (50x+)
   * - normal: Distribuição balanceada padrão
   * - release: Favorece prêmios maiores para fase de liberação
   * 
   * @param wins - Lista de resultados de vitória disponíveis
   * @param maxPayout - Multiplicador máximo permitido (filtro do Pool). Se undefined, não limita
   * @param phase - Fase do pool: 'retention' | 'normal' | 'release'
   */
  private pickWeightedWin(wins: PredefinedResult[], maxPayout?: number, phase: PoolPhase = 'normal'): PredefinedResult {
    // Obtém o mapa de pesos correto para a fase atual
    const PHASE_WEIGHTS = getPayoutWeightsForPhase(phase);
    
    // Filtra resultados pelo maxPayout do pool (se fornecido)
    let filteredWins = wins;
    if (maxPayout !== undefined && maxPayout > 0) {
      filteredWins = wins.filter(w => w.payout <= maxPayout);
      
      // Se nenhum resultado passar pelo filtro, retorna o menor payout disponível
      if (filteredWins.length === 0) {
        const minPayoutResult = wins.reduce((min, w) => w.payout < min.payout ? w : min, wins[0]);
        this.logger.warn(`[POOL] Nenhum resultado <= ${maxPayout}x. Usando menor disponível: ${minPayoutResult.payout}x`);
        return minPayoutResult;
      }
      
      this.logger.log(`[POOL] Filtrado por maxPayout=${maxPayout}x: ${filteredWins.length}/${wins.length} resultados`);
    }
    
    // Filtra resultados com peso 0 na fase atual (bloqueados)
    const phaseFilteredWins = filteredWins.filter(w => {
      const weight = PHASE_WEIGHTS[w.payout] ?? (100 / w.payout);
      return weight > 0;
    });
    
    // Se todos os resultados estão bloqueados na fase, usa os filtrados originais
    const finalWins = phaseFilteredWins.length > 0 ? phaseFilteredWins : filteredWins;
    
    if (phaseFilteredWins.length < filteredWins.length) {
      this.logger.log(`[FASE ${phase.toUpperCase()}] Bloqueados ${filteredWins.length - phaseFilteredWins.length} resultados com peso 0`);
    }
    
    // Agrupa resultados por payout
    const groupedByPayout: Record<number, PredefinedResult[]> = {};
    
    for (const win of finalWins) {
      const payout = win.payout;
      if (!groupedByPayout[payout]) {
        groupedByPayout[payout] = [];
      }
      groupedByPayout[payout].push(win);
    }

    // Calcula peso total disponível (apenas payouts que existem)
    const availablePayouts = Object.keys(groupedByPayout).map(Number);
    let totalWeight = 0;
    
    for (const payout of availablePayouts) {
      // Usa o mapa de pesos da fase atual
      const weight = PHASE_WEIGHTS[payout] ?? (100 / payout);
      totalWeight += weight;
    }

    // Sorteia baseado nos pesos
    const roll = this.rng.random() * totalWeight;
    let cumulative = 0;
    let selectedPayout = availablePayouts[0]; // fallback

    for (const payout of availablePayouts) {
      const weight = PHASE_WEIGHTS[payout] ?? (100 / payout);
      cumulative += weight;
      
      if (roll < cumulative) {
        selectedPayout = payout;
        break;
      }
    }

    // Log do sorteio com indicação da fase
    const selectedWeight = PHASE_WEIGHTS[selectedPayout] ?? (100 / selectedPayout);
    const realProbability = (selectedWeight / totalWeight * 100).toFixed(2);
    this.logger.log(`[PESO ${phase.toUpperCase()}] Sorteado payout ${selectedPayout}x (probabilidade: ${realProbability}%)`);

    // Escolhe aleatoriamente dentro do grupo selecionado
    const group = groupedByPayout[selectedPayout];
    return this.rng.pick(group);
  }

  /**
   * Gera seed de auditoria para o spin
   */
  generateAuditSeed(): string {
    return this.rng.generateAuditSeed();
  }
}
