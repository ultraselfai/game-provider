# ============================================
# Stage 1: Base
# ============================================
FROM node:20-alpine AS base

WORKDIR /app

# Instalar dependências do sistema
RUN apk add --no-cache dumb-init

# Copiar arquivos de dependências
COPY package*.json ./

# ============================================
# Stage 2: Development
# ============================================
FROM base AS development

# Instalar todas as dependências (incluindo devDependencies)
RUN npm ci

# Copiar código fonte
COPY . .

# Expor porta
EXPOSE 3000

# Comando para desenvolvimento com hot reload
CMD ["npm", "run", "start:dev"]

# ============================================
# Stage 3: Build
# ============================================
FROM base AS build

# Forçar instalação de todas as dependências (incluindo devDependencies)
ENV NODE_ENV=development
RUN npm ci --include=dev

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Remover devDependencies para produção
RUN npm prune --production

# ============================================
# Stage 4: Production
# ============================================
FROM node:20-alpine AS production

WORKDIR /app

# Instalar dumb-init para gerenciamento de processos
RUN apk add --no-cache dumb-init

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Copiar arquivos necessários do stage de build
COPY --from=build --chown=nestjs:nodejs /app/dist ./dist
COPY --from=build --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nestjs:nodejs /app/package*.json ./
COPY --from=build --chown=nestjs:nodejs /app/public ./public

# Usar usuário não-root
USER nestjs

# Expor porta
EXPOSE 3006

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3006/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Usar dumb-init para gerenciar sinais corretamente
ENTRYPOINT ["dumb-init", "--"]

# Comando para produção
CMD ["node", "dist/main.js"]
