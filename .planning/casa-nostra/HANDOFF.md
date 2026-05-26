# HANDOFF — Casa Nostra (Bicofino)

*Última atualização: 2026-05-26 (sessão noite). v0.7 — Movement TS refactor + autocomplete com canonicalização de grafias + crema 40% wrapper. Próximo chat retoma daqui.*

**Pra retomar em chat novo:**
> `Lê @.planning/casa-nostra/HANDOFF.md (e @.planning/casa-nostra/BRIEFING.md pro contexto original) e vamos continuar de onde parou.`

---

## Status — v0.7 deployada

**URL prod:** https://casa-nostra-two.vercel.app
**Repo:** `feature/casa-nostra` (a partir de `feature/vanguarda`)
**Vercel project:** `woney-malians-projects/casa-nostra` (git conectado a `WoneyMalian/bicofino-ds`)
**Magic link funcional:** Site URL e Redirect URLs no Supabase apontam pro prod. `woney@bicofino.com` e `branca@bicofino.com` na allowlist (mas hoje **bypass on** — qualquer um entra).

| Camada | Estado |
|---|---|
| App | Next 16.2.6 + React 19 + TS strict + Turbopack |
| Porta dev | `3040` |
| Secrets | Infisical (5 vars em `dev`), Vercel (4 vars em preview/prod/dev + SITE_URL + BYPASS) |
| DB | Supabase `bicofino-casa-nostra` — 10 tabelas + RLS + 22 grupos seed |
| Auth | Magic link via `verifyOtp({token_hash, type})` — **bypass on** durante construção |
| Allowlist | env var `CASA_NOSTRA_ALLOWLIST` |
| Palette | Editorial Casa Nostra (crema/caffè/napoli/SEP/nocciola) — exceção DESIGN.md |
| Vocabulário | "Movimentos" user-visible · "Movement" no código TS · `signals/signal_type` DB |
| Responsivo | Sidebar drawer <1024px · cn-page padding adaptativo · sections empilham <720px |
| Rotas | `/`, `/grupos`, `/p/[id]`, `/p/novo`, `/sinais`, `/configuracoes`, `/login`, `/auth/callback` |

---

## Frentes fechadas

### Frente 1 — Lista de Pessoas funcional ✅
- Hero display + stat strip (Total/Em dia/Atenção/Atrasadas) + filtros URL-driven + tabela editorial + paginação
- `CadenceBar`: barra de progresso + status textual "EM DIA" (SEP) / "ATENÇÃO" (âmbar) / "ATRASADA" (danger)
- Linhas clicáveis via `PersonRowClient`

### Frente 2 — Cadastro/edição de pessoa ✅
- Páginas dedicadas `/p/novo` e `/p/[id]` (não modal — supera decisão #5 do BRIEFING)
- `_actions/persons.ts` create/update/delete com "replace-all" nas filhas
- 9 sections: Identity, Categorization, Contacts, History, Connections, Geography, Evaluation, Notes, Movements
- Hero do form: foto circular 140×140 + display name + cluster badge + 4 StatPills (torino/platinum)
- Motion v12 stagger, focus ring napoli, check verde em required, glass blur no footer sticky

### Frente 3 — /grupos CRUD ✅
- Lista agrupada por `group_type` + AddGroupForm RHF/zod + GroupRow edit inline + delete 2-step

### Frente 6 — Deploy Vercel ✅
- Projeto linkado, git conectado, env vars completas

### Frente 7 — Movimentos timeline cross-person ✅
- Rota `/sinais` (URL permanece, label "Movimentos" no UI)
- Filtros URL-driven (?type=, ?person=) · `_actions/movements.ts` · `MovementsTimeline` client + `AddMovementForm` + `MovementFilters`
- Agrupamento por mês com sticky header · delete inline 2-step

### Frente 8 — Polimento visual editorial ✅
- Tokens nocciola sólida em borders · Wordmark mobile · cn-page/cn-toolbar/cn-stagger CSS classes · pill rows na tabela · motion entre páginas (template.tsx fade-up) · hover pulse no botão verde · sections responsivas (cn-form-row, cn-section-shell)

### Frente 9 — Photo upload Supabase Storage ✅
- Migration 0002 cria bucket público `people-photos` + policies
- `PhotoUploader` com drop zone + click + paste ⌘V global + spinner + erros animados

### Frente 10 — Bypass de login (modo construção) ✅
- `CASA_NOSTRA_AUTH_BYPASS=1` em Infisical dev + Vercel dev/preview/prod
- Session helper retorna pseudo-user · middleware early-return · server client vira admin (RLS ignorada)
- **PENDÊNCIA crítica final:** religar — remover env var. Dados criados durante construção ficam.

### Frente 11 — /configuracoes + StatPill torino/platinum + seed Ruffino ✅
- Tokens `--bf-cn-torino #821324` (5/5) e `--bf-cn-platinum #a8c9e5` (1–4)
- StatPill com spring scale no número, fonte branca Inter Bold
- `/configuracoes` server component com 4 seções (Estado · Volume · Allowlist · Em breve), alerta amarelo quando bypass on
- `scripts/seed-ruffino.mjs` idempotente recupera o cadastro perdido

### Frente 12 — CadenceBar status textual + rename Movimentos + ícones ✅
- Label colorido EM DIA/ATENÇÃO/ATRASADA coerente com stat strip da home (thresholds ≤1.0/≤1.5/>1.5)
- Novo token `--bf-cn-amber #c2862a`
- User-visible: "Sinais" → "Movimentos" em toda UI (sidebar, hero, contadores, botões, empty states, aria-labels, PersonForm eyebrow, /configuracoes)
- Sidebar: Pessoas usa `User` (silhueta única), Grupos usa `Users` (dupla)

### Frente 13 — Refactor cosmético Signal → Movement no código ✅ — v0.7
- TS aliases: `Signal` → `Movement`, `SignalType` → `MovementType`
- Zod schemas: `signal*Schema/signalTypeEnum` → `movement*Schema/movementTypeEnum`
- 5 arquivos renomeados via `git mv` (preserva histórico): `SignalFilters.tsx`→`MovementFilters.tsx` · `SignalsTimeline.tsx`→`MovementsTimeline.tsx` · `AddSignalForm.tsx`→`AddMovementForm.tsx` · `_actions/signals.ts`→`_actions/movements.ts` · `sections/Signals.tsx`→`sections/Movements.tsx`
- Server actions: `createSignal/deleteSignal/CreateSignalInput` → `createMovement/deleteMovement/CreateMovementInput`
- Variáveis e ids: `SIGNAL_TYPES/SIGNAL_TYPE_OPTIONS/signalsData/SIGNAL_TYPE_SET` → versão `movement*`
- **DB boundary preservada:** URL `/sinais` (pasta=rota), tabela `signals`, coluna `signal_type`, select `signals(*)`, property keys `signals` em `PersonWithRelations` + `PersonFormInput` (mapeia 1:1 pra row shape) — todos intactos

### Frente 14 — Autocomplete + canonicalização de grafias ✅ — v0.7
**Problema resolvido:** "São Paulo", "Sao Paulo", "sao paulo" + "Bicofino" e "Bicofino ❇️" não devem virar entradas distintas em filtros/stats.

- **`src/lib/utils/strings.ts`**:
  - `normalizeKey()`: NFD diacritic strip (faixa U+0300 a U+036F) + lower + trim + colapsa espacos + **strip ornamentos** via regex `[\p{Extended_Pictographic}\p{So}\u{FE00}-\u{FE0F}\u200D\u{1F3FB}-\u{1F3FF}]`
  - `pickCanonical()` ranking: freq desc → non-ASCII LETTERS desc (acentos venceram, emojis NÃO) → isClean desc (sem ornamentos vence) → starts uppercase → alfabético
  - `canonicalizeValue/canonicalizeArray`, `buildSuggestions`
- **`src/lib/db/suggestions.ts`**: `getAllSuggestions()` (people + geography_action + work_history, agrupa por campo) · `getCitySuggestions()` lite pra filtros home
- **`AutocompleteField.tsx`**: TextField + dropdown + free typing + keyboard nav + count visível por sugestão
- **`ChipInput.tsx`**: prop `suggestions` opcional (backward-compat), dropdown agrupado, bloqueia chips com key duplicada, free typing permitido
- **7 campos wired**: home_city, home_country, current_company, expertise_area, work_history.company, geography_action.region, languages, passports
- **Home filter de cidade** vira dropdown de canônicos (`Filters.tsx`)
- **`persons.ts.canonicalizeInput()`** roda em create/update — substitui valores por canônicos mesmo se user não usar autocomplete. Garante convergência futura.
- **Script one-shot `scripts/canonicalize-existing.mjs`** idempotente. Rodado em dev: 1 empresa unificada ("Bicofino ❇️" → "Bicofino"), "Bicofono Club" continua separada (palavra diferente, não é só ornamento). Re-run zero update.

### Frente 15 — Estético: crema 40% no wrapper do PersonForm ✅ — v0.7
- Section que envolve o form em `/p/novo` e `/p/[id]`: `background: var(--bf-surface)` → `rgba(244, 234, 212, 0.4)` (Bicofino Crema #f4ead4 a 40%)
- Hero interno perde border + gradient próprios → vira transparente, mostra crema atrás
- **Hierarquia visual final:** page crema sólido → wrapper crema 40% → SectionShell cards brancos
- Stat pills (torino/platinum) e cards de seção continuam como estavam

---

## Stack confirmado (sem mudanças)

- **Next.js 16.2.6** (App Router, Turbopack, `turbopack.root = ../..`)
- **React 19.2.4**, **TS 5 strict**
- **`@supabase/ssr` 0.5.2** + **`@supabase/supabase-js` 2.45.4**
- **`motion` v12** (Framer)
- **`react-hook-form` 7.53** + **`zod` 3.23** + **`@hookform/resolvers` 5.4**
- **`lucide-react` 0.513**
- **Sem Tailwind** — CSS variables + inline styles

---

## Palette editorial Casa Nostra (em `globals.css`)

Exceção ao DESIGN.md (escopo: só casa-nostra):

```css
--bf-cn-crema:    #f3ebd4;  /* fundo da página · também usado a 40% no wrapper do form */
--bf-cn-caffe:    #33111a;  /* texto principal */
--bf-cn-nocciola: #d8d7d3;  /* apoio / borders sutis */
--bf-cn-napoli:   #77deff;  /* accent info (focus, active nav) */
--bf-cn-sep:      #2fd298;  /* accent success (botões salvar) */
--bf-cn-amber:    #c2862a;  /* CadenceBar status "atenção" */
--bf-cn-torino:   #821324;  /* StatPill score 5/5 */
--bf-cn-platinum: #a8c9e5;  /* StatPill score 1-4 */
```

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
9. **Cadastro = página dedicada** (`/p/novo`, `/p/[id]`) — supera decisão #5 do BRIEFING.
10. **Foto circular** no hero do form (radius 50%).
11. **Stat pills no hero do form** (radius 9999).
12. **Sidebar responsivo**: hamburger drawer abaixo de 1024px.
13. **Server actions Next "use server" só exportam funções**.
14. **Vercel env preview** seta-se via REST API (CLI 53.2.0 bug em non-interactive sem git).
15. **Border tokens nocciola**: `--bf-border = #d8d7d3`, `--bf-border-strong = #b8b6ae`.
16. **Pages usam `.cn-page` + `.cn-toolbar` + `.cn-stagger`**.
17. **PersonForm sub-rows usam `.cn-form-row`** com `style={{ '--cols': '...' } as React.CSSProperties}`.
18. **`SectionShell` usa `.cn-section-shell` + `.cn-section-grid`**.
19. **Motion entre páginas**: `app/(app)/template.tsx` faz fade-up suave (0.32s).
20. **Vocabulário "Movement"** no código (interface, type, schemas, components) MAS `signals/signal_type` DB. URL `/sinais` permanece. Mantém boundary clara entre user-facing (Movement) e DB (signals).
21. **Canonicalização on-save** — toda mutação em `persons.ts` passa por `canonicalizeInput()` que substitui valores free-text por canônicos existentes. `normalizeKey` ignora acentos + caixa + ornamentos/emojis. `pickCanonical` prefere variantes acentuadas + sem emoji + capitalizadas.
22. **Property keys do form mapeiam DB** — `PersonFormInput.signals` (não "movements"), `PersonWithRelations.signals`. Chaves de shape ficam atreladas à coluna DB; só os types/aliases foram renomeados.
23. **Crema 40% no wrapper do PersonForm** — `rgba(244, 234, 212, 0.4)` substitui white solid em `/p/novo` e `/p/[id]`. Hero interno transparente, sections brancas.

---

## Arquitetura — mapa de arquivos

```
apps/casa-nostra/
├── db/
│   ├── migrations/0001_initial_schema.sql        ← 10 tabelas + RLS
│   ├── migrations/0002_storage_people_photos.sql ← bucket people-photos + policies
│   └── seeds/0001_groups.sql                     ← 22 grupos master
├── scripts/
│   ├── seed-ruffino.mjs                          ← recovery do registro perdido
│   └── canonicalize-existing.mjs                 ← one-shot grafia → canônica (idempotente)
├── src/
│   ├── app/
│   │   ├── (app)/                                ← área autenticada (bypass on)
│   │   │   ├── layout.tsx                        ← getSession + allowlist + Sidebar
│   │   │   ├── page.tsx                          ← lista (hero+stats+filtros+tabela). Filtros recebem cities canônicas.
│   │   │   ├── _components/
│   │   │   │   ├── Sidebar.tsx                   ← drawer mobile + meta v1.0 / Maio 2026
│   │   │   │   ├── Filters.tsx                   ← q + cluster + group + city DROPDOWN canônico
│   │   │   │   └── CadenceBar.tsx
│   │   │   ├── p/
│   │   │   │   ├── novo/page.tsx                 ← server: fetch groups + people + suggestions
│   │   │   │   ├── [id]/page.tsx                 ← server: fetch person + relations + suggestions
│   │   │   │   ├── _actions/persons.ts           ← create/update/delete + canonicalizeInput
│   │   │   │   └── _components/
│   │   │   │       ├── PersonForm.tsx            ← Hero transparente · prop `suggestions: SuggestionsBundle`
│   │   │   │       ├── AutocompleteField.tsx     ← NOVO: TextField + dropdown sugestões
│   │   │   │       ├── PersonRowClient.tsx
│   │   │   │       ├── Field.tsx
│   │   │   │       └── sections/
│   │   │   │           ├── Identity.tsx          ← current_company, expertise_area com autocomplete
│   │   │   │           ├── Categorization.tsx
│   │   │   │           ├── Contacts.tsx
│   │   │   │           ├── History.tsx           ← work_history.company com autocomplete
│   │   │   │           ├── Connections.tsx
│   │   │   │           ├── Geography.tsx         ← city/country/region autocomplete + langs/passports ChipInput com sugestões
│   │   │   │           ├── Evaluation.tsx
│   │   │   │           ├── Notes.tsx
│   │   │   │           ├── Movements.tsx         ← (renomeado de Signals.tsx)
│   │   │   │           ├── SectionShell.tsx
│   │   │   │           ├── ChipInput.tsx         ← agora aceita prop `suggestions`
│   │   │   │           └── PhotoUploader.tsx
│   │   │   ├── grupos/                           ← CRUD de groups
│   │   │   ├── sinais/                           ← URL permanece /sinais
│   │   │   │   ├── page.tsx
│   │   │   │   ├── _actions/movements.ts         ← (renomeado de signals.ts)
│   │   │   │   └── _components/
│   │   │   │       ├── MovementFilters.tsx       ← (renomeado)
│   │   │   │       ├── MovementsTimeline.tsx     ← (renomeado)
│   │   │   │       └── AddMovementForm.tsx      ← (renomeado)
│   │   │   ├── configuracoes/page.tsx
│   │   │   └── template.tsx                      ← motion fade-up entre páginas
│   │   ├── auth/callback/route.ts
│   │   ├── login/
│   │   ├── globals.css                           ← palette + cn-page + cn-form + cn-section-* + cn-stagger
│   │   └── layout.tsx
│   ├── components/{BicofinoLogo,LogoutButton}.tsx
│   ├── lib/
│   │   ├── auth/{allowlist,session}.ts
│   │   ├── db/
│   │   │   ├── types.ts                          ← Movement (renomeado), signals key permanece em PersonWithRelations
│   │   │   ├── schemas.ts                        ← movementSchema, movementTypeEnum, etc.
│   │   │   └── suggestions.ts                    ← NOVO: getAllSuggestions, getCitySuggestions
│   │   ├── storage/{photos,upload-action}.ts
│   │   ├── supabase/{client,server,admin}.ts
│   │   └── utils/strings.ts                      ← NOVO: normalizeKey, pickCanonical, buildSuggestions
│   └── middleware.ts
├── .env.local.example
├── .infisical.json
├── .vercel/
└── next.config.ts
```

---

## Schema DB — referência (sem mudanças desde 0002)

10 tabelas + RLS em todas. Veja `db/migrations/0001_initial_schema.sql` (fonte da verdade) e `src/lib/db/types.ts` (interfaces TS).

22 grupos seed em `db/seeds/0001_groups.sql`.

Bucket `people-photos` público + 3 policies (insert/update/delete autenticado) via migration 0002.

---

## Pendências grandes pra próximo chat (em ordem de valor)

### 1. Affiliations / Organizations (decisão pendente) — feature alta

Pessoa pode ter múltiplos vínculos com organizações com logos. Caso ilustrativo: Caio Ribeiro = São Paulo (ex-jogador) + Napoli (ex-jogador) + Flamengo (ex-jogador) + Inter Milão (ex-jogador) + Globo (repórter). Renderizar logos na área ao lado da foto no hero do PersonForm. Buscar "quem tem ligação com Napoli". Indexar pro futuro matchmaking (vanguarda).

Hoje "empresa" está espalhado em 3 fontes paralelas: `current_company` (texto), `work_history.company` (texto), `futebol_links` (clube/atleta/estádio). Não tem logo em lugar nenhum.

**3 caminhos discutidos, decisão pendente:**

1. **(Recomendado) Nova tabela `organizations` unificada**
   - `organizations(id, name, name_key, kind enum, logo_url, created_at)`
   - `person_organizations(person_id, org_id, role, start_year, end_year, is_current, notes)`
   - `kind` enum: empresa | clube | midia | escola | entidade
   - Bucket `org-logos`
   - UI: nova section no PersonForm ("Vínculos & Afiliações") · render logos no hero
   - Migration backfill: current_company + work_history.company + futebol_links → organizations
   - Desbloqueia busca "quem tem ligação com X" + futuro matchmaking

2. **Caminho lite** — só `logo_url` em `groups` existente. Mais rápido mas continua com 3 fontes paralelas (current_company, work_history, futebol_links).

3. **Híbrido** — organizations + person_organizations novos SEM migrar legacy. Pessoa nova usa novo schema, antiga mantém current_company texto. Reduz risco agora, migration depois.

User indicou que **caminho cheio (1) é o ideal** mas não confirmou final. Quando confirmar, abrir frente nova.

### 2. Religar login (pendência crítica original)

Remover `CASA_NOSTRA_AUTH_BYPASS` de Vercel dev/preview/prod + Infisical. Magic link já tá configurado e funcionando — só desligar o bypass. Dados criados durante construção ficam — NÃO limpar.

**Pré-requisito pra:** offline-first (sem login, não tem usuário pra associar mutations queueadas).

### 3. Offline-first (prioridade 3) — PWA + Background Sync

Use case: Fábio preencher pessoas no avião sem wifi, sync automático ao voltar online. Funciona em celular e laptop.

**Stack recomendada:**
- Manifest + Service Worker pra app virar instalável
- IndexedDB pra fila de mutations offline
- Background Sync API pra flush automático quando wifi volta
- Wrapper sobre server actions: se offline, enfileira; se online, executa direto
- Conflict resolution simples (last-write-wins — audiência 2-3, conflitos raros)

**Trade-offs:**
- Next 16 + Server Actions não foi desenhado pra offline-first — exige wrapper custom
- ~3-5 dias trabalho
- Pré-requisito: login religado (sem ele, app nem chega na home offline)

### 4. Outros débitos menores
- **`category_value` sem CHECK constraint** no DB
- **Sem transação no "replace-all"** das filhas em updatePerson (estado parcial possível se um insert falhar)
- **RLS no `created_by` delete** — `deletePerson` pode bloquear delete entre Fabio e Woney
- **Vercel git integration mal configurada** — Root Directory aponta pro repo root. Deploys são CLI-only. Fix: setar Root Directory no painel Vercel.
- **Performance** — `revalidatePath('/')` toda mutation força refetch caro. Otimizar quando base crescer (hoje 2 pessoas)
- **Template de email Supabase** customizar (só vale depois de religar bypass)
- **Busca `?q=` accent-insensitive** — hoje só case-insensitive via ilike. Pra accent-aware precisaria de `unaccent` Postgres + generated column ou client-side filter. Canonicalização-on-save mitiga pra dados novos.

---

## Como rodar local

```bash
cd apps/casa-nostra
npm install
npm run dev  # http://localhost:3040 com Infisical-injected env
```

Fallback: `cp .env.local.example .env.local`, preencher, `npm run dev:no-infisical`.

---

## Como fazer deploy

CLI bug em Vercel 53.2.0: `vercel env add NAME preview --yes` exige branch arg mesmo non-interactive. Workaround via REST API documentado.

```bash
# Para adicionar env vars no Vercel via REST API (bypass CLI bug)
VERCEL_TOKEN=$(cat ~/Library/Application\ Support/com.vercel.cli/auth.json | grep -o '"token":[^,}]*' | sed 's/.*: *"//;s/"$//')
PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | sed 's/.*:"//;s/"$//')
TEAM_ID=$(cat .vercel/project.json | grep -o '"orgId":"[^"]*"' | sed 's/.*:"//;s/"$//')

curl -s -X POST "https://api.vercel.com/v10/projects/${PROJECT_ID}/env?teamId=${TEAM_ID}" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" -H "Content-Type: application/json" \
  --data '{"key":"NAME","value":"VAL","type":"encrypted","target":["preview"]}'
```

PATCH (atualizar): `PATCH /v10/projects/{PID}/env/{envId}?teamId={TID}` com body `{"value":"NEW"}`.

**Importante:** Infisical dotenv export envolve valores em single quotes — strippar antes de POSTar.

**Deploy CLI-only:** `vercel deploy --prod --yes` de dentro de `apps/casa-nostra/`. (Vercel git integration aponta pro root errado — push em `feature/casa-nostra` dispara build automático que falha em 5s. Workaround atual até setar Root Directory no painel.)

---

## Critical context — não esquecer

- **`pbcopy < file`** é o caminho seguro pra colar SQL no editor do Supabase.
- **Gmail prefetch** consome tokens de magic link. Mitigação: `token_hash` + `verifyOtp` (já feito).
- **Infisical CLI** em `~/.local/bin/infisical` v0.43.86.
- **Dual git remote**: `git push` envia pra origin (WoneyMalian) E bicofino (studio-bicofino).
- **HARD RULE git**: NUNCA `git reset --hard` ou `checkout --` com working tree dirty. Cherry-pick em vez de reset+branch.
- **HARD RULE briefing**: ler BRIEFING + HANDOFF integralmente antes de propor scope/schema. Não inventar extensões fora do contrato.
- **HARD RULE agentes**: em features grandes (≥3 arquivos), despachar sub-agentes em paralelo (single message, multiple Agent calls).
- **HARD RULE canonicalização**: ao adicionar campo free-text novo, lembrar de wirar autocomplete + canonicalizeInput em `persons.ts`.

---

## Files pra ler PRIMEIRO em chat novo

1. `.planning/casa-nostra/HANDOFF.md` (este — status + estado atual)
2. `.planning/casa-nostra/BRIEFING.md` (contexto original locked)
3. `apps/casa-nostra/src/app/(app)/page.tsx` (lista — referência)
4. `apps/casa-nostra/src/app/(app)/p/_components/PersonForm.tsx` (form orquestrador — referência de motion/glass)
5. `apps/casa-nostra/src/app/(app)/p/_components/AutocompleteField.tsx` (referência de autocomplete + dropdown)
6. `apps/casa-nostra/src/lib/utils/strings.ts` (normalizeKey + pickCanonical — regras de canonicalização)
7. `apps/casa-nostra/src/lib/db/suggestions.ts` (server fetch + agrupamento)
8. `apps/casa-nostra/src/app/globals.css` (palette + CSS classes)
9. `apps/casa-nostra/src/lib/db/types.ts` (shape do dado — Movement, etc.)
10. `apps/casa-nostra/src/lib/db/schemas.ts` (zod + form input)
11. `DESIGN.md` (tokens + §Exceptions — palette Casa Nostra)
12. `CLAUDE.md` (regras do projeto)

---

*v0.7 em prod com vocabulário Movement no código + autocomplete com canonicalização de grafias (incluindo strip de ornamentos/emojis) + wrapper crema 40% no PersonForm. Próximas frentes: **organizations + logos** (caminho cheio recomendado) · religar login · offline-first PWA.*
