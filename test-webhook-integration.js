/**
 * Script de teste para validar webhooks
 * 
 * 1. Cria operador com URLs de webhook
 * 2. Cria sessão para jogador
 * 3. Executa spin e verifica se webhooks são chamados
 * 
 * Execute:
 *   1. Primeiro: node test-webhook-server.js (em outro terminal)
 *   2. Depois: node test-webhook-integration.js
 */

const BASE_URL = 'http://localhost:3006';
const ADMIN_KEY = 'dev-admin-key';

async function request(method, path, body = null, headers = {}) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  const response = await fetch(`${BASE_URL}${path}`, options);
  return response.json();
}

async function main() {
  console.log('🚀 Iniciando teste de integração com webhooks...\n');
  
  // 1. Criar operador com webhooks configurados
  console.log('1️⃣ Criando operador com webhooks...');
  const operatorResult = await request('POST', '/api/v1/agent/operators', {
    name: `Webhook Test Operator ${Date.now()}`,
    balanceCallbackUrl: 'http://localhost:3007/webhook/balance',
    debitCallbackUrl: 'http://localhost:3007/webhook/debit',
    creditCallbackUrl: 'http://localhost:3007/webhook/credit',
  }, { 'x-admin-key': ADMIN_KEY });
  
  if (!operatorResult.success) {
    console.error('❌ Falha ao criar operador:', operatorResult);
    return;
  }
  
  const { apiKey, apiSecret, id: operatorId } = operatorResult.data;
  console.log(`   ✅ Operador criado: ${operatorId}`);
  console.log(`   API Key: ${apiKey}`);
  console.log(`   API Secret: ${apiSecret}\n`);
  
  // 2. Autenticar operador
  console.log('2️⃣ Autenticando operador...');
  const authResult = await request('POST', '/api/v1/agent/auth', {
    apiKey,
    apiSecret,
  });
  
  if (!authResult.success) {
    console.error('❌ Falha na autenticação:', authResult);
    return;
  }
  
  const { accessToken } = authResult.data;
  console.log(`   ✅ Token de acesso obtido\n`);
  
  // 3. Criar sessão para jogador
  console.log('3️⃣ Criando sessão de jogo...');
  const sessionResult = await request('POST', '/api/v1/agent/sessions', {
    userId: 'test',
    gameId: 'fortunetiger',
    currency: 'BRL',
    mode: 'REAL',
  }, { 'Authorization': `Bearer ${accessToken}` });
  
  if (!sessionResult.success) {
    console.error('❌ Falha ao criar sessão:', sessionResult);
    return;
  }
  
  const { sessionToken, launchUrl } = sessionResult.data;
  console.log(`   ✅ Sessão criada`);
  console.log(`   Token: ${sessionToken}`);
  console.log(`   URL: ${launchUrl}\n`);
  
  // 4. Testar /session endpoint (deve chamar webhook de balance)
  console.log('4️⃣ Testando endpoint /session (deve chamar webhook de balance)...');
  const sessionResponse = await fetch(`${BASE_URL}/api/vgames/${sessionToken}/session`);
  const sessionData = await sessionResponse.json();
  const remoteBalance = sessionData.data?.credit;
  console.log(`   ✅ Session response: credit = ${remoteBalance}`);
  
  // Verificar se o balance veio do webhook (player 'test' tem R$2000 no mock)
  if (remoteBalance === 2000) {
    console.log(`   ✅ Balance CORRETO! Veio do webhook (R$2000)`);
  } else if (remoteBalance === 0) {
    console.log(`   ⚠️  Balance zerado - webhook pode não ter sido chamado`);
  } else {
    console.log(`   ℹ️  Balance: ${remoteBalance}`);
  }
  console.log('');
  
  // 5. Executar spin
  console.log('5️⃣ Executando SPIN (deve chamar webhooks debit/credit)...');
  const spinResponse = await fetch(`${BASE_URL}/api/vgames/${sessionToken}/spin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'betamount=1&numline=5&cpl=1',
  });
  const spinData = await spinResponse.json();
  
  console.log(`   ✅ Spin executado!`);
  console.log(`   Win: ${spinData.data?.pull?.WinAmount || 0}`);
  console.log(`   Balance: ${spinData.data?.credit}`);
  console.log(`   Message: ${spinData.message}\n`);
  
  // 6. Verificar se usou modo REMOTE
  if (spinData.success) {
    console.log('✅ TESTE CONCLUÍDO!');
    console.log('   Verifique o terminal do test-webhook-server.js');
    console.log('   Se aparecerem logs de [DEBIT] e [CREDIT], os webhooks estão funcionando!');
  } else {
    console.log('❌ Spin falhou:', spinData.message);
  }
}

main().catch(console.error);
