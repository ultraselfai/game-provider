// Pool API - Helpers para comunicação com a API do Pool
import { API_BASE } from './config';

export const POOL_API = `${API_BASE}/pool`;

export interface PoolData {
  id: string;
  agentId: string;
  balance: number;
  currentPhase: 'retention' | 'normal' | 'release';
  isAutoPhase: boolean;
  retentionThreshold: number;
  releaseThreshold: number;
  maxRiskPercent: number;
  retentionWinChance: number;
  normalWinChance: number;
  releaseWinChance: number;
  retentionMaxMultiplier: number;
  normalMaxMultiplier: number;
  releaseMaxMultiplier: number;
  totalBets: number;
  totalPayouts: number;
  totalSpins: number;
  totalWins: number;
  biggestWin: number;
  biggestLoss: number;
  createdAt: string;
  updatedAt: string;
}

export interface PoolLimits {
  canPay: boolean;
  maxPayout: number;
  maxMultiplier: number;
  currentPhase: string;
  effectiveWinChance: number;
  poolBalance: number;
  reason?: string;
}

export interface PoolTransaction {
  id: string;
  type: 'bet' | 'payout' | 'deposit' | 'withdraw' | 'adjustment';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  note: string;
  gameCode?: string;
  playerId?: string;
  createdAt: string;
}

export interface PoolStats {
  period: string;
  balance: number;
  totalBets: number;
  totalPayouts: number;
  netProfit: number;
  rtp: number;
  totalSpins: number;
  totalWins: number;
  winRate: number;
  biggestWin: number;
  biggestLoss: number;
  avgBet: number;
  avgPayout: number;
  transactionCount: number;
}

export interface PoolConfig {
  isAutoPhase?: boolean;
  retentionThreshold?: number;
  releaseThreshold?: number;
  maxRiskPercent?: number;
  retentionWinChance?: number;
  normalWinChance?: number;
  releaseWinChance?: number;
  retentionMaxMultiplier?: number;
  normalMaxMultiplier?: number;
  releaseMaxMultiplier?: number;
}

// Função auxiliar para pegar o agentId do localStorage
function getAgentId(): string | null {
  if (typeof window === 'undefined') return null;
  const agentData = localStorage.getItem('agentData');
  if (!agentData) return null;
  const agent = JSON.parse(agentData);
  return agent.id;
}

// Função auxiliar para pegar o token
function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('agentToken');
}

// Headers padrão
function getHeaders(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// Buscar dados do pool
export async function fetchPool(): Promise<{ success: boolean; data?: PoolData; message?: string }> {
  const agentId = getAgentId();
  if (!agentId) return { success: false, message: 'Agente não autenticado' };

  try {
    const res = await fetch(`${POOL_API}/${agentId}`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    return { success: true, data: data.data || data };
  } catch (error) {
    console.error('[Pool API] Erro ao buscar pool:', error);
    return { success: false, message: 'Erro de conexão' };
  }
}

// Buscar limites de payout
export async function fetchPoolLimits(): Promise<{ success: boolean; data?: PoolLimits; message?: string }> {
  const agentId = getAgentId();
  if (!agentId) return { success: false, message: 'Agente não autenticado' };

  try {
    const res = await fetch(`${POOL_API}/${agentId}/limits`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error('[Pool API] Erro ao buscar limites:', error);
    return { success: false, message: 'Erro de conexão' };
  }
}

// Depositar no pool
export async function depositToPool(amount: number, description?: string): Promise<{ success: boolean; data?: { newBalance: number }; message?: string }> {
  const agentId = getAgentId();
  if (!agentId) return { success: false, message: 'Agente não autenticado' };

  try {
    const res = await fetch(`${POOL_API}/${agentId}/deposit`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ amount, description }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('[Pool API] Erro ao depositar:', error);
    return { success: false, message: 'Erro de conexão' };
  }
}

// Sacar do pool
export async function withdrawFromPool(amount: number, description?: string): Promise<{ success: boolean; data?: { newBalance: number }; message?: string }> {
  const agentId = getAgentId();
  if (!agentId) return { success: false, message: 'Agente não autenticado' };

  try {
    const res = await fetch(`${POOL_API}/${agentId}/withdraw`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ amount, description }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('[Pool API] Erro ao sacar:', error);
    return { success: false, message: 'Erro de conexão' };
  }
}

// Definir fase manualmente
export async function setPoolPhase(phase: 'retention' | 'normal' | 'release'): Promise<{ success: boolean; message?: string }> {
  const agentId = getAgentId();
  if (!agentId) return { success: false, message: 'Agente não autenticado' };

  try {
    const res = await fetch(`${POOL_API}/${agentId}/phase`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ phase }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('[Pool API] Erro ao definir fase:', error);
    return { success: false, message: 'Erro de conexão' };
  }
}

// Atualizar configurações
export async function updatePoolConfig(config: PoolConfig): Promise<{ success: boolean; message?: string }> {
  const agentId = getAgentId();
  if (!agentId) return { success: false, message: 'Agente não autenticado' };

  try {
    const res = await fetch(`${POOL_API}/${agentId}/config`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(config),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('[Pool API] Erro ao atualizar config:', error);
    return { success: false, message: 'Erro de conexão' };
  }
}

// Buscar histórico de transações
export async function fetchPoolTransactions(params?: {
  type?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}): Promise<{ success: boolean; data?: PoolTransaction[]; total?: number; message?: string }> {
  const agentId = getAgentId();
  if (!agentId) return { success: false, message: 'Agente não autenticado' };

  try {
    const queryParams = new URLSearchParams();
    if (params?.type) queryParams.append('type', params.type);
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const url = `${POOL_API}/${agentId}/transactions${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const res = await fetch(url, {
      headers: getHeaders(),
    });
    const data = await res.json();
    // API retorna: { success, data: { transactions: [], pagination: {} } }
    const transactions = data?.data?.transactions || data?.transactions || data?.data || [];
    const total = data?.data?.pagination?.total || data?.total || 0;
    return { success: true, data: transactions, total };
  } catch (error) {
    console.error('[Pool API] Erro ao buscar transações:', error);
    return { success: false, message: 'Erro de conexão' };
  }
}

// Buscar estatísticas
export async function fetchPoolStats(period?: '24h' | '7d' | '30d' | 'all'): Promise<{ success: boolean; data?: PoolStats; message?: string }> {
  const agentId = getAgentId();
  if (!agentId) return { success: false, message: 'Agente não autenticado' };

  try {
    const url = `${POOL_API}/${agentId}/stats${period ? '?period=' + period : ''}`;
    const res = await fetch(url, {
      headers: getHeaders(),
    });
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error('[Pool API] Erro ao buscar stats:', error);
    return { success: false, message: 'Erro de conexão' };
  }
}

// Resetar estatísticas
export async function resetPoolStats(): Promise<{ success: boolean; message?: string }> {
  const agentId = getAgentId();
  if (!agentId) return { success: false, message: 'Agente não autenticado' };

  try {
    const res = await fetch(`${POOL_API}/${agentId}/reset-stats`, {
      method: 'POST',
      headers: getHeaders(),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('[Pool API] Erro ao resetar stats:', error);
    return { success: false, message: 'Erro de conexão' };
  }
}

// Formatar valor monetário
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

// Formatar percentual
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

// Cores por fase
export function getPhaseColor(phase: string): string {
  switch (phase) {
    case 'retention':
      return 'text-red-400';
    case 'normal':
      return 'text-yellow-400';
    case 'release':
      return 'text-emerald-400';
    default:
      return 'text-slate-400';
  }
}

export function getPhaseBgColor(phase: string): string {
  switch (phase) {
    case 'retention':
      return 'bg-red-500/20 border-red-500/50';
    case 'normal':
      return 'bg-yellow-500/20 border-yellow-500/50';
    case 'release':
      return 'bg-emerald-500/20 border-emerald-500/50';
    default:
      return 'bg-slate-500/20 border-slate-500/50';
  }
}

export function getPhaseLabel(phase: string): string {
  switch (phase) {
    case 'retention':
      return '🔒 Retenção';
    case 'normal':
      return '⚖️ Normal';
    case 'release':
      return '💰 Liberação';
    default:
      return phase;
  }
}

export function getPhaseDescription(phase: string): string {
  switch (phase) {
    case 'retention':
      return 'Jogadores ganham menos, pool acumula saldo';
    case 'normal':
      return 'Equilíbrio entre ganhos e retenção';
    case 'release':
      return 'Jogadores ganham mais, pool distribui lucros';
    default:
      return '';
  }
}
