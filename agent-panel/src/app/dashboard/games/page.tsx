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

interface Game {
  id: string;
  gameCode: string;
  gameName: string;
  provider: string;
  category: string;
  rtp: number;
  volatility: string;
  isActive: boolean;
  thumbnail?: string;
}

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
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('agentToken');
    const agentData = localStorage.getItem('agentData');

    if (!token || !agentData) {
      router.push('/');
      return;
    }

    setAgent(JSON.parse(agentData));
    fetchGames(token);
  }, [router]);

  async function fetchGames(token: string) {
    try {
      const res = await fetch(`${AGENT_API}/games`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setGames(data.data || []);
      } else {
        // Fallback: buscar do admin endpoint se o agent endpoint não existir
        const adminRes = await fetch(`${API_BASE}/admin/games`);
        const adminData = await adminRes.json();
        setGames(Array.isArray(adminData) ? adminData : []);
      }
    } catch (err) {
      console.error('Erro ao carregar jogos:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('agentToken');
    localStorage.removeItem('agentData');
    router.push('/');
  }

  const filteredGames = games.filter(game =>
    game.gameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.gameCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGameIcon = (code: string) => gameIcons[code] || '🎰';

  const volatilityLabels: Record<string, { text: string; color: string }> = {
    low: { text: 'Baixa', color: 'text-emerald-400 bg-emerald-500/20' },
    medium: { text: 'Média', color: 'text-amber-400 bg-amber-500/20' },
    high: { text: 'Alta', color: 'text-red-400 bg-red-500/20' },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header com Saldo */}
      <header className="border-b border-slate-700 bg-slate-800/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
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
                  {Number(agent?.spinCredits || 0).toLocaleString('pt-BR')} créditos
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-slate-700 hover:bg-red-600/20 hover:text-red-400 border border-slate-600 hover:border-red-500/50 px-4 py-2 text-sm text-slate-300 transition"
            >
              <span>🚪</span>
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-slate-700/50 bg-slate-800/30">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex gap-1">
            <Link
              href="/dashboard"
              className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition"
            >
              📊 Dashboard
            </Link>
            <Link
              href="/dashboard/games"
              className="px-4 py-3 text-sm font-medium text-emerald-400 border-b-2 border-emerald-400"
            >
              🎮 Jogos
            </Link>
            <Link
              href="/dashboard/integration"
              className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition"
            >
              🔗 Integração
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Jogos Disponíveis</h2>
            <p className="text-slate-400 text-sm mt-1">
              {filteredGames.filter(g => g.isActive).length} jogos ativos disponíveis para sua bet
            </p>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar jogos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg bg-slate-800 border border-slate-600 pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none w-64"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game) => {
            const volInfo = volatilityLabels[game.volatility] || volatilityLabels.medium;
            
            return (
              <div
                key={game.id}
                className={`rounded-xl border bg-slate-800/50 p-5 transition hover:border-emerald-500/50 ${
                  game.isActive ? 'border-slate-700' : 'border-red-500/30 opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center text-3xl">
                    {getGameIcon(game.gameCode)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{game.gameName}</h3>
                        <p className="text-xs text-slate-400">{game.provider || 'PGSoft'}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        game.isActive
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {game.isActive ? '● Ativo' : '● Inativo'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-slate-500">RTP</p>
                    <p className="text-sm font-semibold text-blue-400">{Number(game.rtp).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Volatilidade</p>
                    <p className={`text-sm font-semibold ${volInfo.color.split(' ')[0]}`}>
                      {volInfo.text}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Código</p>
                    <code className="text-xs text-emerald-400">{game.gameCode}</code>
                  </div>
                </div>

                {game.isActive && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 rounded-lg p-2">
                      <span>✓</span>
                      <span>Disponível para integração</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl mb-4 block">🎮</span>
            <p className="text-slate-400">Nenhum jogo encontrado</p>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-medium text-amber-300">Como integrar os jogos?</h3>
              <p className="text-sm text-amber-200/70 mt-1">
                Acesse a aba <strong>Integração</strong> para obter suas credenciais de API e instruções 
                de como conectar estes jogos na sua plataforma bet.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
