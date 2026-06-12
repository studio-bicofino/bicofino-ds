---
name: bicofino-memoria-auditoria
description: Bicofino Memory Engine — AUDITORIA MENSAL do conhecimento. Invoque uma vez por mês ("/bicofino-memoria-auditoria"): responde as 5 perguntas canônicas, gera memoria/auditorias/AAAA-MM.md e estende a LINHA-DO-TEMPO. Captura contínua é a skill irmã /bicofino-memoria.
---

# Bicofino Memory Engine — auditoria mensal

Contrato: `.planning/memory-engine/BRIEFING.md`. Schema dos registros: skill irmã `.claude/skills/bicofino-memoria/SKILL.md` (use-o se a auditoria gerar/atualizar registros).

Responda as **5 perguntas canônicas** varrendo `memoria/registros/`, `.planning/*/`, `apps/*/STATUS.md` e o git log do mês (use sub-agentes em paralelo, um por pergunta ou por fonte, para preservar contexto):

1. **Quais clientes estão sem documentação?** — registros `cliente/` vs pessoas citadas em handoffs/apps.
2. **Quais projetos têm informações contraditórias?** — HANDOFF vs STATUS vs registros vs realidade do código (portas, URLs, estados "em prod").
3. **Quais atletas têm material incompleto?** — registros `atleta/` + drive-atleta + cards.
4. **Quais decisões não estão documentadas?** — commits/mudanças grandes do mês sem registro `decisao/` correspondente.
5. **Quais padrões aparecem em todos os projetos?** — candidatos a `framework/`/`processo/` — e a DESIGN.md via enrichment loop (apresentar ao Woney, nunca dobrar em silêncio).

## Saídas (as duas, sempre)

- `memoria/auditorias/AAAA-MM.md` — respostas às 5 perguntas + pendências priorizadas (formato: tabela curta de achados com gravidade, depois prosa; métricas no rodapé — nº de registros por tipo, nº de achados por pergunta). Compare com a auditoria anterior: o nº de buracos deve CAIR mês a mês — se subiu, diga onde e por quê. Baseline de referência: `memoria/auditorias/2026-06.md` (26 achados).
- Bloco novo no TOPO de `memoria/LINHA-DO-TEMPO.md` — o mês em retrospecto, em prosa: o que a Bicofino construiu/decidiu/aprendeu; evolução do Woney como profissional (novas capacidades, novos domínios). Datas absolutas; cite registros pelo caminho relativo.

Ao final: lembre o Woney de commitar `memoria/` (commitar ≠ pushar; push na main = deploy do web em prod).
