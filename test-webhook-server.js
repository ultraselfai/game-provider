/**
 * Servidor Mock de Webhook para testar integração
 * Simula a plataforma Bet recebendo callbacks do Game Provider
 * 
 * Execute: node test-webhook-server.js
 */

const http = require('http');

// Saldo fictício dos jogadores
const playerBalances = {
  'player_1': 500.00,
  'player_2': 1000.00,
  'test': 2000.00,
};

const server = http.createServer((req, res) => {
  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    console.log('\n========================================');
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    
    let payload = {};
    try {
      payload = JSON.parse(body);
      console.log('Body:', JSON.stringify(payload, null, 2));
    } catch (e) {
      console.log('Body (raw):', body);
    }
    
    res.setHeader('Content-Type', 'application/json');
    
    // Rota: Balance
    if (req.url === '/webhook/balance') {
      const playerId = payload.playerId || 'test';
      const balance = playerBalances[playerId] || 0;
      
      console.log(`[BALANCE] Player: ${playerId}, Balance: ${balance}`);
      
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        balance: balance,
        currency: 'BRL'
      }));
      return;
    }
    
    // Rota: Debit (Aposta)
    if (req.url === '/webhook/debit') {
      const playerId = payload.playerId || 'test';
      const amount = payload.amount || 0;
      const roundId = payload.roundId;
      
      const currentBalance = playerBalances[playerId] || 0;
      
      if (currentBalance < amount) {
        console.log(`[DEBIT] FAILED - Insufficient balance. Player: ${playerId}, Amount: ${amount}, Balance: ${currentBalance}`);
        res.writeHead(200);
        res.end(JSON.stringify({
          success: false,
          error: 'Insufficient balance',
          balance: currentBalance,
          currency: 'BRL'
        }));
        return;
      }
      
      playerBalances[playerId] = currentBalance - amount;
      console.log(`[DEBIT] SUCCESS - Player: ${playerId}, Amount: ${amount}, New Balance: ${playerBalances[playerId]}`);
      
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        transactionId: `tx_debit_${Date.now()}`,
        balance: playerBalances[playerId],
        currency: 'BRL'
      }));
      return;
    }
    
    // Rota: Credit (Ganho)
    if (req.url === '/webhook/credit') {
      const playerId = payload.playerId || 'test';
      const amount = payload.amount || 0;
      const roundId = payload.roundId;
      
      const currentBalance = playerBalances[playerId] || 0;
      playerBalances[playerId] = currentBalance + amount;
      
      console.log(`[CREDIT] SUCCESS - Player: ${playerId}, Amount: ${amount}, New Balance: ${playerBalances[playerId]}`);
      
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        transactionId: `tx_credit_${Date.now()}`,
        balance: playerBalances[playerId],
        currency: 'BRL'
      }));
      return;
    }
    
    // Rota não encontrada
    console.log('[ERROR] Route not found');
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  });
});

const PORT = 3007;
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║        MOCK WEBHOOK SERVER - Simulação Plataforma Bet      ║
╠════════════════════════════════════════════════════════════╣
║  Servidor rodando em: http://localhost:${PORT}               ║
║                                                            ║
║  Endpoints disponíveis:                                    ║
║    POST /webhook/balance  - Consulta saldo                 ║
║    POST /webhook/debit    - Processa aposta                ║
║    POST /webhook/credit   - Processa ganho                 ║
║                                                            ║
║  Jogadores disponíveis:                                    ║
║    - player_1: R$ 500,00                                   ║
║    - player_2: R$ 1.000,00                                 ║
║    - test: R$ 2.000,00                                     ║
╚════════════════════════════════════════════════════════════╝
  `);
});
