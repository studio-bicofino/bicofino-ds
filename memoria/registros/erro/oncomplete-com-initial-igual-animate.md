---
tipo: erro
titulo: framer-motion dispara onAnimationComplete na hora se initial === animate — intro desmontava no 1º frame
data: 2026-06-05
projetos: [lancamento-web, apps-web]
fontes: [.planning/lancamento-web/HANDOFF.md]
status: vigente
tags: [framer-motion, motion, bug, intro]
---

Na construção da intro de marca, o `onComplete` (que desmonta o overlay preto e dispara
a cascata do hero) estava amarrado a um elemento `motion` cujo `initial` era igual ao
`animate` (ex.: `opacity: 0 → 0`). O framer-motion **pula** a animação nesse caso e
dispara `onAnimationComplete` imediatamente → o overlay desmontava no primeiro frame e
a intro parecia "imperceptível". O bug é silencioso: nada quebra, a animação só "não
acontece".

Regra extraída: **nunca** amarrar `onComplete`/`onAnimationComplete` a um elemento cujos
valores inicial e final podem coincidir. Amarrar sempre ao elemento real que termina por
último na coreografia — aquele cuja animação efetivamente roda.

Contexto da mecânica (para entender futuros bugs parecidos): o overlay da intro é
`position:fixed` em `--bf-power-black`, o conteúdo SEMPRE renderiza por baixo (SEO/LCP),
e é o `onComplete` da variante que desmonta o overlay e seta `revealed=true` na home.
Um disparo prematuro quebra toda a cascata vídeo → 4 Cs → texto.
