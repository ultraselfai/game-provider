'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Helper function to set cookie
function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Admin credentials (in production, validate against backend)
    // For now, using simple credentials
    if (email === 'admin@gameprovider.com' && password === 'admin123') {
      // Store auth token in cookie (accessible by proxy/middleware)
      setCookie('admin_token', 'admin-authenticated', 7);
      
      // Also store in localStorage for client-side checks
      localStorage.setItem('admin_token', 'admin-authenticated');
      localStorage.setItem('admin_email', email);
      
      // Redirect to original destination or home
      const redirect = searchParams.get('redirect') || '/';
      router.push(redirect);
    } else {
      setError('Credenciais inválidas');
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-600/20 mb-4">
            <span className="text-5xl">🎰</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Game Provider</h1>
          <p className="text-slate-400 mt-1">Painel Administrativo</p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Entrar</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gameprovider.com"
                className="w-full rounded-lg bg-slate-900 border border-slate-600 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg bg-slate-900 border border-slate-600 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-600 py-3 font-medium text-white hover:bg-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <div className="mt-6 p-3 rounded-lg bg-slate-700/50 text-sm text-slate-400">
            <p className="font-medium text-slate-300 mb-1">🔑 Credenciais de Teste:</p>
            <p>Email: admin@gameprovider.com</p>
            <p>Senha: admin123</p>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          © 2024 Game Provider. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
