'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_BASE = 'http://localhost:3006/api/v1';

interface Agent {
  id: string;
  name: string;
  email: string;
  balance: number;
  ggrRate: number;
  isActive: boolean;
  apiKey: string;
  apiSecret: string;
}

interface Transaction {
  id: string;
  type: 'credit' | 'debit' | 'ggr_fee';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  reference: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('agentToken');
    const agentData = localStorage.getItem('agentData');

    if (!token || !agentData) {
      router.push('/');
      return;
    }

    setAgent(JSON.parse(agentData));
    fetchData(token);
  }, [router]);

  async function fetchData(token: string) {
    try {
      // Fetch agent profile and transactions
      const [profileRes, transactionsRes] = await Promise.all([
        fetch(`${API_BASE}/agent/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/agent/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const profileData = await profileRes.json();
      const transactionsData = await transactionsRes.json();

      if (profileData.success) {
        setAgent(profileData.data);
        localStorage.setItem('agentData', JSON.stringify(profileData.data));
      }

      if (transactionsData.success) {
        setTransactions(transactionsData.data || []);
      }
    } catch (err) {
      setError('Erro ao carregar dados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('agentToken');
    localStorage.removeItem('agentData');
    router.push('/');
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
      {/* Header com Saldo */}
      <header className="border-b border-slate-700 bg-slate-800/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo e Nome */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                <span className="text-xl">🎰</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">{agent?.name}</h1>
                <p className="text-xs text-slate-400">{agent?.email}</p>
              </div>
            </div>

            {/* Saldo Central */}
            <div className="flex items-center gap-2 bg-slate-700/50 rounded-xl px-6 py-3 border border-slate-600">
              <span className="text-2xl">💰</span>
              <div className="text-right">
                <p className="text-xs text-slate-400">Saldo Disponível</p>
                <p className={`text-2xl font-bold ${Number(agent?.balance) > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  R$ {Number(agent?.balance || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Botão Sair */}
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
              className="px-4 py-3 text-sm font-medium text-emerald-400 border-b-2 border-emerald-400"
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
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💳</span>
              <div>
                <p className="text-sm text-slate-400">Total Créditos</p>
                <p className="text-xl font-bold text-emerald-400">
                  R$ {transactions
                    .filter(t => t.type === 'credit')
                    .reduce((sum, t) => sum + Number(t.amount), 0)
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📤</span>
              <div>
                <p className="text-sm text-slate-400">Total Consumido</p>
                <p className="text-xl font-bold text-red-400">
                  R$ {transactions
                    .filter(t => t.type === 'debit')
                    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0)
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📈</span>
              <div>
                <p className="text-sm text-slate-400">Taxa GGR</p>
                <p className="text-xl font-bold text-blue-400">
                  {Number(agent?.ggrRate || 0).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">📋 Histórico de Transações</h2>
            <span className="text-sm text-slate-400">{transactions.length} transações</span>
          </div>

          {transactions.length === 0 ? (
            <div className="p-12 text-center">
              <span className="text-4xl mb-4 block">📭</span>
              <p className="text-slate-400">Nenhuma transação encontrada</p>
              <p className="text-sm text-slate-500 mt-1">
                Suas transações aparecerão aqui quando houver movimentação
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-700/30">
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Descrição</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase">Valor</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase">Saldo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {transactions.map((tx) => (
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
                        {tx.description || '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`font-semibold ${
                          tx.type === 'credit' ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {tx.type === 'credit' ? '+' : '-'} R$ {Math.abs(Number(tx.amount)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-slate-400">
                        R$ {Number(tx.balanceAfter).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-500/10 p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-medium text-blue-300">Como funciona o saldo?</h3>
              <p className="text-sm text-blue-200/70 mt-1">
                Seu saldo é consumido quando os jogadores da sua bet utilizam os jogos. 
                Cada rodada debita o valor da aposta do seu saldo. Para adicionar créditos, 
                entre em contato com o provedor via PIX ou transferência bancária.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
