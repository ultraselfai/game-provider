/**
 * Tipos comuns do Slot Engine
 * Usados por todos os jogos que usam o engine
 */

// Configuração de um símbolo
export interface SymbolConfig {
  id: number;
  name: string;           // Ex: 'Symbol_0', 'Symbol_1'
  displayName: string;    // Ex: 'Tiger', 'Coin'
  isWild: boolean;        // Se é wild (substitui outros)
  isScatter: boolean;     // Se é scatter (ativa bonus)
  payouts: number[];      // Pagamentos por quantidade [0, 0, win3, win4, win5]
}

// Configuração de uma payline
export interface PaylineConfig {
  id: number;
  name: string;
  positions: number[];    // Posições no grid (0-8 para 3x3)
  // Para grid 3x3: [0,1,2] = linha superior, [3,4,5] = meio, [6,7,8] = inferior
  // Para grid 3x5: [0,1,2,3,4] = linha superior, etc.
}

// Configuração completa de um jogo
export interface GameConfig {
  gameId: string;         // Ex: 'fortunetiger'
  gameName: string;       // Ex: 'Fortune Tiger'

  // Grid
  rows: number;           // Linhas (geralmente 3)
  cols: number;           // Colunas (3 para Fortune Tiger)

  // Símbolos
  symbols: SymbolConfig[];

  // Paylines
  paylines: PaylineConfig[];

  // RTP e matemática
  baseRtp: number;        // Ex: 96.5
  volatility: 'low' | 'medium' | 'high';

  // Probabilidades de resultado pré-definido
  winChance: number;      // % de chance de pegar resultado win
  loseChance: number;     // % de chance de pegar resultado lose

  // Resultados pré-definidos (modo PHP)
  predefinedWins: PredefinedResult[];
  predefinedLosses: PredefinedResult[];

  // Configurações de aposta
  minBet: number;
  maxBet: number;
  defaultBet: number;
  betSizes: number[];
  numLines: number;
  
  // Configuração de apostas estilo PG Soft (opcional)
  baseBets?: number[];     // Ex: [0.08, 0.80, 3.00, 10.00]
  maxLevel?: number;       // Ex: 10 (níveis 1-10)

  // Formato de icon_data (para jogos C3)
  useFlatIconData?: boolean;  // true = array flat [s0, s1, s2...], false = matriz 2D [[row0], [row1]...]

  // Features
  hasFreeSpin: boolean;
  hasBonusGame: boolean;
  hasJackpot: boolean;

  // Jackpots (se houver)
  jackpots?: {
    mini: number;
    minor: number;
    major: number;
    grand: number;
  };
}

// Resultado pré-definido (migrado do PHP)
export interface PredefinedResult {
  icons: string[];        // 9 símbolos para grid 3x3
  activeIcons: number[];  // Posições dos ícones vencedores
  activeLines: WinLine[]; // Linhas vencedoras
  dropLine: any[];        // Dados de drop (cascata)
  multiplyCount: number;  // Multiplicador
  payout: number;         // Pagamento base (multiplicar por bet)
}

// Linha vencedora
export interface WinLine {
  index: number;          // Índice da payline
  name: string;           // Nome do símbolo vencedor
  combine: number;        // Quantidade de símbolos combinados
  way_243: number;        // Se usa 243 ways
  payout: number;         // Pagamento desta linha
  multiply: number;       // Multiplicador
  win_amount: number;     // Valor ganho
  active_icon: number[];  // Posições ativas
}

// Resultado de um spin
export interface SpinResult {
  icons: string[];        // Grid de símbolos
  iconData: string[][];   // Grid em formato matriz (para frontend)
  totalWin: number;       // Ganho total
  winLines: WinLine[];    // Linhas vencedoras
  activeIcons: number[];  // Posições dos ícones vencedores
  multiply: number;       // Multiplicador total
  totalWay: number;       // Número de ways vencedoras
  isWin: boolean;         // Se houve ganho
  isBigWin: boolean;      // Se é big win (>10x)
  isMegaWin: boolean;     // Se é mega win (>25x)
  triggerFreeSpin: boolean;
  freeSpinsAwarded: number;
  triggerBonus: boolean;
  
  // Feature especial (Tigre da Sorte, Touro, etc.)
  featureTriggered: boolean;       // Se a feature especial foi ativada
  featureResult?: FeatureResult;   // Dados da feature (respins, símbolo escolhido)
}

/**
 * Resultado da Feature Especial (Tigre da Sorte / Fortune Ox / etc.)
 * 
 * Mecânica:
 * 1. Durante qualquer spin, pode ativar aleatoriamente
 * 2. Um símbolo é escolhido (exceto Wild)
 * 3. Grid mostra apenas: símbolo escolhido, Wild, ou vazio
 * 4. Se aparecer 1+ símbolo novo, faz respin com símbolos fixos
 * 5. Continua até não aparecer mais símbolos
 * 6. Se grid cheio: multiplicador x10
 */
export interface FeatureResult {
  featureSymbol: string;           // Símbolo escolhido para a feature
  featureSymbolId: number;         // ID do símbolo
  totalRespins: number;            // Quantos respins aconteceram
  finalMultiplier: number;         // Multiplicador final (10 se grid cheio)
  isFullGrid: boolean;             // Se o grid ficou cheio (ativa x10)
  respinHistory: RespinData[];     // Histórico de cada respin
  lockedPositions: number[];       // Posições travadas no grid
}

/**
 * Dados de cada respin da feature
 */
export interface RespinData {
  respinNumber: number;            // Número do respin (1, 2, 3...)
  icons: string[];                 // Grid após este respin
  newSymbolsCount: number;         // Quantos símbolos novos apareceram
  lockedPositions: number[];       // Posições travadas após este respin
}

// Dados da sessão de um jogador
export interface PlayerSession {
  sessionId: string;
  playerId: number;
  gameId: string;
  balance: number;
  freeSpins: number;
  freeSpinsTotal: number;
  isFreeSpin: boolean;
  multiply: number;
  createdAt: Date;
  lastSpinAt: Date | null;
}

// Request de spin
export interface SpinRequest {
  token: string;
  betAmount: number;
  numLines: number;
  cpl: number;            // Credits per line
}

// Response de sessão (para o frontend)
export interface SessionResponse {
  success: boolean;
  data: {
    user_name: string;
    credit: number;
    num_line: number;
    line_num: number;
    bet_amount: number;
    free_num: number;
    free_total: number;
    free_amount: number;
    free_multi: number;
    freespin_mode: number;
    multiple_list: number[];
    credit_line: number;
    buy_feature: number;
    buy_max: number;
    feature: any;
    total_way: number;
    multiply: number;
    icon_data: string[];
    active_icons: number[];
    active_lines: WinLine[];
    drop_line: any[];
    currency_prefix: string;
    currency_suffix: string;
    currency_thousand: string;
    currency_decimal: string;
    bet_size_list: string[];
    previous_session: boolean;
    game_state: string | null;
    feature_symbol: string;
    feature_result: any;
  };
  message: string;
}

// Response de spin (para o frontend)
export interface SpinResponse {
  success: boolean;
  data: {
    credit: number;
    freemode: boolean;
    free_num: number;
    multiply: number;
    pull: {
      TotalWay: number;
      SlotIcons: string[];
      WinAmount: number;
      ActiveIcons: number[];
      ActiveLines: WinLine[];
      DropLineData?: any[];
      WinOnDrop?: number;
    };
  };
  message: string;
}
