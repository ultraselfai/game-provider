'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/agents', label: 'Agentes' },
    { href: '/games', label: 'Games' },
    { href: '/sessions', label: 'Sessões' },
    { href: '/transactions', label: 'Transações' },
  ];

  function handleLogout() {
    // Limpar cookie de autenticação
    document.cookie = 'admin_authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // Redirecionar para login
    router.push('/login');
  }

  return (
    <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎰</span>
          <h1 className="text-xl font-bold text-white">Game Provider Admin</h1>
        </div>
        
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? 'text-emerald-400 font-medium'
                  : 'text-slate-400 hover:text-white transition'
              }
            >
              {item.label}
            </Link>
          ))}
          
          {/* Botão de Logout */}
          <button
            onClick={handleLogout}
            className="ml-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sair
          </button>
        </nav>
      </div>
    </header>
  );
}
