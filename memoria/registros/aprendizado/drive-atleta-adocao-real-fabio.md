---
tipo: aprendizado
titulo: Drive do Atleta pegou adoção real do Fabio — fluxo de um gesto só, ao contrário da Casa Nostra v1
data: 2026-06-03
projetos: [drive-atleta, casa-nostra]
fontes: [.planning/drive-atleta/HANDOFF.md]
status: vigente
tags: [adocao, fabio, produto, simplicidade]
---
O Drive do Atleta (drive-atleta.vercel.app) entrou em **uso real pelo Fabio** dias depois de o backend ficar de pé — há uploads reais no acervo (Salvatore, Julio, Caio) e o Fabio segue pedindo evoluções (ex.: bucket ARTES para posts de Instagram, pedido de 2026-06-02). É o primeiro app interno da Bicofino com adoção espontânea comprovada.

O contraste é a Casa Nostra v1, que o mesmo Fabio congelou por achar o formulário de 10 seções complexo demais. O Drive do Atleta acertou onde a Casa Nostra errou: a interface pede o mínimo (arquivos + alguns campos de contexto) e **o sistema faz a catalogação sozinho** — nome ordenável, pasta certa por MIME, descrição no Drive, dedup. O usuário entrega caos, o app devolve ordem; nunca o inverso.

A partir de agora: app interno para o Fabio (ou qualquer não-dev) deve ter um gesto principal único e visível, com a inteligência de organização escondida no backend. Formulário longo é sinal de design empurrando trabalho para o usuário — e mata adoção.
