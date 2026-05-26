# HANDOFF — Casa Nostra (Bicofino)

*Última atualização: 2026-05-26 (sessão noite, 4). v0.8.1 **CONGELADA**. Fabio achou o form com 10 sections complexo demais — próximo passo será um app NOVO simplificado, não refatoração desta. Casa Nostra fica intacta como referência/backup vivo.*

---

## ⚠️ STATUS DO PROJETO — congelado por feedback

**Não tocar nesta app salvo bugfix crítico solicitado explicitamente.** Em 2026-05-26 o Fabio (audiência primária) avaliou o PersonForm com 10 sections como **complicado, muitos campos, complexo demais**. Decisão do usuário: construir um **app novo simplificado** ao invés de refatorar Casa Nostra.

**O que Casa Nostra preserva como referência viva:**
- Schema completo (12 tabelas + organizations layer)
- Tokens editoriais (crema/caffè/napoli/SEP/torino/platinum)
- Padrão de autocomplete + canonicalização (`normalizeKey` + `pickCanonical`)
- Organizations + logos com `name_key` UNIQUE idempotente
- Bypass de construção pattern (com workaround Infisical CLI bug)
- Padrão Vercel CLI deploy via REST API
- Magic link via `verifyOtp({token_hash, type})` + allowlist Infisical

**Quando o usuário retornar com ajustes/briefing do app novo:** abrir `.planning/<nome-novo>/BRIEFING.md` separado e linkar daqui. Não estender este HANDOFF.

---

**Pra retomar em chat novo:**
> `Lê @.planning/casa-nostra/HANDOFF.md (e @.planning/casa-nostra/BRIEFING.md pro contexto original) e vamos continuar de onde parou.`

---

## Status — v0.8 em dev (precisa rodar migration + deploy)

**URL prod:** https://casa-nostra-two.vercel.app
**Repo:** `feature/casa-nostra` (a partir de `feature/vanguarda`)
**Vercel project:** `woney-malians-projects/casa-nostra` (git conectado a `WoneyMalian/bicofino-ds`)
**Magic link funcional:** Site URL e Redirect URLs no Supabase apontam pro prod. `woney@bicofino.com` e `branca@bicofino.com` na allowlist (mas hoje **bypass on** — qualquer um entra).

| Camada | Estado |
|---|---|
| App | Next 16.2.6 + React 19 + TS strict + Turbopack |
| Porta dev | `3040` |
| Secrets | Infisical (5 vars em `dev`), Vercel (4 vars em preview/prod/dev + SITE_URL + BYPASS) |
| DB | Supabase `bicofino-casa-nostra` — 12 tabelas + RLS + 22 grupos seed |
| Auth | Magic link via `verifyOtp({token_hash, type})` — **religado em 2026-05-26** |
| Allowlist | env var `CASA_NOSTRA_ALLOWLIST` |
| Palette | Editorial Casa Nostra (crema/caffè/napoli/SEP/nocciola) — exceção DESIGN.md |
| Vocabulário | "Movimentos" user-visible · "Movement" no código TS · `signals/signal_type` DB |
| Responsivo | Sidebar drawer <1024px · cn-page padding adaptativo · sections empilham <720px |
| Rotas | `/`, `/grupos`, `/p/[id]`, `/p/novo`, `/sinais`, `/configuracoes`, `/login`, `/auth/callback` |
| Storage | `people-photos` + `org-logos` (público, audiência interna) |

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

### Frente 10 — Bypass de login (modo construção) ✅ — religado em v0.8.1
- `CASA_NOSTRA_AUTH_BYPASS=1` em Infisical dev + Vercel dev/preview/prod (durante a construção)
- Session helper retorna pseudo-user · middleware early-return · server client vira admin (RLS ignorada)
- **Religado em 2026-05-26:** Vercel 3 envs deletadas via REST API + Infisical setado como `0` (CLI 0.43.86 com bug em DELETE — workaround set=0). Smoke test: GET `/` retorna 307 → `/login?next=%2F`. Dados intactos.

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
- **Hierarquia visual final v0.7:** page crema sólido → wrapper crema 40% → SectionShell cards brancos
- Stat pills (torino/platinum) e cards de seção continuam como estavam
- **Sobrescrita em v0.8** (frente 17 abaixo)

### Frente 16 — Organizations + Logos ✅ — v0.8

**Caminho híbrido com backfill suave.** Cria camada nova de vínculos com logo SEM tocar legacy (`current_company`, `work_history.company`, `futebol_links`). Backfill via script idempotente. Desbloqueia busca "quem tem ligação com X" + futuro matchmaking.

**Schema (migration 0003):**
- `organizations(id, name, name_key, kind, logo_url, created_by, created_at)` — `name_key` UNIQUE garante convergência de grafias (`normalizeKey`)
- `person_organizations(id, person_id, org_id, role, start_year, end_year, is_current, notes, sort_order, created_at)` — PK em `id` permite múltiplos vínculos com a mesma org em períodos diferentes
- `kind` enum: `empresa | clube | midia | escola | entidade`
- Bucket público `org-logos` + 3 policies (mesmo padrão de `people-photos`)
- RLS amplo a `authenticated` (audiência interna)

**Files novos:**
- `db/migrations/0003_organizations.sql`
- `scripts/backfill-organizations.mjs` (idempotente, suporta `--dry`)
- `src/lib/storage/upload-logo-action.ts` + `src/lib/storage/org-logos.ts` (2 MB cap, aceita SVG)
- `src/app/(app)/p/_actions/organizations.ts` — `findOrCreateOrganizationInternal` (idempotente via name_key) · `createOrganization` · `updateOrganization` · `listOrganizations`
- `src/app/(app)/p/_components/sections/Affiliations.tsx` — section 10, AddPicker com tabs Selecionar/Criar nova + upload de logo inline + cards de vínculo com role/start/end/is_current/notes
- `src/app/(app)/p/_components/OrgLogoStrip.tsx` — strip horizontal no Hero com scroll, gradient-fade nas bordas, chevron-right animado quando overflow

**Files tocados:**
- `db/types.ts` — `Organization`, `PersonOrganization`, `PersonOrganizationWithOrg`, `OrganizationKind`; `PersonWithRelations.person_organizations[]`
- `db/schemas.ts` — `organizationKindEnum`, `organizationSchema/InsertSchema/UpdateSchema`, `personOrganizationSchema/...`, `affiliationFormSchema` (com refine: org_id XOR new_org), `personFormSchema.organizations`
- `_actions/persons.ts` — replace-all bloco para `person_organizations`, resolve `new_org` via `findOrCreateOrganizationInternal` antes de inserir vínculo
- `PersonForm.tsx` — prop `organizations: Organization[]`, Hero ganha OrgLogoStrip à direita do bloco texto (borderLeft separator, maxWidth 360), AffiliationsSection adicionada como section 10
- `p/novo/page.tsx` + `p/[id]/page.tsx` — fetch `organizations(*)` + (no [id]) `person_organizations(*, org:organizations(*))`
- `globals.css` — `.cn-orglogo-strip::-webkit-scrollbar { display: none }`

**Comportamento UI:**
- Hero: bloco texto à esquerda (current_title · current_company · cluster — sem mudança) + strip de logos à direita com `border-left` editorial. Logos atuais aparecem primeiro, depois alfabético.
- Scroll horizontal silencioso + fade nas bordas + "mais ›" clicável quando overflow.
- AddPicker oferece duas abas: buscar org existente (filtrada por substring) OU criar nova (nome + kind + upload de logo inline, 2 MB, SVG aceito).
- Vínculo recém-criado com `new_org` mostra um sub-form leve permitindo editar name/kind antes de salvar (logo já está uploadado).
- Tooltip nativo (title attr) com nome + role + status atual em cada chip de logo.

**Decisões de boundary:**
- DB column `current_company` permanece como texto livre (independente). Pessoa pode ter current_company="Bicofino" (texto) E vínculo Bicofino (org) ao mesmo tempo — não há sync automático. Fabio decide depois se quer dropar current_company.
- `work_history.company` e `futebol_links` também intocados. Backfill cria orgs derivadas mas mantém as tabelas legacy.

### Frente 17 — Wrapper bege #f9f4e8 + Hero branco ✅ — v0.8
**Sobrescreve frente 15.** Crema 40% (rgba(244,234,212,0.4)) vazava como crema puro, dando impressão de fundo sólido sem "degrau". Mudança:
- `p/novo/page.tsx` + `p/[id]/page.tsx` wrapper: `background: #f9f4e8` (sólido, mais claro que o crema base)
- Hero do PersonForm (`PersonForm.tsx`): de transparente → `var(--bf-surface)` (branco) + border nocciola + radius 16 + padding 32, igual cards das outras seções
- **Hierarquia visual v0.8:** page crema sólido #f3ebd4 → wrapper bege #f9f4e8 → cards brancos (Hero + 10 sections)

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
23. ~~Crema 40% no wrapper do PersonForm~~ → sobrescrita em v0.8 por decisão 24.
24. **Wrapper #f9f4e8 + Hero branco** — `/p/novo` e `/p/[id]` usam `background: #f9f4e8` (bege editorial sólido, distinto do crema da página). Hero do PersonForm volta a ser card branco com border nocciola, igual aos cards das seções. Hierarquia: page crema → wrapper bege → cards brancos.
25. **Camada Organizations híbrida (não destrutiva)** — `organizations` + `person_organizations` são fonte única pra vínculos com logo + busca relacional futura. `current_company`, `work_history.company`, `futebol_links` continuam intactos. Pessoa pode ter current_company="Bicofino" (texto) E vínculo Bicofino (org) sem sync automático — Fabio decide quando dropar legacy.
26. **`name_key` UNIQUE em organizations** — derivado de `normalizeKey(name)`. Idempotência absoluta: "Bicofino" + "Bicofino ❇️" colapsam no mesmo registro tanto no `findOrCreate` (server action) quanto no backfill script.
27. **Org logos: bucket público, 2 MB, SVG OK** — `org-logos` segue o mesmo padrão de `people-photos` (audiência interna gateada por magic link, paths UUID). SVG aceito além de raster porque logos vetorizados são padrão.

---

## Arquitetura — mapa de arquivos

```
apps/casa-nostra/
├── db/
│   ├── migrations/0001_initial_schema.sql        ← 10 tabelas + RLS
│   ├── migrations/0002_storage_people_photos.sql ← bucket people-photos + policies
│   ├── migrations/0003_organizations.sql         ← organizations + person_organizations + bucket org-logos
│   └── seeds/0001_groups.sql                     ← 22 grupos master
├── scripts/
│   ├── seed-ruffino.mjs                          ← recovery do registro perdido
│   ├── canonicalize-existing.mjs                 ← one-shot grafia → canônica (idempotente)
│   └── backfill-organizations.mjs                ← current_company + work_history + futebol_links → orgs (idempotente, --dry)
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
│   │   │   │   ├── _actions/
│   │   │   │   │   ├── persons.ts                ← create/update/delete + canonicalizeInput + replace-all person_organizations
│   │   │   │   │   └── organizations.ts          ← findOrCreate (idempotente via name_key) + create/update/list
│   │   │   │   └── _components/
│   │   │   │       ├── PersonForm.tsx            ← Hero branco · prop `organizations: Organization[]` + OrgLogoStrip
│   │   │   │       ├── AutocompleteField.tsx     ← TextField + dropdown sugestões
│   │   │   │       ├── OrgLogoStrip.tsx          ← NOVO: scroll horizontal de logos no Hero
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
│   │   │   │           ├── Affiliations.tsx      ← NOVO: vínculos com orgs + upload de logo inline
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
│   │   ├── storage/{photos,upload-action,org-logos,upload-logo-action}.ts
│   │   ├── supabase/{client,server,admin}.ts
│   │   └── utils/strings.ts                      ← NOVO: normalizeKey, pickCanonical, buildSuggestions
│   └── middleware.ts
├── .env.local.example
├── .infisical.json
├── .vercel/
└── next.config.ts
```

---

## Schema DB — referência

12 tabelas + RLS em todas. Veja `db/migrations/0001_initial_schema.sql` (10 iniciais) + `db/migrations/0003_organizations.sql` (organizations + person_organizations) e `src/lib/db/types.ts` (interfaces TS).

22 grupos seed em `db/seeds/0001_groups.sql`.

Buckets `people-photos` (migration 0002) e `org-logos` (migration 0003) — públicos, 3 policies cada.

---

## Pendências grandes pra próximo chat (em ordem de valor)

### 1. Rodar migration 0003 + backfill em prod (passo 1 do v0.8 ship)

Build local passou. Falta:
1. Rodar `db/migrations/0003_organizations.sql` no editor SQL do Supabase (`pbcopy < db/migrations/0003_organizations.sql`)
2. `infisical run --env=dev -- node scripts/backfill-organizations.mjs --dry` pra ver o que viria
3. Se ok, rodar sem `--dry`
4. `vercel deploy --prod --yes` de dentro de `apps/casa-nostra/`
5. Smoke test em prod: criar pessoa nova com 2 vínculos (1 org existente do backfill + 1 nova com upload de logo), verificar Hero strip aparecendo, scroll funcionando com overflow

### 2. Offline-first (prioridade 2) — PWA + Background Sync

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
- Pré-requisito: login religado ✅

### 3. Outros débitos menores
- **`category_value` sem CHECK constraint** no DB
- **Sem transação no "replace-all"** das filhas em updatePerson (estado parcial possível se um insert falhar)
- **RLS no `created_by` delete** — `deletePerson` pode bloquear delete entre Fabio e Woney. **Agravado pelo religar:** registros criados durante bypass têm `created_by = null`. User real (uuid não-null) não consegue deletar via UI. Fix sugerido: ajustar policy pra `using (created_by IS NULL OR created_by = auth.uid())` ou backfill com user real.
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
- **HARD RULE organizations**: `organizations.name_key` é UNIQUE e derivado de `normalizeKey(name)`. Toda mutação que cria org NOVA deve passar pelo `findOrCreateOrganizationInternal` — nunca insert direto na tabela. O backfill script segue a mesma regra.

---

## Files pra ler PRIMEIRO em chat novo

1. `.planning/casa-nostra/HANDOFF.md` (este — status + estado atual)
2. `.planning/casa-nostra/BRIEFING.md` (contexto original locked)
3. `apps/casa-nostra/src/app/(app)/page.tsx` (lista — referência)
4. `apps/casa-nostra/src/app/(app)/p/_components/PersonForm.tsx` (form orquestrador — Hero com OrgLogoStrip)
5. `apps/casa-nostra/src/app/(app)/p/_components/sections/Affiliations.tsx` (section 10 — AddPicker + cards de vínculo)
6. `apps/casa-nostra/src/app/(app)/p/_components/OrgLogoStrip.tsx` (scroll horizontal + fade + chevron)
7. `apps/casa-nostra/src/app/(app)/p/_actions/organizations.ts` (findOrCreate idempotente)
8. `apps/casa-nostra/src/app/(app)/p/_actions/persons.ts` (replace-all com resolve de new_org)
9. `apps/casa-nostra/src/lib/utils/strings.ts` (normalizeKey + pickCanonical)
10. `apps/casa-nostra/src/lib/db/suggestions.ts` (server fetch + agrupamento)
11. `apps/casa-nostra/src/app/globals.css` (palette + CSS classes + cn-orglogo-strip)
12. `apps/casa-nostra/src/lib/db/types.ts` (Organization, PersonOrganization, etc.)
13. `apps/casa-nostra/src/lib/db/schemas.ts` (zod + affiliationFormSchema)
14. `apps/casa-nostra/db/migrations/0003_organizations.sql` (schema novo)
15. `apps/casa-nostra/scripts/backfill-organizations.mjs` (idempotente)
16. `DESIGN.md` (tokens + §Exceptions — palette Casa Nostra)
17. `CLAUDE.md` (regras do projeto)

---

*v0.8.1 em prod. Camada Organizations + Logos ativa. Login religado, magic link em vigor, allowlist Woney + Branca. Próximas frentes: offline-first PWA · drop de current_company/work_history.company/futebol_links se Fabio confirmar que organizations virou suficiente · template de email Supabase customizar.*
