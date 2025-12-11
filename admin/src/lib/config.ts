// API Configuration - centralizado para facilitar manutenção
// IMPORTANT: NEXT_PUBLIC_* vars are embedded at BUILD TIME, not runtime

// Detectar ambiente baseado no hostname do browser
function getApiBase(): string {
  // Se estiver no servidor (SSR), usar variável de ambiente ou fallback
  if (typeof window === 'undefined') {
    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    if (envUrl) {
      // Se a URL já tem /api/v1, usar diretamente, senão adicionar
      return envUrl.includes('/api/v1') ? envUrl : `${envUrl}/api/v1`;
    }
    return 'http://localhost:3006/api/v1';
  }
  
  // No browser, detectar automaticamente baseado no hostname
  const hostname = window.location.hostname;
  
  // Se estiver em produção (não localhost)
  if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    return 'https://api.gameprovider.fun/api/v1';
  }
  
  // Desenvolvimento local
  return 'http://localhost:3006/api/v1';
}

export const API_BASE = getApiBase();
export const ADMIN_API = `${API_BASE}/admin`;
export const AGENT_API = `${API_BASE}/agent`;
export const ADMIN_KEY = 'dev-admin-key';

// Debug log (only in browser)
if (typeof window !== 'undefined') {
  console.log('[Config] API_BASE:', API_BASE);
  console.log('[Config] Hostname:', window.location.hostname);
}
