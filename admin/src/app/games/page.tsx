'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProtectedLayout from '@/components/ProtectedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RefreshCw, Gamepad2, Zap, Gift, Trophy, Settings, BarChart3, Check, AlertCircle, X, Dices } from 'lucide-react';
import { ADMIN_API } from '@/lib/config';

interface GameSettings {
  id: string;
  gameCode: string;
  gameName: string;
  isActive: boolean;
  rtp: number;
  volatility: string;
  minBet: number;
  maxBet: number;
  defaultBet: number;
  betSizes: number[];
  baseBets: number[];
  maxLevel: number;
  numLines: number;
  winChance: number;
  loseChance: number;
  hasFreeSpin: boolean;
  hasBonusGame: boolean;
  hasJackpot: boolean;
  provider: string;
  category: string;
  jackpotMini: number;
  jackpotMinor: number;
  jackpotMajor: number;
  jackpotGrand: number;
  maxWinPerSpin: number;
  maxMultiplier: number;
  promoMultiplier: number;
  promoMode: boolean;
  promoName: string;
  promoStart: string;
  promoEnd: string;
  createdAt: string;
  updatedAt: string;
}

// Jogos validados e disponíveis
const ALLOWED_GAMES = [
  'fortunetiger',
  'fortunemouse',
  'fortunerabbit',
  'fortuneox',
  'fortunepanda',
  'phoenixrises',
  'hoodvswoolf',
];

// Capas dos jogos
const gameCovers: Record<string, string> = {
  'fortunetiger': '/covers/fortune-tiger.png',
  'fortuneox': '/covers/fortune-ox.png',
  'fortunerabbit': '/covers/fortune-rabbit.png',
  'fortunemouse': '/covers/fortune-mouse.png',
  'fortunepanda': '/covers/fortune-pandas.png',
  'phoenixrises': '/covers/phoenix-rises.png',
  'hoodvswoolf': '/covers/hvsw.png',
};

const FORTUNE_CONFIGS: Record<string, { baseBets: number[]; maxLevel: number; numLines: number; name: string }> = {
  'fortunetiger': { baseBets: [0.08, 0.80, 3.00, 10.00], maxLevel: 10, numLines: 5, name: 'Fortune Tiger' },
  'fortunepanda': { baseBets: [0.08, 0.80, 3.00, 10.00], maxLevel: 10, numLines: 5, name: 'Fortune Panda' },
  'fortunemouse': { baseBets: [0.10, 1.00, 3.00, 10.00], maxLevel: 10, numLines: 5, name: 'Fortune Mouse' },
  'fortuneox': { baseBets: [0.05, 0.50, 4.00], maxLevel: 10, numLines: 10, name: 'Fortune Ox' },
  'fortunerabbit': { baseBets: [0.05, 0.50, 4.00], maxLevel: 10, numLines: 10, name: 'Fortune Rabbit' },
  'phoenixrises': { baseBets: [0.03, 0.10, 0.30, 0.90], maxLevel: 10, numLines: 20, name: 'Phoenix Rises' },
  'hoodvswoolf': { baseBets: [0.01, 0.05, 0.15, 1.25], maxLevel: 10, numLines: 10, name: 'Hood vs Wolf' },
};

function generateBetSizes(baseBets: number[], maxLevel: number, numLines: number): number[] {
  const sizes: number[] = [];
  for (const base of baseBets) {
    for (let level = 1; level <= maxLevel; level++) {
      const total = base * level * numLines;
      sizes.push(Math.round(total * 100) / 100);
    }
  }
  return [...new Set(sizes)].sort((a, b) => a - b);
}

export default function GamesPage() {
  const [games, setGames] = useState<GameSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingGame, setEditingGame] = useState<GameSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchGames();
  }, []);

  async function fetchGames() {
    try {
      setLoading(true);
      const res = await fetch(`${ADMIN_API}/games`);
      if (res.ok) {
        const data = await res.json();
        setGames(Array.isArray(data) ? data : []);
      } else {
        setError('Erro ao carregar jogos');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveGameSettings(gameCode: string, updates: Partial<GameSettings>) {
    try {
      setSaving(true);
      setError(null);
      const res = await fetch(`${ADMIN_API}/games/${gameCode}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        const updatedGame = await res.json();
        setGames(games.map(g => g.gameCode === gameCode ? updatedGame : g));
        setEditingGame(null);
        setSuccess(`${updatedGame.gameName} atualizado com sucesso!`);
        setTimeout(() => setSuccess(null), 5000);
        return true;
      } else {
        const errorData = await res.json();
        const errorMsg = Array.isArray(errorData.message) 
          ? errorData.message.join(', ') 
          : errorData.message || 'Erro ao salvar';
        setError(errorMsg);
        return false;
      }
    } catch (err) {
      setError('Erro ao salvar configurações - verifique a conexão');
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function toggleGameStatus(game: GameSettings) {
    await saveGameSettings(game.gameCode, { isActive: !game.isActive });
  }

  const getGameCover = (code: string) => gameCovers[code] || null;

  // Filtrar apenas jogos validados
  const filteredGames = games.filter(g => ALLOWED_GAMES.includes(g.gameCode));

  const stats = {
    total: filteredGames.length,
    active: filteredGames.filter(g => g.isActive).length,
    withFreeSpin: filteredGames.filter(g => g.hasFreeSpin).length,
    withJackpot: filteredGames.filter(g => g.hasJackpot).length,
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gerenciamento de Games</h1>
            <p className="text-muted-foreground">Configure os jogos disponíveis na plataforma</p>
          </div>
          <Button variant="outline" onClick={fetchGames} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="rounded-lg bg-red-500/20 border border-red-500/50 p-4 text-red-500 flex justify-between items-center">
            <span className="flex items-center gap-2"><AlertCircle className="h-4 w-4" />{error}</span>
            <Button variant="ghost" size="icon" onClick={() => setError(null)}><X className="h-4 w-4" /></Button>
          </div>
        )}

        {success && (
          <div className="rounded-lg bg-emerald-500/20 border border-emerald-500/50 p-4 text-emerald-500 flex justify-between items-center">
            <span className="flex items-center gap-2"><Check className="h-4 w-4" />{success}</span>
            <Button variant="ghost" size="icon" onClick={() => setSuccess(null)}><X className="h-4 w-4" /></Button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Games</CardTitle>
              <Gamepad2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Games Ativos</CardTitle>
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Com Free Spin</CardTitle>
              <Zap className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">{stats.withFreeSpin}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Com Jackpot</CardTitle>
              <Trophy className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{stats.withJackpot}</div>
            </CardContent>
          </Card>
        </div>

        {/* Games Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGames.map((game) => (
              <Card key={game.id} className={!game.isActive ? 'opacity-60' : ''}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getGameCover(game.gameCode) ? (
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                          <Image
                            src={getGameCover(game.gameCode)!}
                            alt={game.gameName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                          <Gamepad2 className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-base">{game.gameName}</CardTitle>
                        <CardDescription>{game.provider || 'PGSoft'}</CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={game.isActive ? 'default' : 'destructive'}
                      className={game.isActive ? 'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 cursor-pointer' : 'cursor-pointer'}
                      onClick={() => toggleGameStatus(game)}
                    >
                      {game.isActive ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Código</span>
                    <code className="rounded bg-muted px-2 py-1 text-xs text-emerald-500">{game.gameCode}</code>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Volatilidade</span>
                    <Badge variant={game.volatility === 'low' ? 'default' : game.volatility === 'high' ? 'destructive' : 'secondary'}>
                      {game.volatility === 'low' ? 'Baixa' : game.volatility === 'medium' ? 'Média' : 'Alta'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Apostas</span>
                    <span>R$ {Number(game.minBet).toFixed(2)} - R$ {Number(game.maxBet).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Aposta Padrão</span>
                    <span className="text-emerald-500 font-medium">R$ {Number(game.defaultBet).toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Stats
                    </Button>
                    <Button size="sm" className="flex-1" onClick={() => setEditingGame(game)}>
                      <Settings className="h-4 w-4 mr-1" />
                      Configurar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Edit Game Modal */}
      {editingGame && (
        <EditGameModal
          game={editingGame}
          onClose={() => setEditingGame(null)}
          onSave={saveGameSettings}
          saving={saving}
        />
      )}
    </ProtectedLayout>
  );
}

function EditGameModal({
  game,
  onClose,
  onSave,
  saving,
}: {
  game: GameSettings;
  onClose: () => void;
  onSave: (gameCode: string, updates: Partial<GameSettings>) => Promise<boolean>;
  saving: boolean;
}) {
  const fortuneConfig = FORTUNE_CONFIGS[game.gameCode];
  const isFortuneGame = !!fortuneConfig;
  
  const [minBet, setMinBet] = useState(Number(game.minBet));
  const [maxBet, setMaxBet] = useState(Number(game.maxBet));
  const [defaultBet, setDefaultBet] = useState(Number(game.defaultBet));
  const [volatility, setVolatility] = useState(game.volatility);
  const [betSizesText, setBetSizesText] = useState((game.betSizes || []).join(', '));
  
  const defaultConfig = fortuneConfig || FORTUNE_CONFIGS['fortunetiger'];
  const [baseBets, setBaseBets] = useState<number[]>(
    game.baseBets && game.baseBets.length > 0 ? game.baseBets : defaultConfig.baseBets
  );
  const [baseBetsText, setBaseBetsText] = useState(
    (game.baseBets && game.baseBets.length > 0 ? game.baseBets : defaultConfig.baseBets).join(', ')
  );
  const [maxLevel, setMaxLevel] = useState(game.maxLevel || defaultConfig.maxLevel);
  const [numLines, setNumLines] = useState(game.numLines || defaultConfig.numLines);
  const [selectedBaseBetIndex, setSelectedBaseBetIndex] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(1);
  
  const selectedBaseBet = baseBets[selectedBaseBetIndex] || 0.08;
  const calculatedBet = selectedBaseBet * selectedLevel * numLines;
  
  const [promoMode, setPromoMode] = useState(game.promoMode || false);
  const [promoName, setPromoName] = useState(game.promoName || '');
  const [promoMultiplier, setPromoMultiplier] = useState(Number(game.promoMultiplier) || 1);
  const [maxWinPerSpin, setMaxWinPerSpin] = useState(Number(game.maxWinPerSpin) || 0);
  const [maxMultiplier, setMaxMultiplier] = useState(Number(game.maxMultiplier) || 0);
  const [promoStart, setPromoStart] = useState(game.promoStart ? game.promoStart.split('T')[0] : '');
  const [promoEnd, setPromoEnd] = useState(game.promoEnd ? game.promoEnd.split('T')[0] : '');
  
  const [hasJackpot, setHasJackpot] = useState(game.hasJackpot || false);
  const [jackpotMini, setJackpotMini] = useState(Number(game.jackpotMini) || 100);
  const [jackpotMinor, setJackpotMinor] = useState(Number(game.jackpotMinor) || 500);
  const [jackpotMajor, setJackpotMajor] = useState(Number(game.jackpotMajor) || 2500);
  const [jackpotGrand, setJackpotGrand] = useState(Number(game.jackpotGrand) || 50000);

  const handleSave = async () => {
    let betSizes: number[];
    let finalMinBet = minBet;
    let finalMaxBet = maxBet;
    let finalDefaultBet = defaultBet;
    
    if (isFortuneGame) {
      betSizes = generateBetSizes(baseBets, maxLevel, numLines);
      finalMinBet = Math.min(...betSizes);
      finalMaxBet = Math.max(...betSizes);
      finalDefaultBet = baseBets[0] * 1 * numLines;
    } else {
      betSizes = betSizesText.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    }
    
    const updates: Partial<GameSettings> = {
      minBet: finalMinBet,
      maxBet: finalMaxBet,
      defaultBet: finalDefaultBet,
      volatility,
      betSizes,
      baseBets: isFortuneGame ? baseBets : undefined,
      maxLevel: isFortuneGame ? maxLevel : undefined,
      numLines: isFortuneGame ? numLines : undefined,
      promoMode,
      promoName: promoName || undefined,
      promoMultiplier,
      maxWinPerSpin,
      maxMultiplier,
      promoStart: promoStart ? new Date(promoStart).toISOString() : undefined,
      promoEnd: promoEnd ? new Date(promoEnd).toISOString() : undefined,
      hasJackpot,
      jackpotMini,
      jackpotMinor,
      jackpotMajor,
      jackpotGrand,
    };

    await onSave(game.gameCode, updates);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurar - {game.gameName}
          </DialogTitle>
          <DialogDescription>Ajuste as configurações do jogo</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="apostas" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="apostas">💰 Apostas</TabsTrigger>
            <TabsTrigger value="promocao">🎁 Promoção</TabsTrigger>
            <TabsTrigger value="jackpot">🏆 Jackpot</TabsTrigger>
          </TabsList>

          {/* TAB: APOSTAS */}
          <TabsContent value="apostas" className="space-y-4">
            <Card className="border-purple-500/30 bg-purple-500/10 p-3">
              <p className="text-sm text-purple-400">
                ℹ️ <strong>RTP e Chance de Vitória</strong> são configurados por cada <strong>Agente</strong> no painel deles.
              </p>
            </Card>

            <div>
              <label className="text-sm font-medium mb-2 block">Volatilidade</label>
              <Select value={volatility} onValueChange={setVolatility}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa - Ganhos frequentes e pequenos</SelectItem>
                  <SelectItem value="medium">Média - Balanceado</SelectItem>
                  <SelectItem value="high">Alta - Ganhos raros e grandes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isFortuneGame ? (
              <>
                <Card className="border-amber-500/30 bg-amber-500/10 p-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Dices className="h-4 w-4 text-amber-500" />
                    Configuração de Apostas - {game.gameName}
                  </h4>
                  <p className="text-sm text-amber-400 mt-1">
                    Configure igual ao jogo original: Aposta Base × Nível × {numLines} Linhas = Total
                  </p>
                </Card>

                <Card className="p-4">
                  <div className="text-center mb-4 text-sm text-muted-foreground">Opções de aposta</div>
                  
                  <div className="grid grid-cols-4 gap-2 mb-3 text-center text-xs text-muted-foreground">
                    <div>Aposta</div>
                    <div>Nível</div>
                    <div>Linhas</div>
                    <div className="text-amber-500">Total</div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mb-4 items-center">
                    <div className="bg-muted rounded-lg p-2 max-h-40 overflow-y-auto">
                      {baseBets.map((bet, idx) => (
                        <Button
                          key={idx}
                          variant={selectedBaseBetIndex === idx ? 'default' : 'ghost'}
                          size="sm"
                          className="w-full mb-1"
                          onClick={() => setSelectedBaseBetIndex(idx)}
                        >
                          R${bet.toFixed(2)}
                        </Button>
                      ))}
                    </div>

                    <div className="bg-muted rounded-lg p-2 max-h-40 overflow-y-auto">
                      {Array.from({ length: maxLevel }, (_, i) => i + 1).map((level) => (
                        <Button
                          key={level}
                          variant={selectedLevel === level ? 'default' : 'ghost'}
                          size="sm"
                          className="w-full mb-1"
                          onClick={() => setSelectedLevel(level)}
                        >
                          {level}
                        </Button>
                      ))}
                    </div>

                    <div className="bg-muted rounded-lg p-2 flex items-center justify-center">
                      <span className="text-2xl font-bold">{numLines}</span>
                    </div>

                    <Card className="border-amber-500/50 bg-amber-500/20 p-4 flex items-center justify-center">
                      <span className="text-xl font-bold text-amber-500">R${calculatedBet.toFixed(2)}</span>
                    </Card>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Badge>R${selectedBaseBet.toFixed(2)}</Badge>
                    <span>×</span>
                    <Badge>{selectedLevel}</Badge>
                    <span>×</span>
                    <Badge>{numLines}</Badge>
                    <span>=</span>
                    <Badge variant="default" className="bg-amber-500">R${calculatedBet.toFixed(2)}</Badge>
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-emerald-500">💰 Apostas Base (R$)</label>
                    <Input
                      value={baseBetsText}
                      onChange={(e) => {
                        setBaseBetsText(e.target.value);
                        const values = e.target.value.split(',').map(s => parseFloat(s.trim().replace(',', '.'))).filter(n => !isNaN(n) && n > 0);
                        if (values.length > 0) setBaseBets(values);
                      }}
                      onBlur={() => {
                        if (baseBets.length > 0) setBaseBetsText(baseBets.map(b => b.toFixed(2)).join(', '));
                      }}
                      placeholder="0.08, 0.80, 3.00, 10.00"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Valores separados por vírgula</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-blue-500">📊 Nível Máximo</label>
                    <Input
                      type="number"
                      min="1"
                      max="20"
                      value={maxLevel}
                      onChange={(e) => setMaxLevel(parseInt(e.target.value) || 10)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-purple-500">📍 Número de Linhas</label>
                  <Input
                    type="number"
                    min="1"
                    max="50"
                    value={numLines}
                    onChange={(e) => setNumLines(parseInt(e.target.value) || 5)}
                    className="w-32"
                  />
                </div>

                <Card className="border-emerald-500/30 bg-emerald-500/10 p-3">
                  <p className="text-sm text-emerald-500 font-medium mb-2">
                    ✅ BetSizes gerados ({generateBetSizes(baseBets, maxLevel, numLines).length} valores):
                  </p>
                  <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                    {generateBetSizes(baseBets, maxLevel, numLines).slice(0, 20).map((size, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">R${size.toFixed(2)}</Badge>
                    ))}
                    {generateBetSizes(baseBets, maxLevel, numLines).length > 20 && (
                      <span className="text-xs text-muted-foreground">...e mais {generateBetSizes(baseBets, maxLevel, numLines).length - 20}</span>
                    )}
                  </div>
                </Card>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Aposta Mínima</label>
                    <Input type="number" min="0.000001" step="0.000001" value={minBet} onChange={(e) => setMinBet(parseFloat(e.target.value) || 0.000001)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Aposta Máxima</label>
                    <Input type="number" min="0.000001" step="0.000001" value={maxBet} onChange={(e) => setMaxBet(parseFloat(e.target.value) || 1)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Aposta Padrão</label>
                  <Input type="number" min="0.000001" step="0.000001" value={defaultBet} onChange={(e) => setDefaultBet(parseFloat(e.target.value) || 0.000001)} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Valores de Aposta</label>
                  <Input value={betSizesText} onChange={(e) => setBetSizesText(e.target.value)} placeholder="1, 2, 5, 10, 20, 50" />
                  <p className="text-xs text-muted-foreground mt-1">Separe os valores por vírgula</p>
                </div>
              </>
            )}
          </TabsContent>

          {/* TAB: PROMOÇÃO */}
          <TabsContent value="promocao" className="space-y-4">
            <Card className="border-amber-500/30 bg-amber-500/10 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium flex items-center gap-2"><Gift className="h-4 w-4" /> Modo Promoção</h4>
                  <p className="text-sm text-amber-400 mt-1">Ativa multiplicadores e configurações especiais</p>
                </div>
                <Switch checked={promoMode} onCheckedChange={setPromoMode} />
              </div>
            </Card>

            {promoMode ? (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">Nome da Promoção</label>
                  <Input value={promoName} onChange={(e) => setPromoName(e.target.value)} placeholder="Ex: Natal 2025" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Data Início</label>
                    <Input type="date" value={promoStart} onChange={(e) => setPromoStart(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Data Fim</label>
                    <Input type="date" value={promoEnd} onChange={(e) => setPromoEnd(e.target.value)} />
                  </div>
                </div>
                <Card className="border-emerald-500/30 bg-emerald-500/10 p-4">
                  <label className="text-sm font-medium mb-2 block text-emerald-500">🚀 Multiplicador de Prêmios</label>
                  <div className="flex items-center gap-4">
                    <Input type="number" min="1" max="10" step="0.1" value={promoMultiplier} onChange={(e) => setPromoMultiplier(parseFloat(e.target.value) || 1)} className="w-24 text-center text-xl font-bold" />
                    <span className="text-muted-foreground">x sobre os ganhos normais</span>
                  </div>
                </Card>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Prêmio Máximo/Spin (R$)</label>
                    <Input type="number" min="0" step="100" value={maxWinPerSpin} onChange={(e) => setMaxWinPerSpin(parseFloat(e.target.value) || 0)} />
                    <p className="text-xs text-muted-foreground mt-1">0 = Sem limite</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Multiplicador Máximo</label>
                    <Input type="number" min="0" step="10" value={maxMultiplier} onChange={(e) => setMaxMultiplier(parseFloat(e.target.value) || 0)} />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Gift className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Ative o Modo Promoção para configurar prêmios especiais</p>
              </div>
            )}
          </TabsContent>

          {/* TAB: JACKPOT */}
          <TabsContent value="jackpot" className="space-y-4">
            <Card className="border-purple-500/30 bg-purple-500/10 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium flex items-center gap-2"><Trophy className="h-4 w-4" /> Sistema de Jackpot</h4>
                  <p className="text-sm text-purple-400 mt-1">Prêmios progressivos acumulados</p>
                </div>
                <Switch checked={hasJackpot} onCheckedChange={setHasJackpot} />
              </div>
            </Card>

            {hasJackpot ? (
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-3">
                  <label className="text-sm font-medium mb-2 block text-amber-500">🥉 Mini</label>
                  <Input type="number" min="0" value={jackpotMini} onChange={(e) => setJackpotMini(parseFloat(e.target.value) || 0)} />
                </Card>
                <Card className="p-3">
                  <label className="text-sm font-medium mb-2 block">🥈 Minor</label>
                  <Input type="number" min="0" value={jackpotMinor} onChange={(e) => setJackpotMinor(parseFloat(e.target.value) || 0)} />
                </Card>
                <Card className="p-3">
                  <label className="text-sm font-medium mb-2 block text-yellow-500">🥇 Major</label>
                  <Input type="number" min="0" value={jackpotMajor} onChange={(e) => setJackpotMajor(parseFloat(e.target.value) || 0)} />
                </Card>
                <Card className="p-3 border-purple-500/50 bg-purple-500/10">
                  <label className="text-sm font-medium mb-2 block text-purple-500">💎 Grand</label>
                  <Input type="number" min="0" value={jackpotGrand} onChange={(e) => setJackpotGrand(parseFloat(e.target.value) || 0)} />
                </Card>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Ative o Sistema de Jackpot para configurar prêmios progressivos</p>
              </div>
            )}

            <Card className="border-blue-500/30 bg-blue-500/10 p-3">
              <p className="text-sm text-blue-500">
                ℹ️ Os valores de Jackpot são o <strong>valor base</strong>. O sistema pode acumular progressivamente.
              </p>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="border-amber-500/30 bg-amber-500/10 p-3 mt-4">
          <p className="text-sm text-amber-500">
            ⚠️ Alterações serão aplicadas a novas sessões de jogo.
          </p>
        </Card>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>Cancelar</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              '💾 Salvar Configurações'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
