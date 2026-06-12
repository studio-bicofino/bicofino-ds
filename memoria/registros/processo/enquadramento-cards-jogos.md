---
tipo: processo
titulo: Regras de enquadramento do atleta nos cards de jogos — base sempre sangra, mirror tira intruso
data: 2026-06-09
projetos: [card-jogos-motion, image-pipeline]
fontes: [.planning/image-pipeline/HANDOFF.md]
status: vigente
tags: [cards, composicao, motion, fabio]
---
Regras de composição provadas em duas rodadas de cards de jogos (pilotos 06–07/jun + rodada de 7 cards 11–17/jun), com feedback direto do Fabio. Valem para todo card novo:

- **A base da foto SEMPRE sangra um filete na borda inferior** (~25-30px abaixo de y=1920) — o atleta nunca flutua. Vale para corpo inteiro, ¾ e close (no close, ombro/peito sangram). Fórmula de partida: `athleteTop ≈ 1920 − (athleteWidth × imgH/imgW) + ~28`.
- **Cabeça abaixo da linha da data** (~y558) — a cabeça não invade a área de informação.
- **Foto "lotada"** (outro jogador no quadro): não tentar recortar o intruso — manter no recorte e jogá-lo para fora do quadro via `mirror` + reposicionamento.
- **Ken Burns** (template acelerado de 09/06, build em 1,0s): zoom do hold até `kenBurnsScale` com âncora **center top** — cabeça pinada, corpo sangra mais embaixo (permitido). O crescimento lateral pode invadir o nome → dosar o scale por card (rodada usou 1.2/1.12/1.1).
- **Calibração**: `_shot.mjs 1.1` para a pose (mesma do PNG estático) e `13.96` para o frame final (nome limpo + base sangrando). Card calibrado para o vídeo está automaticamente calibrado para o PNG estático (cards-jogos-estaticos reusa a mesma cena).

Quando usar: toda vez que entrar foto nova de atleta num card — a calibração é por foto, as regras são fixas.
