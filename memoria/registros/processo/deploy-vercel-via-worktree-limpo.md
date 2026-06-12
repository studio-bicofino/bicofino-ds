---
tipo: processo
titulo: Deploy Vercel por CLI — sempre de worktree limpo + cópia do project.json
data: 2026-06-03
projetos: [migracao-monorepo, registro-impacto]
fontes: [.planning/migracao-monorepo/HANDOFF.md, apps/woney-registro/STATUS.md, .planning/auditoria-2026-06/AUDITORIA.md, .planning/ecosystem-overview.md]
status: vigente
tags: [vercel, deploy, worktree, git]
---

**O padrão.** Quando um app NÃO é git-connected (ou o estado a deployar não está na branch corrente), o deploy por CLI nunca roda da raiz do checkout principal. O procedimento:

1. Criar um worktree limpo: `git worktree add ../<app>-deploy main` (ou a branch com o source).
2. Copiar o `.vercel/project.json` do app na árvore principal para o mesmo caminho no worktree (o `.vercel/` é gitignored e não viaja sozinho — sem ele a CLI cria/linka projeto errado).
3. Rodar `vercel --prod --yes` da raiz correta do worktree (respeitando o rootDirectory do projeto).

**Por quê.** A árvore principal tem mídia untracked gigante (`public/media/*.mp4`, brand assets) — rodar `vercel` da raiz do checkout estoura o upload da CLI. O worktree limpo só contém o que está versionado. Detalhe extra provado no woney-registro: `node_modules` por symlink basta pra vitest/tsc, mas o Turbopack recusa symlink pra fora da raiz — pra `next build` local no worktree, copiar o `node_modules`.

**Onde foi provado.** woney-registro (edição via worktree de `feat/woney-registro` + deploy `vercel --prod --yes`, jun/2026) e casa-nostra (procedimento padrão de prod). O drive-atleta usava o mesmo padrão até virar git-connected (~09/06).

**Quando usar.** Qualquer deploy manual por CLI no monorepo. Com a migração de jun/04 a maioria dos apps deploya via push na main — este processo fica como o caminho seguro para as exceções e para deploys fora de ciclo.
