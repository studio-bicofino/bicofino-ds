---
tipo: atleta
titulo: Os 16 atletas do Drive do Atleta — quem tem material real e quem é só pasta
data: 2026-06-09
projetos: [drive-atleta]
fontes: [.planning/drive-atleta/HANDOFF.md]
status: vigente
tags: [atletas, acervo, drive]
---
Registro-síntese: o Drive do Atleta (drive-atleta.vercel.app) cobre **16 atletas**, cada um com link próprio `/a/<slug>` e pasta `ATLETAS/<NOME>/{FOTOS,VIDEOS}` no Shared Drive CENTRAL BICOFINO:

Caio Henrique, Eloi Gómez Saus, Gabriel Mendes, Gabriel Rigorfi, Guilherme Kerchner, Jean Jesus, Joaquim Miranda, Julio Cezar, Lucas Henrique, Lucas Ovies, Luigi Brancatelli, Pedro Cialone, Rhian Marinho, Ronaldo Prado, Salvatore Brancatelli, Yuri Lima.

**Com material real no acervo** (uploads do Fabio, constatados até 09/06): Salvatore Brancatelli, Julio Cezar, Caio Henrique. Jean Jesus e Pedro Cialone têm fotos de jogo tratadas pela image-pipeline (pilotos dos cards de 06–07/jun); Guilherme Kerchner, Ronaldo Prado e Julio entraram na rodada de cards de 11–17/jun. Os demais são, por enquanto, pasta + link à espera de conteúdo. Lucas Ovies e Gabriel Rigorfi foram os últimos adicionados (2026-06-09).

Nenhum atleta tem position/club cadastrado no app — o `lib/athletes.ts` guarda só nome, slug e `driveFolder` (nome EXATO da pasta, com acentos). Adicionar atleta = 1 linha no athletes.ts + `scripts/create-athlete-folder.mjs "<NOME>"` (idempotente) + deploy.

Pendência de documentação: nenhum atleta tem registro individual com substância (histórico, contratos, pendências) — quando isso existir em fonte confiável, quebrar este registro em fichas por atleta.
