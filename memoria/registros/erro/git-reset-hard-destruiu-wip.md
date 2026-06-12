---
tipo: erro
titulo: git reset --hard destruiu 22 arquivos de WIP de outras frentes
data: 2026-05-25
projetos: []
fontes: [memoria-auto-claude]
status: vigente
tags: [git, destrutivo, working-tree, worktree]
---

Em 2026-05-25, um `git reset --hard HEAD~1` na branch `experiment/video-hero` — rodado apenas para mover um commit recém-criado para outra branch — destruiu silenciosamente cerca de 22 arquivos com modificações não-commitadas que pertenciam a outras frentes (docs-site, web, BRAND.md, HANDOFF.md). Não houve recuperação possível por nenhuma via (local history do editor, Time Machine, buffers): foram perdidos 12 a 21 dias de trabalho incremental. O comando foi "tecnicamente bem-sucedido"; o estrago foi colateral.

Um segundo episódio em 2026-06-03 confirmou a variante: `git worktree remove --force` num worktree de deploy (padrão usado em casa-nostra e woney-registro) também descarta mudanças não-commitadas sem recuperação — os arquivos-fonte de uma feature já deployada sumiram da branch e só foram recuperados porque o conteúdo estava no contexto do chat.

A partir de agora:
- Antes de QUALQUER `git reset --hard`, `git checkout --`, `git restore` ou equivalente que descarta working tree, rodar `git status --short` e ler completo. Se houver qualquer arquivo `M`, mesmo de outra frente, NÃO executar: stash, commit ou abortar e pedir orientação.
- Para mover commits entre branches, usar `git cherry-pick` (não-destrutivo), nunca branch + reset --hard.
- Se o reset for inevitável, primeiro `git stash --include-untracked` ou confirmação explícita do Woney citando os arquivos `M` afetados.
- Num worktree de deploy, COMMITAR (e idealmente pushar) ANTES de `git worktree remove`. Sem `--force` o git se recusa a remover com mudanças pendentes — essa recusa é o sinal de que falta commitar, não um obstáculo a contornar.
