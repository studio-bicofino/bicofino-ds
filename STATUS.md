# Bicofino DS — Status

Atualizado em: 04 mai 2026 (theme controls refactor)

---

## Monorepo

- apps/docs-site → Next.js, roda em localhost:3001
- apps/storybook → Storybook, roda em localhost:6006
- packages/design-system → tokens.css, tokens.ts, Tokens.stories.tsx

---

## Componentes existentes no docs-site

### 01 · Foundations
- [x] Color Palette (Core + Special)
- [x] Typography
- [x] Slash Heading (Lead / Slash / Echo)
- [x] Spacing & Motion

### 02 · Brand
- [x] Logotype
- [x] Voice & Tone
- [x] Verticals

### 03 · Components
- [x] Buttons
- [x] Badges
- [x] Forms
- [x] Cards (editorial, result, campaign)

### 04 · On Field
- [x] Athlete Image System

### 05 · Performance
- [x] Motion Intelligence (métricas animadas)
- [x] Icons

### 06 · Operações
- [x] Arquitetura de Marca
- [x] Padrões de Entrega
- [x] Ferramentas de Operação
- [x] Fluxo de Entrega e Política Comercial

### 07 · Governance
- [x] Version & Owners
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
