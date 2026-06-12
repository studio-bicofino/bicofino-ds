---
tipo: decisao
titulo: Automação do canal YouTube em fases — zero código agora, app só quando a cadência doer
data: 2026-06-11
projetos: [canal-youtube, drive-atleta]
fontes: [.planning/canal-youtube/BRIEFING.md]
status: vigente
tags: [youtube, automacao, api, fases]
---

**Contexto:** ao planejar o canal YouTube, a tentação natural do Studio é construir uma ferramenta de publicação. A decisão foi explicitamente não construir app agora.

**Decisão em três fases:**

- **Fase 0 (agora):** zero código. YouTube Studio + predefinições de upload (template de descrição, categoria, idioma, visibilidade padrão — a "automação de graça" do Studio) + um doc de templates de título/descrição por tipo de vídeo.
- **Fase 1 (barato, alto impacto):** gerador de **thumbnail** 1280×720 no padrão Puppeteer já provado no athlete-cards/cards-estaticos, com tokens do DS. Consistência visual das thumbs é o que mais constrói cara de canal.
- **Fase 2 (só quando a cadência doer):** estender o Drive do Atleta com fluxo "Publicar no YouTube" via Data API v3.

**Por quê:** o volume atual não justifica app. E a API do YouTube tem duas pegadinhas que mudam o cálculo: upload custa 1600 unidades da cota diária de 10.000 (~6 uploads/dia) e — pior — projeto de API **não auditado pelo Google tem todo upload travado como privado** até passar auditoria de compliance. Por isso o caminho intermediário recomendado, mesmo na Fase 2: o app prepara o pacote (arquivo final + título + descrição + tags + thumbnail) e o upload é manual no Studio (~2 min/vídeo, zero burocracia de auditoria).

**Alternativa descartada:** construir upload automatizado de cara — esbarra na auditoria do Google e resolve um problema que ainda não existe.
