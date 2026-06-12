---
tipo: erro
titulo: Layout full-bleed aprovado "sumiu" numa branch nunca mesclada — teve que ser portado à mão
data: 2026-06-03
projetos: [lancamento-web, apps-web]
fontes: [BRIEFING.md, .planning/ecosystem-overview.md]
status: vigente
tags: [git, branch, processo, full-bleed]
---

O layout full-bleed das seções do site público (vídeo em tela cheia + overlay de 80%
por cima do conteúdo) foi desenvolvido e aprovado visualmente, mas vivia na branch
`feature/casa-nostra` — uma branch longa de OUTRA frente, que nunca foi mesclada.
Quando a frente casa-nostra foi congelada, o layout "sumiu" junto: ninguém lembrava
onde estava o trabalho aprovado. Em 2026-06-03 ele foi reencontrado e **portado à mão**
para as rotas `/on-pitch` e `/off-pitch` na main, e é essa versão full-bleed que está
em produção (bicofino.com).

O mesmo padrão já tinha aparecido antes no repo: `experiment/video-hero` ficou semanas
"aprovado, aguardando merge" empilhada sobre outras branches de experimento.

Regra extraída: **trabalho visual aprovado não mora em branch de outra frente nem em
branch longa**. Aprovou → extrai só o que foi aprovado e leva pra main (ou pra um PR
próprio e curto) imediatamente. Branch longa sem merge é onde feature aprovada vai
para desaparecer — o custo volta como arqueologia de git e port manual.
