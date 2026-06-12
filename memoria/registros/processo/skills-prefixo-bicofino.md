---
tipo: processo
titulo: Skills de projeto da casa levam prefixo bicofino- — descoberta por autocomplete
data: 2026-06-12
projetos: []
fontes: [sessao-2026-06-12]
status: vigente
tags: [skills, claude-code, convencao, dx]
---

Toda skill local criada para a Bicofino leva o prefixo `bicofino-` no nome (`bicofino-memoria`, `bicofino-memoria-auditoria`, `bicofino-tokens`, `bicofino-i18n-pattern`, `bicofino-component-template`).

**Por quê.** O Woney não precisa decorar nome de skill: digitar `/bicofino` no prompt lista todas as da casa no autocomplete, separadas das dezenas de skills genéricas instaladas (vercel:*, ckm-*, etc.). Pedido explícito do Woney em 12/06/2026, ao renomear `/memoria` → `/bicofino-memoria`.

**Como aplicar.** Ao criar qualquer skill nova em `.claude/skills/` deste repo: nome do diretório e do frontmatter `name:` começam com `bicofino-`. Funções distintas que o Woney invoca em momentos diferentes (ex.: captura vs auditoria) viram skills IRMÃS separadas em vez de uma skill com argumento — assim as duas aparecem no autocomplete.
