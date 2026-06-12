# Consigliere Widget — Plano

> **NOTA (2026-06-12):** a primeira implementação REAL do Consigliere saiu em outro contexto:
> `apps/la-rete/src/app/api/consigliere/route.ts` (Claude Haiku, integrada ao motor de
> matchmaking, em prod desde 11/06). Este PLAN.md descreve o widget do **docs-site**, que
> segue como visão futura — ao retomá-lo, considerar reaproveitar/extrair o serviço de la-rete.

**App:** `apps/docs-site` · **Branch:** criar `feat/consigliere` a partir de `main` após merge de `experiment/video-hero`
**Escopo:** MVP sem auth. Híbrido: página dedicada + widget flutuante global.
**Stack:** Next 16 (App Router), Vercel AI SDK, OpenRouter → Claude Sonnet 4.

---

## Decisões fixas

| Tema | Decisão | Por quê |
|------|---------|---------|
| Auth | Adiada para fase posterior | MVP rápido, evita acoplamento com Supabase agora |
| Forma | Página `/consigliere` cheia + widget global em outras rotas | Página é "casa" do produto; widget é atalho contextual |
| Backend | API route única `/api/consigliere/chat` | Página e widget compartilham backend |
| Modelo | `google/gemma-3-27b-it:free` via OpenRouter (BYOK Google AI Studio) | API key vinculada ao Google AI Studio — Gemma roda gratuito. Override via `CONSIGLIERE_MODEL`. |
| Streaming | Sim, via Vercel AI SDK (`streamText` + `useChat`) | UX padrão de chat moderno |
| Contexto da página | Rota atual (`usePathname`) + sumário injetado por mapa estático | DOM scraping é frágil; mapa rota→resumo é determinístico |
| i18n | BR/EN/IT via `content/index.ts` | Paridade com resto do docs-site |
| Estilo | Inline styles + tokens `--bf-*` | Padrão do app, sem Tailwind |

---

## Fase 1 — Backend + System Prompt ✓ CONCLUÍDA

**Objetivo:** Endpoint funcional que recebe mensagens e responde em streaming com voz Bicofino.

**Status:** entregue em 2026-05-19. Falta apenas o usuário criar `.env.local` com a chave e rodar `npm run dev` para validar com curl.

**Entregas:**
1. ✓ Deps instaladas em `apps/docs-site`:
   - `ai@^6` (Vercel AI SDK)
   - `@ai-sdk/react@^3`
   - `@openrouter/ai-sdk-provider@^2`
   - `zod@^4`
2. ✓ `apps/docs-site/src/app/api/consigliere/chat/route.ts`:
   - POST handler com `streamText`
   - Recebe `{ messages, pageContext }` no body, retorna `toUIMessageStreamResponse()`
   - Valida API key e payload, retorna 400/500 claros em erro
   - `runtime = 'nodejs'`, `maxDuration = 30`
3. ✓ `apps/docs-site/src/lib/consigliere/system-prompt.ts`:
   - `buildSystemPrompt({ pageKey, lang })` retorna string
   - Voz: confiança calma, curadoria, vocabulário Bicofino, limites claros (sem inventar tokens)
   - i18n PT/EN/IT na directive de idioma
   - Brand voice baked-in (sem ler BRAND.md em runtime — versão Phase 1 enxuta; iterar depois)
4. ✓ `apps/docs-site/src/lib/consigliere/page-context.ts`:
   - `PAGE_CONTEXT` cobre 9 rotas (/, /brand, /design-system, /componentes, /verticais, /operacoes, /governanca, /consigliere, /start-here)
   - Fallback explícito para rotas não mapeadas
5. ✓ `.env.local.example` com `OPENROUTER_API_KEY` e `CONSIGLIERE_MODEL`
6. ⏳ `.env.local` — usuário cria e cola a chave real (`.env.local` já está no .gitignore raiz)

**Verificação (após criar `.env.local`):**
```bash
cd apps/docs-site && npm run dev
# em outro terminal:
curl -N -X POST http://localhost:3001/api/consigliere/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"id":"1","role":"user","parts":[{"type":"text","text":"oi, quem é você?"}]}],"pageContext":{"key":"/","lang":"pt-BR"}}'
```
Deve retornar stream SSE com `data: {...}` events.

---

## Fase 2 — UI: Página `/consigliere` (chat cheio)

**Objetivo:** Substituir corpo da página `/consigliere/page.tsx` por interface de chat full-bleed.

**Entregas:**
1. Refatorar `apps/docs-site/src/app/consigliere/page.tsx`:
   - Manter eyebrow `// 00 · CONSIGLIERE` e h1 atuais
   - Abaixo: componente `<ConsigliereChat variant="page" />`
2. Criar `apps/docs-site/src/components/consigliere/ConsigliereChat.tsx`:
   - Hook `useChat` da AI SDK apontando para `/api/consigliere/chat`
   - Variantes: `"page"` (full-bleed, max-width 720px, centrado) e `"widget"` (compacto, 380×560)
   - Mensagens com tokens Bicofino: user = `--bf-surface`, assistant = transparente
   - Input fixo no rodapé do container
   - Estados: vazio (sugestões iniciais), digitando, erro
3. Criar `apps/docs-site/src/components/consigliere/Message.tsx`:
   - Bubble com radius `md`, font Inter
   - Suporte a markdown leve (negrito, listas, links) — usar `marked` ou render manual mínimo
4. Adicionar strings em `content/br.ts`, `en.ts`, `it.ts`:
   - `consigliere.placeholder`, `consigliere.welcome`, `consigliere.suggestions[]`

**Verificação:**
- `/consigliere` carrega chat, mensagem de boas-vindas em PT/EN/IT
- Mandar "fale sobre o sistema visual" retorna resposta em streaming
- Visual passa em revisão contra DESIGN.md (sem hex novos, sem sombras, animações <300ms)

**Tokens gastos:** médio — UI nova com 2-3 componentes.

---

## Fase 3 — Widget flutuante global

**Objetivo:** FAB no canto inferior direito em todas as rotas, exceto `/consigliere`.

**Entregas:**
1. Criar `apps/docs-site/src/components/consigliere/ConsigliereFab.tsx`:
   - Client component
   - Botão circular 56×56, posição `fixed bottom: 24px right: 24px`
   - Ícone `MessageCircle` do `lucide-react` (stroke 1.5, size 20)
   - Estado: `open | closed`, persistido em `sessionStorage`
   - Quando aberto: renderiza `<ConsigliereChat variant="widget" />` num painel ancorado ao FAB
   - `usePathname()` → se rota for `/consigliere`, retorna `null`
2. Montar em `apps/docs-site/src/app/layout.tsx`:
   - `<ConsigliereFab />` antes do `</body>` (ou dentro do shell layout existente)
3. Contexto: `ConsigliereChat` lê `usePathname()` e envia `pageKey` no body de cada request
4. Acessibilidade:
   - FAB `aria-label="Abrir Consigliere"` (i18n)
   - Painel `role="dialog"` `aria-modal="false"`
   - Fecha com Esc

**Verificação:**
- Em `/brand`: FAB aparece, abre painel, pergunta "quais cores tenho?" retorna resposta com contexto da página brand
- Em `/consigliere`: FAB NÃO aparece
- Painel não vaza para fora da viewport em mobile (responsivo: full-screen em <640px)

**Tokens gastos:** médio — 1 componente novo + ajustes em layout/i18n.

---

## Fora do escopo (próximas frentes)

- **Auth Supabase** — bloqueio de acesso por sessão; vira fase quando Athlete Portal trouxer Supabase pro projeto
- **Camada 2 local** (matchmaking clientes × Bicofino) — só roda no iMac, Docker, Supabase local
- **Persistência de histórico** — conversa é efêmera por enquanto, sem DB
- **Rate limiting / billing tracking** — adiar até ter auth
- **Voz/áudio** — só texto no MVP
- **DOM scraping do conteúdo da página** — usar mapa estático em vez disso

---

## Riscos / pontos de atenção

1. **Brand voice no system prompt** — qualidade depende inteiramente de extrair as seções certas de BRAND.md/BRANDCOMPLETO.md. Reservar tempo na fase 1 pra iterar nesse prompt antes de seguir.
2. **OpenRouter rate limits** — sem auth, qualquer um pode disparar requests. Mitigação tática: limitar por IP via cabeçalho `x-forwarded-for` numa middleware leve OU aceitar o risco no preview e mover Vercel pra conta `studio-bicofino` antes de divulgar.
3. **Inline styles + chat denso** — chat tem muitos elementos repetidos (mensagens). Vale extrair os style objects pra `const` no topo do componente pra não recriar a cada render.
4. **`useChat` v5 da AI SDK** — checar versão exata; API mudou de v3→v4→v5. Documentar no PLAN se houver breaking changes.

---

## Como rodar cada fase

```bash
# Pré-fase 1
cd apps/docs-site
npm install ai @openrouter/ai-sdk-provider

# Durante o dev
npm run dev   # localhost:3001

# Variáveis
echo "OPENROUTER_API_KEY=sk-or-..." >> .env.local
```

---

*Plano criado em 2026-05-19 — sem GSD ceremony, execução direta.*
