# ============================================
# Game Provider API - Production Dockerfile
# ============================================
FROM node:20-alpine

WORKDIR /app

# Instalar dumb-init para gerenciamento de processos
RUN apk add --no-cache dumb-init

# Copiar arquivos de dependências
COPY package*.json ./

# CRITICO: Instalar TODAS as dependencias (dev + prod) para build
# Ignorar qualquer NODE_ENV que venha do ambiente externo
RUN npm ci --include=dev

# Copiar codigo fonte
COPY . .

# Build da aplicacao NestJS
RUN npm run build

# Verificar que o build foi criado
RUN ls -la dist/ && ls -la dist/main.js

# Remover devDependencies apos o build para reduzir tamanho da imagem
RUN npm prune --omit=dev

# Criar usuario nao-root para seguranca
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app

# Usar usuario nao-root
USER nestjs

# Expor porta
EXPOSE 3006

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3006/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Usar dumb-init para gerenciar sinais corretamente
ENTRYPOINT ["dumb-init", "--"]

# Variaveis de ambiente padrao
ENV NODE_ENV=production
ENV PORT=3006

# Comando para producao
CMD ["node", "dist/main.js"]
