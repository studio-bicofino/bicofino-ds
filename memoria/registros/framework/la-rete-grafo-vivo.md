---
tipo: framework
titulo: La Rete — matchmaking da rede Casa Nostra como grafo vivo
data: 2026-06-11
projetos: [la-rete, casa-nostra]
fontes: [.planning/la-rete/HANDOFF.md]
status: vigente
tags: [matchmaking, grafo, rede, casa-nostra]
---
La Rete é a tese de que a rede Casa Nostra vale mais quando é lida como grafo
vivo, não como listagem de membros. O padrão tem três motores determinísticos:
(1) arestas calculadas por tags compartilhadas entre pessoas (vocabulário
canônico de tags com ids estáveis — skills, grupos, afinidades, família, cargo,
empresa); (2) um motor de oportunidades que gera matches pontuados (score 0–100
inteiro) em três tipos; (3) aderência tendência × pessoa (0–100), cruzando os
seeds editoriais da Vanguarda com quem da rede "acende" para cada tendência.
Completa o conjunto o Consigliere: cola-se uma notícia externa e o sistema
mostra quem da rede ela ativa.

Provado em apps/la-rete (porta 3060, em prod em la-rete.vercel.app desde
11/06/2026) com 26 pessoas fake cujos tipos espelham o schema real do Casa
Nostra — a ponte para dados reais é um adapter Supabase, já previsto.
Invariante de engenharia: nada de Math.random()/Date.now() dentro dos motores
(lib/engine, lib/data) — datas entram como argumento; isso mantém os matches
reproduzíveis e calibráveis.

Usar este padrão quando a pergunta for "quem da rede se conecta com quem, e por
quê agora" — apresentar a rede como ativo, gerar pauta de introduções para o
Fabio, ou reagir a notícia externa. Pendente: calibragem de pesos e copy das
oportunidades com Fabio/Woney antes de tratar os scores como verdade.
