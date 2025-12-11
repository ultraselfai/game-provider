'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProtectedLayout from '@/components/ProtectedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowLeft,
  RefreshCw,
  Wallet,
  ArrowDownToLine,
  Zap,
  Loader2,
  Lock,
  Scale,
  DollarSign,
  Activity,
  TrendingUp,
  AlertCircle,
  Dices,
  Coins,
  Banknote,
  ArrowUpFromLine,
  Settings,
} from 'lucide-react';
import {
  fetchPoolDetails,
  fetchPoolStats,
  fetchPoolTransactions,
  fetchPoolLimits,
  adminDepositToPool,
  adminWithdrawFromPool,
  adminSetPoolPhase,
  PoolTransaction as ApiPoolTransaction,
} from '@/lib/pool-api';

// --- Helpers ---
function formatCurrency(val: number | undefined | null) {
  if (val === undefined || val === null) return 'R$ 0,00';
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatPercent(val: number | undefined | null) {
  if (val === undefined || val === null) return '0.0%';
  return `${(val * 100).toFixed(1)}%`;
}

function getPhaseVariant(phase: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (phase === 'retention') return 'destructive';
  if (phase === 'release') return 'default';
  return 'secondary';
}

function getPhaseLabel(phase: string) {
  switch (phase) {
    case 'retention': return '🔒 Retenção';
    case 'normal': return '⚖️ Normal';
    case 'release': return '💰 Liberação';
    default: return phase;
  }
}

// --- Interfaces ---
interface PoolData {
  agentId: string;
  agentName: string;
  balance: number;
  currentPhase: 'retention' | 'normal' | 'release';
  lastUpdated: string;
}

interface PoolLimits {
  canPlay: boolean;
  maxBetPayout: number;
  reason?: string;
}

interface PoolStats {
  spinsCount: number;
  totalBets: number;
  totalWins: number;
  ggr: number;
  rtp: number;
}

interface PoolTransaction {
  id: string;
  type: string;
  amount: number;
  balanceAfter: number;
  createdAt: string;
}

// --- Component ---
export default function PoolDetailPage() {
  const params = useParams();
  const agentId = params?.agentId as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pool, setPool] = useState<PoolData | null>(null);
  const [limits, setLimits] = useState<PoolLimits | null>(null);
  const [stats, setStats] = useState<PoolStats | null>(null);
  const [transactions, setTransactions] = useState<PoolTransaction[]>([]);
  const [statsPeriod, setStatsPeriod] = useState('24h');

  // Modal states
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showPhaseModal, setShowPhaseModal] = useState(false);
  const [modalAmount, setModalAmount] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  async function loadData() {
    setLoading(true);
    setError(null);

    // Default fallback pool data
    const fallbackPool: PoolData = {
      agentId,
      agentName: agentId,
      balance: 0,
      currentPhase: 'normal',
      lastUpdated: new Date().toISOString(),
    };

    try {
      // Fetch pool details
      try {
        const response = await fetchPoolDetails(agentId);
        if (response?.success && response?.data) {
          setPool({
            agentId: response.data.agentId || agentId,
            agentName: response.data.agentName || agentId,
            balance: response.data.balance ?? 0,
            currentPhase: response.data.currentPhase || 'normal',
            lastUpdated: response.data.lastUpdated || new Date().toISOString(),
          });
        } else {
          setPool(fallbackPool);
        }
      } catch {
        // Fallback
        setPool(fallbackPool);
      }

      // Fetch limits
      try {
        const limitsData = await fetchPoolLimits(agentId);
        if (limitsData?.canPlay !== undefined) {
          setLimits(limitsData);
        } else {
          setLimits({ canPlay: true, maxBetPayout: 10000 });
        }
      } catch {
        setLimits({ canPlay: true, maxBetPayout: 10000 });
      }

      // Fetch stats
      try {
        const statsData = await fetchPoolStats(agentId, statsPeriod);
        setStats(statsData);
      } catch {
        setStats(null);
      }

      // Fetch transactions
      try {
        const txResponse = await fetchPoolTransactions(agentId, { limit: 50 });
        if (txResponse?.transactions && Array.isArray(txResponse.transactions)) {
          const txList = txResponse.transactions.map((tx: ApiPoolTransaction) => ({
            id: tx.id,
            type: tx.type,
            amount: tx.amount ?? 0,
            balanceAfter: tx.balanceAfter ?? 0,
            createdAt: tx.createdAt,
          }));
          setTransactions(txList);
        } else {
          setTransactions([]);
        }
      } catch {
        setTransactions([]);
      }
    } catch (err) {
      setError('Erro ao carregar dados do pool');
      setPool(fallbackPool);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (agentId) {
      loadData();
    }
  }, [agentId, statsPeriod]);

  // Handle deposit
  async function handleDeposit() {
    const amount = parseFloat(modalAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Digite um valor válido');
      return;
    }

    setModalLoading(true);
    try {
      await adminDepositToPool(agentId, amount, modalDescription || 'Depósito administrativo');
      setShowDepositModal(false);
      setModalAmount('');
      setModalDescription('');
      loadData();
    } catch (err) {
      alert('Erro ao depositar');
    } finally {
      setModalLoading(false);
    }
  }

  // Handle withdraw
  async function handleWithdraw() {
    const amount = parseFloat(modalAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Digite um valor válido');
      return;
    }

    if (pool && amount > pool.balance) {
      alert('Saldo insuficiente');
      return;
    }

    setModalLoading(true);
    try {
      await adminWithdrawFromPool(agentId, amount, modalDescription || 'Saque administrativo');
      setShowWithdrawModal(false);
      setModalAmount('');
      setModalDescription('');
      loadData();
    } catch (err) {
      alert('Erro ao sacar');
    } finally {
      setModalLoading(false);
    }
  }

  // Handle phase change
  async function handlePhaseChange(phase: 'retention' | 'normal' | 'release') {
    setModalLoading(true);
    try {
      await adminSetPoolPhase(agentId, phase);
      setShowPhaseModal(false);
      loadData();
    } catch (err) {
      alert('Erro ao alterar fase');
    } finally {
      setModalLoading(false);
    }
  }

  if (loading) {
    return (
      <ProtectedLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-60" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </ProtectedLayout>
    );
  }

  if (error || !pool) {
    return (
      <ProtectedLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" />
          <p className="text-xl text-destructive mb-4">{error || 'Pool não encontrado'}</p>
          <Button asChild variant="outline">
            <Link href="/pools">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Pools
            </Link>
          </Button>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <Button asChild variant="ghost" size="sm">
          <Link href="/pools">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Pools
          </Link>
        </Button>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {pool.agentName?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{pool.agentName || 'Agente'}</h1>
              <p className="text-muted-foreground font-mono text-sm">{agentId}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={() => setShowDepositModal(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <Wallet className="h-4 w-4 mr-2" />
              Depositar
            </Button>
            <Button onClick={() => setShowWithdrawModal(true)} variant="secondary" className="bg-amber-600 hover:bg-amber-700 text-white">
              <ArrowDownToLine className="h-4 w-4 mr-2" />
              Sacar
            </Button>
            <Button onClick={() => setShowPhaseModal(true)} variant="secondary" className="bg-purple-600 hover:bg-purple-700 text-white">
              <Zap className="h-4 w-4 mr-2" />
              Alterar Fase
            </Button>
            <Button onClick={loadData} variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-emerald-500/30 bg-emerald-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Saldo do Pool
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${pool.balance > 0 ? 'text-emerald-500' : 'text-destructive'}`}>
                {formatCurrency(pool.balance)}
              </p>
            </CardContent>
          </Card>

          <Card className={pool.currentPhase === 'retention' ? 'border-destructive/30 bg-destructive/5' : pool.currentPhase === 'release' ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-amber-500/30 bg-amber-500/5'}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Fase Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={getPhaseVariant(pool.currentPhase)} className="text-lg py-1 px-3">
                {getPhaseLabel(pool.currentPhase)}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Payout Máximo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-500">
                {limits ? formatCurrency(limits.maxBetPayout) : 'N/A'}
              </p>
            </CardContent>
          </Card>

          <Card className={limits?.canPlay ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-destructive/30 bg-destructive/5'}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={limits?.canPlay ? 'default' : 'destructive'} className="text-lg py-1 px-3">
                {limits?.canPlay ? '✅ Operando' : '❌ Bloqueado'}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Stats Period Selector */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Estatísticas
              </CardTitle>
              <div className="flex gap-2">
                {['1h', '24h', '7d', '30d'].map((period) => (
                  <Button
                    key={period}
                    variant={statsPeriod === period ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatsPeriod(period)}
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">{stats?.spinsCount?.toLocaleString() || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Spins</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-500">{formatCurrency(stats?.totalBets || 0)}</p>
                <p className="text-xs text-muted-foreground mt-1">Apostas</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-amber-500">{formatCurrency(stats?.totalWins || 0)}</p>
                <p className="text-xs text-muted-foreground mt-1">Pagamentos</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className={`text-2xl font-bold ${(stats?.ggr || 0) >= 0 ? 'text-emerald-500' : 'text-destructive'}`}>
                  {formatCurrency(stats?.ggr || 0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">GGR</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-purple-500">{formatPercent(stats?.rtp || 0)}</p>
                <p className="text-xs text-muted-foreground mt-1">RTP</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📋 Últimas Transações
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <span className="text-3xl block mb-2">📭</span>
                <p>Nenhuma transação ainda</p>
              </div>
            ) : (
              <div className="divide-y divide-border max-h-96 overflow-y-auto">
                {transactions.map((tx, index) => (
                  <div key={tx.id || index} className="py-3 flex items-center justify-between hover:bg-muted/50 px-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center bg-muted">
                        {tx.type === 'bet' && <Dices className="h-4 w-4 text-purple-400" />}
                        {tx.type === 'win' && <Coins className="h-4 w-4 text-amber-400" />}
                        {tx.type === 'deposit' && <Banknote className="h-4 w-4 text-emerald-400" />}
                        {tx.type === 'withdraw' && <ArrowUpFromLine className="h-4 w-4 text-red-400" />}
                        {tx.type === 'adjustment' && <Settings className="h-4 w-4 text-blue-400" />}
                        {tx.type === 'phase_change' && <Zap className="h-4 w-4 text-yellow-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium capitalize">{tx.type}</p>
                        <p className="text-xs text-muted-foreground">{new Date(tx.createdAt).toLocaleString('pt-BR')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${tx.amount >= 0 ? 'text-emerald-500' : 'text-destructive'}`}>
                        {tx.amount >= 0 ? '+' : ''}{formatCurrency(tx.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatCurrency(tx.balanceAfter)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Deposit Modal */}
      <Dialog open={showDepositModal} onOpenChange={setShowDepositModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Depositar no Pool
            </DialogTitle>
            <DialogDescription>
              Adicione saldo ao pool do agente
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deposit-amount">Valor (R$)</Label>
              <Input
                id="deposit-amount"
                type="number"
                value={modalAmount}
                onChange={(e) => setModalAmount(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit-desc">Descrição (opcional)</Label>
              <Input
                id="deposit-desc"
                type="text"
                value={modalDescription}
                onChange={(e) => setModalDescription(e.target.value)}
                placeholder="Depósito administrativo"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowDepositModal(false)}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              onClick={handleDeposit}
              disabled={modalLoading}
            >
              {modalLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                'Confirmar'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdraw Modal */}
      <Dialog open={showWithdrawModal} onOpenChange={setShowWithdrawModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowDownToLine className="h-5 w-5" />
              Sacar do Pool
            </DialogTitle>
            <DialogDescription>
              Saldo disponível: <span className="text-emerald-500 font-bold">{formatCurrency(pool.balance)}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="withdraw-amount">Valor (R$)</Label>
              <Input
                id="withdraw-amount"
                type="number"
                value={modalAmount}
                onChange={(e) => setModalAmount(e.target.value)}
                placeholder="0.00"
                min="0"
                max={pool.balance}
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="withdraw-desc">Descrição (opcional)</Label>
              <Input
                id="withdraw-desc"
                type="text"
                value={modalDescription}
                onChange={(e) => setModalDescription(e.target.value)}
                placeholder="Saque administrativo"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowWithdrawModal(false)}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 bg-amber-600 hover:bg-amber-700"
              onClick={handleWithdraw}
              disabled={modalLoading}
            >
              {modalLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                'Confirmar'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Phase Change Modal */}
      <Dialog open={showPhaseModal} onOpenChange={setShowPhaseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Alterar Fase
            </DialogTitle>
            <DialogDescription>
              Fase atual: <Badge variant={getPhaseVariant(pool.currentPhase)}>{getPhaseLabel(pool.currentPhase)}</Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20"
              onClick={() => handlePhaseChange('retention')}
              disabled={modalLoading || pool.currentPhase === 'retention'}
            >
              <Lock className="h-4 w-4 mr-2" />
              Retenção (10% win chance)
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20"
              onClick={() => handlePhaseChange('normal')}
              disabled={modalLoading || pool.currentPhase === 'normal'}
            >
              <Scale className="h-4 w-4 mr-2" />
              Normal (35% win chance)
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20"
              onClick={() => handlePhaseChange('release')}
              disabled={modalLoading || pool.currentPhase === 'release'}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Liberação (65% win chance)
            </Button>
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowPhaseModal(false)}
            >
              Cancelar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ProtectedLayout>
  );
}
