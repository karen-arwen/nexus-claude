import {
  Home,
  Swords,
  Calendar,
  Castle,
  Skull,
  Sparkles,
  Hammer,
  Users,
  Shield,
  Trophy,
  User,
  Award,
  CalendarCheck,
  Coins,
  Ticket,
  Backpack,
  CalendarRange,
  BarChart3,
  HeartPulse,
  Notebook,
  BookHeart,
  Bot,
  ScrollText,
  Settings,
  Palette,
  Plug,
  Bell,
  Share2,
  Inbox,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: 'new' | 'soon';
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Core',
    items: [
      { to: '/', label: 'HUD', icon: Home },
      { to: '/quests', label: 'Quests', icon: Swords },
      { to: '/inbox', label: 'Inbox', icon: Inbox },
      { to: '/daily', label: 'Daily Quests', icon: Calendar },
      { to: '/dungeons', label: 'Dungeons', icon: Castle },
      { to: '/bosses', label: 'Boss Battles', icon: Skull },
    ],
  },
  {
    title: 'Identity & Social',
    items: [
      { to: '/profile', label: 'Hunter Profile', icon: User },
      { to: '/social', label: 'Social Feed', icon: Users },
      { to: '/squad', label: 'Squad / Guild', icon: Shield },
      { to: '/leaderboards', label: 'Leaderboards', icon: Trophy },
      { to: '/share', label: 'Share Hub', icon: Share2 },
    ],
  },
  {
    title: 'Progressão',
    items: [
      { to: '/skills', label: 'Skill Tree', icon: Sparkles },
      { to: '/crafting', label: 'Crafting', icon: Hammer },
      { to: '/trophy-room', label: 'Trophy Room', icon: Award },
      { to: '/login-calendar', label: 'Login Calendar', icon: CalendarCheck },
      { to: '/battle-pass', label: 'Battle Pass', icon: Ticket },
      { to: '/xp-shop', label: 'XP Shop', icon: Coins },
      { to: '/inventory', label: 'Inventory', icon: Backpack },
    ],
  },
  {
    title: 'Vida',
    items: [
      { to: '/planner', label: 'Planner', icon: CalendarRange },
      { to: '/health', label: 'Health', icon: HeartPulse },
      { to: '/journal', label: 'Diário', icon: Notebook },
      { to: '/archive', label: 'Archive', icon: BookHeart },
      { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'Sistema',
    items: [
      { to: '/lumi', label: 'Lumi AI', icon: Bot },
      { to: '/story', label: 'Story Mode', icon: ScrollText },
      { to: '/notifications', label: 'Notifications', icon: Bell },
      { to: '/integrations', label: 'Integrações', icon: Plug },
      { to: '/theme', label: 'Tema', icon: Palette },
      { to: '/settings', label: 'Settings', icon: Settings },
    ],
  },
];

// Mobile bottom nav — só os 5 essenciais
export const MOBILE_NAV: NavItem[] = [
  { to: '/', label: 'HUD', icon: Home },
  { to: '/quests', label: 'Quests', icon: Swords },
  // FAB central é renderizado separado
  { to: '/profile', label: 'Perfil', icon: User },
  { to: '/lumi', label: 'Lumi', icon: Bot },
];

export const ALL_ROUTES: string[] = NAV_GROUPS.flatMap((g) =>
  g.items.map((i) => i.to),
);
