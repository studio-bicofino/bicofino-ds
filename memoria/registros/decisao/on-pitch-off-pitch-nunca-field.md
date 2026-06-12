---
tipo: decisao
titulo: Verticais são On Pitch / Off Pitch — nunca On/Off Field
data: 2026-06-01
projetos: [lancamento-web, apps-web, docs-site]
fontes: [STATUS.md, BRIEFING.md, HANDOFF.md]
status: vigente
tags: [marca, naming, verticais, i18n]
---

Em 2026-06-01 (PR #9) o Woney renomeou as verticais da marca de On/Off **Field** para
On/Off **Pitch** — convenção permanente dali em diante. A arquitetura de marca é
**On Pitch / Off Pitch / Club**.

Por quê de marca: "pitch" é a palavra do futebol no vocabulário europeu — o universo onde
o Bicofino opera e para onde leva o atleta (Europa, Itália); "field" é o termo genérico /
de esporte americano, fora do imaginário da casa. O nome da vertical tem que falar a
língua do jogo que a marca habita.

Escopo deliberado do rename: **todo texto visível** (i18n do docs-site + componentes +
docs raiz) e as **rotas públicas** do apps/web (`/on-pitch`, `/off-pitch`, com redirect
permanente das antigas). Identificadores internos — chaves `t()` como `onfield.*`, nomes
de arquivo (`OnFieldSection.tsx`), classes CSS, âncoras `#on-field`, paths de asset —
foram **mantidos de propósito** (invisíveis ao usuário; renomear era risco sem ganho).
Consistência total de código ficou como tarefa opcional, adiada.

Regra prática: em qualquer texto novo, UI ou doc, escrever sempre On Pitch / Off Pitch.
"Field" só pode sobreviver em identificador interno legado.
