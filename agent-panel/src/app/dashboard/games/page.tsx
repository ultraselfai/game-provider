'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AGENT_API } from '@/lib/config';
import { Slider } from '@/components/ui/Slider';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  RefreshCw,
  Gamepad2,
  Settings,
  Search,
  Info,
  ChevronDown,
  Save,
  RotateCcw,
  Percent,
  Target,
  DollarSign,
  TrendingUp,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import Image from 'next/image';

interface Agent {
  id: string;
  name: string;
  email: string;
  balance: number;
  spinCredits: number;
}

interface GameSettings {
  gameCode: string;
  gameName: string;
  rtp: number;
  winChance: number;
  isCustomized: boolean;
}

const DEFAULT_RTP = 96.5;
const DEFAULT_WIN_CHANCE = 35;

// Capas dos jogos
const gameCovers: Record<string, string> = {
  'fortunetiger': '/covers/fortune-tiger.png',
  'fortuneox': '/covers/fortune-ox.png',
  'fortunerabbit': '/covers/fortune-rabbit.png',
  'fortunemouse': '/covers/fortune-mouse.png',
  'fortunepanda': '/covers/fortune-pandas.png',
  'phoenixrises': '/covers/phoenix-rises.png',
};

export default function GamesPage() {
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [games, setGames] = useState<GameSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameSettings | null>(null);
  const [editRtp, setEditRtp] = useState(96.5);
  const [editWinChance, setEditWinChance] = useState(35);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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
    fetchGameSettings(token);
  }, [router]);

  async function fetchGameSettings(token: string) {
    try {
      const res = await fetch(`${AGENT_API}/games/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setGames(data.data || []);
      }
    } catch (err) {
      console.error('Erro ao carregar configurações:', err);
    } finally {
      setLoading(false);
    }
  }

  function openSettings(game: GameSettings) {
    setSelectedGame(game);
    setEditRtp(game.rtp);
    setEditWinChance(game.winChance);
    setMessage(null);
    setShowModal(true);
  }

  async function handleSaveSettings() {
    if (!selectedGame) return;

    const token = localStorage.getItem('agentToken');
    if (!token) return;

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`${AGENT_API}/games/${selectedGame.gameCode}/settings`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rtp: editRtp,
          winChance: editWinChance,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
        setGames(prev => prev.map(g =>
          g.gameCode === selectedGame.gameCode
            ? { ...g, rtp: editRtp, winChance: editWinChance, isCustomized: true }
            : g
        ));
        setTimeout(() => setShowModal(false), 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Erro ao salvar configurações' });
      }
    } catch (err) {
      console.error('Erro:', err);
      setMessage({ type: 'error', text: 'Erro de conexão. Tente novamente.' });
    } finally {
      setSaving(false);
    }
  }

  async function handleResetSettings() {
    if (!selectedGame) return;

    const token = localStorage.getItem('agentToken');
    if (!token) return;

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`${AGENT_API}/games/${selectedGame.gameCode}/settings/reset`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: 'success', text: 'Configurações resetadas para o padrão!' });
        setEditRtp(DEFAULT_RTP);
        setEditWinChance(DEFAULT_WIN_CHANCE);
        setGames(prev => prev.map(g =>
          g.gameCode === selectedGame.gameCode
            ? { ...g, rtp: DEFAULT_RTP, winChance: DEFAULT_WIN_CHANCE, isCustomized: false }
            : g
        ));
        setTimeout(() => setShowModal(false), 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Erro ao resetar configurações' });
      }
    } catch (err) {
      console.error('Erro:', err);
      setMessage({ type: 'error', text: 'Erro de conexão. Tente novamente.' });
    } finally {
      setSaving(false);
    }
  }

  const filteredGames = games.filter(game =>
    game.gameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.gameCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGameCover = (code: string) => gameCovers[code] || null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Aviso sobre Pool */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-amber-500 text-white">
        <AlertTriangle className="size-5 shrink-0" />
        <span className="text-sm font-medium">Estas configurações só são usadas quando o Pool de Liquidez está desativado ou indisponível.</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Jogos</h1>
          <p className="text-muted-foreground">
            Configure RTP e Chance de Vitória para cada jogo
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar jogos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Tutorial Colapsável */}
      <Collapsible open={showExplanation} onOpenChange={setShowExplanation}>
        <Card className="border-primary/30 bg-primary/5">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-primary/10 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Info className="size-5 text-primary" />
                  <CardTitle>Entenda RTP e Chance de Vitória</CardTitle>
                </div>
                <ChevronDown className={`size-5 text-primary transition-transform ${showExplanation ? 'rotate-180' : ''}`} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid md:grid-cols-2 gap-6">
                {/* RTP Explicação */}
                <div className="p-4 rounded-lg bg-muted border">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="size-5 text-blue-500" />
                    <h4 className="font-semibold text-blue-500">RTP (Return to Player)</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    É a porcentagem que <strong>volta para os jogadores</strong> ao longo do tempo.
                    O resto fica com você (a casa).
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">RTP 90%:</span>
                      <span className="text-emerald-500 font-medium">Você fica com 10%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">RTP 96%:</span>
                      <span className="text-yellow-500 font-medium">Você fica com 4%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">RTP 50%:</span>
                      <span className="text-red-500 font-medium">Você fica com 50%</span>
                    </div>
                  </div>
                </div>

                {/* Win Chance Explicação */}
                <div className="p-4 rounded-lg bg-muted border">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="size-5 text-emerald-500" />
                    <h4 className="font-semibold text-emerald-500">Chance de Vitória (Win Rate)</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    É a <strong>frequência</strong> com que o jogador ganha. Não afeta seu lucro final,
                    mas sim a <strong>experiência</strong> do jogador.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">Win 50%:</span>
                      <span className="text-emerald-500">Muitas vitórias pequenas</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">Win 20%:</span>
                      <span className="text-yellow-500">Vitórias médias</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-background">
                      <span className="text-muted-foreground">Win 5%:</span>
                      <span className="text-red-500">Poucos BIG WINS</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Games Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGames.map((game) => (
          <Card key={game.gameCode} className="transition hover:border-primary/50">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
                  {getGameCover(game.gameCode) ? (
                    <Image
                      src={getGameCover(game.gameCode)!}
                      alt={game.gameName}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Gamepad2 className="size-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <CardTitle className="truncate">{game.gameName}</CardTitle>
                      <CardDescription className="font-mono text-xs">{game.gameCode}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => openSettings(game)}>
                      <Settings className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">RTP</span>
                    {game.isCustomized && (
                      <Badge variant="warning" className="text-[10px] py-0">CUSTOM</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${Math.min(game.rtp, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-blue-500">{Number(game.rtp).toFixed(1)}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Chance de Vitória</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{ width: `${Math.min(game.winChance * 1.67, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-emerald-500">{game.winChance}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Gamepad2 className="size-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Nenhum jogo encontrado</p>
        </div>
      )}

      {/* Modal de Configuração */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
                {selectedGame && getGameCover(selectedGame.gameCode) ? (
                  <Image
                    src={getGameCover(selectedGame.gameCode)!}
                    alt={selectedGame.gameName}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Gamepad2 className="size-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <DialogTitle>{selectedGame?.gameName}</DialogTitle>
                <DialogDescription>Configurações do jogo</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* RTP */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Percent className="size-4 text-blue-500" />
                    RTP (Return to Player)
                  </label>
                  <p className="text-xs text-muted-foreground">Quanto volta para os jogadores</p>
                </div>
                <span className="text-lg font-bold text-blue-500">{editRtp.toFixed(1)}%</span>
              </div>
              <Slider min={0} max={99} step={0.5} value={editRtp} onChange={setEditRtp} color="blue" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0% (100% lucro)</span>
                <span>99% (1% lucro)</span>
              </div>
            </div>

            {/* Win Chance */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Target className="size-4 text-emerald-500" />
                    Chance de Vitória
                  </label>
                  <p className="text-xs text-muted-foreground">Frequência de ganhos por spin</p>
                </div>
                <span className="text-lg font-bold text-emerald-500">{editWinChance}%</span>
              </div>
              <Slider min={0} max={99} step={1} value={editWinChance} onChange={setEditWinChance} color="emerald" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0% (nunca ganha)</span>
                <span>99% (sempre ganha)</span>
              </div>
            </div>

            {/* Calculadora de Receita */}
            {(() => {
              const depositoExemplo = 100;
              const houseEdge = 100 - editRtp;
              const lucroTeorico = depositoExemplo * (houseEdge / 100);
              const totalRetorno = depositoExemplo * (editRtp / 100);
              const spinsMedios = 100;
              const vitoriasEsperadas = Math.max(1, Math.round(spinsMedios * (editWinChance / 100)));
              const premioMedioPorVitoria = totalRetorno / vitoriasEsperadas;

              let statusConfig = '';
              let statusVariant: 'success' | 'warning' | 'destructive' | 'secondary' = 'secondary';

              if (editRtp >= 95 && editWinChance >= 40) {
                statusConfig = 'Lucro baixo, jogador muito beneficiado';
                statusVariant = 'destructive';
              } else if (editRtp <= 70) {
                statusConfig = 'Lucro alto! Jogadores podem perceber';
                statusVariant = 'warning';
              } else if (editWinChance <= 10) {
                statusConfig = 'Vitórias raras podem frustrar jogadores';
                statusVariant = 'warning';
              } else if (editRtp >= 85 && editRtp <= 93 && editWinChance >= 25 && editWinChance <= 50) {
                statusConfig = 'Configuração equilibrada';
                statusVariant = 'success';
              } else {
                statusConfig = 'Configuração personalizada';
              }

              return (
                <div className="space-y-4">
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <TrendingUp className="size-4" />
                        Simulação: Jogador deposita R$ {depositoExemplo}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-lg bg-background">
                          <p className="text-xs text-muted-foreground mb-1">Seu Lucro</p>
                          <p className={`text-2xl font-bold ${houseEdge >= 10 ? 'text-emerald-500' : houseEdge >= 5 ? 'text-yellow-500' : 'text-red-500'}`}>
                            R$ {lucroTeorico.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">({houseEdge.toFixed(1)}%)</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-background">
                          <p className="text-xs text-muted-foreground mb-1">Jogador Recebe</p>
                          <p className="text-2xl font-bold text-blue-500">R$ {totalRetorno.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">(RTP {editRtp.toFixed(1)}%)</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Em 100 spins, ele ganha:</span>
                          <span className="font-medium">~{vitoriasEsperadas} vezes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Prêmio médio por vitória:</span>
                          <span className="font-medium">R$ {premioMedioPorVitoria.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    <Badge variant={statusVariant}>{statusConfig}</Badge>
                  </div>
                </div>
              );
            })()}

            {message && (
              <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/50 text-emerald-500' : 'bg-destructive/10 border border-destructive/50 text-destructive'}`}>
                {message.text}
              </div>
            )}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleResetSettings}
              disabled={saving || !selectedGame?.isCustomized}
              className="w-full sm:w-auto"
            >
              <RotateCcw className="size-4 mr-2" />
              Resetar padrão
            </Button>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1 sm:flex-initial">
                Cancelar
              </Button>
              <Button onClick={handleSaveSettings} disabled={saving} className="flex-1 sm:flex-initial">
                <Save className="size-4 mr-2" />
                {saving ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
