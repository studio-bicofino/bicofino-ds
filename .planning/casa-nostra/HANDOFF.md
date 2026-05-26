# HANDOFF — Casa Nostra (Bicofino)

*Última atualização: 2026-05-26 (sessão noite). v0.6 — CadenceBar com status textual + Sinais→Movimentos rename + ícones User/Users + StatPill torino/platinum + /configuracoes + seed Ruffino Fox. Próximo chat retoma daqui.*

**Pra retomar em chat novo:**
> `Lê @.planning/casa-nostra/HANDOFF.md (e @.planning/casa-nostra/BRIEFING.md pro contexto original) e vamos continuar de onde parou.`

---

## Status — v0.6 deployada

**URL prod:** https://casa-nostra-two.vercel.app
**Repo:** `feature/casa-nostra` (a partir de `feature/vanguarda`)
**Vercel project:** `woney-malians-projects/casa-nostra` (git conectado a `WoneyMalian/bicofino-ds`)
**Magic link funcional:** Site URL e Redirect URLs no Supabase apontam pro prod. `woney@bicofino.com` e `branca@bicofino.com` na allowlist.

| Camada | Estado |
|---|---|
| App | Next 16.2.6 + React 19 + TS strict + Turbopack |
| Porta dev | `3040` |
| Secrets | Infisical (5 vars em `dev`), Vercel (4 vars em preview/prod/dev + SITE_URL) |
| DB | Supabase `bicofino-casa-nostra` — 10 tabelas + RLS + 22 grupos seed |
| Auth | Magic link via `verifyOtp({token_hash, type})` |
| Allowlist | env var `CASA_NOSTRA_ALLOWLIST` |
| Palette | Editorial Casa Nostra (crema/caffè/napoli/SEP/nocciola) — exceção DESIGN.md |
| Responsivo | Sidebar drawer <1024px · cn-page padding adaptativo · sections empilham <720px |
| Rotas | `/`, `/grupos`, `/p/[id]`, `/p/novo`, `/sinais`, `/login`, `/auth/callback` |

---

## Frentes fechadas (chats anteriores)

### Frente 1 — Lista de Pessoas funcional ✅
- `(app)/page.tsx` server component com hero display ("Casa Nostra" bold) + stat strip (Total/Em dia/Atenção/Atrasadas) + filtros + tabela editorial + paginação
- Filtros URL-driven: `q`, `cluster`, `group`, `city`, `page` em `_components/Filters.tsx`
- `CadenceBar`: barra de progresso `days_since / (365/target)`
- Linhas clicáveis via `PersonRowClient` (useRouter push pra `/p/[id]`)

### Frente 2 — Cadastro/edição de pessoa ✅
- **Decisão revisada do BRIEFING:** páginas dedicadas (não modal). `/p/novo` e `/p/[id]`.
- `_actions/persons.ts` — server actions create/update/delete com "replace-all" nas tabelas filhas (sem transação — aceitável pra audiência interna 2-3)
- `lib/db/schemas.ts` — zod schemas para todas as 10 tabelas + `personFormSchema` agregado
- `PersonForm` orquestrador + 9 seções: Identity, Categorization, Contacts, History, Connections, Geography, Evaluation, Notes, Signals
- Hero do form: foto **circular** 140×140 + display name + cluster badge + 4 stat pills (radius 9999)
- Motion v12 stagger (32ms entre seções, ≤360ms total), focus ring napoli, check verde animado em required, glass blur no footer sticky
- "Apresentado por" funcional (busca outras pessoas; hint dinâmico quando vazio)

### Frente 3 — /grupos CRUD ✅
- Server component em `(app)/grupos/page.tsx`, agrupado por `group_type`
- `AddGroupForm` (RHF + zod) + `GroupRow` com edit inline (duplo clique) + delete 2-step com aviso de vínculos
- `_actions/groups.ts` create/update/delete
- AnimatePresence em add/remove

### Frente 6 — Deploy Vercel ✅
- Projeto linkado, git conectado, 12 env entries (4 vars × 3 envs) + NEXT_PUBLIC_SITE_URL
- Build clean, Site URL e Redirect URLs configurados no Supabase

### Frente 7 — Sinais (timeline cross-person) ✅ — 2026-05-26 tarde + noite
- Rota `/sinais` server component em `(app)/sinais/page.tsx`
- Filtros URL-driven: `?type=` (validado contra enum), `?person=<uuid>`
- `_actions/signals.ts`: `createSignal` + `deleteSignal`
- `SignalsTimeline` client: estado `showForm`, AnimatePresence pro form, motion stagger nos cards
- `AddSignalForm`: RHF + zod, fecha + revalida no submit
- `SignalFilters` URL-driven (mesmo padrão de `Filters.tsx`)
- Mapping de cor por `signal_type`: interesse/ask=napoli · lifeevent=caffè · capital_move=sep · recusa=ops-danger · outro=text-secondary
- Hero idêntico ao padrão: eyebrow `// Sinais` caffè + h1 clamp 40-64 + parágrafo curto + contador mono
- **v0.3 (2026-05-26 noite):** agrupamento por mês via `useMemo(groupByMonth)` preservando ordem cronológica do server; `MonthHeader` sticky em `top: 0` (fundo crema + border-bottom nocciola, label "Maio de 2026" + contador mono); delete inline 2-step por card espelhando `GroupRow` (Trash2 ghost → "Confirmar?" pill com auto-cancel 4s, `useTransition`); `motion.article layout` + `AnimatePresence mode="popLayout"` → exit suave (`scale: 0.96`) sem reflow brusco

### Frente 12 — CadenceBar status textual + rename Movimentos + ícones ✅ — 2026-05-26 noite (v0.6)
- **CadenceBar** ganhou label mono uppercase colorido logo abaixo da barra: "EM DIA" (SEP verde) · "ATENÇÃO" (âmbar) · "ATRASADA" (SPFC danger). Thresholds (≤1.0/≤1.5/>1.5) batem com a stat strip da home — números do header coerentes com estados das linhas
- Novo token `--bf-cn-amber #c2862a` (âmbar editorial) em `globals.css`
- **Rename user-visible "Sinais" → "Movimentos"** (rota /sinais, tabela signals, componentes/tipos no código ficam como estão — só labels): Sidebar, hero `/sinais`, contadores ("X movimentos"), botões ("+ Adicionar movimento", "Salvar movimento"), empty states, aria-labels, eyebrow "09 · Movimentos" no PersonForm, placeholder de Notes ("movimentos qualitativos"), card de Volume em /configuracoes
- **Ícones sidebar**: Pessoas usa `User` (silhueta única), Grupos usa `Users` (dupla) — antes era Users + UsersRound

### Frente 11 — /configuracoes + StatPill redesign + seed Ruffino ✅ — 2026-05-26 noite (v0.5)
- **Cores ops Casa Nostra** novos tokens em `globals.css`: `--bf-cn-torino #821324` (score máximo) e `--bf-cn-platinum #a8c9e5` (score parcial)
- **StatPill** (hero do PersonForm) preenche com torino quando 5/5, platinum quando 1-4, fonte branca Inter Bold; spring scale 0.6→1 no número via AnimatePresence quando aparece ou muda
- **Cluster A**: hint "núcleo duro" → "insider"
- **`/configuracoes`** server component com 4 seções: Estado (versão · modo construção · sessão · stack), Volume (counts pessoas/grupos/sinais como cards-link), Allowlist read-only, Em breve (roadmap). Alerta amarelo loud quando bypass on.
- **Seed Ruffino Fox**: `scripts/seed-ruffino.mjs` recupera o cadastro perdido por um deploy antigo (foto upload, intro_by Woney, grupo Amigos Particulares, sinal Vespa). Idempotente — `infisical run --env=dev -- node scripts/seed-ruffino.mjs`

### Frente 9 — Photo upload Supabase Storage ✅ — 2026-05-26 noite (v0.4)
- Migration `db/migrations/0002_storage_people_photos.sql` cria bucket público `people-photos` + 3 policies (insert/update/delete pra `authenticated`)
- `src/lib/storage/upload-action.ts` server action `uploadPhotoAction(formData)` valida MIME (jpg/png/webp/avif/heic) + 5MB, upload com filename UUID, retorna URL pública
- `src/lib/storage/photos.ts` virou wrapper client que envia FormData pra action (refatorado pra funcionar em bypass mode também)
- `src/app/(app)/p/_components/sections/PhotoUploader.tsx` substitui o input de URL: drop zone + click + **paste (⌘V/Ctrl+V global)** via listener `window.addEventListener('paste')`, preview circular 64px com spinner, "Trocar"/"Remover", flash napoli na captura de paste, erros animados
- Cluster A: "núcleo duro" → "insider" (Categorization.tsx)

### Frente 10 — Bypass de login (modo construção) ✅ — 2026-05-26 noite (v0.4)
- Env var `CASA_NOSTRA_AUTH_BYPASS=1` (Infisical dev + Vercel dev/preview/prod via REST API)
- `src/lib/auth/session.ts` — `getSession()` retorna sessão "bypass" (userId=null, isAuthenticated=false) quando flag on
- Middleware: early return (sem redirect/refresh) quando bypass
- `(app)/layout.tsx`: usa `getSession()` em vez de `auth.getUser()`; sidebar mostra "modo construção" no rodapé
- `lib/supabase/server.ts`: quando bypass on, `createClient()` retorna admin client (service_role) — RLS ignorada server-side
- `persons.ts`: refatorado pra usar `getSession()`; `created_by`/`updated_by` viram `null` em bypass
- `groups.ts` e `signals.ts` já eram bypass-safe (`user?.id ?? null`)
- **PENDÊNCIA pra final do projeto:** religar login removendo `CASA_NOSTRA_AUTH_BYPASS` das 3 envs Vercel + Infisical. Dados criados durante este período são de teste — limpar antes do go-live real.

### Frente 8 — Polimento visual editorial v0.2 ✅ — 2026-05-26 tarde
- **Tokens nocciola**: `--bf-border` virou `#d8d7d3` (nocciola sólida), `--bf-border-strong` virou `#b8b6ae`. Todas as bordas do site puxam pra paleta editorial agora.
- **Wordmark mobile** no header (`Sidebar`): `Casa Nostra // Bicofino // v1.0 // Maio 2026` em mono 9.5px com ellipsis.
- **Hero da lista**: eyebrow `// Bem-vindo à nossa casa` (caffè, mono 12px). Removida linha "Bicofino · Casa Nostra".
- **Stats strip**: `whiteSpace: nowrap` + padding lateral 24→12 ("Em dia" cabe em 1 linha em 375px).
- **Filtros pill**: `.cn-filter-input` (radius 9999, padding 12×18, focus napoli halo, chevron SVG inline em `<select>` pra matar o nativo cinza).
- **Tabela → lista de pill-cards**: `.cn-people-row` (radius 9999, hover translateX 2px + nocciola, focus napoli halo). Mobile 3 cols (avatar+nome+empresa), ≥960px 6 cols. `PersonRowClient` virou `motion.div` com entrada stagger (delay = index × 40ms, max 400ms) + whileTap scale 0.997.
- **Motion na navegação**: `app/(app)/template.tsx` faz fade-up suave (0.32s ease `[0.22,1,0.36,1]`) a cada navegação. Plus `.cn-stagger` CSS nas pages anima Hero/divider/toolbar via `animation-delay` por nth-child.
- **Hover pulse no botão verde**: `cn-toolbar-add` ganhou keyframe `cn-pulse` (scale 1→1.035 + halo verde 18% alpha) loopando 1.6s enquanto :hover. `:active` scale 0.97.
- **Sections do PersonForm responsivas**: nova classe `.cn-form-row` (mobile = 1fr stack, ≥720px = grid via `var(--cols)`). Aplicada em 7 grids: Contacts, History (work + bicofino), Connections (grupos + futebol), Geography, Signals. `SectionShell` refatorado pra `.cn-section-shell` (padding 20→32) + `.cn-section-grid` (1col → 2col via `var(--section-cols)`).
- **Footer do PersonForm responsivo**: `.cn-form-footer` vira coluna em mobile com botões full-width centralizados; ≥720px volta row (Apagar esquerda, Cancelar/Salvar direita). Pill total (radius 9999), sticky bottom 12px.
- **Page containers**: `.cn-page` (padding 20→32→56 + max-width 1280) + `.cn-toolbar` (column → row em 720px) substituem padding inline nas 4 telas (`/`, `/grupos`, `/p/novo`, `/p/[id]`). `body { overflow-x: hidden }` como cinto-e-suspensório.

---

## Stack confirmado (sem mudanças)

- **Next.js 16.2.6** (App Router, Turbopack, `turbopack.root = ../..`)
- **React 19.2.4**, **TS 5 strict**
- **`@supabase/ssr` 0.5.2** + **`@supabase/supabase-js` 2.45.4**
- **`motion` v12** (Framer) — usado em PersonForm, Sidebar drawer, /grupos
- **`react-hook-form` 7.53** + **`zod` 3.23** + **`@hookform/resolvers` 5.4**
- **`lucide-react` 0.513**
- **Sem Tailwind** — CSS variables + inline styles

---

## Palette editorial Casa Nostra (em `globals.css`)

Exceção ao DESIGN.md (escopo: só casa-nostra):

```css
--bf-cn-crema:    #f3ebd4;  /* fundo da página */
--bf-cn-caffe:    #33111a;  /* texto principal */
--bf-cn-nocciola: #d8d7d3;  /* apoio / borders sutis */
--bf-cn-napoli:   #77deff;  /* accent info (focus, active nav) */
--bf-cn-sep:      #2fd298;  /* accent success (botões salvar) */
```

`--bf-bg-page` = crema, `--bf-surface` = white, `--bf-text-primary` = caffè, ops-success = SEP, ops-edit = napoli.

---

## Decisões locked in (acumuladas)

1. **Sem Tailwind.** CSS vars + inline styles.
2. **`current_role` → `current_title`** (reserved word PG).
3. **Auth via `verifyOtp({token_hash, type})`**, NÃO `exchangeCodeForSession`.
4. **Route group `(app)/`** + double-check de allowlist no layout.
5. **Botão login pill** (radius 9999). Logo Bicofino esquerda no topo.
6. **`.infisical.json` commitável** (só workspace ID).
7. **Magic link expira em 1h** (default Supabase).
8. **`confirm email` Supabase = OFF**.
9. **Cadastro = página dedicada** (`/p/novo`, `/p/[id]`) — supera decisão #5 do BRIEFING (que era modal).
10. **Foto circular** no hero do form (radius 50%).
11. **Stat pills no hero do form** (radius 9999).
12. **Sidebar responsivo**: hamburger drawer abaixo de 1024px.
13. **Server actions Next "use server" só exportam funções** — types ficam locais ou em `@/lib/db/schemas.ts`.
14. **Vercel env preview** seta-se via REST API (CLI 53.2.0 bug em non-interactive sem git).
15. **Border tokens nocciola**: `--bf-border = #d8d7d3`, `--bf-border-strong = #b8b6ae`. Não voltar pra alpha caffè (perde coesão com paleta editorial).
16. **Pages usam `.cn-page` + `.cn-toolbar` + `.cn-stagger`** (CSS classes em `globals.css`) em vez de padding/grid/maxWidth inline.
17. **PersonForm sub-rows usam `.cn-form-row`** com `style={{ '--cols': '...' } as React.CSSProperties}` — mobile empilha, ≥720px aplica `--cols`.
18. **`SectionShell` usa `.cn-section-shell` + `.cn-section-grid`** — backwards-compatible: ainda aceita `gridStyle.gridTemplateColumns` que é mapeado pra `--section-cols`.
19. **Motion entre páginas**: `app/(app)/template.tsx` faz fade-up suave a cada navegação (0.32s). Trade-off conhecido: template.tsx desabilita streaming, mas pra audiência interna 2–3 vale a UX.

---

## Arquitetura — mapa de arquivos

```
apps/casa-nostra/
├── db/
│   ├── migrations/0001_initial_schema.sql   ← 10 tabelas + RLS + trigger
│   ├── seeds/0001_groups.sql                ← 22 grupos master
│   └── README.md
├── src/
│   ├── app/
│   │   ├── (app)/                            ← área autenticada
│   │   │   ├── layout.tsx                   ← auth + allowlist + <Sidebar>
│   │   │   ├── page.tsx                     ← lista de Pessoas (hero + stats + filtros + tabela)
│   │   │   ├── _components/
│   │   │   │   ├── Sidebar.tsx              ← desktop aside + mobile header + drawer (motion)
│   │   │   │   ├── Filters.tsx              ← URL-driven (q, cluster, group, city)
│   │   │   │   └── CadenceBar.tsx           ← progress bar de cadência
│   │   │   ├── p/
│   │   │   │   ├── novo/page.tsx            ← server, fetch groups+intro, renderiza PersonForm
│   │   │   │   ├── [id]/page.tsx            ← server, fetch PersonWithRelations + groups + intro
│   │   │   │   ├── _actions/persons.ts      ← create/update/delete (replace-all em filhas)
│   │   │   │   └── _components/
│   │   │   │       ├── PersonForm.tsx       ← orquestrador (motion, glass, RHF)
│   │   │   │       ├── PersonRowClient.tsx  ← linha clicável da tabela
│   │   │   │       ├── Field.tsx            ← input/textarea/select wrapper
│   │   │   │       └── sections/
│   │   │   │           ├── Identity.tsx
│   │   │   │           ├── Categorization.tsx (+ ScoreSlider)
│   │   │   │           ├── Contacts.tsx
│   │   │   │           ├── History.tsx
│   │   │   │           ├── Connections.tsx  ← "Apresentado por" + grupos + futebol
│   │   │   │           ├── Geography.tsx
│   │   │   │           ├── Evaluation.tsx
│   │   │   │           ├── Notes.tsx
│   │   │   │           ├── Signals.tsx
│   │   │   │           ├── SectionShell.tsx
│   │   │   │           └── ChipInput.tsx
│   │   │   ├── grupos/
│   │   │   │   ├── page.tsx                 ← lista agrupada por group_type
│   │   │   │   ├── _actions/groups.ts       ← createGroup/updateGroup/deleteGroup
│   │   │   │   └── _components/
│   │   │   │       ├── AddGroupForm.tsx     ← RHF + zod
│   │   │   │       └── GroupRow.tsx         ← edit inline + delete 2-step
│   │   │   ├── sinais/                       ← Frente 7
│   │   │   │   ├── page.tsx                 ← server, fetch signals + people, validate ?type=
│   │   │   │   ├── _actions/signals.ts      ← createSignal + deleteSignal
│   │   │   │   └── _components/
│   │   │   │       ├── SignalFilters.tsx    ← URL-driven (type, person)
│   │   │   │       ├── SignalsTimeline.tsx  ← lista + toolbar + showForm state
│   │   │   │       └── AddSignalForm.tsx    ← RHF + zod inline
│   │   │   └── template.tsx                  ← motion fade-up entre páginas
│   │   ├── auth/callback/route.ts           ← verifyOtp
│   │   ├── login/{page,LoginForm,actions}.tsx
│   │   ├── globals.css                      ← palette + cn-page + cn-toolbar + cn-filters + cn-people-* + cn-form-row + cn-form-footer + cn-section-* + cn-stagger + cn-pulse
│   │   └── layout.tsx
│   ├── components/{BicofinoLogo,LogoutButton}.tsx
│   ├── lib/
│   │   ├── auth/allowlist.ts
│   │   ├── db/
│   │   │   ├── types.ts                     ← interfaces TS espelhando schema
│   │   │   └── schemas.ts                   ← zod schemas + personFormSchema + PersonFormInput
│   │   └── supabase/{client,server,admin}.ts
│   └── middleware.ts                         ← session refresh + redirect /login
├── .env.local.example
├── .infisical.json
├── .vercel/                                  ← linked to woney-malians-projects/casa-nostra
└── next.config.ts
```

---

## Schema DB — referência (sem mudanças desde 0001)

10 tabelas + RLS em todas. Veja `db/migrations/0001_initial_schema.sql` (fonte da verdade) e `src/lib/db/types.ts` (interfaces TS).

Policy pattern: `select` em `people` honra `restrict_visibility`. Demais tabelas: `authenticated` lê/escreve.

22 grupos seed em `db/seeds/0001_groups.sql`.

---

## Known issues — pendentes pra próximo chat

### Bugs visuais
1. ~~**Scroll lateral no mobile**~~ — ✅ resolvido na Frente 8 (`.cn-page` + `.cn-filters` + `body { overflow-x: hidden }` + `.cn-form-row` nas sections).
2. **`backdrop-filter: blur` no footer** — reduzi de 12 → 10 e radius foi pra 9999. Se aparecer jank em mobile low-end, baixar pra 8.

### Schema / infra pendente
3. ~~**Bucket Supabase Storage `people-photos`**~~ — ✅ Frente 9 fechou. Bucket público + 3 policies criados via migration 0002. Upload via server action.
4. **`category_value` sem CHECK constraint** no DB — qualquer string passa. Schema zod pode travar com `z.enum([...])` se quiser disciplinar.
5. **Sem transação no "replace-all"** das filhas em `updatePerson` — estado parcial possível se um insert falhar. Vira RPC Postgres quando precisar.
6. **RLS no `created_by`** — `deletePerson` honra; pode bloquear delete entre Fabio e Woney. Verificar.
7. **Vercel git integration mal configurada** — Root Directory aponta pro repo root, não pra `apps/casa-nostra/`. Toda push em `feature/casa-nostra` dispara build automática que falha em 5s (`Couldn't find any pages or app directory`). Workaround atual: deploys são CLI-only (`vercel deploy [--prod] --yes` de dentro de `apps/casa-nostra/`). Fix futuro: setar Root Directory no painel Vercel.

### Features pendentes (em ordem de valor)
7. ~~**Timeline de Sinais**~~ — ✅ Frente 7 completa (v0.3 fechou delete inline + agrupamento por mês).
8. **Tela `/configuracoes`** — placeholder pra ajustes da Casa.
9. **Modal pop-up de detalhes** ou continuar com `/p/[id]` editável (já temos). Read-only view se Fabio pedir.
10. **Customizar template de email Supabase** (header com logo, HTML editorial).
11. ~~**Cadência visual mais rica** na tabela~~ — ✅ Frente 12 fechou (status text colorido em dia/atenção/atrasada).
12. **Performance** — `revalidatePath('/')` toda mutation em `/grupos` força refetch caro. Otimizar quando base crescer.

---

## Como rodar local (sem mudanças)

```bash
cd apps/casa-nostra
npm install
npm run dev  # roda em http://localhost:3040 com Infisical-injected env
```

Fallback sem Infisical: `cp .env.local.example .env.local`, preencher, `npm run dev:no-infisical`.

---

## Como fazer deploy

CLI bug em Vercel 53.2.0: `vercel env add NAME preview --yes` exige branch arg mesmo non-interactive. Workaround documentado:

```bash
# Para adicionar env vars no Vercel via REST API (bypass CLI bug)
VERCEL_TOKEN=$(cat ~/Library/Application\ Support/com.vercel.cli/auth.json | grep -o '"token":[^,}]*' | sed 's/.*: *"//;s/"$//')
PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | sed 's/.*:"//;s/"$//')
TEAM_ID=$(cat .vercel/project.json | grep -o '"orgId":"[^"]*"' | sed 's/.*:"//;s/"$//')

curl -s -X POST "https://api.vercel.com/v10/projects/${PROJECT_ID}/env?teamId=${TEAM_ID}" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" -H "Content-Type: application/json" \
  --data '{"key":"NAME","value":"VAL","type":"encrypted","target":["preview"]}'
```

Para PATCH (atualizar valor existente): `PATCH /v10/projects/{PID}/env/{envId}?teamId={TID}` com body `{"value":"NEW"}`.

**Importante:** Infisical dotenv export envolve valores em single quotes — strippar antes de POSTar (perdi 1h debugando "Invalid supabaseUrl").

Deploy: `vercel deploy --prod --yes` (primeiro deploy = production por padrão). Site URL e Redirect URLs no Supabase precisam apontar pro novo domínio.

---

## Critical context — não esquecer

- **`pbcopy < file`** é o caminho seguro pra colar SQL no editor do Supabase. Não abre no Antigravity (buffer da IDE conflita com edits).
- **Gmail prefetch** consome tokens de magic link em alguns casos. Mitigação: `token_hash` + `verifyOtp` (já feito).
- **Infisical CLI** em `~/.local/bin/infisical` v0.43.86 (direct binary, não brew).
- **Dual git remote** ativo: `git push` envia pra origin (WoneyMalian) E bicofino (studio-bicofino) automaticamente.
- **HARD RULE git**: NUNCA `git reset --hard` ou `checkout --` com working tree dirty. Cherry-pick em vez de reset+branch.
- **HARD RULE briefing**: ler BRIEFING + HANDOFF integralmente antes de propor scope/schema. Não inventar extensões fora do contrato.
- **HARD RULE agentes**: em features grandes (≥3 arquivos), despachar sub-agentes em paralelo (single message, multiple Agent calls). Preservar janela de contexto do orquestrador.

---

## Files pra ler PRIMEIRO em chat novo

1. `.planning/casa-nostra/HANDOFF.md` (este — status + estado atual)
2. `.planning/casa-nostra/BRIEFING.md` (contexto original locked)
3. `apps/casa-nostra/src/app/(app)/page.tsx` (lista — referência de estilo)
4. `apps/casa-nostra/src/app/(app)/p/_components/PersonForm.tsx` (form — referência de motion/glass)
5. `apps/casa-nostra/src/app/globals.css` (palette + CSS classes)
6. `apps/casa-nostra/src/lib/db/types.ts` (shape do dado)
7. `apps/casa-nostra/src/lib/db/schemas.ts` (zod schemas + form input)
8. `DESIGN.md` (tokens + §Exceptions — palette Casa Nostra)
9. `CLAUDE.md` (regras do projeto)

---

*v0.6 em prod com CadenceBar textual coerente com stat strip + rename Movimentos + ícones User/Users limpos. Próximas frentes prováveis: **F** template editorial do email Supabase (só relevante depois de religar bypass) · refactor opcional Signal→Movement no código (cosmético — URL/tabela permanecem) · vinculação com vanguarda apps (matchmaking — terceira camada planejada).*
