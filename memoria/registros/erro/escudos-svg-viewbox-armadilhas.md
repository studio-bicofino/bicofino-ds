---
tipo: erro
titulo: Escudo SVG com padding no viewBox lê menor que os outros na mesma altura — Fabio notou
data: 2026-06-09
projetos: [image-pipeline, card-jogos-motion]
fontes: [.planning/image-pipeline/HANDOFF.md]
status: vigente
tags: [svg, escudos, qa, cards]
---
O que aconteceu: na rodada de cards de 11–17/jun, o escudo do Palmeiras parecia menor que os demais mesmo com `crestHeight` idêntico — a arte preenchia só 77% do viewBox contra 91–99% dos outros. **O Fabio notou a inconsistência visual** antes de nós. A conversão automática (`shields.mjs convert` → mono `#2a2c2b`) não trata quatro armadilhas de SVG de origem:

1. Path de fundo full-canvas (sampaio-correa tinha um rect cinza 2000×2000 que virou bloco preto);
2. viewBox de página A4 com o escudo minúsculo no meio (são-bento);
3. Rect branco de fundo (fluminense);
4. **Padding interno no viewBox** — o caso Palmeiras: na mesma altura, o escudo renderiza menor.

A partir de agora: todo escudo novo passa por `card-jogos-motion/scripts/_svgpreview.mjs <svg> <png>` antes de entrar num card — ele imprime o bbox real e renderiza no fundo do card. Alvo: a arte preenchendo **~96% do viewBox**; se não, apertar o viewBox para o bbox do conteúdo e remover paths de fundo. A fonte colorida original sempre vai para `clubs/_colored-source/`.

Regra correlata travada pelo Fabio na mesma rodada: escudos **padronizados** no template (`crestHeight: 86, crestTop: 404`, sem scale individual por clube) — a igualdade visual vem do viewBox correto, não de compensação por card.
