---
tipo: decisao
titulo: Intro toca em TODA visita — guard de 1×/sessão removido por causa do session restore do Chrome
data: 2026-06-10
projetos: [lancamento-web, apps-web]
fontes: [.planning/lancamento-web/HANDOFF.md]
status: vigente
tags: [intro, motion, sessionstorage, chrome]
---

A intro de marca foi lançada (05/06) com frequência 1×/sessão via `sessionStorage`,
para "não cansar quem volta". Em 2026-06-10 esse guard foi **removido**: o session
restore do Chrome ressuscita o `sessionStorage` ao reabrir o navegador, então quem
voltava ao site dias depois NÃO via a intro — o guard escondia a abertura de marca
exatamente do visitante recorrente que ela deveria receber.

Decisão final: a intro toca em **todo full page load**. Navegação interna (client-side)
naturalmente não dá replay, então o incômodo real é mínimo; `prefers-reduced-motion`
continua pulando tudo.

Regra extraída junto: `sessionStorage` não é um proxy confiável de "sessão de visita" —
navegadores modernos o restauram entre aberturas.
