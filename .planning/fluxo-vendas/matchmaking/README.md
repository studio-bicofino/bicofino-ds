# matchmaking — MVP (overview)

O matchmaking é o módulo que, dado um **lead**, responde três coisas:

1. **Qual ICP** ele é (Studio, Talent ou Club) — ou nenhum.
2. **Quão forte é o fit** — um score, não um sim/não cego.
3. **Por onde ele entra no funil** — qual nó do `funil.json` inicia a relação.

Hoje é overview/MVP em dados estruturados. Depois vira serviço (form, score
automático, sugestão de roteiro). A espinha já está pronta para crescer sem
reescrever.

## Como funciona (modelo do MVP)

Duas fontes, ambas já estruturadas:

- `../fluxo/icp.json` — os ICPs com **sinais de fit pesados** (1-3) e **anti-sinais** (bloqueio).
- `../fluxo/funil.json` — os nós, com `no_entrada_sugerido` por ICP.

**Cálculo (manual por enquanto, automatizável depois):**

```
para cada ICP:
  se o lead bate algum anti-sinal  → DESQUALIFICA (score = 0)
  senão:
    score = Σ(peso dos sinais_fit do ICP que batem)
          + Σ(peso dos sinais_fit_gerais que batem)

melhor_icp = ICP de maior score
faixa:
  forte   ≥ 8
  possível  4–7
  fraco   1–3
  fora    0 (ou bloqueado)
```

**Saída do match:**

```
lead → { icp, score, faixa, no_entrada, proximo_roteiro }
```

`no_entrada` vem do `no_entrada_sugerido` do ICP no `funil.json`;
`proximo_roteiro` é o roteiro daquele nó+ICP em `../roteiros/`.

> Os pesos e cortes de faixa são chute calibrável — ajustar com Woney depois de
> rodar contra alguns leads reais.

## Exemplo (BoviChain, manual)

Bate: tese de posicionamento (3) + percepção move valor (2) + decisor acessível
(3) + marca como investimento (3) + recorrência (2). Nenhum anti-sinal.
→ **Studio · score 13 · forte · entra no nó 1**. Roteiro de referência já existe
(nó 6, dossiê) para quando chegar à camada Create.

## Roadmap MVP → maior

- **Agora (MVP):** dados estruturados + este modelo de score, aplicado à mão.
- **Próximo:** um form/checklist de qualificação que marca os sinais e devolve o score.
- **Depois:** score automático a partir de notas de CRM / Connection; sugestão de roteiro por nó; histórico de match → fechamento para recalibrar os pesos.

## Pendências para a mentoria

- Calibrar pesos dos sinais e os cortes de faixa (forte/possível/fraco).
- Confirmar se anti-sinal é sempre bloqueio total ou às vezes só penalidade.
- Decidir a fonte dos dados do lead (form manual, Connection, CRM).
