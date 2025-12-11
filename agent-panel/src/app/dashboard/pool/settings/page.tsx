'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Slider } from '@/components/ui/Slider';
import {
  fetchPool,
  updatePoolConfig,
  resetPoolStats,
  formatCurrency,
  type PoolData,
  type PoolConfig,
} from '@/lib/pool-api';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  RefreshCw,
  Settings,
  Lock,
  Scale,
  Unlock,
  AlertTriangle,
  Info,
  ChevronDown,
  ArrowLeft,
  Save,
  RotateCcw,
  Gauge,
  Wallet,
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  email: string;
  spinCredits: number;
}

export default function PoolSettingsPage() {
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [pool, setPool] = useState<PoolData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [config, setConfig] = useState<PoolConfig>({
    isAutoPhase: true,
    retentionThreshold: 1000,
    releaseThreshold: 10000,
    maxRiskPercent: 30,
    retentionWinChance: 10,
    normalWinChance: 35,
    releaseWinChance: 65,
    retentionMaxMultiplier: 30,
    normalMaxMultiplier: 100,
    releaseMaxMultiplier: 250,
  });

  // Confirm reset modal
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Painel explicativo colapsável
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('agentToken');
    const agentData = localStorage.getItem('agentData');

    if (!token || !agentData) {
      router.push('/');
      return;
    }

    setAgent(JSON.parse(agentData));
    loadPool();
  }, [router]);

  async function loadPool() {
    try {
      const result = await fetchPool();
      if (result.success && result.data) {
        setPool(result.data);
        setConfig({
          isAutoPhase: result.data.isAutoPhase ?? true,
          retentionThreshold: result.data.retentionThreshold ?? 1000,
          releaseThreshold: result.data.releaseThreshold ?? 10000,
          maxRiskPercent: result.data.maxRiskPercent ?? 30,
          retentionWinChance: result.data.retentionWinChance ?? 10,
          normalWinChance: result.data.normalWinChance ?? 35,
          releaseWinChance: result.data.releaseWinChance ?? 65,
          retentionMaxMultiplier: result.data.retentionMaxMultiplier ?? 30,
          normalMaxMultiplier: result.data.normalMaxMultiplier ?? 100,
          releaseMaxMultiplier: result.data.releaseMaxMultiplier ?? 250,
        });
      }
    } catch (err) {
      setError('Erro ao carregar configurações');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setError('');
    setSuccess('');
    setSaving(true);

    if (config.retentionThreshold! >= config.releaseThreshold!) {
      setError('Threshold de retenção deve ser menor que o de liberação');
      setSaving(false);
      return;
    }

    if (config.retentionWinChance! > config.normalWinChance! || config.normalWinChance! > config.releaseWinChance!) {
      setError('Win Chance deve aumentar progressivamente: Retenção < Normal < Liberação');
      setSaving(false);
      return;
    }

    if (config.maxRiskPercent! < 1 || config.maxRiskPercent! > 100) {
      setError('Risco máximo deve estar entre 1% e 100%');
      setSaving(false);
      return;
    }

    const result = await updatePoolConfig(config);
    setSaving(false);

    if (result.success) {
      setSuccess('Configurações salvas com sucesso!');
      loadPool();
    } else {
      setError(result.message || 'Erro ao salvar configurações');
    }
  }

  async function handleResetStats() {
    setResetting(true);
    const result = await resetPoolStats();
    setResetting(false);

    if (result.success) {
      setSuccess('Estatísticas resetadas com sucesso!');
      setShowResetModal(false);
      loadPool();
    } else {
      setError(result.message || 'Erro ao resetar estatísticas');
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
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/pool">
                <ArrowLeft className="size-4 mr-1" />
                Voltar
              </Link>
            </Button>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Configurações do Pool</h1>
          <p className="text-muted-foreground">
            Configure os parâmetros de controle da banca
          </p>
        </div>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex items-center gap-3 py-3 px-4">
            <Wallet className="size-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Saldo do Pool</p>
              <p className={`text-xl font-bold ${(pool?.balance || 0) > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {formatCurrency(pool?.balance || 0)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/50 text-emerald-500">
          {success}
        </div>
      )}

      {/* Tutorial Colapsável */}
      <Collapsible open={showExplanation} onOpenChange={setShowExplanation}>
        <Card className="border-primary/30 bg-primary/5">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-primary/10 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Info className="size-5 text-primary" />
                  <CardTitle>Entenda o Pool</CardTitle>
                </div>
                <ChevronDown className={`size-5 text-primary transition-transform ${showExplanation ? 'rotate-180' : ''}`} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-6">
              {/* Conceito Principal */}
              <div className="p-4 rounded-lg bg-muted border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">1</span>
                  O que é o Pool?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  O Pool é o <strong className="text-primary">seu caixa de reserva</strong> para pagar os prêmios dos jogadores. 
                  Ele se alimenta automaticamente das <strong className="text-red-500">perdas dos jogadores</strong> e paga os
                  <strong className="text-emerald-500"> ganhos</strong>. Quanto maior o pool, mais prêmios você pode liberar!
                </p>
              </div>

              {/* As 3 Fases */}
              <div className="p-4 rounded-lg bg-muted border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">2</span>
                  As 3 Fases do Pool
                </h3>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="size-4 text-red-500" />
                      <span className="font-semibold text-red-500">Retenção</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Pool baixo - precisa crescer</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• WinChance: <span className="text-red-500">5-15%</span></li>
                      <li>• Prêmios: Pequenos (3x-10x)</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="size-4 text-yellow-500" />
                      <span className="font-semibold text-yellow-500">Normal</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Pool saudável - operação padrão</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• WinChance: <span className="text-yellow-500">25-40%</span></li>
                      <li>• Prêmios: Médios (até 50x)</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Unlock className="size-4 text-emerald-500" />
                      <span className="font-semibold text-emerald-500">Liberação</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Pool alto - hora de pagar!</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• WinChance: <span className="text-emerald-500">45-60%</span></li>
                      <li>• Prêmios: Grandes (até 500x)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pool Zerado */}
              <div className="p-4 rounded-lg bg-muted border">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Gauge className="size-4" />
                  Pool começa em R$ 0 - E agora?
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-primary">Não precisa depositar nada!</strong> Quando o pool está zerado, 
                  o sistema entra automaticamente em <span className="text-red-500">modo retenção máxima</span> (winChance 0%). 
                  Os jogadores vão jogar e perder naturalmente, e essas perdas vão <strong>construindo o pool automaticamente</strong>.
                </p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Configurações Gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="size-5" />
              Configurações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Auto Phase Toggle */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
              <div>
                <p className="font-medium">Fase Automática</p>
                <p className="text-sm text-muted-foreground">Muda fase automaticamente baseado no saldo</p>
              </div>
              <Switch
                checked={config.isAutoPhase}
                onCheckedChange={(checked) => setConfig({ ...config, isAutoPhase: checked })}
              />
            </div>

            {/* Max Risk */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Risco Máximo por Payout (% do saldo)
              </label>
              <div className="flex items-center gap-3">
                <Slider
                  min={1}
                  max={100}
                  value={config.maxRiskPercent ?? 30}
                  onChange={(value) => setConfig({ ...config, maxRiskPercent: value })}
                  color="red"
                  className="flex-1"
                />
                <span className="w-16 text-right font-semibold">
                  {config.maxRiskPercent ?? 30}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Define o valor máximo que um único prêmio pode representar do saldo do pool
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Thresholds */}
        <Card>
          <CardHeader>
            <CardTitle>Thresholds de Fase</CardTitle>
            <CardDescription>
              Defina os valores que determinam as transições de fase
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Threshold de Retenção (abaixo deste valor)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                <Input
                  type="number"
                  value={config.retentionThreshold ?? 1000}
                  onChange={(e) => setConfig({ ...config, retentionThreshold: parseFloat(e.target.value) || 0 })}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-red-500 mt-1">
                Quando saldo &lt; {formatCurrency(config.retentionThreshold || 0)} → Fase Retenção
              </p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Threshold de Liberação (acima deste valor)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                <Input
                  type="number"
                  value={config.releaseThreshold ?? 10000}
                  onChange={(e) => setConfig({ ...config, releaseThreshold: parseFloat(e.target.value) || 0 })}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-emerald-500 mt-1">
                Quando saldo &gt; {formatCurrency(config.releaseThreshold || 0)} → Fase Liberação
              </p>
            </div>

            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <p className="text-sm text-yellow-500">
                <Scale className="size-4 inline mr-1" />
                <strong>Fase Normal:</strong> Quando saldo está entre {formatCurrency(config.retentionThreshold || 0)} e {formatCurrency(config.releaseThreshold || 0)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Configuração Fase Retenção */}
        <Card className="border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <Lock className="size-5" />
              Fase Retenção
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Win Chance (%)</label>
              <Input
                type="number"
                min="1"
                max="100"
                value={config.retentionWinChance ?? 10}
                onChange={(e) => setConfig({ ...config, retentionWinChance: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Multiplicador Máximo</label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  max="1000"
                  value={config.retentionMaxMultiplier ?? 30}
                  onChange={(e) => setConfig({ ...config, retentionMaxMultiplier: parseFloat(e.target.value) || 0 })}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">x</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuração Fase Normal */}
        <Card className="border-yellow-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-500">
              <Scale className="size-5" />
              Fase Normal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Win Chance (%)</label>
              <Input
                type="number"
                min="1"
                max="100"
                value={config.normalWinChance ?? 35}
                onChange={(e) => setConfig({ ...config, normalWinChance: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Multiplicador Máximo</label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  max="1000"
                  value={config.normalMaxMultiplier ?? 100}
                  onChange={(e) => setConfig({ ...config, normalMaxMultiplier: parseFloat(e.target.value) || 0 })}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">x</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuração Fase Liberação */}
        <Card className="border-emerald-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-500">
              <Unlock className="size-5" />
              Fase Liberação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Win Chance (%)</label>
              <Input
                type="number"
                min="1"
                max="100"
                value={config.releaseWinChance ?? 65}
                onChange={(e) => setConfig({ ...config, releaseWinChance: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Multiplicador Máximo</label>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  max="1000"
                  value={config.releaseMaxMultiplier ?? 250}
                  onChange={(e) => setConfig({ ...config, releaseMaxMultiplier: parseFloat(e.target.value) || 0 })}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">x</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Zona de Perigo */}
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="size-5" />
              Zona de Perigo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <h4 className="font-medium text-destructive mb-2">Resetar Estatísticas</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Isso vai zerar todas as estatísticas do pool (spins, ganhos, perdas, etc). 
                O saldo do pool NÃO será afetado.
              </p>
              <Button variant="destructive" onClick={() => setShowResetModal(true)}>
                <RotateCcw className="size-4 mr-2" />
                Resetar Estatísticas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard/pool">Cancelar</Link>
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="size-4 mr-2" />
          {saving ? 'Salvando...' : 'Salvar Configurações'}
        </Button>
      </div>

      {/* Modal Confirmar Reset */}
      <Dialog open={showResetModal} onOpenChange={setShowResetModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="size-5" />
              Confirmar Reset
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja resetar todas as estatísticas do pool?
            </DialogDescription>
          </DialogHeader>

          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Total de spins será zerado</li>
            <li>• Total de apostas será zerado</li>
            <li>• Total de pagamentos será zerado</li>
            <li>• Maior ganho/perda será zerado</li>
            <li className="text-emerald-500">✓ Saldo do pool será mantido</li>
          </ul>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetModal(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleResetStats} disabled={resetting}>
              {resetting ? 'Resetando...' : 'Confirmar Reset'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
