import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import HUD from './pages/HUD';
import Quests from './pages/Quests';
import Theme from './pages/Theme';
import Lumi from './pages/Lumi';
import Profile from './pages/Profile';
import LoginCalendar from './pages/LoginCalendar';
import Onboarding from './pages/Onboarding';
import Inbox from './pages/Inbox';
import { PagePlaceholder } from './pages/_PagePlaceholder';

/**
 * Single source of truth pra todas as rotas do app.
 * Páginas reais: HUD, Quests, Theme.
 * Demais: PagePlaceholder com hint do que vem em qual sprint.
 *
 * Conforme cada feature for implementada, basta substituir o
 * <PagePlaceholder/> pelo componente real.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      // ===== CORE =====
      { index: true, element: <HUD /> },
      { path: 'quests', element: <Quests /> },
      {
        path: 'daily',
        element: (
          <PagePlaceholder
            title="Daily Quests"
            emoji="📅"
            sprint={2}
            description="5 quests geradas pela Lumi todo dia, baseadas no seu mood."
            preview={[
              'Streak counter visual com flame animado',
              'Daily XP total + claim all rewards',
              'Quests temáticas por dia da semana',
              'Weekly boss challenge (1x/semana)',
              'Reset automático às 00:00',
            ]}
          />
        ),
      },
      {
        path: 'dungeons',
        element: (
          <PagePlaceholder
            title="Dungeons"
            emoji="🏰"
            sprint={4}
            description="Objetivos grandes divididos em sub-quests. Cada uma com um boss no fim."
            preview={[
              'Grid de dungeons ativas com boss HP',
              '8 tipos: Study, Code, Gym, Life, Social, Creative, Culture, Mind',
              'Progress ratio + boss phase indicator',
              'Detail page com timeline e rewards preview',
              'Complete dungeon modal épico',
            ]}
          />
        ),
      },
      {
        path: 'dungeons/:id',
        element: (
          <PagePlaceholder
            title="Dungeon Detail"
            emoji="🏰"
            sprint={4}
            description="Boss HP gigante + sub-quests + timeline."
          />
        ),
      },
      {
        path: 'bosses',
        element: (
          <PagePlaceholder
            title="Boss Battles"
            emoji="☠️"
            sprint={4}
            description="8 bosses lendários — de Procrastinus ao Monarch of Shadows."
            preview={[
              '#1 Procrastinus — O Senhor da Procrastinação (Easy, 1k HP)',
              '#2 Distractus Maximus — Mestre das Distrações (Medium, 2.5k HP)',
              '#3 Burnoutus — O Devorador de Energia (Hard, 5k HP)',
              '#4 Syndrome — A Sombra da Dúvida (Hard, 7.5k HP)',
              '#5 Caos Primordial (Nightmare, 10k HP)',
              '#6 Perfectus Eternus (Nightmare, 15k HP)',
              '#7 Monarch of Shadows — Boss Final (Apocalypse, 50k HP)',
              '#8 Perfeccionista Interno (Nightmare, 12k HP)',
            ]}
          />
        ),
      },
      {
        path: 'skills',
        element: (
          <PagePlaceholder
            title="Skill Tree"
            emoji="🧗"
            sprint={6}
            description="20+ skills em 4 categorias com prerequisites e ultimates god-tier."
            preview={[
              '🗡️ Offense (DPS) — bônus de XP',
              '🛡️ Defense (Tank) — proteção de streak',
              '⏱️ Support — eficiência e automation',
              '✨ Special — drop rate e boss damage',
              '👑 Rank S Awakened (god-tier, custo 10 SP)',
            ]}
          />
        ),
      },
      {
        path: 'crafting',
        element: (
          <PagePlaceholder
            title="Crafting"
            emoji="⚒️"
            sprint={5}
            description="Forje itens únicos com materiais coletados em quests."
            preview={[
              '5 tipos de material (Common Dust → Mythic Essence)',
              'Receitas: Escudo do Foco, Elixir de Energia, Coroa do Ascendido...',
              'Sistema de descoberta de receitas',
              'Animação de forja',
              'Itens com efeitos temporários (boost de XP, streak protection)',
            ]}
          />
        ),
      },
      // ===== IDENTITY & SOCIAL =====
      { path: 'profile', element: <Profile /> },
      { path: 'profile/:id', element: <Profile /> },
      { path: 'profile/edit-identity', element: <Navigate to="/profile" replace /> },
      { path: 'inbox', element: <Inbox /> },
      {
        path: 'social',
        element: (
          <PagePlaceholder
            title="Social Feed"
            emoji="📱"
            sprint={3}
            description="Feed estilo Instagram + Spotify dos seus amigos."
            preview={[
              'Mood Shares com barras visuais animadas',
              'Music Mood Shares (integração Spotify)',
              'Achievement unlocks',
              'Daily Recaps',
              'Reações únicas: ⚔️ Let\'s go · 💜 Te apoio · 🔥 Insano · 👑 Lenda',
              'Modo Sombra: aparece offline mas vê o feed',
            ]}
          />
        ),
      },
      {
        path: 'feed',
        element: <Navigate to="/social" replace />,
      },
      {
        path: 'squad',
        element: (
          <PagePlaceholder
            title="Squad / Guild"
            emoji="🏰"
            sprint={5}
            description="Sua guild de até 50 players — XP coletivo, GvG, perks compartilhados."
          />
        ),
      },
      {
        path: 'guilds',
        element: (
          <PagePlaceholder
            title="Explorar Guilds"
            emoji="🏰"
            sprint={5}
            description="Encontre uma guild que combina com você."
          />
        ),
      },
      {
        path: 'leaderboards',
        element: (
          <PagePlaceholder
            title="Leaderboards"
            emoji="🏆"
            sprint={6}
            description="5 categorias: XP, Quests, Books, Level, Streak. Weekly + Monthly."
          />
        ),
      },
      {
        path: 'share',
        element: (
          <PagePlaceholder
            title="Share Hub"
            emoji="📤"
            sprint={3}
            description="Gere cards premium pra compartilhar nos seus stories."
            preview={[
              '🎵 Music Mood Share (Spotify integrado)',
              '💜 Mood Share (energia/foco/vontade visual)',
              '⚔️ Achievement Share (auto ao desbloquear)',
              '✨ Daily Recap (estilo Spotify Wrapped)',
              '🌙 Vibe Card (link na bio dinâmico)',
              '🌀 Streak Visual (heatmap premium)',
              'Formato 9:16 (Stories) ou 1:1 (feed)',
            ]}
          />
        ),
      },
      // ===== REWARDS & PROGRESSION =====
      {
        path: 'trophy-room',
        element: (
          <PagePlaceholder
            title="Trophy Room"
            emoji="🏆"
            sprint={6}
            description="Showcase animado dos seus 30+ achievements."
            preview={[
              '5 raridades: Common · Rare · Epic · Legendary · Mythic ✨',
              'Pin até 5 achievements no perfil',
              'Progress bars para locked',
              'Mythic com glow arco-íris animado',
              'Meta-achievement "Achievement Hunter"',
            ]}
          />
        ),
      },
      { path: 'login-calendar', element: <LoginCalendar /> },
      {
        path: 'battle-pass',
        element: (
          <PagePlaceholder
            title="Battle Pass"
            emoji="🎫"
            sprint={6}
            description="Temporadas de 3 meses, Free + Premium tracks."
            preview={[
              '50 levels progressivos',
              'Temas sazonais: Inverno, Verão, Halloween, Sakura',
              'Free: XP, Gold, Common items',
              'Premium: Skins, Emotes, Títulos, Aesthetic Themes',
            ]}
          />
        ),
      },
      {
        path: 'xp-shop',
        element: (
          <PagePlaceholder
            title="XP Shop"
            emoji="🛒"
            sprint={6}
            description="Gaste seu XP em themes, identity customization, títulos exclusivos e boosts."
          />
        ),
      },
      {
        path: 'shop',
        element: <Navigate to="/xp-shop" replace />,
      },
      {
        path: 'inventory',
        element: (
          <PagePlaceholder
            title="Inventory"
            emoji="🎒"
            sprint={5}
            description="Seus itens, equipados e consumíveis. Filtros por raridade."
          />
        ),
      },
      // ===== TRACKING & VIDA =====
      {
        path: 'planner',
        element: (
          <PagePlaceholder
            title="Planner"
            emoji="📅"
            sprint={2}
            description="Agenda viva com auto-schedule baseado em energia + prioridade."
            preview={[
              'Monthly/Weekly/Daily views',
              'Time blocks com drag & drop',
              'Google Calendar sync bidirecional',
              'Auto-schedule inteligente da Lumi',
              'Previsão de energia por período do dia',
            ]}
          />
        ),
      },
      {
        path: 'health',
        element: (
          <PagePlaceholder
            title="Health"
            emoji="🌿"
            sprint={7}
            description="Check-in emocional, hábitos, workout tracking, integração com wearables."
            preview={[
              'Barras: energia, foco, vontade, stress',
              'Hábitos: água, sono, movimento',
              'Workout tracking com biblioteca de exercícios',
              'Diário alimentar + macros',
              'Integração Apple Health, Google Fit, Fitbit, Garmin',
              'Recovery mode automático',
            ]}
          />
        ),
      },
      {
        path: 'journal',
        element: (
          <PagePlaceholder
            title="Diário"
            emoji="📔"
            sprint={7}
            description="Espaço seguro pra registrar emoções, com proteção biométrica opcional."
            preview={[
              'Entrada rápida: humor + texto + anexos',
              'Prompts da IA pra começar a escrever',
              'Histórico filtrável por emoção/tag',
              'Meditação guiada (3/5/10 minutos)',
              'Insights narrativos da Lumi',
            ]}
          />
        ),
      },
      {
        path: 'archive',
        element: (
          <PagePlaceholder
            title="Archive"
            emoji="📚"
            sprint={7}
            description="Sua biblioteca cultural com classificação emocional."
            preview={[
              'Livros, Filmes, Séries',
              'Status: Lidos, Lendo, Quero Ler, Favoritos',
              'Classificação: ⭐ Estrelas · 🔥 Fogo · 💧 Gotas · 💜 Coração',
              'Citações pessoais',
              'Importações: Goodreads, Letterboxd, TMDB',
              'Recomendações IA baseadas em mood',
            ]}
          />
        ),
      },
      {
        path: 'analytics',
        element: (
          <PagePlaceholder
            title="Analytics"
            emoji="📊"
            sprint={8}
            description="Veja sua evolução em gráficos lindos."
            preview={[
              'XP over time (30/90/365 dias)',
              'Quests by category (pie chart)',
              'Activity heatmap estilo GitHub',
              'Books per month',
              'Year in Review estilo Spotify Wrapped',
              'Export PDF, CSV, JSON',
            ]}
          />
        ),
      },
      // ===== SISTEMA =====
      { path: 'lumi', element: <Lumi /> },
      {
        path: 'story',
        element: (
          <PagePlaceholder
            title="Story Mode"
            emoji="📖"
            sprint={7}
            description="10 capítulos progressivos, com Lumi como guia."
            preview={[
              'Cap 1: O Despertar (Lv 1-5)',
              'Cap 2: O Sistema (Lv 6-10)',
              'Cap 3: As Sombras — Boss Procrastinus',
              'Cap 4: A Evolução — Skill Tree',
              'Cap 5: Despertar do Poder — Burnoutus',
              'Cap 10: O Rei das Sombras — Boss Final',
              'New Game+ com bônus',
            ]}
          />
        ),
      },
      // Notifications agora é drawer global — redirect pro HUD se acessar direto
      { path: 'notifications', element: <Navigate to="/" replace /> },
      {
        path: 'integrations',
        element: (
          <PagePlaceholder
            title="Integrações"
            emoji="🔌"
            sprint={8}
            description="Conecte Google Calendar, Spotify, Notion, Strava, Goodreads, Discord..."
          />
        ),
      },
      { path: 'theme', element: <Theme /> },
      {
        path: 'settings',
        element: (
          <PagePlaceholder
            title="Settings"
            emoji="⚙️"
            sprint={2}
            description="Account, notifications, appearance, privacy, export/import, idioma."
          />
        ),
      },
      { path: 'onboarding', element: <Onboarding /> },
    ],
  },
  // 404
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
