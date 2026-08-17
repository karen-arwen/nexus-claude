import { Card, CardBody } from '@/components/ui/Card';
import { Sparkles, Share2 } from 'lucide-react';
import { mockLumiQuote } from '@/lib/mock';
import { useCharacterStore } from '@/stores/characterStore';

/**
 * Quote do Dia da Lumi — gerada pela IA toda manhã (Sprint 7).
 * Por enquanto usa mock estático. Compartilhável como card.
 */
export const LumiQuote = () => {
  const name = useCharacterStore((s) => s.character.displayName);
  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <Card variant="glass" className="relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute -top-10 -right-10 size-32 rounded-full opacity-20 gradient-rose blur-3xl" />

      <CardBody>
        <div className="flex items-start gap-3">
          <div className="size-10 rounded-xl gradient-rose flex items-center justify-center shrink-0 shadow-premium-sm">
            <Sparkles className="size-5 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display text-sm font-semibold text-text-secondary">
                Lumi
              </span>
              <span className="text-[10px] uppercase tracking-wider text-text-subtle">
                · Quote do dia
              </span>
            </div>

            <p className="font-display text-lg lg:text-xl italic text-text-primary leading-snug">
              "{mockLumiQuote}"
            </p>

            <p className="text-xs text-text-muted mt-2">
              — Lumi, para {name} · {today}
            </p>
          </div>

          <button
            aria-label="Compartilhar quote"
            className="size-9 rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:bg-bg-elevated transition-colors shrink-0"
          >
            <Share2 className="size-4" />
          </button>
        </div>
      </CardBody>
    </Card>
  );
};
