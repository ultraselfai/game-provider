/**
 * Token Utility - Compatível com o sistema PHP (Helper::MakeToken / Helper::DecToken)
 *
 * O sistema PHP usa uma substituição de caracteres customizada + base64 para criar tokens.
 * Este módulo implementa a mesma lógica em TypeScript para garantir compatibilidade.
 */

// Mapeamento de caracteres para encode (base64 char -> custom char)
const ENCODE_MAP: { [key: string]: string } = {
  'a': '8', 'b': 'e', 'c': '9', 'd': 'f', 'e': 'b', 'f': 'd',
  'g': 'h', 'h': 'g', 'i': 'j', 'j': 'i', 'k': 'm', 'l': 'o',
  'm': 'k', 'n': 'z', 'o': 'l', 'p': 'w', 'q': '4', 'r': 's',
  's': 'r', 't': 'u', 'u': 't', 'v': 'x', 'x': 'v', 'w': 'p',
  'y': '6', 'z': 'n', '0': '7', '1': '2', '2': '1', '3': '5',
  '4': 'q', '5': '3', '6': 'y', '7': '0', '8': 'c', '9': 'a',
  '=': ''
};

// Mapeamento de caracteres para decode (custom char -> base64 char)
const DECODE_MAP: { [key: string]: string } = {
  '8': 'a', 'e': 'b', '9': 'c', 'f': 'd', 'b': 'e', 'd': 'f',
  'h': 'g', 'g': 'h', 'j': 'i', 'i': 'j', 'm': 'k', 'o': 'l',
  'k': 'm', 'z': 'n', 'l': 'o', 'w': 'p', '4': 'q', 's': 'r',
  'r': 's', 'u': 't', 't': 'u', 'x': 'v', 'v': 'x', 'p': 'w',
  '6': 'y', 'n': 'z', '7': '0', '2': '1', '1': '2', '5': '3',
  'q': '4', '3': '5', 'y': '6', '0': '7', 'c': '8', 'a': '9'
};

/**
 * Codifica um objeto em token (equivalente ao Helper::MakeToken do PHP)
 * @param data Objeto a ser codificado
 * @returns Token codificado
 */
export function makeToken(data: object): string {
  const json = JSON.stringify(data);
  const base64 = Buffer.from(json).toString('base64');

  let encoded = '';
  for (const char of base64) {
    encoded += ENCODE_MAP[char.toLowerCase()] || char;
  }

  return encoded;
}

/**
 * Decodifica um token para objeto (equivalente ao Helper::DecToken do PHP)
 * @param token Token codificado
 * @returns Objeto decodificado ou null se inválido
 */
export function decToken(token: string): { status: boolean; id?: number; game?: string; [key: string]: any } | null {
  try {
    // Se for numérico, retorna como está (compatibilidade com PHP)
    if (/^\d+$/.test(token)) {
      return { status: false, message: 'numeric token' };
    }

    // Decodifica usando o mapa inverso
    let decoded = '';
    for (const char of token) {
      decoded += DECODE_MAP[char.toLowerCase()] || char;
    }

    // Adiciona padding de base64 se necessário
    while (decoded.length % 4 !== 0) {
      decoded += '=';
    }

    // Decodifica base64 para JSON
    const json = Buffer.from(decoded, 'base64').toString('utf8');

    // Tenta parsear como JSON
    const data = JSON.parse(json);

    // Adiciona status: true como o PHP faz
    return { status: true, ...data };
  } catch (error) {
    return { status: false, message: 'invalid token' };
  }
}

/**
 * Gera um token de teste válido para desenvolvimento
 * @param userId ID do usuário simulado
 * @param gameCode Código do jogo
 * @returns Token válido para testes
 */
export function generateTestToken(userId: number = 1, gameCode: string = 'fortunetiger'): string {
  return makeToken({
    id: userId,
    game: gameCode
  });
}
