import { NavLink } from 'react-router-dom';
import { useCharacterStore } from '@/stores/characterStore';
import { RANK_META } from '@/lib/xp';
import { NAV_GROUPS } from './nav-config';
import { cn } from '@/lib/cn';
import { Sparkles } from 'lucide-react';
import { ProgressBar } from '@/components/ui/ProgressBar';

export const Sidebar = () => {
  const character = useCharacterStore((s) => s.character);
  const meta = RANK_META[character.rank];

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col',
        'w-72 h-screen sticky top-0',
        'bg-bg-elevated/80 backdrop-blur-xl',
        'border-r border-border-subtle',
      )}
    >
      {/* Logo / Brand */}
      <div className="h-20 flex items-center gap-3 px-6 border-b border-border-subtle">
        <div className="size-10 rounded-lg gradient-rose flex items-center justify-center shadow-premium-md">
          <Sparkles className="size-5 text-white" />
        </div>
        <div className="leading-none">
          <h1 className="font-display text-2xl font-semibold text-text-secondary">
            NEXUS
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mt-0.5">
            Neural Evolution
          </p>
        </div>
      </div>

      {/* Hunter card */}
      <div className="px-4 py-4 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div
            className="size-12 rounded-xl flex items-center justify-center text-white font-bold font-display text-lg shrink-0"
            style={{
              background: `var(--${meta.cssVar})`,
              boxShadow: `0 4px 16px var(--${meta.cssVar})`,
            }}
          >
            {character.rank}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate">
              {character.displayName}
            </p>
            <p className="text-xs text-text-muted">
              Lv.{character.level} · {meta.label}
            </p>
          </div>
        </div>
        <ProgressBar
          value={character.xpCurrentLevel}
          max={character.xpToNextLevel}
          size="sm"
          variant="gradient"
          className="mt-3"
        />
        <p className="text-[10px] font-mono text-text-muted mt-1.5 text-right">
          {character.xpCurrentLevel} / {character.xpToNextLevel} XP
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="px-3 mb-2 text-[10px] uppercase tracking-[0.2em] text-text-subtle font-semibold">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 h-10 rounded-lg text-sm font-medium',
                        'transition-colors duration-150',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-muted hover:text-text-primary hover:bg-bg/60',
                      )
                    }
                  >
                    <Icon className="size-[18px] shrink-0" />
                    <span className="truncate">{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border-subtle">
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span className="font-mono">v0.1.0</span>
          <span>· Sprint 1 ·</span>
        </div>
      </div>
    </aside>
  );
};
