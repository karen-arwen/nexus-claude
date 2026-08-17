import { useEffect, useRef, useState } from 'react';
import { useLumiStore } from '@/stores/lumiStore';
import { useUIStore } from '@/stores/uiStore';
import { Card, CardBody } from '@/components/ui/Card';
import { cn } from '@/lib/cn';
import {
  Send,
  Sparkles,
  Plus,
  Timer,
  Calendar,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import type { LumiPersonality } from '@/types';

const PERSONALITIES: Array<{
  id: LumiPersonality;
  emoji: string;
  label: string;
  vibe: string;
}> = [
  { id: 'default', emoji: '✨', label: 'Default', vibe: 'tech profissional' },
  { id: 'cheerleader', emoji: '💜', label: 'Cheerleader', vibe: 'energética' },
  { id: 'sensei', emoji: '🍵', label: 'Sensei', vibe: 'sábia, filosófica' },
  { id: 'gamer', emoji: '🎮', label: 'Gamer', vibe: 'casual, gírias' },
  { id: 'dark_mentor', emoji: '👤', label: 'Dark Mentor', vibe: 'desafiadora' },
  { id: 'cosmic', emoji: '🌌', label: 'Cosmic', vibe: 'místico, poético' },
];

export default function Lumi() {
  const { messages, personality, send, setPersonality, clear } = useLumiStore();
  const openQuestCreate = useUIStore((s) => s.openQuestCreate);
  const openFocus = useUIStore((s) => s.openFocus);

  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    send(text.trim());
    setInput('');
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-4rem)] flex flex-col px-4 lg:px-8">
      {/* Header */}
      <header className="py-4 lg:py-6 flex items-end justify-between border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-2xl gradient-rose flex items-center justify-center shadow-premium-md">
            <Sparkles className="size-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-semibold text-text-secondary leading-none">
              Lumi
            </h1>
            <p className="text-xs text-text-muted mt-1">
              {PERSONALITIES.find((p) => p.id === personality)?.vibe}
            </p>
          </div>
        </div>
        <button
          onClick={clear}
          className="text-xs text-text-muted hover:text-danger flex items-center gap-1"
        >
          <Trash2 className="size-3" />
          Limpar
        </button>
      </header>

      {/* Personality switcher */}
      <div className="flex gap-1.5 overflow-x-auto py-3 -mx-4 lg:-mx-8 px-4 lg:px-8 border-b border-border-subtle">
        {PERSONALITIES.map((p) => (
          <button
            key={p.id}
            onClick={() => setPersonality(p.id)}
            className={cn(
              'flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium shrink-0',
              'border transition-colors',
              personality === p.id
                ? 'bg-primary/10 text-primary border-primary/30'
                : 'bg-bg-elevated border-border text-text-muted hover:border-border-strong',
            )}
          >
            <span>{p.emoji}</span>
            {p.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-6 space-y-4"
      >
        {messages.map((m) => {
          if (m.role === 'system') {
            return (
              <div key={m.id} className="flex justify-center">
                <span className="text-[10px] uppercase tracking-wider text-text-subtle font-mono px-3 py-1 rounded-full bg-bg-elevated border border-border-subtle">
                  · {m.text} ·
                </span>
              </div>
            );
          }

          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={cn('flex gap-3', isUser && 'flex-row-reverse')}
            >
              {!isUser && (
                <div className="size-8 rounded-lg gradient-rose flex items-center justify-center shrink-0 shadow-premium-sm">
                  <Sparkles className="size-4 text-white" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-[75%] px-4 py-2.5 rounded-2xl text-sm',
                  isUser
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : 'bg-bg-elevated border border-border text-text-primary rounded-tl-sm',
                )}
              >
                {m.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-1.5 py-3 border-t border-border-subtle">
        <QuickAction
          icon={Plus}
          label="Criar quest"
          onClick={openQuestCreate}
        />
        <QuickAction
          icon={Timer}
          label="Iniciar foco 25min"
          onClick={openFocus}
        />
        <QuickAction
          icon={Calendar}
          label="O que tem hoje?"
          onClick={() => handleSend('O que tem na minha agenda hoje?')}
        />
        <QuickAction
          icon={RefreshCw}
          label="Reorganizar dia"
          onClick={() =>
            handleSend('Reorganiza meu dia baseado na minha energia atual')
          }
        />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="flex items-center gap-2 py-4 border-t border-border-subtle"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Conta pra Lumi..."
          className={cn(
            'flex-1 h-12 px-4 rounded-xl',
            'bg-bg-elevated border border-border',
            'text-text-primary placeholder:text-text-subtle',
            'focus:border-primary focus:outline-none transition-colors',
          )}
        />
        <button
          type="submit"
          disabled={!input.trim()}
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

      <Card variant="glass" className="mb-4 -mt-2">
        <CardBody className="py-2.5 text-center">
          <p className="text-[11px] text-text-muted">
            ✨ Respostas mock por enquanto. Sprint 7 conecta na Claude API real.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

const QuickAction = ({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Plus;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium bg-bg-elevated border border-border text-text-muted hover:text-text-primary hover:border-border-strong transition-colors"
  >
    <Icon className="size-3" />
    {label}
  </button>
);
