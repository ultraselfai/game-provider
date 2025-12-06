'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { ADMIN_API } from '@/lib/config';

interface GameSettings {
  id: string;
  gameCode: string;
  gameName: string;
  isActive: boolean;
  rtp: number;
  volatility: string;
  minBet: number;
  maxBet: number;
  defaultBet: number;
  betSizes: number[];
  winChance: number;
  loseChance: number;
  hasFreeSpin: boolean;
  hasBonusGame: boolean;
  hasJackpot: boolean;
  provider: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

// Game icons mapping
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
  const [games, setGames] = useState<GameSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingGame, setEditingGame] = useState<GameSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchGames();
  }, []);

  async function fetchGames() {
    try {
      setLoading(true);
      const res = await fetch(`${ADMIN_API}/games`);
      if (res.ok) {
        const data = await res.json();
        setGames(Array.isArray(data) ? data : []);
      } else {
        setError('Erro ao carregar jogos');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveGameSettings(gameCode: string, updates: Partial<GameSettings>) {
    try {
      setSaving(true);
      const res = await fetch(`${ADMIN_API}/games/${gameCode}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        const updatedGame = await res.json();
        setGames(games.map(g => g.gameCode === gameCode ? updatedGame : g));
        setEditingGame(null);
        return true;
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Erro ao salvar');
        return false;
      }
    } catch (err) {
      setError('Erro ao salvar configurações');
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function toggleGameStatus(game: GameSettings) {
    await saveGameSettings(game.gameCode, { isActive: !game.isActive });
  }

  const volatilityColors = {
    low: 'text-emerald-400 bg-emerald-500/20',
    medium: 'text-amber-400 bg-amber-500/20',
    high: 'text-red-400 bg-red-500/20',
  };

  const getGameIcon = (code: string) => gameIcons[code] || '🎰';

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <AdminHeader />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Gerenciamento de Games</h2>
          <button
            onClick={fetchGames}
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-600 transition"
          >
            🔄 Atualizar
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/20 border border-red-500/50 p-4 text-red-300 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Games Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-sm text-slate-400">Total de Games</p>
            <p className="text-2xl font-bold text-white">{games.length}</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-sm text-slate-400">Games Ativos</p>
            <p className="text-2xl font-bold text-emerald-400">{games.filter(g => g.isActive).length}</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-sm text-slate-400">Com Free Spin</p>
            <p className="text-2xl font-bold text-purple-400">{games.filter(g => g.hasFreeSpin).length}</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-sm text-slate-400">Com Jackpot</p>
            <p className="text-2xl font-bold text-amber-400">{games.filter(g => g.hasJackpot).length}</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <div
                key={game.id}
                className={`rounded-xl border bg-slate-800/50 p-6 transition ${
                  game.isActive ? 'border-slate-700' : 'border-red-500/30 bg-slate-800/30'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{getGameIcon(game.gameCode)}</span>
                    <div>
                      <h3 className="font-semibold text-white">{game.gameName}</h3>
                      <p className="text-sm text-slate-400">{game.provider || 'PGSoft'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleGameStatus(game)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      game.isActive
                        ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    }`}
                  >
                    {game.isActive ? 'Ativo' : 'Inativo'}
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Código</span>
                    <code className="rounded bg-slate-700 px-2 py-1 text-xs text-emerald-400">
                      {game.gameCode}
                    </code>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Volatilidade</span>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${volatilityColors[game.volatility as keyof typeof volatilityColors] || volatilityColors.medium}`}>
                      {game.volatility === 'low' ? 'Baixa' : game.volatility === 'medium' ? 'Média' : 'Alta'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Apostas</span>
                    <span className="text-slate-300 text-sm">
                      R$ {Number(game.minBet).toFixed(2)} - R$ {Number(game.maxBet).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Aposta Padrão</span>
                    <span className="text-emerald-400 font-medium">R$ {Number(game.defaultBet).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700 flex gap-2">
                  <button className="flex-1 rounded-lg border border-slate-600 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 transition">
                    📊 Estatísticas
                  </button>
                  <button 
                    onClick={() => setEditingGame(game)}
                    className="flex-1 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition"
                  >
                    ⚙️ Configurar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Edit Game Modal */}
      {editingGame && (
        <EditGameModal
          game={editingGame}
          onClose={() => setEditingGame(null)}
          onSave={saveGameSettings}
          saving={saving}
        />
      )}
    </div>
  );
}

function EditGameModal({
  game,
  onClose,
  onSave,
  saving,
}: {
  game: GameSettings;
  onClose: () => void;
  onSave: (gameCode: string, updates: Partial<GameSettings>) => Promise<boolean>;
  saving: boolean;
}) {
  const [minBet, setMinBet] = useState(Number(game.minBet));
  const [maxBet, setMaxBet] = useState(Number(game.maxBet));
  const [defaultBet, setDefaultBet] = useState(Number(game.defaultBet));
  const [volatility, setVolatility] = useState(game.volatility);
  const [betSizesText, setBetSizesText] = useState((game.betSizes || []).join(', '));

  const handleSave = async () => {
    const betSizes = betSizesText.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    
    const updates: Partial<GameSettings> = {
      minBet,
      maxBet,
      defaultBet,
      volatility,
      betSizes,
    };

    await onSave(game.gameCode, updates);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            ⚙️ Configurar - {game.gameName}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">✕</button>
        </div>

        <div className="space-y-5">
          {/* Info sobre RTP/WinChance */}
          <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/50">
            <p className="text-sm text-purple-300">
              ℹ️ <strong>RTP e Chance de Vitória</strong> são configurados por cada <strong>Agente</strong> no painel deles.
              Aqui você configura apenas as regras de apostas.
            </p>
          </div>

          {/* Volatility */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">Volatilidade</label>
            <select
              value={volatility}
              onChange={(e) => setVolatility(e.target.value)}
              className="w-full rounded-lg bg-slate-700 border border-slate-600 px-3 py-2 text-white"
            >
              <option value="low">Baixa - Ganhos frequentes e pequenos</option>
              <option value="medium">Média - Balanceado</option>
              <option value="high">Alta - Ganhos raros e grandes</option>
            </select>
          </div>

          {/* Min/Max Bet */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-2">Aposta Mínima</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={minBet}
                onChange={(e) => setMinBet(parseFloat(e.target.value) || 0.01)}
                className="w-full rounded-lg bg-slate-700 border border-slate-600 px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">Aposta Máxima</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={maxBet}
                onChange={(e) => setMaxBet(parseFloat(e.target.value) || 1)}
                className="w-full rounded-lg bg-slate-700 border border-slate-600 px-3 py-2 text-white"
              />
            </div>
          </div>

          {/* Default Bet */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">Aposta Padrão (Inicial)</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={defaultBet}
              onChange={(e) => setDefaultBet(parseFloat(e.target.value) || 0.01)}
              className="w-full rounded-lg bg-slate-700 border border-slate-600 px-3 py-2 text-white"
            />
          </div>

          {/* Bet Sizes */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">Valores de Aposta Disponíveis</label>
            <input
              type="text"
              value={betSizesText}
              onChange={(e) => setBetSizesText(e.target.value)}
              placeholder="1, 2, 5, 10, 20, 50"
              className="w-full rounded-lg bg-slate-700 border border-slate-600 px-3 py-2 text-white"
            />
            <p className="text-xs text-slate-500 mt-1">Separe os valores por vírgula</p>
          </div>
        </div>

        {/* Guia de Configuração */}
        <div className="mt-6 p-3 rounded-lg bg-blue-500/20 border border-blue-500/50">
          <p className="text-sm text-blue-300 font-medium mb-2">📋 Guia de Configuração (Fortune Ox/Tiger)</p>
          <ul className="text-xs text-blue-200 space-y-1">
            <li>• Para aposta mínima de <strong>R$10</strong>: coloque Aposta Mínima = <strong>10</strong></li>
            <li>• Para aposta inicial de <strong>R$10</strong>: coloque Aposta Padrão = <strong>2</strong></li>
            <li>• Em Valores Disponíveis, o primeiro valor <strong>1</strong> representa R$10</li>
          </ul>
        </div>

        {/* Warning */}
        <div className="mt-4 p-3 rounded-lg bg-amber-500/20 border border-amber-500/50">
          <p className="text-sm text-amber-300">
            ⚠️ Alterações serão aplicadas a novas sessões de jogo.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            disabled={saving}
            className="flex-1 rounded-lg border border-slate-600 py-2.5 text-slate-300 hover:bg-slate-700 transition disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 rounded-lg bg-emerald-600 py-2.5 font-medium text-white hover:bg-emerald-500 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Salvando...
              </>
            ) : (
              '💾 Salvar Configurações'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
