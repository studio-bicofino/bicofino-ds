---
tipo: processo
titulo: BRIEFING e HANDOFF são contrato — ler na íntegra antes de propor scope
data: 2026-05-25
projetos: []
fontes: [memoria-auto-claude]
status: vigente
tags: [briefing, handoff, scope, planning]
---

Quando um projeto tem `.planning/<projeto>/BRIEFING.md` e `HANDOFF.md`, esses documentos são o contrato. Antes de propor adição de campos, extensão de schema ou re-discussão de decisões, ler os dois integralmente. Só propor extensão se houver gap real entre o briefing e o que está implementado — e, nesse caso, justificar o porquê e demonstrar que a ausência foi verificada no briefing.

De onde veio: em 2026-05-25, no projeto Casa Nostra, foram propostos quatro grupos de "dimensões extras" (vida pessoal, preferências, trace relacional, wealth-specific) quando o BRIEFING já listava todos os 24 campos de `people`, 9 tabelas relacionadas e as 9 seções do modal. O Woney corrigiu na hora: "Você não tem o contexto dos campos que deviam ser previstos? Parece que algo se perdeu."

Como aplicar: em qualquer projeto com pasta `.planning/<nome>/`, a leitura integral de BRIEFING + HANDOFF vem antes de qualquer proposta. Não inventar extensões fora do contrato; tratar o briefing como a fonte do escopo, não como ponto de partida para brainstorm.
