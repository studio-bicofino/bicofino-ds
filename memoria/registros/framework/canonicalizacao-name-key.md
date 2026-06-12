---
tipo: framework
titulo: Canonicalização por name_key — normalizeKey + pickCanonical + UNIQUE
data: 2026-05-26
projetos: [casa-nostra]
fontes: [.planning/casa-nostra/HANDOFF.md, .planning/casa-nostra-v2/HANDOFF.md]
status: vigente
tags: [dados, idempotencia, free-text]
---

O padrão: todo vocabulário alimentado por texto livre (empresas, cidades, tags) converge pra um registro canônico via três peças:

1. **`normalizeKey(name)`** — NFD strip de diacríticos + lowercase + trim + colapsa espaços + remove ornamentos/emojis (regex de Extended_Pictographic, variation selectors, ZWJ, skin tones). "São Paulo", "Sao Paulo" e "sao paulo" geram a mesma chave; "Bicofino" e "Bicofino ❇️" também.
2. **`name_key` UNIQUE no banco** (em `organizations`; em `tags` o UNIQUE é composto `(kind, name_key)`) + mutação SEMPRE via `findOrCreate` — nunca insert direto na tabela. Idempotência absoluta: grafia repetida não duplica registro.
3. **`pickCanonical()`** decide qual grafia exibir quando variantes coexistem: frequência desc → mais letras acentuadas (acento vence, emoji não) → sem ornamento → inicia maiúscula → alfabético. Complementos: `canonicalizeInput()` roda on-save (converge mesmo quem digita sem usar autocomplete) e scripts one-shot idempotentes corrigem o legado.

Onde foi provado: Casa Nostra v1 (Frente 14, autocomplete em 7 campos; Frente 16, organizations — "Bicofino ❇️" colapsou em "Bicofino" no backfill, re-run com zero updates) e replicado por inteiro no sistema de tags da v2, que sustenta o cadastro e o futuro matchmaking.

Quando usar: qualquer campo free-text que alimente filtro, stat, agrupamento ou match — se duas grafias da mesma coisa viram duas entradas, o dado apodrece silenciosamente. Aplicar o trio completo desde a primeira migration; retrofitar canonicalização depois exige script de correção + ajuste manual.
