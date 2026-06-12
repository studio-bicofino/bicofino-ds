---
tipo: decisao
titulo: Identidade dupla do membro — Sócio nº (ordem de associado) + Bicofino ID (livre)
data: 2026-06-10
projetos: [casa-nostra]
fontes: [.planning/casa-nostra-v2/HANDOFF.md]
status: vigente
tags: [schema, identidade, fabio]
---

Contexto: nas sessões ao vivo de 2026-06-10 (Ondas 12-13), o Fabio pediu dois identificadores no topo do cadastro — e a ordem entre eles importava pra ele.

Decisão: dois campos distintos no header do form. **Sócio nº** (`people.member_number integer`) vem PRIMEIRO — é a ordem de associado, o jeito como o Fabio pensa a rede ("Sócio nº 1, nº 2..."); aparece também na listagem de /membros ao lado do nome. **Bicofino ID** (`people.bicofino_id text`) vem depois — campo livre em mono, código interno da casa sem formato imposto.

Por quê: são conceitos diferentes que não se reduzem um ao outro. Sócio nº é sequencial e social (posição na casa); Bicofino ID é um identificador operacional livre. Forçar um campo só perderia a semântica que o Fabio usa de cabeça.

Evolução (2026-06-12, Onda 18): o Sócio nº ganhou **auto-sugestão do menor número livre** (preenche buracos: 1,2,4 → sugere 3) e **unicidade garantida no servidor** (create e update barram duplicata com erro claro). A regra: número de associado é identidade — o sistema sugere, mas nunca deixa colidir.

Alternativa descartada: usar o `id` uuid ou um serial automático como número de sócio — o número precisa ser visível, baixo e atribuível pelo Fabio, não um artefato do banco.
