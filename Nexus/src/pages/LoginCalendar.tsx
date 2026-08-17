import { useState } from 'react';
import { useCharacterStore } from '@/stores/characterStore';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { Gift, Sparkles, Lock, Check } from 'lucide-react';
import { toast } from 'sonner';

interface DailyReward {
  day: number;
  type: 'xp' | 'gold' | 'essence' | 'material' | 'item' | 'milestone';
  amount: number;
  label: string;
  emoji: string;
  isMilestone?: boolean;
}

const REWARDS: DailyReward[] = [
  { day: 1, type: 'xp', amount: 100, label: '100 XP', emoji: '⚡' },
  { day: 2, type: 'gold', amount: 50, label: '50 Gold', emoji: '🪙' },
  { day: 3, type: 'xp', amount: 150, label: '150 XP', emoji: '⚡' },
  { day: 4, type: 'essence', amount: 5, label: '5 Essence', emoji: '✨' },
  { day: 5, type: 'gold', amount: 80, label: '80 Gold', emoji: '🪙' },
  { day: 6, type: 'material', amount: 2, label: '2 Common Dust', emoji: '🌫️' },
  { day: 7, type: 'milestone', amount: 500, label: 'BÔNUS SEMANAL · 500 XP + Item', emoji: '🎁', isMilestone: true },
  { day: 8, type: 'xp', amount: 200, label: '200 XP', emoji: '⚡' },
  { day: 9, type: 'gold', amount: 100, label: '100 Gold', emoji: '🪙' },
  { day: 10, type: 'xp', amount: 250, label: '250 XP', emoji: '⚡' },
  { day: 11, type: 'essence', amount: 8, label: '8 Essence', emoji: '✨' },
  { day: 12, type: 'gold', amount: 120, label: '120 Gold', emoji: '🪙' },
  { day: 13, type: 'material', amount: 1, label: '1 Rare Fragment', emoji: '💎' },
  { day: 14, type: 'milestone', amount: 1000, label: 'BÔNUS · 1000 XP + Skin', emoji: '🎁', isMilestone: true },
  { day: 15, type: 'xp', amount: 300, label: '300 XP', emoji: '⚡' },
  { day: 16, type: 'gold', amount: 150, label: '150 Gold', emoji: '🪙' },
  { day: 17, type: 'xp', amount: 350, label: '350 XP', emoji: '⚡' },
  { day: 18, type: 'essence', amount: 12, label: '12 Essence', emoji: '✨' },
  { day: 19, type: 'gold', amount: 200, label: '200 Gold', emoji: '🪙' },
  { day: 20, type: 'material', amount: 1, label: '1 Epic Crystal', emoji: '💠' },
  { day: 21, type: 'milestone', amount: 2000, label: 'BÔNUS · 2000 XP + Título', emoji: '🎁', isMilestone: true },
  { day: 22, type: 'xp', amount: 400, label: '400 XP', emoji: '⚡' },
  { day: 23, type: 'gold', amount: 250, label: '250 Gold', emoji: '🪙' },
  { day: 24, type: 'xp', amount: 450, label: '450 XP', emoji: '⚡' },
  { day: 25, type: 'essence', amount: 15, label: '15 Essence', emoji: '✨' },
  { day: 26, type: 'gold', amount: 300, label: '300 Gold', emoji: '🪙' },
  { day: 27, type: 'material', amount: 1, label: '1 Legendary Shard', emoji: '⚜️' },
  { day: 28, type: 'milestone', amount: 5000, label: 'CHAMPION · 5000 XP + Badge', emoji: '👑', isMilestone: true },
];

export default function LoginCalendar() {
  // Mock: hoje é dia 12 do mês de check-in atual
  const [claimedThrough, setClaimedThrough] = useState(11);
  const todayDay = 12;
  const gainXp = useCharacterStore((s) => s.gainXp);

  const claim = () => {
    if (todayDay <= claimedThrough) return;
    const reward = REWARDS[todayDay - 1];
    setClaimedThrough(todayDay);
    if (reward.type === 'xp' || reward.type === 'milestone') {
      gainXp(reward.amount);
    }
    toast.success(`Recompensa coletada! ${reward.emoji}`, {
      description: reward.label,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
      <header className="mb-6">
        <h1 className="font-display text-3xl lg:text-4xl font-semibold text-text-secondary">
          Daily Login
        </h1>
        <p className="text-text-muted mt-1">
          Volte todo dia. As recompensas crescem com sua consistência.
        </p>
      </header>

      {/* Today's claim card */}
      <Card variant="gradient" className="mb-8">
        <div className="p-6 lg:p-8 flex items-center gap-5">
          <div className="size-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl backdrop-blur-sm">
            {REWARDS[todayDay - 1].emoji}
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.2em] opacity-80 mb-1">
              Dia {todayDay} · Hoje
            </p>
            <p className="font-display text-2xl font-semibold">
              {REWARDS[todayDay - 1].label}
            </p>
          </div>
          <Button
            onClick={claim}
            disabled={todayDay <= claimedThrough}
            className="!bg-white !text-burgundy-deep hover:!bg-white/90"
          >
            {todayDay <= claimedThrough ? (
              <>
                <Check className="size-4" /> Coletado
              </>
            ) : (
              <>
                <Gift className="size-4" /> Coletar
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Calendar grid */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 lg:gap-3">
        {REWARDS.map((r) => {
          const isPast = r.day < todayDay;
          const isToday = r.day === todayDay;
          const isClaimed = r.day <= claimedThrough;
          const isLocked = r.day > todayDay;

          return (
            <button
              key={r.day}
              disabled={isLocked || isClaimed}
              onClick={isToday ? claim : undefined}
              className={cn(
                'relative aspect-square rounded-xl p-2 text-center transition-all',
                'border',
                r.isMilestone && 'col-span-1 sm:col-span-1',
                r.isMilestone &&
                  !isLocked &&
                  'gradient-rose text-white border-transparent shadow-premium-md',
                isToday && !r.isMilestone && 'border-primary bg-primary/10 animate-pulse-soft',
                isPast && isClaimed && !r.isMilestone && 'border-border-subtle bg-bg/40 opacity-50',
                isLocked && !r.isMilestone && 'border-border-subtle bg-bg/40 opacity-30',
                !isLocked && !isClaimed && !r.isMilestone && 'border-border bg-bg-elevated hover:border-primary',
              )}
            >
              <p
                className={cn(
                  'text-[9px] uppercase tracking-wider font-mono mb-1',
                  r.isMilestone ? 'opacity-90' : 'text-text-muted',
                )}
              >
                Dia {r.day}
              </p>
              <div className="text-xl lg:text-2xl mb-0.5">{r.emoji}</div>
              <p
                className={cn(
                  'text-[9px] font-semibold leading-tight line-clamp-2',
                  !r.isMilestone && 'text-text-primary',
                )}
              >
                {r.amount}
                {r.type === 'xp' && ' XP'}
                {r.type === 'gold' && '🪙'}
                {r.type === 'essence' && '✨'}
              </p>

              {isLocked && (
                <Lock className="absolute top-1 right-1 size-2.5 text-text-subtle" />
              )}
              {isClaimed && !r.isMilestone && (
                <Check className="absolute top-1 right-1 size-3 text-success" />
              )}
              {r.isMilestone && (
                <Sparkles className="absolute top-1 right-1 size-3" />
              )}
            </button>
          );
        })}
      </div>

      <p className="text-center text-xs text-text-subtle mt-6">
        Reset todo mês. Bônus de milestone nos dias 7, 14, 21, 28.
      </p>
    </div>
  );
}
