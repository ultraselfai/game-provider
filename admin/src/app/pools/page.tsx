'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import ProtectedLayout from '@/components/ProtectedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, TrendingUp, DollarSign, BarChart3, Target, Eye, AlertCircle, ArrowUpDown } from 'lucide-react';
import {
  fetchAllPools,
  formatCurrency,
  getPhaseIcon,
  getPhaseLabel,
  AgentPool,
} from '@/lib/pool-api';
import { API_BASE } from '@/lib/config';

export default function PoolsPage() {
  const [pools, setPools] = useState<AgentPool[]>([]);
  const [totals, setTotals] = useState({
    totalBalance: 0,
    totalPools: 0,
    byPhase: { retention: 0, normal: 0, release: 0 },
    volume24h: { bets: 0, wins: 0, ggr: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [phaseFilter, setPhaseFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'balance' | 'name' | 'phase'>('balance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const loadPools = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAllPools();
      if (response.success && response.data) {
        setPools(response.data.pools || []);
        setTotals(response.data.totals || {
          totalBalance: 0,
          totalPools: 0,
          byPhase: { retention: 0, normal: 0, release: 0 },
          volume24h: { bets: 0, wins: 0, ggr: 0 },
        });
      }
    } catch (err) {
      // If admin endpoint doesn't exist, try to fetch agents and their pools
      try {
        const agentsRes = await fetch(`${API_BASE}/agent/agents`);
        const agentsData = await agentsRes.json();
        const agents = agentsData.data || agentsData || [];
        
        // Fetch pool for each agent
        const poolPromises = agents.map(async (agent: { id: string; name: string }) => {
          try {
            const poolRes = await fetch(`${API_BASE}/pool/${agent.id}`);
            const poolData = await poolRes.json();
            return {
              agentId: agent.id,
              agentName: agent.name,
              balance: poolData.data?.balance || 0,
              currentPhase: poolData.data?.currentPhase || 'normal',
              lastUpdated: poolData.data?.lastUpdated || new Date().toISOString(),
            };
          } catch {
            return {
              agentId: agent.id,
              agentName: agent.name,
              balance: 0,
              currentPhase: 'normal' as const,
              lastUpdated: new Date().toISOString(),
            };
          }
        });
        
        const poolsData = await Promise.all(poolPromises);
        setPools(poolsData);
        
        // Calculate totals
        const totalBalance = poolsData.reduce((sum, p) => sum + p.balance, 0);
        const byPhase = {
          retention: poolsData.filter(p => p.currentPhase === 'retention').length,
          normal: poolsData.filter(p => p.currentPhase === 'normal').length,
          release: poolsData.filter(p => p.currentPhase === 'release').length,
        };
        
        setTotals({
          totalBalance,
          totalPools: poolsData.length,
          byPhase,
          volume24h: { bets: 0, wins: 0, ggr: 0 },
        });
      } catch {
        setError('Falha ao carregar pools');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPools();
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadPools, 30000);
    return () => clearInterval(interval);
  }, [loadPools]);

  // Filter and sort pools
  const filteredPools = pools
    .filter(pool => phaseFilter === 'all' || pool.currentPhase === phaseFilter)
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'balance':
          comparison = a.balance - b.balance;
          break;
        case 'name':
          comparison = a.agentName.localeCompare(b.agentName);
          break;
        case 'phase':
          comparison = a.currentPhase.localeCompare(b.currentPhase);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const getPhaseVariant = (phase: string) => {
    switch (phase) {
      case 'retention': return 'destructive';
      case 'release': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Pools dos Agentes</h1>
            <p className="text-muted-foreground">Visão geral de todos os pools do sistema</p>
          </div>
          <Button onClick={loadPools} disabled={loading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-500/20 border border-red-500/50 p-4 text-red-500 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-emerald-500/30 bg-emerald-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">
                {loading ? '...' : formatCurrency(totals.totalBalance)}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pools Ativos</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {loading ? '...' : totals.totalPools}
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/30 bg-amber-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volume 24h</CardTitle>
              <TrendingUp className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">
                {loading ? '...' : formatCurrency(totals.volume24h.bets)}
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GGR 24h</CardTitle>
              <Target className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">
                {loading ? '...' : formatCurrency(totals.volume24h.ggr)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Phase Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Fase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-red-500/30 bg-red-500/10 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🔴</span>
                  <div>
                    <p className="text-sm text-muted-foreground">Retenção</p>
                    <p className="text-2xl font-bold text-red-500">{totals.byPhase.retention}</p>
                  </div>
                </div>
              </Card>
              <Card className="border-amber-500/30 bg-amber-500/10 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🟡</span>
                  <div>
                    <p className="text-sm text-muted-foreground">Normal</p>
                    <p className="text-2xl font-bold text-amber-500">{totals.byPhase.normal}</p>
                  </div>
                </div>
              </Card>
              <Card className="border-emerald-500/30 bg-emerald-500/10 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🟢</span>
                  <div>
                    <p className="text-sm text-muted-foreground">Liberação</p>
                    <p className="text-2xl font-bold text-emerald-500">{totals.byPhase.release}</p>
                  </div>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Fase:</span>
            <Select value={phaseFilter} onValueChange={setPhaseFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="retention">🔴 Retenção</SelectItem>
                <SelectItem value="normal">🟡 Normal</SelectItem>
                <SelectItem value="release">🟢 Liberação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Ordenar:</span>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'balance' | 'name' | 'phase')}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balance">Saldo</SelectItem>
                <SelectItem value="name">Nome</SelectItem>
                <SelectItem value="phase">Fase</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          <span className="ml-auto text-sm text-muted-foreground">
            {filteredPools.length} de {pools.length} pools
          </span>
        </div>

        {/* Pools Table */}
        <Card>
          <CardHeader>
            <CardTitle>Pools</CardTitle>
            <CardDescription>Lista de todos os pools de agentes</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <RefreshCw className="h-10 w-10 animate-spin text-muted-foreground" />
              </div>
            ) : filteredPools.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Nenhum pool encontrado</p>
                <p className="text-sm mt-2">Os pools serão criados automaticamente para cada agente</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agente</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                    <TableHead className="text-center">Fase</TableHead>
                    <TableHead className="text-center">Atualizado</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPools.map((pool) => (
                    <TableRow key={pool.agentId}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold">
                            {pool.agentName?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div>
                            <p className="font-medium">{pool.agentName || 'Sem nome'}</p>
                            <p className="text-xs text-muted-foreground font-mono">{pool.agentId.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`font-bold ${pool.balance > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                          {formatCurrency(pool.balance)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={getPhaseVariant(pool.currentPhase)}>
                          {getPhaseIcon(pool.currentPhase)} {getPhaseLabel(pool.currentPhase).replace(/^[^\s]+\s/, '')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">
                        {new Date(pool.lastUpdated).toLocaleTimeString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/pools/${pool.agentId}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            Detalhes
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
