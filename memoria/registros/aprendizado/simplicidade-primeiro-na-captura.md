---
tipo: aprendizado
titulo: Simplicidade primeiro — captura mínima, estrutura depois
data: 2026-05-27
projetos: [casa-nostra]
fontes: [.planning/casa-nostra-v2/HANDOFF.md, .planning/casa-nostra/HANDOFF.md]
status: vigente
tags: [produto, ux, forms]
---

O que aconteceu: a Casa Nostra v1 foi modelada de dentro pra fora — 12 tabelas, clusters, scores 1-5, cadência, sinais — e o form refletiu o schema: 10 sections. Tecnicamente impecável, mas o Fabio não conseguia usá-la na rotina: denso demais pra preencher, cheio de variáveis (cluster, score, evaluation) que ele nunca tocava, e sem o campo que ele realmente precisava (endereço de correspondência). Resultado: app congelado três dias após ficar pronto.

A v2 inverteu a lógica: **8 campos numa única tela sem scroll**, validação só de nome obrigatório (salva em qualquer estado), e a estrutura fica nos bastidores — sistema de tags (Skills/Grupos/Afiliações) que estrutura os dados sem pesar a captura. Ontologia, metadados e matchmaking viraram fases posteriores, separadas da captura. Com isso o Fabio passou a cadastrar sozinho (família Brancatelli entrou no banco em 2026-06-10) e a pedir campos novos em sessões ao vivo — sinal de adoção.

A partir de agora: pra ferramenta interna de uso recorrente, o form de captura se desenha pelo que o usuário preenche no dia a dia, não pelo que o schema comporta. Riqueza de modelo entra em camadas posteriores (tags, metadados, painéis curatoriais) — nunca como campos na tela de entrada. E validação mínima: form que trava, usuário abandona.
