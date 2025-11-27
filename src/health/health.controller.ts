import { Controller, Get } from '@nestjs/common';
import { RedisService } from '../redis';

@Controller('health')
export class HealthController {
  constructor(private readonly redisService: RedisService) {}

  @Get()
  async check() {
    const redisConnected = this.redisService.isConnected();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        redis: redisConnected ? 'connected' : 'disconnected',
        database: 'connected', // TypeORM vai falhar no boot se não conectar
      },
    };
  }
}
