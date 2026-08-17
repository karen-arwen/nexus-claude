import type { Character, Quest, AppNotification } from '@/types';

/**
 * Mock data — usado enquanto Supabase não está conectado.
 * Substituir por queries reais no Sprint 8.
 */

export const mockCharacter: Character = {
  id: 'karen-1',
  displayName: 'Karen',
  level: 12,
  xpTotal: 2840,
  xpCurrentLevel: 340,
  xpToNextLevel: 760,
  rank: 'C',
  streakCurrent: 12,
  streakBest: 23,
  streakLastTickAt: new Date().toISOString(),
  stats: {
    energy: 72,
    focus: 65,
    will: 88,
    clarity: 70,
    exhaustion: 28,
  },
  currencies: {
    gold: 1240,
    essence: 86,
    craftingMaterials: {
      commonDust: 45,
      rareFragment: 12,
      epicCrystal: 3,
      legendaryShard: 0,
      mythicEssence: 0,
    },
  },
  avatarConfig: {
    silhouette: 'hooded',
    bodyColor: '#8b5a3c',
    eyeColor: '#d4a574',
    eyeGlow: true,
    hairStyle: 'long',
    hairColor: '#3e2723',
    outfit: 'cloak_basic',
    weapon: 'rapier_c',
    aura: 'amber',
    accessories: [],
    expression: 'determined',
    background: 'gradient',
    backgroundValue: 'sunset',
    particles: 'sparkles',
    rankBadgeVisible: true,
  },
  identity: {
    vibeTag: 'late night dev',
    battleQuote: 'Arise, Hunter.',
    aestheticTag: 'Dark Academia',
    currentMission: 'Aprender AWS Lambda',
  },
  skillPoints: 4,
  unlockedSkills: ['focus_offense_1', 'resilience_1'],
  ownedTitles: ['Hunter Iniciante', 'Madrugadora'],
  activeTitleId: null,
  createdAt: '2026-01-15T08:30:00Z',
};

const today = () => new Date();
const inHours = (h: number) => new Date(Date.now() + h * 3600 * 1000).toISOString();

export const mockQuests: Quest[] = [
  {
    id: 'q1',
    title: 'Estudar AWS Lambda — Capítulo 4',
    description: 'Hands-on com event-driven architecture',
    type: 'Essential',
    category: 'study',
    difficulty: 6,
    estimatedMinutes: 90,
    schedule: { dueDate: inHours(8) },
    status: 'active',
    rewards: {
      xp: 280,
      gold: 30,
      essence: 4,
      materialDrop: { type: 'rareFragment', chance: 0.3 },
    },
    origin: 'manual',
    dungeonId: 'd1',
  },
  {
    id: 'q2',
    title: 'Treino de força (45min)',
    type: 'Ritual',
    category: 'health',
    difficulty: 5,
    estimatedMinutes: 45,
    schedule: { dueDate: inHours(4) },
    status: 'active',
    rewards: { xp: 150, gold: 20, essence: 2 },
    origin: 'auto',
  },
  {
    id: 'q3',
    title: 'Ler 30 páginas de "The Pragmatic Programmer"',
    type: 'Light',
    category: 'study',
    difficulty: 3,
    estimatedMinutes: 35,
    schedule: { dueDate: inHours(12) },
    status: 'active',
    rewards: { xp: 90, gold: 10, essence: 1 },
    origin: 'suggested',
  },
  {
    id: 'q4',
    title: 'Mandar mensagem pra Camila',
    type: 'Light',
    category: 'social',
    difficulty: 1,
    estimatedMinutes: 10,
    schedule: { dueDate: inHours(2) },
    status: 'active',
    rewards: { xp: 40, gold: 5, essence: 1 },
    origin: 'manual',
  },
  {
    id: 'q5',
    title: 'Meditação guiada (10min)',
    type: 'Recovery',
    category: 'mind',
    difficulty: 1,
    estimatedMinutes: 10,
    schedule: { dueDate: inHours(1) },
    status: 'completed',
    completedAt: today().toISOString(),
    rewards: { xp: 60, gold: 8, essence: 1 },
    origin: 'daily',
  },
];

export const mockNotifications: AppNotification[] = [
  {
    id: 'n1',
    type: 'achievement',
    priority: 'medium',
    title: 'Achievement desbloqueada!',
    body: '"Persistent Warrior" — 7 dias de streak 🔥',
    icon: '🏆',
    read: false,
    createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
  },
  {
    id: 'n2',
    type: 'streak',
    priority: 'high',
    title: 'Streak protegido',
    body: 'Você completou pelo menos 1 quest hoje 💜',
    icon: '🔥',
    read: false,
    createdAt: new Date(Date.now() - 7200 * 1000).toISOString(),
  },
];

export const mockLumiQuote =
  'Você já sobreviveu a 100% dos seus dias difíceis. Hoje não será diferente.';
