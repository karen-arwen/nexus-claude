import { Bell, Moon, Sun, Search } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { useCharacterStore } from '@/stores/characterStore';
import { useUIStore } from '@/stores/uiStore';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { FocusBadge } from '@/components/overlays/FocusTimer';

/**
 * Top bar — visível em mobile (mostra greeting + actions)
 * e desktop (mostra search + actions; sidebar tem hunter info).
 */
export const TopBar = () => {
  const character = useCharacterStore((s) => s.character);
  const resolvedMode = useThemeStore((s) => s.resolvedMode);
  const toggleMode = useThemeStore((s) => s.toggleMode);
  const items = useNotificationStore((s) => s.items);
  const unread = items.filter((n) => !n.read).length;
  const openCmdk = useUIStore((s) => s.openCmdk);
  const openNotif = useUIStore((s) => s.openNotif);

  return (
    <header
      className={cn(
        'sticky top-0 z-30',
        'h-14 lg:h-16',
        'flex items-center gap-3 px-4 lg:px-8',
        'bg-bg/80 backdrop-blur-xl border-b border-border-subtle safe-top',
      )}
    >
      {/* Mobile: brand mark */}
      <Link to="/" className="lg:hidden flex items-center gap-2 mr-auto">
        <div className="size-8 rounded-md gradient-rose" />
        <span className="font-display text-lg font-semibold text-text-secondary">
          NEXUS
        </span>
      </Link>

      {/* Desktop: greeting */}
      <div className="hidden lg:flex flex-col mr-auto">
        <p className="text-xs text-text-muted">Bem-vinda de volta,</p>
        <p className="text-sm font-semibold text-text-primary">
          {character.displayName}
        </p>
      </div>

      {/* Focus badge — só aparece quando timer está rolando */}
      <FocusBadge />

      {/* Search → opens command palette */}
      <button
        onClick={openCmdk}
        className={cn(
          'hidden lg:flex items-center gap-2 h-9 px-3 rounded-lg',
          'bg-bg-elevated border border-border',
          'text-sm text-text-muted hover:text-text-primary hover:border-border-strong',
          'transition-colors min-w-[260px]',
        )}
      >
        <Search className="size-4" />
        <span>Buscar quests, dungeons...</span>
        <kbd className="ml-auto px-1.5 py-0.5 text-[10px] font-mono bg-bg rounded border border-border">
          ⌘K
        </kbd>
      </button>

      {/* Search icon mobile */}
      <button
        onClick={openCmdk}
        className="lg:hidden size-10 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
        aria-label="Buscar"
      >
        <Search className="size-[18px]" />
      </button>

      {/* Theme toggle */}
      <button
        onClick={toggleMode}
        aria-label="Trocar modo claro/escuro"
        className={cn(
          'size-10 rounded-lg flex items-center justify-center',
          'text-text-muted hover:text-text-primary hover:bg-bg-elevated',
          'transition-colors',
        )}
      >
        {resolvedMode === 'dark' ? (
          <Sun className="size-[18px]" />
        ) : (
          <Moon className="size-[18px]" />
        )}
      </button>

      {/* Notifications */}
      <button
        onClick={openNotif}
        aria-label="Notificações"
        className={cn(
          'size-10 rounded-lg flex items-center justify-center relative',
          'text-text-muted hover:text-text-primary hover:bg-bg-elevated',
          'transition-colors',
        )}
      >
        <Bell className="size-[18px]" />
        {unread > 0 && (
          <span
            className={cn(
              'absolute top-1.5 right-1.5',
              'size-2 rounded-full bg-danger',
              'ring-2 ring-bg',
            )}
          />
        )}
      </button>
    </header>
  );
};
