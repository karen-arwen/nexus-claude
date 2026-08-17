import { type LucideIcon, Construction } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface Props {
  title: string;
  emoji?: string;
  icon?: LucideIcon;
  sprint?: number;
  description?: string;
  preview?: string[];
}

/**
 * Tela placeholder usada enquanto a feature não está implementada.
 * Indica em qual sprint a tela vai sair, dá um preview do que vem.
 */
export const PagePlaceholder = ({
  title,
  emoji,
  icon: Icon = Construction,
  sprint,
  description,
  preview = [],
}: Props) => (
  <div className="max-w-3xl mx-auto px-4 lg:px-8 py-8 lg:py-12 animate-fade-in">
    <div className="text-center mb-8">
      <div className="size-16 mx-auto rounded-2xl gradient-rose flex items-center justify-center text-3xl mb-4 shadow-premium-lg">
        {emoji ? <span>{emoji}</span> : <Icon className="size-7 text-white" />}
      </div>
      <h1 className="font-display text-4xl font-semibold text-text-secondary mb-2">
        {title}
      </h1>
      {description && (
        <p className="text-text-muted max-w-xl mx-auto">{description}</p>
      )}
      {sprint !== undefined && (
        <Badge variant="primary" className="mt-4">
          Sprint {sprint}
        </Badge>
      )}
    </div>

    {preview.length > 0 && (
      <Card>
        <CardBody>
          <p className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold mb-4">
            O que vem aqui
          </p>
          <ul className="space-y-2.5">
            {preview.map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-text-primary"
              >
                <span className="mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    )}
  </div>
);
