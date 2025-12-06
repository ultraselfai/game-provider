'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AGENT_API } from '@/lib/config';

interface Agent {
  id: string;
  name: string;
  email: string;
  spinCredits: number;
}

interface Transaction {
  id: string;
  type: 'credit' | 'debit' | 'ggr_fee';
  amount: number;
  previousBalance: number;
  newBalance: number;
  description: string;
  reference: string;
  createdAt: string;
}

// Helper para formatar descrição conforme regras do usuário
function formatDescription(tx: Transaction): string {
  if (tx.type === 'credit') {
    return 'Saldo adicionado - Game Provider';
  }
  // Para débito: mostrar apenas "Slot debitado" ou nome do jogo se disponível
  return 'Slot debitado';
}

// Helper para formatar valor
function formatValue(tx: Transaction): string {
  if (tx.type === 'credit') {
    return `R$ ${Math.abs(Number(tx.amount)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  }
  // Para débito: sempre 1 crédito
  return '1';
}

export default function TransactionsPage() {
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtros
  const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit' | 'ggr_fee'>('all');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('agentToken');
    const agentData = localStorage.getItem('agentData');

    if (!token || !agentData) {
      router.push('/');
      return;
    }

    setAgent(JSON.parse(agentData));
    fetchTransactions(token);
  }, [router]);

  async function fetchTransactions(token: string) {
    try {
      const res = await fetch(`${AGENT_API}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setTransactions(data.data || []);
      }
    } catch (err) {
      setError('Erro ao carregar transações');
    } finally {
      setLoading(false);
    }
  }

  // Filtrar transações
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Filtro por tipo
      if (filterType !== 'all' && tx.type !== filterType) return false;

      // Filtro por data
      const txDate = new Date(tx.createdAt);
      if (filterDateFrom) {
        const from = new Date(filterDateFrom);
        if (txDate < from) return false;
      }
      if (filterDateTo) {
        const to = new Date(filterDateTo);
        to.setHours(23, 59, 59, 999);
        if (txDate > to) return false;
      }

      // Filtro por busca
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const desc = (tx.description || '').toLowerCase();
        const ref = (tx.reference || '').toLowerCase();
        if (!desc.includes(search) && !ref.includes(search)) return false;
      }

      return true;
    });
  }, [transactions, filterType, filterDateFrom, filterDateTo, searchTerm]);

  function handleLogout() {
    localStorage.removeItem('agentToken');
    localStorage.removeItem('agentData');
    router.push('/');
  }

  function clearFilters() {
    setFilterType('all');
    setFilterDateFrom('');
    setFilterDateTo('');
    setSearchTerm('');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
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
                  {Math.floor(Number(agent?.spinCredits || 0))} créditos
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
              className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition"
            >
              🎮 Jogos
            </Link>
            <Link
              href="/dashboard/transactions"
              className="px-4 py-3 text-sm font-medium text-emerald-400 border-b-2 border-emerald-400"
            >
              📋 Transações
            </Link>
            <Link
              href="/dashboard/integration"
              className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition"
            >
              🔗 Integração
            </Link>
            <Link
              href="/dashboard/settings"
              className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition"
            >
              ⚙️ Configurações
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">📋 Transações</h2>
            <p className="text-slate-400 text-sm mt-1">Histórico completo de movimentações da sua conta</p>
          </div>
          <span className="text-sm text-slate-400">
            {filteredTransactions.length} de {transactions.length} transações
          </span>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300">
            {error}
          </div>
        )}

        {/* Filtros */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-end">
            {/* Tipo */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-medium text-slate-400 mb-1">Tipo</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="all">Todos</option>
                <option value="credit">Crédito</option>
                <option value="debit">Débito</option>
                <option value="ggr_fee">Taxa GGR</option>
              </select>
            </div>

            {/* Data de */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-medium text-slate-400 mb-1">De</label>
              <input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Data até */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-medium text-slate-400 mb-1">Até</label>
              <input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Busca */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-medium text-slate-400 mb-1">Buscar</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar na descrição..."
                className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Limpar */}
            <button
              onClick={clearFilters}
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-600 transition"
            >
              Limpar
            </button>
          </div>
        </div>

        {/* Tabela de Transações */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center">
              <span className="text-4xl mb-4 block">📭</span>
              <p className="text-slate-400">Nenhuma transação encontrada</p>
              {(filterType !== 'all' || filterDateFrom || filterDateTo || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="mt-2 text-emerald-400 hover:text-emerald-300"
                >
                  Limpar filtros →
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-slate-800 z-10">
                  <tr className="bg-slate-700/30">
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Descrição</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase">Valor</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase">Saldo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-700/20 transition">
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {new Date(tx.createdAt).toLocaleString('pt-BR')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          tx.type === 'credit'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : tx.type === 'ggr_fee'
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {tx.type === 'credit' ? '📥 Crédito' : tx.type === 'ggr_fee' ? '📊 Taxa GGR' : '📤 Débito'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {formatDescription(tx)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`font-semibold ${
                          tx.type === 'credit' ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {tx.type === 'credit' ? '+' : '-'} {formatValue(tx)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-slate-400">
                        {Math.floor(Number(tx.newBalance))} créditos
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-500/10 p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-medium text-blue-300">Sobre as transações</h3>
              <p className="text-sm text-blue-200/70 mt-1">
                Cada spin dos jogadores consome 1 crédito da sua conta. 
                Créditos são adicionados quando você faz uma recarga via PIX ou transferência.
                Use os filtros acima para encontrar transações específicas.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
