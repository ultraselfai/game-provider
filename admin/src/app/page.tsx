'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_BASE, ADMIN_KEY } from '@/lib/config';

interface Stats {
  agents: number;
  activeSessions: number;
  totalRounds: number;
  totalVolume: number;
  totalWins: number;
  ggr: number;
  avgRtp: number;
  totalAgentBalance: number;
}

interface Agent {
  id: string;
  name: string;
  balance: number;
  isActive: boolean;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    agents: 0,
    activeSessions: 0,
    totalRounds: 0,
    totalVolume: 0,
    totalWins: 0,
    ggr: 0,
    avgRtp: 0,
    totalAgentBalance: 0,
  });
  const [recentAgents, setRecentAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // Fetch stats and agents in parallel
      const [statsRes, agentsRes] = await Promise.all([
        fetch(`${API_BASE}/admin/stats`),
        fetch(`${API_BASE}/agent/agents`, { headers: { 'x-admin-key': ADMIN_KEY } }),
      ]);

      const statsData = await statsRes.json();
      const agentsData = await agentsRes.json();

      // Process stats
      const bets = statsData.todayBets || 0;
      const wins = statsData.todayWins || 0;
      const ggr = bets - wins;
      const avgRtp = bets > 0 ? (wins / bets) * 100 : 0;

      // Process agents
      const agents = agentsData.success ? agentsData.data : (Array.isArray(agentsData) ? agentsData : []);
      const totalAgentBalance = agents.reduce((sum: number, a: Agent) => sum + Number(a.balance || 0), 0);

      setStats({
        agents: agents.length,
        activeSessions: statsData.activeSessions || 0,
        totalRounds: statsData.todayRounds || 0,
        totalVolume: bets,
        totalWins: wins,
        ggr: ggr,
        avgRtp: avgRtp,
        totalAgentBalance,
      });

      setRecentAgents(agents.slice(0, 5));
    } catch (err) {
      setError('Erro de conexão com a API');
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎰</span>
            <h1 className="text-xl font-bold text-white">Game Provider Admin</h1>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="text-emerald-400 font-medium">Dashboard</Link>
            <Link href="/agents" className="text-slate-400 hover:text-white transition">Agentes</Link>
            <Link href="/games" className="text-slate-400 hover:text-white transition">Games</Link>
            <Link href="/sessions" className="text-slate-400 hover:text-white transition">Sessões</Link>
            <Link href="/transactions" className="text-slate-400 hover:text-white transition">Transações</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
            <p className="text-slate-400 text-sm mt-1">Visão geral do sistema</p>
          </div>
          <div className="text-sm text-slate-400">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/20 border border-red-500/50 p-4 text-red-300 flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Stats Cards - Row 1 */}
        <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Agentes"
            value={stats.agents}
            icon="👥"
            loading={loading}
            color="emerald"
            href="/agents"
          />
          <StatCard
            title="Sessões Ativas"
            value={stats.activeSessions}
            icon="🎮"
            loading={loading}
            color="blue"
            href="/sessions"
          />
          <StatCard
            title="Rounds (24h)"
            value={stats.totalRounds.toLocaleString()}
            icon="🎲"
            loading={loading}
            color="purple"
          />
          <StatCard
            title="Saldo Total Agentes"
            value={`R$ ${stats.totalAgentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icon="💰"
            loading={loading}
            color="amber"
            href="/agents"
          />
        </div>

        {/* Stats Cards - Row 2 (Financial) */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Volume (24h)"
            value={`R$ ${stats.totalVolume.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icon="📊"
            loading={loading}
            color="blue"
          />
          <StatCard
            title="GGR (24h)"
            value={`R$ ${stats.ggr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icon="📈"
            loading={loading}
            color="emerald"
          />
          <StatCard
            title="RTP Médio (24h)"
            value={`${stats.avgRtp.toFixed(1)}%`}
            icon="🎯"
            loading={loading}
            color="purple"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
            <h3 className="mb-4 text-lg font-medium text-white">Ações Rápidas</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/agents"
                className="flex items-center gap-3 rounded-lg bg-emerald-600/20 border border-emerald-600/30 p-4 text-emerald-400 hover:bg-emerald-600/30 transition"
              >
                <span className="text-2xl">➕</span>
                <div>
                  <p className="font-medium">Novo Agente</p>
                  <p className="text-xs text-emerald-400/70">Cadastrar agente</p>
                </div>
              </Link>
              <Link
                href="/agents"
                className="flex items-center gap-3 rounded-lg bg-amber-600/20 border border-amber-600/30 p-4 text-amber-400 hover:bg-amber-600/30 transition"
              >
                <span className="text-2xl">💰</span>
                <div>
                  <p className="font-medium">Add Créditos</p>
                  <p className="text-xs text-amber-400/70">Gerenciar saldos</p>
                </div>
              </Link>
              <Link
                href="/games"
                className="flex items-center gap-3 rounded-lg bg-blue-600/20 border border-blue-600/30 p-4 text-blue-400 hover:bg-blue-600/30 transition"
              >
                <span className="text-2xl">🎰</span>
                <div>
                  <p className="font-medium">Games</p>
                  <p className="text-xs text-blue-400/70">Configurar jogos</p>
                </div>
              </Link>
              <Link
                href="/sessions"
                className="flex items-center gap-3 rounded-lg bg-purple-600/20 border border-purple-600/30 p-4 text-purple-400 hover:bg-purple-600/30 transition"
              >
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-medium">Sessões</p>
                  <p className="text-xs text-purple-400/70">Monitorar jogos</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Agents */}
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Agentes Recentes</h3>
              <Link href="/agents" className="text-sm text-emerald-400 hover:text-emerald-300">
                Ver todos →
              </Link>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
              </div>
            ) : recentAgents.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <span className="text-3xl mb-2 block">👤</span>
                <p>Nenhum agente cadastrado</p>
                <Link href="/agents" className="text-emerald-400 text-sm hover:text-emerald-300">
                  Criar primeiro agente →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentAgents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between rounded-lg bg-slate-700/30 p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-linear-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        {agent.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-white">{agent.name}</p>
                        <span className={`text-xs ${agent.isActive ? 'text-emerald-400' : 'text-red-400'}`}>
                          {agent.isActive ? '● Ativo' : '● Inativo'}
                        </span>
                      </div>
                    </div>
                    <p className={`font-bold ${Number(agent.balance) > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                      R$ {Number(agent.balance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="mt-6 rounded-xl border border-slate-700 bg-slate-800/50 p-6">
          <h3 className="mb-4 text-lg font-medium text-white">Status do Sistema</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatusItem label="API" status="online" />
            <StatusItem label="Database" status="online" />
            <StatusItem label="Redis Cache" status="online" />
            <StatusItem label="Webhook Service" status="online" />
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  loading,
  color,
  href,
}: {
  title: string;
  value: string | number;
  icon: string;
  loading: boolean;
  color: 'emerald' | 'blue' | 'purple' | 'amber';
  href?: string;
}) {
  const colors = {
    emerald: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
    amber: 'from-amber-500/20 to-amber-600/10 border-amber-500/30',
  };

  const content = (
    <div className={`rounded-xl border bg-linear-to-br p-5 ${colors[color]} ${href ? 'hover:scale-[1.02] transition-transform cursor-pointer' : ''}`}>
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        {loading && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
        )}
      </div>
      <div className="mt-3">
        <p className="text-sm text-slate-400">{title}</p>
        <p className="mt-1 text-xl font-bold text-white">
          {loading ? '...' : value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

function StatusItem({ label, status }: { label: string; status: 'online' | 'offline' | 'warning' }) {
  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-red-500',
    warning: 'bg-amber-500',
  };

  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-700/30 p-3">
      <span className={`h-2 w-2 rounded-full ${statusColors[status]} animate-pulse`} />
      <span className="text-sm text-slate-300">{label}</span>
      <span className="ml-auto text-xs text-slate-500 capitalize">{status}</span>
    </div>
  );
}
