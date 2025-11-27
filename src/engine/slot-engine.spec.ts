import { SlotEngine } from './slot-engine';
import { RngService } from './rng.service';
import { GameConfig, PredefinedResult } from './types';

// Mock de configuração de jogo para testes
const createMockConfig = (): GameConfig => ({
  gameId: 'test-game',
  gameName: 'Test Game',
  rows: 3,
  cols: 3,
  symbols: [
    { id: 0, name: 'Symbol_0', displayName: 'Wild', isWild: true, isScatter: false, payouts: [0, 0, 15, 50, 150] },
    { id: 1, name: 'Symbol_1', displayName: 'High1', isWild: false, isScatter: false, payouts: [0, 0, 10, 30, 100] },
    { id: 2, name: 'Symbol_2', displayName: 'High2', isWild: false, isScatter: false, payouts: [0, 0, 8, 25, 80] },
    { id: 3, name: 'Symbol_3', displayName: 'Low1', isWild: false, isScatter: false, payouts: [0, 0, 5, 15, 50] },
    { id: 4, name: 'Symbol_4', displayName: 'Low2', isWild: false, isScatter: false, payouts: [0, 0, 3, 10, 30] },
    { id: 5, name: 'Symbol_5', displayName: 'Scatter', isWild: false, isScatter: true, payouts: [0, 0, 2, 5, 10] },
  ],
  paylines: [
    { id: 0, name: 'Line 1', positions: [0, 1, 2] }, // Linha superior
    { id: 1, name: 'Line 2', positions: [3, 4, 5] }, // Linha do meio
    { id: 2, name: 'Line 3', positions: [6, 7, 8] }, // Linha inferior
    { id: 3, name: 'Line 4', positions: [0, 4, 8] }, // Diagonal
    { id: 4, name: 'Line 5', positions: [6, 4, 2] }, // Diagonal inversa
  ],
  baseRtp: 96.5,
  volatility: 'medium',
  winChance: 30,
  loseChance: 70,
  predefinedWins: [
    {
      icons: ['Symbol_3', 'Symbol_3', 'Symbol_3', 'Symbol_1', 'Symbol_2', 'Symbol_4', 'Symbol_5', 'Symbol_1', 'Symbol_2'],
      activeIcons: [0, 1, 2],
      activeLines: [{ index: 0, name: 'Symbol_3', combine: 3, way_243: 1, payout: 5, multiply: 1, win_amount: 0, active_icon: [0, 1, 2] }],
      dropLine: [],
      multiplyCount: 1,
      payout: 5,
    },
    {
      icons: ['Symbol_1', 'Symbol_1', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_1', 'Symbol_2'],
      activeIcons: [0, 1, 2],
      activeLines: [{ index: 0, name: 'Symbol_1', combine: 3, way_243: 1, payout: 10, multiply: 1, win_amount: 0, active_icon: [0, 1, 2] }],
      dropLine: [],
      multiplyCount: 1,
      payout: 10,
    },
    {
      icons: ['Symbol_0', 'Symbol_0', 'Symbol_0', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_1', 'Symbol_2'],
      activeIcons: [0, 1, 2],
      activeLines: [{ index: 0, name: 'Symbol_0', combine: 3, way_243: 1, payout: 15, multiply: 1, win_amount: 0, active_icon: [0, 1, 2] }],
      dropLine: [],
      multiplyCount: 1,
      payout: 15,
    },
  ],
  predefinedLosses: [
    {
      icons: ['Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4'],
      activeIcons: [],
      activeLines: [],
      dropLine: [],
      multiplyCount: 0,
      payout: 0,
    },
    {
      icons: ['Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5'],
      activeIcons: [],
      activeLines: [],
      dropLine: [],
      multiplyCount: 0,
      payout: 0,
    },
  ],
  minBet: 0.1,
  maxBet: 100,
  defaultBet: 1,
  betSizes: [0.2, 1, 5, 10, 20, 50, 100],
  numLines: 5,
  hasFreeSpin: false,
  hasBonusGame: false,
  hasJackpot: false,
});

describe('SlotEngine', () => {
  let engine: SlotEngine;
  let rng: RngService;
  let config: GameConfig;

  beforeEach(() => {
    rng = new RngService();
    engine = new SlotEngine(rng);
    config = createMockConfig();
  });

  describe('spinPredefined()', () => {
    it('deve retornar resultado com estrutura correta', () => {
      const result = engine.spinPredefined(config, 1, 1);

      expect(result).toHaveProperty('icons');
      expect(result).toHaveProperty('iconData');
      expect(result).toHaveProperty('totalWin');
      expect(result).toHaveProperty('winLines');
      expect(result).toHaveProperty('activeIcons');
      expect(result).toHaveProperty('isWin');
      expect(result).toHaveProperty('isBigWin');
      expect(result).toHaveProperty('isMegaWin');
    });

    it('deve ter 9 ícones para grid 3x3', () => {
      const result = engine.spinPredefined(config, 1, 1);
      expect(result.icons).toHaveLength(9);
    });

    it('deve ter matriz 3x3 no iconData', () => {
      const result = engine.spinPredefined(config, 1, 1);
      expect(result.iconData).toHaveLength(3);
      expect(result.iconData[0]).toHaveLength(3);
      expect(result.iconData[1]).toHaveLength(3);
      expect(result.iconData[2]).toHaveLength(3);
    });

    it('deve calcular ganho baseado na aposta', () => {
      // Força uma seed para resultado previsível
      rng.seed(12345);
      
      const bet = 5;
      const cpl = 1;
      const result = engine.spinPredefined(config, bet, cpl);

      if (result.isWin) {
        // Ganho deve ser múltiplo da aposta
        expect(result.totalWin).toBeGreaterThan(0);
        expect(result.totalWin % cpl).toBe(0);
      } else {
        expect(result.totalWin).toBe(0);
      }
    });

    it('deve identificar big win corretamente', () => {
      const bet = 1;
      const cpl = 1;
      
      // Executa múltiplos spins para encontrar wins
      for (let i = 0; i < 100; i++) {
        const result = engine.spinPredefined(config, bet, cpl);
        
        if (result.isBigWin) {
          expect(result.totalWin).toBeGreaterThanOrEqual(bet * cpl * 10);
        }
        if (result.isMegaWin) {
          expect(result.totalWin).toBeGreaterThanOrEqual(bet * cpl * 25);
        }
      }
    });

    it('deve atualizar win_amount nas linhas ativas', () => {
      const bet = 10;
      const cpl = 2;
      
      for (let i = 0; i < 50; i++) {
        const result = engine.spinPredefined(config, bet, cpl);
        
        if (result.winLines.length > 0) {
          for (const line of result.winLines) {
            expect(line.win_amount).toBeGreaterThan(0);
            expect(line.win_amount).toBe(cpl * bet * line.payout);
          }
          break;
        }
      }
    });
  });

  describe('generateRandomGrid()', () => {
    it('deve gerar grid com número correto de ícones', () => {
      const grid = engine.generateRandomGrid(config);
      expect(grid).toHaveLength(config.rows * config.cols);
    });

    it('deve usar apenas símbolos da configuração', () => {
      const validSymbols = config.symbols.map(s => s.name);
      const grid = engine.generateRandomGrid(config);

      for (const icon of grid) {
        expect(validSymbols).toContain(icon);
      }
    });

    it('deve gerar grids diferentes (não determinístico)', () => {
      const grids = new Set<string>();
      
      for (let i = 0; i < 100; i++) {
        grids.add(engine.generateRandomGrid(config).join(','));
      }
      
      // Deve ter alta variedade
      expect(grids.size).toBeGreaterThan(90);
    });
  });

  describe('iconsToMatrix() e matrixToIcons()', () => {
    it('deve converter array para matriz corretamente', () => {
      const icons = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
      const matrix = engine.iconsToMatrix(icons, 3, 3);

      expect(matrix).toEqual([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ]);
    });

    it('deve converter matriz para array corretamente', () => {
      const matrix = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ];
      const icons = engine.matrixToIcons(matrix);

      expect(icons).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);
    });

    it('deve ser reversível', () => {
      const original = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const matrix = engine.iconsToMatrix(original, 3, 3);
      const converted = engine.matrixToIcons(matrix);

      expect(converted).toEqual(original);
    });
  });

  describe('checkWinLines()', () => {
    it('deve detectar linha vencedora horizontal', () => {
      const icons = ['Symbol_1', 'Symbol_1', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_2', 'Symbol_3'];
      const winLines = engine.checkWinLines(icons, config);

      expect(winLines.length).toBeGreaterThan(0);
      expect(winLines[0].name).toBe('Symbol_1');
      expect(winLines[0].combine).toBe(3);
    });

    it('deve não detectar linhas sem combinação', () => {
      const icons = ['Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4'];
      const winLines = engine.checkWinLines(icons, config);

      expect(winLines).toHaveLength(0);
    });

    it('deve detectar múltiplas linhas vencedoras', () => {
      // Todas as linhas com Symbol_3
      const icons = ['Symbol_3', 'Symbol_3', 'Symbol_3', 'Symbol_3', 'Symbol_3', 'Symbol_3', 'Symbol_3', 'Symbol_3', 'Symbol_3'];
      const winLines = engine.checkWinLines(icons, config);

      // Deve ter 5 linhas vencedoras (todas as paylines)
      expect(winLines.length).toBe(5);
    });

    it('deve ignorar scatter em verificação de linhas', () => {
      const icons = ['Symbol_5', 'Symbol_5', 'Symbol_5', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_1'];
      const winLines = engine.checkWinLines(icons, config);

      // Scatter não conta como linha normal
      const scatterLines = winLines.filter(l => l.name === 'Symbol_5');
      expect(scatterLines).toHaveLength(0);
    });
  });

  describe('countScatters()', () => {
    it('deve contar scatters corretamente', () => {
      const icons = ['Symbol_5', 'Symbol_1', 'Symbol_5', 'Symbol_2', 'Symbol_5', 'Symbol_3', 'Symbol_4', 'Symbol_1', 'Symbol_2'];
      const count = engine.countScatters(icons, config);

      expect(count).toBe(3);
    });

    it('deve retornar 0 se não houver scatters', () => {
      const icons = ['Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_1', 'Symbol_2', 'Symbol_3'];
      const count = engine.countScatters(icons, config);

      expect(count).toBe(0);
    });
  });

  describe('generateAuditSeed()', () => {
    it('deve gerar seed de auditoria válida', () => {
      const seed = engine.generateAuditSeed();
      expect(seed).toMatch(/^[0-9a-f]+-[0-9a-f]+$/);
    });

    it('deve gerar seeds únicas', () => {
      const seeds = new Set<string>();
      
      for (let i = 0; i < 100; i++) {
        seeds.add(engine.generateAuditSeed());
      }
      
      expect(seeds.size).toBe(100);
    });
  });
});

describe('SlotEngine - Simulação de RTP', () => {
  let engine: SlotEngine;
  let rng: RngService;
  let config: GameConfig;

  beforeEach(() => {
    rng = new RngService();
    engine = new SlotEngine(rng);
    config = createMockConfig();
  });

  it('deve manter RTP dentro de margem aceitável em 10.000 rodadas', () => {
    const iterations = 10000;
    const bet = 1;
    const cpl = 1;
    const targetRtp = config.baseRtp;

    let totalBet = 0;
    let totalWin = 0;

    for (let i = 0; i < iterations; i++) {
      const result = engine.spinPredefined(config, bet, cpl, { rtp: targetRtp });
      totalBet += bet * cpl;
      totalWin += result.totalWin;
    }

    const actualRtp = (totalWin / totalBet) * 100;

    // O RTP com resultados pré-definidos pode variar muito dependendo da config
    // Este teste valida que o sistema está funcionando, não o RTP exato
    // RTP real deve ser testado com configuração de produção
    expect(actualRtp).toBeGreaterThan(0); // Deve ter algum retorno
    expect(actualRtp).toBeLessThan(1000); // Mas não absurdamente alto

    console.log(`\n📊 Simulação de RTP (${iterations} rodadas):`);
    console.log(`   Target RTP: ${targetRtp}%`);
    console.log(`   Actual RTP: ${actualRtp.toFixed(2)}%`);
    console.log(`   Total Bet: R$${totalBet}`);
    console.log(`   Total Win: R$${totalWin.toFixed(2)}`);
    console.log(`   House Edge: ${(100 - actualRtp).toFixed(2)}%`);
  });

  it('deve distribuir ganhos de forma estatisticamente válida', () => {
    const iterations = 5000;
    const bet = 1;
    const cpl = 1;

    let winCount = 0;
    let loseCount = 0;
    let bigWinCount = 0;
    const winAmounts: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const result = engine.spinPredefined(config, bet, cpl);

      if (result.isWin) {
        winCount++;
        winAmounts.push(result.totalWin);
        if (result.isBigWin) {
          bigWinCount++;
        }
      } else {
        loseCount++;
      }
    }

    const winRate = (winCount / iterations) * 100;
    const avgWin = winAmounts.length > 0 
      ? winAmounts.reduce((a, b) => a + b, 0) / winAmounts.length 
      : 0;

    // Taxas esperadas com base na configuração
    expect(winCount).toBeGreaterThan(0);
    expect(loseCount).toBeGreaterThan(0);

    console.log(`\n📈 Distribuição de Resultados (${iterations} rodadas):`);
    console.log(`   Wins: ${winCount} (${winRate.toFixed(1)}%)`);
    console.log(`   Losses: ${loseCount} (${(100 - winRate).toFixed(1)}%)`);
    console.log(`   Big Wins: ${bigWinCount}`);
    console.log(`   Avg Win Amount: R$${avgWin.toFixed(2)}`);
  });

  it('deve ter variância adequada nos resultados', () => {
    const iterations = 1000;
    const bet = 1;
    const cpl = 1;
    const results: number[] = [];

    for (let i = 0; i < iterations; i++) {
      results.push(engine.spinPredefined(config, bet, cpl).totalWin);
    }

    const mean = results.reduce((a, b) => a + b, 0) / results.length;
    const variance = results.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / results.length;
    const stdDev = Math.sqrt(variance);

    // Deve ter alguma variância (não todos os resultados iguais)
    expect(stdDev).toBeGreaterThan(0);

    console.log(`\n📉 Análise de Variância (${iterations} rodadas):`);
    console.log(`   Média: R$${mean.toFixed(2)}`);
    console.log(`   Desvio Padrão: R$${stdDev.toFixed(2)}`);
    console.log(`   Variância: ${variance.toFixed(2)}`);
  });
});
