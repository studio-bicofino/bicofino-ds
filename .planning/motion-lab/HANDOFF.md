# HANDOFF — Bicofino Motion Lab

> Atualizado: 2026-06-09 · Status: **v0.1 em prod, aguardando sessão de escolha**

## O que é

Biblioteca viva de experimentos de motion — **zona franca** onde as regras de duração do
`DESIGN.md` §8 ficam deliberadamente suspensas para experimentar. Tokens de cor/tipo
continuam valendo (nenhuma cor fora do set). Nasceu da discussão no grupo da Vanguarda
(GSAP, Lenis, motion.dev, grids.obys.agency, wantedfornothing.com, madness.ai).

- **App**: `apps/motion-lab` · porta **3050** · `npm run motion-lab` na raiz
- **Prod**: ver seção Deploy abaixo
- **Stack**: Next 16 + React 19 · GSAP 3.13+ (100% gratuito pós-Webflow, todos os plugins)
  · `@gsap/react` (useGSAP) · Lenis · `useTuner` próprio (substituto do Leva, que não roda
  em React 19)

## O pipeline (o contrato deste projeto)

```
referência (Vanguarda, awwwards, motion.dev)
  → experimento numerado no lab (status: rascunho)
  → sessão de escolha com Woney (tunar valores no painel, aprovar/descartar)
  → receita nomeada MO-xx no DESIGN.md §8 (status: aprovado → canonizado)
  → primitive em packages/design-system + demo no docs-site
  → uso nos apps
```

**Nada entra nos apps direto do lab.** O `bicofino-motion-curator` não audita o lab —
audita o que graduar dele. Proposta pendente de formalização no §8: terceira camada de
motion ("narrativa/scroll-driven" — scrub = o usuário é a timeline), ao lado de micro
(120/200/360ms) e ambient (M-01).

## Os 11 experimentos (todos `rascunho`)

| EXP | Título | Libs | Referência |
|---|---|---|---|
| 01 | Split Text Reveal | SplitText | grids.obys.agency |
| 02 | Scroll Pin — Capítulos | ScrollTrigger | wantedfornothing.com |
| 03 | DrawSVG — Grafismo Técnico (M-01 "wires forming") | DrawSVG | DESIGN.md §8 |
| 04 | Scramble — Micro-type Mono (M-01 "micro-type forming") | ScrambleText | DESIGN.md §8 |
| 05 | Lenis — Smooth Scroll + Parallax | Lenis + ScrollTrigger | lenis.dev |
| 06 | Flip — Grade com Filtro | Flip | — |
| 07 | Blur Reveal — Abertura | SplitText + filter blur | wantedfornothing.com/vibes |
| 08 | Gotham Impact — Heavy/Light (KERCHNER) | SplitText | DESIGN.md §6 |
| 09 | Grafismo Segue-Mouse (quickTo, 3 camadas) | gsap.quickTo | madness.ai |
| 10 | Card Stack — Pilha no Scroll | ScrollTrigger | madness.ai |
| 11 | iPhone Showcase — 7 Stories reais, 3 modos (catavento/cascata/esteira) | ScrollTrigger | madness.ai + card-jogos-motion |

## Como adicionar um experimento (receita de 2 passos)

1. Entrada em `src/lib/registry.ts` (slug, tags, libs, status `rascunho`).
2. `src/app/experiments/<slug>/page.tsx` (`'use client'`), envolvido em
   `<ExperimentShell slug="...">`, parâmetros via `useTuner`, animação em
   `useGSAP({ scope, dependencies: [...values, replay], revertOnUpdate: true })`.

Detalhes no `apps/motion-lab/README.md`.

## Decisões tomadas

- **Leva → `useTuner`** (`src/components/Tuner.tsx`): Leva está sem manutenção e quebra
  com React 19; painel próprio em mono dark com ↻ replay.
- **Gotham self-hosted** no lab: woff2 copiadas do docs-site (300 + itálico, 700, 900),
  token `--bf-font-impact`.
- **Vídeos do EXP-11 VERSIONADOS** (`public/showcase/card-01..07.mp4`, ~26MB, maior 6,5MB)
  — precedente dos `.webm` do apps/web: mídia pequena viaja no repo p/ deploy-via-git e
  iMac. Origem: `AI-OS-BASE/05_projects/bicofino/card-jogos-motion/Export` (rodada
  11–17/jun: Guilherme ×3, Julio ×2, Jean, Ronaldo).
- **Acento randomizado** por refresh sobre subset de 9 Highlights legíveis em dark.
- `next.config.ts` só aplica `turbopack.root` quando detecta a raiz do monorepo —
  permite build standalone na Vercel.

## Caveats conhecidos

- EXP-01/04/07: flash do texto final antes do JS montar (aceitável em lab; resolver se graduar).
- EXP-07 anima `filter: blur()` — custa GPU; reservar a aberturas.
- EXP-11 modo esteira: 14 `<video>` simultâneos (duplicata p/ loop seamless). Se graduar
  p/ site público: pôster estático + play on hover, ou `.webm`.
- EXP-09: mudar tuner recria os quickTo (grafismo recentra até o próximo mouse move).

## Deploy

- Projeto Vercel: `motion-lab` no time **studio-bicofinos-projects** (CLI da pasta
  `apps/motion-lab`, `.vercel/project.json` local). Deploy: `vercel --prod --yes`.
- URL prod: **https://motion-lab-studio-bicofinos-projects.vercel.app** (primeiro deploy
  2026-06-09, ● Ready). Responde 401 sem login Vercel do time — é o SSO default.
- Proteção de deployment do time (SSO) fica no default; abrir ao público só se Woney pedir
  (mesmo fluxo REST usado no casa-nostra).

## Próximos passos

1. **Sessão de escolha** — Woney navega, tuna e marca aprovados (com os valores do tuner).
2. Emenda do **§8 do DESIGN.md**: camada "narrativa" + receitas **MO-xx** dos aprovados
   (mostrar tradeoff antes, regra do enrichment loop).
3. Primitives em `packages/design-system` + demos no docs-site para os canonizados.
4. Continuar acrescentando referências do grupo da Vanguarda como novos EXPs.
