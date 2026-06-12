---
tipo: decisao
titulo: Intro de marca do bicofino.com é só o star-spin — as outras 4 variantes foram apagadas
data: 2026-06-10
projetos: [lancamento-web, apps-web]
fontes: [.planning/lancamento-web/BRIEFING.md, .planning/lancamento-web/HANDOFF.md]
status: vigente
tags: [intro, motion, marca, design-md]
---

A abertura animada do bicofino.com nasceu (2026-06-04/05) como um sistema de 5 variantes
sorteadas por acesso — star, glitch, split, fragments, rain — com override de teste
`?intro=`. Em 2026-06-10 o Woney bateu o martelo: **só a estrela fica** (`StarSpin`,
~1s — a estrela Bicofino gira no eixo e o "buraco" escala em direção ao leitor).

Por quê: a estrela é o gesto que É a marca; as outras quatro eram efeito, não identidade.
Com uma única variante, o sorteio e o override `?intro=` perderam função e foram removidos
do `Intro.tsx`; os arquivos `Glitch/SplitScreen/Fragments/RainDrops.tsx` foram apagados
(recuperáveis no git history, commits até `6bad006`).

Alternativa descartada: manter o sistema random de variantes (decisão original de 04/06,
agora superada por esta).

A intro segue como **exceção sancionada no DESIGN.md §8 + §11** (precedente: loop ambiente
M-01): é o ÚNICO lugar do sistema onde motion pode entrar de `scale(0)`/`r=0`. O §8 nomeia
o star-spin como abertura única, com nota histórica das 5 variantes prototipadas. Não vazar
o gesto para UI de produto. Salvaguardas mantidas: `prefers-reduced-motion` pula tudo;
conteúdo sempre renderiza por baixo do overlay (SEO/LCP intactos); `<noscript>` força reveal.
