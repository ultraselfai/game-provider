# 📘 Guia de Integração B2B

Este guia detalha como integrar sua plataforma de apostas com o Game Provider Engine.

---

## 📋 Índice

1. [Visão Geral](#1-visão-geral)
2. [Registro de Operador](#2-registro-de-operador)
3. [Autenticação](#3-autenticação)
4. [Criando Sessões de Jogo](#4-criando-sessões-de-jogo)
5. [Webhooks](#5-webhooks)
6. [Fluxo Completo](#6-fluxo-completo)
7. [Tratamento de Erros](#7-tratamento-de-erros)
8. [Exemplos de Código](#8-exemplos-de-código)

---

## 1. Visão Geral

### Modos de Operação

O Game Provider suporta dois modos de operação:

#### Modo LOCAL (Padrão)
- O saldo do jogador é gerenciado internamente
- Simples para testes e desenvolvimento
- Sem necessidade de webhooks

#### Modo REMOTE (Produção)
- O saldo é gerenciado pela sua plataforma
- Requer implementação de webhooks
- Recomendado para produção

### URLs Base

| Ambiente | URL |
|----------|-----|
| Desenvolvimento | `http://localhost:3006` |
| Produção | `https://games.seudominio.com` |

---

## 2. Registro de Operador

### Via Admin Panel

1. Acesse http://localhost:3001
2. Login com credenciais de admin
3. Vá em **Operadores** > **Novo Operador**
4. Preencha:
   - Nome do operador
   - Webhook URL (para modo REMOTE)
5. **IMPORTANTE**: Salve o `apiSecret` exibido - ele não será mostrado novamente!

### Via API (Admin)

```http
POST /api/v1/agent/operators
x-admin-key: dev-admin-key
Content-Type: application/json

{
  "name": "MinhaBet",
  "webhookUrl": "https://minhaplatforma.com/webhook",
  "balanceCallbackUrl": "https://minhaplatforma.com/balance"
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-do-operador",
    "name": "MinhaBet",
    "apiKey": "gp_AbCdEfGhIjKlMnOpQrStUvWx",
    "apiSecret": "secret_XyZaBcDeFgHiJkLmNoP"
  }
}
```

---

## 3. Autenticação

Todas as chamadas à API B2B requerem um token JWT.

### Obter Token

```http
POST /api/v1/agent/auth
Content-Type: application/json

{
  "apiKey": "gp_AbCdEfGhIjKlMnOpQrStUvWx",
  "apiSecret": "secret_XyZaBcDeFgHiJkLmNoP"
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 86400
  }
}
```

### Usar Token

Inclua o token em todas as requisições subsequentes:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## 4. Criando Sessões de Jogo

Quando um jogador clica para jogar, sua plataforma deve criar uma sessão:

```http
POST /api/v1/agent/sessions
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "player-123",
  "gameId": "fortune-tiger",
  "currency": "BRL",
  "balance": 1000.00,
  "language": "pt-BR",
  "returnUrl": "https://minhaplatforma.com/lobby"
}
```

**Parâmetros:**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| userId | string | ✅ | ID único do jogador na sua plataforma |
| gameId | string | ✅ | Código do jogo (ex: `fortune-tiger`) |
| currency | string | ✅ | Moeda (BRL, USD, EUR) |
| balance | number | ❌ | Saldo inicial (modo LOCAL) |
| language | string | ❌ | Idioma do jogo |
| returnUrl | string | ❌ | URL para voltar ao lobby |

**Resposta:**
```json
{
  "success": true,
  "data": {
    "sessionToken": "sess_AbCdEfGh...",
    "gameUrl": "http://localhost:3006/fortune-tiger/?token=sess_AbCdEfGh...",
    "expiresAt": "2024-01-15T12:00:00Z"
  }
}
```

### Exibir o Jogo

Use a `gameUrl` retornada em um iframe:

```html
<iframe 
  src="http://localhost:3006/fortune-tiger/?token=sess_AbCdEfGh..."
  width="100%" 
  height="600"
  frameborder="0"
></iframe>
```

---

## 5. Webhooks

No modo REMOTE, o Game Provider chama webhooks da sua plataforma para gerenciar saldos.

### 5.1 Webhook de Aposta (DEBIT)

Chamado ANTES de processar cada spin.

**Requisição do Game Provider:**
```http
POST https://minhaplatforma.com/webhook
Content-Type: application/json
x-webhook-secret: seu-webhook-secret

{
  "type": "DEBIT",
  "transactionId": "tx-uuid-12345",
  "playerId": "player-123",
  "amount": 2.50,
  "currency": "BRL",
  "gameCode": "fortune-tiger",
  "roundId": "round-uuid-67890",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Sua Resposta (Sucesso):**
```json
{
  "success": true,
  "transactionId": "minha-tx-001",
  "balance": 997.50
}
```

**Sua Resposta (Saldo Insuficiente):**
```json
{
  "success": false,
  "error": "INSUFFICIENT_FUNDS",
  "balance": 1.00
}
```

### 5.2 Webhook de Ganho (CREDIT)

Chamado quando há ganho no spin.

**Requisição:**
```json
{
  "type": "CREDIT",
  "transactionId": "tx-uuid-12346",
  "playerId": "player-123",
  "amount": 25.00,
  "currency": "BRL",
  "gameCode": "fortune-tiger",
  "roundId": "round-uuid-67890",
  "timestamp": "2024-01-15T10:30:01.000Z"
}
```

**Sua Resposta:**
```json
{
  "success": true,
  "transactionId": "minha-tx-002",
  "balance": 1022.50
}
```

### 5.3 Webhook de Saldo (BALANCE)

Chamado ao iniciar a sessão para obter o saldo atual.

**Requisição:**
```http
POST https://minhaplatforma.com/balance
Content-Type: application/json

{
  "playerId": "player-123",
  "currency": "BRL",
  "timestamp": "2024-01-15T10:29:00.000Z"
}
```

**Sua Resposta:**
```json
{
  "success": true,
  "credit": 1000.00
}
```

---

## 6. Fluxo Completo

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Jogador    │     │ Sua Plataforma│     │Game Provider │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │
       │ Clica "Jogar"      │                    │
       │───────────────────>│                    │
       │                    │                    │
       │                    │ POST /sessions     │
       │                    │───────────────────>│
       │                    │                    │
       │                    │   { sessionToken } │
       │                    │<───────────────────│
       │                    │                    │
       │   Iframe com jogo  │                    │
       │<───────────────────│                    │
       │                    │                    │
       │   Clica "Spin"     │                    │
       │────────────────────┼───────────────────>│
       │                    │                    │
       │                    │   DEBIT webhook    │
       │                    │<───────────────────│
       │                    │                    │
       │                    │   { success, bal } │
       │                    │───────────────────>│
       │                    │                    │
       │                    │   CREDIT webhook   │
       │                    │<───────────────────│
       │                    │                    │
       │  Resultado do spin │                    │
       │<───────────────────┼────────────────────│
       │                    │                    │
```

---

## 7. Tratamento de Erros

### Códigos de Erro

| Código | Descrição |
|--------|-----------|
| `INSUFFICIENT_FUNDS` | Saldo insuficiente para aposta |
| `INVALID_SESSION` | Sessão expirada ou inválida |
| `INVALID_BET` | Valor de aposta inválido |
| `GAME_NOT_FOUND` | Jogo não existe |
| `WEBHOOK_ERROR` | Falha na comunicação com webhook |
| `DUPLICATE_TRANSACTION` | Transação já processada |

### Idempotência

Use o `transactionId` para garantir idempotência. Se receber uma transação duplicada, retorne a mesma resposta anterior sem processar novamente.

### Timeout e Retry

- Timeout de webhook: 10 segundos
- Retries: 3 tentativas com backoff exponencial
- Se todas falharem, o spin é cancelado e saldo é estornado

---

## 8. Exemplos de Código

### PHP - Webhook Handler

```php
<?php
// webhook.php

header('Content-Type: application/json');

// Verificar secret
$secret = $_SERVER['HTTP_X_WEBHOOK_SECRET'] ?? '';
if ($secret !== 'seu-webhook-secret') {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid secret']);
    exit;
}

$payload = json_decode(file_get_contents('php://input'), true);

// Verificar duplicata (idempotência)
$existingTx = findTransaction($payload['transactionId']);
if ($existingTx) {
    echo json_encode([
        'success' => true,
        'transactionId' => $existingTx['id'],
        'balance' => getPlayerBalance($payload['playerId'])
    ]);
    exit;
}

switch ($payload['type']) {
    case 'DEBIT':
        $player = getPlayer($payload['playerId']);
        
        if ($player['balance'] < $payload['amount']) {
            echo json_encode([
                'success' => false,
                'error' => 'INSUFFICIENT_FUNDS',
                'balance' => $player['balance']
            ]);
            exit;
        }
        
        // Debitar saldo
        $newBalance = $player['balance'] - $payload['amount'];
        updatePlayerBalance($payload['playerId'], $newBalance);
        
        // Registrar transação
        $txId = createTransaction([
            'external_id' => $payload['transactionId'],
            'player_id' => $payload['playerId'],
            'type' => 'debit',
            'amount' => $payload['amount'],
            'game' => $payload['gameCode'],
            'round_id' => $payload['roundId']
        ]);
        
        echo json_encode([
            'success' => true,
            'transactionId' => $txId,
            'balance' => $newBalance
        ]);
        break;
        
    case 'CREDIT':
        $player = getPlayer($payload['playerId']);
        $newBalance = $player['balance'] + $payload['amount'];
        updatePlayerBalance($payload['playerId'], $newBalance);
        
        $txId = createTransaction([
            'external_id' => $payload['transactionId'],
            'player_id' => $payload['playerId'],
            'type' => 'credit',
            'amount' => $payload['amount'],
            'game' => $payload['gameCode'],
            'round_id' => $payload['roundId']
        ]);
        
        echo json_encode([
            'success' => true,
            'transactionId' => $txId,
            'balance' => $newBalance
        ]);
        break;
}
```

### Node.js - Cliente de Integração

```javascript
// game-provider-client.js

const axios = require('axios');

class GameProviderClient {
  constructor(apiKey, apiSecret, baseUrl = 'http://localhost:3006') {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.baseUrl = baseUrl;
    this.token = null;
  }

  async authenticate() {
    const response = await axios.post(`${this.baseUrl}/api/v1/agent/auth`, {
      apiKey: this.apiKey,
      apiSecret: this.apiSecret
    });
    this.token = response.data.data.token;
    return this.token;
  }

  async createSession(userId, gameId, currency, balance = null) {
    if (!this.token) await this.authenticate();
    
    const response = await axios.post(
      `${this.baseUrl}/api/v1/agent/sessions`,
      {
        userId,
        gameId,
        currency,
        balance
      },
      {
        headers: { Authorization: `Bearer ${this.token}` }
      }
    );
    
    return response.data.data;
  }
}

// Uso
const client = new GameProviderClient(
  'gp_AbCdEfGh...',
  'secret_XyZaBcDe...'
);

const session = await client.createSession('player-123', 'fortune-tiger', 'BRL', 1000);
console.log('Game URL:', session.gameUrl);
```

### Laravel - Middleware de Webhook

```php
<?php
// app/Http/Middleware/ValidateGameProviderWebhook.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ValidateGameProviderWebhook
{
    public function handle(Request $request, Closure $next)
    {
        $secret = $request->header('x-webhook-secret');
        
        if ($secret !== config('services.game_provider.webhook_secret')) {
            return response()->json(['error' => 'Invalid secret'], 401);
        }
        
        return $next($request);
    }
}
```

---

## 🔒 Segurança

### Checklist

- [ ] Armazenar `apiSecret` de forma segura (variáveis de ambiente)
- [ ] Validar `x-webhook-secret` em todos os webhooks
- [ ] Implementar idempotência por `transactionId`
- [ ] Usar HTTPS em produção
- [ ] Implementar rate limiting
- [ ] Validar `playerId` contra sua base de usuários
- [ ] Logar todas as transações para auditoria

---

## 📞 Suporte

- **Documentação**: README.md
- **Email**: suporte@gameprovider.com
- **Status**: https://status.gameprovider.com
