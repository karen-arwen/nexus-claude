import type { Rank } from '@/types';

/**
 * XP & Level system.
 * Curva exponencial — ~25% mais XP por level.
 *
 * Level 2 → 100 XP
 * Level 10 → ~1.500 XP
 * Level 50 → ~50.000 XP
 * Level 100 → ~500.000 XP
 */

const BASE_XP = 100;
const GROWTH = 1.12;

export function xpToReachLevel(level: number): number {
  if (level <= 1) return 0;
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += Math.floor(BASE_XP * Math.pow(GROWTH, i - 1));
  }
  return total;
}

export function xpForLevel(level: number): number {
  if (level <= 1) return BASE_XP;
  return Math.floor(BASE_XP * Math.pow(GROWTH, level - 1));
}

export function levelFromXp(xpTotal: number): number {
  let level = 1;
  while (xpToReachLevel(level + 1) <= xpTotal && level < 100) {
    level++;
  }
  return level;
}

export function xpProgress(xpTotal: number) {
  const level = levelFromXp(xpTotal);
  const start = xpToReachLevel(level);
  const next = xpToReachLevel(level + 1);
  const inLevel = xpTotal - start;
  const need = next - start;
  return {
    level,
    xpCurrentLevel: inLevel,
    xpToNextLevel: need,
    progressRatio: need > 0 ? inLevel / need : 1,
  };
}

// ============================================================
// RANKS
// ============================================================

export const RANK_THRESHOLDS: Array<{ rank: Rank; min: number; max: number }> = [
  { rank: 'E', min: 1, max: 5 },
  { rank: 'D', min: 6, max: 10 },
  { rank: 'C', min: 11, max: 20 },
  { rank: 'B', min: 21, max: 35 },
  { rank: 'A', min: 36, max: 50 },
  { rank: 'S', min: 51, max: 70 },
  { rank: 'SS', min: 71, max: 90 },
  { rank: 'SSS', min: 91, max: 100 },
];

export function rankFromLevel(level: number): Rank {
  return (
    RANK_THRESHOLDS.find((r) => level >= r.min && level <= r.max)?.rank ?? 'E'
  );
}

export const RANK_META: Record<
  Rank,
  { label: string; tier: string; emoji: string; cssVar: string }
> = {
  E: { label: 'Hunter Iniciante', tier: 'E', emoji: '⭐', cssVar: 'rank-e' },
  D: { label: 'Hunter Novato', tier: 'D', emoji: '⭐⭐', cssVar: 'rank-d' },
  C: { label: 'Hunter Experiente', tier: 'C', emoji: '🌟', cssVar: 'rank-c' },
  B: { label: 'Hunter Veterano', tier: 'B', emoji: '💫', cssVar: 'rank-b' },
  A: { label: 'Hunter Elite', tier: 'A', emoji: '✨', cssVar: 'rank-a' },
  S: { label: 'Hunter Rank S', tier: 'S', emoji: '🔥', cssVar: 'rank-s' },
  SS: { label: 'Hunter Rank SS', tier: 'SS', emoji: '💎', cssVar: 'rank-ss' },
  SSS: { label: 'Shadow Monarch', tier: 'SSS', emoji: '👑', cssVar: 'rank-sss' },
};
