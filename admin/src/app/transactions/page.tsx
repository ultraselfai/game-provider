'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Transaction {
  id: string;
  transactionId: string;
  type: 'debit' | 'credit' | 'refund';
  amount: number;
  currency: string;
  status: string;
  playerId: string;
  createdAt: string;
}

const API_BASE = 'http://localhost:3006/api/v1/admin';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      const res = await fetch(`${API_BASE}/transactions`);
      const data = await res.json();
      
      if (data.data) {
        setTransactions(data.data || []);
      } else {
        setError('Falha ao carregar transações');
      }
    } catch (err) {
      setError('Erro de conexão com a API');
      console.error('Failed to fetch transactions:', err);
    } finally {
      setLoading(false);
    }
  }

  const typeLabels: Record<string, { text: string; color: string; icon: string }> = {
    debit: { text: 'Aposta', color: 'text-red-400', icon: '📤' },
    credit: { text: 'Ganho', color: 'text-emerald-400', icon: '📥' },
    refund: { text: 'Estorno', color: 'text-amber-400', icon: '↩️' },
    // API pode retornar esses valores também
    bet: { text: 'Aposta', color: 'text-red-400', icon: '📤' },
    win: { text: 'Ganho', color: 'text-emerald-400', icon: '📥' },
  };

  // Fallback para tipos desconhecidos
  const getTypeInfo = (type: string) => {
    return typeLabels[type] || { text: type, color: 'text-slate-400', icon: '❓' };
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎰</span>
            <h1 className="text-xl font-bold text-white">Game Provider Admin</h1>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="text-slate-400 hover:text-white transition">Dashboard</Link>
            <Link href="/agents" className="text-slate-400 hover:text-white transition">Agentes</Link>
            <Link href="/games" className="text-slate-400 hover:text-white transition">Games</Link>
            <Link href="/sessions" className="text-slate-400 hover:text-white transition">Sessões</Link>
            <Link href="/transactions" className="text-emerald-400 font-medium">Transações</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Transações</h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Buscar por TX ID..."
              className="rounded-lg bg-slate-800 border border-slate-600 px-4 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
            <select className="rounded-lg bg-slate-800 border border-slate-600 px-4 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none">
              <option value="all">Todos os tipos</option>
              <option value="debit">Apostas</option>
              <option value="credit">Ganhos</option>
              <option value="refund">Estornos</option>
            </select>
            <input
              type="date"
              className="rounded-lg bg-slate-800 border border-slate-600 px-4 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/20 border border-red-500/50 p-4 text-red-300">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-sm text-slate-400">Total Apostas (24h)</p>
            <p className="text-2xl font-bold text-red-400">R$ 12.450,00</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-sm text-slate-400">Total Ganhos (24h)</p>
            <p className="text-2xl font-bold text-emerald-400">R$ 10.230,50</p>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <p className="text-sm text-slate-400">GGR (24h)</p>
            <p className="text-2xl font-bold text-blue-400">R$ 2.219,50</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          </div>
        ) : (
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800">
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">TX ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Tipo</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Valor</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Player</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Data</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => {
                  const typeInfo = getTypeInfo(tx.type);
                  return (
                    <tr key={tx.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                      <td className="px-6 py-4">
                        <code className="rounded bg-slate-700 px-2 py-1 text-xs text-purple-400">
                          {tx.transactionId}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span>{typeInfo.icon}</span>
                          <span className={typeInfo.color}>{typeInfo.text}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-medium ${tx.type === 'credit' ? 'text-emerald-400' : 'text-white'}`}>
                          {tx.type === 'credit' ? '+' : '-'} R$ {tx.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{tx.playerId}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                          tx.status === 'success'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : tx.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {tx.status === 'success' ? '✓ Sucesso' : tx.status === 'pending' ? '⏳ Pendente' : '✗ Falhou'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(tx.createdAt).toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
