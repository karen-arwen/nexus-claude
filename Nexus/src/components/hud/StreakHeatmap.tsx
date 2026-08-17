import { useMemo } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { useQuestStore } from '@/stores/questStore';
import { Flame, Share2 } from 'lucide-react';
import { useCharacterStore } from '@/stores/characterStore';

/**
 * Heatmap dos últimos 30 dias — visual estilo GitHub mas com tons da paleta.
 * Compartilhável como imagem (Sprint 3).
 */
export const StreakHeatmap = () => {
  const quests = useQuestStore((s) => s.quests);
  const streakCurrent = useCharacterStore((s) => s.character.streakCurrent);
  const streakBest = useCharacterStore((s) => s.character.streakBest);

  // Conta quests completas por dia nos últimos 30 dias
  const days = useMemo(() => {
    const arr: { date: Date; count: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      const count = quests.filter((q) => {
        if (q.status !== 'completed' || !q.completedAt) return false;
        const cd = new Date(q.completedAt);
        return cd >= d && cd < next;
      }).length;
      arr.push({ date: d, count });
    }
    // Mock: simular dias passados pra ter visual interessante
    return arr.map((d, i) => ({
      ...d,
      // Mock: ~80% dos dias passados têm 0-5 quests aleatórias
      count:
        i === arr.length - 1
          ? d.count
          : Math.random() < 0.85
            ? Math.floor(Math.random() * 6)
            : 0,
    }));
  }, [quests]);

  const intensity = (n: number): string => {
    if (n === 0) return 'var(--border-subtle)';
    if (n === 1) return 'color-mix(in srgb, var(--primary) 25%, transparent)';
    if (n === 2) return 'color-mix(in srgb, var(--primary) 50%, transparent)';
    if (n === 3) return 'color-mix(in srgb, var(--primary) 75%, transparent)';
    return 'var(--primary)';
  };

  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold">
              Streak — Últimos 30 dias
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-amber-warm">
                <Flame
                  className="size-4"
                  style={{ color: 'var(--amber-warm)' }}
                />
                <span className="font-mono font-bold text-text-primary">
                  {streakCurrent}
                </span>
                <span className="text-xs text-text-muted">dias atual</span>
              </span>
              <span className="text-text-subtle">·</span>
              <span className="text-xs text-text-muted">
                Recorde:{' '}
                <span className="font-mono font-bold text-text-primary">
                  {streakBest}
                </span>
              </span>
            </div>
          </div>
          <button
            className="size-8 rounded-md flex items-center justify-center text-text-muted hover:text-primary hover:bg-bg/40"
            aria-label="Compartilhar"
          >
            <Share2 className="size-4" />
          </button>
        </div>

        {/* Heatmap grid */}
        <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-1.5">
          {days.map((d, i) => (
            <div
              key={i}
              className="aspect-square rounded-[3px] transition-all hover:scale-110 hover:shadow-premium-sm"
              style={{ background: intensity(d.count) }}
              title={`${d.date.toLocaleDateString('pt-BR')} — ${d.count} quest${d.count !== 1 ? 's' : ''}`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-3 text-[10px] text-text-muted">
          <span>menos</span>
          {[0, 1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="size-2.5 rounded-[2px]"
              style={{ background: intensity(n) }}
            />
          ))}
          <span>mais</span>
        </div>
      </CardBody>
    </Card>
  );
};
