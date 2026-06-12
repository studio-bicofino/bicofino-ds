---
tipo: framework
titulo: Catalogação que viaja com o arquivo — nome ordenável + descrição no Drive + hash de dedup
data: 2026-06-03
projetos: [drive-atleta]
fontes: [.planning/drive-atleta/HANDOFF.md]
status: vigente
tags: [metadados, catalogacao, google-drive, padrao]
---
Padrão provado no Drive do Atleta para acervos de mídia que vivem no Google Drive mas precisam continuar legíveis fora do app:

1. **Nome de arquivo auto-gerado e ordenável** — `SALVATORE_2026mai26_PALxSAO_gol_001.jpg`: atleta, data invertida, jogo, contexto/categoria, sequência. Inclui campeonato/contexto em CamelCase quando houver (`CAIO_2025out20_ApresentacaoAlashkert_viagem_002.png`). Qualquer pessoa abrindo a pasta no Drive entende e ordena cronologicamente sem app nenhum.
2. **Metadados completos na descrição do arquivo no Drive** (atleta, data, categoria, jogo, contexto, tags, observação) — viajam COM o arquivo: aparecem no painel Detalhes do Drive, sobrevivem a cópia/mudança de pasta e não dependem do banco existir.
3. **Dedup por SHA-256 dos bytes**, calculado no navegador antes do upload, contra a coluna `content_hash`. O match **avisa** ("Já no acervo, com data") mas **nunca bloqueia** — quem decide reenviar é o humano. Vídeo não é hasheado (custo de ler os bytes no client).
4. **Roteamento de pasta por MIME** (imagem→FOTOS, vídeo→VIDEOS). Limite conhecido: MIME não distingue intenção — uma "arte" de Instagram também é PNG; destino semântico (ARTES) exige escolha do usuário, não inferência.

Quando usar: qualquer acervo onde o storage final é de terceiros (Drive, S3) e o banco é índice. A regra de ouro é o item ser autossuficiente — se o Supabase sumir, o acervo continua catalogado.
