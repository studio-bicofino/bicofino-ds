---
tipo: decisao
titulo: Congelar Casa Nostra v0.8.1 e construir v2 paralela em vez de refatorar
data: 2026-05-26
projetos: [casa-nostra]
fontes: [.planning/casa-nostra/HANDOFF.md, .planning/casa-nostra-v2/HANDOFF.md]
status: vigente
tags: [escopo, produto, fabio]
---

A v0.8.1 da Casa Nostra entregou o escopo original completo: CRM qualitativo interno com 12 tabelas, cluster A/B/C, scores 1-5, sinais/movimentos, camada de organizations idempotente. Em 2026-05-26, na primeira avaliação real, o Fabio (audiência primária) achou o PersonForm com 10 sections "complicado, muitos campos, complexo demais" — e apontou que faltava o campo que de fato importava pra ele: endereço de correspondência.

Decisão: **congelar a v0.8.1 no commit `a7ba1e8` como referência viva e construir uma v2 do zero, paralela** — mesmo app, mesmo banco Supabase, nova porta de entrada (`/cadastro` + `/membros`), com schema **aditivo** (tabelas `tags` + `person_tags` + colunas de endereço em `people`; nada da v1 é destruído). As rotas v0.8.1 (`/p/[id]`, `/p/novo`) seguem acessíveis pra consulta.

Por quê: refatorar 10 sections pra 8 campos seria demolição disfarçada — mais arriscado e mais lento que recomeçar a UI por cima do mesmo banco. E o investimento da v1 não vira lixo: ela preserva padrões provados (canonicalização `normalizeKey`/`pickCanonical`, organizations com `name_key` UNIQUE, bypass de construção, deploy via CLI) que a v2 reaproveita peça por peça.

Alternativa descartada: refatorar a v0.8.1 in-place (decisão explícita do Woney de NÃO fazer isso). Também descartado migrar os dados das tabelas antigas pra tags — as duas convivem indefinidamente.
