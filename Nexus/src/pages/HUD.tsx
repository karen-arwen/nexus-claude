import { useCharacterStore } from '@/stores/characterStore';
import { useUIStore } from '@/stores/uiStore';
import { HunterCard } from '@/components/hud/HunterCard';
import { StatsBars } from '@/components/hud/StatsBars';
import { LumiQuote } from '@/components/hud/LumiQuote';
import { TodayQuests } from '@/components/hud/TodayQuests';
import { QuickStats } from '@/components/hud/QuickStats';
import { StreakHeatmap } from '@/components/hud/StreakHeatmap';
import { WeeklyChart } from '@/components/hud/WeeklyChart';
import { Button } from '@/components/ui/Button';
import { Plus, Castle, Bot, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const greeting = (name: string) => {
  const h = new Date().getHours();
  const part = h < 6 ? 'Boa madrugada' : h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
  return `${part}, ${name}`;
};

export default function HUD() {
  const character = useCharacterStore((s) => s.character);
  const openQuestCreate = useUIStore((s) => s.openQuestCreate);
  const openFocus = useUIStore((s) => s.openFocus);
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 lg:py-10 space-y-6 animate-fade-in">
      {/* Header / greeting */}
      <header>
        <h1 className="font-display text-3xl lg:text-4xl font-semibold text-text-secondary">
          {greeting(character.displayName)}
        </h1>
        <p className="text-sm text-text-muted mt-1">
          {character.identity.currentMission ? (
            <>
              Em missão:{' '}
              <span className="text-primary font-medium">
                {character.identity.currentMission}
              </span>
            </>
          ) : (
            'Pronta pra evoluir hoje?'
          )}
        </p>
      </header>

      {/* Hunter card hero */}
      <HunterCard />

      {/* Lumi quote */}
      <LumiQuote />

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={openQuestCreate}>
          <Plus className="size-4" />
          Nova quest
        </Button>
        <Button variant="outline" onClick={openFocus}>
          <Timer className="size-4" />
          Iniciar foco
        </Button>
        <Button variant="outline" onClick={() => navigate('/dungeons')}>
          <Castle className="size-4" />
          Dungeons
        </Button>
        <Button variant="outline" onClick={() => navigate('/lumi')}>
          <Bot className="size-4" />
          Falar com Lumi
        </Button>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TodayQuests />
          <WeeklyChart />
          <StreakHeatmap />
        </div>
        <div className="space-y-6">
          <StatsBars />
          <QuickStats />
        </div>
      </div>

      <p className="text-center text-xs text-text-subtle pt-4">
        ✨ Pressione{' '}
        <kbd className="mx-0.5 px-1.5 py-0.5 font-mono bg-bg-elevated border border-border rounded text-text-muted">
          ⌘K
        </kbd>{' '}
        em qualquer lugar pra busca rápida
      </p>
    </div>
  );
}
