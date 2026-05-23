# docs-site — Project Status

> Documento vivo de acompanhamento do `apps/docs-site`. Atualizar a cada mudança significativa: feature, fix, refactor visual, deploy.

**App:** Bicofino Brand & Design System docs
**URL produção:** _aguardando primeiro deploy via Vercel_
**Porta dev:** `3001` (via `pm2 start ecosystem.config.js --only docs` ou `npm run docs`)
**Branch atual:** `experiment/video-hero`
**Stack:** Next.js 16.2.6 (Turbopack) · React · Tailwind v4 · Tokens Bicofino · i18n BR/EN/IT · ThemeProvider (dark/light)

---

## Como usar este documento

A cada PR / commit relevante:
1. Adicione uma entrada em **Changelog** (topo) com data, escopo e arquivos-chave.
2. Atualize **Estado atual** se a forma de rodar / o stack / o conjunto de páginas mudou.
3. Mova itens de **Próximos passos** para **Changelog** quando concluídos.
4. Registre **Dívidas/Riscos** quando deixar algo intencional pendente.

Convenção de tags: `feat` · `fix` · `refactor` · `docs` · `perf` · `chore` · `deploy`.

---

## Estado atual

### Páginas
- `/` — home (perfil de atleta on-pitch / off-pitch)
- `/design-system` — tokens, cores, tipografia
- `/brand` — voz de marca
- `/governanca` — tabelas editoriais
- `/componentes` — biblioteca
- `/consigliere` — IA contextual
- `/verticais`, `/assets`, `/start-here`, `/operacoes`

### Componentes-chave
- `OnFieldSection.tsx` · `OperationsSection.tsx` · `BrandSystem.tsx`
- `TopBar.tsx` · `SiteFooter.tsx` · `Sidebar.tsx` · `SidebarController.tsx`
- `LanguageSwitcher.tsx` · `IconGrid.tsx` · `RevealObserver.tsx`

### i18n
BR (default/fallback) · EN · IT — strings em `src/content/{br,en,it}.ts`, switcher sem rotas.

### Dark mode
`useTheme` hook + tokens CSS semânticos. Toggle no `TopBar`.

---

## Changelog

### 2026-05-23 · fix · responsive overflow + dark mode logos
**Problemas:**
1. Rolagem horizontal lateral em mobile (375–414px) — visível na página de tipografia.
2. Logos pretos invisíveis no dark mode no perfil do atleta (Palmeiras, Nike sponsor, wordmark Kerchner, badges Pro/Day).

**Solução overflow:**
- `H_PAD` → `clamp(16px, 5vw, 72px)` em 13 arquivos (idêntico ≥1440, reduz progressivo).
- `globals.css` → `html, body, #main-content { overflow-x: clip; min-width: 0 }`.
- `.bf-type-scale-grid` colapsa pra 2 colunas em mobile.
- Specimens tipográficos com `clamp()` + `wordBreak: break-all` / `overflowWrap: anywhere`.
- `SiteFooter` → `repeat(auto-fit, minmax(min(220px,100%), 1fr))`.
- `TopBar` → `flexWrap: wrap, minWidth: 0`, sem `nowrap`.

**Solução dark mode logos:** `filter: invert(1)` via `useTheme` no `OnFieldSection.tsx`, aplicado em wordmark/Palmeiras/Nike/badges Pro+Day. Logo FC Bicofino, passport, portrait e campaign preservados (não invertidos).

**Arquivos:**
- `src/app/globals.css`
- `src/app/{design-system,componentes,consigliere,governanca,brand,verticais,assets,start-here}/page.tsx`
- `src/components/{OnFieldSection,SiteFooter,TopBar,OperationsSection,BrandSystem}.tsx`

**Validado:** 375 · 390 · 430 · 768 · 834 · 1024 · 1280 · 1440 · dark/light toggle.

**Chore lateral:** reinstalação de `@opentelemetry/api` (esm/trace corrompido bloqueava SSR).

---

## Próximos passos

- [ ] Sweep visual nas páginas atualizadas mecanicamente: `verticais`, `assets`, `start-here`, `consigliere`.
- [ ] Validar tabelas editoriais de `governanca` (`280px 1fr`) e `brand` (`160px 1fr`) em 375px — podem precisar de `bf-overflow-table` wrapper se ficarem cramped.
- [ ] Confirmar URL de produção no Vercel e registrar nesse doc.

---

## Dívidas / Riscos conhecidos

- **`overflow-x: clip` no `#main-content`:** silencia overflow em tabelas largas. Funcional, mas pode truncar conteúdo de coluna 2 em viewports estreitos sem aviso visual.
- **TypeScale grid mobile:** meta (size/lh) vai pra nova linha em mobile — intencional, mas confirma se hierarquia continua legível.
- **TopBar quebra em 2 linhas <340px:** intencional vs overflow anterior.
- **Páginas mecânicas:** `verticais`, `assets`, `start-here`, `consigliere` receberam `H_PAD` clamp sem revisão visual individual.

---

## Referências

- `DESIGN.md` (raiz do monorepo) — single source of truth de tokens e regras visuais.
- `CLAUDE.md` (raiz e `apps/docs-site/CLAUDE.md`) — instruções de projeto.
- `.planning/docs-site-responsive-darkmode-status.md` — status detalhado do fix 2026-05-23.
