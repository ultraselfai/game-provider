/**
 * Mock Users Service - Simula usuários para desenvolvimento
 *
 * Em produção, este serviço será substituído por chamadas reais
 * ao banco de dados ou à API da plataforma de apostas.
 */

export interface MockUser {
  id: number;
  email: string;
  name: string;
  balance: number;
  balanceBonus: number;
  isDemo: boolean;
}

export interface Wallet {
  balance: number;
  balanceBonus: number;
  balanceWithdrawal: number;
  totalBalance: number;
}

// Banco de dados simulado em memória
const mockUsers: Map<number, MockUser> = new Map([
  [1, { id: 1, email: 'player1@test.com', name: 'Jogador Teste 1', balance: 1000.00, balanceBonus: 0, isDemo: false }],
  [2, { id: 2, email: 'player2@test.com', name: 'Jogador Teste 2', balance: 500.00, balanceBonus: 50, isDemo: false }],
  [3, { id: 3, email: 'demo@test.com', name: 'Demo Player', balance: 10000.00, balanceBonus: 0, isDemo: true }],
]);

/**
 * Busca um usuário pelo ID
 */
export function getUserById(userId: number): MockUser | null {
  return mockUsers.get(userId) || null;
}

/**
 * Retorna a carteira do usuário
 */
export function getUserWallet(userId: number): Wallet | null {
  const user = mockUsers.get(userId);
  if (!user) return null;

  return {
    balance: user.balance,
    balanceBonus: user.balanceBonus,
    balanceWithdrawal: 0,
    totalBalance: user.balance + user.balanceBonus
  };
}

/**
 * Debita valor da carteira do usuário
 * Segue a mesma lógica do PHP: primeiro bonus, depois balance, depois withdrawal
 */
export function debitUserBalance(userId: number, amount: number): { success: boolean; newBalance: number; source: string } {
  const user = mockUsers.get(userId);
  if (!user) {
    return { success: false, newBalance: 0, source: 'none' };
  }

  const totalBalance = user.balance + user.balanceBonus;
  if (totalBalance < amount) {
    return { success: false, newBalance: totalBalance, source: 'insufficient' };
  }

  let source = 'balance';

  // Prioridade: bonus > balance (igual ao PHP)
  if (user.balanceBonus >= amount) {
    user.balanceBonus -= amount;
    source = 'balance_bonus';
  } else if (user.balance >= amount) {
    user.balance -= amount;
    source = 'balance';
  } else {
    // Combina bonus + balance
    const remaining = amount - user.balanceBonus;
    user.balanceBonus = 0;
    user.balance -= remaining;
    source = 'combined';
  }

  // Arredonda para 2 casas decimais
  user.balance = Math.round(user.balance * 100) / 100;
  user.balanceBonus = Math.round(user.balanceBonus * 100) / 100;

  return {
    success: true,
    newBalance: user.balance + user.balanceBonus,
    source
  };
}

/**
 * Credita valor na carteira do usuário (ganhos)
 */
export function creditUserBalance(userId: number, amount: number): { success: boolean; newBalance: number } {
  const user = mockUsers.get(userId);
  if (!user) {
    return { success: false, newBalance: 0 };
  }

  user.balance += amount;
  user.balance = Math.round(user.balance * 100) / 100;

  return {
    success: true,
    newBalance: user.balance + user.balanceBonus
  };
}

/**
 * Cria um novo usuário de teste
 */
export function createTestUser(id: number, balance: number = 1000, isDemo: boolean = false): MockUser {
  const user: MockUser = {
    id,
    email: `user${id}@test.com`,
    name: `Test User ${id}`,
    balance,
    balanceBonus: 0,
    isDemo
  };
  mockUsers.set(id, user);
  return user;
}

/**
 * Reseta o saldo de um usuário (útil para testes)
 */
export function resetUserBalance(userId: number, newBalance: number = 1000): void {
  const user = mockUsers.get(userId);
  if (user) {
    user.balance = newBalance;
    user.balanceBonus = 0;
  }
}
