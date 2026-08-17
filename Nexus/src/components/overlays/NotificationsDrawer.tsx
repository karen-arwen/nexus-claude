import { useUIStore } from '@/stores/uiStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { cn } from '@/lib/cn';
import {
  X,
  Bell,
  Trophy,
  Flame,
  Swords,
  Star,
  Skull,
  Users,
  Info,
  type LucideIcon,
} from 'lucide-react';
import { useEffect } from 'react';
import type { NotificationType } from '@/types';

const ICON_MAP: Record<NotificationType, LucideIcon> = {
  achievement: Trophy,
  streak: Flame,
  quest: Swords,
  level: Star,
  boss: Skull,
  squad: Users,
  friend: Users,
  system: Info,
};

const COLOR_MAP: Record<NotificationType, string> = {
  achievement: 'var(--rank-a)',
  streak: 'var(--amber-warm)',
  quest: 'var(--primary)',
  level: 'var(--rank-sss)',
  boss: 'var(--danger)',
  squad: 'var(--rank-b)',
  friend: 'var(--rank-c)',
  system: 'var(--text-muted)',
};

const formatRelative = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'agora';
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
};

export const NotificationsDrawer = () => {
  const open = useUIStore((s) => s.notifOpen);
  const close = useUIStore((s) => s.closeNotif);

  const items = useNotificationStore((s) => s.items);
  const markRead = useNotificationStore((s) => s.markRead);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const clear = useNotificationStore((s) => s.clear);

  // ESC fecha
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!open) return null;

  const unread = items.filter((n) => !n.read).length;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-sm animate-fade-in"
        onClick={close}
      />

      {/* Drawer */}
      <aside
        className={cn(
          'fixed top-0 right-0 bottom-0 z-[91]',
          'w-full sm:w-[420px]',
          'bg-bg-elevated border-l border-border',
          'shadow-premium-2xl',
          'flex flex-col',
          'animate-slide-up',
        )}
      >
        {/* Header */}
        <header className="flex items-center justify-between h-14 px-5 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-primary" />
            <h2 className="font-display text-lg font-semibold text-text-secondary">
              Notificações
            </h2>
            {unread > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
                {unread}
              </span>
            )}
          </div>
          <button
            onClick={close}
            className="size-8 rounded-md flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg/40"
            aria-label="Fechar"
          >
            <X className="size-4" />
          </button>
        </header>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 px-5 py-2 border-b border-border-subtle">
          <button
            onClick={markAllRead}
            disabled={unread === 0}
            className="text-xs text-text-muted hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Marcar todas lidas
          </button>
          <span className="text-text-subtle">·</span>
          <button
            onClick={clear}
            disabled={items.length === 0}
            className="text-xs text-text-muted hover:text-danger disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Limpar
          </button>
        </div>

        {/* List */}
        <ul className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <li className="px-5 py-20 text-center">
              <Bell className="size-10 text-text-subtle mx-auto mb-3" />
              <p className="text-sm text-text-muted">
                Tudo em ordem por aqui ✨
              </p>
            </li>
          ) : (
            items.map((n) => {
              const Icon = ICON_MAP[n.type];
              const color = COLOR_MAP[n.type];
              return (
                <li
                  key={n.id}
                  onClick={() => !n.read && markRead(n.id)}
                  className={cn(
                    'flex items-start gap-3 px-5 py-3 cursor-pointer',
                    'border-b border-border-subtle',
                    !n.read && 'bg-primary/5',
                    'hover:bg-bg/40',
                  )}
                >
                  <div
                    className="size-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${color}20`, color }}
                  >
                    <Icon className="size-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-text-primary truncate">
                        {n.title}
                      </p>
                      <span className="text-[10px] text-text-subtle font-mono shrink-0">
                        {formatRelative(n.createdAt)}
                      </span>
                    </div>
                    {n.body && (
                      <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
                        {n.body}
                      </p>
                    )}
                  </div>

                  {!n.read && (
                    <span className="mt-1.5 size-2 rounded-full bg-primary shrink-0" />
                  )}
                </li>
              );
            })
          )}
        </ul>
      </aside>
    </>
  );
};
