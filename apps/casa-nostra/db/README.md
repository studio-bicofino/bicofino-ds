# Casa Nostra — Database

Migrations e seeds para o Supabase do projeto `bicofino-casa-nostra`.

## Como rodar (primeira vez)

1. Criar projeto no painel Supabase: `bicofino-casa-nostra`.
2. Configurar secrets via Infisical — ver `apps/casa-nostra/SETUP-INFISICAL.md`.
3. Abrir o **SQL Editor** no painel Supabase.
4. Rodar na ordem:
   - `migrations/0001_initial_schema.sql`
   - `seeds/0001_groups.sql`

## Storage

Criar bucket público (ou com policy) chamado `people-photos` no Supabase Storage para fotos de perfil.

## Auth — Magic link

No painel Supabase → Authentication → URL Configuration:
- **Site URL**: `http://localhost:3040` (dev) / URL do preview Vercel (prod)
- **Redirect URLs**: incluir `http://localhost:3040/auth/callback` e a URL do preview

A allowlist é checada na app (`src/lib/auth/allowlist.ts`) via env var `CASA_NOSTRA_ALLOWLIST`.
