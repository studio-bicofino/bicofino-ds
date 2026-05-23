# docs-site — Responsive Fix + Dark Mode Logo Invert

**Branch:** `experiment/video-hero`
**Status:** ✅ Implementação concluída · aguardando preview
**Data:** 2026-05-23

---

## Problemas reportados

1. **Scroll horizontal lateral** nas páginas em mobile (visível em ~375–414px). Screenshot: página de tipografia (Inter / JetBrains Mono).
2. **Logos pretos invisíveis no dark mode** na página de perfil de atleta (Guilherme Kerchner): Palmeiras, Nike sponsor, wordmark "Guilherme + Kerchner", badges Bicofino circulares.

---

## Delegação

| Agente | Escopo | Status |
|---|---|---|
| `Responsive QA / Layout Doctor` | Eliminar overflow horizontal em todas as páginas do docs-site, preservando direção editorial. | ✅ Concluído |
| `ds-dev` | Inverter logos pretos para branco em dark mode no OnFieldSection, sem afetar elementos coloridos. | ✅ Concluído |

---

## 1. Responsive Fix

### Causas raiz
- `H_PAD = 72` hard-coded em 13 arquivos → 144px de padding lateral fixo comendo a viewport mobile.
- `design-system/page.tsx:443` — `// bicofino.com` em 36px mono dentro de card estreito.
- `design-system/page.tsx:429` — specimen "Bicofino" em 72px fixo.
- `globals.css:719` — `.bf-type-scale-grid min-width: 480px` sem override mobile.
- `SiteFooter.tsx:23` — grid `200px 1fr 240px` (= 440px mínimo).
- `TopBar.tsx:85` — metadata com `whiteSpace: nowrap` (~280px sem quebra).
- `layout.tsx` — body com `overflow:hidden`, mas `#main-content` sem clip horizontal.

### Correções aplicadas
- `H_PAD` → `clamp(16px, 5vw, 72px)` (idêntico ≥1440, reduz progressivo abaixo).
- `globals.css` — `html, body, #main-content { overflow-x: clip; min-width: 0 }`.
- `.bf-type-scale-grid` — colapsa para 2 colunas em mobile.
- Specimens tipográficos com `clamp()` + `wordBreak: break-all` / `overflowWrap: anywhere`.
- `SiteFooter` — `repeat(auto-fit, minmax(min(220px,100%), 1fr))`.
- `TopBar` — `flexWrap: wrap, minWidth: 0`, sem `nowrap`.

### Arquivos alterados (13)
`apps/docs-site/src/app/globals.css`
`apps/docs-site/src/app/{design-system,componentes,consigliere,governanca,brand,verticais,assets,start-here}/page.tsx`
`apps/docs-site/src/components/{SiteFooter,TopBar,OperationsSection,BrandSystem}.tsx`

### Breakpoints validados
1440 · 1280 · 1024 · 834 · 768 · 430 · 390 · 375

---

## 2. Dark Mode Logo Invert

### Arquivo alterado
`apps/docs-site/src/components/OnFieldSection.tsx`

### Estratégia
`filter: invert(1)` aplicado via `style` quando `isDark === true` (hook `useTheme`). Escolhido vs. `currentColor` porque o app usa styling inline (sem `dark:` Tailwind) e SVGs externos não suportam swap de fill.

### Aplicado em
- Wordmark "GUILHERME + KERCHNER" (// PERSONAL BRANDS)
- Logo Palmeiras (// PALMEIRAS // BRASIL)
- Logo Nike sponsor (// SPONSORS)
- Badges circulares `badgePro` e `badgeDay`

### Preservado (não invertido)
- `badgeFc` (FC Bicofino — vinho/cream)
- Bandeira do passport (Itália)
- Portrait do atleta
- `AthleteCampaignCarousel`
- Stats cards e ícones lucide

---

## Riscos a observar no preview

1. `overflow-x: clip` no `#main-content` pode truncar silenciosamente colunas largas em tabelas editoriais (`governanca`, `brand voice`). Sweep nas mais visitadas.
2. TypeScale grid colapsada em 2 colunas no mobile — confirmar hierarquia.
3. `H_PAD` é idêntico a 72px ≥1440 — sem regressão desktop esperada.
4. TopBar pode quebrar título em 2 linhas em ~340px (intencional).
5. Páginas atualizadas mecanicamente (verticais, assets, start-here, consigliere) — quick visual sweep no preview.

---

## Próximos passos

- [ ] Preview local em `http://localhost:3001` — validar páginas-chave (design-system, on-field do Kerchner, governança, brand, footer).
- [ ] Validar dark mode + light mode toggle no perfil do atleta.
- [ ] Após OK do usuário: commit + deploy.
