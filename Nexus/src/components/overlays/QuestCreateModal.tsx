import { useEffect, useState } from 'react';
import { useUIStore } from '@/stores/uiStore';
import { useQuestStore } from '@/stores/questStore';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import type { QuestCategory, QuestType } from '@/types';

const CATEGORIES: Array<{ id: QuestCategory; label: string; emoji: string }> = [
  { id: 'study', label: 'Estudo', emoji: '📚' },
  { id: 'health', label: 'Saúde', emoji: '💪' },
  { id: 'project', label: 'Projeto', emoji: '⚙️' },
  { id: 'social', label: 'Social', emoji: '💬' },
  { id: 'creative', label: 'Criativo', emoji: '🎨' },
  { id: 'life', label: 'Vida', emoji: '🌿' },
  { id: 'mind', label: 'Mental', emoji: '🧠' },
];

const TYPES: Array<{ id: QuestType; label: string; xp: [number, number] }> = [
  { id: 'Light', label: 'Light', xp: [50, 100] },
  { id: 'Essential', label: 'Essential', xp: [100, 300] },
  { id: 'Challenge', label: 'Challenge', xp: [200, 500] },
  { id: 'Ritual', label: 'Ritual', xp: [80, 150] },
  { id: 'Recovery', label: 'Recovery', xp: [40, 80] },
];

const calcXp = (type: QuestType, difficulty: number, minutes: number) => {
  const base = TYPES.find((t) => t.id === type)?.xp[0] ?? 100;
  return Math.round(base + difficulty * 20 + Math.min(minutes / 5, 20));
};

export const QuestCreateModal = () => {
  const open = useUIStore((s) => s.questCreateOpen);
  const close = useUIStore((s) => s.closeQuestCreate);
  const add = useQuestStore((s) => s.add);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<QuestCategory>('study');
  const [type, setType] = useState<QuestType>('Essential');
  const [difficulty, setDifficulty] = useState(5);
  const [minutes, setMinutes] = useState(30);

  // Reset on open
  useEffect(() => {
    if (open) {
      setTitle('');
      setDescription('');
      setCategory('study');
      setType('Essential');
      setDifficulty(5);
      setMinutes(30);
    }
  }, [open]);

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

  const xpReward = calcXp(type, difficulty, minutes);
  const goldReward = Math.round(xpReward * 0.12);
  const essenceReward = Math.max(1, Math.floor(xpReward / 80));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Dá um título pra essa missão 🌹');
      return;
    }

    add({
      title: title.trim(),
      description: description.trim() || undefined,
      type,
      category,
      difficulty,
      estimatedMinutes: minutes,
      schedule: {
        dueDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      },
      rewards: {
        xp: xpReward,
        gold: goldReward,
        essence: essenceReward,
        ...(type === 'Challenge'
          ? { materialDrop: { type: 'rareFragment', chance: 0.4 } }
          : {}),
      },
      origin: 'manual',
    });

    toast.success('Quest criada!', {
      description: `"${title}" — ${xpReward} XP esperando você ⚔️`,
    });
    close();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[95] bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={close}
      />

      <form
        onSubmit={handleSubmit}
        className={cn(
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[96]',
          'w-[min(560px,calc(100vw-2rem))]',
          'bg-bg-elevated border border-border rounded-2xl shadow-premium-2xl',
          'overflow-hidden animate-slide-up',
        )}
      >
        {/* Header */}
        <header className="flex items-center justify-between h-14 px-5 border-b border-border-subtle">
          <h2 className="font-display text-lg font-semibold text-text-secondary">
            Nova Quest ⚔️
          </h2>
          <button
            type="button"
            onClick={close}
            className="size-8 rounded-md flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg/40"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-text-subtle font-semibold mb-1.5">
              Título
            </label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Estudar AWS Lambda — capítulo 4"
              className={cn(
                'w-full h-11 px-4 rounded-lg',
                'bg-bg border border-border',
                'text-text-primary placeholder:text-text-subtle',
                'focus:border-primary focus:outline-none transition-colors',
              )}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-text-subtle font-semibold mb-1.5">
              Descrição{' '}
              <span className="text-text-subtle normal-case font-normal">
                (opcional)
              </span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mais contexto, sub-tarefas, links..."
              rows={2}
              className={cn(
                'w-full px-4 py-3 rounded-lg resize-none',
                'bg-bg border border-border',
                'text-sm text-text-primary placeholder:text-text-subtle',
                'focus:border-primary focus:outline-none transition-colors',
              )}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-text-subtle font-semibold mb-2">
              Categoria
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    'flex items-center gap-1.5 h-9 px-3 rounded-lg text-sm',
                    'border transition-colors',
                    category === c.id
                      ? 'bg-primary/10 text-primary border-primary/30'
                      : 'bg-bg border-border text-text-muted hover:border-border-strong',
                  )}
                >
                  <span>{c.emoji}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-text-subtle font-semibold mb-2">
              Tipo
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={cn(
                    'h-10 rounded-lg text-xs font-medium',
                    'border transition-colors',
                    type === t.id
                      ? 'bg-primary/10 text-primary border-primary/30'
                      : 'bg-bg border-border text-text-muted hover:border-border-strong',
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty + Minutes (sliders) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label className="text-xs uppercase tracking-[0.15em] text-text-subtle font-semibold">
                  Dificuldade
                </label>
                <span className="font-mono text-sm font-bold text-primary">
                  {difficulty}/10
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label className="text-xs uppercase tracking-[0.15em] text-text-subtle font-semibold">
                  Duração
                </label>
                <span className="font-mono text-sm font-bold text-primary">
                  {minutes}min
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={180}
                step={5}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          {/* Rewards preview */}
          <div className="rounded-xl bg-bg/40 border border-border-subtle p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-text-subtle font-semibold mb-3">
              Recompensa estimada
            </p>
            <div className="flex items-center gap-4 text-sm font-mono">
              <span className="flex items-center gap-1 text-primary font-bold">
                ⚡ +{xpReward} XP
              </span>
              <span className="flex items-center gap-1 text-text-secondary">
                🪙 {goldReward}
              </span>
              <span className="flex items-center gap-1 text-text-secondary">
                ✨ {essenceReward}
              </span>
              {type === 'Challenge' && (
                <span className="flex items-center gap-1 text-rank-c text-xs">
                  💎 chance de Rare Fragment
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-end gap-2 px-5 py-3 border-t border-border-subtle bg-bg/40">
          <Button type="button" variant="ghost" size="sm" onClick={close}>
            Cancelar
          </Button>
          <Button type="submit" size="sm">
            Criar Quest
          </Button>
        </footer>
      </form>
    </>
  );
};
