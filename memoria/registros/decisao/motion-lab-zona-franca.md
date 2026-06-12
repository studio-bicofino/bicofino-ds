---
tipo: decisao
titulo: Motion Lab é zona franca de motion — regras do §8 suspensas, com pipeline de graduação
data: 2026-06-09
projetos: [motion-lab, design-system]
fontes: [.planning/motion-lab/HANDOFF.md]
status: vigente
tags: [motion, gsap, design-system, processo]
---
Contexto: o DESIGN.md §8 fecha o motion da marca em durações 120/200/360ms +
loop ambiente M-01. Isso protege os apps, mas impede experimentar as
referências que circulam no grupo da Vanguarda (GSAP, Lenis, obys, madness.ai).

Decidido: criar o Motion Lab (apps/motion-lab, porta 3050) como ZONA FRANCA —
as regras de duração do §8 ficam deliberadamente suspensas lá dentro, mas os
tokens de cor e tipografia continuam valendo (nenhuma cor fora do set). A
exceção é de tempo/técnica, nunca de marca.

Por quê: experimentar dentro das regras de produção mata a exploração; soltar
experimentos direto nos apps mata o sistema. A zona franca resolve os dois
lados — desde que exista um portão. O portão é o pipeline (contrato do
projeto): referência → experimento numerado (status rascunho) → sessão de
escolha com Woney (tunar valores, aprovar/descartar) → receita nomeada MO-xx no
DESIGN.md §8 → primitive em packages/design-system + demo no docs-site → só
então uso nos apps. NADA entra nos apps direto do lab; o bicofino-motion-curator
não audita o lab, audita o que gradua dele.

Já provado na prática: o EXP-10 (card stack no scroll) graduou para a vitrine
de produtos com os valores exatos do tuner. Pendente de formalização: terceira
camada de motion no §8 ("narrativa/scroll-driven" — scrub = o usuário é a
timeline), ao lado de micro e ambient.
