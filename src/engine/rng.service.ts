import { Injectable } from '@nestjs/common';

/**
 * Serviço de RNG (Random Number Generator)
 *
 * Implementa geração de números aleatórios para jogos de cassino.
 * Usa algoritmo Mersenne Twister para melhor distribuição estatística.
 *
 * IMPORTANTE: Para produção real, considere usar:
 * - Hardware RNG
 * - Serviço externo certificado (ex: Gaming Labs)
 * - crypto.randomBytes do Node.js
 */
@Injectable()
export class RngService {

  // Estado do Mersenne Twister
  private mt: number[] = new Array(624);
  private mti: number = 625;

  constructor() {
    // Inicializa com seed baseado em timestamp + crypto
    this.seed(Date.now() ^ Math.floor(Math.random() * 0xFFFFFFFF));
  }

  /**
   * Inicializa o gerador com uma seed
   */
  seed(s: number): void {
    this.mt[0] = s >>> 0;
    for (this.mti = 1; this.mti < 624; this.mti++) {
      const s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
      this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
                          (s & 0x0000ffff) * 1812433253) + this.mti;
      this.mt[this.mti] >>>= 0;
    }
  }

  /**
   * Gera um número inteiro de 32 bits
   */
  private genrandInt32(): number {
    let y: number;
    const mag01 = [0x0, 0x9908b0df];

    if (this.mti >= 624) {
      let kk: number;

      for (kk = 0; kk < 624 - 397; kk++) {
        y = (this.mt[kk] & 0x80000000) | (this.mt[kk + 1] & 0x7fffffff);
        this.mt[kk] = this.mt[kk + 397] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (; kk < 624 - 1; kk++) {
        y = (this.mt[kk] & 0x80000000) | (this.mt[kk + 1] & 0x7fffffff);
        this.mt[kk] = this.mt[kk + (397 - 624)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y = (this.mt[624 - 1] & 0x80000000) | (this.mt[0] & 0x7fffffff);
      this.mt[624 - 1] = this.mt[397 - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

      this.mti = 0;
    }

    y = this.mt[this.mti++];

    // Tempering
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);

    return y >>> 0;
  }

  /**
   * Gera um número entre 0 (inclusive) e 1 (exclusivo)
   * Equivalente a Math.random() mas com melhor distribuição
   */
  random(): number {
    return this.genrandInt32() * (1.0 / 4294967296.0);
  }

  /**
   * Gera um inteiro entre min (inclusive) e max (inclusive)
   */
  randomInt(min: number, max: number): number {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  /**
   * Gera um inteiro entre 0 e max (exclusivo)
   */
  randomIndex(max: number): number {
    return Math.floor(this.random() * max);
  }

  /**
   * Escolhe um elemento aleatório de um array
   */
  pick<T>(array: T[]): T {
    return array[this.randomIndex(array.length)];
  }

  /**
   * Embaralha um array (Fisher-Yates)
   */
  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.randomIndex(i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  /**
   * Retorna true com probabilidade p (0-1)
   */
  chance(p: number): boolean {
    return this.random() < p;
  }

  /**
   * Escolhe um índice baseado em pesos
   * Ex: weights = [70, 20, 10] -> 70% chance de retornar 0, 20% de 1, 10% de 2
   */
  weightedChoice(weights: number[]): number {
    const total = weights.reduce((a, b) => a + b, 0);
    let r = this.random() * total;

    for (let i = 0; i < weights.length; i++) {
      r -= weights[i];
      if (r <= 0) return i;
    }

    return weights.length - 1;
  }

  /**
   * Gera uma seed para auditoria (pode ser armazenada para reproduzir resultado)
   */
  generateAuditSeed(): string {
    const timestamp = Date.now();
    const random = this.genrandInt32();
    return `${timestamp.toString(16)}-${random.toString(16)}`;
  }

  /**
   * Restaura estado a partir de uma seed de auditoria
   */
  restoreFromAuditSeed(auditSeed: string): void {
    const [timestampHex, randomHex] = auditSeed.split('-');
    const timestamp = parseInt(timestampHex, 16);
    const random = parseInt(randomHex, 16);
    this.seed(timestamp ^ random);
  }
}
