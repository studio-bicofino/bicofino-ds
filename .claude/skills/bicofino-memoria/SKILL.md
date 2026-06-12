---
name: bicofino-memoria
description: Bicofino Memory Engine — CAPTURA de conhecimento em memoria/. Invoque ao fechar uma frente ("/bicofino-memoria", "registra isso na memória") para destilar HANDOFF+commits em registros tipados. Auditoria mensal é a skill irmã /bicofino-memoria-auditoria.
---

# Bicofino Memory Engine — captura

Contrato completo: `.planning/memory-engine/BRIEFING.md`. Substrato: `memoria/` na raiz.
A pergunta que o motor responde: **"o que a Bicofino sabe sobre isso?"**

## Schema do registro (obrigatório)

Arquivo em `memoria/registros/<tipo>/<slug-kebab>.md`. Tipos: `decisao`, `aprendizado`, `erro`, `cliente`, `atleta`, `framework`, `processo`.

```markdown
---
tipo: <um dos 7>
titulo: <frase curta específica>
data: AAAA-MM-DD            # quando o fato aconteceu; NUNCA data relativa
projetos: [slugs]            # [] se regra geral
fontes: [caminhos relativos] # ou memoria-auto-claude / sessao-AAAA-MM-DD
status: vigente | superado | em-aberto
tags: [minúsculas, curtas]
---
Corpo em prosa, português, voz Bicofino, autossuficiente (legível sem abrir a fonte).
decisao: contexto → decisão → POR QUÊ → alternativas descartadas
aprendizado/erro: o que aconteceu → regra extraída ("a partir de agora...")
cliente/atleta: quem é, contexto, preferências, histórico, pendências
framework/processo: o padrão, onde foi provado, quando usar
```

Regras invioláveis:
1. **Um fato por arquivo.** Qualidade > quantidade.
2. **Nunca duplicar** — antes de criar, grep em `memoria/registros/` por tema/tags. Fato já registrado que evoluiu → ATUALIZE o arquivo existente.
3. **Nunca deletar história** — decisão revertida vira `status: superado` + menção à substituta.
4. **Não registrar o derivável** — código, git history, DESIGN.md já registram o "o quê"; o registro captura o PORQUÊ, o contexto humano, a regra extraída. Estado efêmero ("pendente deploy") não entra, a não ser que seja a decisão em si.

## Fluxo de captura (ao fechar uma frente)

1. Identifique a frente: o HANDOFF/STATUS recém-atualizado (`git status` + `git log --oneline -10` ajudam) ou o que o Woney apontar.
2. Leia o doc da frente + diffs/commits da sessão.
3. Destile só o NOVO: decisões com porquê, aprendizados, erros com regra, mudanças em cliente/atleta, padrões que se provaram.
4. Confira contra registros existentes (grep por tags/projeto) — atualize em vez de duplicar; marque superados se algo foi revertido.
5. Grave os registros e apresente ao Woney um resumo: criados / atualizados / superados, 1 linha cada.

Sessão grande (várias frentes): despache sub-agentes em paralelo, um por frente, cada um com o schema acima no prompt.

Ao final: lembre o Woney de commitar `memoria/` — patrimônio só vale versionado (e push na main = deploy do web em prod; commitar ≠ pushar).

## Consulta (qualquer sessão, sem skill)

"O que a Bicofino sabe sobre X?" → grep/agente Explore sobre `memoria/registros/` (frontmatter `tipo`/`projetos`/`tags`/`status` é o índice). Registros `superado` contam a história — leia-os como história, não como regra atual.
