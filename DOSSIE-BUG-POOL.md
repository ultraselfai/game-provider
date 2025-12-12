# 🚨 DOSSIÊ COMPLETO: BUG CRÍTICO NO POOL DE LIQUIDEZ

**Data:** 12 de dezembro de 2025  
**Prioridade:** CRÍTICA  
**Status:** DIAGNOSTICADO - AGUARDANDO CORREÇÃO

---

## 📋 RESUMO EXECUTIVO

O sistema de pool de liquidez **não está sendo respeitado** devido a uma falha crítica na Feature "Tigre da Sorte". Esta feature opera de forma **completamente independente** das configurações do pool, permitindo pagamentos massivos mesmo quando o pool está em modo de retenção com configurações restritivas.

### Caso Reportado:
- **Configuração do Pool:** Modo Retenção, WinChance 10%, Multiplicador Máximo 4x
- **Aposta:** R$8,00
- **Prêmio Pago:** R$320,00 (40x)
- **Prêmio Esperado Máximo:** R$32,00 (4x)
- **Violação:** Pagou 10x mais do que o limite configurado

---

## 🔍 ANÁLISE TÉCNICA DETALHADA

### Fluxo Normal do Spin (CORRETO)

```
1. Jogador aposta R$8
2. PoolService.checkPayoutLimits() → Retorna:
   - effectiveWinChance: 10% (configurado)
   - maxMultiplier: 4x (configurado)
   - phase: 'retention'

3. SlotEngine.spinPredefined() recebe:
   - winChance: 10%
   - maxPayout: 4 (multiplicador máximo)
   - phase: 'retention'

4. SORTEIO: random() vs 10%
   - Se PERDA (90%): Seleciona resultado de derrota ✅
   - Se VITÓRIA (10%): pickWeightedWin() com maxPayout=4 ✅
     - Filtra apenas resultados com payout <= 4x ✅
     - Usa tabela RETENTION_PAYOUT_WEIGHTS ✅
```

### Fluxo da Feature "Tigre da Sorte" (PROBLEMA)

```
5. APÓS o sorteio normal, INDEPENDENTE do resultado:
   
   if (featureConfig.enabled) {  // true para Fortune Tiger
     featureRoll = random() * 100;
     featureTriggered = featureRoll < 8;  // 8% FIXO!
     
     if (featureTriggered) {
       // IGNORA winChance do pool
       // IGNORA maxPayout do pool
       // IGNORA phase do pool
       
       executeFeature() → Pode preencher grid todo
       
       if (isFullGrid) {
         // Calcula prêmio SEM LIMITES:
         finalWinAmount = bet * basePayout * 10;
         // basePayout = 50 (Firecracker/Fogos)
         // 8 * 50 * 10 = R$4000 possível!
       }
     }
   }
```

---

## 🔴 BUGS IDENTIFICADOS

### BUG 1: Feature ignora o resultado WIN/LOSE do pool

**Arquivo:** `src/engine/slot-engine.ts` (linhas 300-305)

```typescript
// Sorteio NORMAL respeitando pool:
const isWinSpin = randomRoll < winChanceDecimal;  // winChance = 10%

// ... depois ...

// Feature com sorteio SEPARADO que ignora o sorteio anterior:
if (featureConfig.enabled) {
  const featureRoll = this.rng.random() * 100;
  featureTriggered = featureRoll < featureConfig.triggerChance; // 8% SEMPRE!
```

**Problema:** A feature tem 8% de chance de ativar INDEPENDENTE do jogador ter "perdido" no sorteio do pool. Isso significa que mesmo com winChance=0%, a feature ainda ativa 8% das vezes.

**Impacto:** Pool em retenção com winChance baixa ainda paga prêmios da feature.

---

### BUG 2: Feature ignora maxPayout do pool

**Arquivo:** `src/engine/slot-engine.ts` (linhas 320-322)

```typescript
if (featureResult.isFullGrid) {
  finalMultiplier = featureResult.finalMultiplier;  // 10x fixo
  const basePayout = symbolConfig?.payouts[config.cols] || selectedResult.payout;
  finalWinAmount = cpl * bet * basePayout * finalMultiplier;  // SEM LIMITE!
```

**Problema:** O cálculo do prêmio da feature não considera `maxPayout` do pool.

**Matemática do problema:**
- Grid cheio com símbolo "Firecracker" (fogos azuis)
- `basePayout = symbolConfig.payouts[3] = 50`
- `finalMultiplier = 10` (grid cheio)
- `finalWinAmount = 1 * 8 * 50 * 10 = R$4000`

**Impacto:** Prêmios podem exceder MASSIVAMENTE o limite do pool.

---

### BUG 3: Feature ignora fase do pool (retention/normal/release)

**Arquivo:** `src/engine/slot-engine.ts` (linha 309)

```typescript
featureResult = this.executeFeature(config, featureConfig, bet, cpl);
// Não passa phase para a função!
```

**Problema:** A função `executeFeature()` não recebe informação sobre a fase do pool e usa configurações fixas:

```typescript
fortunetiger: {
  enabled: true,
  triggerChance: 8,          // 8% FIXO (ignora fase)
  symbolAppearChance: 35,    // 35% FIXO (ignora fase)
  fullGridMultiplier: 10,    // 10x FIXO (ignora maxMultiplier)
}
```

**Impacto:** Em modo retenção, a feature deveria:
- Ter chance muito menor de ativar (ou 0%)
- Ter menor chance de preencher o grid
- Ter multiplicador limitado

---

### BUG 4: Cálculo de payout usa índice errado

**Arquivo:** `src/engine/slot-engine.ts` (linha 321)

```typescript
const basePayout = symbolConfig?.payouts[config.cols] || selectedResult.payout;
```

**Problema:** `config.cols = 3` para Fortune Tiger, então usa `payouts[3]`:
- Para Firecracker: `payouts = [0, 0, 8, 50, 500]`
- `payouts[3] = 50` (deveria ser o payout para 4 símbolos, não para grid cheio)

O array de payouts significa:
- Index 0: não usado
- Index 1: não usado  
- Index 2: 3 símbolos iguais
- Index 3: 4 símbolos iguais
- Index 4: 5 símbolos iguais

Para grid 3x3 cheio (9 posições), deveria haver uma lógica especial, não simplesmente usar `payouts[3]`.

---

## 📊 TABELA DE IMPACTO

| Símbolo | payouts[3] | Com x10 (grid cheio) | Bet R$8 = |
|---------|------------|---------------------|-----------|
| Gold Coin | 250 | 2500x | R$20.000 |
| Red Envelope | 100 | 1000x | R$8.000 |
| Firecracker | 50 | 500x | R$4.000 |
| Orange | 25 | 250x | R$2.000 |
| A | 20 | 200x | R$1.600 |
| K | 15 | 150x | R$1.200 |
| Q | 10 | 100x | R$800 |

**Todos esses valores são possíveis mesmo com pool em RETENÇÃO com maxMultiplier=4x!**

---

## 🛠️ SOLUÇÕES PROPOSTAS

### SOLUÇÃO 1: Desabilitar Feature Completamente (RÁPIDA)

```typescript
// src/engine/slot-engine.ts
private getFeatureConfig(gameId: string): FeatureConfig {
  // DESABILITAR TODAS AS FEATURES ATÉ CORREÇÃO COMPLETA
  return {
    enabled: false,
    triggerChance: 0,
    maxRespins: 0,
    fullGridMultiplier: 1,
    symbolAppearChance: 0,
  };
}
```

**Prós:** Rápido, seguro, resolve imediatamente
**Contras:** Remove feature visual que jogadores gostam

---

### SOLUÇÃO 2: Integrar Feature com Pool (COMPLETA)

```typescript
spinPredefined(config, bet, cpl, dynamicConfig) {
  // ... sorteio normal ...
  
  // Feature só ativa SE passou no sorteio de vitória E pool permite
  if (featureConfig.enabled && isWinSpin && maxPayout >= 10) {
    // Chance de feature proporcional à fase
    let adjustedTriggerChance = featureConfig.triggerChance;
    
    if (phase === 'retention') {
      adjustedTriggerChance = 0; // NUNCA em retenção
    } else if (phase === 'normal') {
      adjustedTriggerChance = featureConfig.triggerChance * 0.5; // 50% da chance
    }
    // release: chance normal
    
    const featureRoll = this.rng.random() * 100;
    featureTriggered = featureRoll < adjustedTriggerChance;
    
    if (featureTriggered) {
      featureResult = this.executeFeature(config, featureConfig, bet, cpl, phase, maxPayout);
      
      // Limita prêmio da feature ao maxPayout do pool
      if (finalWinAmount > bet * maxPayout) {
        finalWinAmount = bet * maxPayout;
        this.logger.log(`[FEATURE] Prêmio limitado pelo pool: ${finalWinAmount}`);
      }
    }
  }
}
```

---

### SOLUÇÃO 3: Feature Respeita Pool Dinamicamente (IDEAL)

Modificar `executeFeature()` para receber e respeitar configurações do pool:

```typescript
private executeFeature(
  config: GameConfig,
  featureConfig: FeatureConfig,
  bet: number,
  cpl: number,
  phase: PoolPhase,      // NOVO
  maxPayout: number      // NOVO
): FeatureResult {
  
  // Ajusta chance de símbolo aparecer baseado na fase
  let effectiveSymbolChance = featureConfig.symbolAppearChance;
  if (phase === 'retention') {
    effectiveSymbolChance = 5; // Muito baixo - difícil preencher grid
  } else if (phase === 'normal') {
    effectiveSymbolChance = featureConfig.symbolAppearChance * 0.7;
  }
  
  // Limita multiplicador ao maxPayout do pool
  const effectiveMultiplier = Math.min(
    featureConfig.fullGridMultiplier,
    maxPayout
  );
  
  // ... resto da lógica usando effectiveSymbolChance e effectiveMultiplier ...
}
```

---

## ✅ RECOMENDAÇÃO

### Ação Imediata (HOJE):
1. **Aplicar SOLUÇÃO 1** - Desabilitar feature completamente
2. Deploy imediato para produção
3. Comunicar cliente que "feature visual temporariamente desativada para manutenção"

### Ação Médio Prazo (1-2 dias):
1. Implementar **SOLUÇÃO 2 + 3** completa
2. Testes exaustivos em staging
3. Deploy gradual em produção

---

## 📁 ARQUIVOS AFETADOS

| Arquivo | Linha | Problema |
|---------|-------|----------|
| `src/engine/slot-engine.ts` | 300-305 | Feature ignora sorteio WIN/LOSE |
| `src/engine/slot-engine.ts` | 320-322 | Feature ignora maxPayout |
| `src/engine/slot-engine.ts` | 309 | executeFeature não recebe params do pool |
| `src/engine/slot-engine.ts` | 373-396 | getFeatureConfig tem valores fixos |
| `src/engine/slot-engine.ts` | 406-515 | executeFeature não considera pool |

---

## 🎯 VALIDAÇÃO PÓS-CORREÇÃO

Após correção, validar:

1. [ ] Pool em RETENÇÃO com winChance=10%, maxMult=4x
   - Feature NUNCA deve ativar
   - Prêmios máximos = 4x aposta

2. [ ] Pool em NORMAL com winChance=35%, maxMult=30x
   - Feature ativa com chance reduzida (~4%)
   - Prêmios limitados a 30x

3. [ ] Pool em RELEASE com winChance=60%, maxMult=100x
   - Feature ativa normalmente (8%)
   - Prêmios limitados a 100x

4. [ ] Pool ZERADO (balance = 0)
   - Feature NUNCA deve ativar
   - Todos os spins devem perder

---

**Investigação realizada por:** GitHub Copilot  
**Aprovação para correção:** Aguardando
