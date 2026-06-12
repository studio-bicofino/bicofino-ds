# Bicofino Memory Engine

**Uma memória viva da empresa.** A pergunta aqui não é "o que eu sei sobre isso?" —
é **"o que a Bicofino sabe sobre isso?"**.

LLMs mudam. O que ninguém copia é a história, as decisões, os aprendizados, os erros,
os clientes, os atletas, os frameworks e os processos da Bicofino. Isso é patrimônio
intelectual — e patrimônio vive no git.

Contrato completo: `.planning/memory-engine/BRIEFING.md`.

## Estrutura

```
memoria/
  LINHA-DO-TEMPO.md    — evolução acumulativa (Woney + Bicofino), mês a mês
  registros/<tipo>/    — um fato por arquivo, com frontmatter tipado
  auditorias/AAAA-MM.md — relatório mensal de saúde do conhecimento
```

Tipos de registro: `decisao` · `aprendizado` · `erro` · `cliente` · `atleta` · `framework` · `processo`.

## Como consultar

"O que a Bicofino sabe sobre X?" → grep/agente sobre `memoria/registros/`.
O frontmatter (`tipo`, `projetos`, `tags`, `status`) é o índice. Registros com
`status: superado` contam a história — não os apague.

## Como contribuir

- **Ao fechar uma frente:** rode a skill `/bicofino-memoria` — ela destila o HANDOFF + commits
  em registros novos (ou atualiza os existentes; nunca duplica).
- **Mensalmente:** rode `/bicofino-memoria-auditoria` — responde as 5 perguntas canônicas
  (clientes sem doc, contradições, atletas incompletos, decisões não documentadas,
  padrões cross-projeto), gera `auditorias/AAAA-MM.md` e estende a LINHA-DO-TEMPO.
- **Manualmente:** qualquer registro pode ser escrito à mão — siga o schema do BRIEFING.

## Regras

1. Um fato por arquivo, autossuficiente, em português, voz Bicofino.
2. Datas absolutas sempre.
3. Decisão revertida vira `status: superado` com link para a substituta — nunca delete.
4. Não duplicar o que o repo já registra (código, git history, DESIGN.md) — registre
   o **porquê**, o contexto humano, o aprendizado.
