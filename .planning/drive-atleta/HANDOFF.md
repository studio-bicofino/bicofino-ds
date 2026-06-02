# HANDOFF — Drive do Atleta Bicofino

*Documento de retomada. Última atualização: 2026-06-02.*
*Objetivo da próxima fase: tornar o app funcional de verdade — upload real no Google Drive + metadados no Supabase.*

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

**D1 = Service Account + Shared Drive `CENTRAL BICOFINO` (já existe).**
- O Shared Drive **CENTRAL BICOFINO** (criado pelo Fabio, admin do Workspace) já tem a árvore `ATLETAS / <ATLETA> / {ARTES, CONTRATOS, FOTOS, LINKS, VIDEOS}` para ~16 atletas. **Nenhuma reestruturação necessária.**
- Backend autentica com a **chave JSON de uma Service Account** (sem OAuth, sem refresh token, sem domain-wide delegation). A SA entra como **membro Content manager** do Shared Drive → escreve direto, arquivos pertencem à empresa, storage do Workspace (não 15GB pessoal).
- Upload do atleta mira só **FOTOS** (imagem) e **VIDEOS** (vídeo) — roteado por MIME (`kindFromMime`). ARTES/CONTRATOS/LINKS são para outros fins.
- **Setup (pré-requisito do chat novo):**
  1. GCP: projeto → ativar Drive API → criar SA → gerar chave JSON → **Infisical** (não commitar).
  2. Drive: CENTRAL BICOFINO → Gerenciar membros → adicionar o email da SA como **Content manager** (precisa ser Manager do Shared Drive → Fabio ou Woney promovido).
  3. Código: chamadas com `supportsAllDrives: true` + `driveId` do CENTRAL BICOFINO; resolve pastas existentes por nome.
- **Pendências de info:** (a) `driveId` do CENTRAL BICOFINO; (b) confirmar quem tem acesso ao GCP da Bicofino; (c) IDs (ou resolução por nome) das pastas FOTOS/VIDEOS por atleta.
- ⛔ Descartado: OAuth refresh token (frágil, cota pessoal) — não é mais necessário, já que o Shared Drive existe.

**D2 = Resumable direto browser→Google.** Servidor inicia a sessão (`uploadType=resumable`, no Shared Drive) e devolve a `uploadUrl` descartável; o navegador faz PUT dos bytes em chunks direto no Google; ao concluir, grava metadado no Supabase. O arquivo não passa pela Vercel.

**D3 = Supabase fonte da verdade.** Tabela `media_items` (= `lib/types.ts`), RLS por atleta (Fase 4). A linha guarda `drive_file_id` + `web_view_link`. Painel lê do Supabase, nunca do Drive. Segredos no Infisical.

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
- ~~My Drive vs Shared Drive (D1)~~ ✅ RESOLVIDO — usar o Shared Drive `CENTRAL BICOFINO` existente; SA como membro Content manager (sem domain-wide delegation). Lembrar de `supportsAllDrives: true` em toda chamada da Drive API.
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
- [ ] D1/D2/D3 decididos (Shared Drive criado, SA com acesso, Supabase + Infisical configurados)
- [ ] 1 foto sobe de verdade: Drive (nome gerado) + Supabase + Painel — ponta a ponta
- [ ] 1 vídeo grande sobe via resumable sem passar pela Vercel
- [ ] `lib/storage.ts` e `lib/destination.ts` trocados; componentes **inalterados**
- [ ] build/typecheck passam; sem segredo commitado
