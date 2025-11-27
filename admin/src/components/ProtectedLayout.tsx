'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token && pathname !== '/login') {
      router.push('/login');
    } else {
      setIsAuthenticated(!!token);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    router.push('/login');
  };

  // Don't show layout for login page
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎰</span>
            <h1 className="text-xl font-bold text-white">Game Provider Admin</h1>
          </div>
          <nav className="flex items-center gap-6">
            <Link 
              href="/" 
              className={`transition ${pathname === '/' ? 'text-emerald-400 font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/operators" 
              className={`transition ${pathname === '/operators' ? 'text-emerald-400 font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Operadores
            </Link>
            <Link 
              href="/games" 
              className={`transition ${pathname === '/games' ? 'text-emerald-400 font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Games
            </Link>
            <Link 
              href="/sessions" 
              className={`transition ${pathname === '/sessions' ? 'text-emerald-400 font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Sessões
            </Link>
            <Link 
              href="/transactions" 
              className={`transition ${pathname === '/transactions' ? 'text-emerald-400 font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Transações
            </Link>
            <div className="h-6 w-px bg-slate-600 mx-2" />
            <button 
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-400 transition"
            >
              Sair
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      {children}
    </div>
  );
}
