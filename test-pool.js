/**
 * Script de teste para validar o PoolService
 * Executa operações básicas para garantir que tudo funciona
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Função helper para fazer requisições HTTP
function request(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testPoolService() {
  console.log('🧪 Iniciando testes do PoolService...\n');

  // 1. Verificar se o servidor está rodando
  try {
    const health = await request('GET', '/health');
    console.log('✅ Servidor está rodando:', health.data);
  } catch (err) {
    console.error('❌ Servidor não está rodando. Inicie com: npm run start:dev');
    process.exit(1);
  }

  // 2. Buscar agentes existentes
  const agents = await request('GET', '/api/vgames/test/agents');
  console.log('\n📋 Agentes disponíveis:', agents.data?.length || 0);
  
  if (!agents.data?.length) {
    console.log('⚠️  Nenhum agente encontrado. Crie um agente primeiro.');
    return;
  }

  const agent = agents.data[0];
  console.log(`   Usando agente: ${agent.name} (${agent.id})`);

  // 3. Gerar token de teste
  const tokenRes = await request('GET', `/api/vgames/test/generate-token/test-user-pool/fortunetiger/${agent.id}`);
  
  if (tokenRes.status !== 200) {
    console.log('❌ Erro ao gerar token:', tokenRes.data);
    return;
  }
  
  const token = tokenRes.data.token;
  console.log('\n🎫 Token gerado:', token.substring(0, 20) + '...');

  // 4. Criar sessão
  const session = await request('GET', `/api/vgames/${token}/session`);
  console.log('\n🎮 Sessão criada:', {
    balance: session.data?.balance,
    game: session.data?.game,
  });

  // 5. Fazer alguns spins para testar o pool
  console.log('\n🎰 Executando 5 spins de teste...\n');
  
  for (let i = 1; i <= 5; i++) {
    const spin = await request('POST', `/api/vgames/${token}/spin`, {
      bet: 1,
      cpl: 10,
    });
    
    const result = spin.data;
    const isWin = result.total_win > 0;
    
    console.log(`   Spin ${i}: ${isWin ? '💰 WIN' : '❌ LOSE'} - Aposta: ${result.bet || 10}, Ganho: ${result.total_win || 0}`);
  }

  console.log('\n✅ Testes básicos concluídos!');
  console.log('\n📊 Verifique o pool no banco:');
  console.log('   docker exec game-provider-db psql -U gameadmin -d game_provider -c "SELECT * FROM agent_pools"');
  console.log('   docker exec game-provider-db psql -U gameadmin -d game_provider -c "SELECT * FROM pool_transactions ORDER BY created_at DESC LIMIT 10"');
}

testPoolService().catch(console.error);
