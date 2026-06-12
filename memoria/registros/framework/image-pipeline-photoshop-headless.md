---
tipo: framework
titulo: Pipeline de tratamento de foto — Real-ESRGAN + Photoshop headless via ExtendScript
data: 2026-06-05
projetos: [image-pipeline, card-jogos-motion]
fontes: [.planning/image-pipeline/HANDOFF.md]
status: vigente
tags: [photoshop, extendscript, upscale, automacao, midia]
---
Framework que automatiza o tratamento manual de foto de atleta (WhatsApp/Drive → PNG transparente tratado) que alimenta os cards de jogos. Código em `AI-OS-BASE/05_projects/bicofino/image-pipeline/` (fora do git — sincronizar à parte). Validado ponta a ponta em 2026-06-05 (pilotos Jean e Cialone) e rodado em escala na rodada de 7 cards de 09/06.

**A cadeia:** ingest do Drive (Supabase REST + `alt=media`, zero-dep) → **upscale Real-ESRGAN local** (`~/tools/realesrgan/`, modelo x4plus, cap 2800px via sips, com cache — roda ANTES do PS) → **Photoshop (Beta) dirigido por ExtendScript** via `osascript ... do javascript file`: Select Subject em modo **Cloud** → máscara → duplicata com Action **"Lomu"** (conjunto "Bicofino", grade de clareza/contraste via Camera Raw; a opacidade da duplicata 25/50/75/100% dosa o grade) → ajuste Preto & Branco no topo → merge → trim → PNG transparente `<original>_cut[_pb].png`.

**Escolhas com porquê:**
- Adobe Firefly Services API foi avaliada e **descartada**: enterprise ~US$1k/mês + S3/presigned/polling. ExtendScript no PS local faz o mesmo de graça.
- Select Subject **Cloud** (preferência global do PS, não parâmetro por chamada) é o único recorte aceitável em cena com 2+ pessoas; o modo Device sai em blocos, e o `rembg` (isnet) incluía o adversário semi-transparente. `rembg` fica de reserva headless via API Python.
- O 1º uso do Cloud abre modal de consentimento que trava o script (AppleEvent -1712) — resolver uma vez manualmente; e o timeout do AppleEvent precisa de `with timeout of 1200 seconds` (o default 120s estoura no round-trip do Cloud).

Quando usar: qualquer tratamento de imagem repetitivo da Bicofino (cards, site, propostas) — os módulos (`treat-image`, `upscale`, `ingest-drive`, `shield-monochrome`, `make-card`) são reusáveis e orquestrados por `bin/week.mjs` lendo `jobs/*.json`.
