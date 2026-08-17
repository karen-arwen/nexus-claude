import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import type { Rank, Rarity } from '@/types';
import { RANK_META } from '@/lib/xp';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'subtle';
  size?: 'sm' | 'md';
}

const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-bg-elevated text-text-secondary border border-border',
  primary: 'bg-primary/10 text-primary border border-primary/20',
  success: 'bg-success/15 text-success border border-success/20',
  warning: 'bg-warning/15 text-text-primary border border-warning/30',
  danger: 'bg-danger/15 text-danger border border-danger/20',
  subtle: 'bg-bg-elevated text-text-muted',
};

export const Badge = ({
  className,
  variant = 'default',
  size = 'sm',
  ...rest
}: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-full font-medium',
      size === 'sm' ? 'h-6 px-2.5 text-xs' : 'h-7 px-3 text-sm',
      variants[variant],
      className,
    )}
    {...rest}
  />
);

interface RankBadgeProps {
  rank: Rank;
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  className?: string;
}

export const RankBadge = ({ rank, size = 'md', glow, className }: RankBadgeProps) => {
  const meta = RANK_META[rank];
  const sizeClass =
    size === 'sm' ? 'h-7 w-7 text-xs' : size === 'lg' ? 'h-12 w-12 text-lg' : 'h-9 w-9 text-sm';

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-bold font-display',
        'border-2',
        sizeClass,
        glow && rank === 'SSS' && 'animate-glow',
        className,
      )}
      style={{
        background: `var(--${meta.cssVar})`,
        color: 'white',
        borderColor: `var(--${meta.cssVar})`,
        boxShadow: glow
          ? `0 0 20px var(--${meta.cssVar})`
          : '0 2px 8px rgb(0 0 0 / 0.15)',
      }}
      title={`Rank ${rank} · ${meta.label}`}
    >
      {rank}
    </span>
  );
};

interface RarityBadgeProps {
  rarity: Rarity;
  className?: string;
}

const rarityLabels: Record<Rarity, string> = {
  common: 'Comum',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Lendário',
  mythic: 'Mítico',
};

export const RarityBadge = ({ rarity, className }: RarityBadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center h-6 px-2.5 rounded-full text-xs font-semibold uppercase tracking-wider',
      'border',
      className,
    )}
    style={{
      background: `var(--rarity-${rarity})`,
      color: 'white',
      borderColor: `var(--rarity-${rarity})`,
    }}
  >
    {rarityLabels[rarity]}
  </span>
);
