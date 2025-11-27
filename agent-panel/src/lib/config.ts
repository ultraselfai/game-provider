// API Configuration - centralizado para facilitar manutenção
// IMPORTANT: NEXT_PUBLIC_* vars are embedded at BUILD TIME, not runtime
// Make sure to pass NEXT_PUBLIC_API_URL as a build argument in Docker

// Production fallback if env var is not set during build
const PRODUCTION_API = 'https://api.ultraself.space/api/v1';
const LOCAL_API = 'http://localhost:3006/api/v1';

// Use NEXT_PUBLIC_API_URL if set, otherwise fallback based on environment
export const API_BASE = 
  process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
    ? PRODUCTION_API 
    : LOCAL_API);

export const AGENT_API = `${API_BASE}/agent`;
export const ADMIN_API = `${API_BASE}/admin`;

// Debug log (only in browser)
if (typeof window !== 'undefined') {
  console.log('[Config] API_BASE:', API_BASE);
  console.log('[Config] NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
}
