import { GameConfig, PredefinedResult, SymbolConfig, PaylineConfig } from '../../engine/types';

/**
 * Configuração do Fortune Tiger
 *
 * Migrado de:
 * - FortuneTigerWin.php
 * - FortuneTigerLose.php
 * - FortuneTigerIcons.php
 * - FortunetigerController.php
 */

// Símbolos do Fortune Tiger
const SYMBOLS: SymbolConfig[] = [
  {
    id: 0,
    name: 'Symbol_0',
    displayName: 'Wild/Tiger',
    isWild: true,
    isScatter: false,
    payouts: [0, 0, 250, 0, 0], // win_3 = 250 (substitui todos)
  },
  {
    id: 1,
    name: 'Symbol_1',
    displayName: 'Scatter',
    isWild: false,
    isScatter: true,
    payouts: [0, 0, 100, 0, 0], // win_3 = 100 (ativa bonus)
  },
  {
    id: 2,
    name: 'Symbol_2',
    displayName: 'Gold Coin',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 25, 250, 2500], // Símbolo de alto valor
  },
  {
    id: 3,
    name: 'Symbol_3',
    displayName: 'Red Envelope',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 10, 100, 1000],
  },
  {
    id: 4,
    name: 'Symbol_4',
    displayName: 'Firecracker',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 8, 50, 500],
  },
  {
    id: 5,
    name: 'Symbol_5',
    displayName: 'Orange',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 5, 25, 200],
  },
  {
    id: 6,
    name: 'Symbol_6',
    displayName: 'A',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 3, 20, 100], // win_1=300 é jackpot especial
  },
  {
    id: 7,
    name: 'Symbol_7',
    displayName: 'K',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 4, 15, 75],
  },
  {
    id: 8,
    name: 'Symbol_8',
    displayName: 'Q',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 3, 10, 50],
  },
];

// Paylines do Fortune Tiger (grid 3x3)
// Posições: 0-1-2 (top), 3-4-5 (middle), 6-7-8 (bottom)
const PAYLINES: PaylineConfig[] = [
  { id: 0, name: 'Top Row', positions: [0, 1, 2] },
  { id: 1, name: 'Middle Row', positions: [3, 4, 5] },
  { id: 2, name: 'Bottom Row', positions: [6, 7, 8] },
  { id: 3, name: 'Diagonal TL-BR', positions: [0, 4, 8] },
  { id: 4, name: 'Diagonal BL-TR', positions: [6, 4, 2] },
];

/**
 * Resultados de vitória pré-definidos
 * Migrado de FortuneTigerWin.php
 *
 * Estrutura: [icons, activeIcons, activeLines, dropLine, multiplyCount, payout]
 */
const PREDEFINED_WINS: PredefinedResult[] = [
  {
    icons: ['Symbol_6', 'Symbol_0', 'Symbol_5', 'Symbol_1', 'Symbol_0', 'Symbol_6', 'Symbol_1', 'Symbol_0', 'Symbol_6'],
    activeIcons: [1, 5, 9],
    activeLines: [{
      index: 4,
      name: 'Symbol_6',
      combine: 3,
      way_243: 1,
      payout: 4,
      multiply: 0,
      win_amount: 0.8,
      active_icon: [1, 5, 9],
    }],
    dropLine: [],
    multiplyCount: 2,
    payout: 3,
  },
  {
    icons: ['Symbol_3', 'Symbol_0', 'Symbol_4', 'Symbol_3', 'Symbol_0', 'Symbol_4', 'Symbol_4', 'Symbol_0', 'Symbol_5'],
    activeIcons: [7, 5, 3],
    activeLines: [{
      index: 5,
      name: 'Symbol_4',
      combine: 3,
      way_243: 1,
      payout: 10,
      multiply: 0,
      win_amount: 4,
      active_icon: [7, 5, 3],
    }],
    dropLine: [],
    multiplyCount: 2,
    payout: 30,
  },
  {
    icons: ['Symbol_2', 'Symbol_4', 'Symbol_5', 'Symbol_2', 'Symbol_1', 'Symbol_4', 'Symbol_3', 'Symbol_3', 'Symbol_3'],
    activeIcons: [7, 8, 9],
    activeLines: [{
      index: 3,
      name: 'Symbol_3',
      combine: 3,
      way_243: 1,
      payout: 15,
      multiply: 0,
      win_amount: 4,
      active_icon: [7, 8, 9],
    }],
    dropLine: [],
    multiplyCount: 2,
    payout: 15,
  },
  {
    icons: ['Symbol_3', 'Symbol_3', 'Symbol_3', 'Symbol_6', 'Symbol_5', 'Symbol_2', 'Symbol_4', 'Symbol_4', 'Symbol_1'],
    activeIcons: [1, 2, 3],
    activeLines: [{
      index: 2,
      name: 'Symbol_3',
      combine: 3,
      way_243: 1,
      payout: 15,
      multiply: 0,
      win_amount: 4,
      active_icon: [1, 2, 3],
    }],
    dropLine: [],
    multiplyCount: 2,
    payout: 15,
  },
  {
    icons: ['Symbol_2', 'Symbol_5', 'Symbol_0', 'Symbol_5', 'Symbol_0', 'Symbol_4', 'Symbol_2', 'Symbol_4', 'Symbol_3'],
    activeIcons: [7, 5, 3],
    activeLines: [{
      index: 5,
      name: 'Symbol_2',
      combine: 3,
      way_243: 1,
      payout: 30,
      multiply: 0,
      win_amount: 4,
      active_icon: [1, 2, 3],
    }],
    dropLine: [],
    multiplyCount: 2,
    payout: 30,
  },
  {
    icons: ['Symbol_2', 'Symbol_4', 'Symbol_6', 'Symbol_2', 'Symbol_6', 'Symbol_6', 'Symbol_6', 'Symbol_0', 'Symbol_2'],
    activeIcons: [7, 5, 3],
    activeLines: [{
      index: 5,
      name: 'Symbol_6',
      combine: 3,
      way_243: 1,
      payout: 30,
      multiply: 0,
      win_amount: 4,
      active_icon: [7, 5, 3],
    }],
    dropLine: [],
    multiplyCount: 2,
    payout: 4,
  },
  {
    icons: ['Symbol_2', 'Symbol_2', 'Symbol_4', 'Symbol_2', 'Symbol_0', 'Symbol_4', 'Symbol_3', 'Symbol_3', 'Symbol_3'],
    activeIcons: [7, 8, 9],
    activeLines: [{
      index: 3,
      name: 'Symbol_3',
      combine: 3,
      way_243: 1,
      payout: 15,
      multiply: 0,
      win_amount: 9,
      active_icon: [7, 8, 9],
    }],
    dropLine: [],
    multiplyCount: 2,
    payout: 15,
  },
  {
    icons: ['Symbol_3', 'Symbol_4', 'Symbol_2', 'Symbol_6', 'Symbol_0', 'Symbol_5', 'Symbol_2', 'Symbol_2', 'Symbol_4'],
    activeIcons: [7, 5, 3],
    activeLines: [{
      index: 5,
      name: 'Symbol_2',
      combine: 3,
      way_243: 1,
      payout: 15,
      multiply: 0,
      win_amount: 9,
      active_icon: [7, 8, 9],
    }],
    dropLine: [],
    multiplyCount: 6,
    payout: 30,
  },
  {
    icons: ['Symbol_2', 'Symbol_6', 'Symbol_2', 'Symbol_5', 'Symbol_5', 'Symbol_5', 'Symbol_5', 'Symbol_4', 'Symbol_2'],
    activeIcons: [4, 5, 6],
    activeLines: [{
      index: 1,
      name: 'Symbol_5',
      combine: 3,
      way_243: 1,
      payout: 5,
      multiply: 0,
      win_amount: 1,
      active_icon: [4, 5, 6],
    }],
    dropLine: [],
    multiplyCount: 0,
    payout: 5,
  },
  // SUPERMEGAWIN 1:50
  {
    icons: ['Symbol_2', 'Symbol_0', 'Symbol_3', 'Symbol_4', 'Symbol_0', 'Symbol_5', 'Symbol_6', 'Symbol_1', 'Symbol_0'],
    activeIcons: [1, 5, 9],
    activeLines: [{
      index: 4,
      name: 'Symbol_2',
      combine: 3,
      way_243: 1,
      payout: 250,
      multiply: 0,
      win_amount: 50,
      active_icon: [1, 5, 9],
    }],
    dropLine: [],
    multiplyCount: 0,
    payout: 250,
  },
  // Outro SUPERMEGAWIN
  {
    icons: ['Symbol_2', 'Symbol_0', 'Symbol_3', 'Symbol_4', 'Symbol_0', 'Symbol_5', 'Symbol_6', 'Symbol_1', 'Symbol_0'],
    activeIcons: [1, 5, 9],
    activeLines: [{
      index: 4,
      name: 'Symbol_2',
      combine: 3,
      way_243: 1,
      payout: 250,
      multiply: 0,
      win_amount: 50,
      active_icon: [1, 5, 9],
    }],
    dropLine: [],
    multiplyCount: 0,
    payout: 250,
  },
  {
    icons: ['Symbol_2', 'Symbol_2', 'Symbol_5', 'Symbol_5', 'Symbol_5', 'Symbol_2', 'Symbol_5', 'Symbol_1', 'Symbol_5'],
    activeIcons: [7, 5, 3],
    activeLines: [{
      index: 5,
      name: 'Symbol_5',
      combine: 3,
      way_243: 1,
      payout: 50,
      multiply: 0,
      win_amount: 10,
      active_icon: [7, 5, 3],
    }],
    dropLine: [],
    multiplyCount: 0,
    payout: 50,
  },
  // SUPERWIN 1:20
  {
    icons: ['Symbol_3', 'Symbol_0', 'Symbol_2', 'Symbol_3', 'Symbol_0', 'Symbol_3', 'Symbol_5', 'Symbol_4', 'Symbol_5'],
    activeIcons: [4, 5, 6],
    activeLines: [{
      index: 1,
      name: 'Symbol_3',
      combine: 3,
      way_243: 1,
      payout: 100,
      multiply: 0,
      win_amount: 50,
      active_icon: [4, 5, 6],
    }],
    dropLine: [],
    multiplyCount: 0,
    payout: 100,
  },
  // SUPERMEGAWIN diferente
  {
    icons: ['Symbol_4', 'Symbol_1', 'Symbol_3', 'Symbol_6', 'Symbol_0', 'Symbol_5', 'Symbol_3', 'Symbol_1', 'Symbol_5'],
    activeIcons: [7, 5, 3],
    activeLines: [{
      index: 5,
      name: 'Symbol_3',
      combine: 3,
      way_243: 1,
      payout: 100,
      multiply: 0,
      win_amount: 20,
      active_icon: [7, 5, 3],
    }],
    dropLine: [],
    multiplyCount: 0,
    payout: 100,
  },
];

/**
 * Resultados de derrota pré-definidos
 * Migrado de FortuneTigerLose.php
 */
const PREDEFINED_LOSSES: PredefinedResult[] = [
  { icons: ['Symbol_5', 'Symbol_3', 'Symbol_6', 'Symbol_2', 'Symbol_2', 'Symbol_1', 'Symbol_3', 'Symbol_4', 'Symbol_3'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_5', 'Symbol_4', 'Symbol_3', 'Symbol_3', 'Symbol_3', 'Symbol_2', 'Symbol_2', 'Symbol_0', 'Symbol_1'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_5', 'Symbol_1', 'Symbol_3', 'Symbol_1', 'Symbol_4', 'Symbol_6', 'Symbol_3', 'Symbol_6', 'Symbol_1'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_5', 'Symbol_2', 'Symbol_3', 'Symbol_6', 'Symbol_3', 'Symbol_1', 'Symbol_5', 'Symbol_1', 'Symbol_4'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_3', 'Symbol_6', 'Symbol_5', 'Symbol_1', 'Symbol_6', 'Symbol_6', 'Symbol_6', 'Symbol_5', 'Symbol_0'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_2', 'Symbol_1', 'Symbol_4', 'Symbol_5', 'Symbol_3', 'Symbol_6', 'Symbol_5', 'Symbol_3', 'Symbol_1'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_4', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_3', 'Symbol_6', 'Symbol_4', 'Symbol_5'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_2', 'Symbol_1', 'Symbol_4', 'Symbol_2', 'Symbol_6', 'Symbol_2', 'Symbol_1', 'Symbol_5', 'Symbol_3'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_6', 'Symbol_1', 'Symbol_5', 'Symbol_3', 'Symbol_1', 'Symbol_3', 'Symbol_3', 'Symbol_6', 'Symbol_3'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_3', 'Symbol_4', 'Symbol_4', 'Symbol_4', 'Symbol_4', 'Symbol_3', 'Symbol_5', 'Symbol_1', 'Symbol_5'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_3', 'Symbol_5', 'Symbol_1', 'Symbol_6', 'Symbol_5', 'Symbol_4', 'Symbol_6', 'Symbol_1', 'Symbol_2'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_2', 'Symbol_1', 'Symbol_4', 'Symbol_5', 'Symbol_3', 'Symbol_6', 'Symbol_5', 'Symbol_3', 'Symbol_1'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_2', 'Symbol_1', 'Symbol_4', 'Symbol_5', 'Symbol_3', 'Symbol_6', 'Symbol_5', 'Symbol_3', 'Symbol_1'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_4', 'Symbol_6', 'Symbol_3', 'Symbol_6', 'Symbol_4', 'Symbol_4', 'Symbol_5', 'Symbol_2', 'Symbol_2'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_2', 'Symbol_4', 'Symbol_1', 'Symbol_3', 'Symbol_4', 'Symbol_6', 'Symbol_6', 'Symbol_0', 'Symbol_3'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_3', 'Symbol_4', 'Symbol_1', 'Symbol_6', 'Symbol_4', 'Symbol_5', 'Symbol_2', 'Symbol_1', 'Symbol_6'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_6', 'Symbol_0', 'Symbol_1', 'Symbol_3', 'Symbol_4', 'Symbol_2', 'Symbol_3', 'Symbol_2', 'Symbol_1'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_3', 'Symbol_6', 'Symbol_5', 'Symbol_5', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_2', 'Symbol_2'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
];

/**
 * Configuração completa do Fortune Tiger
 * 
 * ESTRUTURA DE APOSTAS (baseada no jogo original PG Soft):
 * - BaseBets: R$0.08, R$0.80, R$3.00, R$10.00
 * - Níveis: 1 a 10
 * - Linhas: 5
 * - Fórmula: BaseBet × Nível × Linhas = Aposta Total
 * 
 * Exemplo: R$0.08 × 1 × 5 = R$0.40 (aposta mínima)
 *          R$10.00 × 10 × 5 = R$500.00 (aposta máxima)
 */

// Gera betSizes automaticamente
const BASE_BETS = [0.08, 0.80, 3.00, 10.00];
const MAX_LEVEL = 10;
const NUM_LINES = 5;

function generateBetSizes(): number[] {
  const sizes: number[] = [];
  for (const base of BASE_BETS) {
    for (let level = 1; level <= MAX_LEVEL; level++) {
      const total = base * level * NUM_LINES;
      sizes.push(Math.round(total * 100) / 100);
    }
  }
  return [...new Set(sizes)].sort((a, b) => a - b);
}

export const FORTUNE_TIGER_CONFIG: GameConfig = {
  gameId: 'fortunetiger',
  gameName: 'Fortune Tiger',

  // Grid 3x3
  rows: 3,
  cols: 3,

  // Símbolos
  symbols: SYMBOLS,

  // Paylines
  paylines: PAYLINES,

  // RTP e matemática
  baseRtp: 96.5,
  volatility: 'medium',

  // Probabilidades
  winChance: 45,  // ~45% de chance de win
  loseChance: 55, // ~55% de chance de lose

  // Resultados pré-definidos
  predefinedWins: PREDEFINED_WINS,
  predefinedLosses: PREDEFINED_LOSSES,

  // Configurações de aposta (baseadas no jogo original PG Soft)
  minBet: 0.40,  // R$0.08 × 1 × 5
  maxBet: 500,   // R$10.00 × 10 × 5
  defaultBet: 0.40,
  betSizes: generateBetSizes(),
  numLines: NUM_LINES,

  // Features
  hasFreeSpin: true,
  hasBonusGame: false,
  hasJackpot: false,

  // Jackpots (não usado ainda)
  jackpots: {
    mini: 100,
    minor: 500,
    major: 2500,
    grand: 50000,
  },
};

// Exporta também as partes individuais para fácil acesso
export { SYMBOLS as FORTUNE_TIGER_SYMBOLS };
export { PAYLINES as FORTUNE_TIGER_PAYLINES };
export { PREDEFINED_WINS as FORTUNE_TIGER_WINS };
export { PREDEFINED_LOSSES as FORTUNE_TIGER_LOSSES };
