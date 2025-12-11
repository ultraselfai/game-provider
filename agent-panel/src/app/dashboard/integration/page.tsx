'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/config';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  RefreshCw,
  Key,
  Eye,
  EyeOff,
  Copy,
  Check,
  Globe,
  AlertTriangle,
  Save,
  Link2,
  Webhook,
  Info,
  Code,
  ExternalLink,
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  email: string;
  balance: number;
  spinCredits: number;
  apiKey: string;
  apiSecret: string;
  webhookUrl?: string;
  balanceCallbackUrl?: string;
  debitCallbackUrl?: string;
  creditCallbackUrl?: string;
}

export default function IntegrationPage() {
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Webhook states
  const [webhookUrl, setWebhookUrl] = useState('');
  const [balanceCallbackUrl, setBalanceCallbackUrl] = useState('');
  const [debitCallbackUrl, setDebitCallbackUrl] = useState('');
  const [creditCallbackUrl, setCreditCallbackUrl] = useState('');
  const [savingWebhook, setSavingWebhook] = useState(false);
  const [webhookMessage, setWebhookMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('agentToken');
    const agentData = localStorage.getItem('agentData');

    if (!token || !agentData) {
      router.push('/');
      return;
    }

    const parsedAgent = JSON.parse(agentData);
    setAgent(parsedAgent);

    setWebhookUrl(parsedAgent.webhookUrl || '');
    setBalanceCallbackUrl(parsedAgent.balanceCallbackUrl || '');
    setDebitCallbackUrl(parsedAgent.debitCallbackUrl || '');
    setCreditCallbackUrl(parsedAgent.creditCallbackUrl || '');

    fetchAgentData(token);
  }, [router]);

  async function fetchAgentData(token: string) {
    try {
      const response = await fetch(`${API_BASE}/agent/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setAgent(data.data);
          setWebhookUrl(data.data.webhookUrl || '');
          setBalanceCallbackUrl(data.data.balanceCallbackUrl || '');
          setDebitCallbackUrl(data.data.debitCallbackUrl || '');
          setCreditCallbackUrl(data.data.creditCallbackUrl || '');
          localStorage.setItem('agentData', JSON.stringify(data.data));
        }
      }
    } catch (error) {
      console.error('Failed to fetch agent data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveWebhooks() {
    const token = localStorage.getItem('agentToken');
    if (!token || !agent) return;

    setSavingWebhook(true);
    setWebhookMessage(null);

    try {
      const response = await fetch(`${API_BASE}/agent/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          webhookUrl: webhookUrl || null,
          balanceCallbackUrl: balanceCallbackUrl || null,
          debitCallbackUrl: debitCallbackUrl || null,
          creditCallbackUrl: creditCallbackUrl || null,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setWebhookMessage({ type: 'success', text: 'Webhooks salvos com sucesso!' });
        const updatedAgent = { ...agent, webhookUrl, balanceCallbackUrl, debitCallbackUrl, creditCallbackUrl };
        setAgent(updatedAgent);
        localStorage.setItem('agentData', JSON.stringify(updatedAgent));
      } else {
        setWebhookMessage({ type: 'error', text: data.message || 'Erro ao salvar webhooks' });
      }
    } catch (error) {
      console.error('Failed to save webhooks:', error);
      setWebhookMessage({ type: 'error', text: 'Erro de conexão. Tente novamente.' });
    } finally {
      setSavingWebhook(false);
    }
  }

  async function copyToClipboard(text: string, field: string) {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }

  const API_BASE_URL = API_BASE;

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
        <h1 className="text-2xl font-bold tracking-tight">Integração</h1>
        <p className="text-muted-foreground">
          Use as credenciais abaixo para conectar os jogos na sua plataforma
        </p>
      </div>

      {/* API Credentials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="size-5" />
            Credenciais da API
          </CardTitle>
          <CardDescription>
            Use essas credenciais para autenticar suas requisições
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* API Key */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">API Key</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-lg bg-muted border px-4 py-3 text-primary font-mono text-sm overflow-x-auto">
                {agent?.apiKey || 'Carregando...'}
              </code>
              <Button
                variant={copiedField === 'apiKey' ? 'default' : 'outline'}
                size="icon"
                onClick={() => copyToClipboard(agent?.apiKey || '', 'apiKey')}
              >
                {copiedField === 'apiKey' ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </div>

          {/* API Secret */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">API Secret</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <code className="block w-full rounded-lg bg-muted border px-4 py-3 pr-12 text-primary font-mono text-sm overflow-x-auto">
                  {showSecret ? agent?.apiSecret : '••••••••••••••••••••••••••••••••'}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowSecret(!showSecret)}
                >
                  {showSecret ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>
              <Button
                variant={copiedField === 'apiSecret' ? 'default' : 'outline'}
                size="icon"
                onClick={() => copyToClipboard(agent?.apiSecret || '', 'apiSecret')}
              >
                {copiedField === 'apiSecret' ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </div>

          {/* Base URL */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">URL Base da API</label>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-lg bg-muted border px-4 py-3 text-blue-500 font-mono text-sm overflow-x-auto">
                {API_BASE_URL}
              </code>
              <Button
                variant={copiedField === 'baseUrl' ? 'default' : 'outline'}
                size="icon"
                onClick={() => copyToClipboard(API_BASE_URL, 'baseUrl')}
              >
                {copiedField === 'baseUrl' ? <Check className="size-4" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </div>

          {/* Warning */}
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2">
            <AlertTriangle className="size-4 text-amber-500 mt-0.5" />
            <p className="text-sm text-amber-500">
              Mantenha seu <strong>API Secret</strong> em segurança. Nunca compartilhe ou exponha no frontend.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Integration Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="size-5" />
            Como Integrar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Autenticar na API</h4>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Use suas credenciais para obter um token de acesso
              </p>
              <div className="rounded-lg bg-muted p-4 overflow-x-auto">
                <pre className="text-sm text-muted-foreground">
{`POST ${API_BASE_URL}/agent/auth
Content-Type: application/json

{
  "apiKey": "${agent?.apiKey || 'SUA_API_KEY'}",
  "apiSecret": "${showSecret ? agent?.apiSecret : 'SEU_API_SECRET'}"
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Criar Sessão de Jogo</h4>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Crie uma sessão quando o jogador quiser jogar
              </p>
              <div className="rounded-lg bg-muted p-4 overflow-x-auto">
                <pre className="text-sm text-muted-foreground">
{`POST ${API_BASE_URL}/agent/sessions
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "playerId": "player123",
  "playerName": "João Silva",
  "gameCode": "fortunetiger",
  "balance": 100.00,
  "currency": "BRL"
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Redirecionar para o Jogo</h4>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Use a URL retornada para abrir o jogo em iframe ou nova aba
              </p>
              <div className="rounded-lg bg-muted p-4 overflow-x-auto">
                <pre className="text-sm text-muted-foreground">
{`// Resposta da criação de sessão
{
  "success": true,
  "data": {
    "sessionToken": "sess_xxx...",
    "gameUrl": "${API_BASE_URL}/play/fortunetiger?token=sess_xxx..."
  }
}

// Exemplo de uso no frontend
<iframe src={gameUrl} width="100%" height="600px" />`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="size-5" />
            Configuração de Webhooks
          </CardTitle>
          <CardDescription>
            Configure os endpoints da sua bet para receber notificações em tempo real sobre eventos do jogo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Balance Callback URL */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">URL de Consulta de Saldo</label>
            <Input
              type="url"
              value={balanceCallbackUrl}
              onChange={(e) => setBalanceCallbackUrl(e.target.value)}
              placeholder="https://suabet.com/api/webhooks/game-provider/balance"
            />
            <p className="text-xs text-muted-foreground mt-1">POST - Chamado para consultar saldo do jogador</p>
          </div>

          {/* Debit Callback URL */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">URL de Débito (Aposta)</label>
            <Input
              type="url"
              value={debitCallbackUrl}
              onChange={(e) => setDebitCallbackUrl(e.target.value)}
              placeholder="https://suabet.com/api/webhooks/game-provider/debit"
            />
            <p className="text-xs text-muted-foreground mt-1">POST - Chamado quando jogador faz uma aposta</p>
          </div>

          {/* Credit Callback URL */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">URL de Crédito (Ganho)</label>
            <Input
              type="url"
              value={creditCallbackUrl}
              onChange={(e) => setCreditCallbackUrl(e.target.value)}
              placeholder="https://suabet.com/api/webhooks/game-provider/credit"
            />
            <p className="text-xs text-muted-foreground mt-1">POST - Chamado quando jogador ganha</p>
          </div>

          {/* General Webhook URL */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">URL de Eventos Gerais (Opcional)</label>
            <Input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://suabet.com/api/webhooks/game-provider/events"
            />
            <p className="text-xs text-muted-foreground mt-1">POST - Recebe todos os eventos (game.start, game.end, etc)</p>
          </div>

          <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 flex items-start gap-2">
            <Info className="size-4 text-primary mt-0.5" />
            <p className="text-sm text-primary">
              <strong>Importante:</strong> Configure pelo menos balance, debit e credit para que o saldo do jogador atualize em tempo real na sua bet.
            </p>
          </div>

          {/* Message */}
          {webhookMessage && (
            <div className={`p-3 rounded-lg border ${
              webhookMessage.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500'
                : 'bg-destructive/10 border-destructive/50 text-destructive'
            }`}>
              <p className="text-sm">{webhookMessage.text}</p>
            </div>
          )}

          <Button onClick={handleSaveWebhooks} disabled={savingWebhook}>
            <Save className="size-4 mr-2" />
            {savingWebhook ? 'Salvando...' : 'Salvar Webhooks'}
          </Button>
        </CardContent>
      </Card>

      {/* Documentation Link */}
      <div className="text-center">
        <p className="text-muted-foreground text-sm">
          Precisa de mais ajuda? Consulte a{' '}
          <a href="#" className="text-primary hover:underline inline-flex items-center gap-1">
            documentação completa da API
            <ExternalLink className="size-3" />
          </a>
        </p>
      </div>
    </div>
  );
}
