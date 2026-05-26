# Casa Nostra — Setup Infisical

Secrets management via Infisical. Este app é o primeiro do monorepo Bicofino a adotar Infisical como fonte primária.

---

## Pré-requisitos (uma vez por máquina)

1. **Instalar CLI:**
   ```bash
   brew install infisical/get-cli/infisical
   infisical --version
   ```

2. **Login:**
   ```bash
   infisical login
   ```
   Abre o browser, você confirma com a conta `woney@bicofino.com`.

---

## Setup do projeto (uma vez por workspace)

1. **No painel Infisical** (https://app.infisical.com):
   - Criar projeto: `bicofino-casa-nostra`
   - Ambientes default já existem: `dev`, `staging`, `prod`
   - Adicionar membros: woney@bicofino.com (admin), branca@bicofino.com (developer)

2. **Adicionar os 5 secrets em `dev`:**

   | Secret | Valor |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://grqbmzgntqfxxoelvtpy.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | _(anon key do painel Supabase)_ |
   | `SUPABASE_SERVICE_ROLE_KEY` | _(service role — marcar como sensitive)_ |
   | `CASA_NOSTRA_ALLOWLIST` | `woney@bicofino.com,branca@bicofino.com` |
   | `NEXT_PUBLIC_SITE_URL` | `http://localhost:3040` |

   Depois replicar em `prod` ajustando `NEXT_PUBLIC_SITE_URL` para a URL do preview Vercel.

3. **Linkar app local ao projeto:**
   ```bash
   cd apps/casa-nostra
   npm run infisical:init
   ```
   Selecionar `bicofino-casa-nostra` quando perguntado. Cria `.infisical.json` (commitável — apenas referência, sem secret).

---

## Uso no dia a dia

```bash
# Dev com secrets do Infisical (padrão)
npm run dev

# Listar secrets do ambiente atual
npm run infisical:secrets

# Editar secret específico
infisical secrets set NEXT_PUBLIC_SITE_URL=http://localhost:3040 --env=dev

# Fallback (se Infisical estiver fora): use .env.local
cp .env.local.example .env.local   # preencher manualmente
npm run dev:no-infisical
```

---

## Vercel (deploy)

Quando chegar a hora do deploy preview:

1. No painel Vercel, instalar **Infisical Marketplace Integration**
2. Linkar ao projeto `bicofino-casa-nostra` (Infisical) e ao projeto Casa Nostra (Vercel)
3. Mapear ambiente Infisical `prod` → Vercel `production`, `dev` → `preview`
4. Secrets passam a ser sincronizados automaticamente — nada precisa ser colado no painel Vercel.

---

## Boas práticas

- **Nunca** commitar `.env.local`. Já está no `.gitignore`.
- **`.infisical.json` é commitável** — não tem secret, só ID do workspace.
- Service role key: marcar como `sensitive` no Infisical (mascarado nos logs).
- Rotação: trocar Supabase keys → atualizar no Infisical → próximo `npm run dev` já pega o novo valor.
