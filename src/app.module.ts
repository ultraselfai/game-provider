import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggerMiddleware } from './logger.middleware';
import { DatabaseModule } from './database';
import { RedisModule } from './redis';
import { HealthModule } from './health/health.module';
import { AgentModule } from './agent/agent.module';
import { WebhookModule } from './webhook';
import { AdminModule } from './admin/admin.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    // Configuração de variáveis de ambiente
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Banco de dados PostgreSQL
    DatabaseModule,
    // Cache Redis
    RedisModule,
    // Health check
    HealthModule,
    // B2B Agent API
    AgentModule,
    // Webhooks para callbacks de operadores
    WebhookModule,
    // Admin Panel API
    AdminModule,
    // Games Module
    GamesModule,
    // Static files - serve from project root/public
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      serveRoot: '/originals', // Serve files under http://localhost:3000/originals
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      serveRoot: '/', // Also serve from root
      exclude: ['/api*'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
