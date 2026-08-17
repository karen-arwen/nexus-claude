import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeName, ThemeMode, AestheticMode } from '@/types';

interface ThemeState {
  theme: ThemeName;
  mode: ThemeMode;
  aesthetic: AestheticMode;
  resolvedMode: 'light' | 'dark';
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: ThemeMode) => void;
  setAesthetic: (aesthetic: AestheticMode) => void;
  toggleMode: () => void;
}

function resolveMode(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return mode;
}

function applyToDocument(
  theme: ThemeName,
  resolved: 'light' | 'dark',
  aesthetic: AestheticMode,
) {
  const html = document.documentElement;
  html.dataset.theme = theme;
  html.dataset.mode = resolved;
  html.dataset.aesthetic = aesthetic;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'espresso',
      mode: 'system',
      aesthetic: 'elegant',
      resolvedMode: 'light',

      setTheme: (theme) => {
        applyToDocument(theme, get().resolvedMode, get().aesthetic);
        set({ theme });
      },

      setMode: (mode) => {
        const resolved = resolveMode(mode);
        applyToDocument(get().theme, resolved, get().aesthetic);
        set({ mode, resolvedMode: resolved });
      },

      setAesthetic: (aesthetic) => {
        applyToDocument(get().theme, get().resolvedMode, aesthetic);
        set({ aesthetic });
      },

      toggleMode: () => {
        const next = get().resolvedMode === 'dark' ? 'light' : 'dark';
        applyToDocument(get().theme, next, get().aesthetic);
        set({ mode: next, resolvedMode: next });
      },
    }),
    {
      name: 'nexus-theme',
      onRehydrateStorage: () => (state) => {
        if (state) {
          const resolved = resolveMode(state.mode);
          applyToDocument(state.theme, resolved, state.aesthetic);
          state.resolvedMode = resolved;
        }
      },
    },
  ),
);

// Sync com mudança de preferência do SO
if (typeof window !== 'undefined') {
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      const { mode, setMode } = useThemeStore.getState();
      if (mode === 'system') setMode('system');
    });
}
