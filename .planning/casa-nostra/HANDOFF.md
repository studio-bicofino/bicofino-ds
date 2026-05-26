# HANDOFF — Casa Nostra (Bicofino)

*Sessão originadora: 2026-05-25 (12h+). Vertical slice fechado: auth + DB + middleware + Infisical funcionando ponta-a-ponta.*

**Pra retomar em chat novo:**
> `Lê @.planning/casa-nostra/HANDOFF.md (e @.planning/casa-nostra/BRIEFING.md pro contexto original) e vamos continuar de onde parou.`

---

## Estado atual: o que está vivo

Login funciona ponta-a-ponta. Magic link via Supabase chega no Gmail, clique autentica, sessão é montada, área autenticada é acessível. Ver `apps/casa-nostra/src/app/(app)/page.tsx` (placeholder de "Pessoas").

| Camada | Estado | Onde mora |
|---|---|---|
| Branch | `feature/casa-nostra` (a partir de `feature/vanguarda`) | git |
| App | Next 16.2.6 + React 19 + TS strict + Turbopack | `apps/casa-nostra/` |
| Porta dev | `3040` | `package.json` |
| Secrets | Infisical (5 secrets em env `dev`) | `infisical run --env=dev -- next dev` |
| DB | Supabase `bicofino-casa-nostra` (org Studio-Bicofino) | URL: `https://grqbmzgntqfxxoelvtpy.supabase.co` |
| Schema | 10 tabelas + indexes + trigger + RLS + 22 grupos seed | `db/migrations/0001_initial_schema.sql`, `db/seeds/0001_groups.sql` |
| Auth | Magic link via `verifyOtp({token_hash, type})` | `src/app/auth/callback/route.ts` |
| Allowlist | woney@bicofino.com + branca@bicofino.com | env var `CASA_NOSTRA_ALLOWLIST` |
| Middleware | Redirect `/login` se sem sessão | `src/middleware.ts` |
| Brand | Tokens DESIGN.md + 3 ops tokens exceção (success/edit/danger) | `src/app/globals.css` + `DESIGN.md` §Exceptions |

---

## Como rodar local (3 comandos)

```bash
# Já assume: brew install + infisical login + infisical init feitos
cd apps/casa-nostra
npm install            # se primeira vez
npm run dev            # roda em http://localhost:3040 com Infisical-injected env
```

Se Infisical não estiver disponível, fallback: `cp .env.local.example .env.local`, preencher manual, `npm run dev:no-infisical`.

---

## Stack confirmado

- **Next.js 16.2.6** (App Router, Turbopack, `turbopack.root` aponta 2 níveis acima)
- **React 19.2.4**, **TypeScript 5 strict**
- **`@supabase/ssr` 0.5.2** + **`@supabase/supabase-js` 2.45.4** (3 clients: `client.ts`, `server.ts`, `admin.ts`)
- **`motion` v12** (Framer Motion) — instalado mas ainda não usado em produção
- **`react-hook-form` 7.53** + **`zod` 3.23** — usado no login form
- **`lucide-react` 0.513** — disponível mas usado pouco
- **Sem Tailwind** — CSS variables puras dos tokens Bicofino + inline styles React

---

## Decisões locked in (não re-discutir)

1. **Sem Tailwind.** CSS variables + inline styles, padrão dos apps `vanguarda/*`.
2. **`current_role` → `current_title`** (reserved word PG). Migration e types.ts já consistentes.
3. **Auth via `verifyOtp({token_hash, type})`**, NÃO `exchangeCodeForSession` (PKCE quebra com Gmail prefetch + cookies SSR fragile). Template do email no Supabase MANDATORY usa: `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email&next={{ .RedirectTo }}`.
4. **Route group `(app)/`** isola área autenticada. Layout faz double-check de allowlist (defesa em profundidade — se email sair da lista, session antiga é invalidada no próximo render).
5. **Cor `--bf-ops-success: #2FD298`** (verde BF SEP, brand). Texto branco sobre verde (brand choice, contraste ~2.3:1 mas brand wins). Documentado em `DESIGN.md` §Exceptions.
6. **Botão login com `border-radius: 9999`** (pill).
7. **Logo Bicofino alinhado à esquerda** no topo do painel de login (não centralizado).
8. **`.infisical.json` É commitável** (só workspace ID, sem secret).
9. **Magic link expira em 1h** (default Supabase, mantido).
10. **`confirm email` no Supabase auth = OFF** (magic link já é confirmação).

---

## Arquitetura — onde mora cada coisa

```
apps/casa-nostra/
├── db/
│   ├── migrations/0001_initial_schema.sql   ← 10 tabelas + RLS + trigger
│   ├── seeds/0001_groups.sql                ← 22 grupos master
│   └── README.md                             ← como rodar SQL no painel Supabase
├── src/
│   ├── app/
│   │   ├── (app)/                            ← área autenticada (rotas protegidas)
│   │   │   ├── layout.tsx                   ← sidebar + allowlist double-check + logout
│   │   │   └── page.tsx                     ← Pessoas (placeholder)
│   │   ├── auth/callback/route.ts           ← verifyOtp + exchangeCodeForSession fallback
│   │   ├── login/{page,LoginForm,actions}.tsx  ← form magic link + server action + allowlist check
│   │   ├── globals.css                      ← tokens brand + ops + Inter/JetBrains
│   │   └── layout.tsx                       ← root layout (theme bootstrap)
│   ├── components/{BicofinoLogo,LogoutButton}.tsx
│   ├── lib/
│   │   ├── auth/allowlist.ts                ← getAllowlist() / isAllowed()
│   │   ├── db/types.ts                      ← 10 interfaces + 8 enums + Database type
│   │   └── supabase/{client,server,admin}.ts
│   └── middleware.ts                         ← session refresh + redirect /login
├── .env.local.example                        ← fallback se Infisical fora
├── .infisical.json                           ← workspace ID (commitável)
├── SETUP-INFISICAL.md                        ← como configurar CLI + workspace
└── next.config.ts                            ← turbopack.root = ../../
```

---

## Schema DB — referência rápida

10 tabelas + RLS em todas:
- **`people`** (principal — 24 colunas; cluster A/B/C nullable; intimacy/contact_ease/bicofino_disposition/network_reach 1-5; cadence_target_per_year; restrict_visibility honrado em policy)
- `contact_methods`, `person_categories`, `work_history`, `futebol_links`, `bicofino_history`
- `groups` (22 seeds) + `person_groups` junction
- `geography_action`, `signals`

Policy pattern: `select` em `people` honra `restrict_visibility`. Demais tabelas: `authenticated` lê/escreve tudo (audiência interna 2-3 pessoas). Service role só pra migrations.

Types TS espelhando o schema: `src/lib/db/types.ts` (`Person`, `Group`, `Signal`, `PersonWithRelations` aggregate, `Database` type pra cliente Supabase).

---

## Próximas frentes (em ordem de valor)

### 1. Tela de Pessoas funcional (`~2-3h`)
Substituir `apps/casa-nostra/src/app/(app)/page.tsx` por:
- Server component que faz `supabase.from('people').select(...)`
- Tabela editorial: foto · nome · empresa · cluster · cadência (status visual) · última atividade
- Search bar (full-text em `full_name` + `current_company`)
- Filtros: cluster, categoria (join), grupo (join), cidade
- Botão "+ Adicionar pessoa" (abre modal — frente 2)
- Paginação editorial (10-20/página)

### 2. Modal Add/Edit Pessoa (`~3-4h`)
9 seções colapsáveis conforme BRIEFING.md §"Modal de adicionar/editar pessoa". Stack: `react-hook-form` + `zod` (schemas em `src/lib/db/schemas.ts` — criar). Upload de foto pro bucket Supabase `people-photos` (criar bucket no painel).

### 3. CRUD de Groups (`~1h`)
Tela `/grupos` com lista + form pra Fabio adicionar grupos novos via UI (extensibilidade do briefing).

### 4. Timeline de Signals (`~2h`)
Tela `/sinais` com signals cross-person ordenados por `observed_at desc`. Filtro por `signal_type`. Form inline pra adicionar.

### 5. Animações motion (`~30min`)
- Fade-in stagger na lista (motion v12 já instalado)
- Slide-up modal
- Micro-feedback no save (checkmark animado)

### 6. Deploy Vercel preview (`~15min`)
Vercel project linkado a `feature/casa-nostra`. Integração Infisical Marketplace pra sync de secrets. Gated por magic link (já é).

---

## Critical context — não esquecer

- **`pbcopy < file`** é o caminho seguro pra colar SQL no editor do Supabase. **Não abre o arquivo no Antigravity** — o buffer da IDE conflita com edits feitos por mim e pode wipar o arquivo (aconteceu, foi recuperado).
- **Gmail prefetch** consome tokens de magic link automaticamente em alguns casos. Mitigação: usar `token_hash` + `verifyOtp` (já feito). Se voltar a aparecer: considerar adicionar `/auth/confirm` intermediário com botão "Confirmar entrada".
- **Infisical CLI** veio via direct binary (não brew — CLT outdated). Instalado em `~/.local/bin/infisical` v0.43.86. SHA-256 conferido contra fórmula brew oficial.
- **Dual git remote** ativo: `git push` envia pra origin (WoneyMalian) E bicofino (studio-bicofino) automaticamente.
- **HARD RULE git**: NUNCA `git reset --hard` ou `checkout --` com working tree dirty. Em 2026-05-25 destruí 22 arquivos com WIP. Cherry-pick em vez de reset+branch.

---

## Decisões pendentes (não-bloqueantes)

- **Bucket Supabase Storage** `people-photos` ainda não criado (precisará pra modal de adicionar pessoa com foto).
- **BicofinoLogo na sidebar** (atualmente só texto "Bicofino · Casa Nostra") — ajuste cosmético.
- **Email template Supabase**: customizar mais (HTML editorial, header com logo, etc.) — atualmente é o mínimo viável.
- **Cadência visual** na tabela de pessoas: como representar "em dia"/"atrasado" baseado em `cadence_target_per_year` vs `last_contact_date`?

---

## Files pra ler PRIMEIRO em chat novo

Em ordem de prioridade:

1. `.planning/casa-nostra/BRIEFING.md` (contexto original, schema, UI direction)
2. `.planning/casa-nostra/HANDOFF.md` (este arquivo)
3. `apps/casa-nostra/src/app/(app)/{layout,page}.tsx` (entender área autenticada)
4. `apps/casa-nostra/src/lib/db/types.ts` (entender shape do dado)
5. `apps/casa-nostra/db/migrations/0001_initial_schema.sql` (schema source of truth)
6. `DESIGN.md` (tokens + §Exceptions — ops tokens da casa-nostra)
7. `CLAUDE.md` (regras do projeto)

---

## Estado git no momento do handoff

- Branch atual: `feature/casa-nostra` (baseada em `feature/vanguarda`)
- Commits a frente: 0 (este commit é o primeiro depois de scaffoldar tudo)
- Working tree: limpo após este commit
- Não foi feito `git push` ainda — usuário decide quando subir pra remoto

---

*Bom trabalho. Casa Nostra tem a base. Resto é UI.*
