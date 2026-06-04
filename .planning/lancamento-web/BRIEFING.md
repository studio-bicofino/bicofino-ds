# Lançamento Oficial — bicofino-web

> Briefing para o chat que vai executar. Frente única "lançamento oficial do site público"
> (`apps/web` → bicofino.com / `bicofino-web-brown.vercel.app`). Três sub-frentes:
> **Legal · SEO · Intro Motion**. Ler integralmente antes de propor escopo/schema.

## Contexto

`apps/web` é o site institucional público (motion + portfólio). Objetivo do Woney:
**ser o site oficial que aparece em #1 quando alguém busca "bicofino" no Google**, com
abertura animada de marca. Stack: Next.js (App Router) + `motion` v12. Git-connected na
Vercel da empresa (`studio-bicofinos-projects/bicofino-web`), deploy automático no push do
`main`. Domínio: `bicofino-web-brown.vercel.app`.

## Decisões travadas (Woney, 2026-06-04)

1. **Idiomas:** manter **BR + EN + IT** (trilíngue). Política de Privacidade sai nos 3 idiomas.
2. **Dados/cookies:** **cookie-light** — SEM Google Analytics / Meta Pixel / tracker. Legal vira
   um aviso informativo simples; ranqueamento via Search Console + sitemap + structured data
   (trackers NÃO são fator de ranking — isso ficou claro com o Woney).
3. **Intro motion:** **SIM, sistema de variantes random** (sorteia por acesso). Tratar como
   **exceção sancionada no DESIGN.md** (precedente: loop ambiente M-01).

## Estado atual auditado (não precisa reauditar)

- **Trackers:** NENHUM no código-fonte (`app/`, `components/`, `content/`). Site já é cookie-light.
- **Idiomas:** `content/{br,en,index,it}.ts`. BR é default/fallback. Padrão igual ao docs-site.
- **SEO existente:** `metadata` em `app/layout.tsx` (parcial). **FALTAM:** `app/sitemap.ts`,
  `app/robots.ts`, JSON-LD `Organization`, e provavelmente OG completo + `metadataBase`.
- **Motion:** `motion` v12 + `AnimatePresence` já em uso. **NÃO existe** preloader/intro/splash hoje.
- **Tokens:** `apps/web` tem inversão local — `--bf-bg-page=#fff`, `--bf-surface=#f2f8ff`, e um accent
  **local** `--bf-accent=#bfa37a` (NÃO é canon do DS v3.1; não propagar). Ver CLAUDE.md §apps/web.
- **Deploy:** push no `main` que toque `apps/web` → deploy automático (Ignored Build Step
  `git diff --quiet HEAD^ HEAD .`, rootDirectory `apps/web`).

---

## Frente A — Legal (cookie-light)

Como não há cookie não-essencial, **não precisa de banner de consentimento bloqueante** (opt-in).
Basta:

- [ ] **Aviso de cookies informativo** — barra discreta "este site usa cookies essenciais", com
      "Entendi" e link pra Política. Dismissível, salvo em `localStorage` (não cookie de tracking).
      Respeitar tokens/anti-decoração do DESIGN.md.
- [ ] **Política de Privacidade** (`/privacidade` · `/privacy` · `/privacy` IT) — controlador (Bicofino),
      dados coletados (mínimos — formulário de contato se houver?), base legal, direitos do titular
      (LGPD art. 18), contato do encarregado/DPO, menção a GDPR pro público EU/Itália.
- [ ] **Política de Cookies** — lista os cookies essenciais (provavelmente só preferência de idioma +
      o dismiss do aviso). Curtíssima, dado o cenário cookie-light.
- [ ] **i18n:** todos os textos legais em BR/EN/IT (paridade obrigatória — ver skill bicofino-i18n-pattern).
- [ ] **Rodapé:** links pras políticas.
- ⚠️ **Não sou advogado.** Entregar ~90% pronto e marcar onde um jurídico deve revisar (sobretudo a
      parte GDPR/Itália). Decisão de publicar é do Woney.

**Questão aberta p/ o chat novo:** o site coleta ALGUM dado? (formulário de contato, newsletter,
mailto, embed de terceiro que seta cookie?) Isso define o conteúdo das políticas. Auditar antes.

## Frente B — SEO / ranquear #1 em "bicofino"

Nome de marca é único → #1 é muito alcançável. Nada disso usa cookie.

- [ ] **`app/robots.ts`** — permitir indexação, apontar sitemap.
- [ ] **`app/sitemap.ts`** — todas as rotas (on-pitch, off-pitch, foundation, etc.) nos 3 idiomas.
- [ ] **JSON-LD `Organization`** no `layout.tsx` — nome, logo, url, `sameAs` (Instagram, LinkedIn…)
      → destrava o painel de marca (Knowledge Panel) à direita no Google.
- [ ] **Metadata completo** — `metadataBase`, `title`/`description` por rota, `openGraph` + `twitter`
      card com imagem, `alternates.languages` (hreflang BR/EN/IT), `canonical`.
- [ ] **Imagem OG** — capa de compartilhamento (1200×630) no padrão visual Bicofino.
- [ ] **`manifest.ts`** + favicons/ícones (estrela Bicofino).
- [ ] **Ação externa do Woney (não-código):** verificar domínio no **Google Search Console** e
      submeter o sitemap. (É a ferramenta que importa pra indexação — não o Analytics.) Documentar
      o passo-a-passo pra ele.
- [ ] Conferir performance/LCP (a intro NÃO pode degradar — conteúdo renderiza por baixo).

## Frente C — Intro Motion (sistema de variantes random)

Abertura animada de marca, sorteada a cada acesso. Tratar como **exceção sancionada** no DESIGN.md.

- [ ] **4 variantes** sorteadas no client (evitar hydration mismatch — sorteio pós-hydrate):
      1. **Star-spin reveal** — tela preta → estrela Bicofino minúscula no centro → gira → escala e
         abre tomando a tela, revelando o site. (a ideia-base do Woney)
      2. **Glitch** — entrada com efeito glitch.
      3. **Tela formando** — site "se monta" (blocos/linhas formando o layout).
      4. **Parallax** — camadas entrando em profundidade.
- [ ] **Salvaguardas obrigatórias:**
      - `prefers-reduced-motion` → **pula a intro** inteira (acessibilidade + regra DESIGN.md).
      - **Conteúdo renderiza por baixo** (intro é overlay) → não prejudica SEO/LCP.
      - **Curta (~0.8–1.2s)**, `ease-out`.
      - Frequência: avaliar **1×/sessão** (`sessionStorage`) vs. toda visita. Woney pediu "random a
        cada acesso" — confirmar se quer mesmo a cada navegação (cansa quem volta) ou 1×/sessão.
- [ ] **DESIGN.md:** adicionar a intro como exceção nomeada (seção de motion + linha no §11 changelog),
      espelhando o tratamento do M-01. (Enrichment loop — regra do projeto.)
- [ ] Usar só tokens/durações do sistema; sem cores/raios fora do canon. A estrela = asset de marca.

---

## Ordem sugerida de execução

1. **SEO** (rápido, alto impacto, sem risco) — robots/sitemap/JSON-LD/metadata + guia do Search Console.
2. **Legal** (auditar coleta de dados → escrever políticas BR/EN/IT + aviso de cookies).
3. **Intro motion** (a mais "criativa"; depende de validar variantes com o Woney + exceção no DESIGN.md).

Cada frente pode virar um PR próprio. Tudo deploya via `main` (push automático).

## Regras do projeto a respeitar

- `DESIGN.md` é fonte da verdade visual; intro entra como exceção formalizada (não gambiarra).
- Paridade i18n BR/EN/IT sempre (skill `bicofino-i18n-pattern`).
- Tokens fechados (skill `bicofino-tokens`); accent local `#bfa37a` é exclusivo do apps/web.
- Atualizar este BRIEFING/criar HANDOFF **antes** de cada `sync` relevante (regra handoff-before-sync).
