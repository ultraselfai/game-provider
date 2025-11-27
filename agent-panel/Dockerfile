# ============================================
# Agent Panel - Production Dockerfile
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar TODAS as dependências (incluindo devDependencies para build)
RUN npm ci --include=dev

# Copiar código fonte
COPY . .

# Definir variável de ambiente da API
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build da aplicação Next.js
RUN npm run build

# ============================================
# Production Stage
# ============================================
FROM node:20-alpine AS runner

WORKDIR /app

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copiar arquivos necessários do build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copiar public se existir (pode estar vazio)
COPY --from=builder /app/public ./public

# Ajustar permissões
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expor porta
EXPOSE 3002

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3002
ENV HOSTNAME="0.0.0.0"

# Comando para produção
CMD ["node", "server.js"]
