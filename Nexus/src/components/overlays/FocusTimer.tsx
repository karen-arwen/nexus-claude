import { useEffect, useState } from 'react';
import { useUIStore } from '@/stores/uiStore';
import { useFocusStore, type FocusPreset } from '@/stores/focusStore';
import { cn } from '@/lib/cn';
import {
  Play,
  Pause,
  Square,
  X,
  Timer,
  Brain,
  Coffee,
  CloudRain,
  Music,
  VolumeX,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { toast } from 'sonner';

const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const PRESETS: Array<{ id: FocusPreset; label: string; minutes: number }> = [
  { id: 'short', label: 'Quick', minutes: 10 },
  { id: 'pomodoro', label: 'Pomodoro', minutes: 25 },
  { id: 'deep', label: 'Deep', minutes: 90 },
];

const AMBIENTS = [
  { id: 'silence', label: 'Silêncio', icon: VolumeX },
  { id: 'lofi', label: 'Lo-fi', icon: Music },
  { id: 'rain', label: 'Chuva', icon: CloudRain },
  { id: 'cafe', label: 'Café', icon: Coffee },
] as const;

/**
 * Floating Focus Timer — visível em qualquer rota.
 * Quando minimizado, vira pílula. Persiste através de navegação.
 */
export const FocusTimer = () => {
  const open = useUIStore((s) => s.focusOpen);
  const close = useUIStore((s) => s.closeFocus);
  const {
    state,
    preset,
    totalSeconds,
    remaining,
    completedToday,
    ambient,
    start,
    pause,
    resume,
    stop,
    tick,
    setAmbient,
  } = useFocusStore();

  const [minimized, setMinimized] = useState(false);

  // Tick a cada segundo
  useEffect(() => {
    if (state !== 'running') return;
    const id = setInterval(() => tick(), 1000);
    return () => clearInterval(id);
  }, [state, tick]);

  // Toast quando completa
  useEffect(() => {
    if (state === 'idle' && remaining === totalSeconds && completedToday > 0) {
      // Completou 1 sessão (vou usar ref se virar problema)
    }
  }, [state, remaining, totalSeconds, completedToday]);

  const handleStart = (p: FocusPreset) => {
    start(p);
    toast.success('Foco iniciado', {
      description: `${PRESETS.find((x) => x.id === p)?.minutes ?? 25} min em modo deep work`,
      icon: '🧠',
    });
  };

  const handleStop = () => {
    stop();
    toast.info('Sessão cancelada');
  };

  if (!open) return null;

  const progress = 1 - remaining / totalSeconds;
  const circumference = 2 * Math.PI * 45;

  // Minimized pill
  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className={cn(
          'fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-[80]',
          'flex items-center gap-2 h-12 px-4 rounded-full',
          'bg-bg-elevated border border-border shadow-premium-lg',
          'hover:shadow-premium-xl transition-all',
          state === 'running' && 'border-primary',
        )}
      >
        <div className="size-7 rounded-full gradient-rose flex items-center justify-center">
          <Brain className="size-3.5 text-white" />
        </div>
        <span className="font-mono font-semibold text-sm tabular-nums">
          {formatTime(remaining)}
        </span>
        <Maximize2 className="size-4 text-text-muted" />
      </button>
    );
  }

  return (
    <div
      className={cn(
        'fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-[80]',
        'w-[320px] card-premium shadow-premium-2xl',
        'animate-slide-up',
      )}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="size-4 text-primary" />
            <span className="font-display text-sm font-semibold text-text-secondary">
              Focus Mode
            </span>
            {completedToday > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-success/15 text-success text-[10px] font-semibold">
                {completedToday} hoje
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMinimized(true)}
              className="size-7 rounded-md flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg/40"
              aria-label="Minimizar"
            >
              <Minimize2 className="size-3.5" />
            </button>
            <button
              onClick={() => {
                stop();
                close();
              }}
              className="size-7 rounded-md flex items-center justify-center text-text-muted hover:text-danger hover:bg-bg/40"
              aria-label="Fechar"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Circular progress */}
        <div className="relative w-44 h-44 mx-auto mb-5">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {/* Track */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth="6"
            />
            {/* Progress */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#focus-gradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
            <defs>
              <linearGradient id="focus-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-mono text-3xl font-bold text-text-primary tabular-nums">
              {formatTime(remaining)}
            </p>
            <p className="text-xs text-text-muted uppercase tracking-wider mt-1">
              {state === 'running'
                ? 'em foco'
                : state === 'paused'
                  ? 'pausado'
                  : 'pronto'}
            </p>
          </div>
        </div>

        {/* Presets */}
        {state === 'idle' && (
          <div className="grid grid-cols-3 gap-1.5 mb-4">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleStart(p.id)}
                className={cn(
                  'flex flex-col items-center justify-center h-14 rounded-lg',
                  'border transition-colors',
                  preset === p.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-bg/40 hover:border-border-strong',
                )}
              >
                <span className="text-xs font-semibold">{p.label}</span>
                <span className="text-[10px] text-text-muted">
                  {p.minutes}min
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-2">
          {state === 'idle' ? (
            <button
              onClick={() => handleStart(preset)}
              className="flex-1 h-11 rounded-lg gradient-rose text-white font-semibold flex items-center justify-center gap-2 shadow-premium-md"
            >
              <Play className="size-4" />
              Iniciar
            </button>
          ) : state === 'running' ? (
            <>
              <button
                onClick={pause}
                className="flex-1 h-11 rounded-lg bg-bg-elevated border border-border hover:border-border-strong flex items-center justify-center gap-2"
              >
                <Pause className="size-4" />
                Pausar
              </button>
              <button
                onClick={handleStop}
                className="size-11 rounded-lg bg-bg-elevated border border-border hover:border-danger hover:text-danger flex items-center justify-center"
                aria-label="Parar"
              >
                <Square className="size-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={resume}
                className="flex-1 h-11 rounded-lg gradient-rose text-white font-semibold flex items-center justify-center gap-2"
              >
                <Play className="size-4" />
                Continuar
              </button>
              <button
                onClick={handleStop}
                className="size-11 rounded-lg bg-bg-elevated border border-border hover:border-danger hover:text-danger flex items-center justify-center"
              >
                <Square className="size-4" />
              </button>
            </>
          )}
        </div>

        {/* Ambient (only show when not running, to avoid distraction) */}
        {state === 'idle' && (
          <div className="mt-4 pt-4 border-t border-border-subtle">
            <p className="text-[10px] uppercase tracking-[0.2em] text-text-subtle font-semibold mb-2">
              Som ambiente
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {AMBIENTS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setAmbient(id)}
                  className={cn(
                    'flex flex-col items-center justify-center h-12 rounded-md',
                    'border transition-colors',
                    ambient === id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-bg/40 hover:border-border-strong text-text-muted',
                  )}
                  title={label}
                >
                  <Icon className="size-3.5" />
                  <span className="text-[9px] mt-0.5">{label}</span>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-text-subtle mt-2 italic">
              ✨ Sons reais entram no Sprint 8 (integração de assets)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/** Pílula resumida pra exibir no TopBar quando timer está rodando mas widget escondido */
export const FocusBadge = () => {
  const { state, remaining } = useFocusStore();
  const openFocus = useUIStore((s) => s.openFocus);

  if (state === 'idle') return null;

  return (
    <button
      onClick={openFocus}
      className={cn(
        'flex items-center gap-1.5 h-9 px-3 rounded-lg',
        'bg-primary/10 text-primary border border-primary/20',
        'text-xs font-mono tabular-nums',
        state === 'running' && 'animate-pulse-soft',
      )}
    >
      <Timer className="size-3.5" />
      {formatTime(remaining)}
    </button>
  );
};
