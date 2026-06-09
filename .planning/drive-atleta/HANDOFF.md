# HANDOFF — Drive do Atleta Bicofino

*Documento de retomada. Última atualização: 2026-06-03.*
*▶ ESTADO ATUAL: backend real NO AR e em uso pelo Fabio (drive-atleta.vercel.app). Pula direto para a seção "✅ NO AR E EM USO REAL" abaixo — as seções 1-3 são o histórico de como chegamos aqui. Próximas fatias: ARTES, retry de vídeo, preview env, Fase 4.*

---

## 1 · Estado atual (Fase 1 — MVP mockado, PRONTO)

App standalone em **`apps/drive-atleta`**, porta **3042**. Next 16 + React 19 + CSS/tokens do DS (sem Tailwind, sem lib de motion). Roda: `npm run drive` (raiz) → http://localhost:3042.

- **Branch:** `feat/drive-atleta` — 3 commits rebaseados sobre `main`, pushados nos 2 remotes (WoneyMalian + studio-bicofino). **PR ainda não aberto. Sem deploy.**
- **Telas (5):** `/a/[slug]` (fluxo do atleta, power-black) → hero Gotham · upload em lote · estado de envio · sucesso; `/painel` (off-white, M-05 bento) → busca/filtros/curadoria.
- **Catalogação real funcionando (mockada):** nome de arquivo auto-gerado e ordenável `SALVATORE_2026mai26_PALxSAO_gol_001.jpg`; pasta FOTOS/VIDEOS pelo MIME; caminho do Drive montado.
- **Persistência Fase 1:** `localStorage` (`bicofino:drive-atleta:items:v1`). Botão "resetar demo" restaura a semente (6 itens).
- Auditado pelos agentes de marca + skills `emil-design-eng` e `web-design-guidelines` (a11y, foco, touch, motion só transform/opacity).

### A arquitetura foi feita pra isso — o ponto de troca
A camada `src/lib/` isola toda a lógica de domínio. **Trocar de fase = trocar o corpo de 2 arquivos; nenhum componente muda.**

| Arquivo | Hoje (Fase 1) | Próxima fase |
|---|---|---|
| `lib/types.ts` (`MediaItem`) | forma do registro | = linha da tabela `media_items` no Supabase |
| `lib/storage.ts` | `localStorage` | chamadas Supabase (select/insert/update) |
| `lib/destination.ts` | monta string do caminho | cria/resolve pastas reais via Drive API |
| `lib/filename.ts` | gera o nome | **inalterado** — vira o nome real no Drive |
| `lib/athletes.ts` | config estática | tabela `athletes` (Fase 4) |

Árvore de destino (Shared Drive **CENTRAL BICOFINO**, em `woney@bicofino.com`):
`CENTRAL BICOFINO (shared drive) / ATLETAS / <ATLETA> / {FOTOS, VIDEOS}`
⚠️ Nota p/ o código: num Shared Drive a "raiz" é o próprio drive (`driveId`), não um segmento de path. O `lib/destination.ts` atual usa `DRIVE_ROOT = ['BICOFINO','ATLETAS']` (string de display) — ajustar para resolver dentro do `driveId` do CENTRAL BICOFINO e exibir o breadcrumb com esse nome.

---

## 2 · Objetivo da próxima fase: backend real

"Funcional com ligação Google Drive" = na prática **Drive + Supabase juntos**, porque:
- O upload precisa ser **server-side** (credencial do Google NUNCA vai pro navegador).
- O metadado catalogado precisa morar em algo consultável → Supabase.

### Decisões de arquitetura — ✅ TRAVADAS (2026-06-02)

**D1 = OAuth como o usuário Content-manager, escrevendo no Shared Drive `CENTRAL BICOFINO` (já existe).**
- **Por que NÃO service account (por enquanto):** verificado em 2026-06-02 que o Woney é só **Content manager** do CENTRAL BICOFINO (Manager = `hello@bicofino.com` / Bicofino Group S.A., = Fabio/org, fora do país agora). **Content manager não pode adicionar membros** → o Woney não consegue adicionar uma SA sozinho, e o Manager está indisponível. Então a SA fica para depois.
- **A abordagem:** OAuth agindo **como o próprio Woney** (que já tem Content manager) escreve direto no Shared Drive. Os arquivos caem **dentro do CENTRAL BICOFINO** → storage agrupado do Workspace (**aguenta vídeo grande**, não é 15GB nem My Drive pessoal). É o destino **definitivo**, não temporário.
- Como Woney tem Workspace, o **app OAuth pode ser "Internal"** (só a organização) → sem tela de app não-verificado, sem verificação do Google. Escopo `https://www.googleapis.com/auth/drive` (ou `drive.file`).
- Upload do atleta mira só **FOTOS** (imagem) e **VIDEOS** (vídeo) — roteado por MIME (`kindFromMime`). ARTES/CONTRATOS/LINKS são para outros fins.
- **Setup (pré-requisito do chat novo, Woney faz sozinho):**
  1. GCP: projeto → ativar **Drive API** → **OAuth consent screen = Internal** → criar **OAuth client (Web)** → client ID + secret → **Infisical** (não commitar).
  2. Fazer o fluxo OAuth uma vez logando com a conta que aparece como **"(você) Content manager"** no CENTRAL BICOFINO → guardar o **refresh token** no Infisical.
  3. Código: chamadas com `supportsAllDrives: true` + `driveId` do CENTRAL BICOFINO; resolve `ATLETAS/<atleta>/{FOTOS,VIDEOS}` (pastas já existem) por nome.
- **Email:** o membro aparece como `studio@bicofino.com`; conta foi/está sendo renomeada para `woney@bicofino.com`. No consentimento OAuth, **logar com a conta que tem o Content manager**. Confirmar com o admin (`hello@`/Fabio) qual é a viva — não bloqueia o upload.
- **Migração futura (quando Fabio voltar):** Manager adiciona uma **Service Account** como Content manager → troca-se OAuth por SA key (mais robusto, sem refresh token). Nenhum componente muda, só a auth no backend.
- **Pendência de info:** `driveId` do CENTRAL BICOFINO (pega-se no chat novo via API/URL).

**D2 = Resumable direto browser→Google.** Servidor inicia a sessão (`uploadType=resumable`, no Shared Drive) e devolve a `uploadUrl` descartável; o navegador faz PUT dos bytes em chunks direto no Google; ao concluir, grava metadado no Supabase. O arquivo não passa pela Vercel.

**D3 = Supabase fonte da verdade.** Tabela `media_items` (= `lib/types.ts`), RLS por atleta (Fase 4). A linha guarda `drive_file_id` + `web_view_link`. Painel lê do Supabase, nunca do Drive. Segredos no Infisical.

### ✅ PREP CONCLUÍDO (2026-06-02) — valores concretos p/ o chat novo
- **GCP:** projeto `bicofino-drive` (org `bicofino.com`, Woney = org admin). Drive API ativada. OAuth consent = **Internal**. OAuth client (Web) criado, com redirect `https://developers.google.com/oauthplayground` registrado. Escopo `https://www.googleapis.com/auth/drive` (restricted, mas OK por ser Internal).
- **Supabase:** projeto `bicofino-drive-atleta` (org `studio-bicofino`, Free), ref **`epfqgyczujaroayqslwk`**, URL **`https://epfqgyczujaroayqslwk.supabase.co`**, região `us-west-2`. **Sem migrations ainda → criar a tabela `media_items`.**
- **Infisical:** projeto `bicofino-drive-atleta`, env `Development`. **JÁ tem:** `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_PASSWORD`. **FALTAM (gerar no chat novo):** `GOOGLE_OAUTH_REFRESH_TOKEN`, `GOOGLE_DRIVE_ID`.

### Primeiros passos da Fatia 1 (chat novo)
1. **Refresh token:** OAuth Playground (developers.google.com/oauthplayground) → engrenagem → "Use your own OAuth credentials" → cola Client ID/Secret → autoriza o escopo `…/auth/drive` **logando com a conta Content-manager do CENTRAL BICOFINO** → "Exchange authorization code for tokens" → copia o **refresh token** → Infisical (`GOOGLE_OAUTH_REFRESH_TOKEN`).
2. **driveId:** abrir o Shared Drive CENTRAL BICOFINO no navegador → o ID está na URL (`drive/folders/<ID>` ou via API `drives.list`) → Infisical (`GOOGLE_DRIVE_ID`).
3. **Tabela:** criar `media_items` no Supabase (SQL espelhando `lib/types.ts`).
4. Codar `POST /api/upload` (foto) + trocar `lib/storage.ts` p/ Supabase + `lib/destination.ts` p/ resolver pastas no Shared Drive (`supportsAllDrives:true`). Verificar 1 foto ponta-a-ponta. Depois: resumable (vídeo) + deploy Vercel.

---

#### (referência) o raciocínio por trás de D2
**D2 · Upload de vídeo grande (limite da Vercel)** — *resumable direto browser→Google*
- Função serverless da Vercel tem teto de corpo (~4.5MB) e tempo. Vídeo de jogo tem 100MB+.
- ✅ **Recomendado:** o servidor (route handler) inicia uma **sessão de upload resumable do Drive** (`uploadType=resumable`) e devolve a `uploadUrl` ao navegador; o **navegador faz PUT dos bytes direto no Google** (em chunks). Ao terminar, o cliente avisa o servidor → grava metadado no Supabase. O arquivo **não passa pela Vercel**.
- ⭕ Alternativa: navegador → Vercel Blob / Supabase Storage (signed URL) → job move pro Drive. Mais peças móveis.

**D3 · Onde mora o metadado** — Supabase Postgres
- Tabela `media_items` espelhando `lib/types.ts`. RLS por atleta (ver [[project_platform_roadmap]] — Athlete Portal).
- Segredos via **Infisical** (conta `woney@bicofino.com` — ver [[project_accounts]]). Nunca commitar.

**D4 · Auth do link do atleta** — *fora do escopo da primeira fatia.* Mantém sem login no MVP; token assinado por atleta vem na Fase 4.

---

## 3 · Plano recomendado — fatia vertical fina primeiro

Não construir tudo de uma vez. Provar o cano com 1 upload real ponta-a-ponta, depois endurecer.

**Fatia 1 — provar o cano (1 foto):**
1. Google Cloud: criar projeto + service account + habilitar Drive API. Baixar JSON da SA → Infisical.
2. Criar Shared Drive (ou pasta compartilhada) e mover `ATLETAS`; compartilhar com a SA. Guardar o folder ID raiz.
3. `lib/destination.ts`: implementar `ensureFolderPath()` (cria/resolve `ATLETAS/<atleta>/FOTOS|VIDEOS`, cacheia folder IDs).
4. Route handler `POST /api/upload` (server): recebe metadados + arquivo pequeno (foto), faz upload simples (`files.create` multipart) no folder resolvido, retorna fileId/webViewLink.
5. Supabase: tabela `media_items`; `lib/storage.ts` → insert no Supabase em vez de localStorage.
6. Verificar: subir 1 foto pelo app → aparece no Drive com o nome gerado + linha no Supabase + card no Painel.

**Fatia 2 — vídeo grande (resumable):**
7. `POST /api/upload/session` inicia sessão resumable, devolve uploadUrl.
8. Cliente faz PUT em chunks direto no Google; ao concluir, `POST /api/upload/complete` grava metadado.

**Fatia 3 — robustez:**
9. Progresso real (substitui o stepper mockado), retry de chunk, erros inline, estados de falha.
10. Painel lê do Supabase; status de curadoria persiste no banco.

**Fase 4 (depois):** links individuais por atleta (`/a/[slug]` já pronto) + token assinado + auth do painel interno.

---

## 4 · Riscos / gotchas
- **Vercel turbopack monorepo:** `next.config.ts` já tem `turbopack.root` correto (ver [[project_turbopack_root]]). Manter.
- ~~My Drive vs Shared Drive (D1)~~ ✅ RESOLVIDO — escrever no Shared Drive `CENTRAL BICOFINO` via **OAuth como o usuário Content-manager** (Woney não é Manager, não pode adicionar SA; Fabio/Manager fora). Arquivos no Shared Drive = storage do Workspace (ok p/ vídeo). `supportsAllDrives: true` em toda chamada. SA fica para quando o Manager puder adicioná-la.
- **Tamanho/tempo de função** (D2) — não rotear vídeo pela Vercel.
- **Não commitar** fontes/assets manuais nem segredos. Gotham já está em `public/fonts` (precedente do woney-registro).
- **Deploy:** projeto Vercel da empresa é `bicofino-ds` / studio-bicofino (ver [[project_docs_site_vercel]]) — confirmar se o monorepo deploya esse app ou se cria projeto próprio.

## 5 · Como retomar (primeiros comandos da próxima sessão)
```bash
cd /Users/woneymalian/Developer/Bicofino-ecossistema
git checkout feat/drive-atleta
cd apps/drive-atleta && npm install && npm run dev   # confere a Fase 1 rodando em :3042
```
Ler este HANDOFF + `apps/drive-atleta/README.md` (fases 2/3/4) integralmente antes de propor schema/scope.

## Critério de "pronto" da próxima fase
- [x] OAuth Internal configurado (client ID/secret + refresh token da conta Content-manager no Infisical) + Supabase + Infisical prontos
- [x] 1 foto sobe de verdade: Drive (nome gerado) + Supabase + Painel — ponta a ponta ✅ (verificado em dev E em prod, e limpo)
- [x] Upload via resumable sem passar pela Vercel — vale p/ foto E vídeo (single-PUT; retry de chunk fica p/ Fatia 3)
- [x] `lib/storage.ts` e `lib/destination.ts` trocados; componentes praticamente inalterados (storage virou async → ajustes mínimos no painel/upload)
- [x] build/typecheck passam; sem segredo commitado

---

## ✅ NO AR E EM USO REAL (atualizado 2026-06-09)

**Produção: https://drive-atleta.vercel.app** (projeto Vercel `drive-atleta`, time studio-bicofino,
orgId `team_i0JJAtJE82qUjMOqY08RTD3o`). Hub em `/` (lista os atletas) · upload em `/a/<slug>` · Painel `/painel`.
Fabio já está usando ao vivo — há uploads reais no acervo (Salvatore, Julio, Caio). Tudo mergeado na `main` (último PR #17). **2026-06-09: Lucas Ovies + Gabriel Rigorfi adicionados (athletes.ts + pastas no Drive + deploy prod) — mudança em `athletes.ts` PENDENTE DE COMMIT no working tree (já no ar via deploy de working tree, mas não commitada/pushada).**

### ⚠️ DEPLOY MUDOU — agora deploya da RAIZ do monorepo (não da pasta do app)
O projeto Vercel agora tem **Root Directory = `apps/drive-atleta`** nas settings. Isso quebra o `cd apps/drive-atleta && vercel --prod` antigo (dobra o caminho → `apps/drive-atleta/apps/drive-atleta does not exist`). **Procedimento atual** (da raiz `/Users/woneymalian/Developer/Bicofino-ecossistema`):
```bash
mkdir -p .vercel && cp apps/drive-atleta/.vercel/project.json .vercel/project.json   # link temp do projeto na raiz
printf 'AI-OS-BASE\napps/*/public/media\napps/*/public/brand\n.planning\n' > .vercelignore  # senão sobe 900MB+ e estoura 100MB/arquivo
vercel --prod --scope studio-bicofinos-projects --yes
rm -rf .vercel .vercelignore   # limpa os temporários (não commitar)
```
Sem o `.vercelignore` a CLI sobe os untracked gigantes do monorepo (`AI-OS-BASE/*.ai` 315MB, `apps/web/public/media/*.mp4` 199MB) e o Google/Vercel rejeita com "File size limit exceeded (100 MB)". Projeto NÃO é git-connected (sem auto-deploy por push) → deploy é só via CLI.

**Criar pasta de atleta no Drive:** `scripts/create-athlete-folder.mjs` (acha-ou-cria `ATLETAS/<NOME>/{FOTOS,VIDEOS}`, idempotente). Roda sem Infisical usando o `.env.local` do app:
```bash
cd apps/drive-atleta && node --env-file=.env.local scripts/create-athlete-folder.mjs "GABRIEL RIGORFI"
```
(o `.env.local` tem as 4 chaves Google; o `infisical login` por browser NÃO funciona neste ambiente — "operation not supported by device". Build/deploy: Next carrega `.env.local` sozinho, NÃO passar `--env-file` pro `next build`/`vercel` senão `ERR_WORKER_INVALID_EXEC_ARGV`.)

### 2026-06-09 — link individual do atleta (isolamento leve, sem login)
Decisão do Woney: o link pra dar pra cada atleta é o próprio **`/a/<slug>`** (nome, adivinhável, fácil de manter — SEM token/capability-URL por ora; login fica p/ o futuro se precisar). Isolamento é só "não dar saída": a página do atleta NÃO expõe mais o hub (todos) nem o `/painel` (back-office de curadoria). Implementação: `TopBar` ganhou `brandHref`/`rightHref` (null = marca inerte + esconde a pill); `UploadFlow` chama `<TopBar brandHref={null} rightHref={null} />`; `SuccessState` perdeu o "Ver no Painel Bicofino". Woney acessa hub `/` e `/painel` direto pela URL. Atletas podem, em tese, adivinhar `/a/<outro-nome>` — aceito (Woney: "não é o fim do mundo").

### Funcionalidades no ar (entregues nesta fase, todas mergeadas + deployadas)
- **Hub `/`** lista os atletas (cards `.hub-link` com hover/press/focus). Cada → `/a/<slug>`.
- **16 atletas** em `lib/athletes.ts` (Caio Henrique, Eloi Gómez Saus, Gabriel Mendes, **Gabriel Rigorfi**, Guilherme Kerchner, Jean Jesus, Joaquim Miranda, Julio Cezar, Lucas Henrique, **Lucas Ovies**, Luigi Brancatelli, Pedro Cialone, Rhian Marinho, Ronaldo Prado, Salvatore Brancatelli, Yuri Lima). Todos sem position/club. `driveFolder` = nome EXATO da pasta (acentos). Adicionar = 1 linha + rodar `create-athlete-folder.mjs` + deploy.
- **Preview real das fotos no Painel** via proxy `/api/thumb?id=<driveFileId>` (thumbnailLink do Drive, ~10-50KB, com token de serviço; cache 1h no browser). `Thumb` cai no placeholder se a miniatura falhar.
- **Detecção de foto repetida (arquivo idêntico):** SHA-256 dos bytes no navegador (`lib/hash.ts`) → coluna `media_items.content_hash` (migration 0002). `/api/check-duplicate` avisa no card ("Já no acervo (data)"), **nunca bloqueia**. Vídeo não é hasheado. Backfill do legado feito (`scripts/backfill-hash.mjs`).
- **Nome do arquivo:** inclui Jogo (se houver) E Campeonato/Contexto (se houver) via `contextToken` CamelCase. Ex.: `CAIO_2025out20_ApresentacaoAlashkert_viagem_002.png`.
- **Metadados na descrição do arquivo no Drive** (`lib/description.ts`): atleta, data, categoria, jogo, contexto, tags, obs. viajam COM o arquivo (painel Detalhes do Drive). Backfill feito (`scripts/backfill-description.mjs`).
- **Observação no card do Painel:** escondida por padrão, botão "olho" (Eye/EyeOff) revela inline.

### Fatos concretos travados

### Fatos concretos travados
- **driveId CENTRAL BICOFINO:** `0AFqfyA1jOTXGUk9PVA` (no Infisical como `GOOGLE_DRIVE_ID`).
- **Refresh token:** gerado via OAuth Playground logando como Content-manager → Infisical (`GOOGLE_OAUTH_REFRESH_TOKEN`).
- **Supabase pooler que FUNCIONA p/ migrations:** `aws-1-us-west-2.pooler.supabase.com:5432` (o `aws-0` dá XX000). Direto `db.<ref>` é IPv6-only.
- **CORS:** o PUT resumable direto browser→Google FUNCIONA. A rota `/api/upload/session` passa o `Origin` do request ao iniciar a sessão; o Google devolve `Access-Control-Allow-Origin: <origin>` + `Allow-Methods: PUT`. Verificado em localhost e em `https://drive-atleta.vercel.app`.
- **`files.delete` permanente em Shared Drive é proibido p/ Content manager (404)** → para remover, mandar pra lixeira (`PATCH {trashed:true}`). Ver `scripts/cleanup-test.mjs`.

### O cano + rotas (D2 + D3)
1. `POST /api/upload/session` — gera o nome (seq = count no Supabase), resolve `ATLETAS/<atleta>/{FOTOS,VIDEOS}` sob o driveId (acha-ou-cria), monta a descrição, inicia sessão resumable, devolve `uploadUrl`. Recebe tags+notes (pra descrição) + hash via complete.
2. Navegador faz **PUT dos bytes direto no Google** (XHR com progresso). Não passa pela Vercel.
3. `POST /api/upload/complete` — grava a linha em `media_items` (service role), incl. `content_hash`. Painel lê do Supabase.
4. `POST /api/curate` — muda status (service role). Chave anon do navegador é só leitura (RLS).
5. `POST /api/check-duplicate` — { athleteSlug, hashes[] } → matches por hash (filename+date).
6. `GET /api/thumb?id=<driveFileId>` — proxy da miniatura do Drive p/ o preview do Painel.

**Migrations** (`supabase/migrations/`, idempotentes — `node scripts/migrate.mjs`): `0001_media_items.sql` (tabela, 19 cols, RLS+policy de leitura), `0002_content_hash.sql` (coluna + index por atleta,hash).

### Env vars na Vercel (production + development; **preview ficou pendente** — CLI pede branch)
Os 8: `GOOGLE_OAUTH_CLIENT_ID/SECRET/REFRESH_TOKEN`, `GOOGLE_DRIVE_ID`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_PASSWORD`. Fonte: Infisical projeto `bicofino-drive-atleta` env `dev` (id `db5128c3-f199-46d4-88e8-b02e60d8a1e7`).

### Scripts utilitários (em `apps/drive-atleta/scripts/`) — todos via `infisical run --projectId db5128c3-... --env dev --silent -- node scripts/<x>.mjs`
- `migrate.mjs` — roda `supabase/migrations/*.sql`.
- `drive-setup.mjs` — valida refresh token + lista Shared Drives + acha o driveId.
- `test-e2e.mjs` — teste do cano (`E2E_BASE=<url> node scripts/test-e2e.mjs`).
- `cleanup-test.mjs` — remove artefato de teste (Drive→lixeira + linha no Supabase).
- `backfill-hash.mjs` — preenche `content_hash` do acervo legado (baixa alt=media, sha256).
- `backfill-description.mjs` — preenche a descrição no Drive do acervo legado.

### Como rodar/deployar (chat novo)
- **Dev local:** `infisical run --projectId db5128c3-f199-46d4-88e8-b02e60d8a1e7 --env dev -- npm run dev` (na pasta do app; porta 3042). NUNCA subir sem o `infisical run` (faltam env → rotas quebram). Matar server velho na 3042 antes (`lsof -ti :3042 | xargs kill -9`).
- **Build:** `infisical run ... -- npm run build`.
- **Deploy prod:** `cd apps/drive-atleta && vercel --prod --scope studio-bicofinos-projects --yes` (sobe do working tree).
- **Git:** branch `feat/drive-atleta`; `git push origin ...` envia pros 2 remotes. PRs `gh pr create/merge --repo studio-bicofino/bicofino-ds --base main` (a `main` canônica é a do studio-bicofino, NÃO o mirror WoneyMalian — ver [[project_github_setup]]). `zsh` não faz word-split: usar arrays; `curl/jq` às vezes somem do PATH → usar `/usr/bin/curl`.

### O que falta (próximas fatias)
- **ARTES (posts de Instagram) — pedido do Fabio (2026-06-02):** cada atleta tem `ATLETAS/<atleta>/ARTES` (além de FOTOS/VIDEOS/CONTRATOS/LINKS/NIKE). Hoje o upload roteia SÓ por MIME (`kindFromMime`: imagem→FOTOS, vídeo→VIDEOS) — mas uma "arte" também é imagem (PNG), então MIME não distingue. Próxima rodada: deixar o atleta/curadoria escolher mandar pra **ARTES**. Pontos de toque:
  - `lib/types.ts` — `MediaKind` hoje é `'foto'|'video'`; precisa de um terceiro destino `'arte'` (ou um campo `bucket`/`destino` separado do `kind`, já que arte é image/*). Decidir: ampliar `MediaKind` vs. coluna nova.
  - `supabase/migrations/` — o `check` de `media_items.kind` é `('foto','video')`; nova migration p/ incluir `'arte'` (ou nova coluna + check).
  - `lib/destination.ts` — `kindFolder()`/`driveSegments()` mapeando `arte`→`ARTES`.
  - UI: um toggle/opção no `UploadFlow` ("É arte/post de Instagram?") e filtro `ARTES` no Painel (`categories.ts` KIND_LABEL + filtro de tipo em `painel/page.tsx`).
  - `lib/drive.ts` resolveFolderId já acha-ou-cria qualquer segmento — a pasta ARTES já existe, então é só passar o segmento certo.
- **Fatia 2/3 — robustez de vídeo:** chunked PUT com retry por chunk (hoje é single-PUT; ok p/ foto e vídeo médio, mas conexão de celular caindo no meio de um vídeo grande reinicia do zero). Progresso já é real.
- **Preview env na Vercel** (rodar `vercel env add ... preview` informando branch).
- **Fase 4:** token assinado por atleta + auth do painel (hoje leitura pública no MVP — RLS só com policy de select).
