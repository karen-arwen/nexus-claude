# 🌌 NEXUS — Neural Evolution System

> *"Arise, Hunter. Your journey continues."* — Lumi

Plataforma de transformação pessoal gamificada inspirada em Solo Leveling. Sua vida vira um RPG.

---

## 🚀 Como rodar

```bash
npm install
npm run dev
```

Abre em [http://localhost:5173](http://localhost:5173). Não precisa de Supabase ainda — tudo roda em mock + localStorage.

---

## ⚡ Atalhos de poder

| Atalho | Ação |
|--------|------|
| `⌘K` / `Ctrl+K` | Command Palette — busca + ações em qualquer tela |
| `↑↓` `Enter` | Navegar e executar dentro do CMD-K |
| `ESC` | Fecha overlays |

---

## 🎨 Aparência

### Aesthetic Modes (4 vibes)
- **☕ Elegant** — Coffee shop premium (default). Cormorant Garamond, animações suaves, glows
- **🎮 Gamer** — Solo Leveling UI. Orbitron/Rajdhani, scan grid, bordas neon, cantos chanfrados
- **📐 Default** — Notion-like. Sem decorações, foco em conteúdo
- **🤍 Minimal** — Calm computing. Quase grayscale, espaçoso, sem animações

### Paletas (10)
Espresso, Citrus, Sakura, Cosmic, Mango, Ocean, Pastel, Pink, Minimal, Retro.
Todas com light + dark mode.

**Mode** + **Palette** = personalização total. Trocar em `/theme`.

---

## ✅ O que já está funcionando

### 🏠 HUD (Dashboard)
- Hunter Card com identity icon + rank badge + XP bar animada
- Lumi Quote do Dia compartilhável
- Quick actions (CMD+K, foco, dungeons, lumi)
- Today's Quests interativo (1 click completa, ganha XP/gold/essence/material drop chance)
- Weekly XP Chart (estilo bar com gradient)
- Streak Heatmap 30 dias (estilo GitHub mas premium)
- Stats Bars (energia, foco, vontade, exhaustion)
- Quick Stats (gold, essence, materials, completas hoje)

### ⚔️ Quests
- Lista filtrável (Active / Completed / Failed)
- Modal de criação completo (título, descrição, categoria, tipo, dificuldade, duração, XP/gold/essence preview)
- Completar atualiza Character (XP, level, rank, streak, currencies, material drop)
- 7 categorias com emoji, 5 tipos (Light/Essential/Challenge/Ritual/Recovery)

### 🔍 Command Palette (⌘K)
- Busca fuzzy em ações + navegação + quests ativas
- Quick actions: criar quest, iniciar foco, falar com Lumi
- Completar quest direto da palette
- Navegação keyboard-first (↑↓ Enter ESC)

### ⏱️ Focus Timer flutuante
- Pomodoro (25min) / Quick (10min) / Deep (90min)
- Persiste entre rotas (PiP-style)
- Minimizable em pílula
- 4 ambientes (silêncio, lo-fi, chuva, café — placeholders)
- Sessão completa = XP automático + tica counter
- Badge no TopBar enquanto rodando

### 🤖 Lumi (Chat)
- 6 personalidades: Default / Cheerleader / Sensei / Gamer / Dark Mentor / Cosmic
- Cada personalidade com greeting + respostas próprias
- Quick actions (criar quest, foco, "o que tem hoje?")
- Mock interativo até Sprint 7 (Claude API real)

### 👤 Profile (com tabs)
**Consolidação:** Profile + Trophy Room + Identity Editor numa única tela.
- **Vibe Card** — share-ready (Stories 9:16 + Feed 1:1 + WhatsApp)
- **Stats** — XP total, streak, roadmap de rank E→SSS
- **Conquistas** — galeria com 8 achievements de mock + 5 raridades + glow por raridade
- **Identidade** — editor de silhueta, fundo, eye glow, vibe tag, battle quote

### 🎁 Daily Login Calendar
- Grid de 28 dias estilo gacha
- Recompensas progressivas + milestones (dias 7/14/21/28)
- Claim modal interativo
- Locked / Today (animado) / Past / Claimed visual states

### 📥 Inbox (NOVO — minha sugestão)
- Captura rápida estilo GTD
- Quick conversion: ideia → quest com 1 click
- Pra registrar coisas sem parar o foco

### 🌅 Onboarding "O Despertar"
- 5 passos cinemáticos com partículas
- Cria nome, silhueta, vibe, battle quote
- Lumi te encontra no final

### 🔔 Notifications Drawer
- Slide-out da direita (não página)
- Marcar lida individual / todas / limpar
- 8 tipos com ícones e cores próprias
- Tempo relativo (agora, 5m, 2h, 1d)

### 🎨 Theme Page
- Switcher de Aesthetic Mode (4 vibes)
- Light / Dark / System
- 10 paletas com swatches preview

---

## 📋 Análise estratégica

Veja `STRATEGY.md` — análise crítica completa:
- Mergers propostos (de 30+ telas → 18-20)
- Features que faltam pra ser premium
- O que cortaria como sênior
- Roadmap revisado

**Hubs consolidados na minha proposta:**
- 🏆 **Profile** = Profile + Trophy + Identity ✅ feito
- ⚒️ **Forge** = Inventory + Crafting + Materials (próximo)
- 🎁 **Vault** = Login + Battle Pass + XP Shop + Item Shop (próximo)
- 🏟️ **Arena** = Squad + Guilds + Leaderboards (próximo)
- 🌿 **Wellness** = Health + Journal + Meditation (próximo)

**Features novas que adicionei (não estavam no doc original):**
- ✅ Command Palette (⌘K)
- ✅ Focus Timer flutuante global
- ✅ Inbox (GTD-style)
- 🔜 Goal Hierarchy (Year → Month → Week → Day)
- 🔜 Streak Freeze (proteção tipo Duolingo)
- 🔜 Quest Templates
- 🔜 Voice Journaling
- 🔜 Energy Forecasting
- 🔜 Co-working Rooms

---

## 🗺️ Mapa de rotas (atual)

| Rota | Status | Sprint |
|------|--------|--------|
| `/` | ✅ HUD com 6 widgets | 1+2 |
| `/quests` | ✅ CRUD + completar | 1 |
| `/inbox` | ✅ Captura rápida | 2 |
| `/onboarding` | ✅ "O Despertar" 5 steps | 2 |
| `/lumi` | ✅ Chat 6 personalidades | 2 (mock) |
| `/profile` | ✅ Tabs: Vibe/Stats/Achievements/Identity | 1+3 |
| `/login-calendar` | ✅ Gacha visual | 2 |
| `/theme` | ✅ Aesthetic Modes + 10 paletas | 1 |
| `/daily` | 🔜 | 2 |
| `/dungeons` | 🔜 | 4 |
| `/bosses` | 🔜 8 bosses | 4 |
| `/skills` | 🔜 | 6 |
| `/crafting` `/inventory` | 🔜 (vira Forge) | 5 |
| `/social` `/feed` | 🔜 | 3 |
| `/squad` `/guilds` `/leaderboards` | 🔜 (vira Arena) | 5/6 |
| `/share` | 🔜 Hub de cards | 3 |
| `/battle-pass` `/xp-shop` `/shop` | 🔜 (vira Vault) | 6 |
| `/planner` | 🔜 | 2 |
| `/health` `/journal` `/archive` | 🔜 (vira Wellness) | 7 |
| `/analytics` | 🔜 | 8 |
| `/story` | 🔜 | 7 |
| `/settings` `/integrations` | 🔜 (settings absorve) | 2 |

---

## 📁 Estrutura

```
Nexus/
├─ src/
│  ├─ components/
│  │  ├─ hud/                ← 6 widgets do dashboard
│  │  ├─ layout/             ← AppShell, Sidebar, BottomNav, TopBar, nav-config
│  │  ├─ overlays/           ← CommandPalette, NotificationsDrawer, QuestCreateModal, FocusTimer, OverlaysRoot
│  │  ├─ profile/            ← HunterIcon
│  │  └─ ui/                 ← Button, Card, Badge, ProgressBar
│  ├─ lib/
│  │  ├─ cn.ts               ← classnames + tailwind-merge
│  │  ├─ mock.ts             ← dados mock
│  │  ├─ supabase.ts         ← cliente
│  │  └─ xp.ts               ← XP curve, ranks
│  ├─ pages/                 ← uma por rota
│  ├─ stores/                ← Zustand: theme, character, quests, notifications, ui, focus, lumi, inbox
│  ├─ styles/
│  │  ├─ themes.css          ← 10 paletas
│  │  └─ aesthetic-modes.css ← 4 vibes (Elegant/Gamer/Default/Minimal)
│  ├─ types/index.ts         ← domínio NEXUS completo
│  ├─ App.tsx · main.tsx
│  └─ index.css              ← Tailwind v4 + @theme
├─ STRATEGY.md               ← Análise crítica do produto
└─ package.json
```

---

## 🎯 Decisões arquiteturais

### Por que Aesthetic Modes ortogonais a Paletas?
Mode controla "vibe" (tipografia, densidade, animação). Palette controla "humor" (cores). Combinação dá flexibilidade exponencial sem explosão de combinações pré-feitas.

### Por que CMD+K como first-class?
Power users odeiam navegar por menus. CMD+K reduz "criar quest" de 4 cliques pra 2 keystrokes. É o atalho que define produtos premium (Linear, Raycast, Notion).

### Por que Focus Timer flutuante?
Foco é o coração do produto, não pode ficar enterrado num menu. Floating widget = sempre disponível, persiste navegação.

### Por que Inbox?
Atrito mata captura. "Ah tive uma ideia" → 4 cliques pra criar quest = ideia se perde. Inbox é "joga aqui agora, decido depois". GTD core principle.

### Por que stores específicos vs um grande?
- `themeStore` — UI só
- `characterStore` — domínio do hunter
- `questStore` — domínio das quests
- `uiStore` — overlays/drawers/modals
- `focusStore` — timer state
- `lumiStore` — chat history
- `inboxStore` — items capturados

Separação por domínio = cada store tem 1 responsabilidade. Stores se cross-referenciam via `.getState()` quando necessário (ex: completar quest tica streak no character).

---

## 💜 Créditos

Por Karen + Claude (Anthropic).
Stack: React · TypeScript · Vite · Tailwind v4 · Zustand · Supabase · Lucide · Sonner

> NEXUS · Neural Evolution System · v0.2.0 (Sprint 2 em andamento)
