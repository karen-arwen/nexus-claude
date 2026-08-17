import { useCharacterStore } from '@/stores/characterStore';
import { RANK_META } from '@/lib/xp';
import { cn } from '@/lib/cn';

interface HunterIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showRank?: boolean;
  animate?: boolean;
  className?: string;
}

const SIZES = {
  sm: 'size-10 text-base',
  md: 'size-16 text-2xl',
  lg: 'size-24 text-4xl',
  xl: 'size-32 text-5xl',
  '2xl': 'size-40 text-6xl',
};

const SILHOUETTE_EMOJI = {
  human: '🧝‍♀️',
  fox: '🦊',
  wolf: '🐺',
  hooded: '🥷',
  creature: '✨',
};

/**
 * Hunter Identity Icon — placeholder enquanto Sprint 3 não traz SVG real.
 * Já usa a config persistida pra ficar coerente com customização.
 */
export const HunterIcon = ({
  size = 'lg',
  showRank = true,
  animate = false,
  className,
}: HunterIconProps) => {
  const character = useCharacterStore((s) => s.character);
  const meta = RANK_META[character.rank];
  const config = character.avatarConfig;

  const emoji = SILHOUETTE_EMOJI[config.silhouette] ?? '✨';

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'rounded-2xl flex items-center justify-center relative overflow-hidden',
          SIZES[size],
          animate && 'animate-float',
        )}
        style={{
          background:
            config.background === 'gradient'
              ? `linear-gradient(135deg, var(--${meta.cssVar}), var(--primary))`
              : `var(--${meta.cssVar})`,
          boxShadow: `0 12px 32px color-mix(in srgb, var(--${meta.cssVar}) 50%, transparent), 0 0 0 4px var(--bg-elevated)`,
        }}
      >
        {/* Aura/glow behind */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 50%, white 0%, transparent 60%)`,
          }}
        />
        {/* Particles */}
        {config.particles === 'sparkles' && (
          <>
            <span className="absolute top-2 right-2 text-yellow-200 text-xs">
              ✨
            </span>
            <span className="absolute bottom-2 left-2 text-yellow-200 text-[10px]">
              ✨
            </span>
          </>
        )}
        {/* Silhouette */}
        <span className="relative z-10">{emoji}</span>
      </div>

      {/* Rank badge */}
      {showRank && config.rankBadgeVisible && (
        <div
          className="absolute -bottom-1 -right-1 size-8 rounded-lg flex items-center justify-center font-display font-bold text-sm text-white border-2 border-bg-elevated"
          style={{
            background: `var(--${meta.cssVar})`,
            boxShadow: `0 4px 12px var(--${meta.cssVar})`,
          }}
        >
          {character.rank}
        </div>
      )}
    </div>
  );
};
