---
tipo: decisao
titulo: /grupos reescrita como gestão de tags — Fabio cura o próprio vocabulário
data: 2026-06-10
projetos: [casa-nostra]
fontes: [.planning/casa-nostra-v2/HANDOFF.md]
status: vigente
tags: [tags, crud, vocabulario]
---

Contexto: a página /grupos da Casa Nostra ainda era o esqueleto da v0.8.1 (CRUD da tabela `groups`, que a v2 não usa — a v2 estrutura tudo via `tags` + `person_tags`). Na sessão ao vivo de 2026-06-10 (Onda 12), o Fabio precisava de um lugar pra criar, renomear e apagar as tags que alimentam o cadastro.

Decisão: **/grupos foi reescrita como gestão de tags v2** — CRUD dos kinds `grupo` ("Grupos") e `afiliacao` ("Domínios"), depois ampliada com `familia` ("Famílias", Onda 13), com contagem de uso por tag e confirmação inline. O esqueleto v0.8.1 da página (AddGroupForm/GroupRow/groups.ts) foi APAGADO. Apagar uma tag limpa `person_tags` via cascade.

Por quê: o vocabulário da rede é do Fabio, não do desenvolvedor — se cada tag nova exigisse uma sessão de dev, o sistema engessaria. Dar a ele um CRUD simples de tags é a versão mínima viável da "Fase 2 — ontologia" sem construir o painel curatorial inteiro. E reaproveitar a rota /grupos (em vez de criar /tags) preservou o mapa mental dele.

Limite conhecido: a página NÃO gerencia os kinds `cargo`/`empresa`/`skill` — só grupo/familia/afiliacao. Backlog consciente.

Detalhe de vocabulário que virou padrão: "Afiliações" → "Domínios" foi rename só de LABEL — o kind no banco continua `'afiliacao'`. Mesma regra da v1 ("Movimentos" na UI, `signals` no DB): user-facing muda livre, boundary do banco não acompanha rename de UI.
