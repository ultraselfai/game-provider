import { GameConfig, PredefinedResult, SymbolConfig, PaylineConfig } from '../../engine/types';

/**
 * Configuração do Bikini Paradise
 * Grid: 5x3, 25 paylines
 * Tema: Praia Tropical
 */

const SYMBOLS: SymbolConfig[] = [
  {
    id: 0,
    name: 'Symbol_0',
    displayName: 'Wild/Girl',
    isWild: true,
    isScatter: false,
    payouts: [0, 0, 50, 200, 1000],
  },
  {
    id: 1,
    name: 'Symbol_1',
    displayName: 'Scatter/Coconut',
    isWild: false,
    isScatter: true,
    payouts: [0, 0, 5, 20, 100],
  },
  {
    id: 2,
    name: 'Symbol_2',
    displayName: 'Cocktail',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 30, 100, 500],
  },
  {
    id: 3,
    name: 'Symbol_3',
    displayName: 'Surfboard',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 25, 80, 400],
  },
  {
    id: 4,
    name: 'Symbol_4',
    displayName: 'Sunglasses',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 20, 60, 300],
  },
  {
    id: 5,
    name: 'Symbol_5',
    displayName: 'Starfish',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 15, 50, 200],
  },
  {
    id: 6,
    name: 'Symbol_6',
    displayName: 'Towel',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 10, 40, 150],
  },
  {
    id: 7,
    name: 'Symbol_7',
    displayName: 'A',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 5, 20, 100],
  },
  {
    id: 8,
    name: 'Symbol_8',
    displayName: 'K',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 5, 20, 100],
  },
  {
    id: 9,
    name: 'Symbol_9',
    displayName: 'Q',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 5, 15, 75],
  },
  {
    id: 10,
    name: 'Symbol_10',
    displayName: 'J',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 5, 15, 75],
  },
  {
    id: 11,
    name: 'Symbol_11',
    displayName: '10',
    isWild: false,
    isScatter: false,
    payouts: [0, 0, 5, 10, 50],
  },
];

// 5x3 grid with 25 paylines
const PAYLINES: PaylineConfig[] = [
  { id: 0, name: 'Line 1', positions: [0, 1, 2, 3, 4] },           // Top row
  { id: 1, name: 'Line 2', positions: [5, 6, 7, 8, 9] },           // Middle row
  { id: 2, name: 'Line 3', positions: [10, 11, 12, 13, 14] },      // Bottom row
  { id: 3, name: 'Line 4', positions: [0, 6, 12, 8, 4] },          // V shape
  { id: 4, name: 'Line 5', positions: [10, 6, 2, 8, 14] },         // Inverted V
  { id: 5, name: 'Line 6', positions: [5, 1, 2, 3, 9] },           // Upper zigzag
  { id: 6, name: 'Line 7', positions: [5, 11, 12, 13, 9] },        // Lower zigzag
  { id: 7, name: 'Line 8', positions: [0, 1, 7, 3, 4] },           // Top dip
  { id: 8, name: 'Line 9', positions: [10, 11, 7, 13, 14] },       // Bottom rise
  { id: 9, name: 'Line 10', positions: [5, 6, 2, 8, 9] },          // Middle rise
  { id: 10, name: 'Line 11', positions: [5, 6, 12, 8, 9] },        // Middle dip
  { id: 11, name: 'Line 12', positions: [0, 6, 7, 8, 4] },         // Diagonal down-up
  { id: 12, name: 'Line 13', positions: [10, 6, 7, 8, 14] },       // Diagonal up-down
  { id: 13, name: 'Line 14', positions: [0, 6, 2, 8, 4] },         // W shape top
  { id: 14, name: 'Line 15', positions: [10, 6, 12, 8, 14] },      // M shape bottom
  { id: 15, name: 'Line 16', positions: [5, 1, 7, 3, 9] },         // Double zigzag up
  { id: 16, name: 'Line 17', positions: [5, 11, 7, 13, 9] },       // Double zigzag down
  { id: 17, name: 'Line 18', positions: [0, 1, 12, 3, 4] },        // Deep V
  { id: 18, name: 'Line 19', positions: [10, 11, 2, 13, 14] },     // Inverted deep V
  { id: 19, name: 'Line 20', positions: [0, 11, 12, 13, 4] },      // Cross down
  { id: 20, name: 'Line 21', positions: [10, 1, 2, 3, 14] },       // Cross up
  { id: 21, name: 'Line 22', positions: [5, 1, 12, 3, 9] },        // Center deep
  { id: 22, name: 'Line 23', positions: [5, 11, 2, 13, 9] },       // Center high
  { id: 23, name: 'Line 24', positions: [0, 6, 7, 13, 14] },       // Stairs down
  { id: 24, name: 'Line 25', positions: [10, 6, 7, 3, 4] },        // Stairs up
];

const PREDEFINED_WINS: PredefinedResult[] = [
  {
    icons: ['Symbol_2', 'Symbol_2', 'Symbol_2', 'Symbol_5', 'Symbol_7', 'Symbol_3', 'Symbol_4', 'Symbol_6', 'Symbol_8', 'Symbol_9', 'Symbol_10', 'Symbol_11', 'Symbol_1', 'Symbol_0', 'Symbol_7'],
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
    icons: ['Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_3', 'Symbol_3', 'Symbol_3', 'Symbol_3', 'Symbol_4', 'Symbol_10', 'Symbol_11', 'Symbol_2', 'Symbol_5', 'Symbol_6', 'Symbol_0', 'Symbol_1'],
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
    icons: ['Symbol_4', 'Symbol_4', 'Symbol_4', 'Symbol_4', 'Symbol_4', 'Symbol_5', 'Symbol_6', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_10', 'Symbol_11', 'Symbol_0', 'Symbol_1', 'Symbol_2'],
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
    icons: ['Symbol_5', 'Symbol_5', 'Symbol_5', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_10', 'Symbol_11', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_6', 'Symbol_0'],
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
  {
    icons: ['Symbol_6', 'Symbol_6', 'Symbol_6', 'Symbol_6', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_10', 'Symbol_11', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5'],
    activeIcons: [1, 2, 3, 4],
    activeLines: [{
      index: 0,
      name: 'Symbol_6',
      combine: 4,
      way_243: 1,
      payout: 40,
      multiply: 0,
      win_amount: 8,
      active_icon: [1, 2, 3, 4],
    }],
    dropLine: [],
    multiplyCount: 1,
    payout: 40,
  },
  // MEGAWIN
  {
    icons: ['Symbol_0', 'Symbol_0', 'Symbol_0', 'Symbol_0', 'Symbol_0', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_10', 'Symbol_11', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5'],
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
    icons: ['Symbol_2', 'Symbol_2', 'Symbol_2', 'Symbol_2', 'Symbol_2', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_10', 'Symbol_11', 'Symbol_0', 'Symbol_1', 'Symbol_3', 'Symbol_4', 'Symbol_5'],
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
    icons: ['Symbol_7', 'Symbol_7', 'Symbol_7', 'Symbol_7', 'Symbol_8', 'Symbol_9', 'Symbol_10', 'Symbol_11', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_6'],
    activeIcons: [1, 2, 3, 4],
    activeLines: [{
      index: 0,
      name: 'Symbol_7',
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
    icons: ['Symbol_8', 'Symbol_8', 'Symbol_8', 'Symbol_9', 'Symbol_10', 'Symbol_11', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_6', 'Symbol_7', 'Symbol_0'],
    activeIcons: [1, 2, 3],
    activeLines: [{
      index: 0,
      name: 'Symbol_8',
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
    icons: ['Symbol_9', 'Symbol_9', 'Symbol_9', 'Symbol_9', 'Symbol_9', 'Symbol_10', 'Symbol_11', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4', 'Symbol_5', 'Symbol_6', 'Symbol_7'],
    activeIcons: [1, 2, 3, 4, 5],
    activeLines: [{
      index: 0,
      name: 'Symbol_9',
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
];

const PREDEFINED_LOSSES: PredefinedResult[] = [
  { icons: ['Symbol_7', 'Symbol_3', 'Symbol_9', 'Symbol_2', 'Symbol_5', 'Symbol_8', 'Symbol_4', 'Symbol_6', 'Symbol_11', 'Symbol_10', 'Symbol_0', 'Symbol_1', 'Symbol_2', 'Symbol_3', 'Symbol_4'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_8', 'Symbol_5', 'Symbol_10', 'Symbol_3', 'Symbol_6', 'Symbol_9', 'Symbol_2', 'Symbol_7', 'Symbol_0', 'Symbol_11', 'Symbol_1', 'Symbol_4', 'Symbol_3', 'Symbol_5', 'Symbol_2'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_9', 'Symbol_6', 'Symbol_11', 'Symbol_4', 'Symbol_7', 'Symbol_10', 'Symbol_3', 'Symbol_8', 'Symbol_1', 'Symbol_0', 'Symbol_2', 'Symbol_5', 'Symbol_4', 'Symbol_6', 'Symbol_3'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_10', 'Symbol_7', 'Symbol_0', 'Symbol_5', 'Symbol_8', 'Symbol_11', 'Symbol_4', 'Symbol_9', 'Symbol_2', 'Symbol_1', 'Symbol_3', 'Symbol_6', 'Symbol_5', 'Symbol_7', 'Symbol_4'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_11', 'Symbol_8', 'Symbol_1', 'Symbol_6', 'Symbol_9', 'Symbol_0', 'Symbol_5', 'Symbol_10', 'Symbol_3', 'Symbol_2', 'Symbol_4', 'Symbol_7', 'Symbol_6', 'Symbol_8', 'Symbol_5'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_0', 'Symbol_9', 'Symbol_2', 'Symbol_7', 'Symbol_10', 'Symbol_1', 'Symbol_6', 'Symbol_11', 'Symbol_4', 'Symbol_3', 'Symbol_5', 'Symbol_8', 'Symbol_7', 'Symbol_9', 'Symbol_6'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_1', 'Symbol_10', 'Symbol_3', 'Symbol_8', 'Symbol_11', 'Symbol_2', 'Symbol_7', 'Symbol_0', 'Symbol_5', 'Symbol_4', 'Symbol_6', 'Symbol_9', 'Symbol_8', 'Symbol_10', 'Symbol_7'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_2', 'Symbol_11', 'Symbol_4', 'Symbol_9', 'Symbol_0', 'Symbol_3', 'Symbol_8', 'Symbol_1', 'Symbol_6', 'Symbol_5', 'Symbol_7', 'Symbol_10', 'Symbol_9', 'Symbol_11', 'Symbol_8'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_3', 'Symbol_0', 'Symbol_5', 'Symbol_10', 'Symbol_1', 'Symbol_4', 'Symbol_9', 'Symbol_2', 'Symbol_7', 'Symbol_6', 'Symbol_8', 'Symbol_11', 'Symbol_10', 'Symbol_0', 'Symbol_9'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_4', 'Symbol_1', 'Symbol_6', 'Symbol_11', 'Symbol_2', 'Symbol_5', 'Symbol_10', 'Symbol_3', 'Symbol_8', 'Symbol_7', 'Symbol_9', 'Symbol_0', 'Symbol_11', 'Symbol_1', 'Symbol_10'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_5', 'Symbol_2', 'Symbol_7', 'Symbol_0', 'Symbol_3', 'Symbol_6', 'Symbol_11', 'Symbol_4', 'Symbol_9', 'Symbol_8', 'Symbol_10', 'Symbol_1', 'Symbol_0', 'Symbol_2', 'Symbol_11'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_6', 'Symbol_3', 'Symbol_8', 'Symbol_1', 'Symbol_4', 'Symbol_7', 'Symbol_0', 'Symbol_5', 'Symbol_10', 'Symbol_9', 'Symbol_11', 'Symbol_2', 'Symbol_1', 'Symbol_3', 'Symbol_0'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_7', 'Symbol_4', 'Symbol_9', 'Symbol_2', 'Symbol_5', 'Symbol_8', 'Symbol_1', 'Symbol_6', 'Symbol_11', 'Symbol_10', 'Symbol_0', 'Symbol_3', 'Symbol_2', 'Symbol_4', 'Symbol_1'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_8', 'Symbol_5', 'Symbol_10', 'Symbol_3', 'Symbol_6', 'Symbol_9', 'Symbol_2', 'Symbol_7', 'Symbol_0', 'Symbol_11', 'Symbol_1', 'Symbol_4', 'Symbol_3', 'Symbol_5', 'Symbol_2'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
  { icons: ['Symbol_9', 'Symbol_6', 'Symbol_11', 'Symbol_4', 'Symbol_7', 'Symbol_10', 'Symbol_3', 'Symbol_8', 'Symbol_1', 'Symbol_0', 'Symbol_2', 'Symbol_5', 'Symbol_4', 'Symbol_6', 'Symbol_3'], activeIcons: [], activeLines: [], dropLine: [], multiplyCount: 1, payout: 0 },
];

export const BIKINI_PARADISE_CONFIG: GameConfig = {
  gameId: 'bikiniparadise',
  gameName: 'Bikini Paradise',
  rows: 3,
  cols: 5,
  symbols: SYMBOLS,
  paylines: PAYLINES,
  baseRtp: 96.5,
  volatility: 'medium',
  winChance: 40,
  loseChance: 60,
  predefinedWins: PREDEFINED_WINS,
  predefinedLosses: PREDEFINED_LOSSES,
  minBet: 0.25,
  maxBet: 125,
  defaultBet: 0.25,
  betSizes: [0.25, 2.50, 25, 125],
  numLines: 25,
  hasFreeSpin: true,
  hasBonusGame: true,
  hasJackpot: false,
  jackpots: {
    mini: 250,
    minor: 1250,
    major: 6250,
    grand: 125000,
  },
};

export { SYMBOLS as BIKINI_PARADISE_SYMBOLS };
export { PAYLINES as BIKINI_PARADISE_PAYLINES };
export { PREDEFINED_WINS as BIKINI_PARADISE_WINS };
export { PREDEFINED_LOSSES as BIKINI_PARADISE_LOSSES };
