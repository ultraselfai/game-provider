'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

// Helper function to set cookie
function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function LoginForm() {
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
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg overflow-hidden">
              <Image
                src="/game-provider-simbol.png"
                alt="Game Provider"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-semibold">Game Provider</span>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Painel Admin</h1>
          <p className="text-muted-foreground text-balance">
            Acesse o painel administrativo
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            E-mail
          </label>
          <Input
            id="email"
            type="email"
            placeholder="admin@gameprovider.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Senha
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </button>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="p-6 md:p-8">
                <Suspense fallback={
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" />
                  </div>
                }>
                  <LoginForm />
                </Suspense>
              </div>

              {/* Side Image */}
              <div className="relative hidden md:block overflow-hidden">
                <Image
                  src="/capa-admin.png"
                  alt="Game Provider Admin"
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
