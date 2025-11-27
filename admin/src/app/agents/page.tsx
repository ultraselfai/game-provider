'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { AGENT_API, ADMIN_API, ADMIN_KEY } from '@/lib/config';

interface Agent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  apiKey: string;
  balance: number;
  spinCredits: number;
  totalCreditsPurchased: number;
  totalSpinsConsumed: number;
  creditPrice: number;
  ggrRate: number;
  allowedGames: string[];
  isActive: boolean;
  useLocalBalance: boolean;
  totalDeposited: number;
  totalWagered: number;
  totalWon: number;
  createdAt: string;
  lastLoginAt?: string;
}

interface Game {
  id: string;
  gameCode: string;
  gameName: string;
  provider: string;
  rtp: number;
  volatility: string;
  isActive: boolean;
}

interface AgentTransaction {
  id: string;
  type: string;
  amount: number;
  previousBalance: number;
  newBalance: number;
  description?: string;
  reference?: string;
  createdBy?: string;
  createdAt: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreditModal, setShowCreditModal] = useState<Agent | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState<Agent | null>(null);
  const [showGamesModal, setShowGamesModal] = useState<Agent | null>(null);

  const fetchAgents = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(`${AGENT_API}/agents`, {
        headers: { 'x-admin-key': ADMIN_KEY },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setAgents(data.data);
      } else if (Array.isArray(data.data)) {
        setAgents(data.data);
      } else if (Array.isArray(data)) {
        setAgents(data);
      } else {
        setError('Falha ao carregar agentes');
      }
    } catch {
      setError('Erro de conexão com a API');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const totalCredits = agents.reduce((sum, a) => sum + Number(a.spinCredits || 0), 0);
  const activeAgents = agents.filter(a => a.isActive).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <AdminHeader />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Agentes</h2>
            <p className="text-slate-400 text-sm mt-1">Gerencie seus agentes, créditos de spin e jogos liberados</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/20"
          >
            <span>➕</span> Novo Agente
          </button>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-emerald-500/30 bg-linear-to-br from-emerald-500/20 to-emerald-600/10 p-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👥</span>
              <div>
                <p className="text-sm text-slate-400">Total Agentes</p>
                <p className="text-2xl font-bold text-white">{agents.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-blue-500/30 bg-linear-to-br from-blue-500/20 to-blue-600/10 p-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="text-sm text-slate-400">Ativos</p>
                <p className="text-2xl font-bold text-white">{activeAgents}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-linear-to-br from-amber-500/20 to-amber-600/10 p-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎰</span>
              <div>
                <p className="text-sm text-slate-400">Total Spins Disponíveis</p>
                <p className="text-2xl font-bold text-white">
                  {totalCredits.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/20 border border-red-500/50 p-4 text-red-300 flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          </div>
        ) : (
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800">
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Agente</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Contato</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-slate-300">Spins</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-slate-300">Jogos</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-slate-300">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-slate-300">Ações</th>
                </tr>
              </thead>
              <tbody>
                {agents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl">👤</span>
                        <p>Nenhum agente cadastrado</p>
                        <button
                          onClick={() => setShowCreateModal(true)}
                          className="mt-2 text-emerald-400 hover:text-emerald-300"
                        >
                          Criar primeiro agente →
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  agents.map((agent) => (
                    <tr key={agent.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-linear-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold">
                            {agent.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-white">{agent.name}</p>
                            <code className="text-xs text-slate-500">{agent.apiKey.slice(0, 16)}...</code>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-300">{agent.email}</p>
                        {agent.phone && <p className="text-xs text-slate-500">{agent.phone}</p>}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className={`text-lg font-bold ${Number(agent.spinCredits) > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                          🎰 {Number(agent.spinCredits || 0).toLocaleString('pt-BR')}
                        </p>
                        <p className="text-xs text-slate-500">
                          Usados: {Number(agent.totalSpinsConsumed || 0).toLocaleString('pt-BR')}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          agent.allowedGames?.length === 0
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-purple-500/20 text-purple-300'
                        }`}>
                          {agent.allowedGames?.length === 0 ? '🎮 Todos' : `🎮 ${agent.allowedGames?.length}`}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                          agent.isActive
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${agent.isActive ? 'bg-emerald-400' : 'bg-red-400'}`} />
                          {agent.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setShowGamesModal(agent)}
                            className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-500 transition"
                            title="Gerenciar Jogos"
                          >
                            🎮 Jogos
                          </button>
                          <button
                            onClick={() => setShowCreditModal(agent)}
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-500 transition"
                            title="Adicionar Crédito"
                          >
                            🎰 Spins
                          </button>
                          <button
                            onClick={() => setShowDetailsModal(agent)}
                            className="rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-600 transition"
                            title="Ver Detalhes"
                          >
                            👁️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateAgentModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            setShowCreateModal(false);
            fetchAgents();
          }}
        />
      )}

      {/* Credit Modal */}
      {showCreditModal && (
        <CreditModal
          agent={showCreditModal}
          onClose={() => setShowCreditModal(null)}
          onUpdated={() => {
            setShowCreditModal(null);
            fetchAgents();
          }}
        />
      )}

      {/* Details Modal */}
      {showDetailsModal && (
        <AgentDetailsModal
          agent={showDetailsModal}
          onClose={() => setShowDetailsModal(null)}
        />
      )}

      {/* Games Modal */}
      {showGamesModal && (
        <GamesModal
          agent={showGamesModal}
          onClose={() => setShowGamesModal(null)}
          onUpdated={() => {
            setShowGamesModal(null);
            fetchAgents();
          }}
        />
      )}
    </div>
  );
}

// =====================================================
// MODAL: Criar Agente
// =====================================================
function CreateAgentModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [ggrRate, setGgrRate] = useState('10');
  const [initialBalance, setInitialBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ apiKey: string; apiSecret: string; id: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${AGENT_API}/agents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY,
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone: phone || undefined,
          ggrRate: Number(ggrRate),
          initialBalance: initialBalance ? Number(initialBalance) : 0,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setResult({
          id: data.data.id,
          apiKey: data.data.apiKey,
          apiSecret: data.data.apiSecret,
        });
      } else {
        setError(data.message || 'Erro ao criar agente');
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {result ? (
          <>
            <div className="mb-4 flex items-center gap-2 text-emerald-400">
              <span className="text-2xl">✅</span>
              <h3 className="text-lg font-semibold">Agente Criado com Sucesso!</h3>
            </div>
            <div className="mb-4 rounded-lg bg-amber-500/20 border border-amber-500/50 p-3">
              <p className="text-sm text-amber-300">
                ⚠️ <strong>IMPORTANTE:</strong> Guarde o API Secret abaixo. Ele <strong>NÃO</strong> será mostrado novamente!
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium">API Key</label>
                <div className="mt-1 flex gap-2">
                  <input
                    readOnly
                    value={result.apiKey}
                    className="flex-1 rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm text-emerald-400 font-mono"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(result.apiKey)}
                    className="rounded-lg bg-slate-700 px-3 py-2 text-slate-300 hover:bg-slate-600 transition"
                  >
                    📋
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium">API Secret</label>
                <div className="mt-1 flex gap-2">
                  <input
                    readOnly
                    value={result.apiSecret}
                    className="flex-1 rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm text-amber-400 font-mono"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(result.apiSecret)}
                    className="rounded-lg bg-slate-700 px-3 py-2 text-slate-300 hover:bg-slate-600 transition"
                  >
                    📋
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={onCreated}
              className="mt-6 w-full rounded-lg bg-emerald-600 py-2.5 font-medium text-white hover:bg-emerald-500 transition"
            >
              Entendi, salvei as credenciais
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Novo Agente</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition">
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-sm text-slate-300 font-medium">Nome *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Casa de Apostas XYZ"
                      className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2.5 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 font-medium">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="agente@email.com"
                      className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2.5 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 font-medium">Senha *</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2.5 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 font-medium">Telefone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2.5 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 font-medium">Taxa GGR (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={ggrRate}
                      onChange={(e) => setGgrRate(e.target.value)}
                      className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2.5 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm text-slate-300 font-medium">Saldo Inicial (R$)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={initialBalance}
                      onChange={(e) => setInitialBalance(e.target.value)}
                      placeholder="0.00 (opcional)"
                      className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2.5 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-300">
                  ⚠️ {error}
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-slate-600 py-2.5 text-slate-300 hover:bg-slate-700 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-emerald-600 py-2.5 font-medium text-white hover:bg-emerald-500 transition disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Criando...
                    </span>
                  ) : (
                    'Criar Agente'
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// =====================================================
// MODAL: Adicionar/Remover Créditos de Spin
// =====================================================
function CreditModal({
  agent,
  onClose,
  onUpdated,
}: {
  agent: Agent;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [credits, setCredits] = useState('');
  const [description, setDescription] = useState('');
  const [operation, setOperation] = useState<'add' | 'remove'>('add');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const quickAmounts = [100, 500, 1000, 5000, 10000];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const endpoint = operation === 'add' ? 'credits' : 'debit';

    try {
      const res = await fetch(`${AGENT_API}/agents/${agent.id}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY,
        },
        body: JSON.stringify({
          credits: Number(credits),
          description: description || undefined,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(data.message);
        setTimeout(() => {
          onUpdated();
        }, 1500);
      } else {
        setError(data.message || 'Erro na operação');
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Gerenciar Spins</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            ✕
          </button>
        </div>

        {/* Agent Info */}
        <div className="mb-6 rounded-lg bg-slate-700/50 p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-linear-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              {agent.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-white">{agent.name}</p>
              <p className="text-sm text-slate-400">
                Spins disponíveis: <span className="text-emerald-400 font-semibold">🎰 {Number(agent.spinCredits || 0).toLocaleString('pt-BR')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Operation Toggle */}
        <div className="mb-4 flex rounded-lg bg-slate-900 p-1">
          <button
            type="button"
            onClick={() => setOperation('add')}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
              operation === 'add'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ➕ Adicionar
          </button>
          <button
            type="button"
            onClick={() => setOperation('remove')}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
              operation === 'remove'
                ? 'bg-red-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ➖ Remover
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-300 font-medium">Quantidade de Spins *</label>
              <input
                type="number"
                required
                min="1"
                step="1"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                placeholder="0"
                className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-3 text-xl text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-center font-bold"
              />
              <p className="mt-1 text-xs text-slate-500 text-center">1 spin = 1 jogada do jogador</p>
            </div>

            {/* Quick Amount Buttons */}
            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setCredits(val.toString())}
                  className="rounded-lg bg-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-600 transition"
                >
                  🎰 {val.toLocaleString('pt-BR')}
                </button>
              ))}
            </div>

            <div>
              <label className="text-sm text-slate-300 font-medium">Descrição</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Compra via PIX #12345"
                className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2.5 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-300">
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="mt-4 rounded-lg bg-emerald-500/20 border border-emerald-500/50 p-3 text-sm text-emerald-300">
              ✅ {success}
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-600 py-2.5 text-slate-300 hover:bg-slate-700 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !credits}
              className={`flex-1 rounded-lg py-2.5 font-medium text-white transition disabled:opacity-50 ${
                operation === 'add'
                  ? 'bg-emerald-600 hover:bg-emerald-500'
                  : 'bg-red-600 hover:bg-red-500'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processando...
                </span>
              ) : operation === 'add' ? (
                `Adicionar ${credits || '0'} spins`
              ) : (
                `Remover ${credits || '0'} spins`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =====================================================
// MODAL: Detalhes do Agente
// =====================================================
function AgentDetailsModal({
  agent,
  onClose,
}: {
  agent: Agent;
  onClose: () => void;
}) {
  const [transactions, setTransactions] = useState<AgentTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, [agent.id]);

  async function fetchTransactions() {
    try {
      const res = await fetch(`${AGENT_API}/agents/${agent.id}/transactions`, {
        headers: { 'x-admin-key': ADMIN_KEY },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setTransactions(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Detalhes do Agente</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            ✕
          </button>
        </div>

        {/* Agent Header */}
        <div className="mb-6 rounded-lg bg-slate-700/50 p-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-linear-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl">
              {agent.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-white">{agent.name}</h4>
              <p className="text-slate-400">{agent.email}</p>
              {agent.phone && <p className="text-sm text-slate-500">{agent.phone}</p>}
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Saldo</p>
              <p className="text-2xl font-bold text-emerald-400">
                R$ {Number(agent.balance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-4 gap-3">
          <div className="rounded-lg bg-slate-700/30 p-3 text-center">
            <p className="text-xs text-slate-400">GGR Rate</p>
            <p className="text-lg font-bold text-purple-400">{agent.ggrRate}%</p>
          </div>
          <div className="rounded-lg bg-slate-700/30 p-3 text-center">
            <p className="text-xs text-slate-400">Total Depositado</p>
            <p className="text-lg font-bold text-emerald-400">R$ {Number(agent.totalDeposited).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="rounded-lg bg-slate-700/30 p-3 text-center">
            <p className="text-xs text-slate-400">Total Apostado</p>
            <p className="text-lg font-bold text-blue-400">R$ {Number(agent.totalWagered).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="rounded-lg bg-slate-700/30 p-3 text-center">
            <p className="text-xs text-slate-400">Total Ganho</p>
            <p className="text-lg font-bold text-amber-400">R$ {Number(agent.totalWon).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* API Key */}
        <div className="mb-6">
          <label className="text-xs text-slate-400 font-medium">API Key</label>
          <div className="mt-1 flex gap-2">
            <input
              readOnly
              value={agent.apiKey}
              className="flex-1 rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm text-emerald-400 font-mono"
            />
            <button
              onClick={() => copyToClipboard(agent.apiKey, 'apiKey')}
              className="rounded-lg bg-slate-700 px-3 py-2 text-slate-300 hover:bg-slate-600 transition"
            >
              {copiedKey === 'apiKey' ? '✅' : '📋'}
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <h5 className="text-sm font-medium text-slate-300 mb-3">Últimas Transações</h5>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              Nenhuma transação encontrada
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {transactions.slice(0, 10).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between rounded-lg bg-slate-700/30 p-3">
                  <div className="flex items-center gap-3">
                    <span className={`text-lg ${tx.type.includes('DEPOSIT') || tx.type.includes('WIN') ? '💰' : tx.type.includes('GGR') ? '📊' : '💸'}`}>
                      {tx.type.includes('DEPOSIT') || tx.type.includes('WIN') ? '💰' : tx.type.includes('GGR') ? '📊' : '💸'}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">{tx.type.replace(/_/g, ' ')}</p>
                      <p className="text-xs text-slate-500">{tx.description || '-'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${Number(tx.amount) > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {Number(tx.amount) > 0 ? '+' : ''}R$ {Number(tx.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(tx.createdAt).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-slate-700 py-2.5 font-medium text-white hover:bg-slate-600 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

// =====================================================
// MODAL: Gerenciar Jogos do Agente
// =====================================================
function GamesModal({
  agent,
  onClose,
  onUpdated,
}: {
  agent: Agent;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [selectedGames, setSelectedGames] = useState<string[]>(agent.allowedGames || []);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectAll, setSelectAll] = useState(agent.allowedGames?.length === 0);

  useEffect(() => {
    fetchGames();
  }, []);

  async function fetchGames() {
    try {
      const res = await fetch(`${ADMIN_API}/games`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setAllGames(data);
      } else if (data.success && Array.isArray(data.data)) {
        setAllGames(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch games:', err);
      setError('Erro ao carregar jogos');
    } finally {
      setLoading(false);
    }
  }

  function toggleGame(gameCode: string) {
    if (selectAll) {
      // Se "todos" está selecionado, mudar para seleção específica
      setSelectAll(false);
      setSelectedGames([gameCode]);
    } else {
      setSelectedGames(prev => 
        prev.includes(gameCode)
          ? prev.filter(g => g !== gameCode)
          : [...prev, gameCode]
      );
    }
  }

  function handleSelectAll(checked: boolean) {
    setSelectAll(checked);
    if (checked) {
      setSelectedGames([]);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Se "todos" está marcado, enviar array vazio (significa todos liberados)
      const gamesToSave = selectAll ? [] : selectedGames;

      const res = await fetch(`${AGENT_API}/agents/${agent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY,
        },
        body: JSON.stringify({
          allowedGames: gamesToSave,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(selectAll 
          ? 'Todos os jogos liberados!' 
          : `${selectedGames.length} jogo(s) liberado(s)!`
        );
        setTimeout(() => {
          onUpdated();
        }, 1500);
      } else {
        setError(data.message || 'Erro ao salvar');
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Gerenciar Jogos</h3>
            <p className="text-sm text-slate-400">Selecione quais jogos {agent.name} pode acessar</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            ✕
          </button>
        </div>

        {/* Agent Info */}
        <div className="mb-6 rounded-lg bg-slate-700/50 p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-linear-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              {agent.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-white">{agent.name}</p>
              <p className="text-sm text-slate-400">
                Jogos liberados: {' '}
                <span className="text-emerald-400 font-semibold">
                  {agent.allowedGames?.length === 0 ? 'Todos' : agent.allowedGames?.length || 0}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Select All Toggle */}
        <div className="mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
            />
            <div>
              <p className="font-medium text-white">🎮 Liberar todos os jogos</p>
              <p className="text-xs text-slate-400">O agente terá acesso a todos os jogos disponíveis, incluindo novos</p>
            </div>
          </label>
        </div>

        {!selectAll && (
          <>
            {/* Games Grid */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-slate-300">
                  Selecione os jogos específicos ({selectedGames.length} selecionado{selectedGames.length !== 1 ? 's' : ''})
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedGames(allGames.map(g => g.gameCode))}
                    className="text-xs text-emerald-400 hover:text-emerald-300"
                  >
                    Selecionar todos
                  </button>
                  <span className="text-slate-600">|</span>
                  <button
                    type="button"
                    onClick={() => setSelectedGames([])}
                    className="text-xs text-slate-400 hover:text-slate-300"
                  >
                    Limpar seleção
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto p-1">
                  {allGames.map((game) => (
                    <label
                      key={game.gameCode}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                        selectedGames.includes(game.gameCode)
                          ? 'bg-emerald-500/20 border border-emerald-500/50'
                          : 'bg-slate-700/30 border border-transparent hover:bg-slate-700/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedGames.includes(game.gameCode)}
                        onChange={() => toggleGame(game.gameCode)}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{game.gameName}</p>
                        <p className="text-xs text-slate-500">{game.provider} • RTP {game.rtp}%</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-300">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg bg-emerald-500/20 border border-emerald-500/50 p-3 text-sm text-emerald-300">
            ✅ {success}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-600 py-2.5 text-slate-300 hover:bg-slate-700 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving || (!selectAll && selectedGames.length === 0)}
            className="flex-1 rounded-lg bg-emerald-600 py-2.5 font-medium text-white hover:bg-emerald-500 transition disabled:opacity-50"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Salvando...
              </span>
            ) : (
              'Salvar Alterações'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
