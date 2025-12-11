import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { GameSettingsService } from './game-settings.service';
import {
  SessionsQueryDto,
  TransactionsQueryDto,
  RoundsQueryDto,
  UpdateOperatorDto,
  UpdateGameSettingsDto,
} from './dto/admin.dto';

@ApiTags('Admin')
@Controller('api/v1/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly gameSettingsService: GameSettingsService,
  ) {}

  // =============================
  // Dashboard
  // =============================
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Dashboard Stats',
    description: 'Retorna estatísticas do dashboard: operadores, sessões, rounds, GGR, etc.'
  })
  @ApiResponse({ status: 200, description: 'Estatísticas retornadas com sucesso' })
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  // =============================
  // Sessions
  // =============================
  @Get('sessions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar Sessões',
    description: 'Lista sessões de jogo com filtros e paginação.'
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: ['active', 'expired'] })
  @ApiQuery({ name: 'operatorId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Lista de sessões' })
  async getSessions(@Query() query: SessionsQueryDto) {
    return this.adminService.getSessions(query);
  }

  @Get('sessions/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Detalhes da Sessão' })
  @ApiParam({ name: 'id', description: 'ID da sessão' })
  @ApiResponse({ status: 200, description: 'Sessão encontrada' })
  @ApiResponse({ status: 404, description: 'Sessão não encontrada' })
  async getSessionById(@Param('id') id: string) {
    const session = await this.adminService.getSessionById(id);
    if (!session) {
      throw new NotFoundException('Session not found');
    }
    return session;
  }

  // =============================
  // Transactions
  // =============================
  @Get('transactions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar Transações',
    description: 'Lista transações (apostas, ganhos, estornos) com filtros.'
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'type', required: false, enum: ['bet', 'win', 'refund'] })
  @ApiQuery({ name: 'operatorId', required: false, type: String })
  @ApiQuery({ name: 'userId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Lista de transações' })
  async getTransactions(@Query() query: TransactionsQueryDto) {
    return this.adminService.getTransactions(query);
  }

  // =============================
  // Game Rounds
  // =============================
  @Get('rounds')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar Rounds',
    description: 'Lista rounds de jogo (spins) com filtros.'
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'gameId', required: false, type: String })
  @ApiQuery({ name: 'operatorId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Lista de rounds' })
  async getRounds(@Query() query: RoundsQueryDto) {
    return this.adminService.getRounds(query);
  }

  // =============================
  // Operators Management
  // =============================
  @Get('operators')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar Operadores',
    description: 'Lista todos os operadores com suas estatísticas.'
  })
  @ApiResponse({ status: 200, description: 'Lista de operadores' })
  async getOperators() {
    return this.adminService.getOperators();
  }

  @Get('operators/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Detalhes do Operador' })
  @ApiParam({ name: 'id', description: 'ID do operador' })
  @ApiResponse({ status: 200, description: 'Operador encontrado' })
  @ApiResponse({ status: 404, description: 'Operador não encontrado' })
  async getOperatorById(@Param('id') id: string) {
    const operator = await this.adminService.getOperatorById(id);
    if (!operator) {
      throw new NotFoundException('Operator not found');
    }
    return operator;
  }

  @Put('operators/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Atualizar Operador',
    description: 'Atualiza dados de um operador (nome, status, webhooks).'
  })
  @ApiParam({ name: 'id', description: 'ID do operador' })
  @ApiResponse({ status: 200, description: 'Operador atualizado' })
  @ApiResponse({ status: 404, description: 'Operador não encontrado' })
  async updateOperator(@Param('id') id: string, @Body() dto: UpdateOperatorDto) {
    const operator = await this.adminService.updateOperator(id, dto);
    if (!operator) {
      throw new NotFoundException('Operator not found');
    }
    return operator;
  }

  @Post('operators/:id/regenerate-key')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Regenerar API Key',
    description: 'Gera nova API Key para o operador. A key antiga será invalidada!'
  })
  @ApiParam({ name: 'id', description: 'ID do operador' })
  @ApiResponse({ status: 200, description: 'Nova API Key gerada' })
  @ApiResponse({ status: 404, description: 'Operador não encontrado' })
  async regenerateApiKey(@Param('id') id: string) {
    const result = await this.adminService.regenerateApiKey(id);
    if (!result) {
      throw new NotFoundException('Operator not found');
    }
    return result;
  }

  // =============================
  // Games Management
  // =============================
  @Get('games')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar Jogos',
    description: 'Lista todos os jogos com suas configurações.'
  })
  @ApiResponse({ status: 200, description: 'Lista de jogos' })
  async getGames() {
    return this.gameSettingsService.getAllGames();
  }

  @Get('games/:gameCode')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Detalhes do Jogo' })
  @ApiParam({ name: 'gameCode', description: 'Código do jogo (ex: fortunetiger)' })
  @ApiResponse({ status: 200, description: 'Jogo encontrado' })
  @ApiResponse({ status: 404, description: 'Jogo não encontrado' })
  async getGameByCode(@Param('gameCode') gameCode: string) {
    const game = await this.gameSettingsService.getGameByCode(gameCode);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return game;
  }

  @Put('games/:gameCode')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Atualizar Configurações do Jogo',
    description: 'Atualiza configurações de um jogo (RTP, apostas min/max, etc.). Alterações refletem imediatamente no jogo.'
  })
  @ApiParam({ name: 'gameCode', description: 'Código do jogo (ex: fortunetiger)' })
  @ApiResponse({ status: 200, description: 'Jogo atualizado' })
  @ApiResponse({ status: 404, description: 'Jogo não encontrado' })
  async updateGame(@Param('gameCode') gameCode: string, @Body() dto: UpdateGameSettingsDto) {
    // Converte strings de data para Date objects
    const updates: any = { ...dto };
    if (dto.promoStart) updates.promoStart = new Date(dto.promoStart);
    if (dto.promoEnd) updates.promoEnd = new Date(dto.promoEnd);
    
    const game = await this.gameSettingsService.updateGame(gameCode, updates);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return game;
  }

  @Post('games/sync')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Sincronizar Jogos',
    description: 'Sincroniza configurações dos jogos do código para o banco de dados.'
  })
  @ApiResponse({ status: 200, description: 'Jogos sincronizados' })
  async syncGames() {
    await this.gameSettingsService.syncGamesFromConfig();
    return { success: true, message: 'Games synchronized successfully' };
  }
}
