/**
 * Exporta todas as configurações de jogos
 */
export * from './fortunetiger.config';
export * from './fortuneox.config';
export * from './fortunerabbit.config';
export * from './fortunemouse.config';
export * from './fortunepanda.config';
export * from './bikiniparadise.config';
export * from './hoodvswoolf.config';
export * from './jackfrost.config';
export * from './phoenixrises.config';
export * from './queenofbounty.config';
export * from './songkranparty.config';
export * from './treasuresofaztec.config';

// Importa para criar o mapa de jogos
import { FORTUNE_TIGER_CONFIG } from './fortunetiger.config';
import { FORTUNE_OX_CONFIG } from './fortuneox.config';
import { FORTUNE_RABBIT_CONFIG } from './fortunerabbit.config';
import { FORTUNE_MOUSE_CONFIG } from './fortunemouse.config';
import { FORTUNE_PANDA_CONFIG } from './fortunepanda.config';
import { BIKINI_PARADISE_CONFIG } from './bikiniparadise.config';
import { HOOD_VS_WOLF_CONFIG } from './hoodvswoolf.config';
import { JACK_FROST_CONFIG } from './jackfrost.config';
import { PHOENIX_RISES_CONFIG } from './phoenixrises.config';
import { QUEEN_OF_BOUNTY_CONFIG } from './queenofbounty.config';
import { SONGKRAN_PARTY_CONFIG } from './songkranparty.config';
import { TREASURES_OF_AZTEC_CONFIG } from './treasuresofaztec.config';
import { GameConfig } from '../../engine/types';

/**
 * Mapa de todos os jogos disponíveis
 * 12 jogos com assets visuais e configuração completa
 */
export const GAME_CONFIGS: Record<string, GameConfig> = {
  // Fortune Series (3x3 grid)
  fortunetiger: FORTUNE_TIGER_CONFIG,
  fortuneox: FORTUNE_OX_CONFIG,
  fortunerabbit: FORTUNE_RABBIT_CONFIG,
  fortunemouse: FORTUNE_MOUSE_CONFIG,
  fortunepanda: FORTUNE_PANDA_CONFIG,
  // 5x3 Slots
  bikiniparadise: BIKINI_PARADISE_CONFIG,
  hoodvswoolf: HOOD_VS_WOLF_CONFIG,
  phoenixrises: PHOENIX_RISES_CONFIG,
  // Special Mechanics
  jackfrost: JACK_FROST_CONFIG,         // Infinity Reels
  queenofbounty: QUEEN_OF_BOUNTY_CONFIG, // MegaWays
  songkranparty: SONGKRAN_PARTY_CONFIG,  // 5x3 25 lines
  treasuresofaztec: TREASURES_OF_AZTEC_CONFIG, // Cluster Pays 5x5
};

/**
 * Retorna a configuração de um jogo pelo ID
 */
export function getGameConfig(gameId: string): GameConfig | undefined {
  return GAME_CONFIGS[gameId.toLowerCase()];
}

/**
 * Lista todos os jogos disponíveis
 */
export function listAvailableGames(): string[] {
  return Object.keys(GAME_CONFIGS);
}
