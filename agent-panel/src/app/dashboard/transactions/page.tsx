'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AGENT_API } from '@/lib/config';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RefreshCw,
  Search,
  Filter,
  CreditCard,
  ArrowDownToLine,
  ArrowUpFromLine,
  BarChart3,
  X,
  Info,
} from 'lucide-react';

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

export default function TransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtros
  const [filterType, setFilterType] = useState<string>('all');
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

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (filterType !== 'all' && tx.type !== filterType) return false;

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

      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const desc = (tx.description || '').toLowerCase();
        const ref = (tx.reference || '').toLowerCase();
        if (!desc.includes(search) && !ref.includes(search)) return false;
      }

      return true;
    });
  }, [transactions, filterType, filterDateFrom, filterDateTo, searchTerm]);

  function clearFilters() {
    setFilterType('all');
    setFilterDateFrom('');
    setFilterDateTo('');
    setSearchTerm('');
  }

  const hasFilters = filterType !== 'all' || filterDateFrom || filterDateTo || searchTerm;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Transações</h1>
        <p className="text-muted-foreground">
          Histórico completo de movimentações da sua conta
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive">
          {error}
        </div>
      )}

      {/* Filtros */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Filter className="size-4" />
              Filtros
            </CardTitle>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="size-4 mr-1" />
                Limpar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[150px]">
              <label className="text-xs text-muted-foreground mb-1 block">Tipo</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="credit">Crédito</SelectItem>
                  <SelectItem value="debit">Débito</SelectItem>
                  <SelectItem value="ggr_fee">Taxa GGR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[150px]">
              <label className="text-xs text-muted-foreground mb-1 block">De</label>
              <Input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
              />
            </div>

            <div className="flex-1 min-w-[150px]">
              <label className="text-xs text-muted-foreground mb-1 block">Até</label>
              <Input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="text-xs text-muted-foreground mb-1 block">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar na descrição..."
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Transações */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Histórico</CardTitle>
            <span className="text-sm text-muted-foreground">
              {filteredTransactions.length} de {transactions.length} transações
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CreditCard className="size-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nenhuma transação encontrada</p>
              {hasFilters && (
                <Button variant="link" onClick={clearFilters} className="mt-2">
                  Limpar filtros
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="text-muted-foreground">
                        {new Date(tx.createdAt).toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            tx.type === 'credit'
                              ? 'success'
                              : tx.type === 'ggr_fee'
                              ? 'secondary'
                              : 'destructive'
                          }
                        >
                          <span className="flex items-center gap-1">
                            {tx.type === 'credit' ? (
                              <ArrowDownToLine className="size-3" />
                            ) : tx.type === 'ggr_fee' ? (
                              <BarChart3 className="size-3" />
                            ) : (
                              <ArrowUpFromLine className="size-3" />
                            )}
                            {tx.type === 'credit' ? 'Crédito' : tx.type === 'ggr_fee' ? 'Taxa GGR' : 'Débito'}
                          </span>
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
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-4 pt-6">
          <Info className="size-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold text-primary">Sobre as transações</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Cada spin dos jogadores consome 1 crédito da sua conta.
              Créditos são adicionados quando você faz uma recarga via PIX ou transferência.
              Use os filtros acima para encontrar transações específicas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
