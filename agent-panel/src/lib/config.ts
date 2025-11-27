// API Configuration - centralizado para facilitar manutenção
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3006/api/v1';
export const AGENT_API = `${API_BASE}/agent`;
export const ADMIN_API = `${API_BASE}/admin`;
