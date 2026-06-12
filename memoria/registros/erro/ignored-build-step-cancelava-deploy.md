---
tipo: erro
titulo: Ignored Build Step com git diff HEAD^ cancelava deploys legítimos — comparava só o commit do tip
data: 2026-06-10
projetos: [lancamento-web, apps-web]
fontes: [.planning/lancamento-web/HANDOFF.md]
status: vigente
tags: [vercel, deploy, ci, git]
---

O projeto `bicofino-web` na Vercel tinha um Ignored Build Step custom:
`git diff --quiet HEAD^ HEAD .` (relativo ao rootDirectory `apps/web`). O comando
compara apenas o **último commit do push com o pai dele** — num push com vários commits,
se o commit do tip não tocasse `apps/web`, o build era cancelado **mesmo com commits
anteriores mudando o site**. Aconteceu de verdade no push do texto final do manifesto
(10/06): mudança importante no ar local, deploy silenciosamente cancelado.

Fix: o Ignored Build Step custom foi removido via API. Vale o comportamento padrão da
Vercel, que compara com o **último deploy** (cobre o push inteiro), não commit a commit.

Regra extraída: num monorepo git-connected, não usar `HEAD^ HEAD` como filtro de build —
o default da Vercel já faz a coisa certa. Se um deploy esperado não aparecer, suspeitar
primeiro do Ignored Build Step antes de debugar o código.
