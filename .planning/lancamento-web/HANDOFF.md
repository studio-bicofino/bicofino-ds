# HANDOFF — Lançamento Web (apps/web)

> Estado vivo da frente "lançamento oficial". Ler junto com `BRIEFING.md`.
> Última atualização: **2026-06-05** (Frente C — Intro Motion entregue).

## Onde estamos

| Frente | Status |
|--------|--------|
| **A — Legal** (cookie-light, políticas BR/EN/IT, aviso de cookies) | ⬜ não iniciada |
| **B — SEO** (robots/sitemap/JSON-LD/metadata/OG/manifest + Search Console) | ⬜ não iniciada |
| **C — Intro Motion** (sistema de variantes random) | ✅ **entregue 2026-06-05** |

Ordem sugerida no briefing era SEO → Legal → Intro, mas o Woney puxou a Intro primeiro
(a mais criativa, iterada ao vivo). **Próximo passo natural: Frente B (SEO)**, alto impacto, sem risco.

## Frente C — o que foi construído

**Sistema de intro com 5 variantes**, sorteado 1×/sessão, como exceção sancionada no DESIGN.md (§8 + §11).

### Arquivos
- `apps/web/components/intro/Intro.tsx` — orquestrador: decide skip (reduced-motion / sessão),
  sorteia variante (override `?intro=`), monta overlay. SSR mostra um preto liso (pré-decisão) → zero flash.
- `apps/web/components/intro/shared.ts` — contrato `VariantProps`, `OVERLAY_BASE`, `POWER_BLACK`, eases.
- `apps/web/components/intro/variants/`
  - `StarSpin.tsx` — estrela (sparkle do logo) gira + escala como janela na máscara.
  - `Glitch.tsx` — blocos irregulares (linhas de altura aleatória × segmentos), jitter + saída caótica.
  - `SplitScreen.tsx` — duas metades + costura `--bf-accent` partem do centro.
  - `Fragments.tsx` — subdivisão recursiva BSP → cacos fractais caindo com gravidade (ease-in).
  - `RainDrops.tsx` — gotas/lago: máscara de discos (reveal, `ease-in` atrasado) + anéis de ripple outline
    (trem concêntrico + secundários propagantes, `ease-out`). Pior-caso ~3.0s.
- `apps/web/components/home/HeroBlock.tsx` — recebe `revealed`, orquestra cascata vídeo→4Cs→texto.
- `apps/web/components/home/FourCsHeading.tsx` — aceita `start`/`baseDelay`; cai no IntersectionObserver standalone.
- `apps/web/app/page.tsx` — estado `revealed`; `<Intro onReveal={...}>` no topo.
- `apps/web/app/layout.tsx` — `<noscript>` esconde overlay + força `.bf-reveal{opacity:1}` (no-JS safe).

### Mecânica de revelação
Overlay `--bf-power-black` em `position:fixed; zIndex:9999; pointerEvents:none`. Cada variante começa
100% preta e chama `onComplete` quando o preto some → desmonta o overlay e dispara `onReveal` → a
home seta `revealed=true` → cascata de entrada do hero. **Conteúdo sempre renderiza por baixo** (SEO/LCP intactos).

> ⚠️ Aprendizado: NUNCA disparar `onComplete` via um `motion` com `initial===animate` (ex. `opacity:0→0`).
> O framer-motion pula a animação e dispara `onAnimationComplete` na hora → overlay desmonta no 1º frame
> (parecia "imperceptível"). Amarrar sempre ao elemento real que termina por último.

### Como testar
`npm run web` (porta 3002) e abrir `http://localhost:3002/?intro=<variante>`. Override ignora o guard de
sessão (reload re-executa). `<variante>` = `star|glitch|split|fragments|rain|random`. Em dev, o console
loga `[intro] variant: …` no sorteio.

### Regras / canon
- DESIGN.md §8 ganhou a subseção **"Sanctioned exception — the brand intro"** + linha no §11.
  É a ÚNICA parte do sistema onde motion pode entrar de `scale(0)`/`r=0`. Não vazar pra UI de produto.
- Auditado pelo `bicofino-motion-curator`: variantes limpas/cobertas; hero clampado ao registro calmo
  (durações ≤360ms, stagger 55–70ms, translate 8–12px) mantendo a coreografia via delays.

## Pendências do contrato (Frentes A e B)
Ver checklists no `BRIEFING.md`. Resumo do que falta pro lançamento oficial:
- **SEO:** `app/robots.ts`, `app/sitemap.ts`, JSON-LD Organization, metadata completo (metadataBase,
  hreflang BR/EN/IT, OG/twitter), `manifest.ts` + favicons (estrela). Guia do Search Console pro Woney.
- **Legal:** auditar coleta de dados → Política de Privacidade + Cookies BR/EN/IT + aviso informativo
  dismissível. Marcar onde jurídico deve revisar (GDPR/Itália).

## Deploy
`apps/web` é git-connected na Vercel da empresa (`studio-bicofinos-projects/bicofino-web`),
deploy automático no push do `main` (rootDirectory `apps/web`). `npm run sync` commita+pusha.
