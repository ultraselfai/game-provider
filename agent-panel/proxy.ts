import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas públicas que não precisam de autenticação
const publicRoutes = ['/', '/api'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir rota de login (home) e API routes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith('/api'))) {
    return NextResponse.next();
  }

  // Verificar cookie de autenticação
  const authToken = request.cookies.get('agent_token');

  // Se não está autenticado, redirecionar para login
  if (!authToken) {
    const loginUrl = new URL('/', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
