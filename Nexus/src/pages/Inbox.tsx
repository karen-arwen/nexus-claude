import { useState } from 'react';
import { useInboxStore } from '@/stores/inboxStore';
import { useQuestStore } from '@/stores/questStore';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';
import { Inbox as InboxIcon, Sparkles, Trash2, Send, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useUIStore } from '@/stores/uiStore';

const formatRelative = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'agora';
  if (min < 60) return `${min}m atrás`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h atrás`;
  const d = Math.floor(h / 24);
  return `${d}d atrás`;
};

/**
 * Inbox — Captura rápida estilo GTD.
 * Você joga ideias aqui sem decidir nada. Depois triagem:
 *   • virar quest
 *   • descartar
 *   • adiar pra Lumi reorganizar
 */
export default function Inbox() {
  const items = useInboxStore((s) => s.items);
  const add = useInboxStore((s) => s.add);
  const remove = useInboxStore((s) => s.remove);
  const addQuest = useQuestStore((s) => s.add);
  const openQuestCreate = useUIStore((s) => s.openQuestCreate);

  const [text, setText] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    add(text.trim(), 'inbox');
    setText('');
    toast.success('Salvo na inbox', { icon: '📥' });
  };

  const triageQuick = (id: string, title: string) => {
    addQuest({
      title,
      type: 'Light',
      category: 'life',
      difficulty: 3,
      estimatedMinutes: 30,
      schedule: {
        dueDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      },
      rewards: { xp: 80, gold: 10, essence: 1 },
      origin: 'manual',
    });
    remove(id);
    toast.success('Virou quest!', { icon: '⚔️' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="size-12 rounded-2xl bg-bg-elevated border border-border flex items-center justify-center">
            <InboxIcon className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl lg:text-4xl font-semibold text-text-secondary">
              Inbox
            </h1>
            <p className="text-sm text-text-muted">
              Capture agora, decida depois
            </p>
          </div>
        </div>
      </header>

      {/* Quick capture */}
      <form onSubmit={handleAdd} className="mb-6 flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="O que tá na sua cabeça?"
          autoFocus
          className={cn(
            'flex-1 h-12 px-4 rounded-xl',
            'bg-bg-elevated border border-border',
            'placeholder:text-text-subtle',
            'focus:border-primary focus:outline-none transition-colors',
          )}
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className={cn(
            'size-12 rounded-xl gradient-rose text-white',
            'flex items-center justify-center shadow-premium-md',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            'active:scale-95 transition-transform',
          )}
        >
          <Send className="size-4" />
        </button>
      </form>

      {/* Why this exists */}
      {items.length === 0 && (
        <Card variant="glass">
          <CardBody className="text-center py-12">
            <InboxIcon className="size-10 text-text-subtle mx-auto mb-3" />
            <p className="font-display text-xl text-text-secondary mb-2">
              Caixa vazia
            </p>
            <p className="text-sm text-text-muted max-w-md mx-auto">
              Use a inbox quando uma ideia aparecer mas você não quer parar
              tudo pra virar quest. Joga aqui, segue o foco, decide depois.
            </p>
          </CardBody>
        </Card>
      )}

      {/* Items list */}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Card>
              <CardBody className="flex items-center gap-3 !py-3">
                <Sparkles className="size-4 text-text-muted shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary">{item.text}</p>
                  <p className="text-[10px] text-text-subtle font-mono mt-0.5">
                    {formatRelative(item.createdAt)}
                    {item.context && ` · ${item.context}`}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => triageQuick(item.id, item.text)}
                    className="h-8 px-3 rounded-md text-xs font-medium text-primary hover:bg-primary/10 flex items-center gap-1"
                  >
                    <Plus className="size-3" />
                    Quest
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="size-8 rounded-md flex items-center justify-center text-text-muted hover:text-danger hover:bg-bg/40"
                    aria-label="Descartar"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>

      {items.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline" size="sm" onClick={openQuestCreate}>
            <Plus className="size-4" />
            Criar quest detalhada
          </Button>
        </div>
      )}
    </div>
  );
}
