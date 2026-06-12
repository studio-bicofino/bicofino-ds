---
tipo: aprendizado
titulo: Gotchas da Drive API em Shared Drive — raiz é o driveId, delete é trash, supportsAllDrives sempre
data: 2026-06-03
projetos: [drive-atleta, image-pipeline]
fontes: [.planning/drive-atleta/HANDOFF.md]
status: vigente
tags: [google-drive, api, gotcha, integracao]
---
Lições pagas integrando o Drive do Atleta com o Shared Drive `CENTRAL BICOFINO`, válidas para qualquer integração futura com Shared Drives:

1. **A "raiz" de um Shared Drive é o próprio `driveId`**, não um segmento de path. Resolver `ATLETAS/<atleta>/{FOTOS,VIDEOS}` é caminhar por nome a partir do driveId (acha-ou-cria), nunca montar string de caminho.
2. **`supportsAllDrives: true` em TODA chamada** — sem isso a API se comporta como se o Shared Drive não existisse.
3. **`files.delete` permanente é proibido para Content manager (devolve 404)**. Para remover, mandar para a lixeira: `PATCH {trashed: true}` — recuperável ~30 dias.
4. **Migrations no Supabase do projeto:** o pooler que funciona é `aws-1-us-west-2.pooler.supabase.com:5432` (o `aws-0` dá erro XX000); a conexão direta `db.<ref>` é IPv6-only e não resolve da máquina local.
5. O `thumbnailLink` do Drive serve preview barato (~10-50KB) via proxy server com token de serviço — não precisa baixar o arquivo para mostrar miniatura.

A partir de agora: qualquer código novo tocando o CENTRAL BICOFINO nasce com supportsAllDrives, trash em vez de delete, e resolução de pastas por driveId.
