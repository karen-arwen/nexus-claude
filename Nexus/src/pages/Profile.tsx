import { useState } from 'react';
import { useCharacterStore } from '@/stores/characterStore';
import { useQuestStore } from '@/stores/questStore';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, RankBadge, RarityBadge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { HunterIcon } from '@/components/profile/HunterIcon';
import { RANK_META } from '@/lib/xp';
import { cn } from '@/lib/cn';
import {
  Share2,
  Edit3,
  Trophy,
  Sparkles,
  Flame,
  Music,
  type LucideIcon,
} from 'lucide-react';
import type { Rarity, Silhouette, BackgroundStyle } from '@/types';
import { toast } from 'sonner';

type Tab = 'vibe' | 'stats' | 'achievements' | 'identity';

const TABS: Array<{ id: Tab; label: string; icon: LucideIcon }> = [
  { id: 'vibe', label: 'Vibe Card', icon: Sparkles },
  { id: 'stats', label: 'Stats', icon: Flame },
  { id: 'achievements', label: 'Conquistas', icon: Trophy },
  { id: 'identity', label: 'Identidade', icon: Edit3 },
];

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>('vibe');
  const character = useCharacterStore((s) => s.character);
  const meta = RANK_META[character.rank];

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
      {/* Header banner */}
      <div className="card-premium overflow-hidden mb-6">
        <div className="h-32 lg:h-44 gradient-ascend relative">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_30%_50%,white_0%,transparent_60%)]" />
        </div>
        <div className="px-5 lg:px-8 pb-6 -mt-16">
          <div className="flex items-end gap-4 lg:gap-6 flex-wrap">
            <HunterIcon size="2xl" animate />
            <div className="flex-1 pb-2 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="font-display text-3xl lg:text-4xl font-semibold text-text-secondary">
                  {character.displayName}
                </h1>
                <RankBadge rank={character.rank} size="md" glow />
              </div>
              <p className="text-sm text-text-muted">
                Lv.{character.level} · {meta.label} ·{' '}
                <span className="text-primary font-medium">
                  {character.identity.aestheticTag}
                </span>
              </p>
              <p className="font-display text-lg italic text-text-secondary mt-2">
                "{character.identity.battleQuote}"
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="size-4" />
                <span className="hidden sm:inline">Compartilhar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-bg-elevated rounded-lg border border-border mb-6 w-fit overflow-x-auto">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              'flex items-center gap-2 h-9 px-4 rounded-md text-sm font-medium whitespace-nowrap',
              tab === id
                ? 'bg-primary text-primary-foreground shadow-premium-sm'
                : 'text-text-muted hover:text-text-primary',
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === 'vibe' && <VibeCard />}
      {tab === 'stats' && <StatsTab />}
      {tab === 'achievements' && <AchievementsTab />}
      {tab === 'identity' && <IdentityTab />}
    </div>
  );
}

// ============================================================
// VIBE CARD
// ============================================================
const VibeCard = () => {
  const character = useCharacterStore((s) => s.character);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Vibe Card real */}
      <Card className="lg:col-span-2">
        <div className="p-6 lg:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold mb-4">
            Vibe Card · Compartilhável
          </p>
          <div
            className="rounded-2xl p-8 text-white relative overflow-hidden"
            style={{ background: 'var(--gradient-sunset)' }}
          >
            <div className="absolute -top-16 -right-16 size-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex items-start gap-5">
              <HunterIcon size="xl" />
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.2em] opacity-80 mb-1">
                  Hunter · Rank {character.rank}
                </p>
                <h3 className="font-display text-3xl font-semibold mb-1">
                  {character.displayName}
                </h3>
                <p className="text-sm opacity-90 italic mb-5">
                  "{character.identity.battleQuote}"
                </p>

                <div className="space-y-2 text-sm">
                  <Row icon="✨" label="vibe">
                    {character.identity.vibeTag}
                  </Row>
                  <Row icon="⚔️" label="missão">
                    {character.identity.currentMission}
                  </Row>
                  <Row icon="🔥" label="streak">
                    {character.streakCurrent} dias
                  </Row>
                  <Row icon="🎵" label="ouvindo">
                    Blue Flame — Enhypen
                  </Row>
                </div>

                <p className="text-[10px] uppercase tracking-[0.2em] opacity-70 mt-6 font-mono">
                  NEXUS · nexus.app/{character.displayName.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="size-4" />
              Stories (9:16)
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="size-4" />
              Feed (1:1)
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Music className="size-4" />
              Trocar música
            </Button>
          </div>
        </div>
      </Card>

      {/* Side: quick stats */}
      <div className="space-y-4">
        <Card>
          <CardBody>
            <p className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold mb-3">
              Quick Stats
            </p>
            <div className="space-y-3">
              <Stat label="XP Total" value={character.xpTotal.toLocaleString('pt-BR')} />
              <Stat label="Streak atual" value={`${character.streakCurrent}d`} />
              <Stat label="Streak melhor" value={`${character.streakBest}d`} />
              <Stat label="Skill Points" value={character.skillPoints} />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold mb-3">
              Títulos
            </p>
            <ul className="space-y-1.5">
              {character.ownedTitles.map((t, i) => (
                <li
                  key={i}
                  className="text-sm text-text-primary flex items-center gap-2"
                >
                  <span className="size-1.5 rounded-full bg-primary" /> {t}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

const Row = ({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-2">
    <span className="text-base">{icon}</span>
    <span className="text-xs uppercase tracking-wider opacity-70 w-16 shrink-0">
      {label}
    </span>
    <span className="font-medium truncate">{children}</span>
  </div>
);

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-text-muted">{label}</span>
    <span className="font-mono font-bold text-text-primary">{value}</span>
  </div>
);

// ============================================================
// STATS TAB
// ============================================================
const StatsTab = () => {
  const character = useCharacterStore((s) => s.character);
  const quests = useQuestStore((s) => s.quests);
  const completed = quests.filter((q) => q.status === 'completed').length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardBody>
          <p className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold mb-4">
            Evolução
          </p>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium">
                  Level {character.level} → {character.level + 1}
                </span>
                <span className="text-xs font-mono text-primary">
                  {character.xpCurrentLevel}/{character.xpToNextLevel}
                </span>
              </div>
              <ProgressBar
                value={character.xpCurrentLevel}
                max={character.xpToNextLevel}
                variant="gradient"
                size="md"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <BigStat label="Quests" value={completed} hint="completas total" />
              <BigStat
                label="XP Total"
                value={character.xpTotal.toLocaleString('pt-BR')}
              />
              <BigStat label="Streak" value={`${character.streakCurrent}d`} hint={`recorde ${character.streakBest}d`} />
              <BigStat label="Bosses" value={0} hint="derrotados" />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <p className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold mb-4">
            Roadmap de Rank
          </p>
          <ul className="space-y-2">
            {(Object.keys(RANK_META) as Array<keyof typeof RANK_META>).map(
              (r) => {
                const data = RANK_META[r];
                const isCurrent = r === character.rank;
                const isPast =
                  Object.keys(RANK_META).indexOf(r) <
                  Object.keys(RANK_META).indexOf(character.rank);
                return (
                  <li
                    key={r}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg',
                      isCurrent && 'bg-primary/10 border border-primary/20',
                      !isCurrent && 'border border-border-subtle',
                    )}
                  >
                    <RankBadge rank={r} size="sm" glow={isCurrent} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">
                        Rank {r} — {data.label}
                      </p>
                      <p className="text-[10px] text-text-muted">
                        {data.emoji}
                      </p>
                    </div>
                    {isPast && (
                      <span className="text-xs text-success">✓</span>
                    )}
                    {isCurrent && (
                      <Badge variant="primary" size="sm">
                        Atual
                      </Badge>
                    )}
                  </li>
                );
              },
            )}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
};

const BigStat = ({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) => (
  <div className="p-3 rounded-lg bg-bg/40 border border-border-subtle">
    <p className="text-[10px] uppercase tracking-wider text-text-subtle font-semibold">
      {label}
    </p>
    <p className="font-mono text-2xl font-bold text-text-primary leading-tight">
      {value}
    </p>
    {hint && <p className="text-[10px] text-text-muted">{hint}</p>}
  </div>
);

// ============================================================
// ACHIEVEMENTS TAB (mock — Sprint 6 plugará nos achievements reais)
// ============================================================
const MOCK_ACHIEVEMENTS = [
  { id: '1', title: 'First Step', desc: 'Completou 1 missão', rarity: 'common' as Rarity, icon: '⚔️', unlocked: true },
  { id: '2', title: 'Persistent Warrior', desc: '7 dias de streak', rarity: 'rare' as Rarity, icon: '🔥', unlocked: true },
  { id: '3', title: 'Steel Discipline', desc: '14 dias de streak', rarity: 'epic' as Rarity, icon: '💎', unlocked: false, progress: 12, max: 14 },
  { id: '4', title: 'Rank C Hunter', desc: 'Atingiu level 11', rarity: 'epic' as Rarity, icon: '🌟', unlocked: true },
  { id: '5', title: 'Night Warrior', desc: 'Quest após 22h', rarity: 'rare' as Rarity, icon: '🌙', unlocked: true },
  { id: '6', title: 'Unshakeable Force', desc: '30 dias de streak', rarity: 'legendary' as Rarity, icon: '👑', unlocked: false, progress: 12, max: 30 },
  { id: '7', title: 'Speed Runner', desc: '3 quests em <1h', rarity: 'epic' as Rarity, icon: '⚡', unlocked: false },
  { id: '8', title: 'Divine Ascension', desc: '100 dias de streak', rarity: 'mythic' as Rarity, icon: '✨', unlocked: false, progress: 12, max: 100 },
];

const RARITY_GLOW: Record<Rarity, string> = {
  common: 'rgb(0 0 0 / 0)',
  rare: 'color-mix(in srgb, var(--rarity-rare) 50%, transparent)',
  epic: 'color-mix(in srgb, var(--rarity-epic) 60%, transparent)',
  legendary: 'color-mix(in srgb, var(--rarity-legendary) 70%, transparent)',
  mythic: 'color-mix(in srgb, var(--rarity-mythic) 80%, transparent)',
};

const AchievementsTab = () => {
  const unlocked = MOCK_ACHIEVEMENTS.filter((a) => a.unlocked).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-text-muted">
          <span className="font-bold text-text-primary">{unlocked}</span>/
          {MOCK_ACHIEVEMENTS.length} desbloqueadas
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.info('Filtros chegam no Sprint 6')}
        >
          Filtrar
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {MOCK_ACHIEVEMENTS.map((a) => (
          <Card
            key={a.id}
            className={cn(!a.unlocked && 'opacity-60 grayscale')}
            style={
              a.unlocked
                ? { boxShadow: `0 0 24px ${RARITY_GLOW[a.rarity]}` }
                : undefined
            }
          >
            <div className="p-4 text-center">
              <div className="text-4xl mb-2">{a.icon}</div>
              <p className="font-display text-sm font-semibold text-text-primary">
                {a.title}
              </p>
              <p className="text-xs text-text-muted mb-2 line-clamp-2">
                {a.desc}
              </p>
              <RarityBadge rarity={a.rarity} className="!h-5 !text-[9px]" />

              {!a.unlocked && a.progress !== undefined && (
                <div className="mt-3">
                  <ProgressBar
                    value={a.progress}
                    max={a.max ?? 1}
                    size="xs"
                    variant="primary"
                  />
                  <p className="text-[10px] text-text-muted mt-1">
                    {a.progress}/{a.max}
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// IDENTITY TAB — editor básico
// ============================================================
const SILHOUETTES: Array<{ id: Silhouette; emoji: string; label: string }> = [
  { id: 'human', emoji: '🧝‍♀️', label: 'Humana' },
  { id: 'fox', emoji: '🦊', label: 'Raposa' },
  { id: 'wolf', emoji: '🐺', label: 'Loba' },
  { id: 'hooded', emoji: '🥷', label: 'Encapuzada' },
  { id: 'creature', emoji: '✨', label: 'Criatura' },
];

const BACKGROUNDS: Array<{ id: BackgroundStyle; label: string }> = [
  { id: 'solid', label: 'Sólido' },
  { id: 'gradient', label: 'Gradiente' },
  { id: 'scene', label: 'Cena' },
];

const IdentityTab = () => {
  const character = useCharacterStore((s) => s.character);
  const setIdentity = useCharacterStore((s) => s.setIdentity);

  const updateAvatar = (patch: Partial<typeof character.avatarConfig>) => {
    useCharacterStore.setState({
      character: {
        ...character,
        avatarConfig: { ...character.avatarConfig, ...patch },
      },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Preview */}
      <Card>
        <CardBody className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold mb-4">
            Preview
          </p>
          <div className="flex justify-center mb-4">
            <HunterIcon size="2xl" animate />
          </div>
          <p className="font-display text-xl font-semibold">
            {character.displayName}
          </p>
          <p className="text-sm text-primary italic">
            "{character.identity.battleQuote}"
          </p>
        </CardBody>
      </Card>

      {/* Editor */}
      <Card className="lg:col-span-2">
        <CardBody className="space-y-6">
          {/* Silhueta */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold mb-2">
              Silhueta
            </p>
            <div className="grid grid-cols-5 gap-2">
              {SILHOUETTES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => updateAvatar({ silhouette: s.id })}
                  className={cn(
                    'aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 transition-all',
                    character.avatarConfig.silhouette === s.id
                      ? 'border-primary bg-primary/5 shadow-premium-md'
                      : 'border-border bg-bg hover:border-border-strong',
                  )}
                >
                  <span className="text-2xl">{s.emoji}</span>
                  <span className="text-[10px] text-text-muted">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Background */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-text-subtle font-semibold mb-2">
              Fundo
            </p>
            <div className="flex gap-2">
              {BACKGROUNDS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => updateAvatar({ background: b.id })}
                  className={cn(
                    'flex-1 h-10 rounded-lg text-sm border transition-colors',
                    character.avatarConfig.background === b.id
                      ? 'bg-primary/10 text-primary border-primary/30'
                      : 'bg-bg border-border text-text-muted hover:border-border-strong',
                  )}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Eye glow */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-bg/40">
            <div>
              <p className="text-sm font-medium">Brilho nos olhos</p>
              <p className="text-xs text-text-muted">Aura de poder</p>
            </div>
            <button
              onClick={() =>
                updateAvatar({ eyeGlow: !character.avatarConfig.eyeGlow })
              }
              className={cn(
                'w-12 h-6 rounded-full transition-colors relative',
                character.avatarConfig.eyeGlow
                  ? 'bg-primary'
                  : 'bg-border-strong',
              )}
            >
              <span
                className={cn(
                  'absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform',
                  character.avatarConfig.eyeGlow && 'translate-x-6',
                )}
              />
            </button>
          </div>

          {/* Vibe + Quote */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-text-subtle font-semibold mb-1.5">
                Vibe Tag
              </label>
              <input
                value={character.identity.vibeTag}
                onChange={(e) => setIdentity({ vibeTag: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-bg border border-border text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-text-subtle font-semibold mb-1.5">
                Frase de Batalha
              </label>
              <input
                value={character.identity.battleQuote}
                onChange={(e) => setIdentity({ battleQuote: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-bg border border-border text-sm font-display italic focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <p className="text-xs text-text-subtle italic">
            ✨ Editor visual completo (cores customizáveis, armas por rank,
            outfits) chega no Sprint 3.
          </p>
        </CardBody>
      </Card>
    </div>
  );
};
