# 🎰 Guia de Integração - Slot Engine (NhutCorp_SlotGenPHP)

> **Documento de Referência Técnica**  
> Criado após debugging extensivo do Fortune Tiger.  
> Use este guia para evitar horas de debugging em problemas já resolvidos.

---

## 📋 Índice

1. [Visão Geral do Engine](#visão-geral-do-engine)
2. [Armadilhas Críticas (LEIA PRIMEIRO!)](#armadilhas-críticas)
3. [Estrutura de Endpoints](#estrutura-de-endpoints)
4. [Formato de Respostas](#formato-de-respostas)
5. [Debugging](#debugging)
6. [Checklist de Validação](#checklist-de-validação)

---

## 🎯 Visão Geral do Engine

### O que é o NhutCorp_SlotGenPHP?

Todos os jogos Fortune (Tiger, Mouse, Ox, Rabbit, Dragon, Panda) usam o **mesmo engine Construct 3** com um plugin chamado `NhutCorp_SlotGenPHP`. Este plugin foi originalmente desenvolvido para comunicar com backends PHP/Laravel.

### Implicações

- ✅ **Uma solução serve para todos os jogos** - mesmo protocolo de API
- ✅ **Mesma estrutura de resposta JSON** - só mudam os valores
- ⚠️ **Engine é muito rígido** - qualquer desvio causa erro genérico

### Arquivos Importantes

```
game-provider/
├── public/
│   └── {gamename}/
│       ├── index.html      # Entry point do jogo
│       ├── data.json       # Configuração do jogo (API URLs, framework, etc)
│       ├── c3runtime.js    # Engine principal (NÃO MODIFICAR)
│       └── scripts/        # Assets do jogo
```

### Configuração em data.json

```json
{
  "c3": {
    "projectData": {
      "name": "fortunetiger",
      "uid": 0,
      "instances": [
        {
          "type": "NhutCorp_SlotGenPHP",
          "properties": {
            "framework": 0,        // 0 = Laravel, 1 = PHP puro
            "api": "vgames",       // Prefixo da rota
            "domain": ""           // Vazio = mesmo domínio
          }
        }
      ]
    }
  }
}
```

---

## 🚨 Armadilhas Críticas

### ⛔ ARMADILHA #1: HTTP Status DEVE ser 200

**Sintoma:** Modal "Erro" ou "njax Error Created" mesmo com JSON correto.

**Causa:** O engine verifica EXATAMENTE `if (200 === g.status)`. Qualquer outro código (201, 204, etc) é tratado como erro.

**Código problemático em c3runtime.js (linha ~6930):**
```javascript
if (200 === g.status) {
    // Processa resposta
} else {
    // ERRO - mostra modal
}
```

**Solução:**
```typescript
// ❌ ERRADO - NestJS retorna 201 por padrão em POST
return res.json({ success: true, data: {...} });

// ✅ CORRETO - Forçar status 200
return res.status(200).json({ success: true, data: {...} });
```

**Aplica-se a:** TODOS os endpoints (session, spin, icons, logs, info)

---

### ⛔ ARMADILHA #2: Endpoint /icons DEVE retornar Array

**Sintoma:** `TypeError: c.forEach is not a function`

**Causa:** O engine espera um array direto, não um objeto com array dentro.

**Código que processa em c3runtime.js (linha ~6969):**
```javascript
c.forEach(function(g) {
    // Processa cada ícone
});
```

**Solução:**
```typescript
// ❌ ERRADO - Objeto wrapper
return res.status(200).json({ 
  success: true, 
  data: { icons: [...] } 
});

// ✅ CORRETO - Array direto
return res.status(200).json([
  { id: 1, icon_name: 'scatter' },
  { id: 2, icon_name: 'wild' },
  // ...
]);
```

---

### ⛔ ARMADILHA #3: Mensagem de Erro Genérica

**Sintoma:** Modal com "Você está sem saldo, faça uma recarga pra continuar" mesmo com saldo OK.

**Causa:** O engine tem um catch-all que mostra essa mensagem para QUALQUER erro JavaScript, não apenas saldo insuficiente.

**Código em c3runtime.js:**
```javascript
} catch (g) {
    // Mostra modal "sem saldo" para QUALQUER exceção
    self.C3_("Você está sem saldo...")
}
```

**Realidade:** Esta mensagem pode significar:
- Saldo insuficiente (raro)
- JSON malformado (comum)
- Campo obrigatório faltando (muito comum)
- Tipo de dado errado (comum)
- HTTP status != 200 (muito comum)

**Debug:** Sempre verifique o console do navegador para o erro REAL.

---

### ⛔ ARMADILHA #4: Campos Obrigatórios na Resposta

**Sintoma:** Erro JavaScript genérico, jogo não atualiza saldo/resultado.

**Causa:** O engine espera campos específicos com nomes exatos.

**Campos obrigatórios no /session:**
```typescript
{
  success: true,
  data: {
    user_name: string,      // Nome do usuário
    credit: number,         // Saldo atual
    num_line: number,       // Número de linhas (ex: 5)
    bet_amount: number,     // Aposta por linha
    free_num: number,       // Spins grátis restantes
    icon_data: number[][],  // Grid inicial 3x5
    jackpot: number,        // Valor do jackpot
    jackpot_mini: number,
    jackpot_minor: number,
    jackpot_major: number,
    jackpot_grand: number
  }
}
```

**Campos obrigatórios no /spin:**
```typescript
{
  success: true,
  data: {
    credit: number,         // Saldo APÓS o spin
    free_num: number,       // Spins grátis restantes
    icon_data: number[][],  // Resultado do spin (grid 3x5)
    payline_data: any[],    // Linhas vencedoras
    total_win: number,      // Ganho total
    jackpot_win: number,    // Ganho de jackpot (0 se não ganhou)
    bonus_type: number,     // 0=normal, 1=bonus, 2=freespin
    // ... jackpots atualizados
  }
}
```

---

### ⛔ ARMADILHA #5: icon_data é Array de Arrays

**Sintoma:** Grid não renderiza ou erro de tipo.

**Causa:** O formato deve ser matriz 3x5 (3 linhas, 5 colunas).

```typescript
// ✅ CORRETO - Matriz 3x5
icon_data: [
  [1, 2, 3, 4, 5],  // Linha superior
  [2, 3, 4, 5, 1],  // Linha do meio
  [3, 4, 5, 1, 2]   // Linha inferior
]

// ❌ ERRADO - Array plano
icon_data: [1, 2, 3, 4, 5, 2, 3, 4, 5, 1, 3, 4, 5, 1, 2]
```

---

### ⛔ ARMADILHA #6: DevTools Bloqueado (F12)

**Sintoma:** Não consegue abrir console do navegador para debug.

**Causa:** O jogo detecta e bloqueia DevTools.

**Soluções:**
1. Criar página de teste separada (test-debug.html)
2. Usar extensão de browser para forçar DevTools
3. Modificar c3runtime.js (não recomendado em produção)
4. Testar endpoints via curl/Postman primeiro

---

## 📡 Estrutura de Endpoints

### Base URL
```
/api/vgames/{token}/
```

O `{token}` identifica a sessão do jogador.

### Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/session` | Inicia sessão, retorna estado inicial |
| POST | `/spin` | Executa giro, retorna resultado |
| GET | `/icons` | Lista de símbolos do jogo |
| GET | `/logs` | Histórico de jogadas |
| GET | `/info` | Informações do jogo |

### Parâmetros do /spin (form-urlencoded)

```
betamount=0.2    // Valor da aposta por linha
numline=5        // Número de linhas apostadas
cpl=1            // Créditos por linha (multiplicador)
```

⚠️ **Atenção:** O jogo envia como `application/x-www-form-urlencoded`, NÃO JSON!

---

## 📦 Formato de Respostas

### GET /session - Resposta Completa

```json
{
  "success": true,
  "data": {
    "user_name": "Player123",
    "credit": 1000.00,
    "num_line": 5,
    "bet_amount": 0.20,
    "free_num": 0,
    "icon_data": [
      [1, 2, 3, 4, 5],
      [2, 3, 4, 5, 1],
      [3, 4, 5, 1, 2]
    ],
    "jackpot": 50000,
    "jackpot_mini": 100,
    "jackpot_minor": 500,
    "jackpot_major": 2500,
    "jackpot_grand": 50000,
    "jackpot_trigger": 100,
    "auto_spin_options": [10, 25, 50, 100],
    "bet_options": [0.20, 0.50, 1.00, 2.00, 5.00]
  }
}
```

### POST /spin - Resposta Completa

```json
{
  "success": true,
  "data": {
    "credit": 999.00,
    "free_num": 0,
    "icon_data": [
      [3, 1, 2, 4, 5],
      [1, 3, 3, 3, 2],
      [2, 4, 1, 5, 3]
    ],
    "payline_data": [
      {
        "line": 1,
        "icon": 3,
        "count": 3,
        "win": 5.00,
        "positions": [[1,0], [1,1], [1,2]]
      }
    ],
    "total_win": 5.00,
    "jackpot_win": 0,
    "bonus_type": 0,
    "jackpot": 50005,
    "jackpot_mini": 100.50,
    "jackpot_minor": 502.50,
    "jackpot_major": 2512.50,
    "jackpot_grand": 50025
  }
}
```

### GET /icons - Resposta (ARRAY DIRETO!)

```json
[
  { "id": 1, "icon_name": "scatter" },
  { "id": 2, "icon_name": "wild" },
  { "id": 3, "icon_name": "tiger" },
  { "id": 4, "icon_name": "coin_gold" },
  { "id": 5, "icon_name": "coin_red" },
  { "id": 6, "icon_name": "a" },
  { "id": 7, "icon_name": "k" },
  { "id": 8, "icon_name": "q" },
  { "id": 9, "icon_name": "j" }
]
```

### GET /logs - Resposta

```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": 1,
        "timestamp": "2025-01-01T12:00:00Z",
        "bet": 1.00,
        "win": 5.00,
        "balance_after": 1004.00
      }
    ]
  }
}
```

### GET /info - Resposta

```json
{
  "success": true,
  "data": {
    "game_name": "Fortune Tiger",
    "provider": "Game Provider",
    "rtp": 96.5,
    "volatility": "medium",
    "min_bet": 0.20,
    "max_bet": 100.00,
    "max_win": 2500
  }
}
```

---

## 🔍 Debugging

### Página de Teste

Crie uma página HTML separada para testar APIs sem o jogo:

```html
<!-- public/test-debug.html -->
<!DOCTYPE html>
<html>
<head>
  <title>API Debug</title>
</head>
<body>
  <h1>Game Provider API Debug</h1>
  
  <button onclick="testSession()">Test /session</button>
  <button onclick="testSpin()">Test /spin</button>
  <button onclick="testIcons()">Test /icons</button>
  
  <pre id="output"></pre>
  
  <script>
    const TOKEN = 'test123';
    const BASE = `/api/vgames/${TOKEN}`;
    
    async function testSession() {
      const res = await fetch(`${BASE}/session`);
      document.getElementById('output').textContent = 
        `Status: ${res.status}\n\n${JSON.stringify(await res.json(), null, 2)}`;
    }
    
    async function testSpin() {
      const res = await fetch(`${BASE}/spin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'betamount=0.2&numline=5&cpl=1'
      });
      document.getElementById('output').textContent = 
        `Status: ${res.status}\n\n${JSON.stringify(await res.json(), null, 2)}`;
    }
    
    async function testIcons() {
      const res = await fetch(`${BASE}/icons`);
      document.getElementById('output').textContent = 
        `Status: ${res.status}\n\n${JSON.stringify(await res.json(), null, 2)}`;
    }
  </script>
</body>
</html>
```

### Comandos PowerShell para Teste

```powershell
# Testar /session
Invoke-WebRequest -Uri "http://localhost:3000/api/vgames/test123/session" `
  -Method Get | Select-Object StatusCode, Content

# Testar /spin
Invoke-WebRequest -Uri "http://localhost:3000/api/vgames/test123/spin" `
  -Method Post `
  -ContentType "application/x-www-form-urlencoded" `
  -Body "betamount=0.2&numline=5&cpl=1" | Select-Object StatusCode, Content

# Testar /icons
Invoke-WebRequest -Uri "http://localhost:3000/api/vgames/test123/icons" `
  -Method Get | Select-Object StatusCode, Content
```

### Middleware de Debug (NestJS)

```typescript
// main.ts
app.use((req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    console.log(`[${req.method}] ${req.url}`);
    console.log('Status:', res.statusCode);
    console.log('Response:', JSON.stringify(body, null, 2));
    return originalJson(body);
  };
  next();
});
```

---

## ✅ Checklist de Validação

Use este checklist antes de considerar um jogo "funcionando":

### Configuração
- [ ] data.json aponta para API correta
- [ ] framework = 0 (Laravel mode)
- [ ] Arquivos estáticos sendo servidos corretamente

### Endpoints
- [ ] GET /session retorna status 200
- [ ] POST /spin retorna status 200
- [ ] GET /icons retorna status 200
- [ ] GET /logs retorna status 200
- [ ] GET /info retorna status 200

### Formato de Dados
- [ ] /session tem todos os campos obrigatórios
- [ ] /spin tem todos os campos obrigatórios
- [ ] /icons retorna ARRAY direto (não objeto)
- [ ] icon_data é matriz 3x5

### Funcionalidade
- [ ] Jogo carrega sem modal de erro
- [ ] Saldo aparece corretamente
- [ ] Botão de spin funciona
- [ ] Resultado do spin aparece
- [ ] Saldo atualiza após spin
- [ ] Console do navegador sem erros

### Teste Manual
- [ ] Testado via página de debug
- [ ] Testado via PowerShell/curl
- [ ] Testado no jogo real

---

## 🎮 Jogos Compatíveis

Todos estes jogos usam o mesmo engine e protocolo:

| Jogo | Pasta | Grid | Linhas |
|------|-------|------|--------|
| Fortune Tiger | fortunetiger | 3x5 | 5 |
| Fortune Mouse | fortunemouse | 3x5 | 5 |
| Fortune Ox | fortuneox | 3x5 | 5 |
| Fortune Rabbit | fortunerabbit | 3x5 | 5 |
| Fortune Dragon | fortunedragon | 3x5 | 5 |
| Fortune Panda | fortunepanda | 3x5 | 5 |

---

## 🔧 Solução Rápida de Problemas

| Sintoma | Provável Causa | Solução |
|---------|---------------|---------|
| Modal "sem saldo" | HTTP != 200 | Usar `res.status(200).json()` |
| Modal "sem saldo" | Campo faltando | Verificar campos obrigatórios |
| `forEach is not a function` | /icons retorna objeto | Retornar array direto |
| Grid não aparece | icon_data errado | Usar matriz 3x5 |
| Saldo não atualiza | credit não retornado | Incluir `credit` no /spin |
| Jogo não carrega | data.json errado | Verificar paths e framework |

---

## 📝 Notas Finais

1. **Sempre teste endpoints isoladamente primeiro** - Não tente debugar pelo jogo
2. **Status 200 é sagrado** - Nunca esqueça de forçar o status
3. **O erro "sem saldo" mente** - Pode ser qualquer coisa
4. **Array vs Objeto** - /icons é o único que retorna array direto
5. **DevTools bloqueado** - Use página de teste separada

---

*Documento criado em: 25/11/2025*  
*Baseado em: Debug do Fortune Tiger*  
*Autor: Sessão de desenvolvimento Game Provider Engine*
