'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_BASE } from '@/lib/config';

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
    
    // Load webhook URLs from agent data
    setWebhookUrl(parsedAgent.webhookUrl || '');
    setBalanceCallbackUrl(parsedAgent.balanceCallbackUrl || '');
    setDebitCallbackUrl(parsedAgent.debitCallbackUrl || '');
    setCreditCallbackUrl(parsedAgent.creditCallbackUrl || '');
    
    // Also fetch fresh data from API
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
          // Update localStorage
          localStorage.setItem('agentData', JSON.stringify(data.data));
        }
      }
    } catch (error) {
      console.error('Failed to fetch agent data:', error);
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
        // Update local state
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

  function handleLogout() {
    localStorage.removeItem('agentToken');
    localStorage.removeItem('agentData');
    router.push('/');
  }

  async function copyToClipboard(text: string, field: string) {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }

  const API_BASE_URL = API_BASE;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header com Saldo */}
      <header className="border-b border-slate-700 bg-slate-800/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                <span className="text-xl">🎰</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">{agent?.name}</h1>
                <p className="text-xs text-slate-400">{agent?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-700/50 rounded-xl px-6 py-3 border border-slate-600">
              <span className="text-2xl">🎰</span>
              <div className="text-right">
                <p className="text-xs text-slate-400">Créditos de Spin</p>
                <p className={`text-2xl font-bold ${Number(agent?.spinCredits) > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {Number(agent?.spinCredits || 0).toLocaleString('pt-BR')} créditos
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-slate-700 hover:bg-red-600/20 hover:text-red-400 border border-slate-600 hover:border-red-500/50 px-4 py-2 text-sm text-slate-300 transition"
            >
              <span>🚪</span>
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-slate-700/50 bg-slate-800/30">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex gap-1">
            <Link
              href="/dashboard"
              className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition"
            >
              📊 Dashboard
            </Link>
            <Link
              href="/dashboard/games"
              className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition"
            >
              🎮 Jogos
            </Link>
            <Link
              href="/dashboard/transactions"
              className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition"
            >
              📋 Transações
            </Link>
            <Link
              href="/dashboard/integration"
              className="px-4 py-3 text-sm font-medium text-emerald-400 border-b-2 border-emerald-400"
            >
              🔗 Integração
            </Link>
            <Link
              href="/dashboard/settings"
              className="px-4 py-3 text-sm font-medium text-slate-400 hover:text-white border-b-2 border-transparent hover:border-slate-600 transition"
            >
              ⚙️ Configurações
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">Integração com sua Bet</h2>
          <p className="text-slate-400 text-sm mt-1">
            Use as credenciais abaixo para conectar os jogos na sua plataforma
          </p>
        </div>

        {/* API Credentials */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 mb-6">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <span>🔑</span> Credenciais da API
          </h3>

          <div className="space-y-4">
            {/* API Key */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">API Key</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-4 py-3 text-emerald-400 font-mono text-sm">
                  {agent?.apiKey || 'Carregando...'}
                </code>
                <button
                  onClick={() => copyToClipboard(agent?.apiKey || '', 'apiKey')}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                    copiedField === 'apiKey'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {copiedField === 'apiKey' ? '✓ Copiado!' : '📋 Copiar'}
                </button>
              </div>
            </div>

            {/* API Secret */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">API Secret</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <code className="block w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-3 text-emerald-400 font-mono text-sm pr-12">
                    {showSecret ? agent?.apiSecret : '••••••••••••••••••••••••••••••••'}
                  </code>
                  <button
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showSecret ? '🙈' : '👁️'}
                  </button>
                </div>
                <button
                  onClick={() => copyToClipboard(agent?.apiSecret || '', 'apiSecret')}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                    copiedField === 'apiSecret'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {copiedField === 'apiSecret' ? '✓ Copiado!' : '📋 Copiar'}
                </button>
              </div>
            </div>

            {/* Base URL */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">URL Base da API</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-4 py-3 text-blue-400 font-mono text-sm">
                  {API_BASE_URL}
                </code>
                <button
                  onClick={() => copyToClipboard(API_BASE_URL, 'baseUrl')}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                    copiedField === 'baseUrl'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {copiedField === 'baseUrl' ? '✓ Copiado!' : '📋 Copiar'}
                </button>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-4 p-3 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-start gap-2">
            <span>⚠️</span>
            <p className="text-sm text-amber-300">
              Mantenha seu <strong>API Secret</strong> em segurança. Nunca compartilhe ou exponha no frontend.
            </p>
          </div>
        </div>

        {/* Integration Steps */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 mb-6">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <span>📚</span> Como Integrar
          </h3>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">Autenticar na API</h4>
                <p className="text-sm text-slate-400 mt-1 mb-3">
                  Use suas credenciais para obter um token de acesso
                </p>
                <div className="rounded-lg bg-slate-900 p-4 overflow-x-auto">
                  <pre className="text-sm text-slate-300">
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
              <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">Criar Sessão de Jogo</h4>
                <p className="text-sm text-slate-400 mt-1 mb-3">
                  Crie uma sessão quando o jogador quiser jogar
                </p>
                <div className="rounded-lg bg-slate-900 p-4 overflow-x-auto">
                  <pre className="text-sm text-slate-300">
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
              <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">Redirecionar para o Jogo</h4>
                <p className="text-sm text-slate-400 mt-1 mb-3">
                  Use a URL retornada para abrir o jogo em iframe ou nova aba
                </p>
                <div className="rounded-lg bg-slate-900 p-4 overflow-x-auto">
                  <pre className="text-sm text-slate-300">
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
          </div>
        </div>

        {/* Webhook Configuration */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <span>🔔</span> Configuração de Webhooks
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            Configure os endpoints da sua bet para receber notificações em tempo real sobre eventos do jogo.
          </p>

          <div className="space-y-4">
            {/* Balance Callback URL */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">URL de Consulta de Saldo</label>
              <input
                type="url"
                value={balanceCallbackUrl}
                onChange={(e) => setBalanceCallbackUrl(e.target.value)}
                placeholder="https://suabet.com/api/webhooks/game-provider/balance"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">POST - Chamado para consultar saldo do jogador</p>
            </div>

            {/* Debit Callback URL */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">URL de Débito (Aposta)</label>
              <input
                type="url"
                value={debitCallbackUrl}
                onChange={(e) => setDebitCallbackUrl(e.target.value)}
                placeholder="https://suabet.com/api/webhooks/game-provider/debit"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">POST - Chamado quando jogador faz uma aposta</p>
            </div>

            {/* Credit Callback URL */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">URL de Crédito (Ganho)</label>
              <input
                type="url"
                value={creditCallbackUrl}
                onChange={(e) => setCreditCallbackUrl(e.target.value)}
                placeholder="https://suabet.com/api/webhooks/game-provider/credit"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">POST - Chamado quando jogador ganha</p>
            </div>

            {/* General Webhook URL (optional) */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">URL de Eventos Gerais (Opcional)</label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://suabet.com/api/webhooks/game-provider/events"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">POST - Recebe todos os eventos (game.start, game.end, etc)</p>
            </div>

            <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/50">
              <p className="text-sm text-blue-300">
                <strong>ℹ️ Importante:</strong> Configure pelo menos balance, debit e credit para que o saldo do jogador atualize em tempo real na sua bet.
              </p>
            </div>

            {/* Message */}
            {webhookMessage && (
              <div className={`p-3 rounded-lg border ${
                webhookMessage.type === 'success' 
                  ? 'bg-emerald-500/20 border-emerald-500/50' 
                  : 'bg-red-500/20 border-red-500/50'
              }`}>
                <p className={`text-sm ${webhookMessage.type === 'success' ? 'text-emerald-300' : 'text-red-300'}`}>
                  {webhookMessage.type === 'success' ? '✅' : '❌'} {webhookMessage.text}
                </p>
              </div>
            )}

            <button 
              onClick={handleSaveWebhooks}
              disabled={savingWebhook}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {savingWebhook ? '⏳ Salvando...' : '💾 Salvar Webhooks'}
            </button>
          </div>
        </div>

        {/* Documentation Link */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Precisa de mais ajuda? Consulte a{' '}
            <a href="#" className="text-emerald-400 hover:text-emerald-300 underline">
              documentação completa da API
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
