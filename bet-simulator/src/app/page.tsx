'use client';

import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3006';

// Credenciais do agente demo
const AGENT_CREDENTIALS = {
  apiKey: 'ag_2387be8dfed46b39897432297c249b0b',
  apiSecret: '3f071eee09d91a2c86449aef132a7706a0a55188e66ece144238fc654cd5de69',
};

interface Player {
  id: string;
  name: string;
  balance: number;
}

interface Game {
  id: string;
  gameCode: string;
  gameName: string;
  provider: string;
}

export default function BetSimulator() {
  // Estado da Bet
  const [agentToken, setAgentToken] = useState<string>('');
  const [agentInfo, setAgentInfo] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Estado do Jogador
  const [player, setPlayer] = useState<Player | null>(null);
  const [depositAmount, setDepositAmount] = useState('100');
  
  // Jogos disponíveis
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>('');
  
  // Sessão de jogo
  const [gameUrl, setGameUrl] = useState<string>('');
  const [sessionToken, setSessionToken] = useState<string>('');
  
  // Logs
  const [logs, setLogs] = useState<string[]>([]);
  
  // Modo de exibição do jogo
  const [gameDisplayMode, setGameDisplayMode] = useState<'iframe' | 'popup' | 'redirect'>('iframe');

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 49)]);
  };

  // 1. Conectar ao Provider (autenticar como agente)
  const connectToProvider = async () => {
    try {
      addLog('🔌 Conectando ao Game Provider...');
      
      const response = await fetch(`${API_URL}/api/v1/agent/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: AGENT_CREDENTIALS.apiKey,
          apiSecret: AGENT_CREDENTIALS.apiSecret,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAgentToken(data.data.accessToken);
        setIsConnected(true);
        addLog(`✅ Conectado! Token: ${data.data.accessToken.slice(0, 16)}...`);
        
        // Buscar informações do agente
        await fetchAgentInfo(data.data.accessToken);
        
        // Buscar jogos disponíveis
        await fetchGames(data.data.accessToken);
      } else {
        addLog(`❌ Erro: ${data.message}`);
      }
    } catch (error: any) {
      addLog(`❌ Erro de conexão: ${error.message}`);
    }
  };

  const fetchAgentInfo = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/agent/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setAgentInfo(data.data);
        addLog(`📊 Agente: ${data.data.name} | Créditos: ${data.data.spinCredits}`);
      }
    } catch (error: any) {
      addLog(`⚠️ Erro ao buscar info: ${error.message}`);
    }
  };

  const fetchGames = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/agent/games`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setGames(data.data);
        addLog(`🎮 ${data.data.length} jogos disponíveis`);
      }
    } catch (error: any) {
      addLog(`⚠️ Erro ao buscar jogos: ${error.message}`);
    }
  };

  // 2. Jogador se cadastra e faz depósito
  const registerPlayer = () => {
    const newPlayer: Player = {
      id: `player_${Date.now()}`,
      name: 'Jogador Teste',
      balance: 0,
    };
    setPlayer(newPlayer);
    addLog(`👤 Jogador cadastrado: ${newPlayer.name} (${newPlayer.id})`);
  };

  const makeDeposit = () => {
    if (!player) return;
    
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      addLog('❌ Valor de depósito inválido');
      return;
    }
    
    // Simula depósito via PIX (na bet real, isso viria do gateway)
    setPlayer(prev => prev ? { ...prev, balance: prev.balance + amount } : null);
    addLog(`💰 Depósito de R$ ${amount.toFixed(2)} realizado via PIX`);
    addLog(`💵 Novo saldo do jogador: R$ ${(player.balance + amount).toFixed(2)}`);
  };

  // 3. Abrir jogo (criar sessão)
  const openGame = async () => {
    if (!player || !selectedGame || !agentToken) {
      addLog('❌ Selecione um jogo e certifique-se de estar logado');
      return;
    }

    try {
      addLog(`🎰 Abrindo ${selectedGame}...`);
      
      const response = await fetch(`${API_URL}/api/v1/agent/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${agentToken}`,
        },
        body: JSON.stringify({
          userId: player.id,
          gameId: selectedGame,
          playerBalance: player.balance,
          currency: 'BRL',
          mode: 'REAL',
          returnUrl: 'http://localhost:3003',
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSessionToken(data.data.sessionToken);
        setGameUrl(data.data.launchUrl);
        addLog(`✅ Sessão criada: ${data.data.sessionToken.slice(0, 20)}...`);
        addLog(`🔗 URL do jogo: ${data.data.launchUrl}`);
        
        // Abrir o jogo baseado no modo selecionado
        if (gameDisplayMode === 'popup') {
          window.open(data.data.launchUrl, 'game', 'width=1200,height=800,scrollbars=no,resizable=yes');
        } else if (gameDisplayMode === 'redirect') {
          window.location.href = data.data.launchUrl;
        }
        // Se for iframe, já vai mostrar abaixo
      } else {
        addLog(`❌ Erro: ${data.message}`);
      }
    } catch (error: any) {
      addLog(`❌ Erro ao criar sessão: ${error.message}`);
    }
  };

  // Atualizar info do agente periodicamente
  useEffect(() => {
    if (agentToken) {
      const interval = setInterval(() => {
        fetchAgentInfo(agentToken);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [agentToken]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-green-600 to-green-800 rounded-xl p-6 mb-6">
          <h1 className="text-3xl font-bold">🎰 Simulador de Bet</h1>
          <p className="text-green-200 mt-2">
            Simula uma plataforma de apostas integrada com o Game Provider
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Painel da Bet (Agente) */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🏢</span> Painel da Bet
            </h2>
            
            {!isConnected ? (
              <button
                onClick={connectToProvider}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
              >
                Conectar ao Provider
              </button>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-600/20 border border-green-500 rounded-lg p-3">
                  <div className="text-green-400 font-semibold">✅ Conectado</div>
                  <div className="text-sm text-gray-300 mt-1">
                    Agente: {agentInfo?.name}
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Créditos de Spin</div>
                  <div className="text-3xl font-bold text-yellow-400">
                    {agentInfo?.spinCredits?.toLocaleString() || 0}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Consumidos: {agentInfo?.totalSpinsConsumed || 0}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  <div>API Key: {AGENT_CREDENTIALS.apiKey.slice(0, 20)}...</div>
                </div>
              </div>
            )}
          </div>

          {/* Painel do Jogador */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">👤</span> Jogador
            </h2>
            
            {!player ? (
              <button
                onClick={registerPlayer}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
              >
                Cadastrar Jogador
              </button>
            ) : (
              <div className="space-y-4">
                <div className="bg-purple-600/20 border border-purple-500 rounded-lg p-3">
                  <div className="font-semibold">{player.name}</div>
                  <div className="text-xs text-gray-400">{player.id}</div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Saldo do Jogador</div>
                  <div className="text-3xl font-bold text-green-400">
                    R$ {player.balance.toFixed(2)}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="flex-1 bg-gray-700 rounded-lg px-3 py-2"
                    placeholder="Valor"
                  />
                  <button
                    onClick={makeDeposit}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
                  >
                    Depositar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Seleção de Jogo */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🎮</span> Jogos
            </h2>
            
            {games.length > 0 ? (
              <div className="space-y-4">
                <select
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="w-full bg-gray-700 rounded-lg px-3 py-3"
                >
                  <option value="">Selecione um jogo</option>
                  {games.map((game) => (
                    <option key={game.gameCode} value={game.gameCode}>
                      {game.gameName} ({game.provider})
                    </option>
                  ))}
                </select>
                
                <div className="text-sm text-gray-400 mb-2">Como abrir o jogo:</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setGameDisplayMode('iframe')}
                    className={`flex-1 py-2 rounded-lg text-sm ${gameDisplayMode === 'iframe' ? 'bg-blue-600' : 'bg-gray-700'}`}
                  >
                    Iframe
                  </button>
                  <button
                    onClick={() => setGameDisplayMode('popup')}
                    className={`flex-1 py-2 rounded-lg text-sm ${gameDisplayMode === 'popup' ? 'bg-blue-600' : 'bg-gray-700'}`}
                  >
                    Popup
                  </button>
                  <button
                    onClick={() => setGameDisplayMode('redirect')}
                    className={`flex-1 py-2 rounded-lg text-sm ${gameDisplayMode === 'redirect' ? 'bg-blue-600' : 'bg-gray-700'}`}
                  >
                    Nova Aba
                  </button>
                </div>
                
                <button
                  onClick={openGame}
                  disabled={!selectedGame || !player || player.balance <= 0}
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold"
                >
                  🚀 Abrir Jogo
                </button>
                
                {player && player.balance <= 0 && (
                  <p className="text-sm text-yellow-400">
                    ⚠️ Jogador precisa depositar primeiro
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-400">Conecte ao provider para ver os jogos</p>
            )}
          </div>
        </div>

        {/* Área do Jogo */}
        {gameUrl && (
          <div className="mt-6 bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">🎰 Jogo Ativo</h2>
              <button
                onClick={() => { setGameUrl(''); setSessionToken(''); }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
              >
                Fechar Jogo
              </button>
            </div>
            
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                src={gameUrl}
                className="w-full h-[600px] border-0"
                allow="fullscreen"
              />
            </div>
            
            <div className="mt-4 text-sm text-gray-400">
              <p>Session Token: {sessionToken}</p>
              <p>URL: {gameUrl}</p>
            </div>
          </div>
        )}

        {/* Logs */}
        <div className="mt-6 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span> Logs de Integração
          </h2>
          
          <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <p className="text-gray-500">Aguardando ações...</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="py-1 border-b border-gray-800 last:border-0">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Explicação do Fluxo */}
        <div className="mt-6 bg-blue-900/30 border border-blue-500/50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-400 mb-3">📖 Como funciona o fluxo:</h3>
          <ol className="space-y-2 text-sm text-gray-300">
            <li><span className="text-blue-400 font-bold">1.</span> A Bet se conecta ao Provider usando API Key + Secret</li>
            <li><span className="text-blue-400 font-bold">2.</span> Jogador se cadastra na Bet e faz depósito (dinheiro fica na Bet)</li>
            <li><span className="text-blue-400 font-bold">3.</span> Jogador escolhe um jogo → Bet cria sessão enviando saldo do jogador</li>
            <li><span className="text-blue-400 font-bold">4.</span> Jogador joga → <span className="text-yellow-400">cada SPIN consome 1 crédito do Agente</span></li>
            <li><span className="text-blue-400 font-bold">5.</span> Ganhos/Perdas são gerenciados pela Bet (não afetam os créditos)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
