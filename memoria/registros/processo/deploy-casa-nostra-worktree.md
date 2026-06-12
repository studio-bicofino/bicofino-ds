---
tipo: processo
titulo: Deploy da Casa Nostra — worktree limpo de main, nunca da raiz do checkout
data: 2026-06-10
projetos: [casa-nostra]
fontes: [.planning/casa-nostra-v2/HANDOFF.md]
status: vigente
tags: [deploy, vercel, worktree]
---

O padrão, provado nas Ondas 12-15 (junho/2026):

1. `git worktree add --detach /tmp/cn-deploy main` — worktree limpo do estado commitado da main.
2. Copiar `.vercel/project.json` da raiz do checkout principal pra raiz do worktree (o link do projeto `casa-nostra`, team studio-bicofinos-projects, não viaja com o git).
3. `vercel deploy --prod --yes --scope studio-bicofinos-projects` **da raiz do worktree** — o rootDirectory do projeto na Vercel já aponta pra `apps/casa-nostra`.

**Por que nunca da raiz do checkout principal:** o upload da CLI varre o diretório e os ~382MB de mídia untracked em `apps/web/public/media` estouram o limite. O worktree de main só contém o que está commitado — deploy limpo por construção. (Bônus: garante que só código commitado vai pra prod.)

**Regra de sangue, aprendida na Onda 10:** quando o worktree carrega trabalho não-commitado, **commitar e pushar ANTES de `git worktree remove`** — o `--force` descarta working tree sem dó; a fonte de uma onda inteira foi perdida assim e recuperada do contexto do chat. Com o padrão atual (editar na main, worktree detached só pra deploy) o risco diminui, mas a regra fica.

Acessórios do mesmo fluxo: migrations são sempre MANUAIS no SQL Editor do Supabase (não há connection string nos cofres, só as chaves de app); com o Infisical expirado, o fallback é `npx vercel env pull --environment=development --yes --scope studio-bicofinos-projects` pra obter as chaves e operar via REST — apagando o arquivo depois. Sem integração git na Vercel: deploy é CLI-only por decisão.

Quando usar: todo deploy de app do monorepo cuja árvore principal carrega mídia/untracked pesado — o mesmo padrão foi reutilizado pelo woney-registro.
