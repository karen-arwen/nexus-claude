import { useMemo } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { TrendingUp } from 'lucide-react';

/**
 * Bar chart de XP nos últimos 7 dias.
 * Mock data por enquanto — Sprint 8 ligará nos dados reais.
 */
export const WeeklyChart = () => {
  const data = useMemo(() => {
    // Últimos 7 dias com XP mock
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const today = new Date().getDay(); // 0 = dom, 6 = sáb
    return days.map((label, i) => ({
      label,
      xp: 200 + Math.round(Math.random() * 600),
      isToday: ((today + 6 - i) % 7) === 6,
    })).slice(0, 7);
  }, []);

  const max = Math.max(...data.map((d) => d.xp));
  const total = data.reduce((sum, d) => sum + d.xp, 0);
  const avg = Math.round(total / data.length);

  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold">
              XP — Esta semana
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-mono text-2xl font-bold text-text-primary">
                {total.toLocaleString('pt-BR')}
              </span>
              <span className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="size-3" />
                +{Math.round(((total - avg * 7) / (avg * 7)) * 100 + 12)}% vs.
                semana passada
              </span>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              média: {avg} XP/dia
            </p>
          </div>
        </div>

        {/* Bars */}
        <div className="flex items-end gap-2 h-32 pt-4">
          {data.map((d, i) => {
            const h = Math.max(4, (d.xp / max) * 100);
            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-1.5"
              >
                <div className="relative w-full flex-1 flex items-end">
                  <div
                    className="w-full rounded-t-md transition-all"
                    style={{
                      height: `${h}%`,
                      background: d.isToday
                        ? 'var(--gradient-rose)'
                        : 'color-mix(in srgb, var(--primary) 50%, transparent)',
                      boxShadow: d.isToday
                        ? '0 0 12px color-mix(in srgb, var(--primary) 40%, transparent)'
                        : 'none',
                    }}
                  />
                  {d.isToday && (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-semibold text-primary">
                      {d.xp}
                    </span>
                  )}
                </div>
                <span
                  className={
                    'text-[10px] uppercase tracking-wider ' +
                    (d.isToday
                      ? 'text-primary font-semibold'
                      : 'text-text-muted')
                  }
                >
                  {d.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};
