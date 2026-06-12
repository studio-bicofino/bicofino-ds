---
tipo: aprendizado
titulo: Push na main = deploy em produção — restrição operacional permanente
data: 2026-06-04
projetos: [migracao-monorepo]
fontes: [.planning/migracao-monorepo/HANDOFF.md, .planning/auditoria-2026-06/AUDITORIA.md]
status: vigente
tags: [deploy, git, vercel, prod, seguranca]
---

**O que aconteceu.** Com a migração do monorepo (concluída 2026-06-04), os apps ficaram git-connected na Vercel com `productionBranch=main` — web (bicofino.com), docs-site, la-rete, motion-lab, woney-registro, vanguarda ×3, masterclass, drive-atleta. Cada push na `main` dispara deploy automático de produção de todo app cuja pasta mudou (Ignored Build Step `git diff --quiet HEAD^ HEAD .` poupa os demais).

**Regra extraída.** Commitar na main local é seguro; **pushar a main é publicar**. Nunca pushar sem o Woney pedir ou saber — commits podem acumular localmente esperando aprovação (foi exatamente o protocolo da auditoria de 12/06: 4 commits prontos na main local, push só depois do OK do Woney ao italiano). Corolários: (1) mudança que não pode ir ao ar ainda não entra na main — vai pra branch curta, que gera preview e não prod; (2) o site da empresa no ar (bicofino.com) está a um push de distância — tratar todo push na main com o peso de um deploy.
