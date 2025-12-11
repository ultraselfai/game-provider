'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AGENT_API } from '@/lib/config';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  CreditCard, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw,
  Wallet,
  Gamepad2,
  Info,
  ChevronRight,
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  email: string;
  balance: number;
  spinCredits: number;
  totalCreditsPurchased: number;
  totalSpinsConsumed: number;
  ggrRate: number;
  isActive: boolean;
  apiKey: string;
  apiSecret: string;
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

function formatDescription(tx: Transaction): string {
  if (tx.type === 'credit') {
    return 'Saldo adicionado - Game Provider';
  }
  return 'Slot debitado';
}

function formatValue(tx: Transaction): string {
  if (tx.type === 'credit') {
    return `R$ ${Math.abs(Number(tx.amount)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  }
  return '1';
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
      const [profileRes, transactionsRes] = await Promise.all([
        fetch(`${AGENT_API}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${AGENT_API}/transactions`, {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const recentTransactions = transactions.slice(0, 5);
  const credits = Math.floor(Number(agent?.spinCredits || 0));
  const totalCredits = Math.floor(Number(agent?.totalCreditsPurchased || 0));
  const totalConsumed = Math.floor(Number(agent?.totalSpinsConsumed || 0));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral da sua conta no Game Provider
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Créditos Disponíveis
            </CardTitle>
            <Wallet className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{credits.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Créditos para spins
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Comprado
            </CardTitle>
            <CreditCard className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCredits.toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="size-3" />
              Créditos adquiridos
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Consumido
            </CardTitle>
            <Gamepad2 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              {totalConsumed.toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-500 mt-1">
              <ArrowDownRight className="size-3" />
              Spins realizados
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              GGR
            </CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Number(agent?.ggrRate || 0).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Consumo de API do provedor
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Histórico Recente</CardTitle>
            <CardDescription>
              Últimas movimentações da sua conta
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/transactions">
              Ver todas
              <ChevronRight className="ml-1 size-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CreditCard className="size-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nenhuma transação encontrada</p>
              <p className="text-sm text-muted-foreground mt-1">
                Suas transações aparecerão aqui quando houver movimentação
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-right">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-muted-foreground">
                      {new Date(tx.createdAt).toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={tx.type === 'credit' ? 'success' : tx.type === 'ggr_fee' ? 'secondary' : 'destructive'}
                      >
                        {tx.type === 'credit' ? 'Crédito' : tx.type === 'ggr_fee' ? 'Taxa GGR' : 'Débito'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDescription(tx)}</TableCell>
                    <TableCell className="text-right">
                      <span className={tx.type === 'credit' ? 'text-emerald-500' : 'text-red-500'}>
                        {tx.type === 'credit' ? '+' : '-'} {formatValue(tx)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {Math.floor(Number(tx.newBalance))} créditos
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-4 pt-6">
          <Info className="size-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold text-primary">Como funcionam os créditos?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Seus créditos de spin são consumidos quando os jogadores da sua bet utilizam os jogos. 
              Cada rodada (spin) debita 1 crédito. Para adicionar mais créditos, 
              entre em contato com o provedor via PIX ou transferência bancária.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
