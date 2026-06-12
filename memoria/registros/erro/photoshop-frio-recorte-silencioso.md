---
tipo: erro
titulo: Photoshop recém-aberto devolve recorte em blocos SEM erro — pipeline conclui "OK" com lixo
data: 2026-06-09
projetos: [image-pipeline, card-jogos-motion]
fontes: [.planning/image-pipeline/HANDOFF.md]
status: vigente
tags: [photoshop, gotcha, falha-silenciosa, qa]
---
O que aconteceu: rodando o estágio `treat` segundos após `open -a "Adobe Photoshop (Beta)"`, o `autoCutout` (Select Subject) devolveu seleção retangular/grosseira — o motor de ML ainda estava carregando. Pior: nenhum erro foi levantado; o pipeline concluiu "OK" e os `_cut_pb.png` saíram com fundo dentro do bounding box. Com o PS aquecido, o MESMO comando produz recorte perfeito.

É da mesma família a falha offline: sem internet, o Cloud Select Subject cai para o modo Device **silenciosamente** e entrega recorte grosseiro sem nenhum aviso.

A partir de agora: antes de um lote, validar o primeiro recorte — rodar `modules/ps/_diag_steps.jsx` (exporta 1_mask/2_lomu/3_final em /tmp) ou inspecionar o primeiro `_cut.png` a olho. Nunca confiar no exit code do treat como prova de qualidade. Se o lote saiu ruim, `--from treat` re-roda aproveitando o cache de download/upscale — refazer é barato, o caro é não perceber.

Lição geral: integração com motor de ML de terceiro precisa de verificação de **resultado**, não só de execução — "rodou" e "ficou bom" são afirmações independentes.
