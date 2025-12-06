import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiHeader, ApiParam } from '@nestjs/swagger';
import { AgentService } from './agent.service';
import { AgentAuthDto, AgentLoginDto, CreateSessionDto } from './dto/agent.dto';

@ApiTags('B2B - Agentes')
@Controller('api/v1/agent')
export class AgentController {
  private readonly logger = new Logger(AgentController.name);

  constructor(private readonly agentService: AgentService) {}

  // =============================================
  // AUTENTICAÇÃO B2B (API Key + Secret)
  // =============================================

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Autenticar Agente via API',
    description: 'Autentica um agente usando API Key e Secret, retornando um token para uso nas outras APIs.'
  })
  async authenticate(@Body() dto: AgentAuthDto) {
    this.logger.log('[B2B] Authentication request');
    const result = await this.agentService.authenticate(dto);
    return { success: true, data: result };
  }

  // =============================================
  // LOGIN DO AGENTE (Email + Senha)
  // =============================================

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login do Agente',
    description: 'Login usando email e senha. Retorna token e dados do agente.'
  })
  async login(@Body() body: { email: string; password: string }) {
    this.logger.log(`[Agent Login] ${body.email}`);
    const result = await this.agentService.loginWithPassword(body.email, body.password);
    return { success: true, data: result };
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Perfil do Agente',
    description: 'Retorna os dados do agente autenticado.'
  })
  async getProfile(@Headers('authorization') authHeader: string) {
    const accessToken = this.extractBearerToken(authHeader);
    const { operatorId } = await this.agentService.validateToken(accessToken);
    const agent = await this.agentService.getAgentById(operatorId);
    if (!agent) throw new NotFoundException('Agent not found');
    return { success: true, data: agent };
  }

  @Put('profile')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar Perfil do Agente',
    description: 'Atualiza dados do agente autenticado (webhooks, etc).'
  })
  async updateProfile(
    @Headers('authorization') authHeader: string,
    @Body() body: {
      webhookUrl?: string;
      balanceCallbackUrl?: string;
      debitCallbackUrl?: string;
      creditCallbackUrl?: string;
    },
  ) {
    const accessToken = this.extractBearerToken(authHeader);
    const { operatorId } = await this.agentService.validateToken(accessToken);
    
    const agent = await this.agentService.updateAgent(operatorId, {
      webhookUrl: body.webhookUrl,
      balanceCallbackUrl: body.balanceCallbackUrl,
      debitCallbackUrl: body.debitCallbackUrl,
      creditCallbackUrl: body.creditCallbackUrl,
    });
    
    if (!agent) throw new NotFoundException('Agent not found');
    
    this.logger.log(`[Agent] Profile updated for ${agent.name}`);
    return { success: true, data: agent };
  }

  @Put('password')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Alterar Senha do Agente',
    description: 'Permite ao agente alterar sua própria senha.'
  })
  async changePassword(
    @Headers('authorization') authHeader: string,
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    const accessToken = this.extractBearerToken(authHeader);
    const { operatorId } = await this.agentService.validateToken(accessToken);
    
    await this.agentService.changePassword(operatorId, body.currentPassword, body.newPassword);
    
    this.logger.log(`[Agent] Password changed for agent ${operatorId}`);
    return { success: true, message: 'Senha alterada com sucesso' };
  }

  @Get('transactions')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Transações do Agente',
    description: 'Retorna o histórico de transações do agente autenticado.'
  })
  async getMyTransactions(@Headers('authorization') authHeader: string) {
    const accessToken = this.extractBearerToken(authHeader);
    const { operatorId } = await this.agentService.validateToken(accessToken);
    const transactions = await this.agentService.getAgentTransactions(operatorId);
    
    // Mapeia os tipos para o formato esperado pelo frontend
    const mappedTransactions = transactions.map(tx => ({
      id: tx.id,
      type: tx.type === 'credit_addition' ? 'credit' : 'debit',
      amount: tx.amount,
      previousBalance: tx.previousBalance,
      newBalance: tx.newBalance,
      description: tx.description,
      reference: tx.reference,
      createdAt: tx.createdAt,
    }));
    
    return { success: true, data: mappedTransactions };
  }

  @Get('games')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Jogos Disponíveis para o Agente',
    description: 'Retorna a lista de jogos disponíveis para o agente integrar (filtrado pelos jogos permitidos).'
  })
  async getAvailableGames(@Headers('authorization') authHeader: string) {
    const accessToken = this.extractBearerToken(authHeader);
    const { operatorId } = await this.agentService.validateToken(accessToken);
    const games = await this.agentService.getAvailableGames(operatorId);
    return { success: true, data: games };
  }

  // =============================================
  // CONFIGURAÇÕES DE JOGOS DO AGENTE
  // =============================================

  @Get('games/settings')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Configurações dos Jogos do Agente',
    description: 'Retorna as configurações de RTP e Chance de Vitória de cada jogo permitido para o agente.'
  })
  async getGameSettings(@Headers('authorization') authHeader: string) {
    const accessToken = this.extractBearerToken(authHeader);
    const { operatorId } = await this.agentService.validateToken(accessToken);
    const settings = await this.agentService.getAgentGameSettings(operatorId);
    return { success: true, data: settings };
  }

  @Put('games/:gameCode/settings')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar Configurações de um Jogo',
    description: 'Permite ao agente customizar o RTP e Chance de Vitória de um jogo específico. RTP: 85-99%, WinChance: 10-60%.'
  })
  async updateGameSettings(
    @Headers('authorization') authHeader: string,
    @Param('gameCode') gameCode: string,
    @Body() body: { rtp?: number; winChance?: number },
  ) {
    const accessToken = this.extractBearerToken(authHeader);
    const { operatorId } = await this.agentService.validateToken(accessToken);
    const settings = await this.agentService.updateAgentGameSettings(operatorId, gameCode, body);
    this.logger.log(`[Agent] Game settings updated: ${gameCode} - RTP: ${settings.rtp}%, WinChance: ${settings.winChance}%`);
    return { success: true, data: settings };
  }

  @Post('games/:gameCode/settings/reset')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Resetar Configurações de um Jogo',
    description: 'Remove as customizações do agente para um jogo específico, voltando aos valores globais.'
  })
  async resetGameSettings(
    @Headers('authorization') authHeader: string,
    @Param('gameCode') gameCode: string,
  ) {
    const accessToken = this.extractBearerToken(authHeader);
    const { operatorId } = await this.agentService.validateToken(accessToken);
    await this.agentService.resetAgentGameSettings(operatorId, gameCode);
    return { success: true, message: `Settings for ${gameCode} reset to global defaults` };
  }

  // =============================================
  // SESSÕES DE JOGO
  // =============================================

  @Post('sessions')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criar Sessão de Jogo',
    description: 'Cria uma nova sessão de jogo para um jogador. Retorna URL do jogo.'
  })
  async createSession(
    @Headers('authorization') authHeader: string,
    @Body() dto: CreateSessionDto,
  ) {
    this.logger.log(`[B2B] Create session for game: ${dto.gameId}`);
    const accessToken = this.extractBearerToken(authHeader);
    const { operatorId } = await this.agentService.validateToken(accessToken);
    const result = await this.agentService.createSession(operatorId, dto);
    return { success: true, data: result };
  }

  // =============================================
  // GESTÃO DE AGENTES (ADMIN)
  // =============================================

  @Get('agents')
  @ApiOperation({ summary: 'Listar Agentes' })
  @ApiHeader({ name: 'x-admin-key', required: true })
  async listAgents(@Headers('x-admin-key') adminKey: string) {
    this.validateAdminKey(adminKey);
    const agents = await this.agentService.listAgents();
    return { success: true, data: agents };
  }

  @Get('agents/:id')
  @ApiOperation({ summary: 'Buscar Agente por ID' })
  @ApiHeader({ name: 'x-admin-key', required: true })
  @ApiParam({ name: 'id', description: 'ID do agente' })
  async getAgent(
    @Headers('x-admin-key') adminKey: string,
    @Param('id') id: string,
  ) {
    this.validateAdminKey(adminKey);
    const agent = await this.agentService.getAgentById(id);
    if (!agent) throw new NotFoundException('Agent not found');
    return { success: true, data: agent };
  }

  @Post('agents')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar Agente',
    description: 'Cria um novo agente. Retorna API Key e Secret (só mostrado uma vez!).'
  })
  @ApiHeader({ name: 'x-admin-key', required: true })
  async createAgent(
    @Headers('x-admin-key') adminKey: string,
    @Body() body: {
      name: string;
      email: string;
      password: string;
      phone?: string;
      initialCredits?: number; // Créditos de spin iniciais
    },
  ) {
    this.validateAdminKey(adminKey);
    const result = await this.agentService.createAgent(body);
    return {
      success: true,
      message: '⚠️ GUARDE O API SECRET - ele não será mostrado novamente!',
      data: {
        id: result.agent.id,
        name: result.agent.name,
        email: result.agent.email,
        apiKey: result.agent.apiKey,
        apiSecret: result.apiSecret,
        spinCredits: result.agent.spinCredits,
      },
    };
  }

  @Put('agents/:id')
  @ApiOperation({ summary: 'Atualizar Agente' })
  @ApiHeader({ name: 'x-admin-key', required: true })
  async updateAgent(
    @Headers('x-admin-key') adminKey: string,
    @Param('id') id: string,
    @Body() body: {
      name?: string;
      email?: string;
      phone?: string;
      isActive?: boolean;
      allowedGames?: string[];
    },
  ) {
    this.validateAdminKey(adminKey);
    const agent = await this.agentService.updateAgent(id, body);
    if (!agent) throw new NotFoundException('Agent not found');
    return { success: true, data: agent };
  }

  @Put('agents/:id/password')
  @ApiOperation({
    summary: 'Resetar Senha do Agente',
    description: 'Admin reseta a senha de um agente.'
  })
  @ApiHeader({ name: 'x-admin-key', required: true })
  async resetAgentPassword(
    @Headers('x-admin-key') adminKey: string,
    @Param('id') id: string,
    @Body() body: { newPassword: string },
  ) {
    this.validateAdminKey(adminKey);
    await this.agentService.adminResetAgentPassword(id, body.newPassword);
    return { success: true, message: 'Senha do agente alterada com sucesso' };
  }

  // =============================================
  // GESTÃO DE CRÉDITOS DE SPIN (ADMIN)
  // =============================================

  @Post('agents/:id/credits')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Adicionar Créditos de Spin',
    description: 'Adiciona créditos de spin ao agente. 1 crédito = 1 spin. Use após receber pagamento.'
  })
  @ApiHeader({ name: 'x-admin-key', required: true })
  async addSpinCredits(
    @Headers('x-admin-key') adminKey: string,
    @Param('id') id: string,
    @Body() body: { credits: number; description?: string },
  ) {
    this.validateAdminKey(adminKey);
    const agent = await this.agentService.addSpinCredits(id, body.credits, body.description);
    return {
      success: true,
      message: `${body.credits} créditos de spin adicionados com sucesso`,
      data: {
        id: agent.id,
        name: agent.name,
        spinCredits: agent.spinCredits,
        totalCreditsPurchased: agent.totalCreditsPurchased,
        totalSpinsConsumed: agent.totalSpinsConsumed,
      },
    };
  }

  @Post('agents/:id/credit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '[DEPRECATED] Use /credits',
    description: 'Adiciona créditos (valor convertido para spins). Use /credits para o novo modelo.'
  })
  @ApiHeader({ name: 'x-admin-key', required: true })
  async addCredit(
    @Headers('x-admin-key') adminKey: string,
    @Param('id') id: string,
    @Body() body: { amount: number; description?: string },
  ) {
    this.validateAdminKey(adminKey);
    // Converte R$ para créditos (R$ 0,10 = 1 crédito)
    const credits = Math.floor(body.amount * 10);
    const agent = await this.agentService.addSpinCredits(id, credits, body.description);
    return {
      success: true,
      message: `${credits} créditos adicionados (convertido de R$ ${body.amount.toFixed(2)})`,
      data: {
        id: agent.id,
        name: agent.name,
        spinCredits: agent.spinCredits,
      },
    };
  }

  @Post('agents/:id/debit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Remover Créditos',
    description: 'Remove créditos de spin do agente (ajuste manual).'
  })
  @ApiHeader({ name: 'x-admin-key', required: true })
  async removeCredits(
    @Headers('x-admin-key') adminKey: string,
    @Param('id') id: string,
    @Body() body: { credits: number; description?: string },
  ) {
    this.validateAdminKey(adminKey);
    const agent = await this.agentService.removeSpinCredits(id, body.credits, body.description);
    return {
      success: true,
      message: `${body.credits} créditos removidos`,
      data: {
        id: agent.id,
        name: agent.name,
        spinCredits: agent.spinCredits,
      },
    };
  }

  @Get('agents/:id/transactions')
  @ApiOperation({ summary: 'Listar Transações do Agente' })
  @ApiHeader({ name: 'x-admin-key', required: true })
  async getAgentTransactions(
    @Headers('x-admin-key') adminKey: string,
    @Param('id') id: string,
  ) {
    this.validateAdminKey(adminKey);
    const transactions = await this.agentService.getAgentTransactions(id);
    return { success: true, data: transactions };
  }

  @Post('agents/:id/regenerate-key')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Regenerar API Key',
    description: 'Gera novas credenciais de API. As antigas serão invalidadas!'
  })
  @ApiHeader({ name: 'x-admin-key', required: true })
  async regenerateApiKey(
    @Headers('x-admin-key') adminKey: string,
    @Param('id') id: string,
  ) {
    this.validateAdminKey(adminKey);
    const result = await this.agentService.regenerateApiKey(id);
    return {
      success: true,
      message: '⚠️ GUARDE O NOVO API SECRET - ele não será mostrado novamente!',
      data: result,
    };
  }

  @Post('agents/reset-all-credits')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Resetar Créditos de Todos os Agentes',
    description: 'Zera o saldo de spinCredits de todos os agentes e limpa histórico de transações. Use com cuidado!'
  })
  @ApiHeader({ name: 'x-admin-key', required: true })
  async resetAllAgentCredits(@Headers('x-admin-key') adminKey: string) {
    this.validateAdminKey(adminKey);
    const result = await this.agentService.resetAllAgentCredits();
    return {
      success: true,
      message: 'Todos os créditos de agentes foram zerados',
      data: result,
    };
  }

  // =============================================
  // BACKWARD COMPATIBILITY (operadores antigos)
  // =============================================

  @Get('operators')
  @ApiOperation({ summary: '[DEPRECATED] Use /agents' })
  @ApiHeader({ name: 'x-admin-key', required: true })
  async listOperators(@Headers('x-admin-key') adminKey: string) {
    return this.listAgents(adminKey);
  }

  @Post('operators')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '[DEPRECATED] Use /agents' })
  @ApiHeader({ name: 'x-admin-key', required: true })
  async createOperator(
    @Headers('x-admin-key') adminKey: string,
    @Body() body: { name: string },
  ) {
    this.validateAdminKey(adminKey);
    const result = await this.agentService.createOperator(body);
    return {
      success: true,
      message: 'Operator created. SAVE THE API SECRET!',
      data: {
        id: result.agent.id,
        name: result.agent.name,
        apiKey: result.agent.apiKey,
        apiSecret: result.apiSecret,
      },
    };
  }

  // =============================================
  // HELPERS
  // =============================================

  private extractBearerToken(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authorization header');
    }
    return authHeader.slice(7);
  }

  private validateAdminKey(adminKey: string): void {
    if (adminKey !== process.env.ADMIN_KEY && adminKey !== 'dev-admin-key') {
      throw new UnauthorizedException('Invalid admin key');
    }
  }
}
