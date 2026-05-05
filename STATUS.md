# Bicofino DS — Status

Atualizado em: 05 mai 2026 (Verticais movida de 03 • BRAND para 05 • VERTICAIS)

---

## Monorepo

- apps/docs-site → Next.js, roda em localhost:3001
- apps/storybook → Storybook, roda em localhost:6006
- packages/design-system → tokens.css, tokens.ts, Tokens.stories.tsx

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
- [x] Tipografia
- [x] Heading (Slash Heading — Lead / Slash / Echo)
- [x] Spacing & Motion

### 03 • Brand
- [x] Logotipo
- [x] Voz & Tom

### 04 • Componentes
- [x] Botões
- [x] Badges
- [x] Forms
- [x] Cards (editorial, resultado, campanha)

### 05 • Verticais
- [x] Verticais (// 05.1)
- [x] On Field — Image System (// 05.2)

### 06 • Assets
- [x] Motion Intelligence (métricas animadas)
- [x] Sponsors (carrossel duplo infinito)
- [x] Icons

### 07 • Operações
- [x] Arquitetura de Marca (On Field / Off Field / Club)
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

- main → estado estável do DS
- experiments/athlete-profile → (criar antes de começar os novos componentes)

---

## Changelog

### 05 mai 2026 — Suporte ao Italiano (IT) — i18n trilíngue

- **Novo idioma** — Italiano adicionado ao sistema de linguagem. Switcher exibe `EN  •  BR  •  IT`.
- **Arquivo criado** — `apps/docs-site/src/content/it.ts` — dicionário completo com ~200 chaves traduzidas para o italiano. Cobertura total de todos os namespaces: topbar, colors, typography, spacing, brand, voice, verticals, components, sidebar, footer, on-field, operations, performance, governance, resources.
- **`content/index.ts`** — `Lang` extendida para `'br' | 'en' | 'it'`; `it` adicionado ao map de dicionários; localStorage aceita e persiste `'it'`.
- **`LanguageSwitcher.tsx`** — IT adicionado; cada idioma tem cor de active pill própria: EN → `--bf-como` (#0d8aff), BR → `--bf-sep` (#2fd298), IT → `#ed0007` (benfica — sem novo token CSS).
- **`BrandSystem.tsx`** — `toBsLang()` adicionado para fazer IT → EN no conteúdo longo do BrandSystem (sem tradução completa do brandSystemContent.ts neste passo); atributo HTML `lang` atualizado para `'it'` quando italiano.
- **Zero mudança visual** — Layout, dark mode, sidebar, mobile drawer 100% preservados. Única mudança visual intencional: cor do pill ativo do IT.
- **TypeScript** — Tipagem limpa, sem erros.
- **Build** — Compilado com sucesso (Next.js 16 / Turbopack).
- **Deploy** — Produção: https://bicofino.vercel.app · Commit `{SHA}`

### 05 mai 2026 — Verticais movida para 05 • VERTICAIS

- **Refactor estrutural** — Seção "Verticais" removida de `// 03 • BRAND` e inserida como primeiro item de `// 05 • VERTICAIS`.
- **Sidebar atualizado** — `// 03 • BRAND` agora tem apenas Logotipo e Voz & Tom. `// 05 • VERTICAIS` agora tem Verticais (primeiro) e On Field — Image System (segundo).
- **Renumeração** — Eyebrow da seção Verticais: `// 03.3` → `// 05.1`. Cards internos: `// 03.3.1` → `// 05.1.1`, `// 03.3.2` → `// 05.1.2`. Eyebrow do On Field: `// 05.1` → `// 05.2`. Sub-item catalog: `// 05.1.2` → `// 05.2.2`.
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
  - `// 04 · On Field` → `// 05.1 · On Field — Image System`
  - `// 05.x` (perf/sponsors/icons) → `// 06.1–06.3`
  - `// 06.x` (ops) → `// 07.x`; `// 07.x` (governance) → `// 08.x`
- **Deploy** — Produção: https://bicofino.vercel.app · Build READY · Commit `ab1bfa1`

### 05 mai 2026 — Icons — Custom SVGs On-Field

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
- **Estrutura de 8 seções** — Adicionadas: `01 • Brand System` (antes sem número), `07 • Operações` (nova). Renomeadas: `Foundations → Design System`, `On Field → Verticais`, `Performance → Assets`, `Governance → Governança`. Items em PT-BR: Botões, Voz & Tom, Cores, Tipografia, Heading, Universo Visual.
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
- **Operações (Docs-Site)** — Criado o novo componente `OperationsSection.tsx` implementando a Arquitetura de Marca (On Field, Off Field, Club), Princípios, Ferramentas e Política Comercial. A seção foi inserida no `page.tsx`, assumindo a posição 06 e renumerando Governance para 07. Resolvidos bugs de parse (SWC) no componente.

---

## Comandos rápidos

```
npm run docs       → docs-site (localhost:3001)
npm run storybook  → storybook (localhost:6006)
```
