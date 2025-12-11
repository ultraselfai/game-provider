'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE } from '@/lib/config';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  RefreshCw,
  Settings,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  email: string;
  balance: number;
}

export default function SettingsPage() {
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('agentToken');
    const agentData = localStorage.getItem('agentData');

    if (!token || !agentData) {
      router.push('/');
      return;
    }

    const parsedAgent = JSON.parse(agentData);
    setAgent(parsedAgent);
    setLoading(false);
  }, [router]);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('As senhas não coincidem');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    const token = localStorage.getItem('agentToken');
    if (!token) return;

    setPasswordLoading(true);

    try {
      const response = await fetch(`${API_BASE}/agent/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPasswordSuccess('Senha alterada com sucesso!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordError(data.message || 'Erro ao alterar senha');
      }
    } catch (error) {
      console.error('Failed to change password:', error);
      setPasswordError('Erro de conexão. Tente novamente.');
    } finally {
      setPasswordLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e segurança da conta
        </p>
      </div>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="size-5" />
            Informações da Conta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Nome</label>
              <div className="rounded-lg bg-muted border px-4 py-3 text-sm">
                {agent?.name || 'N/A'}
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Email</label>
              <div className="rounded-lg bg-muted border px-4 py-3 text-sm">
                {agent?.email || 'N/A'}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Para alterar nome ou email, entre em contato com o suporte.
          </p>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="size-5" />
            Alterar Senha
          </CardTitle>
          <CardDescription>
            Mantenha sua conta segura atualizando sua senha regularmente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            {/* Current Password */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Senha Atual</label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Digite sua senha atual"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Nova Senha</label>
              <div className="relative">
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Digite a nova senha"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Confirmar Nova Senha</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirme a nova senha"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>
            </div>

            {/* Error Message */}
            {passwordError && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/50 flex items-center gap-2">
                <AlertTriangle className="size-4 text-destructive" />
                <p className="text-sm text-destructive">{passwordError}</p>
              </div>
            )}

            {/* Success Message */}
            {passwordSuccess && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/50 flex items-center gap-2">
                <CheckCircle className="size-4 text-emerald-500" />
                <p className="text-sm text-emerald-500">{passwordSuccess}</p>
              </div>
            )}

            <Button type="submit" disabled={passwordLoading}>
              <Save className="size-4 mr-2" />
              {passwordLoading ? 'Salvando...' : 'Alterar Senha'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
