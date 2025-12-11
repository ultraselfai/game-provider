'use client';

import { useEffect, useState } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Users, Plus, RefreshCw, Search, DollarSign, Gamepad2, Eye, Copy, Check, AlertCircle, Key, Lock, Coins, MoreVertical, Trash2 } from 'lucide-react';
import { ADMIN_API, AGENT_API, ADMIN_KEY } from '@/lib/config';

interface Agent {
  id: string;
  name: string;
  email: string;
  phone?: string;
  apiKey: string;
  balance: number;
  spinCredits: number;
  totalCreditsPurchased: number;
  totalSpinsConsumed: number;
  creditPrice: number;
  ggrRate: number;
  allowedGames: string[];
  isActive: boolean;
  useLocalBalance: boolean;
  totalDeposited: number;
  totalWagered: number;
  totalWon: number;
  createdAt: string;
  lastLoginAt?: string;
}

interface AgentTransaction {
  id: string;
  type: string;
  amount: number;
  description?: string;
  createdAt: string;
}

interface Game {
  gameCode: string;
  gameName: string;
  provider: string;
  rtp: number;
}

// Apenas jogos validados e funcionais
const ALLOWED_GAMES = [
  'fortunetiger',
  'fortunemouse',
  'fortunerabbit',
  'fortuneox',
  'fortunepanda',
  'phoenixrises',
  'hoodvswoolf',
];

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreditModal, setShowCreditModal] = useState<Agent | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState<Agent | null>(null);
  const [showGamesModal, setShowGamesModal] = useState<Agent | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<Agent | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchAgents();
  }, []);

  async function fetchAgents() {
    setLoading(true);
    try {
      const res = await fetch(`${AGENT_API}/agents`, {
        headers: { 'x-admin-key': ADMIN_KEY },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setAgents(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch agents:', err);
    } finally {
      setLoading(false);
    }
  }

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.email.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDeleteAgent() {
    if (!showDeleteModal) return;
    
    setDeleting(true);
    try {
      const res = await fetch(`${AGENT_API}/agents/${showDeleteModal.id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': ADMIN_KEY },
      });
      const data = await res.json();
      if (data.success) {
        setShowDeleteModal(null);
        fetchAgents();
      } else {
        console.error('Failed to delete agent:', data.message);
      }
    } catch (err) {
      console.error('Failed to delete agent:', err);
    } finally {
      setDeleting(false);
    }
  }

  const stats = {
    totalAgents: agents.length,
    activeAgents: agents.filter((a) => a.isActive).length,
    totalSpins: agents.reduce((sum, a) => sum + Number(a.totalSpinsConsumed || 0), 0),
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Agentes</h1>
            <p className="text-muted-foreground">Gerencie os agentes parceiros da plataforma</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={fetchAgents} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Agente
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Agentes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAgents}</div>
              <p className="text-xs text-muted-foreground">registrados na plataforma</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agentes Ativos</CardTitle>
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">{stats.activeAgents}</div>
              <p className="text-xs text-muted-foreground">operando ativamente</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Créditos Consumidos</CardTitle>
              <Gamepad2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSpins.toLocaleString('pt-BR')}</div>
              <p className="text-xs text-muted-foreground">créditos utilizados</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar agente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Agents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Agentes</CardTitle>
            <CardDescription>
              {filteredAgents.length} agente{filteredAgents.length !== 1 ? 's' : ''} encontrado{filteredAgents.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredAgents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum agente encontrado</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agente</TableHead>
                    <TableHead className="text-right">Saldo / Créditos</TableHead>
                    <TableHead className="text-center">Jogos</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold">
                            {agent.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium">{agent.name}</p>
                            <p className="text-sm text-muted-foreground">{agent.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <p className={`text-lg font-bold flex items-center justify-end gap-1.5 ${(Number(agent.spinCredits) || 0) > 0 ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                          <Coins className="h-4 w-4" />
                          {(Number(agent.spinCredits) || 0).toLocaleString('pt-BR')} créditos
                        </p>
                        <p className="text-xs text-muted-foreground">GGR: 10%</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                          PGSOFT
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={agent.isActive ? 'default' : 'destructive'} className={agent.isActive ? 'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30' : ''}>
                          <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${agent.isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {agent.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => setShowGamesModal(agent)}>
                            <Gamepad2 className="h-4 w-4 mr-1" />
                            Jogos
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setShowCreditModal(agent)} className="text-emerald-500 border-emerald-500/50 hover:bg-emerald-500/10">
                            <DollarSign className="h-4 w-4 mr-1" />
                            Créditos
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setShowDetailsModal(agent)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver detalhes
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => setShowDeleteModal(agent)}
                                className="text-red-500 focus:text-red-500"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Excluir agente
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

      {/* Modals */}
      <CreateAgentModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={() => {
          setShowCreateModal(false);
          fetchAgents();
        }}
      />

      {showCreditModal && (
        <CreditModal
          agent={showCreditModal}
          onClose={() => setShowCreditModal(null)}
          onUpdated={() => {
            setShowCreditModal(null);
            fetchAgents();
          }}
        />
      )}

      {showDetailsModal && (
        <AgentDetailsModal
          agent={showDetailsModal}
          onClose={() => setShowDetailsModal(null)}
        />
      )}

      {showGamesModal && (
        <GamesModal
          agent={showGamesModal}
          onClose={() => setShowGamesModal(null)}
          onUpdated={() => {
            setShowGamesModal(null);
            fetchAgents();
          }}
        />
      )}

      {/* Modal de confirmação de exclusão */}
      <AlertDialog open={!!showDeleteModal} onOpenChange={() => setShowDeleteModal(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Agente</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o agente <strong>{showDeleteModal?.name}</strong>?
              <br /><br />
              Esta ação é irreversível e irá remover:
              <ul className="list-disc list-inside mt-2 text-muted-foreground">
                <li>Todas as transações do agente</li>
                <li>Todas as sessões de jogo</li>
                <li>Todas as configurações personalizadas</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAgent}
              disabled={deleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleting ? 'Excluindo...' : 'Excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ProtectedLayout>
  );
}

// =====================================================
// MODAL: Criar Agente
// =====================================================
function CreateAgentModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [ggrRate, setGgrRate] = useState('10');
  const [initialBalance, setInitialBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ apiKey: string; apiSecret: string; id: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function resetForm() {
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setGgrRate('10');
    setInitialBalance('');
    setResult(null);
    setError(null);
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${AGENT_API}/agents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY,
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone: phone || undefined,
          ggrRate: Number(ggrRate),
          initialBalance: initialBalance ? Number(initialBalance) : 0,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setResult({
          id: data.data.id,
          apiKey: data.data.apiKey,
          apiSecret: data.data.apiSecret,
        });
      } else {
        setError(data.message || 'Erro ao criar agente');
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-lg">
        {result ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-emerald-500">
                <Check className="h-5 w-5" />
                Agente Criado com Sucesso!
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="rounded-lg bg-amber-500/20 border border-amber-500/50 p-3">
                <p className="text-sm text-amber-500 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <strong>IMPORTANTE:</strong> Guarde o API Secret abaixo. Ele <strong>NÃO</strong> será mostrado novamente!
                </p>
              </div>
              <CopyField label="API Key" value={result.apiKey} className="text-emerald-500" />
              <CopyField label="API Secret" value={result.apiSecret} className="text-amber-500" />
              <Button onClick={() => { resetForm(); onCreated(); }} className="w-full">
                Entendi, salvei as credenciais
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Novo Agente</DialogTitle>
              <DialogDescription>Preencha os dados para criar um novo agente parceiro</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium">Nome *</label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Casa de Apostas XYZ"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agente@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Senha *</label>
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Telefone</label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Taxa GGR (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={ggrRate}
                    onChange={(e) => setGgrRate(e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium">Saldo Inicial (R$)</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={initialBalance}
                    onChange={(e) => setInitialBalance(e.target.value)}
                    placeholder="0.00 (opcional)"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-500 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Criando...
                    </>
                  ) : (
                    'Criar Agente'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// =====================================================
// MODAL: Adicionar/Remover Créditos de Spin
// =====================================================
function CreditModal({
  agent,
  onClose,
  onUpdated,
}: {
  agent: Agent;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [credits, setCredits] = useState('');
  const [description, setDescription] = useState('');
  const [operation, setOperation] = useState<'add' | 'remove'>('add');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const quickAmounts = [100, 500, 1000, 5000, 10000];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const endpoint = operation === 'add' ? 'credits' : 'debit';

    try {
      const res = await fetch(`${AGENT_API}/agents/${agent.id}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY,
        },
        body: JSON.stringify({
          credits: Number(credits),
          description: description || undefined,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(data.message);
        setTimeout(() => {
          onUpdated();
        }, 1500);
      } else {
        setError(data.message || 'Erro na operação');
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Gerenciar Créditos</DialogTitle>
          <DialogDescription>Adicionar ou remover créditos do agente</DialogDescription>
        </DialogHeader>

        {/* Agent Info */}
        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              {agent.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{agent.name}</p>
              <p className="text-sm text-muted-foreground">
                Créditos disponíveis: <span className="text-emerald-500 font-semibold inline-flex items-center gap-1"><Coins className="h-3.5 w-3.5" /> {Number(agent.spinCredits || 0).toLocaleString('pt-BR')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Operation Toggle */}
        <Tabs value={operation} onValueChange={(v) => setOperation(v as 'add' | 'remove')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add">➕ Adicionar</TabsTrigger>
            <TabsTrigger value="remove">➖ Remover</TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Quantidade de Créditos *</label>
            <Input
              type="number"
              required
              min="1"
              step="1"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              placeholder="0"
              className="text-xl text-center font-bold mt-1"
            />
            <p className="text-xs text-muted-foreground text-center mt-1">1 crédito = 1 jogada do jogador</p>
          </div>

          {/* Quick Amount Buttons */}
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((val) => (
              <Button
                key={val}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCredits(val.toString())}
              >
              <Coins className="h-3.5 w-3.5 mr-1" />
                {val.toLocaleString('pt-BR')}
              </Button>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium">Descrição</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Compra via PIX #12345"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-500 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-lg bg-emerald-500/20 border border-emerald-500/50 p-3 text-sm text-emerald-500 flex items-center gap-2">
              <Check className="h-4 w-4" />
              {success}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading || !credits}
              variant={operation === 'remove' ? 'destructive' : 'default'}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : operation === 'add' ? (
                `Adicionar ${credits || '0'} créditos`
              ) : (
                `Remover ${credits || '0'} créditos`
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// =====================================================
// MODAL: Detalhes do Agente
// =====================================================
function AgentDetailsModal({
  agent,
  onClose,
}: {
  agent: Agent;
  onClose: () => void;
}) {
  const [transactions, setTransactions] = useState<AgentTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, [agent.id]);

  async function fetchTransactions() {
    try {
      const res = await fetch(`${AGENT_API}/agents/${agent.id}/transactions`, {
        headers: { 'x-admin-key': ADMIN_KEY },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setTransactions(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMessage(null);

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Senha deve ter pelo menos 6 caracteres' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'As senhas não conferem' });
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch(`${AGENT_API}/agents/${agent.id}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY,
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      if (data.success) {
        setPasswordMessage({ type: 'success', text: 'Senha alterada com sucesso!' });
        setNewPassword('');
        setConfirmPassword('');
        setShowPasswordReset(false);
      } else {
        setPasswordMessage({ type: 'error', text: data.message || 'Erro ao alterar senha' });
      }
    } catch {
      setPasswordMessage({ type: 'error', text: 'Erro de conexão' });
    } finally {
      setPasswordLoading(false);
    }
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Agente</DialogTitle>
        </DialogHeader>

        {/* Agent Header */}
        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl">
              {agent.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold">{agent.name}</h4>
              <p className="text-muted-foreground">{agent.email}</p>
              {agent.phone && <p className="text-sm text-muted-foreground">{agent.phone}</p>}
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Saldo</p>
              <p className="text-2xl font-bold text-emerald-500">
                R$ {(Number(agent.balance) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3">
          <Card className="p-3 text-center">
            <p className="text-xs text-muted-foreground">GGR Rate</p>
            <p className="text-lg font-bold text-purple-500">{agent.ggrRate || 0}%</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Depositado</p>
            <p className="text-lg font-bold text-emerald-500">R$ {(Number(agent.totalDeposited) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Apostado</p>
            <p className="text-lg font-bold text-blue-500">R$ {(Number(agent.totalWagered) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Ganho</p>
            <p className="text-lg font-bold text-amber-500">R$ {(Number(agent.totalWon) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </Card>
        </div>

        {/* API Key */}
        <CopyField label="API Key" value={agent.apiKey} icon={<Key className="h-4 w-4" />} />

        {/* Reset Password Section */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm font-medium flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Senha do Agente
            </h5>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPasswordReset(!showPasswordReset)}
            >
              {showPasswordReset ? 'Cancelar' : 'Alterar Senha'}
            </Button>
          </div>

          {passwordMessage && (
            <div className={`mb-3 p-2 rounded text-sm flex items-center gap-2 ${
              passwordMessage.type === 'success' 
                ? 'bg-emerald-500/20 text-emerald-500' 
                : 'bg-red-500/20 text-red-500'
            }`}>
              {passwordMessage.type === 'success' ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              {passwordMessage.text}
            </div>
          )}

          {showPasswordReset && (
            <form onSubmit={handleResetPassword} className="space-y-3">
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nova senha (mín. 6 caracteres)"
                required
              />
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar nova senha"
                required
              />
              <Button type="submit" disabled={passwordLoading} className="w-full">
                {passwordLoading ? 'Salvando...' : 'Salvar Nova Senha'}
              </Button>
            </form>
          )}
        </Card>

        {/* Recent Transactions */}
        <div>
          <h5 className="text-sm font-medium mb-3">Últimas Transações</h5>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma transação encontrada
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {transactions.slice(0, 10).map((tx) => (
                <Card key={tx.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">
                        {tx.type.includes('DEPOSIT') || tx.type.includes('WIN') ? '💰' : tx.type.includes('GGR') ? '📊' : '💸'}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{tx.type.replace(/_/g, ' ')}</p>
                        <p className="text-xs text-muted-foreground">{tx.description || '-'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${Number(tx.amount) > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {Number(tx.amount) > 0 ? '+' : ''}R$ {Number(tx.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(tx.createdAt).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// =====================================================
// MODAL: Gerenciar Jogos do Agente
// =====================================================
function GamesModal({
  agent,
  onClose,
  onUpdated,
}: {
  agent: Agent;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [selectedGames, setSelectedGames] = useState<string[]>(agent.allowedGames || []);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectAll, setSelectAll] = useState(agent.allowedGames?.length === 0);

  useEffect(() => {
    fetchGames();
  }, []);

  async function fetchGames() {
    try {
      const res = await fetch(`${ADMIN_API}/games`);
      const data = await res.json();
      let games: Game[] = [];
      if (Array.isArray(data)) {
        games = data;
      } else if (data.success && Array.isArray(data.data)) {
        games = data.data;
      }
      // Filtrar apenas jogos validados
      const filteredGames = games.filter((g: Game) => ALLOWED_GAMES.includes(g.gameCode));
      setAllGames(filteredGames);
    } catch (err) {
      console.error('Failed to fetch games:', err);
      setError('Erro ao carregar jogos');
    } finally {
      setLoading(false);
    }
  }

  function toggleGame(gameCode: string) {
    if (selectAll) {
      setSelectAll(false);
      setSelectedGames([gameCode]);
    } else {
      setSelectedGames(prev => 
        prev.includes(gameCode)
          ? prev.filter(g => g !== gameCode)
          : [...prev, gameCode]
      );
    }
  }

  function handleSelectAll(checked: boolean) {
    setSelectAll(checked);
    if (checked) {
      setSelectedGames([]);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const gamesToSave = selectAll ? [] : selectedGames;

      const res = await fetch(`${AGENT_API}/agents/${agent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY,
        },
        body: JSON.stringify({
          allowedGames: gamesToSave,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(selectAll 
          ? 'Todos os jogos liberados!' 
          : `${selectedGames.length} jogo(s) liberado(s)!`
        );
        setTimeout(() => {
          onUpdated();
        }, 1500);
      } else {
        setError(data.message || 'Erro ao salvar');
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gerenciar Jogos</DialogTitle>
          <DialogDescription>Selecione quais jogos {agent.name} pode acessar</DialogDescription>
        </DialogHeader>

        {/* Agent Info */}
        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              {agent.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{agent.name}</p>
              <p className="text-sm text-muted-foreground">
                Jogos liberados: {' '}
                <span className="text-emerald-500 font-semibold">
                  {agent.allowedGames?.length === 0 ? 'Todos' : agent.allowedGames?.length || 0}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Select All Toggle */}
        <Card className="p-4 border-emerald-500/30 bg-emerald-500/10">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="w-5 h-5 rounded border-muted bg-background text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
            />
            <div>
              <p className="font-medium">🎮 Liberar todos os jogos</p>
              <p className="text-xs text-muted-foreground">O agente terá acesso a todos os jogos disponíveis, incluindo novos</p>
            </div>
          </label>
        </Card>

        {!selectAll && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium">
                Selecione os jogos específicos ({selectedGames.length} selecionado{selectedGames.length !== 1 ? 's' : ''})
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedGames(allGames.map(g => g.gameCode))}
                >
                  Selecionar todos
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedGames([])}
                >
                  Limpar seleção
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto p-1">
                {allGames.map((game) => (
                  <label
                    key={game.gameCode}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition border ${
                      selectedGames.includes(game.gameCode)
                        ? 'bg-emerald-500/20 border-emerald-500/50'
                        : 'bg-muted/30 border-transparent hover:bg-muted/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedGames.includes(game.gameCode)}
                      onChange={() => toggleGame(game.gameCode)}
                      className="w-4 h-4 rounded border-muted bg-background text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{game.gameName}</p>
                      <p className="text-xs text-muted-foreground">{game.provider} • RTP {game.rtp}%</p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-500 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg bg-emerald-500/20 border border-emerald-500/50 p-3 text-sm text-emerald-500 flex items-center gap-2">
            <Check className="h-4 w-4" />
            {success}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || (!selectAll && selectedGames.length === 0)}
          >
            {saving ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar Alterações'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// =====================================================
// Helper Component: Copy Field
// =====================================================
function CopyField({ label, value, className, icon }: { label: string; value: string; className?: string; icon?: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <label className="text-xs text-muted-foreground font-medium flex items-center gap-1">
        {icon}
        {label}
      </label>
      <div className="mt-1 flex gap-2">
        <Input
          readOnly
          value={value}
          className={`font-mono ${className || ''}`}
        />
        <Button variant="outline" size="icon" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
