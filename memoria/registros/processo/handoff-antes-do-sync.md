---
tipo: processo
titulo: Atualizar o HANDOFF commitado ANTES de sincronizar mudança relevante
data: 2026-06-03
projetos: []
fontes: [memoria-auto-claude]
status: vigente
tags: [handoff, sync, continuidade, duas-maquinas]
---

Regra de trabalho pedida explicitamente pelo Woney em 2026-06-03: ao sincronizar qualquer mudança relevante (`npm run sync` ou push), atualizar primeiro o HANDOFF — ou o doc de status commitado — do projeto, refletindo o estado atual e os próximos passos. Só depois fazer commit e push. Vale para qualquer projeto e qualquer chat.

O porquê: a memória automática do Claude Code vive em `~/.claude/projects/.../memory/` e é por-máquina — não viaja para o iMac da empresa. O único conteúdo que atravessa entre os dois computadores (MacBook pessoal + iMac do escritório) e entre sessões é o que está commitado no repo: HANDOFF.md, CLAUDE.md, `.planning/`. O comando de sync só envia código; não escreve status nem memória. Logo, o HANDOFF commitado é o único mecanismo confiável de continuidade.

Como aplicar: durante o trabalho, manter o HANDOFF do projeto vivo — não deixar para escrevê-lo só no momento do sync, porque o Woney pode rodar `npm run sync` sozinho no terminal sem o agente no loop. Atualizar também a memória de projeto local (ajuda nos chats do mesmo Mac), mas nunca tratá-la como canal de continuidade entre máquinas.
