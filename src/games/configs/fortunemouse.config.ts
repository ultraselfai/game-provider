import { GameConfig, PredefinedResult, SymbolConfig, PaylineConfig } from '../../engine/types';

/**
 * Configuração do Fortune Mouse
 * Grid: 3x3, 5 paylines
 * Tema: Ano Novo Chinês com Rato da Fortuna
 */

const SYMBOLS: SymbolConfig[] = [
  {
    id: 0,
    name: 'Symbol_0',
    displayName: 'Wild/Mouse',
    isWild: true,
    isScatter: false,
    payouts: [0, 0, 250, 0, 0],
  },
  {
    id: 1,
    name: 'Symbol_1',
    displayName: 'Fu Character',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 30, 300, 3000],
  },
  {
    id: 2,
    name: 'Symbol_2',
    displayName: 'Red Packet',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 25, 250, 2500],
  },
  {
    id: 3,
    name: 'Symbol_3',
    displayName: 'Coin Pouch',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 20, 200, 2000],
  },
  {
    id: 4,
    name: 'Symbol_4',
    displayName: 'Firecracker',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 15, 100, 1000],
  },
  {
    id: 5,
    name: 'Symbol_5',
    displayName: 'Orange',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 10, 50, 500],
  },
  {
    id: 6,
    name: 'Symbol_6',
    displayName: 'Peanuts',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 5, 25, 200],
  },
];

const PAYLINES: PaylineConfig[] = [
  { id: 0, name: 'Top Row', positions: [0, 1, 2] },
  { id: 1, name: 'Middle Row', positions: [3, 4, 5] },
  { id: 2, name: 'Bottom Row', positions: [6, 7, 8] },
  { id: 3, name: 'Diagonal TL-BR', positions: [0, 4, 8] },
  { id: 4, name: 'Diagonal BL-TR', positions: [6, 4, 2] },
];

const PREDEFINED_WINS: PredefinedResult[] = [
  {
    icons: ['Symbol_1', 'Symbol_0', 'Symbol_2', 'Symbol_3', 'Symbol_0', 'Symbol_4', 'Symbol_5', 'Symbol_1', 'Symbol_0'],
    activeIcons: [1, 5, 9],
    activeLines: [{
      index: 4,
      name: 'Symbol_1',
      combine: 3,
      way_243: 1,
      payout: 30,
      multiply: 0,
      win_amount: 6,
      active_icon: [1, 5, 9],
    }],
    dropLine: [],
    multiplyCount: 2,
    payout: 30,
  },
  {
    icons: ['Symbol_2', 'Symbol_2', 'Symbol_2', 'Symbol_5', 'Symbol_4', 'Symbol_1', 'Symbol_3', 'Symbol_3', 'Symbol_6'],
    activeIcons: [1, 2, 3],
    activeLines: [{
      index: 0,
      name: 'Symbol_2',
      combine: 3,
      way_243: 1,
      payout: 25,
      multiply: 0,
      win_amount: 5,
      active_icon: [1, 2, 3],
    }],
    dropLine: [],
    multiplyCount: 2,
    payout: 25,
  },
  {
    icons: ['Symbol_3', 'Symbol_0', 'Symbol_4', 'Symbol_3', 'Symbol_0', 'Symbol_5', 'Symbol_3', 'Symbol_6', 'Symbol_2'],
    activeIcons: [1, 4, 7],
    activeLines: [{
      index: 1,
      name: 'Symbol_3',
      combine: 3,
      way_243: 1,
      payout: 20,
      multiply: 0,
      win_amount: 4,
      active_icon: [1, 4, 7],
    }],
    dropLine: [],
    multiplyCount: 3,
    payout: 60,
  },
  {
    icons: ['Symbol_4', 'Symbol_4', 'Symbol_4', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_5', 'Symbol_6', 'Symbol_0'],
    activeIcons: [1, 2, 3],
    activeLines: [{
      index: 0,
      name: 'Symbol_4',
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
  {
    icons: ['Symbol_5', 'Symbol_5', 'Symbol_5', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_6', 'Symbol_1', 'Symbol_0'],
    activeIcons: [1, 2, 3],
    activeLines: [{
      index: 0,
      name: 'Symbol_5',
      combine: 3,
      way_243: 1,
      payout: 10,
      multiply: 0,
      win_amount: 2,
      active_icon: [1, 2, 3],
    }],
    dropLine: [],
    multiplyCount: 1,
    payout: 10,
  },
  {
    icons: ['Symbol_6', 'Symbol_6', 'Symbol_6', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_1', 'Symbol_2', 'Symbol_0'],
    activeIcons: [1, 2, 3],
    activeLines: [{
      index: 0,
      name: 'Symbol_6',
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
  // MEGAWIN 1:50
  {
    icons: ['Symbol_1', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_0', 'Symbol_3', 'Symbol_4', 'Symbol_0', 'Symbol_5'],
    activeIcons: [1, 5, 9],
    activeLines: [{
      index: 4,
      name: 'Symbol_1',
      combine: 3,
      way_243: 1,
      payout: 300,
      multiply: 0,
      win_amount: 60,
      active_icon: [1, 5, 9],
    }],
    dropLine: [],
    multiplyCount: 10,
    payout: 300,
  },
  // SUPERWIN 1:30
  {
    icons: ['Symbol_2', 'Symbol_0', 'Symbol_3', 'Symbol_2', 'Symbol_0', 'Symbol_4', 'Symbol_2', 'Symbol_1', 'Symbol_5'],
    activeIcons: [1, 4, 7],
    activeLines: [{
      index: 1,
      name: 'Symbol_2',
      combine: 3,
      way_243: 1,
      payout: 150,
      multiply: 0,
      win_amount: 30,
      active_icon: [1, 4, 7],
    }],
    dropLine: [],
    multiplyCount: 5,
    payout: 150,
  },
  {
    icons: ['Symbol_1', 'Symbol_3', 'Symbol_5', 'Symbol_1', 'Symbol_5', 'Symbol_5', 'Symbol_5', 'Symbol_0', 'Symbol_1'],
    activeIcons: [7, 5, 3],
    activeLines: [{
      index: 2,
      name: 'Symbol_5',
      combine: 3,
      way_243: 1,
      payout: 10,
      multiply: 0,
      win_amount: 2,
      active_icon: [7, 8, 9],
    }],
    dropLine: [],
    multiplyCount: 2,
    payout: 20,
  },
  {
    icons: ['Symbol_3', 'Symbol_3', 'Symbol_3', 'Symbol_4', 'Symbol_0', 'Symbol_5', 'Symbol_6', 'Symbol_2', 'Symbol_1'],
    activeIcons: [1, 2, 3],
    activeLines: [{
      index: 0,
      name: 'Symbol_3',
      combine: 3,
      way_243: 1,
      payout: 20,
      multiply: 0,
      win_amount: 4,
      active_icon: [1, 2, 3],
    }],
    dropLine: [],
    multiplyCount: 2,
    payout: 40,
  },
];

const PREDEFINED_LOSSES: PredefinedResult[] = [
  { icons: ['Symbol_4', 'Symbol_2', 'Symbol_5', 'Symbol_1', 'Symbol_1', 'Symbol_0', 'Symbol_2', 'Symbol_3', 'Symbol_6'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_4', 'Symbol_3', 'Symbol_2', 'Symbol_2', 'Symbol_6', 'Symbol_1', 'Symbol_1', 'Symbol_0', 'Symbol_5'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_4', 'Symbol_0', 'Symbol_2', 'Symbol_0', 'Symbol_3', 'Symbol_5', 'Symbol_6', 'Symbol_5', 'Symbol_1'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_4', 'Symbol_1', 'Symbol_2', 'Symbol_5', 'Symbol_2', 'Symbol_0', 'Symbol_4', 'Symbol_0', 'Symbol_3'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_2', 'Symbol_5', 'Symbol_4', 'Symbol_0', 'Symbol_5', 'Symbol_6', 'Symbol_5', 'Symbol_4', 'Symbol_1'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_1', 'Symbol_0', 'Symbol_3', 'Symbol_4', 'Symbol_2', 'Symbol_5', 'Symbol_4', 'Symbol_6', 'Symbol_0'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_3', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_2', 'Symbol_5', 'Symbol_3', 'Symbol_4'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_1', 'Symbol_0', 'Symbol_3', 'Symbol_1', 'Symbol_5', 'Symbol_1', 'Symbol_0', 'Symbol_4', 'Symbol_6'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_5', 'Symbol_0', 'Symbol_4', 'Symbol_2', 'Symbol_0', 'Symbol_6', 'Symbol_2', 'Symbol_5', 'Symbol_2'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_2', 'Symbol_3', 'Symbol_3', 'Symbol_3', 'Symbol_6', 'Symbol_2', 'Symbol_4', 'Symbol_0', 'Symbol_4'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_6', 'Symbol_4', 'Symbol_0', 'Symbol_5', 'Symbol_4', 'Symbol_3', 'Symbol_5', 'Symbol_0', 'Symbol_1'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_1', 'Symbol_0', 'Symbol_3', 'Symbol_4', 'Symbol_2', 'Symbol_5', 'Symbol_4', 'Symbol_6', 'Symbol_0'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_3', 'Symbol_5', 'Symbol_2', 'Symbol_5', 'Symbol_3', 'Symbol_3', 'Symbol_4', 'Symbol_1', 'Symbol_1'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_1', 'Symbol_3', 'Symbol_0', 'Symbol_2', 'Symbol_3', 'Symbol_5', 'Symbol_5', 'Symbol_1', 'Symbol_6'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_2', 'Symbol_3', 'Symbol_0', 'Symbol_5', 'Symbol_3', 'Symbol_4', 'Symbol_1', 'Symbol_0', 'Symbol_5'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
];

/**
 * Configuração de apostas Fortune Mouse
 * 
 * BaseBets: R$0.10, R$1.00, R$3.00, R$10.00
 * Níveis: 1 a 10
 * Linhas: 5
 * Fórmula: BaseBet × Nível × Linhas = Aposta Total
 */
const BASE_BETS = [0.10, 1.00, 3.00, 10.00];
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

export const FORTUNE_MOUSE_CONFIG: GameConfig = {
  gameId: 'fortunemouse',
  gameName: 'Fortune Mouse',
  rows: 3,
  cols: 3,
  symbols: SYMBOLS,
  paylines: PAYLINES,
  baseRtp: 96.5,
  volatility: 'medium',
  winChance: 45,
  loseChance: 55,
  predefinedWins: PREDEFINED_WINS,
  predefinedLosses: PREDEFINED_LOSSES,
  minBet: 0.50,
  maxBet: 500,
  defaultBet: 0.50,
  betSizes: generateBetSizes(),
  numLines: NUM_LINES,
  hasFreeSpin: false,
  hasBonusGame: false,
  hasJackpot: false,
  jackpots: {
    mini: 100,
    minor: 500,
    major: 2500,
    grand: 50000,
  },
};

export { SYMBOLS as FORTUNE_MOUSE_SYMBOLS };
export { PAYLINES as FORTUNE_MOUSE_PAYLINES };
export { PREDEFINED_WINS as FORTUNE_MOUSE_WINS };
export { PREDEFINED_LOSSES as FORTUNE_MOUSE_LOSSES };
