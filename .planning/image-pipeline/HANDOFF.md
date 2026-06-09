# HANDOFF — image-pipeline (automação dos cards de jogos)

> Última atualização: 2026-06-09. Este doc fica no repo (`.planning/`) p/ **viajar entre máquinas**.
> ⚠️ O **código** do toolkit vive em `AI-OS-BASE/05_projects/bicofino/image-pipeline/`, que **NÃO é rastreado pelo git** (AI-OS-BASE fica fora). Sincronizar a pasta entre Mac/iMac à parte.

## Objetivo
Automatizar o fluxo manual de Photoshop (foto WhatsApp/Drive → upscale → recorte → Lomu → P&B → crop → PNG transparente) que alimenta `card-jogos-motion`, em **módulos reusáveis** (cards, site, propostas). Teste piloto: cards do **Jean** (sáb 06/06, Referência×Votoraty, U-17) e **Cialone** (dom 07/06, São Paulo×Votoraty, SUB-14).

## Arquitetura / decisões (com Woney, 2026-06-05)
- **Motor de tratamento:** Photoshop **(Beta)** dirigido por **ExtendScript** via `osascript ... do javascript file ... with arguments`. (API Adobe Firefly Services avaliada e descartada: enterprise ~US$1k/mês + S3/presigned/polling.)
- **Upscale:** **Real-ESRGAN** local em `~/tools/realesrgan/` (binário universal, modelo `realesrgan-x4plus`, 4x + cap 2800px via `sips`). Substitui o Generative Upscale do Firefly (não roda headless). Roda ANTES do PS.
- **Recorte:** **Select Subject (`autoCutout`) em modo CLOUD** — é uma **preferência global** (Ajustes → Processamento de Imagem → "Selecionar Assunto e Remover Fundo" → "Nuvem/Cloud (resultados detalhados)"). NÃO existe parâmetro de cloud por chamada. O modo **Device** (default) dá recorte grosseiro/em blocos e pega gente demais. `rembg` foi testado (isnet pega Jean+bola mas **inclui o adversário** semi-transparente) → Cloud Select Subject é superior em cena com 2+ pessoas.
- **Lomu:** Action gravada 1x na Beta — conjunto **"Bicofino"**, ação **"Lomu"** (Filtro → Camera Raw → Carregar configurações → Lomu.xmp → OK). O `.jsx` chama `app.doAction("Lomu","Bicofino")`. (Lomu.xmp = grade clareza/contraste, NÃO é PB.)
- **Pilha de camadas (confirmada):** base recortada @100% → duplicata com Lomu @25/50/75/100% (a opacidade dosa o grade) → ajuste **Preto & Branco** no topo → merge visible → trim transparência → PNG.
- **Escudos:** todos `#2a2c2b`, 80×80. Fonte colorida preservada em `clubs/_colored-source/`.
- **Nomenclatura:** `<original-do-drive>_cut[_pb].png`.

## ✅ Pronto e validado
- Toolkit completo escrito (`config.mjs`, `lib/`, `modules/`, `modules/ps/`, `bin/`, `presets/`, `jobs/`, `README.md`). Sintaxe + paths OK.
- **Escudos:** 17 normalizados p/ `#2a2c2b`; `referencia.svg` convertido (de `#ec6148`); `_colored-source/referencia.svg` guardado; `nova-cidade.svg` é placeholder (mantém branco — revisar). Validado XML.
- **Drive ingest:** validado. Creds via `cd apps/drive-atleta && vercel env pull .env.local` (Vercel já linkado; projeto `drive-atleta`). `config.mjs` carrega esse `.env.local` automático. Slugs: `jean-jesus`, `pedro-cialone`.
- **Upscale:** validado (Real-ESRGAN). 
- **Fotos baixadas** (`.staging/raw/` + upscaled em `.staging/*_up.png`): Jean `jogo_002` (1080×1351), Cialone `jogo_004` (1080×1350).
- **Action Lomu** gravada na Beta. **Permissão de Automação macOS** concedida (osascript→PS funciona).

## ✅ RODADA 11–17/jun entregue (2026-06-09) — 7 cards + template acelerado
Brief do Fabio (09/06): 7 jogos. MP4 em `card-jogos-motion/Export/`:
`guilherme-brasileiro-s17-11jun` (PAL×Santos, jogo_003 corpo inteiro, MIRROR), `ronaldo-copario-s16-12jun`
(Vasco×Sampaio Corrêa, jogo_003 comemoração, MIRROR, companheiro fora do quadro, faixa preta, FERJ branca,
subtítulo = local "Nivaldo Pereira (Artsul) • Rio de Janeiro", 14H45), `julio-paulista-s17-13jun` (São Bento×SP,
Julio_cut_pb1, MIRROR), `guilherme-paulista-s17-13jun` (Guarulhos×PAL, jogo_002 busto frontal, normal),
`jean-paulista-s17-13jun` (Clube Vital×Referência, jogo_001, enquadramento idêntico ao card aprovado 06/06),
`guilherme-brasileiro-s17-16jun` (Botafogo×PAL, jogo_001 busto perfil, normal), `julio-brasileiro-s17-17jun`
(SP×Fluminense, Julio_cut_pb2 drible, normal). Job: `jobs/2026-06-11-rodada.json` (só ingest+treat dos 4 novos).

### 🖼️ Projeto novo: cards-jogos-estaticos (2026-06-09)
`AI-OS-BASE/05_projects/bicofino/cards-jogos-estaticos/` (NÃO rastreado pelo git — sincronizar com o
AI-OS-BASE): exporta a MESMA arte do motion como **PNG estático 1080×1920**. Reusa cena/assets/configs/
node_modules do card-jogos-motion. `CFG=../card-jogos-motion/configs/<slug>.json node scripts/export.mjs`
→ `Export/<slug>.png` (pose @1.1s; `POSE=`/`SCALE=2`/`OUT=`). Card calibrado pro vídeo = calibrado pro PNG.
Os 7 da rodada já exportados. Registrado no woney-registro como `sis-cards-estaticos`.

### ⚡ Template ACELERADO + Ken Burns evidente (Fabio, 2026-06-09, 2 rodadas)
Build completo em **1,0s** (era ~5,6s; 1ª rodada 1,5 → 2ª 1,0). `story-scene.jsx`: fator global `K = BUILD_END/5.6`;
`CONFIG.buildEnd` (default 1.0). **Ken Burns do atleta**: zoom do hold até `kenBurnsScale` (default 1.2) + deriva
`kenBurnsDrift` (default 20), âncora **center top** (cabeça pinada, corpo sangra mais embaixo — permitido).
Crescimento lateral pode invadir o nome → dosar por card (rodada usou 1.2/1.12/1.1). **Escudos padronizados**:
`crestHeight:86, crestTop:404`, SEM home/awayCrestScale (Fabio quer todos iguais; respiro ~38px até a data).
**Calibração agora é `_shot.mjs 1.1` (não mais 4.6)** + `13.96` p/ o fim (nome limpo + base sangrando).

### ⚠️ PEGADINHA NOVA: PS Beta frio = recorte em blocos SILENCIOSO (2026-06-09)
Rodar treat segundos após `open -a "Adobe Photoshop (Beta)"` → autoCutout devolve seleção RETANGULAR/grosseira
(motor ML ainda carregando), pipeline conclui "OK" e os `_cut_pb.png` saem com FUNDO dentro do bbox. Com o PS
aquecido, o MESMO comando sai perfeito (`--from treat` re-roda aproveitando cache de download/upscale).
→ Antes de um lote: rodar `modules/ps/_diag_steps.jsx` (recriado; exporta 1_mask/2_lomu/3_final em /tmp) ou
inspecionar o 1º recorte. `_diag_cloud.jsx` e `_diag_ab.jsx` tb recriados (A/B da flag `autoCutoutOnCloud` —
com PS quente os bounds saem justos com e sem a flag).

### ⚠️ Escudos vetorizados: 3 armadilhas (2026-06-09)
`shields.mjs convert` NÃO trata: (1) path de FUNDO full-canvas (sampaio-correa tinha rect #dbdbdb 2000×2000 →
virou bloco preto; fix: remover o path e mapear detalhes #dbdbdb/#fede00→branco); (2) viewBox de página A4 com
crest minúsculo no meio (sao-bento → recalcular viewBox pro bbox do conteúdo); (3) rect branco de fundo
(fluminense); (4) **PADDING interno no viewBox** — na mesma `crestHeight` o escudo lê MENOR (palmeiras preenchia
só 77% do viewBox vs 91–99% dos demais → Fabio notou; fix: apertar o viewBox pro bbox da arte, alvo ~96% de fill).
Preview rápido: `card-jogos-motion/scripts/_svgpreview.mjs <svg> <png>` (imprime o bbox real + render no bg do
card — usar p/ CONFERIR O FILL de todo escudo novo). Novos em `assets/clubs/`: `sampaio-correa.svg`,
`fluminense.svg`, `sao-bento.svg`; `palmeiras.svg` corrigido (+ fontes em `_colored-source/`).

## ✅ STATUS anterior: pipeline validado de ponta a ponta + 3 cards-piloto entregues (2026-06-05)
Os MP4 estão em `card-jogos-motion/Export/` (1080×1920, 14s):
- `cialone-paulista-s14-07jun.mp4` (Cialone, mirror, perfil)
- `jean-paulista-s17-06jun-001normal.mp4` (Jean jogo_001, normal) — manter as 2 versões do Jean
- `jean-paulista-s17-06jun-002acao.mp4` (Jean jogo_002, ação, mirror, adversário fora do quadro)
- `julio-brasileiro-s17-09jun.mp4` (Julio × Flamengo, São Paulo, Brasileirão, foto jogo_005 DE COSTAS, mirror:false, badge CBF)
Recortes PB+Lomu em `assets/players/<original>_cut_pb.png` (jean jogo_001/002, cialone jogo_004, julio jogo_005). Configs: `jean-referencia.json` (001), `jean-referencia-acao.json` (002), `cialone-saopaulo.json`, `julio-flamengo.json`. Rodada da semana COMPLETA.

### Consentimento de nuvem (resolvido)
A 1ª chamada Cloud do Select Subject abre um modal de consentimento que trava o script (AppleEvent -1712). RESOLVIDO uma vez: usuário fez 1 Select Subject manual em modo Cloud aceitando o consentimento. Pré-requisito da preferência: Ajustes → Processamento de Imagem → "Selecionar Assunto e Remover Fundo" = **Nuvem (detalhado)** (só vale após **reiniciar** o PS).

### Regras de enquadramento (aprendidas — valem p/ todo card)
- **A base da foto SEMPRE sangra um filete na borda de baixo** (~25-30px abaixo de y=1920) — nunca flutua. Vale p/ corpo inteiro, ¾ E close (o Cialone é perfil/busto: o ombro/peito sangra embaixo).
- `athleteTop ≈ 1920 − (athleteWidth × imgH/imgW) + ~28`. Cabeça abaixo da linha da data (~y558).
- Foto "lotada" (outro jogador): manter no recorte e jogar pra fora via `mirror` + posição (Jean-002 entra da direita, advers. sai pela direita).
- `_shot.mjs` foi consertado (faltava `process.exit(0)` no fim — o `browser.close()` deixava o node pendurado).

### Próxima rodada (fill-and-run)
Template comentado em **`card-jogos-motion/JOBS-template.json`** (na pasta do card, como o Woney pedie). Agora um job pode trazer um objeto **`card`** com todos os campos do card → `week.mjs` CRIA/atualiza o config sozinho via `make-card.ensureConfig` (não precisa editar config à mão). Fluxo: `--stop-after treat` (recortes) → `bin/card.mjs <slug> --shot 1.6 (era 4.6; template acelerado 09/06)` (calibrar enquadramento, base sangra ~28px) → `--from render` (MP4). `run-ps.mjs` agora auto-limpa os `.tsv` temporários.

## ▶️ Como RESUMIR (com o PS já respondendo)
Tudo a partir de `AI-OS-BASE/05_projects/bicofino/image-pipeline/`:
1. **Diagnóstico isolado** do autoCutout Cloud (confirma seleção justa, não full-width):
   ```bash
   osascript -e 'with timeout of 600 seconds
   tell application "Adobe Photoshop (Beta)"
   do javascript file "'"$PWD"'/modules/ps/_diag_cloud.jsx" with arguments {"'"$PWD"'/.staging/JEAN_2026mai16_REFx0_CAMPEONATOPAULISTASUB17_jogo_002_up.png"}
   end tell
   end timeout'
   ```
   Esperado: `SEL` justo no Jean (NÃO `0,.. -> 2238,..` full-width) e poucos segundos.
2. **Tratar as 2** (reusa download + cache de upscale):
   ```bash
   PS_APP="Adobe Photoshop (Beta)" node bin/week.mjs jobs/2026-06-06-jean-cialone.json --from treat --stop-after treat
   ```
3. **Inspecionar** os PNGs em `../card-jogos-motion/assets/players/*_cut_pb.png` (recorte limpo Jean+bola, sem adversário; PB; Lomu).
4. **Calibrar** enquadramento se preciso: `node bin/card.mjs jean-referencia --set athleteTop=540 --shot 1.6 (era 4.6; template acelerado 09/06) /tmp/jean.png`
5. **Renderizar:** `node bin/week.mjs jobs/2026-06-06-jean-cialone.json --from render` → MP4 em `../card-jogos-motion/Export/`.

## Correções já aplicadas (por causa do bloqueio)
- `modules/ps/run-ps.mjs`: `with timeout of 1200 seconds` no AppleEvent (default 120s estourava no round-trip do Cloud); `timeoutMs` Node = 30min.
- `modules/treat-image.mjs`: cache de upscale (não refaz se `_up.png` mais novo que o cru existe).

## Aberto / pendências
- **Foto do Cialone (`jogo_004`)** é close de perfil (não corpo inteiro) → pode não enquadrar bem como atleta do card. Considerar outra (`jogo_001..003`) ou aceitar crop. Conferir no render.
- **Accent do Jean** = `#ec6148` (laranja real do Referência, vindo de `job.set` no jobs file). Cialone segue `#f0535e` do config.
- **Robustez offline:** Cloud Select Subject cai p/ Device **silenciosamente** sem internet → resultado grosseiro sem erro. Talvez detectar/avisar.
- **rembg** como adapter alternativo (headless, sem cloud) fica de reserva; CLI quebra por falta do módulo `filetype` → usar a **API Python** (`from rembg import remove, new_session`). Modelos baixados: `u2net`, `isnet-general-use`. `birefnet-general` ficou baixando em background (pode matar).
- Arquivos `_diag*.jsx` em `modules/ps/` são de debug (podem ficar ou sair).

## Arquivos-chave
- `config.mjs` — paths, constantes, loader de `.env`.
- `modules/ingest-drive.mjs` — Supabase REST + Drive `alt=media` (zero-dep, fetch).
- `modules/upscale.mjs` — Real-ESRGAN + cap sips.
- `modules/ps/treat.jsx` — pipeline ExtendScript (autoCutout → máscara → dup → Lomu → opacidade → P&B → merge → trim → PNG).
- `modules/ps/run-ps.mjs` — escreve manifesto TSV + dispara osascript + lê resultado.
- `modules/treat-image.mjs` — orquestra upscale + PS.
- `modules/shield-monochrome.mjs` — SVG colorido → mono #2a2c2b 80×80.
- `modules/make-card.mjs` — patch config + render via `card-jogos-motion/scripts/capture.mjs`.
- `bin/week.mjs` — orquestrador (lê `jobs/*.json`, estágios ingest→treat→patch→render).
- `presets/SETUP-photoshop.md` — setup da Action Lomu + permissões.
- `jobs/2026-06-06-jean-cialone.json` — o job piloto.
