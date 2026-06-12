---
tipo: decisao
titulo: Consigliere v1 é input estruturado com IA, não chat aberto — e custo tem teto duplo
data: 2026-06-12
projetos: [la-rete, consigliere]
fontes: [.planning/la-rete/HANDOFF.md, .planning/consigliere/PLAN.md]
status: vigente
tags: [ia, consigliere, custo, produto]
---
Contexto: o leitor de notícias do La Rete (ex-"Radar", renomeado Consigliere em
11/06/2026) precisa transformar conteúdo externo em tags da rede.

Decidido: a v1 é input estruturado — link, texto, PDF ou imagem entram, sai uma
análise de quem da rede acende — e NÃO um chat aberto. O motor chama Claude
(claude-haiku-4-5, SDK oficial da Anthropic) com structured output em
json_schema cujos nomes de tag do canon são ENUM: hook inválido é impossível
por construção. Sem ANTHROPIC_API_KEY, degrada para um léxico local
(notícia→tags) em links/texto; arquivos retornam 503.

Por quê: input estruturado mantém o output verificável e ancorado no
vocabulário canônico — chat aberto convida alucinação e dispersa o produto.

Custo sob controle por duas camadas (12/06): limite diário SOFT na rota
(CONSIGLIERE_DAILY_LIMIT, default 50; estourou → léxico para texto, 429 para
arquivo; contador em memória por instância) + teto DURO via spend limit no
Console da Anthropic. Aprendizado embutido: assinatura Claude.ai NÃO serve de
motor de API — são produtos separados, billing separado, sem caminho suportado.

Visão de longo prazo registrada: o Consigliere vira serviço único consumido por
vários apps (widget); hoje a rota vive no la-rete e só será extraída quando o
segundo app precisar — extração antecipada foi descartada como abstração
prematura.
