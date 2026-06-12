---
tipo: decisao
titulo: Todos os apps consolidados na main, cofre único da empresa, deploy via git
data: 2026-06-03
projetos: [migracao-monorepo]
fontes: [.planning/migracao-monorepo/HANDOFF.md]
status: vigente
tags: [monorepo, git, vercel, deploy]
---

**Contexto.** Até junho/2026 vários apps importantes (woney-registro, casa-nostra, vanguarda, masterclass, maio-2026) viviam só em branches isoladas e nunca tinham chegado ao `main`. Resultado: o `main` não era a fonte de verdade completa, e isso quebrava o trabalho em 2 computadores (MacBook pessoal + iMac da empresa) — `git clone`/`git pull` na segunda máquina não trazia o ecossistema inteiro.

**Decisão (Woney, 2026-06-03).** Três pontos juntos: (1) **todos os apps vivem no `main`** — clone + install em qualquer máquina = ecossistema completo; (2) **o remote da empresa (`bicofino` = studio-bicofino) é o canônico** — o `origin` pessoal vira espelho/backup opcional, não co-igual; (3) **deploy via git na Vercel** — cada app é 1 projeto Vercel git-connected com `productionBranch=main` e `rootDirectory` apontando pra pasta do app, com Ignored Build Step `git diff --quiet HEAD^ HEAD .` para só rebuildar o app que mudou no push.

**Por quê.** O custo real era sincronização entre máquinas e fonte de verdade fragmentada; branch-por-app não dava nada em troca (os apps são auto-contidos). Deploy via git elimina o deploy manual por CLI como rotina.

**Alternativa descartada.** Manter apps em branches longas e mergear quando "prontos" — descartado porque as branches divergiram pesado de `main` em arquivos compartilhados e o merge arrastaria versões velhas (ver processo "migrar app de branch pro main").

**Resultado.** Migração concluída em 2026-06-04: 9/9 apps no padrão deploy-automático-via-main (PR #18, merge `4ed78c9`), todos os builds validados antes do merge, nada de prod derrubado.
