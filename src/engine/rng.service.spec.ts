import { RngService } from './rng.service';

describe('RngService', () => {
  let rng: RngService;

  beforeEach(() => {
    rng = new RngService();
  });

  describe('random()', () => {
    it('deve retornar valores entre 0 e 1', () => {
      for (let i = 0; i < 1000; i++) {
        const value = rng.random();
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
      }
    });

    it('deve gerar valores diferentes (não determinístico sem seed fixa)', () => {
      const values = new Set<number>();
      for (let i = 0; i < 100; i++) {
        values.add(rng.random());
      }
      // Com boa aleatoriedade, deve ter quase todos valores únicos
      expect(values.size).toBeGreaterThan(95);
    });
  });

  describe('randomInt()', () => {
    it('deve retornar valores dentro do range especificado', () => {
      const min = 5;
      const max = 10;
      for (let i = 0; i < 1000; i++) {
        const value = rng.randomInt(min, max);
        expect(value).toBeGreaterThanOrEqual(min);
        expect(value).toBeLessThanOrEqual(max);
      }
    });

    it('deve cobrir todos os valores do range', () => {
      const min = 1;
      const max = 6;
      const values = new Set<number>();
      
      for (let i = 0; i < 1000; i++) {
        values.add(rng.randomInt(min, max));
      }
      
      // Deve ter todos os valores de 1 a 6
      for (let v = min; v <= max; v++) {
        expect(values.has(v)).toBe(true);
      }
    });
  });

  describe('pick()', () => {
    it('deve escolher elementos do array', () => {
      const array = ['a', 'b', 'c', 'd'];
      for (let i = 0; i < 100; i++) {
        const picked = rng.pick(array);
        expect(array).toContain(picked);
      }
    });

    it('deve eventualmente escolher todos os elementos', () => {
      const array = ['a', 'b', 'c'];
      const picked = new Set<string>();
      
      for (let i = 0; i < 1000; i++) {
        picked.add(rng.pick(array));
      }
      
      expect(picked.size).toBe(3);
    });
  });

  describe('shuffle()', () => {
    it('deve retornar array com mesmos elementos', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = rng.shuffle(original);
      
      expect(shuffled).toHaveLength(original.length);
      expect(shuffled.sort()).toEqual(original.sort());
    });

    it('não deve modificar array original', () => {
      const original = [1, 2, 3, 4, 5];
      const copy = [...original];
      rng.shuffle(original);
      
      expect(original).toEqual(copy);
    });

    it('deve produzir ordens diferentes', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const results = new Set<string>();
      
      for (let i = 0; i < 100; i++) {
        results.add(rng.shuffle(array).join(','));
      }
      
      // Com 10 elementos, deve ter muitas ordens diferentes
      expect(results.size).toBeGreaterThan(90);
    });
  });

  describe('chance()', () => {
    it('deve retornar true com probabilidade aproximada', () => {
      const probability = 0.7;
      let trueCount = 0;
      const iterations = 10000;
      
      for (let i = 0; i < iterations; i++) {
        if (rng.chance(probability)) {
          trueCount++;
        }
      }
      
      const actualProbability = trueCount / iterations;
      // Permite 5% de margem de erro
      expect(actualProbability).toBeGreaterThan(probability - 0.05);
      expect(actualProbability).toBeLessThan(probability + 0.05);
    });

    it('deve sempre retornar false para chance(0)', () => {
      for (let i = 0; i < 100; i++) {
        expect(rng.chance(0)).toBe(false);
      }
    });

    it('deve sempre retornar true para chance(1)', () => {
      for (let i = 0; i < 100; i++) {
        expect(rng.chance(1)).toBe(true);
      }
    });
  });

  describe('weightedChoice()', () => {
    it('deve respeitar pesos aproximadamente', () => {
      const weights = [70, 20, 10]; // 70%, 20%, 10%
      const counts = [0, 0, 0];
      const iterations = 10000;
      
      for (let i = 0; i < iterations; i++) {
        const choice = rng.weightedChoice(weights);
        counts[choice]++;
      }
      
      const percentages = counts.map(c => (c / iterations) * 100);
      
      // Permite 5% de margem de erro
      expect(percentages[0]).toBeGreaterThan(65);
      expect(percentages[0]).toBeLessThan(75);
      expect(percentages[1]).toBeGreaterThan(15);
      expect(percentages[1]).toBeLessThan(25);
      expect(percentages[2]).toBeGreaterThan(5);
      expect(percentages[2]).toBeLessThan(15);
    });
  });

  describe('seed()', () => {
    it('deve produzir resultados determinísticos com mesma seed', () => {
      const seed = 12345;
      
      rng.seed(seed);
      const results1 = Array.from({ length: 10 }, () => rng.random());
      
      rng.seed(seed);
      const results2 = Array.from({ length: 10 }, () => rng.random());
      
      expect(results1).toEqual(results2);
    });

    it('deve produzir resultados diferentes com seeds diferentes', () => {
      rng.seed(11111);
      const results1 = Array.from({ length: 10 }, () => rng.random());
      
      rng.seed(99999);
      const results2 = Array.from({ length: 10 }, () => rng.random());
      
      expect(results1).not.toEqual(results2);
    });
  });

  describe('audit seed', () => {
    it('deve gerar seed de auditoria válida', () => {
      const auditSeed = rng.generateAuditSeed();
      expect(auditSeed).toMatch(/^[0-9a-f]+-[0-9a-f]+$/);
    });

    it('deve restaurar estado a partir de audit seed', () => {
      const auditSeed = rng.generateAuditSeed();
      
      rng.restoreFromAuditSeed(auditSeed);
      const results1 = Array.from({ length: 5 }, () => rng.random());
      
      rng.restoreFromAuditSeed(auditSeed);
      const results2 = Array.from({ length: 5 }, () => rng.random());
      
      expect(results1).toEqual(results2);
    });
  });
});
