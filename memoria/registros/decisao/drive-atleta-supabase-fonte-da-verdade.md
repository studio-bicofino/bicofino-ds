---
tipo: decisao
titulo: Supabase é a fonte da verdade do catálogo — o painel nunca lê do Drive
data: 2026-06-02
projetos: [drive-atleta]
fontes: [.planning/drive-atleta/HANDOFF.md]
status: vigente
tags: [supabase, google-drive, arquitetura, metadados]
---
O Drive do Atleta tem dois mundos: os bytes (Drive) e o catálogo consultável (busca, filtros, curadoria, dedup). Decidiu-se que a tabela `media_items` no Supabase é a fonte da verdade do catálogo: cada linha guarda `drive_file_id` + `web_view_link`, e o painel lê **sempre** do Supabase, nunca lista o Drive.

**Por quê:** a Drive API é lenta e pobre para consulta estruturada (filtros por atleta/categoria/jogo/tags, contagem para sequência de nomes, match de hash). Postgres dá tudo isso de graça, mais RLS por atleta no futuro (Athlete Portal). O Drive fica sendo o que ele é bom em ser: storage com permissões e CDN do Google para vídeo.

Implicação que se provou correta na prática: escritas passam por rotas server com service role; a chave anon do navegador é só leitura (RLS com policy de select). Apagar um item = lixeira no Drive + delete da linha — os dois mundos sincronizados pela rota, nunca pelo cliente.
