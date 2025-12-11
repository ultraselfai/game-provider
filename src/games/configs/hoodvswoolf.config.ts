import { GameConfig, PredefinedResult, SymbolConfig, PaylineConfig } from '../../engine/types';

/**
 * Configuração do Hood vs Wolf
 * Grid: 5x3, 10 paylines
 * Tema: Chapeuzinho Vermelho vs Lobo
 * 
 * Estrutura de Apostas (igual ao original PG Soft):
 * BaseBets: R$0.01, R$0.05, R$0.15, R$1.25
 * Níveis: 1-10
 * Linhas: 10
 * Fórmula: BaseBet × Level × Lines = Total Bet
 */

// Base bets disponíveis (valores que o jogador vê no seletor)
const BASE_BETS = [0.01, 0.05, 0.15, 1.25];
const MAX_LEVEL = 10;
const NUM_LINES = 10;

// Gera betSizes calculados (BaseBet × Level × Lines)
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

const SYMBOLS: SymbolConfig[] = [
  {
    id: 0,
    name: 'Symbol_0',
    displayName: 'Wild/Hood',
    isWild: true,
    isScatter: false,
    payouts: [0, 0, 50, 200, 1000],
  },
  {
    id: 1,
    name: 'Symbol_1',
    displayName: 'Scatter/FreeSpin',
    isWild: false,
    isScatter: true,
    payouts: [0, 0, 5, 20, 100],
  },
  {
    id: 2,
    name: 'Symbol_2',
    displayName: 'Gold Ingot',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 30, 100, 500],
  },
  {
    id: 3,
    name: 'Symbol_3',
    displayName: 'Pendant',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 25, 80, 400],
  },
  {
    id: 4,
    name: 'Symbol_4',
    displayName: 'Ruyi',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 20, 60, 300],
  },
  {
    id: 5,
    name: 'Symbol_5',
    displayName: 'Scroll',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 15, 50, 200],
  },
  {
    id: 6,
    name: 'Symbol_6',
    displayName: 'A',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 5, 20, 100],
  },
  {
    id: 7,
    name: 'Symbol_7',
    displayName: 'K',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 5, 20, 100],
  },
  {
    id: 8,
    name: 'Symbol_8',
    displayName: 'Q',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 5, 15, 75],
  },
  {
    id: 9,
    name: 'Symbol_9',
    displayName: 'J',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 5, 15, 75],
  },
];

// 243 ways to win (não precisa de paylines explícitas, mas mantemos para compatibilidade)
const PAYLINES: PaylineConfig[] = [
  { id: 0, name: 'Line 1', positions: [0, 1, 2, 3, 4] },
  { id: 1, name: 'Line 2', positions: [5, 6, 7, 8, 9] },
  { id: 2, name: 'Line 3', positions: [10, 11, 12, 13, 14] },
  { id: 3, name: 'Line 4', positions: [0, 6, 12, 8, 4] },
  { id: 4, name: 'Line 5', positions: [10, 6, 2, 8, 14] },
];

const PREDEFINED_WINS: PredefinedResult[] = [
  {
    icons: ['Symbol_2', 'Symbol_2', 'Symbol_2', 'Symbol_5', 'Symbol_6', 'Symbol_3', 'Symbol_4', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_1', 'Symbol_0', 'Symbol_3', 'Symbol_4', 'Symbol_5'],
    activeIcons: [1, 2, 3],
    activeLines: [{
      index: 0,
      name: 'Symbol_2',
      combine: 3,
      way_243: 1,
      payout: 30,
      multiply: 0,
      win_amount: 6,
      active_icon: [1, 2, 3],
    }],
    dropLine: [],
    multiplyCount: 1,
    payout: 30,
  },
  {
    icons: ['Symbol_6', 'Symbol_7', 'Symbol_8', 'Symbol_3', 'Symbol_3', 'Symbol_3', 'Symbol_3', 'Symbol_4', 'Symbol_9', 'Symbol_0', 'Symbol_2', 'Symbol_5', 'Symbol_1', 'Symbol_6', 'Symbol_7'],
    activeIcons: [4, 5, 6, 7],
    activeLines: [{
      index: 1,
      name: 'Symbol_3',
      combine: 4,
      way_243: 1,
      payout: 80,
      multiply: 0,
      win_amount: 16,
      active_icon: [4, 5, 6, 7],
    }],
    dropLine: [],
    multiplyCount: 1,
    payout: 80,
  },
  {
    icons: ['Symbol_4', 'Symbol_4', 'Symbol_4', 'Symbol_4', 'Symbol_4', 'Symbol_5', 'Symbol_6', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_5'],
    activeIcons: [1, 2, 3, 4, 5],
    activeLines: [{
      index: 0,
      name: 'Symbol_4',
      combine: 5,
      way_243: 1,
      payout: 300,
      multiply: 0,
      win_amount: 60,
      active_icon: [1, 2, 3, 4, 5],
    }],
    dropLine: [],
    multiplyCount: 1,
    payout: 300,
  },
  {
    icons: ['Symbol_5', 'Symbol_5', 'Symbol_5', 'Symbol_6', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_6', 'Symbol_7', 'Symbol_8'],
    activeIcons: [1, 2, 3],
    activeLines: [{
      index: 0,
      name: 'Symbol_5',
      combine: 3,
      way_243: 1,
      payout: 15,
      multiply: 0,
      win_amount: 3,
      active_icon: [1, 2, 3],
    }],
    dropLine: [],
    multiplyCount: 1,
    payout: 15,
  },
  // MEGAWIN
  {
    icons: ['Symbol_0', 'Symbol_0', 'Symbol_0', 'Symbol_0', 'Symbol_0', 'Symbol_6', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_6'],
    activeIcons: [1, 2, 3, 4, 5],
    activeLines: [{
      index: 0,
      name: 'Symbol_0',
      combine: 5,
      way_243: 1,
      payout: 1000,
      multiply: 0,
      win_amount: 200,
      active_icon: [1, 2, 3, 4, 5],
    }],
    dropLine: [],
    multiplyCount: 1,
    payout: 1000,
  },
  // SUPERWIN
  {
    icons: ['Symbol_2', 'Symbol_2', 'Symbol_2', 'Symbol_2', 'Symbol_2', 'Symbol_6', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_0', 'Symbol_1', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_6'],
    activeIcons: [1, 2, 3, 4, 5],
    activeLines: [{
      index: 0,
      name: 'Symbol_2',
      combine: 5,
      way_243: 1,
      payout: 500,
      multiply: 0,
      win_amount: 100,
      active_icon: [1, 2, 3, 4, 5],
    }],
    dropLine: [],
    multiplyCount: 1,
    payout: 500,
  },
  {
    icons: ['Symbol_6', 'Symbol_6', 'Symbol_6', 'Symbol_6', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_7', 'Symbol_8'],
    activeIcons: [1, 2, 3, 4],
    activeLines: [{
      index: 0,
      name: 'Symbol_6',
      combine: 4,
      way_243: 1,
      payout: 20,
      multiply: 0,
      win_amount: 4,
      active_icon: [1, 2, 3, 4],
    }],
    dropLine: [],
    multiplyCount: 1,
    payout: 20,
  },
  {
    icons: ['Symbol_7', 'Symbol_7', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_6', 'Symbol_8', 'Symbol_9', 'Symbol_0'],
    activeIcons: [1, 2, 3],
    activeLines: [{
      index: 0,
      name: 'Symbol_7',
      combine: 3,
      way_243: 1,
      payout: 5,
      multiply: 0,
      win_amount: 1,
      active_icon: [1, 2, 3],
    }],
    dropLine: [],
    multiplyCount: 1,
    payout: 5,
  },
  {
    icons: ['Symbol_8', 'Symbol_8', 'Symbol_8', 'Symbol_8', 'Symbol_8', 'Symbol_9', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_6', 'Symbol_7', 'Symbol_9'],
    activeIcons: [1, 2, 3, 4, 5],
    activeLines: [{
      index: 0,
      name: 'Symbol_8',
      combine: 5,
      way_243: 1,
      payout: 75,
      multiply: 0,
      win_amount: 15,
      active_icon: [1, 2, 3, 4, 5],
    }],
    dropLine: [],
    multiplyCount: 1,
    payout: 75,
  },
  {
    icons: ['Symbol_9', 'Symbol_9', 'Symbol_9', 'Symbol_9', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_6', 'Symbol_7', 'Symbol_8', 'Symbol_0', 'Symbol_1'],
    activeIcons: [1, 2, 3, 4],
    activeLines: [{
      index: 0,
      name: 'Symbol_9',
      combine: 4,
      way_243: 1,
      payout: 15,
      multiply: 0,
      win_amount: 3,
      active_icon: [1, 2, 3, 4],
    }],
    dropLine: [],
    multiplyCount: 1,
    payout: 15,
  },
];

const PREDEFINED_LOSSES: PredefinedResult[] = [
  { icons: ['Symbol_6', 'Symbol_3', 'Symbol_8', 'Symbol_2', 'Symbol_5', 'Symbol_7', 'Symbol_4', 'Symbol_9', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_6'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_7', 'Symbol_4', 'Symbol_9', 'Symbol_3', 'Symbol_6', 'Symbol_8', 'Symbol_2', 'Symbol_0', 'Symbol_1', 'Symbol_5', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_6', 'Symbol_7'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_8', 'Symbol_5', 'Symbol_0', 'Symbol_4', 'Symbol_7', 'Symbol_9', 'Symbol_3', 'Symbol_1', 'Symbol_2', 'Symbol_6', 'Symbol_4', 'Symbol_5', 'Symbol_6', 'Symbol_7', 'Symbol_8'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_9', 'Symbol_6', 'Symbol_1', 'Symbol_5', 'Symbol_8', 'Symbol_0', 'Symbol_4', 'Symbol_2', 'Symbol_3', 'Symbol_7', 'Symbol_5', 'Symbol_6', 'Symbol_7', 'Symbol_8', 'Symbol_9'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_0', 'Symbol_7', 'Symbol_2', 'Symbol_6', 'Symbol_9', 'Symbol_1', 'Symbol_5', 'Symbol_3', 'Symbol_4', 'Symbol_8', 'Symbol_6', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_0'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_1', 'Symbol_8', 'Symbol_3', 'Symbol_7', 'Symbol_0', 'Symbol_2', 'Symbol_6', 'Symbol_4', 'Symbol_5', 'Symbol_9', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_0', 'Symbol_1'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_2', 'Symbol_9', 'Symbol_4', 'Symbol_8', 'Symbol_1', 'Symbol_3', 'Symbol_7', 'Symbol_5', 'Symbol_6', 'Symbol_0', 'Symbol_8', 'Symbol_9', 'Symbol_0', 'Symbol_1', 'Symbol_2'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_3', 'Symbol_0', 'Symbol_5', 'Symbol_9', 'Symbol_2', 'Symbol_4', 'Symbol_8', 'Symbol_6', 'Symbol_7', 'Symbol_1', 'Symbol_9', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_4', 'Symbol_1', 'Symbol_6', 'Symbol_0', 'Symbol_3', 'Symbol_5', 'Symbol_9', 'Symbol_7', 'Symbol_8', 'Symbol_2', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_5', 'Symbol_2', 'Symbol_7', 'Symbol_1', 'Symbol_4', 'Symbol_6', 'Symbol_0', 'Symbol_8', 'Symbol_9', 'Symbol_3', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_6', 'Symbol_3', 'Symbol_8', 'Symbol_2', 'Symbol_5', 'Symbol_7', 'Symbol_1', 'Symbol_9', 'Symbol_0', 'Symbol_4', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_6'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_7', 'Symbol_4', 'Symbol_9', 'Symbol_3', 'Symbol_6', 'Symbol_8', 'Symbol_2', 'Symbol_0', 'Symbol_1', 'Symbol_5', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_6', 'Symbol_7'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_8', 'Symbol_5', 'Symbol_0', 'Symbol_4', 'Symbol_7', 'Symbol_9', 'Symbol_3', 'Symbol_1', 'Symbol_2', 'Symbol_6', 'Symbol_4', 'Symbol_5', 'Symbol_6', 'Symbol_7', 'Symbol_8'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_9', 'Symbol_6', 'Symbol_1', 'Symbol_5', 'Symbol_8', 'Symbol_0', 'Symbol_4', 'Symbol_2', 'Symbol_3', 'Symbol_7', 'Symbol_5', 'Symbol_6', 'Symbol_7', 'Symbol_8', 'Symbol_9'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_0', 'Symbol_7', 'Symbol_2', 'Symbol_6', 'Symbol_9', 'Symbol_1', 'Symbol_5', 'Symbol_3', 'Symbol_4', 'Symbol_8', 'Symbol_6', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_0'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
];

export const HOOD_VS_WOLF_CONFIG: GameConfig = {
  gameId: 'hoodvswoolf',
  gameName: 'Hood vs Wolf',
  rows: 3,
  cols: 5,
  symbols: SYMBOLS,
  paylines: PAYLINES,
  baseRtp: 96.5,
  volatility: 'high',
  winChance: 38,
  loseChance: 62,
  predefinedWins: PREDEFINED_WINS,
  predefinedLosses: PREDEFINED_LOSSES,
  minBet: 0.10,   // 0.01 × 1 × 10
  maxBet: 125,    // 1.25 × 10 × 10
  defaultBet: 0.10,
  betSizes: generateBetSizes(),
  baseBets: BASE_BETS,
  maxLevel: MAX_LEVEL,
  numLines: NUM_LINES,
  hasFreeSpin: true,
  hasBonusGame: false,
  hasJackpot: false,
  jackpots: {
    mini: 100,
    minor: 500,
    major: 2500,
    grand: 50000,
  },
};

export { SYMBOLS as HOOD_VS_WOLF_SYMBOLS };
export { PAYLINES as HOOD_VS_WOLF_PAYLINES };
export { PREDEFINED_WINS as HOOD_VS_WOLF_WINS };
export { PREDEFINED_LOSSES as HOOD_VS_WOLF_LOSSES };
