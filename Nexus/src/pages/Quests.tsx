import { useState } from 'react';
import { useQuestStore } from '@/stores/questStore';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Clock, Filter, Plus, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/cn';
import { toast } from 'sonner';
import type { Quest, QuestCategory, QuestType } from '@/types';

const categoryEmoji: Record<QuestCategory, string> = {
  study: '📚',
  health: '💪',
  project: '⚙️',
  social: '💬',
  creative: '🎨',
  life: '🌿',
  mind: '🧠',
};

const typeColor: Record<QuestType, string> = {
  Essential: 'bg-primary/10 text-primary border-primary/20',
  Light: 'bg-success/15 text-success border-success/20',
  Challenge: 'bg-danger/15 text-danger border-danger/20',
  Ritual: 'bg-warning/15 text-text-primary border-warning/30',
  Recovery: 'bg-bg-elevated text-text-muted border-border',
};

type Tab = 'active' | 'completed' | 'failed';

export default function QuestsPage() {
  const [tab, setTab] = useState<Tab>('active');
  const quests = useQuestStore((s) => s.quests);
  const complete = useQuestStore((s) => s.complete);
  const failQuest = useQuestStore((s) => s.fail);

  const filtered = quests.filter((q) => {
    if (tab === 'active') return q.status === 'active' || q.status === 'planned';
    if (tab === 'completed') return q.status === 'completed';
    return q.status === 'failed';
  });

  const handleComplete = (q: Quest) => {
    complete(q.id);
    toast.success(`Quest completada! +${q.rewards.xp} XP`, {
      description: q.title,
      icon: '⚔️',
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl lg:text-4xl font-semibold text-text-secondary">
            Quests
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Suas missões em andamento — {quests.filter((q) => q.status === 'active').length} ativas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="size-4" />
            <span className="hidden sm:inline">Filtros</span>
          </Button>
          <Button size="sm">
            <Plus className="size-4" />
            <span className="hidden sm:inline">Nova quest</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-bg-elevated rounded-lg border border-border mb-6 w-fit">
        {(
          [
            ['active', 'Ativas'],
            ['completed', 'Completas'],
            ['failed', 'Falhas'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              'h-8 px-4 rounded-md text-sm font-medium transition-all',
              tab === key
                ? 'bg-primary text-primary-foreground shadow-premium-sm'
                : 'text-text-muted hover:text-text-primary',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Quest list */}
      {filtered.length === 0 ? (
        <Card>
          <CardBody className="text-center py-16">
            <Sparkles className="size-10 text-text-subtle mx-auto mb-3" />
            <p className="text-text-muted">Nenhuma quest aqui ainda.</p>
            {tab === 'active' && (
              <Button className="mt-4">
                <Plus className="size-4" />
                Criar primeira quest
              </Button>
            )}
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => (
            <Card key={q.id} interactive>
              <CardBody className="flex items-center gap-4">
                <button
                  onClick={() => q.status === 'active' && handleComplete(q)}
                  disabled={q.status !== 'active'}
                  className={cn(
                    'size-10 rounded-lg shrink-0 flex items-center justify-center text-xl transition-colors',
                    q.status === 'completed'
                      ? 'bg-success/15 text-success'
                      : 'bg-bg hover:bg-primary/10 hover:text-primary',
                    'border border-border',
                  )}
                >
                  {q.status === 'completed' ? (
                    <CheckCircle2 className="size-5" />
                  ) : (
                    categoryEmoji[q.category]
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={cn(
                        'inline-flex items-center h-5 px-2 rounded-full text-[10px] font-semibold uppercase tracking-wider border',
                        typeColor[q.type],
                      )}
                    >
                      {q.type}
                    </span>
                    {q.dungeonId && (
                      <Badge variant="subtle" className="h-5 text-[10px]">
                        🏰 Dungeon
                      </Badge>
                    )}
                  </div>
                  <p
                    className={cn(
                      'font-medium text-sm',
                      q.status === 'completed' && 'line-through text-text-muted',
                    )}
                  >
                    {q.title}
                  </p>
                  {q.description && (
                    <p className="text-xs text-text-muted mt-0.5 truncate">
                      {q.description}
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-xs text-text-muted justify-end">
                    <Clock className="size-3" />
                    <span>{q.estimatedMinutes}m</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-mono font-semibold text-primary mt-0.5">
                    <Zap className="size-3.5" />+{q.rewards.xp}
                  </div>
                </div>

                {q.status === 'active' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => failQuest(q.id)}
                    className="hidden sm:inline-flex text-text-muted hover:text-danger"
                  >
                    Falhar
                  </Button>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
