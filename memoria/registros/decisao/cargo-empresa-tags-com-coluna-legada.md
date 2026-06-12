---
tipo: decisao
titulo: Cargo e Empresa viram tags multi-valor, com 1º valor espelhado nas colunas legadas
data: 2026-06-10
projetos: [casa-nostra]
fontes: [.planning/casa-nostra-v2/HANDOFF.md]
status: vigente
tags: [schema, tags, compat]
---

Contexto: na v2 da Casa Nostra, Cargo e Empresa eram campos texto únicos (`people.current_title`/`current_company`). Na sessão ao vivo de 2026-06-10 (Onda 14) ficou claro que uma pessoa da rede tem vários cargos e várias empresas ao mesmo tempo — campo único força escolha artificial.

Decisão: Cargo e Empresa viraram **tags multi-valor** (kinds novos `'cargo'` e `'empresa'` no sistema de tags), com **compat legado**: o PRIMEIRO valor de cada lista continua gravado em `people.current_title`/`current_company`, e na edição uma pessoa antiga sem tags cai no fallback das colunas legadas (o valor vira chip).

Por quê: o sistema de tags já existia e já alimentará o matchmaking — multiplicar kinds custa quase nada. E espelhar o 1º valor nas colunas legadas manteve a listagem e a busca de /membros **intactas**, sem reescrever queries no meio de uma sessão ao vivo com o Fabio. É dívida assumida conscientemente: se um dia /membros passar a ler das tags, as colunas legadas podem ser aposentadas.

Alternativas descartadas: migrar /membros pra ler das tags na hora (risco desnecessário em sessão ao vivo); manter campos únicos (não representa a realidade da rede).

Mesmo padrão de não-destruição já tinha sido provado na v1 (camada organizations convivendo com `current_company` texto livre, sem sync automático).
