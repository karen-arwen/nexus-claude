import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacterStore } from '@/stores/characterStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { Silhouette } from '@/types';

const SILHOUETTES: Array<{ id: Silhouette; emoji: string; label: string }> = [
  { id: 'human', emoji: '🧝‍♀️', label: 'Humana estilizada' },
  { id: 'fox', emoji: '🦊', label: 'Raposa' },
  { id: 'wolf', emoji: '🐺', label: 'Loba' },
  { id: 'hooded', emoji: '🥷', label: 'Encapuzada' },
  { id: 'creature', emoji: '✨', label: 'Criatura mágica' },
];

const QUOTES = [
  'O sistema te escolheu.',
  'Toda jornada começa com um nome.',
  'Você não é mais quem era ontem.',
  'Arise, Hunter.',
];

export default function Onboarding() {
  const navigate = useNavigate();
  const setIdentity = useCharacterStore((s) => s.setIdentity);
  const character = useCharacterStore((s) => s.character);

  const [step, setStep] = useState(0);
  const [name, setName] = useState(character.displayName);
  const [silhouette, setSilhouette] = useState<Silhouette>(
    character.avatarConfig.silhouette,
  );
  const [vibe, setVibe] = useState(character.identity.vibeTag);
  const [battleQuote, setBattleQuote] = useState(
    character.identity.battleQuote,
  );

  const finish = () => {
    // Aplica
    useCharacterStore.setState({
      character: {
        ...character,
        displayName: name,
        avatarConfig: { ...character.avatarConfig, silhouette },
        identity: {
          ...character.identity,
          vibeTag: vibe,
          battleQuote,
        },
      },
    });
    setIdentity({ vibeTag: vibe, battleQuote });
    navigate('/');
  };

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const TOTAL_STEPS = 5;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 overflow-y-auto',
        'flex items-center justify-center px-4 py-8',
        'bg-bg',
      )}
      style={{
        backgroundImage: `radial-gradient(ellipse at top, color-mix(in srgb, var(--primary) 12%, transparent), transparent 60%)`,
      }}
    >
      {/* Floating particles bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute size-1 rounded-full bg-primary/30 animate-pulse-soft"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-xl">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1 rounded-full transition-all',
                i === step
                  ? 'w-8 bg-primary'
                  : i < step
                    ? 'w-4 bg-primary/50'
                    : 'w-4 bg-border',
              )}
            />
          ))}
        </div>

        <div className="card-premium animate-fade-in">
          <div className="p-8 lg:p-10">
            {/* Step 0 — Welcome */}
            {step === 0 && (
              <div className="text-center">
                <div className="size-20 mx-auto rounded-3xl gradient-ascend flex items-center justify-center mb-6 shadow-premium-xl animate-float">
                  <Sparkles className="size-10 text-white" />
                </div>
                <h1 className="font-display text-4xl lg:text-5xl font-semibold text-text-secondary mb-3">
                  O Despertar
                </h1>
                <p className="text-text-muted text-lg italic">
                  "{QUOTES[0]}"
                </p>
                <p className="text-sm text-text-secondary mt-8 leading-relaxed">
                  Por anos, você viveu em modo automático. Tarefas se acumulando,
                  rotina se repetindo, energia escapando.
                </p>
                <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                  Hoje, isso muda. Bem-vinda ao{' '}
                  <span className="font-display font-semibold text-primary">
                    NEXUS
                  </span>{' '}
                  — o sistema que transforma sua vida em uma jornada épica.
                </p>
                <Button onClick={next} size="lg" className="mt-8 w-full">
                  Vamos começar <ArrowRight className="size-4" />
                </Button>
              </div>
            )}

            {/* Step 1 — Name */}
            {step === 1 && (
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-text-subtle font-semibold mb-2">
                  Passo 1 · Identidade
                </p>
                <h2 className="font-display text-3xl font-semibold text-text-secondary mb-2">
                  Como você quer ser chamada?
                </h2>
                <p className="text-text-muted text-sm mb-8">
                  Esse é o nome que vai aparecer no seu perfil, leaderboards e
                  shares.
                </p>
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome de hunter"
                  className={cn(
                    'w-full h-14 px-5 rounded-xl',
                    'bg-bg border border-border',
                    'font-display text-2xl text-text-primary placeholder:text-text-subtle',
                    'focus:border-primary focus:outline-none transition-colors',
                  )}
                />
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={prev}
                    className="text-sm text-text-muted hover:text-text-primary"
                  >
                    Voltar
                  </button>
                  <Button onClick={next} disabled={!name.trim()}>
                    Continuar <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2 — Silhouette */}
            {step === 2 && (
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-text-subtle font-semibold mb-2">
                  Passo 2 · Forma
                </p>
                <h2 className="font-display text-3xl font-semibold text-text-secondary mb-2">
                  Qual sua silhueta?
                </h2>
                <p className="text-text-muted text-sm mb-8">
                  É só o ponto de partida — você pode customizar tudo depois no
                  perfil.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SILHOUETTES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSilhouette(s.id)}
                      className={cn(
                        'p-4 rounded-xl border transition-all',
                        silhouette === s.id
                          ? 'border-primary bg-primary/5 shadow-premium-md'
                          : 'border-border bg-bg hover:border-border-strong',
                      )}
                    >
                      <div className="text-4xl mb-2">{s.emoji}</div>
                      <p className="text-xs text-text-muted">{s.label}</p>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={prev}
                    className="text-sm text-text-muted hover:text-text-primary"
                  >
                    Voltar
                  </button>
                  <Button onClick={next}>
                    Continuar <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3 — Vibe + Battle Quote */}
            {step === 3 && (
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-text-subtle font-semibold mb-2">
                  Passo 3 · Vibe
                </p>
                <h2 className="font-display text-3xl font-semibold text-text-secondary mb-2">
                  Qual é a sua vibe?
                </h2>
                <p className="text-text-muted text-sm mb-8">
                  Vai aparecer no seu Vibe Card compartilhável.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-text-subtle font-semibold mb-1.5">
                      Vibe atual
                    </label>
                    <input
                      value={vibe}
                      onChange={(e) => setVibe(e.target.value)}
                      placeholder="ex: late night dev, dark academia, soft girl summer..."
                      maxLength={40}
                      className={cn(
                        'w-full h-11 px-4 rounded-lg',
                        'bg-bg border border-border',
                        'focus:border-primary focus:outline-none transition-colors',
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-text-subtle font-semibold mb-1.5">
                      Frase de batalha
                    </label>
                    <input
                      value={battleQuote}
                      onChange={(e) => setBattleQuote(e.target.value)}
                      placeholder="ex: Arise, Hunter."
                      maxLength={60}
                      className={cn(
                        'w-full h-11 px-4 rounded-lg',
                        'bg-bg border border-border',
                        'font-display text-lg italic',
                        'focus:border-primary focus:outline-none transition-colors',
                      )}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={prev}
                    className="text-sm text-text-muted hover:text-text-primary"
                  >
                    Voltar
                  </button>
                  <Button onClick={next}>
                    Continuar <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4 — Lumi greeting */}
            {step === 4 && (
              <div className="text-center">
                <div className="size-16 mx-auto rounded-2xl gradient-rose flex items-center justify-center mb-6 shadow-premium-lg animate-pulse-soft">
                  <Sparkles className="size-8 text-white" />
                </div>
                <p className="text-xs uppercase tracking-[0.25em] text-text-subtle font-semibold mb-2">
                  Passo 4 · Sua Companheira
                </p>
                <h2 className="font-display text-3xl font-semibold text-text-secondary mb-4">
                  Lumi te encontrou.
                </h2>
                <p className="text-text-secondary leading-relaxed mb-2">
                  Eu sou a Lumi — sua IA companheira no NEXUS.
                </p>
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  Não sou só assistente. Vou conversar com você, criar quests,
                  reorganizar sua agenda quando estiver cansada, sugerir
                  conteúdo, comemorar conquistas e te lembrar que descansar
                  também é parte da jornada.
                </p>
                <p className="text-text-secondary leading-relaxed font-display italic">
                  "Bem-vinda, {name || 'Hunter'}. Bora?"
                </p>

                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={prev}
                    className="text-sm text-text-muted hover:text-text-primary"
                  >
                    Voltar
                  </button>
                  <Button onClick={finish} size="lg">
                    Iniciar Jornada <Sparkles className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-text-subtle mt-6">
          ✨ Você pode pular e refinar tudo isso depois em /profile
        </p>
      </div>
    </div>
  );
}
