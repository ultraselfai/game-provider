'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_BASE, AGENT_API } from '@/lib/config';

interface Agent {
  id: string;
  name: string;
  email: string;
  balance: number;
  spinCredits: number;
}

interface GameSettings {
  gameCode: string;
  gameName: string;
  rtp: number;
  winChance: number;
  isCustomized: boolean;
}

// Valores padrão do sistema
const DEFAULT_RTP = 96.5;
const DEFAULT_WIN_CHANCE = 35;

// Icons para cada jogo
const gameIcons: Record<string, string> = {
  'fortunetiger': '🐯',
  'fortuneox': '🐂',
  'fortunerabbit': '🐰',
  'fortunedragon': '🐲',
  'fortunemouse': '🐭',
  'fortunepanda': '🐼',
  'bikiniparadise': '👙',
  'hoodvswoolf': '🐺',
  'jackfrost': '❄️',
  'phoenixrises': '🔥',
  'queenofbounty': '👑',
  'songkranparty': '💦',
  'treasuresofaztec': '🏛️',
};

export default function GamesPage() {
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [games, setGames] = useState<GameSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameSettings | null>(null);
  const [editRtp, setEditRtp] = useState(96.5);
  const [editWinChance, setEditWinChance] = useState(35);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('agentToken');
    const agentData = localStorage.getItem('agentData');

    if (!token || !agentData) {
      router.push('/');
      return;
    }

    setAgent(JSON.parse(agentData));
    fetchGameSettings(token);
  }, [router]);

  async function fetchGameSettings(token: string) {
    try {
      const res = await fetch(`${AGENT_API}/games/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setGames(data.data || []);
      }
    } catch (err) {
      console.error('Erro ao carregar configurações:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('agentToken');
    localStorage.removeItem('agentData');
    router.push('/');
  }

  function openSettings(game: GameSettings) {
    setSelectedGame(game);
    setEditRtp(game.rtp);
    setEditWinChance(game.winChance);
    setMessage(null);
    setShowModal(true);
  }

  async function handleSaveSettings() {
    if (!selectedGame) return;
    
    const token = localStorage.getItem('agentToken');
    if (!token) return;

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`${AGENT_API}/games/${selectedGame.gameCode}/settings`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rtp: editRtp,
          winChance: editWinChance,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
        setGames(prev => prev.map(g => 
          g.gameCode === selectedGame.gameCode 
            ? { ...g, rtp: editRtp, winChance: editWinChance, isCustomized: true }
            : g
        ));
        setTimeout(() => setShowModal(false), 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Erro ao salvar configurações' });
      }
    } catch (err) {
      console.error('Erro:', err);
      setMessage({ type: 'error', text: 'Erro de conexão. Tente novamente.' });
    } finally {
      setSaving(false);
    }
  }

  async function handleResetSettings() {
    if (!selectedGame) return;
    
    const token = localStorage.getItem('agentToken');
    if (!token) return;

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`${AGENT_API}/games/${selectedGame.gameCode}/settings/reset`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: 'success', text: 'Configurações resetadas para o padrão!' });
        setEditRtp(DEFAULT_RTP);
        setEditWinChance(DEFAULT_WIN_CHANCE);
        setGames(prev => prev.map(g => 
          g.gameCode === selectedGame.gameCode 
            ? { ...g, rtp: DEFAULT_RTP, winChance: DEFAULT_WIN_CHANCE, isCustomized: false }
            : g
        ));
        setTimeout(() => setShowModal(false), 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Erro ao resetar configurações' });
      }
    } catch (err) {
      console.error('Erro:', err);
      setMessage({ type: 'error', text: 'Erro de conexão. Tente novamente.' });
    } finally {
      setSaving(false);
    }
  }

  const filteredGames = games.filter(game =>
    game.gameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.gameCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGameIcon = (code: string) => gameIcons[code] || '🎰';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                <span className="text-xl">🎰</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">{agent?.name}</h1>
                <p className="text-xs text-slate-400">{agent?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-700/50 rounded-xl px-6 py-3 border border-slate-600">
              <span className="text-2xl">🎰</span>
              <div className="text-right">
                <p className="text-xs text-slate-400">Créditos de Spin</p>
                <p className={`text-2xl font-bold ${Number(agent?.spinCredits) > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {Math.floor(Number(agent?.spinCredits || 0))} créditos
                </p>
              </div>
            </div>

            <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg bg-slate-700 hover:bg-red-600/20 hover:text-red-400 border border-slate-600 hover:border-red-500/50 px-4 py-2 text-sm text-slate-300 transition">
              <span>🚪</span> Sair
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-slate-700/50 bg-slate-800/30">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex gap-1">
            <Link href="/dashboard" className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition">📊 Dashboard</Link>
            <Link href="/dashboard/games" className="px-4 py-3 text-sm font-medium text-emerald-400 border-b-2 border-emerald-400">🎮 Jogos</Link>
            <Link href="/dashboard/transactions" className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition">📋 Transações</Link>
            <Link href="/dashboard/integration" className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition">🔗 Integração</Link>
            <Link href="/dashboard/settings" className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition">⚙️ Configurações</Link>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Configurações dos Jogos</h2>
            <p className="text-slate-400 text-sm mt-1">Defina o RTP e Chance de Vitória para cada jogo</p>
          </div>
          <div className="relative">
            <input type="text" placeholder="Buscar jogos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-lg bg-slate-800 border border-slate-600 pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none w-64" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
          </div>
        </div>

        {/* Painel Explicativo */}
        <div className="mb-8 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-slate-900/50 p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            📚 Entenda RTP e Chance de Vitória
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* RTP Explicação */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💰</span>
                <h4 className="font-semibold text-blue-400">RTP (Return to Player)</h4>
              </div>
              <p className="text-sm text-slate-300 mb-3">
                É a porcentagem que <strong>volta para os jogadores</strong> ao longo do tempo.
                O resto fica com você (a casa).
              </p>
              <div className="bg-slate-900/50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">RTP 90%:</span>
                  <span className="text-emerald-400 font-medium">Você fica com 10% → R$10 a cada R$100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">RTP 96%:</span>
                  <span className="text-yellow-400 font-medium">Você fica com 4% → R$4 a cada R$100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">RTP 50%:</span>
                  <span className="text-red-400 font-medium">Você fica com 50% → R$50 a cada R$100</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                💡 RTP menor = mais lucro para você, mas jogadores podem perceber e sair
              </p>
            </div>

            {/* Win Chance Explicação */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎯</span>
                <h4 className="font-semibold text-emerald-400">Chance de Vitória (Win Rate)</h4>
              </div>
              <p className="text-sm text-slate-300 mb-3">
                É a <strong>frequência</strong> com que o jogador ganha. Não afeta seu lucro final,
                mas sim a <strong>experiência</strong> do jogador.
              </p>
              <div className="bg-slate-900/50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Win 50%:</span>
                  <span className="text-emerald-400">Muitas vitórias pequenas → jogador engajado</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Win 20%:</span>
                  <span className="text-yellow-400">Vitórias médias → equilíbrio</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Win 5%:</span>
                  <span className="text-red-400">Poucos BIG WINS → jogador pode desistir rápido</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                💡 Win Chance alto mantém o jogador jogando mais tempo = mais depósitos
              </p>
            </div>
          </div>

          {/* Exemplo Prático */}
          <div className="mt-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-4 border border-blue-500/30">
            <h4 className="font-semibold text-white mb-2">📊 Exemplo Prático: Jogador deposita R$100 e faz 100 spins</h4>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-emerald-400 font-medium mb-1">Cenário A: RTP 90%, Win 50%</p>
                <ul className="text-slate-300 space-y-1">
                  <li>• ~50 spins ganham algo</li>
                  <li>• Prêmio médio: R$1.80 por vitória</li>
                  <li>• Jogador ganha R$90 total</li>
                  <li>• <strong className="text-emerald-400">Seu lucro: R$10</strong></li>
                </ul>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-yellow-400 font-medium mb-1">Cenário B: RTP 90%, Win 10%</p>
                <ul className="text-slate-300 space-y-1">
                  <li>• ~10 spins ganham algo</li>
                  <li>• Prêmio médio: R$9.00 por vitória</li>
                  <li>• Jogador ganha R$90 total</li>
                  <li>• <strong className="text-emerald-400">Seu lucro: R$10</strong></li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">
              ⚠️ Mesmo lucro nos dois cenários! A diferença é: no Cenário A o jogador fica mais tempo jogando (pode fazer novos depósitos).
            </p>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game) => (
            <div key={game.gameCode} className="rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition hover:border-emerald-500/50">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center text-3xl">{getGameIcon(game.gameCode)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{game.gameName}</h3>
                      <code className="text-xs text-slate-400">{game.gameCode}</code>
                    </div>
                    <button onClick={() => openSettings(game)} className="p-2 rounded-lg bg-slate-700 hover:bg-emerald-600/20 text-slate-400 hover:text-emerald-400 border border-slate-600 hover:border-emerald-500/50 transition" title="Configurações">⚙️</button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-slate-500">RTP</p>
                      {game.isCustomized && <span className="text-[10px] text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded">CUSTOM</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${Math.min(game.rtp, 100)}%` }} />
                      </div>
                      <span className="text-sm font-bold text-blue-400">{Number(game.rtp).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Chance de Vitória</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${Math.min(game.winChance * 1.67, 100)}%` }} />
                      </div>
                      <span className="text-sm font-bold text-emerald-400">{game.winChance}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl mb-4 block">🎮</span>
            <p className="text-slate-400">Nenhum jogo encontrado</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl my-4">
            <div className="flex items-center justify-between p-5 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center text-2xl">{getGameIcon(selectedGame.gameCode)}</div>
                <div>
                  <h3 className="font-semibold text-white">{selectedGame.gameName}</h3>
                  <p className="text-xs text-slate-400">Configurações do jogo</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition">✕</button>
            </div>

            <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* RTP */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <label className="text-sm font-medium text-white">RTP (Return to Player)</label>
                    <p className="text-xs text-slate-500">Quanto volta para os jogadores</p>
                  </div>
                  <span className="text-lg font-bold text-blue-400">{editRtp.toFixed(1)}%</span>
                </div>
                <input type="range" min="0" max="99" step="0.5" value={editRtp} onChange={(e) => setEditRtp(parseFloat(e.target.value))} className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500" />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0% (100% lucro)</span>
                  <span>99% (1% lucro)</span>
                </div>
              </div>

              {/* Win Chance */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <label className="text-sm font-medium text-white">Chance de Vitória</label>
                    <p className="text-xs text-slate-500">Frequência de ganhos por spin</p>
                  </div>
                  <span className="text-lg font-bold text-emerald-400">{editWinChance}%</span>
                </div>
                <input type="range" min="0" max="99" step="1" value={editWinChance} onChange={(e) => setEditWinChance(parseInt(e.target.value))} className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-emerald-500" />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0% (nunca ganha)</span>
                  <span>99% (sempre ganha)</span>
                </div>
              </div>

              {/* Calculadora de Receita Melhorada */}
              {(() => {
                const depositoExemplo = 100;
                const houseEdge = 100 - editRtp;
                const lucroTeorico = depositoExemplo * (houseEdge / 100);
                
                // Cálculo mais realista de prêmio médio por vitória
                const totalRetorno = depositoExemplo * (editRtp / 100);
                const spinsMedios = 100; // Considerando 100 spins por R$100
                const vitoriasEsperadas = Math.max(1, Math.round(spinsMedios * (editWinChance / 100)));
                const premioMedioPorVitoria = totalRetorno / vitoriasEsperadas;
                
                // Determinar tipo de experiência
                let tipoExperiencia = '';
                let corExperiencia = '';
                if (editWinChance >= 40) {
                  tipoExperiencia = 'Muitas vitórias pequenas';
                  corExperiencia = 'text-emerald-400';
                } else if (editWinChance >= 20) {
                  tipoExperiencia = 'Vitórias moderadas';
                  corExperiencia = 'text-yellow-400';
                } else if (editWinChance >= 5) {
                  tipoExperiencia = 'Poucas vitórias grandes (BIG WINS)';
                  corExperiencia = 'text-orange-400';
                } else {
                  tipoExperiencia = 'Raramente ganha (extremo)';
                  corExperiencia = 'text-red-400';
                }

                // Classificar a configuração
                let statusConfig = '';
                let statusCor = '';
                let statusBg = '';
                
                if (editRtp >= 95 && editWinChance >= 40) {
                  statusConfig = '⚠️ Lucro baixo, jogador muito beneficiado';
                  statusCor = 'text-red-300';
                  statusBg = 'bg-red-500/20 border-red-500/30';
                } else if (editRtp <= 70) {
                  statusConfig = '💰 Lucro alto! Cuidado: jogadores podem perceber e sair';
                  statusCor = 'text-amber-300';
                  statusBg = 'bg-amber-500/20 border-amber-500/30';
                } else if (editWinChance <= 10) {
                  statusConfig = '⚠️ Vitórias raras podem frustrar jogadores rapidamente';
                  statusCor = 'text-orange-300';
                  statusBg = 'bg-orange-500/20 border-orange-500/30';
                } else if (editRtp >= 85 && editRtp <= 93 && editWinChance >= 25 && editWinChance <= 50) {
                  statusConfig = '✅ Configuração equilibrada - bom lucro e boa experiência';
                  statusCor = 'text-emerald-300';
                  statusBg = 'bg-emerald-500/20 border-emerald-500/30';
                } else {
                  statusConfig = '📊 Configuração personalizada';
                  statusCor = 'text-blue-300';
                  statusBg = 'bg-blue-500/20 border-blue-500/30';
                }

                return (
                  <div className="space-y-4">
                    {/* Resumo Principal */}
                    <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-xl p-4 border border-slate-600">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        💰 Simulação: Jogador deposita R$ {depositoExemplo}
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                          <p className="text-xs text-slate-500 mb-1">Seu Lucro</p>
                          <p className={`text-2xl font-bold ${houseEdge >= 10 ? 'text-emerald-400' : houseEdge >= 5 ? 'text-yellow-400' : 'text-red-400'}`}>
                            R$ {lucroTeorico.toFixed(2)}
                          </p>
                          <p className="text-xs text-slate-500">({houseEdge.toFixed(1)}% do depósito)</p>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                          <p className="text-xs text-slate-500 mb-1">Jogador Recebe</p>
                          <p className="text-2xl font-bold text-blue-400">R$ {totalRetorno.toFixed(2)}</p>
                          <p className="text-xs text-slate-500">(RTP {editRtp.toFixed(1)}%)</p>
                        </div>
                      </div>
                    </div>

                    {/* Experiência do Jogador */}
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                      <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                        🎯 Como o jogador vai experienciar
                      </h4>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Em 100 spins, ele ganha:</span>
                          <span className="text-white font-medium">~{vitoriasEsperadas} vezes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Prêmio médio por vitória:</span>
                          <span className="text-white font-medium">R$ {premioMedioPorVitoria.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Tipo de experiência:</span>
                          <span className={`font-medium ${corExperiencia}`}>{tipoExperiencia}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status da Configuração */}
                    <div className={`rounded-lg p-3 border ${statusBg}`}>
                      <p className={`text-sm ${statusCor}`}>{statusConfig}</p>
                    </div>
                  </div>
                );
              })()}

              {message && (
                <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300' : 'bg-red-500/20 border border-red-500/50 text-red-300'}`}>
                  {message.type === 'success' ? '✓' : '✕'} {message.text}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-5 border-t border-slate-700">
              <button onClick={handleResetSettings} disabled={saving || !selectedGame.isCustomized} className="px-4 py-2 rounded-lg border border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm">Resetar padrão</button>
              <div className="flex gap-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition text-sm">Cancelar</button>
                <button onClick={handleSaveSettings} disabled={saving} className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium disabled:opacity-50 transition text-sm flex items-center gap-2">
                  {saving ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Salvando...</> : <>💾 Salvar</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
