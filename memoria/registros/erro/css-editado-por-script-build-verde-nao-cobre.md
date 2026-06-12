---
tipo: erro
titulo: Edição programática do globals.css fechou o :root cedo — e o build passou verde
data: 2026-06-11
projetos: [la-rete]
fontes: [.planning/la-rete/HANDOFF.md]
status: vigente
tags: [css, tooling, build, licao]
---
O que aconteceu: durante o desenvolvimento do La Rete, um insert feito por
script no meio do bloco :root do globals.css fechou o bloco antes da hora. Os
tokens de fonte e motion (--bf-font*, --dur-*, --ease-*, --sp-*) ficaram
escopados acidentalmente a [data-corners='soft']. O app inteiro caiu em fonte
de sistema — e o build passou VERDE, porque CSS não valida var() órfã. Só o
olho no browser pegou.

Regra extraída: depois de QUALQUER edição programática no globals.css, validar
a estrutura do arquivo — confirmar que os tokens de fonte, motion e spacing
continuam DENTRO do :root (assert por script ou leitura do diff) e abrir o
browser. Build verde e tsc limpo NÃO cobrem CSS; var órfã falha em silêncio
com fallback visual. A regra vale para todos os apps do ecossistema, não só
para o la-rete.
