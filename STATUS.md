# Bicofino DS — Status

Atualizado em: 02 mai 2026

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
