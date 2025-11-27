'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Session {
  id: string;
  sessionToken: string;
  playerId: string;
  gameCode: string;
  status: string;
  playerCurrency: string;
  createdAt: string;
  operator?: {
    name: string;
  };
}

const API_BASE = 'http://localhost:3006/api/v1/admin';

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    try {
      const res = await fetch(`${API_BASE}/sessions`);
      const data = await res.json();
      
      if (data.data) {
        setSessions(data.data || []);
      } else {
        setError('Falha ao carregar sessões');
      }
    } catch (err) {
      setError('Erro de conexão com a API');
      console.error('Failed to fetch sessions:', err);
    } finally {
      setLoading(false);
    }
  }

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
            <Link href="/sessions" className="text-emerald-400 font-medium">Sessões</Link>
            <Link href="/transactions" className="text-slate-400 hover:text-white transition">Transações</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Sessões Ativas</h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Buscar por player ID..."
              className="rounded-lg bg-slate-800 border border-slate-600 px-4 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
            <select className="rounded-lg bg-slate-800 border border-slate-600 px-4 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none">
              <option value="all">Todos os status</option>
              <option value="active">Ativas</option>
              <option value="closed">Fechadas</option>
              <option value="expired">Expiradas</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/20 border border-red-500/50 p-4 text-red-300">
            {error}
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
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Sessão</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Player</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Jogo</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Operador</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Iniciada</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-slate-300">Ações</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => (
                  <tr key={session.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                    <td className="px-6 py-4">
                      <code className="rounded bg-slate-700 px-2 py-1 text-xs text-blue-400">
                        {session.sessionToken.slice(0, 16)}...
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white">{session.playerId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>🐯</span>
                        <span className="text-slate-300">{session.gameCode}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {session.operator?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                        session.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : session.status === 'closed'
                          ? 'bg-slate-500/20 text-slate-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          session.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
                        }`} />
                        {session.status === 'active' ? 'Ativa' : session.status === 'closed' ? 'Fechada' : 'Expirada'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(session.createdAt).toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="rounded p-1 text-slate-400 hover:bg-slate-700 hover:text-white transition">
                        👁️
                      </button>
                      <button className="ml-1 rounded p-1 text-slate-400 hover:bg-red-700 hover:text-white transition">
                        ⛔
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
