# Bicofino DS — Status

Atualizado em: 01 jun 2026 (DS v3.1 Fase 0+1 em prod · rename On/Off Pitch · docs-site migrado p/ Vercel da empresa)

---

## Monorepo

| App               | Porta | URL produção                              | Estado       |
|-------------------|-------|-------------------------------------------|--------------|
| apps/docs-site    | 3001  | https://bicofino-ds-umber.vercel.app      | ✅ em prod (Vercel empresa `bicofino-ds`) |
| apps/storybook    | 6006  | —                                         | ✅ estável   |
| apps/web          | 3002  | https://bicofino-web.vercel.app           | ✅ em prod   |
| packages/design-system | — | —                                        | ✅ estável   |

> **Vercel:** docs-site vive no projeto **`bicofino-ds`** (team `studio-bicofinos-projects`, conta `woney@bicofino.com`), git-conectado a `studio-bicofino/bicofino-ds`, `rootDirectory=apps/docs-site`, prod branch `main`. Proteção SSO **desligada** (público). O projeto pessoal `bicofino` (woneymalian@gmail.com) está deprecado para este uso.

---

## Componentes existentes no docs-site

### 01 • Brand System
- [x] Brand System (cover)
- [x] Índice
- [x] Fundamentos
- [x] Posicionamento
- [x] Núcleo da Marca
- [x] Universo Verbal

### 02 • Design System
- [x] Universo Visual (visão geral do DS)
- [x] Cores (Paleta Core + Especial + Tokens)
- [x] One Vibrant — regra 90/10 + `--current-accent` randomizado (Fase 1)
- [x] Tipografia
- [x] Heading (título hero — curto, categórico, sem frase completa)
- [x] Spacing & Motion
- [x] Corner Languages — sharp/soft/pill via `[data-corners]` (Fase 1)

### 03 • Brand
- [x] Logotipo
- [x] Voz & Tom
- [x] Grafismo Técnico (M-01) — SVG `.bf-schematic`, motion ambiente (Fase 1)
- [x] Post-System 60/40 (M-04) — grid unity-in-variety (Fase 1)
- [x] Intervenção de Cor (M-03) — bloco editorial `--current-accent` (Fase 1)

### 04 • Componentes
- [x] Botões
- [x] Badges
- [x] Forms
- [x] Cards (editorial, resultado, campanha)
- [x] Bento de Dados (M-05) — chassi de dashboard (Fase 1)

### 05 • Verticais
- [x] Verticais (// 05.1)
- [x] On Pitch — Image System (// 05.2)

### 06 • Assets
- [x] Motion Intelligence (métricas animadas)
- [x] Sponsors (carrossel duplo infinito)
- [x] Icons

### 07 • Operações
- [x] Arquitetura de Marca (On Pitch / Off Pitch / Club)
- [x] Padrões de Entrega (Princípios, Ferramentas, Fluxo, Política Comercial)

### 08 • Governança
- [x] Versão & Owners
- [x] Resources

---

## Componentes planejados (ainda não construídos)

- [ ] AthleteCard — foto + nome + stats + badges
- [ ] StatRow — ícone + valor + label
- [ ] StatMetric — número grande + unidade + label
- [ ] CampaignCarousel — scroll horizontal de thumbnails
- [ ] BfBadgeGroup — grupo de badges Bicofino
- [ ] AthleteProfilePage — página completa (organismo)

---

## Branches ativas

- main → estado estável do DS (DS v3.1 Fase 0+1 + rename On/Off Pitch)
- experiments/athlete-profile → (criar antes de começar os novos componentes)

---

## Pendências / próximos passos (p/ retomar)

- [x] ~~**DS v3.1 Fase 2** — self-hosting da Gotham~~ — **FEITO 01 jun 2026** (ver changelog abaixo). 6 woff2 em `public/fonts/`, `@font-face` + token `--bf-font-impact` + utility `.bf-impact` no `globals.css`, font card documentado na Tipografia (`// 02.3.3`). Handoff local `design_handoff_bicofino_v3_1/` pode ser apagado.
- [ ] **Rename On/Off Pitch — identificadores internos** (opcional, adiado): chaves `t()` (`onfield.*`), nome `OnFieldSection.tsx`, classes CSS e âncora `#on-field` ainda são "field" (invisíveis). Aplicar só se quiser consistência total de código.
- [ ] **Rename On/Off Pitch — apps WIP**: ds-studio, casa-nostra, vanguarda, propostas ficaram de fora; aplicar se/quando reativados.
- [ ] **Athlete Profile (/verticais)** — spec pronta em `design_handoff_bicofino_v3_1/PHASE1_athlete_profile.md`; estende `AthleteStatCard`/`AthleteCampaignCarousel`/`OnFieldSection`.

---

## Changelog

### 01 jun 2026 — DS v3.1 Fase 2 — Gotham self-hosted (fonte de impacto M-02)

- **Conversão** — 6 Gothams (`Light · LightItalic · Book · Bold · BoldItalic · Black`) convertidas de `.otf` → **woff2** via fonttools+brotli (~85 KB total, ~50% menor). Fonte: `AI-OS-BASE/.../card-jogos-motion/fonts/`. Destino: `apps/docs-site/public/fonts/`.
- **globals.css** — 6 blocos `@font-face` (family `"Gotham"`, `font-display: swap`, pesos 300/500/700/900 + itálicos via Light/Bold). Token `--bf-font-impact` adicionado ao `:root` (+ a tríade explícita `--bf-font-display` / `--bf-font-mono`). Utility class `.bf-impact` (Gotham 900, uppercase, `letter-spacing 0.01em`) como hook único p/ nomes de atleta / títulos de post.
- **Tipografia (docs-site)** — terceiro font card **Gotham** (`// 02.3.3 · impacto`, specimen "KERCHNER" peso 900 uppercase) inserido após JetBrains Mono; Type Scale renumerado `// 02.3.3` → `// 02.3.4`. Chaves `font.gotham.*` adicionadas com paridade BR/EN/IT.
- **Regra** — Gotham é reservada a 1–2 palavras de impacto (uppercase); nunca body/running text — conforme DESIGN.md M-02.
- **Build** — `npm run build` verde, tsc limpo, 5 páginas estáticas. Fontes confirmadas como tracked (não-ignoradas) p/ build Vercel.

### 01 jun 2026 — DS v3.1 (Fase 0+1) + rename On/Off Pitch + migração Vercel da empresa

- **DS v3.1 Fase 0 (cânone)** — `DESIGN.md` + `tokens.{css,ts}` + `globals.css` reconciliados: expression modes SYSTEM/EDITORIAL, duas linguagens de canto (sharp/soft via `[data-corners]`), regra one-vibrant com `--current-accent` randomizado por refresh, lines-on-dark, motion ambiente (`.bf-schematic`, `--dur-ambient` 6s), biblioteca de 5 módulos. (PR #1, já estava em prod.)
- **DS v3.1 Fase 1 (UI nova)** — 6 seções bespoke recriadas das `references/*.html`: One Vibrant (`#one-vibrant`), Corner Languages (`#corner-languages`), Grafismo Técnico M-01 (`#grafismo-tecnico`), Post-System 60/40 M-04 (`#post-system`), Intervenção de Cor M-03 (`#intervencao-cor`), Bento de Dados M-05 (`#bento`). Componentes em `src/components/dsfase1/`, i18n em `src/content/dsfase1/` (paridade BR/EN/IT), âncoras no `Sidebar`. (PR #9)
- **Rename de marca On/Off Field → On/Off Pitch** — todo texto visível (docs-site i18n + componentes + docs raiz) + rotas do apps/web (`/on-pitch`, `/off-pitch` com redirect permanente). Chaves `t()`/paths de asset/âncoras internas mantidos de propósito. Convenção permanente daqui em diante. (PR #9, commit 2)
- **Vercel** — docs-site **migrado** do projeto pessoal `bicofino` p/ o da empresa `bicofino-ds` (re-link local), proteção SSO **desligada** (público). Build da Fase 0 que tinha errado foi corrigido pelo commit das deps do AI SDK.


### 10 mai 2026 — Fase 3 — Accordion, fundo azul, ícones platinum, fix vídeo

- **Header** — `borderBottom` removido. Separação visual entre header (branco puro) e conteúdo (azul `--bf-surface`) feita puramente por contraste de cor, sem linha divisória.
- **Footer** — Ícones unificados: MapPin, IconDiamond e ícone do Instagram agora usam `var(--bf-platinum)` (`#a8c9e5`). IconDiamond recebeu prop `style` para suportar a substituição.
- **Accordion** — Novo componente primitivo `components/primitives/Accordion.tsx`. Motion v12 (`AnimatePresence` + `motion.div`) com `height: auto`, opacidade, 260ms `[0.16,1,0.3,1]`. Hover altera cor do heading para `var(--bf-text-primary)`. Indicador `+` rotaciona 45° ao abrir.
- **Foundation, Off Pitch, On Pitch** — Fundo alterado de `var(--bf-bg-page)` para `var(--bf-surface)`. Blocos de serviço/4Cs convertidos de lista/grid estático para Accordion colapsável. CTA/closing estilizado como EYEBROW (JetBrains Mono 11px, uppercase, letterSpacing 0.14em, `var(--bf-text-subtle)`) com prefixo `//`.
- **Vídeo homepage** — `public/media` removido do `.vercelignore` para que `herovideo.mp4` e `herovideo.gif` sejam incluídos no deploy Vercel CLI.
- **next.config.ts** — `outputFileTracingRoot` removido (pitfall de deploy — já documentado).
- **Build** — TypeScript limpo, 6 rotas estáticas. Commit `7b381a9`.
- **Preview** — https://bicofino-nrp6jk02d-woney-malians-projects.vercel.app · 5/5 rotas → HTTP 200.

### 09 mai 2026 — fix(web): deploy Vercel destravado — outputFileTracingRoot

- **Causa raiz** — `next.config.ts` tinha `outputFileTracingRoot: path.join(process.cwd(), '../../')`. Na Vercel com `--cwd apps/web` e Root Directory vazio, `process.cwd()` = `/vercel/path0`, então `outputFileTracingRoot` resolvia para `/` (raiz do filesystem). O hook `onBuildComplete` da Vercel computava o `distDir` como relativo a `/`, obtendo `vercel/path0/.next`, e ao juntar com `cwd` (`/vercel/path0`) produzia o path duplicado `/vercel/path0/vercel/path0/.next/routes-manifest-deterministic.json`.
- **Fix** — `outputFileTracingRoot` removido de `next.config.ts` junto com o `import path`. `apps/web` não tem dependências locais de `packages/`, portanto `outputFileTracingRoot` era desnecessário.
- **Root Directory Vercel** — Campo esvaziado no dashboard (`Build and Deployment → Root Directory`). Deploy usa `vercel --cwd apps/web` do root do monorepo.
- **Preview validada** — `https://bicofino-nxcs9s0zx-woney-malians-projects.vercel.app` · 5/5 rotas → HTTP 200 (`/`, `/foundation`, `/on-field`, `/off-field`, `/club`).
- **Nota** — O "hang" da sessão anterior era ambiente (sandbox/OS), não código. O código já estava correto desde o commit `1408196`.

### 08 mai 2026 — apps/web + Bicofino agents and skills + Vercel deploy

- **apps/web criado** — Next.js 16 (App Router, Turbopack), 
  TypeScript estrito, CSS Modules + tokens do design-system. 
  Roda em localhost:3002.
- **Homepage** — header com nav (foundation/off-field/on-field), 
  HeroBlock (vídeo 400×400 + 4Cs heading + Mensch), Footer 
  trilíngue com switcher EN/IT/BR.
- **Mobile** — overlay hambúrguer full-screen, focus trap, 
  stagger 40ms.
- **i18n** — BR/EN/IT replicando padrão docs-site.
- **Brand assets** — logo, diamond, club key SVG e herovideo 
  em apps/web/public/brand/ e public/media/ (uploads manuais, 
  não commitados).
- **Placeholders criados** — `public/favicon.ico` (32×32 #2a2c2b) 
  e `public/og-image.png` (1200×630 branco + tagline).
- **HeroBlock** — gif fallback wired: `poster="/media/herovideo.gif"` 
  + `<img>` fallback dentro do `<video>`.
- **.claude/agents/** — design-reviewer, copy-editor, 
  motion-curator, deploy-conductor.
- **.claude/skills/** — bicofino-tokens, bicofino-i18n-pattern, 
  bicofino-component-template.
- **Commit** — `5108e06` · feat(web): initial site, agents, skills 
  and vercel deploy · pushed to main.
- **Deploy Vercel** — projeto novo `bicofino-web` (separado de 
  `bicofino.vercel.app`/docs-site). Build SUCCESS. TypeScript limpo.
  Preview: `https://bicofino-gbkgcmnlq-woney-malians-projects.vercel.app`
  Alias: `https://bicofino-web.vercel.app`
  **Pendente:** desativar Deployment Protection no dashboard Vercel 
  (Settings → Deployment Protection → Vercel Authentication → Disabled).

### 06 mai 2026 — Heading — Renomeação e reescrita completa da seção

- **Renomeação global** — "Slash Heading" renomeado para "Heading" em todo o material: título da seção, sidebar (`nav.slash`), comentários internos e STATUS.md. Nenhuma referência a "Slash Heading" permanece.
- **Conteúdo reescrito do zero** — Sem resquício de Lead / Slash / Echo ou barra como elemento de design. Nova lógica: o Heading é um padrão de **título hero** — curto, categórico, sem frase completa.
- **Nova estrutura da seção** — O "Connect. Curate. Create. Consult." funciona como modelo de referência ao longo de toda a seção. Seções adicionadas: O que é (2 parágrafos), Princípios (4 itens bold+desc), Especificação tipográfica (tabela 3 colunas), Visual preview, Exemplos (tabela 2 colunas — Heading · Contexto), Exemplos recusados (tabela 2 colunas — Proposta · Problema), Onde aparece (lista + parágrafo).
- **i18n trilíngue completo** — Todas as novas chaves adicionadas a `br.ts`, `en.ts` e `it.ts`. Chaves obsoletas do formato anterior removidas.
- **Build** — Compilado com sucesso (Next.js 16 / Turbopack). TypeScript limpo.
- **Deploy** — Produção: https://bicofino.vercel.app · Commit `29e7beb`

### 05 mai 2026 — Suporte ao Italiano (IT) — i18n trilíngue

- **Novo idioma** — Italiano adicionado ao sistema de linguagem. Switcher exibe `EN  •  BR  •  IT`.
- **Arquivo criado** — `apps/docs-site/src/content/it.ts` — dicionário completo com ~200 chaves traduzidas para o italiano. Cobertura total de todos os namespaces: topbar, colors, typography, spacing, brand, voice, verticals, components, sidebar, footer, on-field, operations, performance, governance, resources.
- **`content/index.ts`** — `Lang` extendida para `'br' | 'en' | 'it'`; `it` adicionado ao map de dicionários; localStorage aceita e persiste `'it'`.
- **`LanguageSwitcher.tsx`** — IT adicionado; cada idioma tem cor de active pill própria: EN → `--bf-como` (#0d8aff), BR → `--bf-sep` (#2fd298), IT → `#ed0007` (benfica — sem novo token CSS).
- **`BrandSystem.tsx`** — `toBsLang()` adicionado para fazer IT → EN no conteúdo longo do BrandSystem (sem tradução completa do brandSystemContent.ts neste passo); atributo HTML `lang` atualizado para `'it'` quando italiano.
- **Zero mudança visual** — Layout, dark mode, sidebar, mobile drawer 100% preservados. Única mudança visual intencional: cor do pill ativo do IT.
- **TypeScript** — Tipagem limpa, sem erros.
- **Build** — Compilado com sucesso (Next.js 16 / Turbopack).
- **Deploy** — Produção: https://bicofino.vercel.app · Commit `fd9594a`
- **Correções pós-deploy** — `TopBarLangToggle` em `page.tsx` estava separado de `LanguageSwitcher.tsx`; IT adicionado direto nele. `toBsLang` corrigido para IT→BR (não EN). `buildNav` no `Sidebar.tsx` agora usa `t()` para todos os labels; chaves de nav adicionadas a br/en/it.

### 05 mai 2026 — Verticais movida para 05 • VERTICAIS

- **Refactor estrutural** — Seção "Verticais" removida de `// 03 • BRAND` e inserida como primeiro item de `// 05 • VERTICAIS`.
- **Sidebar atualizado** — `// 03 • BRAND` agora tem apenas Logotipo e Voz & Tom. `// 05 • VERTICAIS` agora tem Verticais (primeiro) e On Pitch — Image System (segundo).
- **Renumeração** — Eyebrow da seção Verticais: `// 03.3` → `// 05.1`. Cards internos: `// 03.3.1` → `// 05.1.1`, `// 03.3.2` → `// 05.1.2`. Eyebrow do On Pitch: `// 05.1` → `// 05.2`. Sub-item catalog: `// 05.1.2` → `// 05.2.2`.
- **Anchors preservados** — `id="verticais"` e `id="on-field"` inalterados. Todos os links da sidebar, scroll targets e IntersectionObserver mappings continuam funcionando.
- **Zero mudança visual** — Layout, estilos, tipografia, dark mode, mobile drawer e accordion 100% preservados.
- **Build** — Compilado e tipagem limpa. READY.
- **Deploy** — Produção: https://bicofino.vercel.app · Commit `5e81ed1`

### 05 mai 2026 — Mobile Sidebar Drawer (fix: pointer-events)

- **Bug corrigido** — overlay com `display: block; opacity: 0` bloqueava todos os cliques e scroll no mobile quando o drawer estava fechado. Corrigido com `pointer-events: none` no estado fechado e `pointer-events: auto` no estado aberto.

### 05 mai 2026 — Mobile Sidebar Drawer

- **Comportamento responsivo** — Sidebar fixa no desktop (≥1024px); vira drawer lateral no mobile (<1024px).
- **Hamburger na topbar** — Botão `Menu` (lucide-react, 20px, strokeWidth 1.5) no canto superior esquerdo, visível apenas no mobile.
- **Drawer** — `position: fixed`, entra da esquerda com `transform: translateX` em 200ms ease-out; reutiliza exatamente a mesma Sidebar sem redesign.
- **Overlay** — cobre o conteúdo com `rgba(6,16,21,0.6)`, fecha ao clicar.
- **Botão X** — dentro do drawer, fecha ao clicar.
- **Fechar também por**: ESC, overlay, clique em item do menu.
- **Body scroll lock** — `overflowY: hidden` em `#main-content` enquanto aberto.
- **Dark mode** — usa tokens `--bf-sidebar-bg`, `--bf-bg-page` existentes.
- **Reduced motion** — usa opacity em vez de transform.
- **Sem alteração visual** — sidebar design 100% preservado.

---

### 05 mai 2026 — Numeração Global — Sidebar como Fonte de Verdade

- **Revisão global de numeração** — Todos os eyebrow labels, section numbers e marcadores visuais do corpo da página agora batem 100% com a arquitetura da Sidebar.
- **Arquivos corrigidos** — `page.tsx`, `BrandSystem.tsx`, `brandSystemContent.ts`, `br.ts`, `en.ts`.
- **Mapeamento aplicado**:
  - `// 00 · Brand System` → `// 01 • BRAND SYSTEM` (capa + índice)
  - `// 00.1–00.5` (brandSystemContent) → `// 01.1–01.5`
  - `// 01.x` (Design System body) → `// 02.x` (colors=02.2, typo=02.3, heading=02.4, spacing=02.5)
  - `// 02 · Brand` → `// 03 • BRAND`; subsections 02.2–02.3 → 03.2–03.3
  - `// 03 · Components` → `// 04 • COMPONENTES`; subsections 03.2–03.4 → 04.2–04.4
  - `// 04 · On Pitch` → `// 05.1 · On Pitch — Image System`
  - `// 05.x` (perf/sponsors/icons) → `// 06.1–06.3`
  - `// 06.x` (ops) → `// 07.x`; `// 07.x` (governance) → `// 08.x`
- **Deploy** — Produção: https://bicofino.vercel.app · Build READY · Commit `ab1bfa1`

### 05 mai 2026 — Icons — Custom SVGs On-Pitch

- **13 ícones customizados adicionados** — Body, Dumbbell, Fingerprint, Fist, Football, Medal, Medal1, Pitch, Sneaker, Speed, StarCircle, Trophy, Watch. Fonte: `public/assets/on-field/icons/`.
- **`CustomSvgIcon` wrapper** — Componente interno que renderiza SVGs fill-based com `currentColor`. Todos os ícones respondem aos estados de hover e copied exatamente como os Lucide (mesma transição de cor 140ms ease-out).
- **Union type `IconEntry`** — `IconGrid.tsx` usa tipo discriminado `LucideEntry | CustomEntry`. Lucide copia JSX (`<Name size={20} strokeWidth={1.5} />`); custom copia o path público (`/assets/on-field/icons/icon-name.svg`).
- **Grid unificado** — 80 ícones no total (67 Lucide + 13 custom). Search, hover, copy e label funcionam identicamente para ambos os tipos.
- **Counter atualizado** — Meta line exibe `67 lucide · 13 custom · size 20`.
- **Deploy** — Produção: https://bicofino.vercel.app · Build READY · Commit `371788a`

### 04 mai 2026 — Versão v1.0 + Remoção de Itálico no Brand Card

- **Versão padronizada** — Eliminadas todas as ocorrências de `v2.0` e `v3.0` em todo o site. Única versão canônica agora é `v1.0`. Arquivos atualizados: `br.ts`, `en.ts`, `brandSystemContent.ts`, `layout.tsx`, `page.tsx`, `OnFieldSection.tsx`, `OperationsSection.tsx`.
- **Itálico removido** — `fontStyle: 'italic'` removido das 4 linhas do brand card em `OperationsSection.tsx` (brand.line1, line2, line3, version). Texto agora em JetBrains Mono sem itálico, consistente com o sistema tipográfico.
- **Deploy** — Produção: https://bicofino.vercel.app · Build READY · Commit `b927ac0` (local changes)

### 04 mai 2026 — Behavioral Fixes: Scroll · Dark Sidebar · Sponsors Dark Mode

- **Sidebar scroll fix** — Logo click agora scrolla `#main-content` (scroll root real) em vez de `window`. Body tem `overflow: hidden`; `window.scrollTo()` não funcionava. Corrigido para `document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'smooth' })`.
- **Sidebar dark mode bg** — `--bf-sidebar-bg` em `[data-theme="dark"]` era `#200c10` (caffe/warm). Corrigido para `#2a2c2b` (bf-black — neutro, técnico, consistente com o sistema).
- **Sponsor logos dark mode** — SVGs carregados como `<img>` desapareciam no dark mode (logos pretos sobre fundo escuro). Adicionada classe `.bf-sponsor-logo` no wrapper e regra CSS: `filter: brightness(0) invert(1); opacity: 0.55` em `[data-theme="dark"]`. Hover eleva para `opacity: 0.85`. Light mode inalterado.
- **Deploy** — Produção: https://bicofino.vercel.app · Build READY · Commit `f3665d1`

### 04 mai 2026 — Sponsors Carousel v3 + Sidebar Home Link

- **Logo swap** — Top row: `sponsor-nike.svg` → `sponsor-nike-swoosh.svg`. Bottom row: `sponsor-adidas-originals.svg` → `sponsor-on-cloud.svg`.
- **+30% velocidade** — Durations: 52s→40s (top), 58s→45s (bottom).
- **Sidebar home link** — BicofinoLogo no topo da sidebar envolvido em `<a>` com `onClick` → `window.scrollTo({ top: 0, behavior: 'smooth' })`. Cursor pointer, sem sublinhado.
- **Deploy** — Produção: https://bicofino.vercel.app · Build READY · Commit `df3f6e2`

### 04 mai 2026 — Sponsors Carousel v2 — Smooth Loop + Expand

- **Loop fix** — Substituído `flex gap` por `marginRight` em cada `SponsorLogo` (incluindo o último item de cada set). Com isso, `translateX(-50%)` corresponde exatamente ao width de um set → sem salto.
- **10 logos por row** — Top row: + Montblanc, Nike, Procter & Gamble, UBS, illy. Bottom row: + Bombardier, Adidas Originals, Ralph Lauren, Perrier, Cape. Duplicação continua (20 nós por track) para loop contínuo.
- **Transparência** — Removidos `background`, `border`, `borderRadius` e `padding` do card de logo. Logos exibidos com `opacity: 0.7` direto sobre o fundo da seção.
- **Velocidade ajustada** — 52s (top) / 58s (bottom) para 10 logos por linha.
- **Deploy** — Produção: https://bicofino.vercel.app · Build READY · Commit `beb9b74`

### 04 mai 2026 — Sponsors Carousel — // 06 · Assets

- **SponsorsSection** — Nova seção `// 05.3 · Sponsors` inserida em `// 06 · ASSETS` entre Motion Intelligence e Icons. Slug: `#sponsors`.
- **Carousel duplo** — Dois tracks infinitos (CSS `@keyframes`): top row scroll right→left (32s), bottom row scroll left→right (36s). Logos duplicados para loop seamless. Hover pausa a animação.
- **Logos (top row)** — FIFA, Audemars Piguet, Emirates, BTG, Red Bull.
- **Logos (bottom row)** — EA Sports, Gillette, Panini, PlayStation, Zegna.
- **SVGs** — 45 arquivos adicionados em `public/assets/on-field/sponsors/`. Usados as-is, sem recoloração.
- **Numeração atualizada** — Icons renumerado de `// 05.3` para `// 05.4` em `en.ts` e `br.ts`.
- **Sidebar atualizado** — Item "Sponsors" adicionado em `// 06 · ASSETS` entre Motion Intelligence e Icons.
- **Deploy** — Produção: https://bicofino.vercel.app · Build READY · Commit `ce4ccf0`

### 04 mai 2026 — Diamond Section — Texto Editorial Atualizado

- **brand.diamond.lead (BR)** — Texto editorial da seção Diamante reescrito. Novo texto: dois parágrafos — o primeiro contextualiza o símbolo (estrela ✦, quatro eixos, metáfora do bico fino, curadoria com forma); o segundo reitera o uso standalone. Key `brand.diamond.lead2` adicionada ao dicionário BR e EN.
- **brand.diamond.lead (EN)** — Tradução correspondente adicionada ao dicionário EN.
- **page.tsx** — Segunda `<Lead>` adicionada para renderizar o parágrafo `brand.diamond.lead2` na seção Diamond.
- **Deploy** — Produção: https://bicofino.vercel.app · Build READY · Commit `7f114fd`

### 04 mai 2026 — Dark Mode Rebuild + Premium Toggle

- **Dark Theme → bf Power Black** — Paleta "atelier at night" (caffe/crema) substituída pela paleta core do Bicofino. Novo background: bf Power Black `#061015`, superfície elevada: bf Black `#2a2c2b`, texto primário: `#ffffff`, secundário: bf Aluminium `#e2eaf2`, sutil: bf Steel `#6d7886`. Sentimento: editorial técnico, luxury quieto.
- **Semantic tokens atualizados** — `--bf-bg-page`, `--bf-surface`, `--bf-surface-subtle`, `--bf-text-primary`, `--bf-text-secondary`, `--bf-text-subtle`, `--bf-border`, `--bf-border-strong`, `--bf-pill-bg` re-mapeados em `[data-theme="dark"]` no `globals.css`. Tokens do Sidebar mantidos intactos.
- **ThemeToggle — microinteração premium** — Crossfade Sun↔Moon com CSS classes (`bf-theme-icon`, `bf-theme-icon--hidden`). Incoming: `rotate(-12deg) scale(0.88)` → `rotate(0deg) scale(1)`. Outgoing: inverso. 200ms `cubic-bezier(0.2, 0, 0, 1)`. `prefers-reduced-motion`: apenas opacity, sem transform.
- **Topbar transition** — `.bf-topbar` adicionado; background transita em 200ms ease-out junto com o resto da página.
- **prefers-color-scheme fallback** — `ThemeProvider` e o script anti-FOUC em `layout.tsx` agora lêem `prefers-color-scheme` quando não há preferência salva em localStorage.
- **OperationsSection cleanup** — 2 valores `rgba(42,44,43,...)` hardcoded substituídos por `var(--bf-surface-subtle)` e `var(--bf-border-strong)`.

### 04 mai 2026 — Sidebar Accordion + Numbering Refactor

- **Sidebar accordion** — Sidebar convertido em acordeão colapsável. Cada seção é um `<button>` com `aria-expanded`. Estado aberto derivado do scroll via `IntersectionObserver` — sem hardcode. Comportamento single-open: abrir uma seção fecha as outras automaticamente. Animação `max-height 180ms ease-out`.
- **Novo esquema de numeração** — Seções renumeradas de `// NN · Name` para `// NN • NAME` (01–08). Separador alterado de `·` para `•`, labels em uppercase.
- **Estrutura de 8 seções** — Adicionadas: `01 • Brand System` (antes sem número), `07 • Operações` (nova). Renomeadas: `Foundations → Design System`, `On Pitch → Verticais`, `Performance → Assets`, `Governance → Governança`. Items em PT-BR: Botões, Voz & Tom, Cores, Tipografia, Heading, Universo Visual.
- **Sub-anchors em OperationsSection** — Adicionados `id="ops-arch"` e `id="ops-delivery"` para linking direto de Arquitetura de Marca e Padrões de Entrega.
- **Estilo dos headers** — Cor do texto dos headers de seção elevada para `--bf-sidebar-text` (branco). Background sutil `rgba(242,248,255,0.06)`. Items em 12px / `--bf-sidebar-muted` (steel `#6d7886`).
- **Metadata do Sidebar** — Atualizada para `// Brand System` / `// v1.0 • maio 2026` / `// São Paulo • BR`.

### 04 mai 2026 — Theme Controls Refactor

- **ThemeToggle → Topbar** — Toggle de tema movido do rodapé do Sidebar para a Topbar, à esquerda do seletor de idioma. Ordem final: `[☀/🌙]` · `[EN / BR]` · `// maio · 2026`.
- **Sidebar totalmente tokenizado** — Todos os valores hex hardcoded no `Sidebar.tsx` substituídos por tokens semânticos CSS (`--bf-sidebar-text`, `--bf-sidebar-text-hover`, `--bf-sidebar-hover`, `--bf-sidebar-subtle`). Tokens adicionados ao `globals.css` em `:root` e `[data-theme="dark"]`.
- **Transição do Sidebar** — `.bf-sidebar` adicionado à regra de transição `html[data-theme-loaded]` — background e cor agora transitam em 200ms ease-out junto com o resto da página.
- **ThemeToggle redesenhado** — Cor atualizada para `--bf-text-secondary` (contexto de header). Hover muda opacidade (0.6 → 1) em vez de cor — mais sutil, sem ruído visual. Ícone 16px.
- **Rodapé do Sidebar limpo** — Removidos `LanguageSwitcher` e `ThemeToggle` do rodapé. Permanece somente a tagline editorial `// unlike any other.` em mono, baixo contraste.
- **BicofinoLogo** — SVG `fill` migrado para `style={{ fill }}` para suportar CSS custom properties corretamente via inline style.
- **Data atualizada** — `topbar.date` atualizado para `// maio · 2026` (EN: `// may · 2026`) em ambos os dicionários de conteúdo.

### 03 mai 2026 — Dark Mode

- **Dark Mode System** — Sistema de temas light/dark implementado no docs-site com paleta "atelier at night" (Bicofino Cores Especiais). Background: caffè `#33111a`, texto primário: crema `#f3ebd4`, texto secundário: champagne `#d8d7d3`, superfícies: cacao translúcido.
- **ThemeProvider + useTheme** — Contexto React em `src/content/theme.tsx`. Persiste em `localStorage` (`bf-theme`). Script anti-FOUC inline em `layout.tsx` restaura o tema antes do paint — sem flash de conteúdo.
- **ThemeToggle** — Botão Moon/Sun (Lucide, stroke 1.5) inserido na barra inferior do Sidebar, ao lado do `LanguageSwitcher`. Sem box, hover sutil, 150ms ease-out.
- **CSS semantic tokens** — `globals.css` recebeu camada de tokens semânticos (`--bf-bg-page`, `--bf-surface`, `--bf-surface-subtle`, `--bf-text-primary`, `--bf-text-secondary`, `--bf-text-subtle`, `--bf-border`, `--bf-border-strong`, `--bf-pill-bg`, `--bf-sidebar-bg`, etc.). Override completo em `[data-theme="dark"]`. Transição 200ms ease-out ativada somente após `data-theme-loaded` (sem animação no carregamento inicial).
- **Dual-use color pattern** — Objetos `C` em todos os componentes atualizados para referenciar CSS vars nos tokens semânticos. `PALETTE` separado em `page.tsx` para exibição de swatches de cor (valores fixos da paleta, independentes do tema).
- **Componentes atualizados** — `globals.css`, `layout.tsx`, `ClientProviders.tsx`, `Sidebar.tsx`, `page.tsx`, `BrandSystem.tsx`, `OnFieldSection.tsx`, `OperationsSection.tsx`, `MetricCard.tsx`, `PerformanceChart.tsx`, `IconGrid.tsx`, `AthleteStatCard.tsx`, `AthleteCampaignCarousel.tsx`.

### 03 mai 2026
- **Topbar Editorial Refinement** — A topbar do docs-site foi refinada para um padrão "quiet luxury". Remoção de altura fixa substituída por padding (24px verticais), alinhamento vertical e responsividade aprimorados via flex-wrap. O texto da topbar agora exibe "Bicofino · Brand System · V1.0" com ajustes finos de fontWeight e color para criar uma hierarquia sutil.
- **i18n — Brand System** — Suporte bilíngue (PT-BR / EN) implementado em todas as 6 seções do Brand System: Cover, Índice, Fundamentos, Posicionamento, Núcleo da Marca e Universo Verbal. Conteúdo extraído para `brandSystemContent.ts` (objeto `bsContent` com chaves `br` e `en`). Cada componente de seção foi patchado com `useLang()` — sem reescrita completa do arquivo. O componente `P` agora usa atributo `lang` dinâmico. Build TypeScript passou limpo; deploy via push para `main` (commit `61a30f8`).

### 02 mai 2026
- **i18n & Localization** — Suporte bilíngue (PT-BR e EN) 100% implementado nas seções `OperationsSection` e `OnFieldSection`. Extração de ~130 strings hardcoded para os dicionários (`br.ts` e `en.ts`) utilizando o hook `useLang()`.
- **Git & Repositório** — Repositório git inicializado localmente. Configuração do `.gitignore` para excluir adequadamente os repositórios aninhados (`apps/storybook/`) e diretórios locais pesados (`AI-OS-BASE/`, `assets Bicofino/`, `legacy/`, `bicofino/`).
- **Deploy & Vercel Fix** — Resolução de falha crítica no build do Vercel que tentava copiar pastas recursivamente devido a symlinks absolutos criados no Mac. O symlink de assets no `docs-site` foi substituído por uma cópia física da pasta, estabilizando o deploy de produção no Vercel.

### 01 mai 2026
- **DESIGN.md · Typography** — Playfair Display removida do sistema. Par tipográfico canônico agora é Inter + JetBrains Mono.
  - Inter: display, body, UI (~95% do sistema)
  - JetBrains Mono: metadata, eyebrows, legendas, índices, código (~5%)
- **CLAUDE.md** — regra de tipografia atualizada para refletir o novo par de fontes.
- **Editorial Typography** — Inseridas regras de `text-wrap: balance` (para títulos) e `text-wrap: pretty` (para parágrafos) nos CSS globais. Especificações adicionadas ao `DESIGN.md`.
- **Docs-Site & Storybook CSS** — Criação da utilitária `.editorial-prose` para forçar max-width (720px) e line-height (1.75) otimizados. Auto-hifenização removida para os blocos de texto.
- **Brand System Component** — Ajustes no layout da página: título "Brand System" em caixa alta/baixa, inclusão da versão display do Logo, e nova formatação para o subtítulo usando JetBrains Mono.
- **Índice (Docs-Site)** — Refatoração do grid para exibir 1 coluna com fontes JetBrains Mono em caixa alta e baixa nos subitens.
- **Motion (Docs-Site)** — Adição de transição suave de abertura/fechamento (`ease-out`) no componente `AccordionItem` através de manipulação de `grid-template-rows`.
- **Operações (Docs-Site)** — Criado o novo componente `OperationsSection.tsx` implementando a Arquitetura de Marca (On Pitch, Off Pitch, Club), Princípios, Ferramentas e Política Comercial. A seção foi inserida no `page.tsx`, assumindo a posição 06 e renumerando Governance para 07. Resolvidos bugs de parse (SWC) no componente.

---

### 09 mai 2026 — Fase 2B — Páginas de conteúdo apps/web

- **foundation implementado** — eyebrow `// fundamentos`, heading "Connect. Curate. Create. Consult.", intro, grid 2×2 (Connect / Curate / Create / Consult), closing "Unlike Any Other." Inclui Header + MobileMenu + Footer.
- **on-field implementado** — eyebrow `// on pitch`, heading "The Athlete Is the Asset.", intro, 4 serviços em lista vertical separada por borders (Agenciamento, Performance, Internacional, Marca Pessoal), closing "Do Brasil para o mundo."
- **off-field implementado** — eyebrow `// off pitch`, heading "Image. Connection. Legacy.", intro, 5 serviços (Branding, Advertising, Conexão de Marcas, Wealth, PR), closing "Unlike Any Other."
- **club criado** — tela de acesso fullscreen sobre `--bf-power-black`. Logo branco (CSS filter), 2 inputs controlados (acesso + senha), botão "Entrar" sem auth, link "← voltar" para /, rodapé "// members only". SEM Header/Footer globais.
- **Footer** — ícone CLUB linkado para `/club` (href="#" → href="/club").
- **i18n** — 50+ chaves novas em BR, EN e IT cobrindo todos os textos das 4 páginas + club access.
- **Build** — tsc limpo, zero erros TypeScript. 6 rotas estáticas geradas.
- **Commit** — `1408196` · feat(web): fase 2B — foundation, on-field, off-field, club + fix build.

### 09 mai 2026 — fix(web): build destravado — Fase 2B

- **Causa raiz** — imports diretos de ESM (`lucide-react/dist/esm/icons/...`) em `Footer.tsx`, `Header.tsx` e `MobileMenu.tsx` não têm declarações TypeScript (`.d.ts`). A type check do webpack falhava silenciosamente, travando o build. O Turbopack dava `os error 60 (ETIMEDOUT)` por interferência do Spotlight/XProtect do macOS escaneando `node_modules` recém-instalado — issue de I/O de OS, não de código.
- **Fix aplicado** — revertido para `import { MapPin, Instagram } from 'lucide-react'` (named imports) em todos os 3 componentes. `optimizePackageImports: ['lucide-react']` em `next.config.ts` garante tree-shaking. Script `build` alterado para `next build --webpack` (webpack: node.js file reader, sem ETIMEDOUT macOS).
- **next.config.ts** — adicionado `outputFileTracingRoot` + `optimizePackageImports`. Elimina warning de workspace root múltiplo.
- **Versões** — Next.js 16.2.4 · React 19.2.4 · motion ^12.12.1 · lucide-react ^0.511.0
- **Build local** — Exit 0. 6 rotas estáticas: `/`, `/_not-found`, `/club`, `/foundation`, `/off-field`, `/on-field`. Smoke test 5/5 → HTTP 200.
- **Produção Vercel** — https://bicofino-web.vercel.app · 5/5 rotas → HTTP 200

---

## Comandos rápidos

```
npm run docs       → docs-site (localhost:3001)
npm run storybook  → storybook (localhost:6006)
npm run web        → apps/web  (localhost:3002)
```

---

### 08 mai 2026 — apps/web — Primeira versão do site público

- **Novo app criado** — `apps/web` inicializado como site público `bicofino.com`. Stack: Next.js 16.2.4 (App Router, Turbopack), React 19, TypeScript strict, CSS Modules + custom properties, `motion` v12, `lucide-react`.
- **Porta 3002** — `npm run web` no root inicia o dev server. `npm run web` → `cd apps/web && npm run dev`.
- **Token mapping web** — `--bf-bg-page` = `#ffffff` (branco, header), `--bf-surface` = `#f2f8ff` (hero/footer). Invertido em relação ao docs-site para refletir a intenção visual do site público. `--bf-accent` = `#bfa37a` definido.
- **i18n BR/EN/IT** — `content/br.ts`, `content/en.ts`, `content/it.ts`, `content/index.ts`. Namespaces: `nav`, `home`, `footer`. Padrão idêntico ao docs-site. Persiste em localStorage (`bf-lang`). `lang` do `<html>` atualiza dinamicamente.
- **Componentes criados**:
  - `components/primitives/Container.tsx` — max-width 1280, padding `--bf-space-lg`
  - `components/layout/Header.tsx` — logo + nav desktop + hamburger mobile
  - `components/layout/Footer.tsx` — 2 linhas: endereço/Club e email/Instagram/copyright/lang switcher
  - `components/layout/MobileMenu.tsx` — overlay desce de cima (240ms), focus trap, ESC fecha, links com stagger 40ms
  - `components/home/FourCsHeading.tsx` — 4Cs em Inter 700 com fade-up stagger via `motion`, IntersectionObserver
  - `components/home/HeroBlock.tsx` — grid 3 colunas desktop, 2 colunas tablet, 1 coluna mobile; vídeo + 4Cs + Mensch
- **Páginas placeholder** — `/foundation`, `/off-field`, `/on-field` (route group `(sections)`) com "Em breve." e link de retorno.
- **Acessibilidade** — `role="dialog"`, `aria-modal`, focus trap no MobileMenu. `aria-hidden="true"` no vídeo. `aria-label` em todos os ícones standalone. `:focus-visible` com `--bf-accent`.
- **SEO** — `metadata` com `metadataBase: https://bicofino.com`, OG title/description/image, favicon.
- **Build** — Compilado com sucesso (Next.js 16 / Turbopack). TypeScript limpo, zero erros. 5 rotas estáticas geradas.
- **Assets manuais pendentes** — `public/brand/logo-bicofino.svg`, `icon-diamond-bicofino.svg`, `icon-club.svg`; `public/media/herovideo.webm/.mp4`; `public/og-image.png`, `favicon.ico`.
- **Root package.json** — `install:web` adicionado; `install:all` atualizado para incluir web.
