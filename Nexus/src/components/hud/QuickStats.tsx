import { useMemo } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { useCharacterStore } from '@/stores/characterStore';
import { useQuestStore } from '@/stores/questStore';
import { Coins, Sparkles, Hammer, type LucideIcon } from 'lucide-react';

interface StatCellProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  hint?: string;
}

const StatCell = ({ label, value, icon: Icon, color, hint }: StatCellProps) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-bg/40 border border-border-subtle">
    <div
      className="size-10 rounded-lg flex items-center justify-center shrink-0"
      style={{ background: `${color}20`, color }}
    >
      <Icon className="size-5" />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-text-muted">{label}</p>
      <p className="text-lg font-mono font-bold text-text-primary leading-tight">
        {value}
      </p>
      {hint && <p className="text-[10px] text-text-subtle">{hint}</p>}
    </div>
  </div>
);

const isToday = (iso?: string) => {
  if (!iso) return false;
  const d = new Date(iso);
  const t = new Date();
  return d.toDateString() === t.toDateString();
};

/**
 * Cards rápidos com moedas e materiais — no HUD.
 */
export const QuickStats = () => {
  const c = useCharacterStore((s) => s.character);
  const quests = useQuestStore((s) => s.quests);

  const completedToday = useMemo(
    () =>
      quests.filter(
        (q) => q.status === 'completed' && isToday(q.completedAt),
      ).length,
    [quests],
  );

  const totalMaterials = Object.values(c.currencies.craftingMaterials).reduce(
    (a, b) => a + b,
    0,
  );

  return (
    <Card>
      <CardBody>
        <h3 className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold mb-4">
          Recursos
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <StatCell
            label="Gold"
            value={c.currencies.gold.toLocaleString('pt-BR')}
            icon={Coins}
            color="var(--rank-a)"
          />
          <StatCell
            label="Essence"
            value={c.currencies.essence}
            icon={Sparkles}
            color="var(--rank-b)"
          />
          <StatCell
            label="Materials"
            value={totalMaterials}
            icon={Hammer}
            color="var(--rank-c)"
            hint="craftáveis"
          />
          <StatCell
            label="Hoje"
            value={`${completedToday}`}
            icon={Sparkles}
            color="var(--success)"
            hint="quests completas"
          />
        </div>
      </CardBody>
    </Card>
  );
};
