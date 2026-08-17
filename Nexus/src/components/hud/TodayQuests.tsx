import { useMemo } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { useQuestStore } from '@/stores/questStore';
import { CheckCircle2, ChevronRight, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { toast } from 'sonner';
import type { QuestCategory, Quest } from '@/types';

const categoryEmoji: Record<QuestCategory, string> = {
  study: '📚',
  health: '💪',
  project: '⚙️',
  social: '💬',
  creative: '🎨',
  life: '🌿',
  mind: '🧠',
};

const isToday = (iso?: string) => {
  if (!iso) return false;
  const d = new Date(iso);
  const t = new Date();
  return d.toDateString() === t.toDateString();
};

/**
 * Lista compacta das próximas quests pra hoje, no HUD.
 * Click no checkbox completa direto.
 */
export const TodayQuests = () => {
  // Subscrever ao array — derivar com useMemo evita loop do Zustand
  const quests = useQuestStore((s) => s.quests);
  const complete = useQuestStore((s) => s.complete);

  const active = useMemo(
    () =>
      quests
        .filter((q) => q.status === 'active' || q.status === 'planned')
        .sort(
          (a, b) =>
            new Date(a.schedule.dueDate).getTime() -
            new Date(b.schedule.dueDate).getTime(),
        )
        .slice(0, 4),
    [quests],
  );

  const completedToday = useMemo(
    () =>
      quests.filter(
        (q) => q.status === 'completed' && isToday(q.completedAt),
      ).length,
    [quests],
  );

  const handleComplete = (q: Quest) => {
    complete(q.id);
    toast.success(`+${q.rewards.xp} XP`, {
      description: q.title,
      icon: '⚔️',
    });
  };

  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold">
              Quests de Hoje
            </h3>
            <p className="text-sm text-text-secondary mt-0.5">
              <span className="font-semibold text-success">{completedToday}</span>{' '}
              completas ·{' '}
              <span className="font-semibold text-primary">{active.length}</span>{' '}
              pendentes
            </p>
          </div>
          <Link
            to="/quests"
            className="text-xs text-primary hover:underline flex items-center gap-0.5"
          >
            Ver todas <ChevronRight className="size-3" />
          </Link>
        </div>

        {active.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-sm text-text-muted">
              Tudo feito por hoje!
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {active.map((q) => (
              <li
                key={q.id}
                className={cn(
                  'flex items-center gap-3 p-2.5 rounded-lg',
                  'border border-border-subtle bg-bg/40',
                  'hover:border-border hover:bg-bg transition-colors',
                )}
              >
                <button
                  onClick={() => handleComplete(q)}
                  className={cn(
                    'size-9 rounded-lg shrink-0 flex items-center justify-center text-base',
                    'bg-bg-elevated border border-border',
                    'hover:bg-primary/10 hover:text-primary hover:border-primary/40',
                    'transition-colors group',
                  )}
                  aria-label="Completar quest"
                >
                  <span className="group-hover:hidden">
                    {categoryEmoji[q.category]}
                  </span>
                  <CheckCircle2 className="hidden group-hover:block size-5" />
                </button>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {q.title}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-text-muted mt-0.5">
                    <span className="flex items-center gap-0.5">
                      <Clock className="size-3" /> {q.estimatedMinutes}m
                    </span>
                    <span className="flex items-center gap-0.5 font-mono font-semibold text-primary">
                      <Zap className="size-3" />+{q.rewards.xp}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
};
