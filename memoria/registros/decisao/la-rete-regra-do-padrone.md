---
tipo: decisao
titulo: Regra do Padrone — o sócio nº 1 conecta a rede inteira no grafo
data: 2026-06-11
projetos: [la-rete, casa-nostra]
fontes: [.planning/la-rete/HANDOFF.md]
status: vigente
tags: [grafo, produto, casa-nostra]
---
Contexto: no grafo do La Rete, arestas nascem de tags compartilhadas. Pessoas
sem laço calculado ficariam soltas — e isso contraria a realidade da Casa
Nostra, em que todo mundo chegou pela mão do fundador.

Decidido: o "Padrone" (o sócio de memberNumber === 1, hoje o Fabio) conecta a
rede INTEIRA. O buildEdges injeta um fio fraco de tipo "intro"/'A casa' (peso
0.2) entre o Padrone e qualquer pessoa que não tenha laço calculado com ele.

Por quê: (a) fidelidade ao modelo social real — a Casa Nostra é uma rede de
introduções que emana de uma pessoa; (b) visualmente, garante grafo conexo, sem
nós órfãos flutuando; (c) o peso baixo (0.2) preserva a hierarquia — laços
reais por afinidade continuam dominando o layout e o matchmaking. A regra é
genérica por memberNumber, não hardcoded no Fabio, para sobreviver à troca de
dados fake por dados reais do Supabase.
