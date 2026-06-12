---
tipo: erro
titulo: Repo dentro do iCloud gerava duplicatas " 2"/" 3" sem parar — movido para ~/Developer
data: 2026-06-01
projetos: [migracao-monorepo]
fontes: [.planning/migracao-monorepo/HANDOFF.md, memoria-auto-claude]
status: vigente
tags: [icloud, macos, git, ambiente, duplicatas]
---

**O que aconteceu.** O monorepo vivia em `~/Desktop/Bicofino-ecossistema`, pasta sincronizada pelo iCloud Drive (Desktop & Documents). O sync criava continuamente cópias-fantasma com sufixo ` 2`, ` 3`, ` 4` (`page 2.tsx`, `package-lock 4.json`…), todas untracked. Estragos reais: ~230 arquivos-lixo varridos para dentro de um checkpoint git; o TS check do `next build` local caiu de 11min para 2,5s depois da limpeza; e um susto de "build quebrado" que era só um `page 2.tsx` lixo importando outro lixo — a Vercel nem via, porque só clona arquivos tracked.

**Fix de raiz (2026-06-01).** Repo movido para `/Users/woneymalian/Developer/Bicofino-ecossistema`, fora do iCloud. Detalhe da migração: `mv` do diretório-topo trava indefinidamente no fileprovider do iCloud — o que funcionou foi `rsync -a` excluindo node_modules/.next/.turbo, com paridade verificada. Varredura final em 2026-06-02 zerou os dupes sem perda. As duplicatas pararam de regenerar.

**Regra extraída.**
- Repositório git NUNCA em pasta sincronizada pelo iCloud (Desktop, Documents, iCloud Drive). Em máquina nova (ex.: iMac da empresa), clonar em `~/Developer` — já está no passo a passo de setup de 2ª máquina da migração.
- Erro de build citando arquivo ` N.ext` ou módulo "inexistente" → suspeitar de duplicata untracked do iCloud antes de debugar código.
- Ao limpar dupes, distinguir lixo UNTRACKED (apagar livre; não regenera fora do iCloud) de dupe TRACKED (exige `git rm` deliberado e OK do Woney — um tracked chegou a ser apagado por engano e restaurado na hora).
- A Vercel só usa arquivos tracked: erro local causado por untracked não reflete no deploy.
