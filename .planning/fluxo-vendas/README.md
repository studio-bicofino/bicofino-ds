# fluxo-vendas

Sistema de fluxo de vendas do **Studio Bicofino**: define o funil (o *drawflow*)
e gera roteiros e scripts de venda por etapa, fiéis à voz e ao modelo Bicofino.
Base também do **matchmaking** futuro.

## Estrutura

```
.planning/fluxo-vendas/
  CLAUDE.md              # fonte da verdade — base estratégica, ICP, voz, regras
  README.md              # este arquivo
  fluxo/
    funil.json           # os 12 nós do funil (RASCUNHO até validação)
    icp.md               # os três ICPs em prosa (Studio, Talent, Club)
    icp.json             # mesmos ICPs estruturados c/ sinais pesados (p/ matchmaking)
  roteiros/
    templates/
      _estrutura-base.md # esqueleto de qualquer roteiro (etapa + canal)
    gerados/
      no6-...-bovichain.md  # roteiro-piloto (calibra voz e formato)
  matchmaking/
    README.md            # MVP: lead → ICP + score de fit + nó de entrada
```

## Como gerar um roteiro

Informe ao Claude Code: **etapa** (nó 1-12) · **icp** (Studio/Talent/Club) ·
**conta** (real ou hipotética) · **canal** (email/call/jantar/WhatsApp/dossiê/apresentação)
· **objetivo**. A saída sai no formato de `templates/_estrutura-base.md`.

## Estado atual

- ✅ Fundação criada (CLAUDE.md, funil.json, icp.md, template, piloto).
- 🟡 `funil.json` é **rascunho** — os 12 nós são proposta, não decisão.
- ⏭️ **Na mentoria:** fechar os nós, canais e gatilhos; validar o piloto;
  decidir se Talent e Club ganham flows próprios. Ver `funil.json → abertura_mentoria`.

## Regra de ouro

Não inventar etapas, canais ou dados de cliente fora do que está em `CLAUDE.md`.
Validar o flow com Woney antes de gerar roteiros em escala.
