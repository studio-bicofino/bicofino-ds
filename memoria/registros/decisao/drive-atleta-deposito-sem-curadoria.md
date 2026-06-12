---
tipo: decisao
titulo: Drive do Atleta é depósito, não pipeline de curadoria — status saiu da UI
data: 2026-06-09
projetos: [drive-atleta]
fontes: [.planning/drive-atleta/HANDOFF.md]
status: vigente
tags: [produto, escopo, subtracao]
---
O app nasceu com um modelo de curadoria: cada item tinha status e o painel era uma esteira de triagem. Em 2026-06-09 veio a virada de modelo: o app é **depósito** — o atleta envia, o material fica catalogado e acessível, ponto.

**O que mudou:** filtro e controle de status sumiram do painel (a coluna `status` continua no banco com default 'recebido', só não aparece na UI). No lugar, os cards ganharam as duas ações que importam de verdade no dia a dia: **copiar link aberto** (cria permissão `anyone:reader` no Drive — URL pública que vale para vídeo grande via CDN do Google) e **apagar** (lixeira do Drive + remove do banco, recuperável ~30 dias). Decisão do Woney: essas ações existem **só no painel interno**, nunca na página do atleta. O atleta ganhou uma galeria read-only "Meus envios" no próprio `/a/<slug>`.

**Por quê:** o uso real (Fabio) mostrou que ninguém opera uma esteira de status — o que se faz é achar o arquivo, compartilhar o link e ocasionalmente limpar. Manter o workflow imaginado na UI era complexidade sem cliente. Mesma lição da Casa Nostra v1, aplicada por subtração antes que doesse.
