'use client';

import { useState, useEffect } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, TrendingDown, TrendingUp, DollarSign, Search, AlertCircle, ArrowDownCircle, ArrowUpCircle, RotateCcw } from 'lucide-react';
import { ADMIN_API } from '@/lib/config';

interface Transaction {
  id: string;
  transactionId: string;
  type: 'debit' | 'credit' | 'refund' | 'bet' | 'win';
  amount: number;
  currency: string;
  status: string;
  playerId: string;
  createdAt: string;
}

const typeLabels: Record<string, { text: string; color: string; icon: React.ReactNode }> = {
  debit: { text: 'Aposta', color: 'text-red-500', icon: <ArrowUpCircle className="h-4 w-4" /> },
  credit: { text: 'Ganho', color: 'text-emerald-500', icon: <ArrowDownCircle className="h-4 w-4" /> },
  refund: { text: 'Estorno', color: 'text-amber-500', icon: <RotateCcw className="h-4 w-4" /> },
  bet: { text: 'Aposta', color: 'text-red-500', icon: <ArrowUpCircle className="h-4 w-4" /> },
  win: { text: 'Ganho', color: 'text-emerald-500', icon: <ArrowDownCircle className="h-4 w-4" /> },
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    setLoading(true);
    try {
      const res = await fetch(`${ADMIN_API}/transactions`);
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

  const getTypeInfo = (type: string) => {
    return typeLabels[type] || { text: type, color: 'text-muted-foreground', icon: <DollarSign className="h-4 w-4" /> };
  };

  const filteredTransactions = transactions
    .filter(tx => typeFilter === 'all' || tx.type === typeFilter)
    .filter(tx => 
      search === '' || 
      tx.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      tx.playerId.toLowerCase().includes(search.toLowerCase())
    );

  // Calculate stats (placeholder values - would come from API in production)
  const stats = {
    totalBets: transactions.filter(t => t.type === 'debit' || t.type === 'bet').reduce((sum, t) => sum + t.amount, 0),
    totalWins: transactions.filter(t => t.type === 'credit' || t.type === 'win').reduce((sum, t) => sum + t.amount, 0),
    ggr: 0,
  };
  stats.ggr = stats.totalBets - stats.totalWins;

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Transações</h1>
            <p className="text-muted-foreground">Histórico de todas as transações</p>
          </div>
          <Button variant="outline" onClick={fetchTransactions} disabled={loading}>
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
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-red-500/30 bg-red-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Apostas (24h)</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                R$ {stats.totalBets.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
          <Card className="border-emerald-500/30 bg-emerald-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Ganhos (24h)</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">
                R$ {stats.totalWins.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-500/30 bg-blue-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GGR (24h)</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                R$ {stats.ggr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por TX ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="debit">Apostas</SelectItem>
              <SelectItem value="credit">Ganhos</SelectItem>
              <SelectItem value="refund">Estornos</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" className="w-40" />
        </div>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Transações</CardTitle>
            <CardDescription>
              {filteredTransactions.length} transaç{filteredTransactions.length !== 1 ? 'ões' : 'ão'} encontrada{filteredTransactions.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma transação encontrada</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>TX ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => {
                    const typeInfo = getTypeInfo(tx.type);
                    return (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <code className="rounded bg-muted px-2 py-1 text-xs text-purple-500">
                            {tx.transactionId}
                          </code>
                        </TableCell>
                        <TableCell>
                          <div className={`flex items-center gap-2 ${typeInfo.color}`}>
                            {typeInfo.icon}
                            <span>{typeInfo.text}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={`font-medium ${tx.type === 'credit' || tx.type === 'win' ? 'text-emerald-500' : ''}`}>
                            {tx.type === 'credit' || tx.type === 'win' ? '+' : '-'} R$ {tx.amount.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{tx.playerId}</TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={tx.status === 'success' ? 'default' : tx.status === 'pending' ? 'secondary' : 'destructive'}
                            className={tx.status === 'success' ? 'bg-emerald-500/20 text-emerald-500' : ''}
                          >
                            {tx.status === 'success' ? '✓ Sucesso' : tx.status === 'pending' ? '⏳ Pendente' : '✗ Falhou'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(tx.createdAt).toLocaleString('pt-BR')}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
