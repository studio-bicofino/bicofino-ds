---
tipo: framework
titulo: Registro de Impacto — medir em horas e reais o valor dos sistemas internos
data: 2026-06-01
projetos: [registro-impacto]
fontes: [apps/woney-registro/STATUS.md]
status: vigente
tags: [valor, metricas, sistemas-internos, calc]
---

**A tese.** Sistemas internos construídos pelo Woney (designer + dev com Claude Code) devolvem valor mensurável ao Studio Bicofino — e esse valor deve ser REGISTRADO, não presumido. O Registro de Impacto (`apps/woney-registro`, woney-registro.vercel.app) converte cada sistema em horas e reais usando um modelo puro e testado (`lib/calc.ts`).

**O modelo.** Três tipos de sistema, cada um com contabilidade própria:
- **Eficiência (OpEx)** — tem `tempo_antes/depois_min` e usos registrados; cada uso gera economia = (antes − depois) × custo/hora (R$ 106,25 = R$ 17.000/160h). Ex.: story de jogo 120 min → 24 min.
- **Infraestrutura (CapEx)** — horas de build viram "capital de infra"; não entram no recorrente, mas têm payback honesto (ex.: pipeline de imagem 3,5h paga-se em ~14 imagens).
- **Projeto** — entregas pontuais (ex.: site v1) valoradas em dias.

Os headlines: economia realizada até hoje, líquido recorrente/ano (usa taxas mensais como `stories_mes`, não contagem histórica) e o múltiplo "Claude Max se paga N×/mês". Payback declarado por sistema ("template pago: 8 usos ≥ payback 3").

**Princípios provados.** (1) Baseline honesto > número bonito — incluir o tratamento de foto no baseline do story (90 → 120 min) e medir o tempo real depois (20 → 24 min) mudou os números nas duas direções e ambos foram aceitos; (2) recorrente usa TAXA, não contagem — remover uma peça duplicada baixa o realizado mas não o recorrente; (3) toda premissa de cálculo é decidida explicitamente com o Woney e registrada.

**Quando usar.** Todo sistema interno novo entra no Registro na criação, classificado num dos 3 tipos, com premissas de tempo conferidas com o Woney — e o número serve de argumento concreto sobre o valor do papel designer+dev.
