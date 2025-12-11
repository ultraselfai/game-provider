'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  fetchPool,
  fetchPoolLimits,
  fetchPoolStats,
  depositToPool,
  withdrawFromPool,
  setPoolPhase,
  formatCurrency,
  formatPercent,
  getPhaseColor,
  getPhaseLabel,
  getPhaseDescription,
  type PoolData,
  type PoolLimits,
  type PoolStats,
} from '@/lib/pool-api';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  RefreshCw,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  Settings,
  TrendingUp,
  TrendingDown,
  Shield,
  Scale,
  Coins,
  Lock,
  Unlock,
  Info,
  ChevronRight,
  Gauge,
  Target,
  Percent,
  Trophy,
  Zap,
  BarChart3,
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  email: string;
  spinCredits: number;
}

export default function PoolPage() {
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [pool, setPool] = useState<PoolData | null>(null);
  const [limits, setLimits] = useState<PoolLimits | null>(null);
  const [stats, setStats] = useState<PoolStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statsPeriod, setStatsPeriod] = useState<'24h' | '7d' | '30d' | 'all'>('24h');

  // Modal states
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showPhaseModal, setShowPhaseModal] = useState(false);
  const [modalAmount, setModalAmount] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');

  const loadData = useCallback(async () => {
    try {
      const [poolRes, limitsRes, statsRes] = await Promise.all([
        fetchPool(),
        fetchPoolLimits(),
        fetchPoolStats(statsPeriod),
      ]);

      if (poolRes.success && poolRes.data) {
        setPool(poolRes.data);
      }
      if (limitsRes.success && limitsRes.data) {
        setLimits(limitsRes.data);
      }
      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data);
      }
    } catch (err) {
      setError('Erro ao carregar dados do pool');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [statsPeriod]);

  useEffect(() => {
    const token = localStorage.getItem('agentToken');
    const agentData = localStorage.getItem('agentData');

    if (!token || !agentData) {
      router.push('/');
      return;
    }

    setAgent(JSON.parse(agentData));
    loadData();
  }, [router, loadData]);

  useEffect(() => {
    if (agent) {
      fetchPoolStats(statsPeriod).then((res) => {
        if (res.success && res.data) {
          setStats(res.data);
        }
      });
    }
  }, [statsPeriod, agent]);

  async function handleDeposit() {
    setModalError('');
    setModalSuccess('');
    const amount = parseFloat(modalAmount);

    if (isNaN(amount) || amount <= 0) {
      setModalError('Valor inválido');
      return;
    }

    setModalLoading(true);
    const result = await depositToPool(amount, modalDescription || undefined);
    setModalLoading(false);

    if (result.success) {
      setModalSuccess(`Depósito de ${formatCurrency(amount)} realizado com sucesso!`);
      setModalAmount('');
      setModalDescription('');
      loadData();
      setTimeout(() => {
        setShowDepositModal(false);
        setModalSuccess('');
      }, 1500);
    } else {
      setModalError(result.message || 'Erro ao depositar');
    }
  }

  async function handleWithdraw() {
    setModalError('');
    setModalSuccess('');
    const amount = parseFloat(modalAmount);

    if (isNaN(amount) || amount <= 0) {
      setModalError('Valor inválido');
      return;
    }

    if (pool && amount > pool.balance) {
      setModalError('Saldo insuficiente no pool');
      return;
    }

    setModalLoading(true);
    const result = await withdrawFromPool(amount, modalDescription || undefined);
    setModalLoading(false);

    if (result.success) {
      setModalSuccess(`Saque de ${formatCurrency(amount)} realizado com sucesso!`);
      setModalAmount('');
      setModalDescription('');
      loadData();
      setTimeout(() => {
        setShowWithdrawModal(false);
        setModalSuccess('');
      }, 1500);
    } else {
      setModalError(result.message || 'Erro ao sacar');
    }
  }

  async function handleSetPhase(phase: 'retention' | 'normal' | 'release') {
    setModalLoading(true);
    const result = await setPoolPhase(phase);
    setModalLoading(false);

    if (result.success) {
      loadData();
      setShowPhaseModal(false);
    } else {
      setModalError(result.message || 'Erro ao definir fase');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const phaseIcons = {
    retention: Lock,
    normal: Scale,
    release: Unlock,
  };

  const phaseColors = {
    retention: 'text-red-500',
    normal: 'text-yellow-500',
    release: 'text-emerald-500',
  };

  const phaseBgColors = {
    retention: 'bg-red-500/10 border-red-500/30',
    normal: 'bg-yellow-500/10 border-yellow-500/30',
    release: 'bg-emerald-500/10 border-emerald-500/30',
  };

  const CurrentPhaseIcon = phaseIcons[pool?.currentPhase || 'normal'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Pool</h1>
          <p className="text-muted-foreground">
            Gerencie a banca e controle de pagamentos do seu cassino
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="flex items-center gap-3 py-3 px-4">
              <Wallet className="size-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Saldo do Pool</p>
                <p className={`text-xl font-bold ${(pool?.balance || 0) > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {formatCurrency(pool?.balance || 0)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive">
          {error}
        </div>
      )}

      {/* Fase + Limites + Ações */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Fase Atual */}
        <Card className={phaseBgColors[pool?.currentPhase || 'normal']}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Fase Atual
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowPhaseModal(true)}>
              Alterar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <CurrentPhaseIcon className={`size-8 ${phaseColors[pool?.currentPhase || 'normal']}`} />
              <div>
                <p className={`text-2xl font-bold ${phaseColors[pool?.currentPhase || 'normal']}`}>
                  {getPhaseLabel(pool?.currentPhase || 'normal')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {getPhaseDescription(pool?.currentPhase || 'normal')}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Auto-fase:</span>
                <Badge variant={pool?.isAutoPhase ? 'success' : 'secondary'}>
                  {pool?.isAutoPhase ? 'Ativado' : 'Desativado'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Limites Atuais */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Limites de Payout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Coins className="size-4" />
                <span>Max Payout:</span>
              </div>
              <span className="font-semibold">{formatCurrency(limits?.maxPayout || 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="size-4" />
                <span>Max Multiplicador:</span>
              </div>
              <span className="font-semibold">{limits?.maxMultiplier || 0}x</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target className="size-4" />
                <span>Win Chance:</span>
              </div>
              <span className="font-semibold">{formatPercent(limits?.effectiveWinChance || 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="size-4" />
                <span>Status:</span>
              </div>
              <Badge variant={limits?.canPay ? 'success' : 'destructive'}>
                {limits?.canPay ? 'Pode Pagar' : 'Bloqueado'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => {
                setModalAmount('');
                setModalDescription('');
                setModalError('');
                setModalSuccess('');
                setShowDepositModal(true);
              }}
              className="w-full"
            >
              <ArrowDownToLine className="size-4 mr-2" />
              Depositar
            </Button>
            <Button
              onClick={() => {
                setModalAmount('');
                setModalDescription('');
                setModalError('');
                setModalSuccess('');
                setShowWithdrawModal(true);
              }}
              variant="outline"
              className="w-full"
            >
              <ArrowUpFromLine className="size-4 mr-2" />
              Sacar
            </Button>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/dashboard/pool/transactions">
                <History className="size-4 mr-2" />
                Ver Histórico
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="size-5" />
              Estatísticas
            </CardTitle>
            <CardDescription>
              Performance do pool no período selecionado
            </CardDescription>
          </div>
          <Tabs value={statsPeriod} onValueChange={(v) => setStatsPeriod(v as typeof statsPeriod)}>
            <TabsList>
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7 dias</TabsTrigger>
              <TabsTrigger value="30d">30 dias</TabsTrigger>
              <TabsTrigger value="all">Tudo</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <TrendingUp className="size-4" />
                <span className="text-sm">Total Apostado</span>
              </div>
              <p className="text-xl font-bold">{formatCurrency(stats?.totalBets || 0)}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <TrendingDown className="size-4" />
                <span className="text-sm">Total Pago</span>
              </div>
              <p className="text-xl font-bold">{formatCurrency(stats?.totalPayouts || 0)}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Coins className="size-4" />
                <span className="text-sm">Lucro Líquido</span>
              </div>
              <p className={`text-xl font-bold ${(stats?.netProfit || 0) >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {formatCurrency(stats?.netProfit || 0)}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Percent className="size-4" />
                <span className="text-sm">RTP</span>
              </div>
              <p className="text-xl font-bold text-blue-500">{formatPercent(stats?.rtp || 0)}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Gauge className="size-4" />
                <span className="text-sm">Total de Spins</span>
              </div>
              <p className="text-xl font-bold">{stats?.totalSpins?.toLocaleString('pt-BR') || 0}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Trophy className="size-4" />
                <span className="text-sm">Vitórias</span>
              </div>
              <p className="text-xl font-bold">{stats?.totalWins?.toLocaleString('pt-BR') || 0}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Target className="size-4" />
                <span className="text-sm">Taxa de Vitória</span>
              </div>
              <p className="text-xl font-bold text-yellow-500">{formatPercent(stats?.winRate || 0)}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Zap className="size-4" />
                <span className="text-sm">Maior Ganho</span>
              </div>
              <p className="text-xl font-bold text-emerald-500">{formatCurrency(stats?.biggestWin || 0)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuração de Fases */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="size-5" />
              Configuração de Fases
            </CardTitle>
            <CardDescription>
              Configure os parâmetros de cada fase do pool
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/pool/settings">
              Editar Configurações
              <ChevronRight className="ml-1 size-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Retenção */}
            <div className={`rounded-lg p-4 border ${pool?.currentPhase === 'retention' ? 'border-red-500 bg-red-500/10' : 'border-border'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Lock className="size-5 text-red-500" />
                <h4 className="font-medium text-red-500">Retenção</h4>
                {pool?.currentPhase === 'retention' && (
                  <Badge variant="destructive" className="ml-auto">ATIVA</Badge>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Win Chance:</span>
                  <span>{pool?.retentionWinChance || 10}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Mult:</span>
                  <span>{pool?.retentionMaxMultiplier || 30}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Threshold:</span>
                  <span>&lt; {formatCurrency(pool?.retentionThreshold || 1000)}</span>
                </div>
              </div>
            </div>

            {/* Normal */}
            <div className={`rounded-lg p-4 border ${pool?.currentPhase === 'normal' ? 'border-yellow-500 bg-yellow-500/10' : 'border-border'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Scale className="size-5 text-yellow-500" />
                <h4 className="font-medium text-yellow-500">Normal</h4>
                {pool?.currentPhase === 'normal' && (
                  <Badge variant="warning" className="ml-auto">ATIVA</Badge>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Win Chance:</span>
                  <span>{pool?.normalWinChance || 35}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Mult:</span>
                  <span>{pool?.normalMaxMultiplier || 100}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Range:</span>
                  <span>{formatCurrency(pool?.retentionThreshold || 1000)} - {formatCurrency(pool?.releaseThreshold || 10000)}</span>
                </div>
              </div>
            </div>

            {/* Liberação */}
            <div className={`rounded-lg p-4 border ${pool?.currentPhase === 'release' ? 'border-emerald-500 bg-emerald-500/10' : 'border-border'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Unlock className="size-5 text-emerald-500" />
                <h4 className="font-medium text-emerald-500">Liberação</h4>
                {pool?.currentPhase === 'release' && (
                  <Badge variant="success" className="ml-auto">ATIVA</Badge>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Win Chance:</span>
                  <span>{pool?.releaseWinChance || 65}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Mult:</span>
                  <span>{pool?.releaseMaxMultiplier || 250}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Threshold:</span>
                  <span>&gt; {formatCurrency(pool?.releaseThreshold || 10000)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-4 pt-6">
          <Info className="size-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold text-primary">Como funciona o Pool?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              O pool é a &quot;banca&quot; do seu cassino. Quando jogadores apostam, o valor entra no pool.
              Quando ganham, o prêmio sai do pool. O sistema ajusta automaticamente a chance de vitória
              baseado no saldo do pool para garantir sustentabilidade. Você pode forçar uma fase manualmente
              ou deixar no modo automático.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Depósito */}
      <Dialog open={showDepositModal} onOpenChange={setShowDepositModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowDownToLine className="size-5" />
              Depositar no Pool
            </DialogTitle>
            <DialogDescription>
              Adicione fundos ao pool para aumentar a capacidade de pagamento.
            </DialogDescription>
          </DialogHeader>

          {modalError && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive text-sm">
              {modalError}
            </div>
          )}
          {modalSuccess && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 text-sm">
              {modalSuccess}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Valor (R$)</label>
              <Input
                type="number"
                value={modalAmount}
                onChange={(e) => setModalAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Descrição (opcional)</label>
              <Input
                type="text"
                value={modalDescription}
                onChange={(e) => setModalDescription(e.target.value)}
                placeholder="Ex: Aporte inicial"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDepositModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleDeposit} disabled={modalLoading}>
              {modalLoading ? 'Processando...' : 'Confirmar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Saque */}
      <Dialog open={showWithdrawModal} onOpenChange={setShowWithdrawModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowUpFromLine className="size-5" />
              Sacar do Pool
            </DialogTitle>
            <DialogDescription>
              Retire fundos do pool para sua conta.
            </DialogDescription>
          </DialogHeader>

          <div className="p-3 rounded-lg bg-muted border">
            <p className="text-sm text-muted-foreground">Saldo disponível:</p>
            <p className="text-lg font-bold text-emerald-500">{formatCurrency(pool?.balance || 0)}</p>
          </div>

          {modalError && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive text-sm">
              {modalError}
            </div>
          )}
          {modalSuccess && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 text-sm">
              {modalSuccess}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Valor (R$)</label>
              <Input
                type="number"
                value={modalAmount}
                onChange={(e) => setModalAmount(e.target.value)}
                placeholder="0.00"
                max={pool?.balance || 0}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Descrição (opcional)</label>
              <Input
                type="text"
                value={modalDescription}
                onChange={(e) => setModalDescription(e.target.value)}
                placeholder="Ex: Retirada de lucros"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWithdrawModal(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleWithdraw} disabled={modalLoading}>
              {modalLoading ? 'Processando...' : 'Confirmar Saque'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Alterar Fase */}
      <Dialog open={showPhaseModal} onOpenChange={setShowPhaseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Fase do Pool</DialogTitle>
            <DialogDescription>
              Selecione a fase para forçar manualmente. Isso desativará o modo automático.
            </DialogDescription>
          </DialogHeader>

          {modalError && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive text-sm">
              {modalError}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => handleSetPhase('retention')}
              disabled={modalLoading}
              className={`w-full flex items-center gap-3 p-4 rounded-lg border transition ${
                pool?.currentPhase === 'retention'
                  ? 'border-red-500 bg-red-500/20'
                  : 'border-border hover:bg-muted'
              }`}
            >
              <Lock className="size-6 text-red-500" />
              <div className="text-left">
                <p className="font-medium text-red-500">Retenção</p>
                <p className="text-xs text-muted-foreground">Menos vitórias, acumula saldo</p>
              </div>
              {pool?.currentPhase === 'retention' && (
                <Badge variant="destructive" className="ml-auto">ATUAL</Badge>
              )}
            </button>

            <button
              onClick={() => handleSetPhase('normal')}
              disabled={modalLoading}
              className={`w-full flex items-center gap-3 p-4 rounded-lg border transition ${
                pool?.currentPhase === 'normal'
                  ? 'border-yellow-500 bg-yellow-500/20'
                  : 'border-border hover:bg-muted'
              }`}
            >
              <Scale className="size-6 text-yellow-500" />
              <div className="text-left">
                <p className="font-medium text-yellow-500">Normal</p>
                <p className="text-xs text-muted-foreground">Equilíbrio entre ganhos e retenção</p>
              </div>
              {pool?.currentPhase === 'normal' && (
                <Badge variant="warning" className="ml-auto">ATUAL</Badge>
              )}
            </button>

            <button
              onClick={() => handleSetPhase('release')}
              disabled={modalLoading}
              className={`w-full flex items-center gap-3 p-4 rounded-lg border transition ${
                pool?.currentPhase === 'release'
                  ? 'border-emerald-500 bg-emerald-500/20'
                  : 'border-border hover:bg-muted'
              }`}
            >
              <Unlock className="size-6 text-emerald-500" />
              <div className="text-left">
                <p className="font-medium text-emerald-500">Liberação</p>
                <p className="text-xs text-muted-foreground">Mais vitórias, distribui lucros</p>
              </div>
              {pool?.currentPhase === 'release' && (
                <Badge variant="success" className="ml-auto">ATUAL</Badge>
              )}
            </button>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPhaseModal(false)} className="w-full">
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
