// Pool API helpers for Admin Panel
import { API_BASE } from './config';

// Types
export interface AgentPool {
  agentId: string;
  agentName: string;
  balance: number;
  currentPhase: 'retention' | 'normal' | 'release';
  lastUpdated: string;
  config?: PoolConfig;
}

export interface PoolConfig {
  autoPhaseEnabled: boolean;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  thresholds: {
    lowBalance: number;
    criticalBalance: number;
    releaseBalance: number;
  };
  winChances: {
    retention: number;
    normal: number;
    release: number;
  };
  maxMultipliers: {
    retention: number;
    normal: number;
    release: number;
  };
}

export interface PoolStats {
  period: string;
  totalBets: number;
  totalWins: number;
  totalDeposits: number;
  totalWithdrawals: number;
  ggr: number;
  rtp: number;
  spinsCount: number;
  avgBetSize: number;
  biggestWin: number;
  phaseChanges: number;
}

export interface PoolTransaction {
  id: string;
  type: 'bet' | 'win' | 'deposit' | 'withdraw' | 'adjustment' | 'phase_change';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface AllPoolsResponse {
  success: boolean;
  data: {
    pools: AgentPool[];
    totals: {
      totalBalance: number;
      totalPools: number;
      byPhase: {
        retention: number;
        normal: number;
        release: number;
      };
      volume24h: {
        bets: number;
        wins: number;
        ggr: number;
      };
    };
  };
}

export interface PoolDetailsResponse {
  success: boolean;
  data: AgentPool & {
    stats24h?: PoolStats;
  };
}

// Fetch all pools (admin overview)
export async function fetchAllPools(): Promise<AllPoolsResponse> {
  const res = await fetch(`${API_BASE}/admin/pools`);
  if (!res.ok) throw new Error('Falha ao buscar pools');
  return res.json();
}

// Fetch single pool details
export async function fetchPoolDetails(agentId: string): Promise<PoolDetailsResponse> {
  const res = await fetch(`${API_BASE}/pool/${agentId}`);
  if (!res.ok) throw new Error('Falha ao buscar pool');
  return res.json();
}

// Fetch pool limits
export async function fetchPoolLimits(agentId: string) {
  const res = await fetch(`${API_BASE}/pool/${agentId}/limits`);
  if (!res.ok) throw new Error('Falha ao buscar limites');
  return res.json();
}

// Fetch pool stats
export async function fetchPoolStats(agentId: string, period: string = '24h') {
  const res = await fetch(`${API_BASE}/pool/${agentId}/stats?period=${period}`);
  if (!res.ok) throw new Error('Falha ao buscar estatísticas');
  return res.json();
}

// Fetch pool transactions
export async function fetchPoolTransactions(
  agentId: string,
  params: { page?: number; limit?: number; type?: string; startDate?: string; endDate?: string } = {}
) {
  const query = new URLSearchParams();
  if (params.page) query.set('page', params.page.toString());
  if (params.limit) query.set('limit', params.limit.toString());
  if (params.type) query.set('type', params.type);
  if (params.startDate) query.set('startDate', params.startDate);
  if (params.endDate) query.set('endDate', params.endDate);

  const res = await fetch(`${API_BASE}/pool/${agentId}/transactions?${query}`);
  if (!res.ok) throw new Error('Falha ao buscar transações');
  
  const data = await res.json();
  // API returns { success, data: { transactions, pagination } }
  return {
    transactions: data?.data?.transactions || [],
    pagination: data?.data?.pagination || { page: 1, limit: 20, total: 0 },
  };
}

// Admin deposit to pool
export async function adminDepositToPool(agentId: string, amount: number, description: string) {
  const res = await fetch(`${API_BASE}/admin/pool/${agentId}/deposit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, description }),
  });
  if (!res.ok) throw new Error('Falha ao depositar');
  return res.json();
}

// Admin withdraw from pool
export async function adminWithdrawFromPool(agentId: string, amount: number, description: string) {
  const res = await fetch(`${API_BASE}/admin/pool/${agentId}/withdraw`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, description }),
  });
  if (!res.ok) throw new Error('Falha ao sacar');
  return res.json();
}

// Set pool phase (admin override)
export async function adminSetPoolPhase(agentId: string, phase: 'retention' | 'normal' | 'release') {
  const res = await fetch(`${API_BASE}/pool/${agentId}/phase`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phase }),
  });
  if (!res.ok) throw new Error('Falha ao alterar fase');
  return res.json();
}

// Update pool config
export async function updatePoolConfig(agentId: string, config: Partial<PoolConfig>) {
  const res = await fetch(`${API_BASE}/pool/${agentId}/config`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });
  if (!res.ok) throw new Error('Falha ao atualizar configuração');
  return res.json();
}

// Reset pool stats
export async function resetPoolStats(agentId: string) {
  const res = await fetch(`${API_BASE}/pool/${agentId}/stats/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Falha ao resetar estatísticas');
  return res.json();
}

// Format currency
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

// Format percentage
export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// Get phase color class
export function getPhaseColor(phase: string): string {
  switch (phase) {
    case 'retention':
      return 'text-red-400 bg-red-500/20 border-red-500/30';
    case 'normal':
      return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
    case 'release':
      return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
    default:
      return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
  }
}

// Get phase label
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

// Get phase icon
export function getPhaseIcon(phase: string): string {
  switch (phase) {
    case 'retention':
      return '🔴';
    case 'normal':
      return '🟡';
    case 'release':
      return '🟢';
    default:
      return '⚪';
  }
}
