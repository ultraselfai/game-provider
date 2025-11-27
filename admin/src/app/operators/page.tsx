'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎰</span>
            <h1 className="text-xl font-bold text-white">Game Provider Admin</h1>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="text-slate-400 hover:text-white transition">Dashboard</Link>
            <Link href="/operators" className="text-emerald-400 font-medium">Operadores</Link>
            <Link href="/sessions" className="text-slate-400 hover:text-white transition">Sessões</Link>
            <Link href="/transactions" className="text-slate-400 hover:text-white transition">Transações</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Operadores</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition"
          >
            <span>➕</span> Novo Operador
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/20 border border-red-500/50 p-4 text-red-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          </div>
        ) : (
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800">
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Nome</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">API Key</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Webhook</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Criado em</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-slate-300">Ações</th>
                </tr>
              </thead>
              <tbody>
                {operators.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      Nenhum operador cadastrado
                    </td>
                  </tr>
                ) : (
                  operators.map((op) => (
                    <tr key={op.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">🏢</span>
                          <span className="font-medium text-white">{op.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="rounded bg-slate-700 px-2 py-1 text-xs text-emerald-400">
                          {op.apiKey.slice(0, 20)}...
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                          op.isActive
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${op.isActive ? 'bg-emerald-400' : 'bg-red-400'}`} />
                          {op.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {op.webhookUrl ? (
                          <span className="text-blue-400">Configurado</span>
                        ) : (
                          <span className="text-slate-500">Não configurado</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(op.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="rounded p-1 text-slate-400 hover:bg-slate-700 hover:text-white transition">
                          ⚙️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateOperatorModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            setShowCreateModal(false);
            fetchOperators();
          }}
        />
      )}
    </div>
  );
}

function CreateOperatorModal({
  onClose,
  onCreated,
}: {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-2xl">
        {result ? (
          <>
            <div className="mb-4 flex items-center gap-2 text-emerald-400">
              <span className="text-2xl">✅</span>
              <h3 className="text-lg font-semibold">Operador Criado!</h3>
            </div>
            <div className="mb-4 rounded-lg bg-amber-500/20 border border-amber-500/50 p-3">
              <p className="text-sm text-amber-300">
                ⚠️ <strong>IMPORTANTE:</strong> Guarde o API Secret abaixo. Ele não será mostrado novamente!
              </p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400">API Key</label>
                <input
                  readOnly
                  value={result.apiKey}
                  className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm text-emerald-400 font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">API Secret</label>
                <input
                  readOnly
                  value={result.apiSecret}
                  className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm text-amber-400 font-mono"
                />
              </div>
            </div>
            <button
              onClick={onCreated}
              className="mt-6 w-full rounded-lg bg-emerald-600 py-2 font-medium text-white hover:bg-emerald-500 transition"
            >
              Fechar
            </button>
          </>
        ) : (
          <>
            <h3 className="mb-4 text-lg font-semibold text-white">Novo Operador</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300">Nome *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: BetDemo"
                    className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300">Webhook URL (opcional)</label>
                  <input
                    type="url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://api.exemplo.com/webhook"
                    className="mt-1 w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-4 rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-slate-600 py-2 text-slate-300 hover:bg-slate-700 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-emerald-600 py-2 font-medium text-white hover:bg-emerald-500 transition disabled:opacity-50"
                >
                  {loading ? 'Criando...' : 'Criar'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
