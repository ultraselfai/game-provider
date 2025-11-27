# 🎰 Game Provider Engine

**Motor de jogos B2B em NestJS** para plataformas de cassino online. Arquitetura robusta com integração via webhooks, suporte a múltiplos operadores e painel administrativo.

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)](https://redis.io/)

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Arquitetura](#-arquitetura)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
- [Integração B2B](#-integração-b2b)
- [Admin Panel](#-admin-panel)
- [Configuração de Jogos](#-configuração-de-jogos)
- [Testes](#-testes)
- [Deploy](#-deploy)

---

## 🎯 Visão Geral

### Funcionalidades

- ✅ **Motor de Slots Universal** - Suporta qualquer configuração de slot
- ✅ **RNG Certificável** - Mersenne Twister com seed auditável
- ✅ **API B2B Completa** - Autenticação, sessões, webhooks
- ✅ **Dois Modos de Operação** - LOCAL (DB) ou REMOTE (webhooks)
- ✅ **Admin Panel** - Dashboard com métricas em tempo real
- ✅ **Multi-operador** - Cada operador isolado com suas credenciais
- ✅ **RTP Configurável** - Ajuste por jogo e operador
- ✅ **Auditoria Completa** - Logs de todas as transações

### Jogos Incluídos

| Jogo | Código | RTP | Volatilidade |
|------|--------|-----|--------------|
| Fortune Tiger | `fortune-tiger` | 96.5% | Média |
| Fortune Ox | `fortune-ox` | 96.2% | Alta |
| Fortune Rabbit | `fortune-rabbit` | 96.8% | Média |
| Fortune Dragon | `fortune-dragon` | 96.0% | Alta |
| Fortune Mouse | `fortune-mouse` | 96.3% | Baixa |

---

## 🏗 Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                    GAME PROVIDER ENGINE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Operador  │    │   Operador  │    │   Operador  │         │
│  │   (Bet A)   │    │   (Bet B)   │    │   (Bet C)   │         │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘         │
│         │                  │                  │                 │
│         └──────────────────┼──────────────────┘                 │
│                            │                                    │
│                    ┌───────▼───────┐                           │
│                    │  B2B API      │                           │
│                    │  /api/v1/agent│                           │
│                    └───────┬───────┘                           │
│                            │                                    │
│  ┌─────────────────────────┼─────────────────────────┐         │
│  │                         │                          │         │
│  │  ┌──────────┐   ┌───────▼───────┐   ┌──────────┐ │         │
│  │  │  Redis   │◄──│  Game API     │──►│PostgreSQL│ │         │
│  │  │ (Cache)  │   │/api/vgames/*  │   │  (Data)  │ │         │
│  │  └──────────┘   └───────┬───────┘   └──────────┘ │         │
│  │                         │                          │         │
│  │                 ┌───────▼───────┐                 │         │
│  │                 │  Slot Engine  │                 │         │
│  │                 │   + RNG       │                 │         │
│  │                 └───────────────┘                 │         │
│  └───────────────────────────────────────────────────┘         │
│                            │                                    │
│                    ┌───────▼───────┐                           │
│                    │   Webhooks    │──► Operador (DEBIT/CREDIT)│
│                    └───────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

### Portas

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| Backend NestJS | 3006 | API Principal |
| Admin Panel | 3001 | Painel Administrativo |
| PostgreSQL | 5432 | Banco de Dados |
| Redis | 6379 | Cache de Sessões |

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 20+
- Docker & Docker Compose
- npm ou yarn

### 1. Subir Infraestrutura (PostgreSQL + Redis)

```bash
cd game-provider
docker compose up -d postgres redis
```

Verificar se estão healthy:
```bash
docker compose ps
```

### 2. Configurar Ambiente

```bash
cp .env.example .env
# Editar .env se necessário (padrões funcionam para dev)
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Iniciar Servidor

```bash
# Development (com hot reload)
npm run start:dev

# Production
npm run build
npm run start:prod
```

### 5. Testar

- **Health Check**: http://localhost:3000/health
- **Fortune Tiger**: http://localhost:3000/test-game.html
- **Debug Page**: http://localhost:3000/test-debug.html

---

## 📦 Estrutura do Projeto

```
game-provider/
├── docker/
│   └── postgres/
│       └── init.sql          # Schema inicial do banco
├── public/
│   └── fortunetiger/         # Assets do jogo
├── src/
│   ├── database/
│   │   ├── entities/         # TypeORM entities
│   │   └── database.module.ts
│   ├── engine/
│   │   ├── slot-engine.ts    # Motor universal de slots
│   │   ├── rng.service.ts    # Mersenne Twister RNG
│   │   └── types.ts          # TypeScript types
│   ├── games/
│   │   ├── configs/          # Configurações de cada jogo
│   │   └── games.controller.ts
│   ├── health/
│   │   └── health.controller.ts
│   ├── redis/
│   │   ├── redis.service.ts  # Cache e sessões
│   │   └── redis.module.ts
│   └── app.module.ts
├── docker-compose.yml
├── Dockerfile
├── .env.example
└── package.json
```

---

## 🐳 Docker Commands

```bash
# Subir apenas banco e Redis
docker compose up -d postgres redis

# Subir tudo (incluindo API containerizada)
docker compose up -d

# Com ferramentas de admin (pgAdmin + Redis Commander)
docker compose --profile tools up -d

# Ver logs
docker compose logs -f game-provider

# Parar tudo
docker compose down

# Parar e remover volumes (CUIDADO: apaga dados!)
docker compose down -v
```

### Portas

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| API | 3000 | Game Provider |
| PostgreSQL | 5432 | Banco de dados |
| Redis | 6379 | Cache |
| pgAdmin | 5050 | UI do PostgreSQL (--profile tools) |
| Redis Commander | 8081 | UI do Redis (--profile tools) |

---

## 🎰 Adicionando Novos Jogos

1. Criar config em `src/games/configs/`:

```typescript
// src/games/configs/mygame.config.ts
import { GameConfig } from '../../engine/types';

export const myGameConfig: GameConfig = {
  id: 'mygame',
  name: 'My Game',
  rows: 3,
  cols: 5,
  symbols: [
    { id: 1, name: 'wild', isWild: true, multiplier: 50 },
    // ...
  ],
  paylines: [
    [1, 1, 1, 1, 1], // linha 1
    // ...
  ],
  rtp: 96.5,
  predefinedResults: {
    wins: [...],
    losses: [...],
  },
};
```

2. Registrar no `src/games/configs/index.ts`:

```typescript
import { myGameConfig } from './mygame.config';

export const GAME_CONFIGS: Record<string, GameConfig> = {
  fortunetiger: fortuneTigerConfig,
  mygame: myGameConfig, // novo jogo
};
```

3. Copiar assets para `public/mygame/`

---

## 📊 Banco de Dados

### Tabelas

- **operators**: Operadores B2B que integram
- **game_sessions**: Sessões de jogo dos players
- **game_rounds**: Cada spin/rodada individual
- **transactions**: Débitos e créditos

### Views

- **player_stats**: Estatísticas por jogador
- **operator_metrics**: Métricas por operador

---

## 🔧 Variáveis de Ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| NODE_ENV | development | Ambiente |
| PORT | 3000 | Porta da API |
| DB_HOST | localhost | Host do PostgreSQL |
| DB_PORT | 5432 | Porta do PostgreSQL |
| DB_USER | gameadmin | Usuário do banco |
| DB_PASSWORD | gamepass123 | Senha do banco |
| DB_NAME | game_provider | Nome do banco |
| REDIS_HOST | localhost | Host do Redis |
| REDIS_PORT | 6379 | Porta do Redis |
| REDIS_PASSWORD | redispass123 | Senha do Redis |
| JWT_SECRET | (change me) | Secret para JWT |
| WEBHOOK_SECRET | (change me) | Secret para webhooks |

---

## 🚀 Deploy na VPS

1. Copiar arquivos para a VPS
2. Ajustar `.env` com senhas seguras
3. Executar:

```bash
# Build e subir em produção
docker compose up -d --build
```

Para produção, considere:
- Nginx como reverse proxy
- SSL/TLS com Let's Encrypt
- Firewall (apenas porta 443 exposta)
- Backup automático do PostgreSQL

---

## 📝 Licença

Proprietário - Todos os direitos reservados.
