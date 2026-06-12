---
tipo: decisao
titulo: Endereço canônico da vitrine de produtos é bicofino.com/produtos, via multi-zone
data: 2026-06-12
projetos: [produtos-bicofino, web]
fontes: [apps/produtos/STATUS.md]
status: vigente
tags: [produtos, dominio, multi-zone, vercel]
---

**Contexto:** a vitrine de produtos (`apps/produtos`) vive num projeto Vercel próprio (`produtos-bicofino`, team studio-bicofinos-projects) com domínio técnico `produtos-bicofino.vercel.app`. Era preciso decidir o endereço público.

**Decisão:** o canônico é **https://bicofino.com/produtos**, pelo mesmo padrão multi-zone já provado em /brandsystem e /casa-nostra (`framework/multi-zone-bicofino-com.md`): `basePath: '/produtos'` no app + rewrite no `next.config.ts` do apps/web.

**Por quê:** a vitrine é argumento comercial — apresentada ao Fabio e potencialmente a clientes — e precisa morar embaixo da marca, não num subdomínio técnico da Vercel. O multi-zone permite isso mantendo o app com deploy, cota e ciclo de vida independentes do site público. Consequência aceita: no domínio Vercel direto, a raiz dá 404 (as rotas ficam sob /produtos por causa do basePath) — normal e irrelevante, porque o endereço que circula é o canônico.

**Custo conhecido:** o rewrite mora no projeto `bicofino-web`, que não é git-connected — o /produtos só resolve no domínio canônico depois de um deploy manual do web (em 12/06 ficou pendente por limite de 100 deploys/dia do team free). Migrar para "outro grupo gratuito" não resolve: o domínio bicofino.com pertence ao projeto bicofino-web deste team, o rewrite tem que sair por ele.
