---
tipo: processo
titulo: Trazer app de branch isolada pro main — só a pasta, nunca mergear a branch
data: 2026-06-03
projetos: [migracao-monorepo]
fontes: [.planning/migracao-monorepo/HANDOFF.md]
status: vigente
tags: [git, monorepo, migracao]
---

**O padrão.** Quando um app vive numa branch isolada e precisa entrar no `main`, NUNCA mergear a branch inteira. Branches longas divergem pesado do `main` em arquivos compartilhados (`DESIGN.md`, `apps/docs-site/*`, `.planning/*`) — o merge arrastaria versões VELHAS desses arquivos por cima do `main` atual. A técnica correta, por app:

```bash
# a partir do main atualizado:
git checkout <branch-com-a-versão> -- <pasta-do-app>
# revisar git status, depois commitar SÓ aquela pasta (um commit por app)
```

Isso pega a pasta do app na versão da branch e ignora o resto da divergência. Husk/junk não-rastreado da branch nunca é staged por esse caminho.

**Complementos provados na migração de jun/2026:** (1) se o app existe em 2 branches, comparar as árvores antes — na migração os 3 duplicados eram byte-idênticos e só os metadados diferiam; (2) validar `npm install` + `next build` de cada app migrado ANTES do merge; (3) nunca apagar branch ou redirecionar domínio antes de confirmar o novo deploy no ar.

**Onde foi provado.** Migração monorepo 2026-06-03/04 (woney-registro, casa-nostra, vanguarda ×3, masterclass — todos buildaram idênticos ao estado da branch de origem) e de novo em 2026-06-12, quando 3 commits do woney-registro que só existiam na `feat/woney-registro` foram trazidos pro main pelo mesmo comando.

**Quando usar.** Sempre que código útil estiver preso numa branch divergida — inclusive pra "resgatar" trabalho de branches mortas.
