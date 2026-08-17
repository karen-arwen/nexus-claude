# NEXUS · Análise Estratégica

> Análise crítica do escopo + propostas de consolidação + features que faltam.
> Escrito como um sênior fullstack faria num PR review do produto.

---

## TL;DR

A visão é forte e diferenciada. O escopo, do jeito que está no doc mestre, sofre de **fragmentação** — 30+ telas onde 18-20 dariam conta. Isso machuca em três frentes:

1. **Engenharia:** mais código pra manter, mais bugs, mais inconsistência visual.
2. **Onboarding:** novo usuário se perde entre Squad/Guild/Leaderboard/Social/Feed.
3. **Marketing:** "30 features" assusta; "uma plataforma com 6 pilares" vende.

A proposta abaixo: **consolidar em 6 hubs principais, transformar 3-4 telas em drawers/modals, e adicionar 5 features que faltam pra ser premium-tier.**

---

## 1. Mergers propostos (consolidação)

### 🏆 Profile — absorve Trophy Room + Identity Editor + Vibe Card
**Antes:** `/profile`, `/profile/edit-identity`, `/trophy-room`, `/share` (vibe card)
**Depois:** `/profile` com tabs:
- **Vibe Card** (default) — share-ready snapshot
- **Stats & Evolução** — gráficos, recordes, roadmap
- **Conquistas** — galeria de achievements (era o Trophy Room)
- **Identidade** — customização do icon (era /edit-identity)
- **Atividade** — timeline recente

**Por que:** Profile é a casa do hunter. Tudo "sobre você" cabe aqui. Trophy Room separado é overkill — ninguém precisa de uma SALA pra mostrar troféus se já tem uma galeria.

### ⚒️ Forge — absorve Inventory + Crafting
**Antes:** `/inventory`, `/crafting`
**Depois:** `/forge` com tabs:
- **Inventory** — itens equipáveis, consumíveis, cosmetics
- **Materials** — drops das quests
- **Crafting Table** — receitas + forja

**Por que:** Crafting sem inventory adjacente é UX ruim. Você cria item e... vai pra outra página ver? Não. Forge é o atelier completo.

### 🎁 Vault — absorve XP Shop + Shop + Battle Pass + Login Calendar
**Antes:** 4 páginas separadas
**Depois:** `/vault` com tabs:
- **Daily Login** (gacha calendar)
- **Battle Pass** (sazonal)
- **XP Shop** (cosmetics, boosts)
- **Item Shop** (gold/essence)

**Por que:** São TODOS sistemas de recompensa. Gameplay-wise, o usuário pensa "quero gastar/coletar coisas" — não "quero abrir 4 telas diferentes pra cada tipo de moeda".

### 🏟️ Arena — absorve Squad + Guilds + Leaderboards
**Antes:** `/squad`, `/guilds`, `/leaderboards`
**Depois:** `/arena` com tabs:
- **Sua Guild** (era /squad)
- **Explorar** (era /guilds)
- **Rankings** (era /leaderboards)

**Por que:** Tudo competitivo/social-coletivo num lugar. Reduz fricção entre "estou na minha guild" e "quero ver outras guilds".

### 🌿 Wellness — absorve Health + Journal + Meditation
**Antes:** `/health`, `/journal`, meditação solta
**Depois:** `/wellness` com tabs:
- **Check-in** (estado emocional + barras)
- **Hábitos** (água, sono, movimento)
- **Workout** (tracking)
- **Diário** (entradas)
- **Meditação** (timer guiado)

**Por que:** É tudo "cuidar de si". Separar diário de saúde força o usuário a contextualizar 2x ("ah isso é health, isso é journal"). Hub único = uma jornada de bem-estar.

### 📥 Inbox + Today (NOVO — substituirão parte da estrutura)
**Adicionar:** `/inbox` e `/today`
- **Inbox:** captura rápida que ainda não foi triada (estilo GTD). Você joga ideias aqui sem virar quest ainda. Lumi sugere transformação em quest.
- **Today:** snapshot diário — clima, calendário do dia, quests, daily quests, mood check-in. Substitui o que hoje é o HUD pra "começar o dia".

### Cortes radicais
- **`/feed` é alias de `/social`** ✓ (já fiz)
- **`/notifications` vira drawer**, não página
- **`/theme` e `/integrations` viram tabs em `/settings`**
- **`/onboarding` é fluxo full-screen sem nav**, não rota normal

---

## Estrutura final proposta — 18 rotas (vs 30+ originais)

```
🏠 CORE (4)
/                    → HUD / Today
/quests              → Missões (com tab Daily inline)
/forge               → Inventory + Crafting + Materials
/vault               → Login + Battle Pass + XP Shop + Item Shop

⚔️ EVOLUTION (4)
/dungeons + /:id     → Projetos grandes
/bosses              → Boss battles
/skills              → Skill tree
/story               → Story mode 10 caps

👤 IDENTITY & SOCIAL (3)
/profile + /:id      → Hub completo do hunter (com tabs)
/social              → Feed
/arena               → Guilds + Leaderboards

🌿 LIFE (3)
/wellness            → Health + Journal + Habits
/planner             → Calendar + auto-schedule
/archive             → Biblioteca cultural

🤖 SISTEMA (4)
/lumi                → Chat
/inbox               → Captura rápida (NOVO)
/analytics           → Dashboards
/settings            → Tudo: account, notifs, theme, integrations
```

---

## 2. Features que faltam (pra ser all-in-one premium)

### 🚀 ALTO IMPACTO — adicionar agora

#### a) Command Palette (⌘K)
Estilo Linear/Raycast/Notion. De qualquer tela, `Cmd+K` abre busca + ações:
- "Nova quest" → modal direto
- "Falar com Lumi" → vai pra /lumi
- "Iniciar foco 25min" → liga timer
- Busca em quests, dungeons, archive

**Por quê:** Power users não querem clicar 5 vezes pra criar quest. CMD+K é o "atalho de mestre" que diferencia produto premium.

#### b) Focus Timer flutuante (Picture-in-Picture)
Liga em qualquer tela. Persiste enquanto navega. 25min Pomodoro padrão + Deep Work 90min. Termina = ganha XP + tica streak de foco.

**Bonus:** Ambient sounds (lo-fi, rain, café). Block notifications enquanto rolando.

**Por quê:** Foco é o coração do produto. Ter timer escondido em algum canto mata o uso. Flutuante = sempre disponível.

#### c) Quick Capture (botão + global)
FAB já existe no mobile. Adicionar no desktop como botão flutuante OU CMD+K. Captura:
- Quest (modo rápido — só título + categoria)
- Journal entry (mood emoji + texto)
- Library item (URL pra livro/filme + nome)
- Idea pro Inbox

**Por quê:** Atrito mata captura. Se demora 4 cliques pra registrar uma quest, ninguém usa.

#### d) Goal Hierarchy (anuais → mensais → semanais → diárias)
Hoje só tem dungeons + quests. Falta:
- **Yearly themes** ("2026 = Ano da Saúde")
- **Monthly focus** ("Abril: AWS Lambda + Hipertrofia")
- **Weekly priorities** (3 rocks da semana)
- **Daily quests**

Cada nível alimenta o próximo. Lumi sugere quests baseado em weekly. Weekly review (sábado) pergunta "como foi vs as 3 rocks?".

**Por quê:** Sem hierarquia de tempo, dungeons viram caixa-preta. Hierarquia = clareza estratégica + tactical.

#### e) Streak Freeze + Streak Bank
Estilo Duolingo. Você acumula "streak freezes" automaticamente (1 a cada 7 dias completos). Quando perde um dia = streak freeze é gasto, streak preservado. Compráveis com Essence.

**Por quê:** Streak é o motor emocional do produto. Sem freezes, 1 dia ruim destrói meses de progresso. Isso é cruel e tira gente do app pra sempre.

### 💎 MÉDIO IMPACTO — sprint 4+

#### f) Quest Templates
Bundles pré-feitos: "Morning Routine" (5 quests), "Study Sprint" (Pomodoro x4), "Workout Push", "Recovery Day". Usuária aplica = 5 quests adicionadas no planner.

#### g) Voice Journaling
Mic button no diário. Lumi transcreve + gera tags + insights. Mata o atrito de "tô com sono não vou escrever".

#### h) Energy Forecasting
Lumi prevê tua energia do dia baseado em: streak, sono, exhaustion, mood histórico. "Você tende a estar 20% menos focada nas terças à tarde — agendei suas quests pesadas pra manhã."

#### i) Memory Photos / Moodboard real
Hoje a "Mood Board 3x3 no perfil" é vaga. Definir: você sobe 9 fotos da sua vida real, gira aleatório no perfil, vira identity pessoal.

#### j) Co-working / Focus Rooms
Salas virtuais com amigos. Câmera silenciosa estilo Cosy/Focusmate. Timer compartilhado. "Estudar com a Camila por 50min". Massa pra ADHDers.

#### k) Reading Tracker → Quests automáticas
Você marca livro como "lendo" = sistema cria daily quest "ler 20 páginas de [livro]" automaticamente. Termina = +XP + atualiza progresso.

### 🪶 LOW HANGING — depois

#### l) Weekly Review ritual
Domingo de noite, Lumi guia review: "Como foi a semana? O que aprendeu? Qual a foco da próxima?". Salva como journal entry especial.

#### m) Themed Days
Doc original já menciona ("Segunda = estudo, terça = saúde"). Implementar visualmente — o tema do app sutilmente muda no dia.

#### n) Notion-style Quick Notes flutuantes
Mini stickies que ficam no canto. Pin/unpin. Pra coisas que não viram quest mas você quer lembrar.

---

## 3. Aesthetic Modes (Karen pediu — temas além de paletas)

Hoje temos 10 paletas. Mas o que Karen quer é maior: **vibes diferentes**. A solução:

**Mode** (1 dos 4) × **Palette** (1 das 10) = experiência personalizada total.

### Os 4 Modes

#### ☕ Elegant (atual default)
- Tipografia: Cormorant Garamond display + Inter sans
- Density: respira, padding generoso
- Animations: suaves (250ms), pulse soft, float
- Decorations: glows, gradients, glassmorphism sutil
- Cantos: arredondados (lg/xl)
- **Vibe:** Coffee shop premium, Dark Academia

#### 🎮 Gamer
- Tipografia: Orbitron/Rajdhani display + Inter
- Density: compacta, energia
- Animations: sharper (150ms), neon pulse, scan lines
- Decorations: borders neon, holograma, shine effects
- Cantos: chanfrados (sm)
- **Vibe:** Solo Leveling UI, cyberpunk light, Genshin Impact

#### 📐 Default (Notion-like)
- Tipografia: Inter pra tudo
- Density: padrão
- Animations: mínimas (subtle hover)
- Decorations: nenhuma — só borders e backgrounds chapados
- Cantos: medium (md)
- **Vibe:** Notion, Linear, productivity-first

#### 🤍 Minimal
- Tipografia: Inter, weights leves
- Density: muito espaçado
- Animations: nenhuma
- Decorations: zero — tudo grayscale exceto primary
- Cantos: arredondados (lg)
- **Vibe:** Apple Notes, Bear, "calm computing"

Cada modo é uma classe `[data-mode-aesthetic="elegant"]` no HTML, e os CSS vars/components reagem.

---

## 4. Anti-fragmentação — princípios de design pro produto

Escrevendo isso pra futuro:

1. **Nunca crie uma página nova se uma tab serve.**
2. **Notification = drawer. Quick action = modal. Configuração = página.**
3. **Identity é uma só por toda parte** (sidebar, profile, leaderboard, share, notif). Componente único, lugar único de truth.
4. **Cada moeda/material/recurso só é gasto e recebido em UM lugar conhecido** (Vault), não espalhado.
5. **Toda celebração é compartilhável.** Não só achievements — quest concluída em horário épico, dungeon batida, streak milestone, level up.
6. **Lumi é onipresente, não só uma tela.** Quote do dia no HUD, suggestion sidebar nas quests, comentário pós-completion, etc.

---

## 5. Roadmap revisado

### Sprint 1 ✅ (atual)
Foundation, design system base, HUD, Quests page, Theme switcher.

### Sprint 2 — Mecânicas Core (ATUAL FOCO)
- Aesthetic Modes (4 vibes) ⭐
- Command Palette ⭐
- Focus Timer flutuante ⭐
- Onboarding "O Despertar" ⭐
- Quest creation modal real
- Notifications drawer
- Settings consolidado
- Streak Freeze
- Goal Hierarchy básica

### Sprint 3 — Identity & Social
- Profile com tabs (com Identity Editor + Trophy)
- ShareCardGenerator
- Vibe Card dinâmico
- Social Feed básico

### Sprint 4 — Boss Battles + Dungeons
- 8 bosses
- Dungeon CRUD + tracking

### Sprint 5 — Forge
- Inventory + Crafting + Materials unificados
- Quest Templates

### Sprint 6 — Vault + Arena
- Login Calendar gacha
- Battle Pass
- Skill Tree
- Achievements 30+
- Leaderboards

### Sprint 7 — Wellness + Lumi AI real
- Wellness hub completo
- Lumi chat com Claude API
- Voice journaling
- Energy forecasting
- Story Mode 10 caps

### Sprint 8 — Backend + Integrações + Polish
- Supabase real
- Spotify Music Mood
- Co-working rooms
- PWA + push
- Performance + tests

---

## 6. Coisas que eu pessoalmente CORTARIA (opinião sênior)

Não é que sejam ruins — só que custam mais do que entregam.

- **Story Mode com 10 caps de narrative writing.** Cool em conceito, mas requer roteirista. Sugestão: começa com 3 caps + cliffhanger "more coming". Volume cresce com tempo.
- **GvG (Guild vs Guild).** Complexo de implementar e mantém o app vivo apenas com massa crítica. Aguardar 1k+ usuários antes de investir.
- **Apple Health / Fitbit / Garmin integration.** Cada uma é um projeto inteiro. Começar com Strava (mais simples) ou só self-report até ter 5k usuários.
- **Webhook custom pra Discord/Zapier.** Power user feature. 95% nunca vão usar. Adiar.

**Em vez disso, investir esse tempo em:**
- Onboarding *perfeito* (50% do retention vem do primeiro dia)
- Lumi *boa de verdade* (o diferencial real)
- Animations *cinematográficas* (level up, boss defeat — virais no TikTok)
- Vibe Card *compartilhável* (vetor de aquisição orgânica)

---

## 7. O que vou implementar agora (próxima sessão)

Ordem priorizada:
1. ✅ Este doc (você está lendo)
2. Aesthetic Modes (foundation pra tudo visual)
3. Command Palette (game-changer de UX)
4. Focus Timer flutuante
5. Onboarding "O Despertar"
6. Profile real (com tabs)
7. Lumi chat mock
8. Forge unificado
9. Vault unificado
10. Quest creation modal
11. Notifications drawer
12. Polish final do HUD

Vamos.

---

> "O melhor design é aquele que some — você nem percebe ele, só sente que é fácil."
> — Lumi, Neural Evolution System
