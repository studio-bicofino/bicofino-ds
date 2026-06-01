# Bicofino Platform — Briefing Completo
**Data:** 19 mai 2026 | **Para uso em novos chats — leia tudo antes de qualquer ação**

---

## 1. O QUE É ESSE PROJETO

Plataforma digital Bicofino com três camadas:

| Camada | App | URL atual |
|--------|-----|-----------|
| Brand & Design System docs | `apps/docs-site` (porta 3001) | https://bicofino.vercel.app |
| Site público | `apps/web` (porta 3002) | https://bicofino-web.vercel.app |
| Storybook | `apps/storybook` (porta 6006) | — |

**Monorepo:** `/Users/woneymalian/Desktop/SITE BICOFINO`
**Source of truth de design:** `DESIGN.md` (raiz) — seguir sempre, sem exceção.
**Brand completo:** `BRAND.md` e `BRANDCOMPLETO.md` (raiz)

---

## 2. ESTADO ATUAL DAS BRANCHES

```
main
 └── experiment/ui-skills
      └── experiment/design-review
           └── experiment/video-hero  ← BRANCH ATIVA
```

| Branch | Estado |
|--------|--------|
| `main` | Produção estável (apps/web em prod, docs-site em preview) |
| `experiment/video-hero` | Branch ativa — video hero on-pitch/off-pitch aprovado visualmente, aguarda merge |

**Último commit:** `81c22bf feat(web): video hero background for on-pitch and off-pitch pages`

**Para rodar:**
```bash
npm run docs    # docs-site → localhost:3001
npm run web     # apps/web  → localhost:3002
```

---

## 3. DOIS REMOTES CONFIGURADOS (SETUP CONCLUÍDO HOJE)

```
origin   → https://github.com/WoneyMalian/bicofino-ds.git   (pessoal)
bicofino → git@github-bicofino:studio-bicofino/bicofino-ds.git  (empresa)

git push  → envia para OS DOIS simultaneamente
git fetch → puxa só do origin (pessoal)
```

**SSH configurado:** `~/.ssh/id_ed25519_bicofino` + `~/.ssh/config` com `Host github-bicofino`
**gh CLI:** autenticado como `studio-bicofino` (conta empresa: woney@bicofino.com)

---

## 4. CONTAS DA EMPRESA (woney@bicofino.com)

| Serviço | Conta | Uso neste projeto |
|---------|-------|-------------------|
| GitHub | studio-bicofino | Repo empresa: github.com/studio-bicofino/bicofino-ds |
| Vercel | woney@bicofino.com | Deploy (conectar ao repo studio-bicofino) |
| Supabase | woney@bicofino.com | Auth + Storage + DB (Athlete Portal + Consigliere) |
| OpenRouter | woney@bicofino.com | API Claude para o Consigliere Widget |
| Infisical | woney@bicofino.com | Secrets sync entre MacBook e iMac |
| Google Drive | woney@bicofino.com (Workspace) | Arquivos pesados dos atletas |

---

## 5. WORKFLOW DUAS MÁQUINAS

**MacBook** (atual, pessoal) + **iMac escritório** (chegando em dias)

```
Rotina diária:
1. git pull origin main           # puxar latest
2. infisical run -- npm run docs  # dev com secrets injetados
3. trabalhar normalmente
4. git push                       # envia para AMBOS os remotes

No iMac (quando chegar):
1. git clone git@github-bicofino:studio-bicofino/bicofino-ds.git
2. Instalar: brew install gh infisical
3. gh auth login (conta studio-bicofino)
4. infisical login (conta studio-bicofino)
5. Copiar ~/.ssh/id_ed25519_bicofino do MacBook OU criar nova chave e adicionar ao GitHub
```

**Infisical — ainda não configurado** (próxima sessão):
```bash
brew install infisical/get-cli/infisical
infisical init   # login com woney@bicofino.com, selecionar projeto
```

---

## 6. TRÊS SISTEMAS A CONSTRUIR (ROADMAP)

### 6A. CONSIGLIERE WIDGET — IA contextual (não iniciado)
Widget flutuante presente em todas as páginas do docs-site.

**Camada 1 — Cloud (login/senha):**
- Chat IA com brand Bicofino no system prompt
- Lê a rota atual e injeta conteúdo da página no contexto
- Exemplo: "fale sobre combinações desta paleta" → sabe que paleta está visível
- API: Claude via OpenRouter (conta Bicofino)
- Auth: Supabase Auth (login/senha)
- Acesso: clientes/parceiros com conta

**Camada 2 — Local only (só no iMac do escritório):**
- Supabase local (Docker) com dados dos clientes
- Matchmaking: cruza clientes × oportunidades × Universo Bicofino
- NUNCA sobe para cloud — roda só localmente
- Woney acessa via UI no iMac

**Stack planejado:**
- Widget: componente React flutuante (bottom-right), `z-index` alto
- API route: `/api/consigliere/chat` → OpenRouter → Claude
- System prompt: BRAND.md + BRANDCOMPLETO.md + conteúdo da página atual
- Auth middleware: Supabase session check

**Arquivo atual:** `apps/docs-site/src/app/consigliere/page.tsx` — só header, corpo vazio.

### 6B. ATHLETE PORTAL — Upload por atleta (não iniciado)
Área segura dentro do docs-site onde atletas fazem upload de arquivos.

**Regras de acesso:**
- Cada atleta: vê e faz upload APENAS na própria pasta
- Bicofino (Woney): acesso admin a todos
- Implementação: Supabase Auth + Storage + Row Level Security (RLS)

**O que cada atleta pode subir:**
- Vídeos de jogos
- Fotos de jogos
- Documentos (contratos, stats, etc.)
- Estatísticas (CSV, PDF)

**Arquivos grandes (>50MB):** Google Drive conta Bicofino (Workspace)
**Arquivos normais:** Supabase Storage

**Rotas planejadas:**
```
/atletas                    → lista (só admin)
/atletas/[slug]             → página do atleta (atleta vê a própria, admin vê todas)
/atletas/[slug]/upload      → formulário de upload
```

### 6C. VERCEL → studio-bicofino (pendente)
O deploy do Vercel ainda está conectado à conta pessoal WoneyMalian.
**Próximo passo:** reconectar o projeto Vercel à conta woney@bicofino.com + repo studio-bicofino/bicofino-ds.

---

## 7. DESIGN SYSTEM — TOKENS OBRIGATÓRIOS

**Cores (CSS vars em globals.css):**
```css
--bf-text-primary:   #2a2c2b
--bf-text-secondary: #5f6b77   /* ATUALIZADO — contraste 5.1:1 */
--bf-bg-page:        #ffffff   (docs-site) / depende do app
--bf-surface:        #F2F8FF
--bf-border:         #E5E7EB
--bf-accent:         #BFA37A
```

**Tipografia:** Inter (display/body) + JetBrains Mono (labels/metadata)
**Espaçamento:** sm=8px / md=16px / lg=32px
**Radius:** sm=4px / md=8px / lg=16px
**Ícones:** lucide-react, strokeWidth=1.5, size=20

**Regras hard:**
- Sem novos hexadecimais
- Sem gradientes
- Sem sombras decorativas
- Animações < 300ms, ease-out
- Eyebrow: 11px / Sidebar meta: 9px — INTENCIONAIS, não alterar

---

## 8. DOCS-SITE — ESTRUTURA DE PÁGINAS ATUAL

```
/                   → Start Here (home do sistema)
/brand              → Núcleo da Marca
/design-system      → Tokens visuais
/componentes        → Componentes
/verticais          → Verticais Bicofino
/operacoes          → Operações
/governanca         → Governança
/consigliere        → Consigliere (só header, corpo a implementar)
/start-here         → Intro
```

---

## 9. APPS/WEB — ESTADO ATUAL

Site público bicofino.com em produção.

**Páginas:**
- `/` — Hero principal com HeroBlock
- `/on-field` (= on-pitch) — Vídeo hero `video-onpitch.webm`, overlay 80%
- `/off-field` (= off-pitch) — Vídeo hero `video-offpitch.webm`, overlay 80%
- `/foundation` — Fundação
- `/club` — Club (placeholder, 5 violações conhecidas)

**Vídeos:** `apps/web/public/media/` — NÃO commitar (manual upload)
- `video-onpitch.webm` e `video-offpitch.webm` em uso
- `.mp4` excluídos via `.vercelignore` (>100MB)

**i18n:** BR / EN / IT via `content/index.ts`
**Motion:** `motion` v12 (Framer Motion)

---

## 10. PRÓXIMAS AÇÕES (por prioridade)

1. **Vercel reconectar** → conta studio-bicofino + repo studio-bicofino/bicofino-ds
2. **Infisical setup** → `infisical init` no projeto, secrets do Supabase/OpenRouter
3. **Merge branches** → `experiment/video-hero` → `main` (aprovado)
4. **Consigliere Widget** → implementar Camada 1 (chat IA + contexto de página)
5. **Athlete Portal** → Supabase Auth + Storage + RLS
6. **iMac setup** → quando chegar: clone, instalar ferramentas, SSH key

---

## 11. COMANDOS ÚTEIS

```bash
# Desenvolvimento
npm run docs           # docs-site localhost:3001
npm run web            # apps/web localhost:3002

# Git
git push               # envia para WoneyMalian + studio-bicofino
git push bicofino      # só para studio-bicofino
git push origin        # só para WoneyMalian

# gh CLI (studio-bicofino)
gh auth status         # verificar conta ativa
gh repo list           # repos da conta

# SSH test
ssh -T git@github-bicofino   # deve retornar "Hi studio-bicofino!"
```

---

*Gerado em 19 mai 2026 — Woney Malian / Bicofino*
