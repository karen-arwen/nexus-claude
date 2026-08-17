import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCharacterStore } from './characterStore';

export type FocusPreset = 'pomodoro' | 'short' | 'deep' | 'custom';

interface FocusState {
  /** running, paused, idle */
  state: 'idle' | 'running' | 'paused';
  preset: FocusPreset;
  /** total target em segundos */
  totalSeconds: number;
  /** restantes em segundos */
  remaining: number;
  /** quantas sessões completas hoje */
  completedToday: number;
  /** ambient sound: lo-fi, rain, cafe, silence */
  ambient: 'silence' | 'lofi' | 'rain' | 'cafe';

  start: (preset: FocusPreset, customMinutes?: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  tick: () => void;
  setAmbient: (a: FocusState['ambient']) => void;
}

const PRESET_SECONDS: Record<FocusPreset, number> = {
  pomodoro: 25 * 60,
  short: 10 * 60,
  deep: 90 * 60,
  custom: 25 * 60,
};

export const useFocusStore = create<FocusState>()(
  persist(
    (set, get) => ({
      state: 'idle',
      preset: 'pomodoro',
      totalSeconds: PRESET_SECONDS.pomodoro,
      remaining: PRESET_SECONDS.pomodoro,
      completedToday: 0,
      ambient: 'silence',

      start: (preset, customMinutes) => {
        const total =
          preset === 'custom' && customMinutes
            ? customMinutes * 60
            : PRESET_SECONDS[preset];
        set({
          state: 'running',
          preset,
          totalSeconds: total,
          remaining: total,
        });
      },

      pause: () => set({ state: 'paused' }),
      resume: () => set({ state: 'running' }),

      stop: () =>
        set({
          state: 'idle',
          remaining: get().totalSeconds,
        }),

      tick: () => {
        const s = get();
        if (s.state !== 'running') return;
        if (s.remaining <= 1) {
          // Sessão completa! Recompensa.
          // XP proporcional ao tempo: 1 XP / minuto
          const xpEarned = Math.floor(s.totalSeconds / 60);
          useCharacterStore.getState().gainXp(xpEarned);
          set({
            state: 'idle',
            remaining: s.totalSeconds,
            completedToday: s.completedToday + 1,
          });
        } else {
          set({ remaining: s.remaining - 1 });
        }
      },

      setAmbient: (a) => set({ ambient: a }),
    }),
    {
      name: 'nexus-focus',
      // Não persistir state running (pra evitar timer "fantasma" depois de fechar)
      partialize: (s) => ({
        preset: s.preset,
        totalSeconds: s.totalSeconds,
        completedToday: s.completedToday,
        ambient: s.ambient,
      }),
    },
  ),
);
