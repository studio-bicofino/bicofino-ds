# HANDOFF — Bicofino Motion Lab

> Atualizado: 2026-06-13 · Status: **v0.2 — leva 3D/WebGL (Three.js) adicionada; aguardando sessão de escolha**

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
| 11 | iPhone Showcase — 6 Stories reais, 3 modos (catavento/cascata/esteira) | ScrollTrigger | madness.ai + card-jogos-motion |

Ajustes do EXP-11 após 1ª rodada de feedback (09/06): raio do catavento fecha até 100px
(phones se tocam no mínimo), cascata alinhada (sem rotação alternada nem escadinha),
vídeo em `object-fit: contain` (arte 9:16 inteira na tela 9:19.2, faixas naturalmente
pretas), Jean removido (6 phones; card-05.mp4 fora do repo).

## A leva 3D / WebGL — EXP 12–16 (13/06, ref. hubtown.co.in)

Varredura do **hubtown.co.in** + **/map** (Nuxt + **OGL** + **Theatre.js** + d3): tudo o que
aquele site faz — aproximação, zoom-in, câmera orbitando figura 3D, partículas, parallax de
profundidade, entrada com loader 0→100% — é **WebGL/3D**. O lab até então era 100%
GSAP/Lenis/SVG, sem uma linha de 3D. Esse era o vão. Introduzido **Three.js** (`three@0.171`
+ `@types/three`) — padrão da indústria, escolhido sobre OGL por manutenção/docs — orquestrado
com GSAP onde faz sentido. Construídos em paralelo (workflow ultracode, 5 agentes).

| EXP | Título | Libs | Técnica do Hubtown |
|---|---|---|---|
| 12 | Câmera Orbital + Figura 3D | three + OrbitControls | câmera girando, revela figura 3D (wireframe EdgesGeometry + 1 nó accent) |
| 13 | Dolly — Aproximação no Scroll | three + ScrollTrigger | dolly da câmera por corredor de anéis no scroll; névoa power-black; toggle dolly-zoom (vertigo) |
| 14 | Campo de Partículas | three (Points) | milhares de partículas à deriva + parallax de mouse; sprite redondo; ratio accent |
| 15 | Parallax de Profundidade 3D | three | paralaxe de câmera REAL (perspectiva): camadas de grafismo em Z distintos — irmão 3D do EXP-09 |
| 16 | Entrada Cinematográfica | three + gsap | loader 000%→100% → revela a cena com movimento de câmera (dolly/girar/subir); replayável pelo tuner |

Regras 3D que valem como receita pra qualquer EXP WebGL futuro (todas seguidas nos 5):
- **Cor por token em runtime**: nada de hex/rgb cru. Ler `getComputedStyle(documentElement)
  .getPropertyValue('--current-accent'|…).trim()` → `new THREE.Color(...)`. **One-vibrant**:
  só `--current-accent` é colorido; resto é steel/aluminium/line-on-dark sobre power-black.
- **Renderer** `alpha:true` (deixa o power-black do body aparecer) + `THREE.Fog` na cor
  power-black p/ profundidade. `setPixelRatio(min(dpr, 2))`.
- **Tuner ao vivo**: valores lidos no rAF via `valuesRef` (slider não recria a cena);
  **rebuild só em mudança estrutural** (count/figura) via dependência do `useEffect`.
- **Lifecycle completo**: `cancelAnimationFrame` + `ResizeObserver.disconnect` +
  `dispose()` de geometria/material/textura + `renderer.dispose()` + remove o canvas.
- **`prefers-reduced-motion`**: renderiza UM frame estático, sem loop/scrub/autorotate.

Verificação 13/06: `next build` ✓ (19 rotas, TS zerado), 5 rotas 200 no dev, sem hex cru,
checklist de convenções verde nos 5. **Validação VISUAL no browser ainda pendente** (WebGL
só roda client; build/SSR não exercita a cena) — entra na sessão de escolha.

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
- URL prod: **https://motion-lab-studio-bicofinos-projects.vercel.app** — **PÚBLICA**
  desde 2026-06-09 (ssoProtection desligada via REST, a pedido do Woney, p/ compartilhar
  com o grupo da Vanguarda).
- Proteção de deployment do time (SSO) fica no default; abrir ao público só se Woney pedir
  (mesmo fluxo REST usado no casa-nostra).

## Próximos passos

1. **Sessão de escolha** — Woney navega, tuna e marca aprovados (com os valores do tuner).
2. Emenda do **§8 do DESIGN.md**: camada "narrativa" + receitas **MO-xx** dos aprovados
   (mostrar tradeoff antes, regra do enrichment loop).
3. Primitives em `packages/design-system` + demos no docs-site para os canonizados.
4. Continuar acrescentando referências do grupo da Vanguarda como novos EXPs.
