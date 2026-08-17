import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '@/stores/uiStore';
import { useQuestStore } from '@/stores/questStore';
import { cn } from '@/lib/cn';
import {
  Search,
  Plus,
  Bot,
  Castle,
  Sparkles,
  Skull,
  CalendarRange,
  Palette,
  Settings,
  Bell,
  Hammer,
  Trophy,
  Notebook,
  BookHeart,
  HeartPulse,
  Timer,
  Flame,
  type LucideIcon,
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  group: string;
  keywords?: string[];
  run: () => void;
  shortcut?: string[];
}

/**
 * Command Palette — ⌘K em qualquer tela.
 *
 * Estilo Linear/Raycast/Notion:
 * - Busca fuzzy
 * - Quick actions (criar quest, iniciar foco, etc)
 * - Navegação rápida
 * - Tudo em uma caixa
 */
export const CommandPalette = () => {
  const open = useUIStore((s) => s.cmdkOpen);
  const close = useUIStore((s) => s.closeCmdk);
  const toggle = useUIStore((s) => s.toggleCmdk);
  const openQuestCreate = useUIStore((s) => s.openQuestCreate);
  const openFocus = useUIStore((s) => s.openFocus);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);

  const quests = useQuestStore((s) => s.quests);
  const completeQuest = useQuestStore((s) => s.complete);

  // Hotkey ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isCmdK) {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape' && open) {
        close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, toggle, close]);

  // Focus input on open + reset state
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
      // RAF to ensure input is mounted
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const closeAndRun = (fn: () => void) => () => {
    close();
    setTimeout(fn, 0);
  };

  // Build full command list
  const commands = useMemo<CommandItem[]>(() => {
    const base: CommandItem[] = [
      // Actions
      {
        id: 'new-quest',
        label: 'Criar nova quest',
        icon: Plus,
        group: 'Ações',
        keywords: ['quest', 'missao', 'nova', 'criar', 'task', 'add'],
        run: closeAndRun(() => openQuestCreate()),
        shortcut: ['⌘', 'N'],
      },
      {
        id: 'focus',
        label: 'Iniciar sessão de foco',
        hint: 'Pomodoro 25min',
        icon: Timer,
        group: 'Ações',
        keywords: ['focus', 'foco', 'pomodoro', 'timer', 'concentrar'],
        run: closeAndRun(() => openFocus()),
        shortcut: ['⌘', 'F'],
      },
      {
        id: 'lumi',
        label: 'Falar com Lumi',
        icon: Bot,
        group: 'Ações',
        keywords: ['lumi', 'ai', 'ia', 'chat', 'ajuda'],
        run: closeAndRun(() => navigate('/lumi')),
      },
      // Navigation
      {
        id: 'go-hud',
        label: 'Ir pro HUD',
        icon: Sparkles,
        group: 'Navegar',
        keywords: ['home', 'inicio', 'dashboard', 'hud'],
        run: closeAndRun(() => navigate('/')),
      },
      {
        id: 'go-quests',
        label: 'Ver Quests',
        icon: Sparkles,
        group: 'Navegar',
        keywords: ['quests', 'missoes', 'tarefas'],
        run: closeAndRun(() => navigate('/quests')),
      },
      {
        id: 'go-dungeons',
        label: 'Ver Dungeons',
        icon: Castle,
        group: 'Navegar',
        keywords: ['dungeons', 'projetos'],
        run: closeAndRun(() => navigate('/dungeons')),
      },
      {
        id: 'go-bosses',
        label: 'Ver Boss Battles',
        icon: Skull,
        group: 'Navegar',
        keywords: ['bosses', 'monarch', 'procrastinus'],
        run: closeAndRun(() => navigate('/bosses')),
      },
      {
        id: 'go-skills',
        label: 'Skill Tree',
        icon: Sparkles,
        group: 'Navegar',
        keywords: ['skills', 'arvore', 'habilidades', 'tree'],
        run: closeAndRun(() => navigate('/skills')),
      },
      {
        id: 'go-forge',
        label: 'Forge (Inventory + Crafting)',
        icon: Hammer,
        group: 'Navegar',
        keywords: ['forge', 'crafting', 'inventory', 'itens', 'forja'],
        run: closeAndRun(() => navigate('/inventory')),
      },
      {
        id: 'go-trophy',
        label: 'Trophy Room',
        icon: Trophy,
        group: 'Navegar',
        keywords: ['trofeu', 'achievements', 'conquistas'],
        run: closeAndRun(() => navigate('/trophy-room')),
      },
      {
        id: 'go-planner',
        label: 'Planner / Agenda',
        icon: CalendarRange,
        group: 'Navegar',
        keywords: ['planner', 'agenda', 'calendario'],
        run: closeAndRun(() => navigate('/planner')),
      },
      {
        id: 'go-journal',
        label: 'Diário',
        icon: Notebook,
        group: 'Navegar',
        keywords: ['diario', 'journal', 'mood'],
        run: closeAndRun(() => navigate('/journal')),
      },
      {
        id: 'go-archive',
        label: 'Archive (Biblioteca)',
        icon: BookHeart,
        group: 'Navegar',
        keywords: ['archive', 'biblioteca', 'livros', 'filmes'],
        run: closeAndRun(() => navigate('/archive')),
      },
      {
        id: 'go-health',
        label: 'Wellness / Saúde',
        icon: HeartPulse,
        group: 'Navegar',
        keywords: ['health', 'saude', 'wellness'],
        run: closeAndRun(() => navigate('/health')),
      },
      {
        id: 'go-theme',
        label: 'Trocar aparência',
        icon: Palette,
        group: 'Navegar',
        keywords: ['theme', 'tema', 'aparencia', 'cor', 'paleta'],
        run: closeAndRun(() => navigate('/theme')),
      },
      {
        id: 'go-settings',
        label: 'Configurações',
        icon: Settings,
        group: 'Navegar',
        keywords: ['settings', 'config', 'preferencias'],
        run: closeAndRun(() => navigate('/settings')),
      },
      {
        id: 'go-notif',
        label: 'Notificações',
        icon: Bell,
        group: 'Navegar',
        keywords: ['notif', 'avisos'],
        run: closeAndRun(() => navigate('/notifications')),
      },
    ];

    // Quests ativas — completar diretamente
    const activeQuests: CommandItem[] = quests
      .filter((q) => q.status === 'active' || q.status === 'planned')
      .slice(0, 12)
      .map((q) => ({
        id: `quest-${q.id}`,
        label: `Completar: ${q.title}`,
        hint: `+${q.rewards.xp} XP · ${q.estimatedMinutes}min`,
        icon: Flame,
        group: 'Quests ativas',
        keywords: [q.title, q.category, q.type],
        run: closeAndRun(() => completeQuest(q.id)),
      }));

    return [...base, ...activeQuests];
  }, [quests, navigate, closeAndRun, completeQuest, openQuestCreate, openFocus]);

  // Filter
  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter((c) => {
      if (c.label.toLowerCase().includes(q)) return true;
      if (c.hint?.toLowerCase().includes(q)) return true;
      if (c.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
      return false;
    });
  }, [commands, query]);

  // Group items
  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    filtered.forEach((c) => {
      const list = map.get(c.group) ?? [];
      list.push(c);
      map.set(c.group, list);
    });
    return Array.from(map.entries());
  }, [filtered]);

  // Reset active idx when filter changes
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  // Keyboard nav within list
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        filtered[activeIdx]?.run();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, activeIdx]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onMouseDown={close}
      />

      {/* Palette */}
      <div
        className={cn(
          'relative w-full max-w-2xl',
          'bg-bg-elevated border border-border',
          'rounded-2xl shadow-premium-2xl',
          'overflow-hidden animate-slide-up',
        )}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 h-14 border-b border-border-subtle">
          <Search className="size-5 text-text-muted shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busque ou digite um comando..."
            className={cn(
              'flex-1 bg-transparent outline-none border-0',
              'text-base text-text-primary placeholder:text-text-subtle',
            )}
          />
          <kbd className="hidden sm:inline px-2 py-0.5 text-[10px] font-mono bg-bg rounded border border-border text-text-muted">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {grouped.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-text-muted">
              Nenhum resultado pra "{query}"
            </div>
          ) : (
            grouped.map(([group, items]) => (
              <div key={group} className="mb-2">
                <p className="px-5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-text-subtle font-semibold">
                  {group}
                </p>
                <ul>
                  {items.map((item) => {
                    const Icon = item.icon;
                    const itemIdx = filtered.indexOf(item);
                    const isActive = itemIdx === activeIdx;
                    return (
                      <li
                        key={item.id}
                        onMouseEnter={() => setActiveIdx(itemIdx)}
                        onClick={item.run}
                        className={cn(
                          'flex items-center gap-3 px-5 h-11 cursor-pointer text-sm',
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-text-primary hover:bg-bg/40',
                        )}
                      >
                        <Icon className="size-4 shrink-0 opacity-80" />
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.hint && (
                          <span className="text-xs text-text-muted">
                            {item.hint}
                          </span>
                        )}
                        {item.shortcut && (
                          <div className="flex gap-0.5">
                            {item.shortcut.map((k) => (
                              <kbd
                                key={k}
                                className="px-1.5 py-0.5 text-[10px] font-mono bg-bg rounded border border-border text-text-muted"
                              >
                                {k}
                              </kbd>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 h-9 border-t border-border-subtle bg-bg/40 text-[11px] text-text-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0 bg-bg-elevated border border-border rounded font-mono">
                ↑↓
              </kbd>
              navegar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0 bg-bg-elevated border border-border rounded font-mono">
                ↵
              </kbd>
              executar
            </span>
          </div>
          <span className="font-mono">{filtered.length} resultado(s)</span>
        </div>
      </div>
    </div>
  );
};
