# Bicofino Motion Lab

Zona franca de experimentação de motion — porta **3050**.

Aqui as regras de duração do `DESIGN.md` §8 estão **deliberadamente suspensas** para
experimentar. Tokens de cor e tipo continuam valendo: nenhuma cor fora do set, Inter +
JetBrains Mono. O `bicofino-motion-curator` **não audita este app** — ele audita o que
graduar daqui para os apps.

## Pipeline de curadoria

```
referência (Vanguarda, awwwards, motion.dev)
  → experimento numerado aqui (status: rascunho)
  → sessão de escolha com Woney (tunar no painel, aprovar/descartar)
  → receita nomeada MO-xx no DESIGN.md §8 (status: aprovado → canonizado)
  → primitive em packages/design-system + demo no docs-site
  → uso nos apps
```

Nada entra nos apps direto daqui.

## Stack

- **GSAP 3.13+** — desde a aquisição pela Webflow, 100% gratuito incluindo todos os
  plugins (SplitText, DrawSVG, ScrambleText, Flip, MorphSVG…)
- **@gsap/react** — `useGSAP` (cleanup automático via context)
- **Lenis** — smooth scroll, integrado ao ScrollTrigger
- **`useTuner`** (`src/components/Tuner.tsx`) — painel próprio de tunagem ao vivo
  (substituto leve do Leva, que não roda em React 19)

## Como rodar

```bash
npm install     # primeira vez
npm run dev     # http://localhost:3050  (ou `npm run motion-lab` na raiz)
```

## Como adicionar um experimento

1. Registrar em `src/lib/registry.ts` (slug, tags, libs, status `rascunho`).
2. Criar `src/app/experiments/<slug>/page.tsx` (`'use client'`), envolvido em
   `<ExperimentShell slug="...">`, com parâmetros tunáveis via `useTuner` e animação
   dentro de `useGSAP({ scope, dependencies: [...values, replay], revertOnUpdate: true })`.
3. Aprovou? Atualizar o `status` no registry e propor a receita MO-xx no DESIGN.md.
