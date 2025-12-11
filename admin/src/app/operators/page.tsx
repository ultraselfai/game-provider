'use client';

import { useState, useEffect } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Plus,
  Building2,
  Settings,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Copy,
  AlertTriangle,
} from 'lucide-react';
import { AGENT_API, ADMIN_KEY } from '@/lib/config';

interface Operator {
  id: string;
  name: string;
  apiKey: string;
  isActive: boolean;
  webhookUrl: string | null;
  createdAt: string;
}

export default function OperatorsPage() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchOperators();
  }, []);

  async function fetchOperators() {
    try {
      const res = await fetch(`${AGENT_API}/operators`, {
        headers: { 'x-admin-key': ADMIN_KEY },
      });
      const data = await res.json();
      // API pode retornar array direto ou { success, data }
      if (Array.isArray(data)) {
        setOperators(data);
      } else if (data.success && Array.isArray(data.data)) {
        setOperators(data.data);
      } else if (Array.isArray(data.data)) {
        setOperators(data.data);
      } else {
        setError('Falha ao carregar operadores');
      }
    } catch (err) {
      setError('Erro de conexão com a API');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Operadores</h1>
            <p className="text-muted-foreground">
              Gerencie os operadores integrados ao sistema
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Operador
          </Button>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/30 p-4 text-destructive">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Lista de Operadores
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>API Key</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Webhook</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operators.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Building2 className="h-10 w-10" />
                          <p>Nenhum operador cadastrado</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    operators.map((op) => (
                      <TableRow key={op.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                              {op.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium">{op.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="rounded bg-muted px-2 py-1 text-xs text-emerald-500 font-mono">
                            {op.apiKey.slice(0, 20)}...
                          </code>
                        </TableCell>
                        <TableCell>
                          <Badge variant={op.isActive ? 'default' : 'destructive'}>
                            {op.isActive ? (
                              <><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5" /> Ativo</>
                            ) : (
                              <><span className="h-1.5 w-1.5 rounded-full bg-red-400 mr-1.5" /> Inativo</>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {op.webhookUrl ? (
                            <Badge variant="secondary" className="text-blue-500">
                              Configurado
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">Não configurado</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(op.createdAt).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create Modal */}
      <CreateOperatorModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={() => {
          setShowCreateModal(false);
          fetchOperators();
        }}
      />
    </ProtectedLayout>
  );
}

function CreateOperatorModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ apiKey: string; apiSecret: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${AGENT_API}/operators`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY,
        },
        body: JSON.stringify({ name, webhookUrl: webhookUrl || undefined }),
      });
      const data = await res.json();

      if (data.success) {
        setResult({
          apiKey: data.data.apiKey,
          apiSecret: data.data.apiSecret,
        });
      } else {
        setError(data.message || 'Erro ao criar operador');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setName('');
    setWebhookUrl('');
    setResult(null);
    setError(null);
    onClose();
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {result ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-emerald-500">
                <CheckCircle2 className="h-5 w-5" />
                Operador Criado!
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 text-amber-500">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <p className="text-sm">
                <strong>IMPORTANTE:</strong> Guarde o API Secret abaixo. Ele não será mostrado novamente!
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={result.apiKey}
                    className="font-mono text-emerald-500"
                  />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.apiKey)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>API Secret</Label>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={result.apiSecret}
                    className="font-mono text-amber-500"
                  />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.apiSecret)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={onCreated} className="w-full bg-emerald-600 hover:bg-emerald-700">
              Fechar
            </Button>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Novo Operador</DialogTitle>
              <DialogDescription>
                Crie um novo operador para integrar ao sistema
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: BetDemo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook">Webhook URL (opcional)</Label>
                <Input
                  id="webhook"
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://api.exemplo.com/webhook"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Criando...
                    </>
                  ) : (
                    'Criar'
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
