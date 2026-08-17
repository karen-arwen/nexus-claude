import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Character, CharacterStats } from '@/types';
import { levelFromXp, rankFromLevel, xpProgress } from '@/lib/xp';
import { mockCharacter } from '@/lib/mock';

interface CharacterState {
  character: Character;
  /** ganha XP, recalcula level/rank, retorna se subiu de level */
  gainXp: (amount: number) => { leveledUp: boolean; newLevel: number };
  spendGold: (amount: number) => boolean;
  spendEssence: (amount: number) => boolean;
  setStats: (patch: Partial<CharacterStats>) => void;
  tickStreak: () => void;
  breakStreak: () => void;
  setIdentity: (patch: Partial<Character['identity']>) => void;
  resetCharacter: () => void;
}

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set, get) => ({
      character: mockCharacter,

      gainXp: (amount) => {
        const c = get().character;
        const newTotal = c.xpTotal + amount;
        const newLevel = levelFromXp(newTotal);
        const progress = xpProgress(newTotal);
        const leveledUp = newLevel > c.level;

        set({
          character: {
            ...c,
            xpTotal: newTotal,
            level: newLevel,
            xpCurrentLevel: progress.xpCurrentLevel,
            xpToNextLevel: progress.xpToNextLevel,
            rank: rankFromLevel(newLevel),
            skillPoints: leveledUp
              ? c.skillPoints + (newLevel - c.level)
              : c.skillPoints,
          },
        });

        return { leveledUp, newLevel };
      },

      spendGold: (amount) => {
        const c = get().character;
        if (c.currencies.gold < amount) return false;
        set({
          character: {
            ...c,
            currencies: { ...c.currencies, gold: c.currencies.gold - amount },
          },
        });
        return true;
      },

      spendEssence: (amount) => {
        const c = get().character;
        if (c.currencies.essence < amount) return false;
        set({
          character: {
            ...c,
            currencies: {
              ...c.currencies,
              essence: c.currencies.essence - amount,
            },
          },
        });
        return true;
      },

      setStats: (patch) => {
        const c = get().character;
        set({ character: { ...c, stats: { ...c.stats, ...patch } } });
      },

      tickStreak: () => {
        const c = get().character;
        const last = c.streakLastTickAt ? new Date(c.streakLastTickAt) : null;
        const now = new Date();
        const sameDay =
          last && last.toDateString() === now.toDateString();
        if (sameDay) return;
        const newCurrent = c.streakCurrent + 1;
        set({
          character: {
            ...c,
            streakCurrent: newCurrent,
            streakBest: Math.max(c.streakBest, newCurrent),
            streakLastTickAt: now.toISOString(),
          },
        });
      },

      breakStreak: () => {
        const c = get().character;
        set({ character: { ...c, streakCurrent: 0 } });
      },

      setIdentity: (patch) => {
        const c = get().character;
        set({ character: { ...c, identity: { ...c.identity, ...patch } } });
      },

      resetCharacter: () => set({ character: mockCharacter }),
    }),
    { name: 'nexus-character' },
  ),
);
