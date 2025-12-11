'use client';

import { useState, useEffect } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Users, Eye, XCircle, Search, AlertCircle } from 'lucide-react';
import { ADMIN_API } from '@/lib/config';

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

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    setLoading(true);
    try {
      const res = await fetch(`${ADMIN_API}/sessions`);
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

  const filteredSessions = sessions
    .filter(s => statusFilter === 'all' || s.status === statusFilter)
    .filter(s => 
      search === '' || 
      s.playerId.toLowerCase().includes(search.toLowerCase()) ||
      s.sessionToken.toLowerCase().includes(search.toLowerCase())
    );

  const stats = {
    total: sessions.length,
    active: sessions.filter(s => s.status === 'active').length,
    closed: sessions.filter(s => s.status === 'closed').length,
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Sessões</h1>
            <p className="text-muted-foreground">Monitore todas as sessões de jogo</p>
          </div>
          <Button variant="outline" onClick={fetchSessions} disabled={loading}>
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Sessões</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessões Ativas</CardTitle>
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessões Fechadas</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">{stats.closed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por player ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="active">Ativas</SelectItem>
              <SelectItem value="closed">Fechadas</SelectItem>
              <SelectItem value="expired">Expiradas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sessions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Sessões</CardTitle>
            <CardDescription>
              {filteredSessions.length} sessão{filteredSessions.length !== 1 ? 'ões' : ''} encontrada{filteredSessions.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredSessions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma sessão encontrada</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sessão</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Jogo</TableHead>
                    <TableHead>Operador</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead>Iniciada</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <code className="rounded bg-muted px-2 py-1 text-xs text-blue-500">
                          {session.sessionToken.slice(0, 16)}...
                        </code>
                      </TableCell>
                      <TableCell className="font-medium">{session.playerId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>🐯</span>
                          <span className="text-muted-foreground">{session.gameCode}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {session.operator?.name || 'N/A'}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={session.status === 'active' ? 'default' : session.status === 'closed' ? 'secondary' : 'destructive'}
                          className={session.status === 'active' ? 'bg-emerald-500/20 text-emerald-500' : ''}
                        >
                          <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                            session.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-current'
                          }`} />
                          {session.status === 'active' ? 'Ativa' : session.status === 'closed' ? 'Fechada' : 'Expirada'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(session.createdAt).toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-400">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
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
