'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProtectedLayout from '@/components/ProtectedLayout';
import { API_BASE, ADMIN_KEY } from '@/lib/config';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  RefreshCw,
  Users,
  MonitorPlay,
  Gamepad2,
  Wallet,
  TrendingUp,
  Target,
  DollarSign,
  ArrowRight,
  Activity,
  Database,
  Server,
  Zap,
  Coins,
} from 'lucide-react';

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
  spinCredits: number;
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
      const [statsRes, agentsRes] = await Promise.all([
        fetch(`${API_BASE}/admin/stats`),
        fetch(`${API_BASE}/agent/agents`, { headers: { 'x-admin-key': ADMIN_KEY } }),
      ]);

      const statsData = await statsRes.json();
      const agentsData = await agentsRes.json();

      const bets = statsData.todayBets || 0;
      const wins = statsData.todayWins || 0;
      const ggr = bets - wins;
      const avgRtp = bets > 0 ? (wins / bets) * 100 : 0;

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral do sistema
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive">
            {error}
          </div>
        )}

        {/* Stats Row 1 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agentes</CardTitle>
              <Users className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? <RefreshCw className="size-5 animate-spin" /> : stats.agents}
              </div>
              <Link href="/agents" className="text-xs text-primary hover:underline">
                Ver todos →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessões Ativas</CardTitle>
              <MonitorPlay className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? <RefreshCw className="size-5 animate-spin" /> : stats.activeSessions}
              </div>
              <Link href="/sessions" className="text-xs text-primary hover:underline">
                Monitorar →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rounds (24h)</CardTitle>
              <Gamepad2 className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? <RefreshCw className="size-5 animate-spin" /> : stats.totalRounds.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Total de apostas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Agentes</CardTitle>
              <Wallet className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">
                {loading ? <RefreshCw className="size-5 animate-spin" /> : formatCurrency(stats.totalAgentBalance)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total disponível
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Row 2 - Financial */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volume (24h)</CardTitle>
              <DollarSign className="size-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {loading ? <RefreshCw className="size-5 animate-spin" /> : formatCurrency(stats.totalVolume)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total apostado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GGR (24h)</CardTitle>
              <TrendingUp className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stats.ggr >= 0 ? 'text-emerald-500' : 'text-destructive'}`}>
                {loading ? <RefreshCw className="size-5 animate-spin" /> : formatCurrency(stats.ggr)}
              </div>
              <p className="text-xs text-muted-foreground">
                Gross Gaming Revenue
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">RTP Médio (24h)</CardTitle>
              <Target className="size-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">
                {loading ? <RefreshCw className="size-5 animate-spin" /> : `${stats.avgRtp.toFixed(1)}%`}
              </div>
              <p className="text-xs text-muted-foreground">
                Return to Player
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Two Columns */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Link href="/pools">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                  <Wallet className="size-5 text-cyan-500" />
                  <span>Pools</span>
                </Button>
              </Link>
              <Link href="/agents">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                  <Users className="size-5 text-emerald-500" />
                  <span>Novo Agente</span>
                </Button>
              </Link>
              <Link href="/games">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                  <Gamepad2 className="size-5 text-blue-500" />
                  <span>Games</span>
                </Button>
              </Link>
              <Link href="/sessions">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                  <MonitorPlay className="size-5 text-purple-500" />
                  <span>Sessões</span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Agents */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Agentes Recentes</CardTitle>
              <Link href="/agents">
                <Button variant="ghost" size="sm">
                  Ver todos <ArrowRight className="size-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="size-6 animate-spin text-muted-foreground" />
                </div>
              ) : recentAgents.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="size-10 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Nenhum agente cadastrado</p>
                  <Link href="/agents" className="text-primary text-sm hover:underline">
                    Criar primeiro agente →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentAgents.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {agent.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <Badge variant={agent.isActive ? 'default' : 'destructive'} className="text-xs">
                            {agent.isActive ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                      </div>
                      <p className={`font-bold flex items-center gap-1.5 ${(Number(agent.spinCredits) || 0) > 0 ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                        <Coins className="h-4 w-4" />
                        {(Number(agent.spinCredits) || 0).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <Server className="size-4 text-muted-foreground" />
                <span className="text-sm">API</span>
                <Badge variant="outline" className="ml-auto text-xs">Online</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <Database className="size-4 text-muted-foreground" />
                <span className="text-sm">Database</span>
                <Badge variant="outline" className="ml-auto text-xs">Online</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <Zap className="size-4 text-muted-foreground" />
                <span className="text-sm">Redis</span>
                <Badge variant="outline" className="ml-auto text-xs">Online</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <Activity className="size-4 text-muted-foreground" />
                <span className="text-sm">Webhooks</span>
                <Badge variant="outline" className="ml-auto text-xs">Online</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
