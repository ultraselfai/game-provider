import { Injectable, Logger } from '@nestjs/common';
import { RngService } from './rng.service';
import {
  GameConfig,
  SpinResult,
  PredefinedResult,
  WinLine,
} from './types';

/**
 * Slot Engine - Motor universal de slots
 *
 * Funciona em dois modos:
 * 1. Modo PHP (predefinido): Usa arrays de resultados pré-definidos (Win/Lose)
 * 2. Modo Matemático: Calcula resultado em tempo real (futuro)
 *
 * O modo PHP é uma réplica fiel do comportamento do backend Laravel original.
 */
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
    },
  ): SpinResult {
    // winChance define diretamente a % de spins que ganham (0-100)
    // Se não fornecido, usa config.winChance ou calcula do RTP
    const effectiveWinChance = dynamicConfig?.winChance ?? config.winChance ?? 35;
    
    // Converte para decimal (0-1)
    const winChance = effectiveWinChance / 100;
    const loseChance = 1 - winChance;
    
    this.logger.debug(`[SPIN] Using winChance: ${effectiveWinChance}% (${winChance}), loseChance: ${(loseChance * 100).toFixed(1)}%`);

    // Embaralha os arrays
    const shuffledWins = this.rng.shuffle([...config.predefinedWins]);
    const shuffledLosses = this.rng.shuffle([...config.predefinedLosses]);

    // Calcula quantos de cada pegar
    const totalResults = 100;
    const winCount = Math.floor(totalResults * winChance);
    const loseCount = totalResults - winCount;

    // Pega subconjuntos
    const winResults = shuffledWins.slice(0, Math.min(winCount, shuffledWins.length));
    const loseResults = shuffledLosses.slice(0, Math.min(loseCount, shuffledLosses.length));

    // Combina e embaralha
    const possibleResults = this.rng.shuffle([...winResults, ...loseResults]);

    // Seleciona um resultado
    const selectedResult = this.rng.pick(possibleResults);

    // Calcula valor do ganho
    const winAmount = cpl * bet * selectedResult.payout;

    // Atualiza win_amount nas linhas ativas
    const activeLines: WinLine[] = selectedResult.activeLines.map(line => ({
      ...line,
      win_amount: cpl * bet * line.payout,
    }));

    // Converte icons para matriz (para frontend)
    const iconData = this.iconsToMatrix(selectedResult.icons, config.rows, config.cols);

    return {
      icons: selectedResult.icons,
      iconData,
      totalWin: winAmount,
      winLines: activeLines,
      activeIcons: selectedResult.activeIcons,
      multiply: selectedResult.multiplyCount,
      totalWay: activeLines.length > 0 ? activeLines.reduce((sum, l) => sum + l.way_243, 0) : 0,
      isWin: winAmount > 0,
      isBigWin: winAmount >= bet * 10,
      isMegaWin: winAmount >= bet * 25,
      triggerFreeSpin: false, // TODO: implementar lógica de scatter
      freeSpinsAwarded: 0,
      triggerBonus: false,
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
   * Gera seed de auditoria para o spin
   */
  generateAuditSeed(): string {
    return this.rng.generateAuditSeed();
  }
}
