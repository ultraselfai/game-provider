import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS to allow the Bet Platform to load games in iframes
  // Configure CORS with specific origins for production
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://console.ultraself.space',
    'https://app.ultraself.space',
    'https://api.ultraself.space',
    process.env.ADMIN_URL,
    process.env.AGENT_URL,
  ].filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      // Check if origin is allowed
      if (allowedOrigins.some(allowed => origin.startsWith(allowed as string))) {
        return callback(null, true);
      }
      
      // Log blocked origins for debugging
      console.log(`[CORS] Blocked origin: ${origin}`);
      callback(null, true); // Allow all origins for now (can be restricted later)
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'x-admin-key', 'X-Admin-Key'],
  });

  // Global ValidationPipe para validar DTOs automaticamente
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,      // Remove propriedades não declaradas no DTO
    transform: true,      // Transforma tipos automaticamente
    forbidNonWhitelisted: false, // Não bloqueia props extras (apenas ignora)
  }));

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Game Provider Engine API')
    .setDescription(`
## API de Jogos B2B

Motor de jogos para plataformas de cassino online.

### Modos de Operação

- **LOCAL**: Saldo gerenciado internamente
- **REMOTE**: Saldo via webhooks do operador

### Autenticação

- **B2B API**: JWT Token via /api/v1/agent/auth
- **Admin API**: Acesso direto (dev) ou autenticado (prod)
- **Game API**: Session Token no path

### Grupos de Endpoints

- **/api/v1/agent**: API para operadores B2B
- **/api/v1/admin**: API administrativa
- **/api/vgames**: API de jogos (players)
    `)
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('B2B - Operadores', 'Endpoints para operadores B2B')
    .addTag('Admin', 'Endpoints administrativos')
    .addTag('Games', 'Endpoints para jogadores')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Game Provider API Docs',
  });

  // CRÍTICO: O frontend envia dados como application/x-www-form-urlencoded (linha 6935 de c3runtime.js)
  // Por padrão, NestJS só parseia JSON. Sem isso, o @Body() fica vazio no endpoint /spin
  // Usando o body parser integrado do Express através do NestJS
  app.useBodyParser('urlencoded', { extended: true });
  app.useBodyParser('json');

  // MIDDLEWARE DE DEBUG - Log de todas as requests da API
  app.use('/api', (req: Request, res: Response, next: NextFunction) => {
    console.log('\n========== API REQUEST ==========');
    console.log(`[${new Date().toISOString()}]`);
    console.log(`${req.method} ${req.originalUrl}`);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    if (req.body && Object.keys(req.body).length > 0) {
      console.log('Body:', JSON.stringify(req.body, null, 2));
    }

    // Interceptar a resposta
    const originalSend = res.send;
    res.send = function(body: any) {
      console.log('\n---------- API RESPONSE ----------');
      console.log(`Status: ${res.statusCode}`);
      try {
        const parsed = JSON.parse(body);
        console.log('Response (parsed):', JSON.stringify(parsed, null, 2).substring(0, 1000) + '...');
      } catch {
        console.log('Response (raw):', String(body).substring(0, 500));
      }
      console.log('==================================\n');
      return originalSend.call(this, body);
    };

    next();
  });

  // Escutar em todas as interfaces para garantir acesso via localhost
  await app.listen(3006, '0.0.0.0');
  console.log(`\n🎮 Game Provider Engine is running on: http://localhost:3006`);
  console.log(`📚 API Documentation (Swagger): http://localhost:3006/api/docs`);
  console.log(`📁 Static Assets serving at: http://localhost:3006/originals`);
  console.log(`🧪 Test page: http://localhost:3006/test-debug.html`);
  console.log(`🐯 Test game: http://localhost:3006/test-game.html\n`);
}
bootstrap();
