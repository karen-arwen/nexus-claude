/**
 * NEXUS · Tipos do Domínio
 *
 * Tudo que define o "shape" dos dados do app vive aqui.
 * Mantenha este arquivo como source of truth — sem types inline em components.
 */

// ============================================================
// PRIMITIVES
// ============================================================

export type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

export type ThemeName =
  | 'espresso'
  | 'citrus'
  | 'sakura'
  | 'cosmic'
  | 'mango'
  | 'ocean'
  | 'pastel'
  | 'pink'
  | 'minimal'
  | 'retro';

export type ThemeMode = 'light' | 'dark' | 'system';

export type AestheticMode = 'elegant' | 'gamer' | 'default' | 'minimal';

// ============================================================
// CHARACTER (Hunter)
// ============================================================

export interface CharacterStats {
  energy: number; // 0-100
  focus: number; // 0-100
  will: number; // 0-100
  clarity: number; // 0-100
  exhaustion: number; // 0-100
}

export interface CraftingMaterials {
  commonDust: number;
  rareFragment: number;
  epicCrystal: number;
  legendaryShard: number;
  mythicEssence: number;
}

export interface Currencies {
  gold: number;
  essence: number;
  craftingMaterials: CraftingMaterials;
}

export type Silhouette = 'human' | 'fox' | 'wolf' | 'hooded' | 'creature';
export type BackgroundStyle = 'solid' | 'gradient' | 'scene';

export interface AvatarConfig {
  silhouette: Silhouette;
  bodyColor: string;
  eyeColor: string;
  eyeGlow: boolean;
  hairStyle: string;
  hairColor: string;
  outfit: string;
  weapon: string;
  aura: string;
  accessories: string[];
  expression: string;
  background: BackgroundStyle;
  backgroundValue: string;
  particles: string;
  rankBadgeVisible: boolean;
}

export interface HunterIdentity {
  vibeTag: string; // ex: "late night dev"
  battleQuote: string; // ex: "Arise, Hunter."
  aestheticTag: string; // ex: "Dark Academia"
  currentMission: string; // título de quest ativa em destaque
}

export interface Character {
  id: string;
  displayName: string;
  level: number; // 1-100
  xpTotal: number;
  xpCurrentLevel: number;
  xpToNextLevel: number;
  rank: Rank;
  streakCurrent: number;
  streakBest: number;
  streakLastTickAt: string | null; // ISO date
  stats: CharacterStats;
  currencies: Currencies;
  avatarConfig: AvatarConfig;
  identity: HunterIdentity;
  skillPoints: number;
  unlockedSkills: string[]; // skill IDs
  ownedTitles: string[];
  activeTitleId: string | null;
  createdAt: string;
}

// ============================================================
// QUESTS
// ============================================================

export type QuestType =
  | 'Essential'
  | 'Light'
  | 'Challenge'
  | 'Ritual'
  | 'Recovery';

export type QuestCategory =
  | 'study'
  | 'health'
  | 'project'
  | 'social'
  | 'creative'
  | 'life'
  | 'mind';

export type QuestStatus =
  | 'planned'
  | 'active'
  | 'completed'
  | 'failed'
  | 'expired';

export type QuestOrigin = 'manual' | 'suggested' | 'auto' | 'daily';

export interface QuestRewards {
  xp: number;
  gold: number;
  essence: number;
  materialDrop?: {
    type: keyof CraftingMaterials;
    chance: number; // 0-1
  };
}

export interface Quest {
  id: string;
  title: string;
  description?: string;
  type: QuestType;
  category: QuestCategory;
  difficulty: number; // 1-10
  estimatedMinutes: number;
  schedule: {
    dueDate: string; // ISO
    recurrenceRule?: string; // RRULE string
  };
  status: QuestStatus;
  rewards: QuestRewards;
  origin: QuestOrigin;
  dungeonId?: string;
  collaborativeId?: string;
  completedAt?: string;
  failedAt?: string;
}

// ============================================================
// DUNGEONS & BOSSES
// ============================================================

export type DungeonType =
  | 'Study'
  | 'Code'
  | 'Gym'
  | 'Life'
  | 'Social'
  | 'Creative'
  | 'Culture'
  | 'Mind';

export interface DungeonBoss {
  name: string;
  hpTotal: number;
  hpCurrent: number;
  phase: number;
  totalPhases: number;
}

export interface Dungeon {
  id: string;
  type: DungeonType;
  name: string;
  title: string;
  description: string;
  emoji: string;
  narrative: string;
  boss: DungeonBoss;
  questIds: string[];
  progressRatio: number; // 0-1
  status: 'active' | 'completed' | 'abandoned';
  rewardsFinal: {
    xp: number;
    gold: number;
    essence: number;
    items: string[];
  };
  startedAt: string;
  completedAt?: string;
}

export type BossDifficulty = 'easy' | 'medium' | 'hard' | 'nightmare' | 'apocalypse';

export interface BossAttack {
  name: string;
  damage: number;
  description: string;
  icon: string;
}

export interface SystemBoss {
  id: string;
  name: string;
  title: string;
  description: string;
  difficulty: BossDifficulty;
  icon: string;
  maxHP: number;
  currentHP: number;
  attacks: BossAttack[];
  weaknesses: string[];
  unlockRequirement: { type: string; value: number };
  rewards: {
    xp: number;
    skillPoints: number;
    title?: string;
    specialItem?: string;
  };
  state: 'locked' | 'available' | 'in_battle' | 'defeated';
}

// ============================================================
// ACHIEVEMENTS & SKILLS
// ============================================================

export type AchievementCategory =
  | 'missions'
  | 'projects'
  | 'streak'
  | 'level'
  | 'special';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  rarity: Rarity;
  icon: string;
  requirement: { type: string; value: number };
  reward: { xp: number; title?: string; gold?: number };
  unlockedAt?: string;
}

export type SkillCategory = 'offense' | 'defense' | 'support' | 'special';

export interface SkillEffect {
  type: string;
  value: number;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  tier: 1 | 2 | 3 | 4 | 5;
  icon: string;
  maxLevel: number;
  costPerLevel: number; // skill points
  prerequisites: string[];
  effects: SkillEffect[];
  currentLevel: number;
}

// ============================================================
// ITEMS & CRAFTING
// ============================================================

export type ItemSlot =
  | 'weapon'
  | 'armor'
  | 'accessory'
  | 'consumable'
  | 'cosmetic';

export interface Item {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: Rarity;
  slot: ItemSlot;
  effects: SkillEffect[];
  stackable: boolean;
  quantity: number;
  equipped?: boolean;
  durationHours?: number; // consumíveis
}

export interface CraftingRecipe {
  id: string;
  name: string;
  description: string;
  icon: string;
  materials: { type: keyof CraftingMaterials; quantity: number }[];
  result: { itemId: string; quantity: number };
  discovered: boolean;
  unlockHint?: string;
}

// ============================================================
// SOCIAL
// ============================================================

export type ShareType =
  | 'music_mood'
  | 'mood'
  | 'achievement'
  | 'daily_recap'
  | 'vibe_card'
  | 'streak_visual'
  | 'lumi_quote';

export type ReactionType = 'lets_go' | 'support' | 'fire' | 'legend';

export interface SocialReaction {
  type: ReactionType;
  userId: string;
  createdAt: string;
}

export interface SocialShare {
  id: string;
  userId: string;
  type: ShareType;
  content: Record<string, unknown>;
  theme: ThemeName;
  format: '9:16' | '1:1' | 'card';
  reactions: SocialReaction[];
  visibility: 'public' | 'friends' | 'private';
  createdAt: string;
}

// ============================================================
// JOURNAL & ARCHIVE
// ============================================================

export interface JournalEntry {
  id: string;
  mood: string;
  text: string;
  attachments: string[];
  tags: string[];
  createdAt: string;
}

export type LibraryItemType = 'book' | 'movie' | 'series';
export type LibraryStatus = 'wishlist' | 'reading' | 'watching' | 'finished' | 'favorite';

export interface EmotionalRating {
  stars: number; // 1-5 — qualidade da história
  fire: number; // 0-5 — intensidade
  tears: number; // 0-5 — emoção
  heart: number; // 0-5 — conexão com personagens
}

export interface LibraryItem {
  id: string;
  type: LibraryItemType;
  title: string;
  authorOrDirector: string;
  status: LibraryStatus;
  synopsis?: string;
  tags: string[];
  ratings?: EmotionalRating;
  notes: string[];
  quotes: string[];
  startedAt?: string;
  finishedAt?: string;
}

// ============================================================
// LUMI (AI)
// ============================================================

export type LumiPersonality =
  | 'default'
  | 'cheerleader'
  | 'sensei'
  | 'gamer'
  | 'dark_mentor'
  | 'cosmic';

export interface LumiMessage {
  id: string;
  role: 'user' | 'lumi' | 'system';
  text: string;
  createdAt: string;
}

export interface LumiSuggestion {
  id: string;
  text: string;
  action?: { type: string; payload: unknown };
  acceptedAt?: string;
  dismissedAt?: string;
}

// ============================================================
// NOTIFICATIONS
// ============================================================

export type NotificationType =
  | 'friend'
  | 'achievement'
  | 'quest'
  | 'streak'
  | 'system'
  | 'level'
  | 'boss'
  | 'squad';

export type NotificationPriority = 'low' | 'medium' | 'high';

export interface AppNotification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  body?: string;
  icon?: string;
  read: boolean;
  createdAt: string;
  link?: string;
}
