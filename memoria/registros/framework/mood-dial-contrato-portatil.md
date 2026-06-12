---
tipo: framework
titulo: MoodDial — contrato portátil de 4 CSS vars com moods medidos por contraste WCAG
data: 2026-06-12
projetos: [la-rete, produtos]
fontes: [.planning/la-rete/HANDOFF.md, apps/produtos/STATUS.md]
status: vigente
tags: [tema, css, contraste, design-system]
---
O padrão: todo o semantic de cor de um app deriva de exatamente 4 CSS vars —
--lr-ground (chão), --lr-ink-rgb (tinta), --lr-dim-alpha (apagado) e
--current-accent. Nenhum seletor escreve hex novo; tudo é derivado com
rgba(var(--lr-ink-rgb), alpha) ou token do canon. O dial de mood troca o clima
inteiro do app trocando só essas vars.

O que torna isso um sistema e não um theme switcher comum: cada par chão/tinta
é MEDIDO por contraste WCAG antes de entrar (tinta ≥4.5:1, dim ≥4.5:1 via
dimAlpha calibrado por mood, accent ≥3:1). Adicionar mood sem medir é proibido.
Derivação dessa medição: em chão escuro, os accents usa/torino saem do sorteio
por ficarem <3:1 (emenda do DESIGN.md §5, 11/06/2026).

Provado duas vezes: nasceu no la-rete (11 moods) e foi portado para a vitrine
de produtos (12/06) exatamente pelo contrato — o globals do destino só
precisava derivar tudo das 4 vars. No porte, o produtos acrescentou variações
legítimas sem quebrar o contrato: mood default "Giorno" (branco, accent null =
sorteio do refresh) e recálculo de --current-accent-on/-ink por contraste
quando o accent vira FUNDO (hero).

Usar quando um app Bicofino pedir personalização de clima: é o caminho
sancionado — portar o MoodDial e derivar o semantic das 4 vars, nunca criar um
sistema de tema paralelo.
