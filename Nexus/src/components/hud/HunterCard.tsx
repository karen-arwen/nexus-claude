import { useCharacterStore } from '@/stores/characterStore';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { RankBadge } from '@/components/ui/Badge';
import { RANK_META } from '@/lib/xp';
import { Sparkles, Flame } from 'lucide-react';

/**
 * Hero do HUD — exibe identity icon (placeholder), level/rank, XP bar.
 * Quando o HunterIdentityEditor entrar (Sprint 3), o div com gradiente
 * vira o canvas/svg do icon real.
 */
export const HunterCard = () => {
  const character = useCharacterStore((s) => s.character);
  const meta = RANK_META[character.rank];

  return (
    <div className="card-premium overflow-hidden relative">
      {/* Banner gradient */}
      <div className="h-24 lg:h-28 gradient-ascend relative">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_50%,white_0%,transparent_50%)]" />
      </div>

      <div className="px-5 lg:px-7 pb-6 -mt-12">
        <div className="flex items-end gap-4">
          {/* Identity placeholder — vira <HunterIdentityIcon/> no Sprint 3 */}
          <div
            className="size-24 lg:size-28 rounded-2xl shrink-0 relative animate-float"
            style={{
              background: `linear-gradient(135deg, var(--${meta.cssVar}), var(--primary))`,
              boxShadow: `0 12px 32px var(--${meta.cssVar}), 0 0 0 4px var(--bg-elevated)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-display font-bold">
              {character.displayName[0]}
            </div>
            {/* Rank badge canto */}
            <div className="absolute -bottom-1 -right-1">
              <RankBadge rank={character.rank} size="sm" glow />
            </div>
            {/* Sparkle decorativo */}
            <Sparkles className="absolute -top-2 -right-2 size-5 text-amber-warm animate-pulse-soft" />
          </div>

          {/* Info */}
          <div className="flex-1 pb-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-display text-2xl lg:text-3xl font-semibold text-text-secondary">
                {character.displayName}
              </h2>
            </div>
            <p className="text-sm text-text-muted">
              <span className="font-medium text-text-primary">
                Level {character.level}
              </span>
              <span className="mx-1.5">·</span>
              {meta.label}
            </p>
            <p className="text-xs italic text-text-subtle mt-1">
              "{character.identity.battleQuote}"
            </p>
          </div>

          {/* Streak — desktop */}
          <div className="hidden lg:flex flex-col items-center pb-1">
            <div className="flex items-center gap-1 text-amber-warm">
              <Flame className="size-5" style={{ color: 'var(--amber-warm)' }} />
              <span className="font-mono text-2xl font-bold text-text-primary">
                {character.streakCurrent}
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted">
              Streak
            </p>
          </div>
        </div>

        {/* XP bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs uppercase tracking-[0.15em] text-text-muted font-semibold">
              Próximo Level
            </span>
            <span className="text-xs font-mono text-text-secondary font-semibold">
              {character.xpCurrentLevel.toLocaleString('pt-BR')} /{' '}
              {character.xpToNextLevel.toLocaleString('pt-BR')} XP
            </span>
          </div>
          <ProgressBar
            value={character.xpCurrentLevel}
            max={character.xpToNextLevel}
            size="md"
            variant="gradient"
            animated
          />
        </div>

        {/* Streak — mobile (abaixo da XP) */}
        <div className="lg:hidden flex items-center gap-3 mt-4 pt-4 border-t border-border-subtle">
          <Flame className="size-5" style={{ color: 'var(--amber-warm)' }} />
          <span className="font-mono text-lg font-bold text-text-primary">
            {character.streakCurrent} dias
          </span>
          <span className="text-xs text-text-muted">
            (melhor: {character.streakBest})
          </span>
        </div>
      </div>
    </div>
  );
};
