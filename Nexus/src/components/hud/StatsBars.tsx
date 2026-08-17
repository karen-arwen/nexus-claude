import { Card, CardBody } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useCharacterStore } from '@/stores/characterStore';
import { Battery, Brain, Heart, AlertTriangle } from 'lucide-react';

/**
 * Barras de estado do Hunter — energia, foco, vontade, exhaustion.
 * Esses valores são alimentados pelo check-in diário (Sprint 2/7).
 */
export const StatsBars = () => {
  const stats = useCharacterStore((s) => s.character.stats);

  const items = [
    {
      key: 'energy',
      label: 'Energia',
      value: stats.energy,
      icon: Battery,
      color: 'success' as const,
    },
    {
      key: 'focus',
      label: 'Foco',
      value: stats.focus,
      icon: Brain,
      color: 'primary' as const,
    },
    {
      key: 'will',
      label: 'Vontade',
      value: stats.will,
      icon: Heart,
      color: 'gradient' as const,
    },
    {
      key: 'exhaustion',
      label: 'Cansaço',
      value: stats.exhaustion,
      icon: AlertTriangle,
      color: 'warning' as const,
    },
  ];

  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold">
            Estado Atual
          </h3>
          <button className="text-xs text-primary hover:underline">
            Check-in
          </button>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
          {items.map(({ key, label, value, icon: Icon, color }) => (
            <div key={key}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Icon className="size-3.5 text-text-muted" />
                <span className="text-xs font-medium text-text-secondary">
                  {label}
                </span>
                <span className="ml-auto text-xs font-mono font-semibold text-text-primary">
                  {value}
                </span>
              </div>
              <ProgressBar value={value} size="sm" variant={color} />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
