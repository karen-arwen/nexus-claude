import { useThemeStore } from '@/stores/themeStore';
import { Card, CardBody } from '@/components/ui/Card';
import { Check, Moon, Sun, Monitor } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { ThemeName, ThemeMode, AestheticMode } from '@/types';

interface PaletteOption {
  id: ThemeName;
  name: string;
  emoji: string;
  vibe: string;
  preview: string[];
}

const PALETTES: PaletteOption[] = [
  {
    id: 'espresso',
    name: 'Espresso Elegance',
    emoji: '☕',
    vibe: 'Coffee shop premium',
    preview: ['#5d3a1a', '#8b5a3c', '#d4a574', '#f5efe7'],
  },
  {
    id: 'citrus',
    name: 'Citrus Candy',
    emoji: '🌸',
    vibe: 'Jovem e vibrante',
    preview: ['#ff6f3c', '#ffb627', '#ff5e8c', '#fff8f0'],
  },
  {
    id: 'sakura',
    name: 'Sakura Café',
    emoji: '🌸',
    vibe: 'Cozy feminino',
    preview: ['#c97b8a', '#e8a5a5', '#d4a574', '#fdf4f0'],
  },
  {
    id: 'cosmic',
    name: 'Cosmic Eevee',
    emoji: '🌌',
    vibe: 'Mágico e místico',
    preview: ['#3d2f6b', '#6b4dba', '#b389e8', '#f5f3ff'],
  },
  {
    id: 'mango',
    name: 'Mango Energy',
    emoji: '🔥',
    vibe: 'Gamificado intenso',
    preview: ['#5d3a1a', '#8b5a3c', '#d4a574', '#f5efe7'],
  },
  {
    id: 'ocean',
    name: 'Ocean Modern',
    emoji: '🌊',
    vibe: 'Profissional startup',
    preview: ['#5d3a1a', '#8b5a3c', '#d4a574', '#f5efe7'],
  },
  {
    id: 'pastel',
    name: 'Soft Pop Pastel',
    emoji: '🍬',
    vibe: 'Notion aesthetic',
    preview: ['#5d3a1a', '#8b5a3c', '#d4a574', '#f5efe7'],
  },
  {
    id: 'pink',
    name: 'Pink Loft',
    emoji: '💗',
    vibe: 'Feminino maduro',
    preview: ['#5d3a1a', '#8b5a3c', '#d4a574', '#f5efe7'],
  },
  {
    id: 'minimal',
    name: 'Coffee Minimal',
    emoji: '☁️',
    vibe: 'Clean premium',
    preview: ['#5d3a1a', '#8b5a3c', '#d4a574', '#f5efe7'],
  },
  {
    id: 'retro',
    name: 'Retro Bold',
    emoji: '🌈',
    vibe: 'Branding forte',
    preview: ['#5d3a1a', '#8b5a3c', '#d4a574', '#f5efe7'],
  },
];

interface AestheticOption {
  id: AestheticMode;
  name: string;
  emoji: string;
  vibe: string;
  description: string;
}

const AESTHETICS: AestheticOption[] = [
  {
    id: 'elegant',
    name: 'Elegant',
    emoji: '☕',
    vibe: 'Coffee shop premium',
    description: 'Tipografia serifada, animações suaves, glows discretos. Default.',
  },
  {
    id: 'gamer',
    name: 'Gamer',
    emoji: '🎮',
    vibe: 'Solo Leveling UI',
    description: 'Tipografia tech, neon controlado, scan grid de fundo, cantos chanfrados.',
  },
  {
    id: 'default',
    name: 'Default',
    emoji: '📐',
    vibe: 'Notion-like',
    description: 'Tipografia limpa, sem decoração, foco em conteúdo. Productivity-first.',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    emoji: '🤍',
    vibe: 'Calm computing',
    description: 'Quase grayscale, espaçoso, sem animações. Tipo Apple Notes.',
  },
];

const MODES: Array<{ id: ThemeMode; label: string; icon: typeof Sun }> = [
  { id: 'light', label: 'Claro', icon: Sun },
  { id: 'dark', label: 'Escuro', icon: Moon },
  { id: 'system', label: 'Sistema', icon: Monitor },
];

export default function ThemePage() {
  const { theme, mode, aesthetic, setTheme, setMode, setAesthetic } =
    useThemeStore();

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 lg:py-10 space-y-10">
      <header>
        <h1 className="font-display text-3xl lg:text-4xl font-semibold text-text-secondary">
          Aparência
        </h1>
        <p className="text-text-muted mt-1">
          Escolha sua vibe. Tudo no app se adapta na hora.
        </p>
      </header>

      {/* Aesthetic Modes — bigger feature, first */}
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold">
            Vibe (Aesthetic Mode)
          </h2>
          <p className="text-xs text-text-muted">
            Muda tipografia, animações e densidade
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {AESTHETICS.map((a) => (
            <button
              key={a.id}
              onClick={() => setAesthetic(a.id)}
              className={cn(
                'text-left p-4 rounded-xl border transition-all',
                aesthetic === a.id
                  ? 'border-primary bg-primary/5 shadow-premium-md'
                  : 'border-border bg-bg-elevated hover:border-border-strong',
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="text-3xl">{a.emoji}</div>
                {aesthetic === a.id && (
                  <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Check className="size-3" />
                  </div>
                )}
              </div>
              <h3 className="font-display text-lg font-semibold text-text-primary">
                {a.name}
              </h3>
              <p className="text-xs text-primary mb-2">{a.vibe}</p>
              <p className="text-xs text-text-muted leading-relaxed">
                {a.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Light/Dark */}
      <section>
        <h2 className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold mb-3">
          Modo
        </h2>
        <div className="flex gap-2">
          {MODES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              className={cn(
                'flex-1 lg:flex-none flex items-center gap-2 h-11 px-5 rounded-lg',
                'border transition-colors',
                mode === id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-bg-elevated border-border hover:border-border-strong',
              )}
            >
              <Icon className="size-4" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Paletas */}
      <section>
        <h2 className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold mb-3">
          Paleta
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PALETTES.map((p) => (
            <button
              key={p.id}
              onClick={() => setTheme(p.id)}
              className={cn(
                'text-left card-premium p-4 transition-all',
                'hover:shadow-premium-lg',
                theme === p.id &&
                  'ring-2 ring-primary ring-offset-2 ring-offset-bg',
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-2xl">{p.emoji}</div>
                {theme === p.id && (
                  <div className="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Check className="size-3.5" />
                  </div>
                )}
              </div>
              <h3 className="font-display text-lg font-semibold text-text-primary">
                {p.name}
              </h3>
              <p className="text-xs text-text-muted mb-3">{p.vibe}</p>
              <div className="flex gap-1.5">
                {p.preview.map((c, i) => (
                  <div
                    key={i}
                    className="flex-1 h-8 rounded-md"
                    style={{ background: c }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
        <p className="text-xs text-text-subtle mt-4">
          ✨ Espresso, Citrus, Sakura e Cosmic já estão refinadas. As outras
          herdam Espresso por enquanto — refinamento Sprint 6.
        </p>
      </section>
    </div>
  );
}
