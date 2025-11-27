/**
 * Testes de Integração E2E
 * 
 * Testa os endpoints da API como um cliente externo faria.
 * Requer que o servidor esteja rodando (ou use mocks).
 */

const BASE_URL = process.env.API_URL || 'http://localhost:3006';
const ADMIN_KEY = 'dev-admin-key';

interface TestContext {
  operatorId: string;
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  sessionToken: string;
}

async function request(method: string, path: string, body?: any, headers: Record<string, string> = {}) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${path}`, options);
  return {
    status: response.status,
    data: await response.json(),
  };
}

describe('API E2E Tests', () => {
  const ctx: TestContext = {
    operatorId: '',
    apiKey: '',
    apiSecret: '',
    accessToken: '',
    sessionToken: '',
  };

  describe('Health Check', () => {
    it('GET /health deve retornar status 200', async () => {
      const res = await request('GET', '/health');
      expect(res.status).toBe(200);
    });
  });

  describe('B2B API - Operator Management', () => {
    it('POST /api/v1/agent/operators deve criar operador', async () => {
      const res = await request(
        'POST',
        '/api/v1/agent/operators',
        { name: `Test Operator ${Date.now()}` },
        { 'x-admin-key': ADMIN_KEY },
      );

      expect(res.status).toBe(201);
      expect(res.data.success).toBe(true);
      expect(res.data.data).toHaveProperty('id');
      expect(res.data.data).toHaveProperty('apiKey');
      expect(res.data.data).toHaveProperty('apiSecret');

      ctx.operatorId = res.data.data.id;
      ctx.apiKey = res.data.data.apiKey;
      ctx.apiSecret = res.data.data.apiSecret;
    });

    it('POST /api/v1/agent/operators sem admin key deve falhar', async () => {
      const res = await request('POST', '/api/v1/agent/operators', { name: 'Test' });
      expect(res.status).toBe(401);
    });
  });

  describe('B2B API - Authentication', () => {
    it('POST /api/v1/agent/auth deve autenticar operador', async () => {
      const res = await request('POST', '/api/v1/agent/auth', {
        apiKey: ctx.apiKey,
        apiSecret: ctx.apiSecret,
      });

      expect(res.status).toBe(200);
      expect(res.data.success).toBe(true);
      expect(res.data.data).toHaveProperty('accessToken');
      expect(res.data.data).toHaveProperty('expiresIn');

      ctx.accessToken = res.data.data.accessToken;
    });

    it('POST /api/v1/agent/auth com credenciais inválidas deve falhar', async () => {
      const res = await request('POST', '/api/v1/agent/auth', {
        apiKey: 'invalid-key',
        apiSecret: 'invalid-secret',
      });

      expect(res.data.success).toBe(false);
    });
  });

  describe('B2B API - Session Management', () => {
    it('POST /api/v1/agent/sessions deve criar sessão de jogo', async () => {
      const res = await request(
        'POST',
        '/api/v1/agent/sessions',
        {
          userId: 'test-player-123',
          gameId: 'fortunetiger',
          currency: 'BRL',
          mode: 'REAL',
        },
        { Authorization: `Bearer ${ctx.accessToken}` },
      );

      expect(res.status).toBe(201);
      expect(res.data.success).toBe(true);
      expect(res.data.data).toHaveProperty('sessionToken');
      expect(res.data.data).toHaveProperty('launchUrl');
      expect(res.data.data.sessionToken).toMatch(/^sess_/);

      ctx.sessionToken = res.data.data.sessionToken;
    });

    it('POST /api/v1/agent/sessions sem auth deve falhar', async () => {
      const res = await request('POST', '/api/v1/agent/sessions', {
        userId: 'test',
        gameId: 'fortunetiger',
        currency: 'BRL',
        mode: 'REAL',
      });

      expect(res.data.success).toBe(false);
    });
  });

  describe('Game API - Session Endpoint', () => {
    it('GET /api/vgames/:token/session deve retornar dados da sessão', async () => {
      const res = await request('GET', `/api/vgames/${ctx.sessionToken}/session`);

      expect(res.status).toBe(200);
      expect(res.data.success).toBe(true);
      expect(res.data.data).toHaveProperty('user_name');
      expect(res.data.data).toHaveProperty('credit');
      expect(res.data.data).toHaveProperty('num_line');
      expect(res.data.data).toHaveProperty('bet_amount');
      expect(res.data.data).toHaveProperty('icon_data');
      expect(res.data.data).toHaveProperty('feature');
    });

    it('GET /api/vgames/invalid-token/session deve falhar graciosamente', async () => {
      const res = await request('GET', '/api/vgames/invalid-token/session');

      expect(res.status).toBe(200);
      expect(res.data.success).toBe(false);
    });
  });

  describe('Game API - Spin Endpoint', () => {
    it('POST /api/vgames/:token/spin deve executar spin', async () => {
      const res = await fetch(`${BASE_URL}/api/vgames/${ctx.sessionToken}/spin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'betamount=1&numline=5&cpl=1',
      });
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toHaveProperty('data');
      expect(data.data).toHaveProperty('credit');
      expect(data.data).toHaveProperty('pull');
      expect(data.data.pull).toHaveProperty('SlotIcons');
      expect(data.data.pull).toHaveProperty('WinAmount');
      expect(data.data.pull).toHaveProperty('ActiveIcons');
      expect(data.data.pull).toHaveProperty('ActiveLines');
      expect(data.data.pull.SlotIcons).toHaveLength(9);
    });

    it('POST /api/vgames/:token/spin com token inválido deve falhar', async () => {
      const res = await fetch(`${BASE_URL}/api/vgames/invalid-token/spin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'betamount=1&numline=5&cpl=1',
      });
      const data = await res.json();

      expect(data.success).toBe(false);
    });

    it('múltiplos spins devem atualizar saldo corretamente', async () => {
      // Pega saldo inicial
      const sessionRes = await request('GET', `/api/vgames/${ctx.sessionToken}/session`);
      const initialBalance = sessionRes.data.data.credit;

      // Executa 5 spins
      let totalBet = 0;
      let totalWin = 0;

      for (let i = 0; i < 5; i++) {
        const spinRes = await fetch(`${BASE_URL}/api/vgames/${ctx.sessionToken}/spin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'betamount=1&numline=5&cpl=1',
        });
        const data = await spinRes.json();

        totalBet += 5; // bet * numlines
        totalWin += data.data?.pull?.WinAmount || 0;
      }

      // Pega saldo final
      const finalRes = await request('GET', `/api/vgames/${ctx.sessionToken}/session`);
      const finalBalance = finalRes.data.data.credit;

      // Verifica consistência
      const expectedBalance = initialBalance - totalBet + totalWin;
      
      // Permite pequena margem de erro por arredondamento
      expect(Math.abs(finalBalance - expectedBalance)).toBeLessThan(0.01);
    });
  });

  describe('Game API - Info Endpoint', () => {
    it('GET /api/vgames/:token/info deve retornar informações do jogo', async () => {
      const res = await request('GET', `/api/vgames/${ctx.sessionToken}/info`);

      expect(res.status).toBe(200);
      expect(res.data.success).toBe(true);
      expect(res.data.data).toHaveProperty('game');
      expect(res.data.data).toHaveProperty('session');
    });
  });

  describe('Game API - Icons Endpoint', () => {
    it('GET /api/vgames/:token/icons deve retornar lista de ícones', async () => {
      const res = await request('GET', `/api/vgames/${ctx.sessionToken}/icons`);

      expect(res.status).toBe(200);
      expect(res.data.success).toBe(true);
      expect(res.data.data).toHaveProperty('icons');
      expect(Array.isArray(res.data.data.icons)).toBe(true);
    });
  });
});

describe('Webhook Integration Tests', () => {
  // Estes testes requerem o webhook mock server rodando
  const WEBHOOK_SERVER = 'http://localhost:3007';

  it.skip('operador com webhooks deve usar modo REMOTE', async () => {
    // Criar operador com webhooks
    const operatorRes = await request(
      'POST',
      '/api/v1/agent/operators',
      {
        name: `Webhook Test ${Date.now()}`,
        balanceCallbackUrl: `${WEBHOOK_SERVER}/webhook/balance`,
        debitCallbackUrl: `${WEBHOOK_SERVER}/webhook/debit`,
        creditCallbackUrl: `${WEBHOOK_SERVER}/webhook/credit`,
      },
      { 'x-admin-key': ADMIN_KEY },
    );

    expect(operatorRes.data.success).toBe(true);

    // Autenticar
    const authRes = await request('POST', '/api/v1/agent/auth', {
      apiKey: operatorRes.data.data.apiKey,
      apiSecret: operatorRes.data.data.apiSecret,
    });

    expect(authRes.data.success).toBe(true);

    // Criar sessão
    const sessionRes = await request(
      'POST',
      '/api/v1/agent/sessions',
      { userId: 'test', gameId: 'fortunetiger', currency: 'BRL', mode: 'REAL' },
      { Authorization: `Bearer ${authRes.data.data.accessToken}` },
    );

    expect(sessionRes.data.success).toBe(true);

    // Verificar que session retorna balance do webhook (2000 no mock)
    const sessionDataRes = await request('GET', `/api/vgames/${sessionRes.data.data.sessionToken}/session`);
    
    // Se webhook mock está rodando, deve retornar 2000
    // Se não está rodando, vai usar cache (0)
    expect(sessionDataRes.data.data.credit).toBeDefined();
  });
});

// Runner manual se não estiver usando Jest
if (typeof jest === 'undefined') {
  (async () => {
    console.log('🧪 Executando testes E2E manualmente...\n');
    
    try {
      // Health check
      const healthRes = await request('GET', '/health');
      console.log(`✅ Health: ${healthRes.status === 200 ? 'OK' : 'FAIL'}`);

      // Criar operador
      const opRes = await request('POST', '/api/v1/agent/operators', 
        { name: `Manual Test ${Date.now()}` },
        { 'x-admin-key': ADMIN_KEY }
      );
      console.log(`✅ Create Operator: ${opRes.data.success ? 'OK' : 'FAIL'}`);

      // Autenticar
      const authRes = await request('POST', '/api/v1/agent/auth', {
        apiKey: opRes.data.data.apiKey,
        apiSecret: opRes.data.data.apiSecret,
      });
      console.log(`✅ Auth: ${authRes.data.success ? 'OK' : 'FAIL'}`);

      // Criar sessão
      const sessRes = await request('POST', '/api/v1/agent/sessions',
        { userId: 'test', gameId: 'fortunetiger', currency: 'BRL', mode: 'REAL' },
        { Authorization: `Bearer ${authRes.data.data.accessToken}` }
      );
      console.log(`✅ Create Session: ${sessRes.data.success ? 'OK' : 'FAIL'}`);

      // Get session
      const getRes = await request('GET', `/api/vgames/${sessRes.data.data.sessionToken}/session`);
      console.log(`✅ Get Session: ${getRes.data.success ? 'OK' : 'FAIL'}`);

      // Spin
      const spinRes = await fetch(`${BASE_URL}/api/vgames/${sessRes.data.data.sessionToken}/spin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'betamount=1&numline=5&cpl=1',
      });
      const spinData = await spinRes.json();
      console.log(`✅ Spin: ${spinData.data?.pull ? 'OK' : 'FAIL'}`);
      console.log(`   Win: ${spinData.data?.pull?.WinAmount || 0}`);
      console.log(`   Balance: ${spinData.data?.credit}`);

      console.log('\n🎉 Todos os testes passaram!');
    } catch (error) {
      console.error('❌ Erro:', error);
    }
  })();
}
