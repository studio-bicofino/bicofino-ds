# HANDOFF — Lançamento Web (apps/web)

> Estado vivo da frente "lançamento oficial". Ler junto com `BRIEFING.md`.
> Última atualização: **2026-06-10 (noite)** — TESTE DE COPY EM ABERTO, ler antes de tudo.

## ⚠️ EM ABERTO — Teste das 5 variantes do texto de entrada (decidir com Woney)

A abertura do manifesto (p1+p2) está em **teste A/B/C/D/E em prod**: 5 variantes sorteadas
por refresh, marcador discreto `// copy vN` no topo da coluna, override `?copy=v1..v5`.
p3 ("Bicofino não é uma agência…") + signoff são FIXOS — Woney aprovou.

Direcionamento do Woney que gerou as variantes: (1) tirar o eco "coisas/coisa";
(2) "gestor traduz patrimônio para a **família**" (family office, casa aconchegante);
(3) repensar "sociedade paulistana" (só "sociedade"? SP-Milão-NY?); (4) arco narrativo
= conectar/curar/criar/aconselhar → fluência em universos que não conversam → unlike any other.

- **v1 Lapidada** — texto atual com arestas tiradas (mudança mínima)
- **v2 Tríade** — v1 + sociedade paulistana/milanesa/novaiorquina (eixo internacional)
- **v3 Caminho dos 4 Cs** — abre ecoando Conectar/curar/criar/aconselhar
- **v4 A mesa** — a mais aconchegante ("recebe cada mundo", "sentar à mesma mesa")
- **v5 Aforística** — subtração máxima, duas frases-lâmina
- Chaves: `home.mensch.v{1-5}.p{1,2}` em br/en/it (paridade completa).
  **Na escolha:** colapsar pra `home.mensch.p1/p2`, remover sorteio + marcador no
  `HeroBlock.tsx` (blocos marcados com `⚠️ TEMP`), apagar chaves não usadas nos 3 idiomas.

**Nota:** a intro de marca NÃO se perdeu — é o guard 1×/sessão (aba nova/anônima re-executa;
`?intro=` força). Woney estranhou em 10/06; explicado e confirmado vivo em prod via Playwright.

## 2026-06-10 — Gotham Fase 2 + receita final do split reveal (3 rodadas com Woney)

### Gotham self-hosted (Fase 2 do CLAUDE.md/DESIGN.md)
- `apps/web/public/fonts/Gotham-{Bold,Black}.woff2` (copiadas do docs-site, ~16KB cada) +
  `@font-face` no globals.css + token **`--bf-font-impact`** (Gotham → fallback Inter).
- **4 Cs em Gotham Bold 700** (testamos Black 900, Woney preferiu Bold).
- **Seções:** h1 = palavra da seção em Gotham Bold ("On Pitch"/"Off Pitch"/"Foundation",
  clamp 36–56px); os títulos antigos ("The Athlete Is the Asset." etc.) viraram **eyebrow**
  mono com prefixo `//`. Sem mudança i18n — só troca de chave (`*.title` ↔ `*.heading`).
- **Nav padronizado:** links do header/mobile em title case (On Pitch · Off Pitch · Foundation);
  valores das chaves nav atualizados nos 3 idiomas, `textTransform: lowercase` removido do Header.

### Receita final do split reveal (após testar horizontal intercalado — descartado)
- **Gesto:** vertical, cada linha/palavra sobe da própria dobra (mask overflow hidden).
- **Valores escolhidos pelo Woney:** duração **0.9s**, ease **expo.out `[0.19, 1, 0.22, 1]`**,
  stagger **90ms** entre linhas. Usado nos 4 Cs e nos h1 das 3 seções (via `SplitReveal`
  com prop `ease`).
- **Coreografia do hero (ordem final):** vídeo (0.08s) → 4 Cs (0.24s) → texto mensch em
  **cascata de BLOCOS** (0.5s base, cada parágrafo+signoff entra inteiro com y:24+opacity,
  stagger 120ms, mesma dupla 0.9s/expo.out — split por palavra foi descartado pelo Woney).
  Baseline do signoff alinhada à do "Consult." via trim medido no browser
  (`margin-bottom: calc(clamp(40px,7vw,88px) * 0.1)`, desktop only). O `SplitReveal`
  segue em uso nos h1 das seções.
- ⚠️ **Emenda §8 pendente** (sessão motion-lab): formalizar no DESIGN.md o gesto masked-reveal,
  duração 0.9s + expo.out, stagger por palavra ~10–15ms, e o uso da Gotham em títulos de
  seção/4 Cs no §6 (hoje o texto fala "1–2 palavras de impacto").

## Onde estamos

| Frente | Status |
|--------|--------|
| **A — Legal** (cookie-light, políticas BR/EN/IT, aviso de cookies) | ⬜ não iniciada |
| **B — SEO** (robots/sitemap/JSON-LD/metadata/OG/manifest + Search Console) | ✅ **entregue 2026-06-09** (falta só a ação externa do Woney no Search Console) |
| **C — Intro Motion** (sistema de variantes random) | ✅ **entregue 2026-06-05** |

**Próximo passo natural: Frente A (Legal)** + apontar o domínio oficial na Vercel.

## 2026-06-09 — Manifesto novo + Split Reveal + Frente B

### Texto de entrada (manifesto "fluência")
- `home.mensch.p1/p2/p3` substituídos pelo manifesto novo do Woney (competência → fluência →
  "não traduz" → casa). BR é o original; EN/IT traduzidos e auditados pelo `bicofino-copy-editor`.
- Eyebrow do topo (`home.mensch.eyebrow`) saiu; entrou **`home.mensch.signoff`** ("Bicofino.
  Unlike Any Other.") como fecho em mono no fim da coluna — segue a ordem do texto do Woney.
- ⚠️ Dois pontos do copy-editor ficaram **a decidir pelo Woney** (texto dele, não mexi):
  1. p2 usa "**O** Bicofino" e p3 "Bicofino" (artigo inconsistente na mesma composição);
  2. p3 é a construção "Não é X. É Y." que o DESIGN.md §10 rejeita — se ficar, registrar
     como exceção sancionada (como a intro), pra não virar precedente mudo.

### Split reveal (graduação do motion-lab EXP-01, adaptado a Framer Motion)
- **Novo primitivo:** `components/primitives/SplitReveal.tsx` — split por palavra,
  `mask` opcional (palavra sobe da própria dobra), reduced-motion → render estático,
  `.bf-reveal` em cada palavra (noscript ok). Só transform/opacity, 360ms, `--ease-out`.
- **4 Cs** (`FourCsHeading.tsx`): cada linha agora é masked reveal (y 110%→0, 360ms, stagger 70ms).
- **Coluna mensch** (`HeroBlock.tsx`): cascata contínua de palavras pela coluna inteira
  (delay = contagem corrida de palavras × 8ms); signoff masked no fim.
- ⚠️ **Pendência canon:** o gesto masked-reveal (rise >12px sob máscara) ainda NÃO está no
  DESIGN.md §8 — é a "emenda §8" que o motion-lab aguarda (sessão de escolha). Mecanicamente
  obedece tudo (propriedades, durações, ease); falta formalizar o gesto + o stagger por
  palavra (~8–15ms) no §8 + §11. Curator e design-reviewer flagaram; decidir com o Woney.
- Guards de `prefers-reduced-motion` adicionados também no vídeo do hero e nos 4 Cs
  (não existia `MotionConfig` global — cada componente se gateia).

### Frente B — o que foi construído
- `app/robots.ts` — indexação liberada, `/club` disallow, aponta sitemap.
- `app/sitemap.ts` — `/`, `/foundation`, `/on-pitch`, `/off-pitch` (club fora, members-only).
- `app/manifest.ts` — name/ícones (estrela)/cores de token (`#ffffff` bg, `#061015` theme).
- `app/layout.tsx` — metadata completo: `title.template "%s — Bicofino"`, canonical, OG completo
  (1200×630, dims explícitas), twitter card, **JSON-LD `@graph` Organization + WebSite**
  (endereço Pinheiros, sameAs Instagram — adicionar LinkedIn quando houver).
- `layout.tsx` por seção (`foundation`/`on-pitch`/`off-pitch`/`club`) — title/description por
  rota (páginas são client components, não exportam metadata); club com `robots: noindex`.
- **hreflang NÃO entrou, de propósito:** o idioma troca client-side na MESMA URL (sem rotas
  /en /it). hreflang exige URLs distintas por idioma — declarar sem ter as rotas é anti-pattern
  (ref. `international-seo.md` da skill seo-geo-audit). Se um dia houver rotas por idioma, aí sim.
- **Skill `seo-geo-audit` instalada** em `.claude/skills/seo-geo-audit/` (veio da raiz do repo) —
  invocável p/ auditoria completa pré-lançamento e investigações futuras.

### Guia Search Console (ação externa do Woney — não-código)
1. Apontar o domínio `bicofino.com` pro projeto `bicofino-web` na Vercel (Settings → Domains;
   a Vercel dá o registro DNS — A/ALIAS ou NS). HTTPS + redirect www são automáticos.
2. https://search.google.com/search-console → **Adicionar propriedade → tipo "Domínio"**
   (cobre www/sem-www/http/https de uma vez) → verificação por **registro TXT no DNS**
   (no provedor do domínio ou na própria Vercel se o DNS estiver lá).
3. Após verificar: **Sitemaps → adicionar `https://bicofino.com/sitemap.xml`** → enviar.
4. **Inspeção de URL** na home → "Solicitar indexação". Repetir nas 3 seções.
5. Em ~1 semana, conferir Cobertura/Páginas (sem erros) e Desempenho (impressões p/ "bicofino").

## Frente C — o que foi construído

**Sistema de intro com 5 variantes**, sorteado 1×/sessão, como exceção sancionada no DESIGN.md (§8 + §11).

### Arquivos
- `apps/web/components/intro/Intro.tsx` — orquestrador: decide skip (reduced-motion / sessão),
  sorteia variante (override `?intro=`), monta overlay. SSR mostra um preto liso (pré-decisão) → zero flash.
- `apps/web/components/intro/shared.ts` — contrato `VariantProps`, `OVERLAY_BASE`, `POWER_BLACK`, eases.
- `apps/web/components/intro/variants/`
  - `StarSpin.tsx` — estrela (sparkle do logo) gira + escala como janela na máscara.
  - `Glitch.tsx` — blocos irregulares (linhas de altura aleatória × segmentos), jitter + saída caótica.
  - `SplitScreen.tsx` — duas metades + costura `--bf-accent` partem do centro.
  - `Fragments.tsx` — subdivisão recursiva BSP → cacos fractais caindo com gravidade (ease-in).
  - `RainDrops.tsx` — gotas/lago: máscara de discos (reveal, `ease-in` atrasado) + anéis de ripple outline
    (trem concêntrico + secundários propagantes, `ease-out`). Pior-caso ~3.0s.
- `apps/web/components/home/HeroBlock.tsx` — recebe `revealed`, orquestra cascata vídeo→4Cs→texto.
- `apps/web/components/home/FourCsHeading.tsx` — aceita `start`/`baseDelay`; cai no IntersectionObserver standalone.
- `apps/web/app/page.tsx` — estado `revealed`; `<Intro onReveal={...}>` no topo.
- `apps/web/app/layout.tsx` — `<noscript>` esconde overlay + força `.bf-reveal{opacity:1}` (no-JS safe).

### Mecânica de revelação
Overlay `--bf-power-black` em `position:fixed; zIndex:9999; pointerEvents:none`. Cada variante começa
100% preta e chama `onComplete` quando o preto some → desmonta o overlay e dispara `onReveal` → a
home seta `revealed=true` → cascata de entrada do hero. **Conteúdo sempre renderiza por baixo** (SEO/LCP intactos).

> ⚠️ Aprendizado: NUNCA disparar `onComplete` via um `motion` com `initial===animate` (ex. `opacity:0→0`).
> O framer-motion pula a animação e dispara `onAnimationComplete` na hora → overlay desmonta no 1º frame
> (parecia "imperceptível"). Amarrar sempre ao elemento real que termina por último.

### Como testar
`npm run web` (porta 3002) e abrir `http://localhost:3002/?intro=<variante>`. Override ignora o guard de
sessão (reload re-executa). `<variante>` = `star|glitch|split|fragments|rain|random`. Em dev, o console
loga `[intro] variant: …` no sorteio.

### Regras / canon
- DESIGN.md §8 ganhou a subseção **"Sanctioned exception — the brand intro"** + linha no §11.
  É a ÚNICA parte do sistema onde motion pode entrar de `scale(0)`/`r=0`. Não vazar pra UI de produto.
- Auditado pelo `bicofino-motion-curator`: variantes limpas/cobertas; hero clampado ao registro calmo
  (durações ≤360ms, stagger 55–70ms, translate 8–12px) mantendo a coreografia via delays.

## Pendências do contrato (Frentes A e B)
Ver checklists no `BRIEFING.md`. Resumo do que falta pro lançamento oficial:
- **SEO:** `app/robots.ts`, `app/sitemap.ts`, JSON-LD Organization, metadata completo (metadataBase,
  hreflang BR/EN/IT, OG/twitter), `manifest.ts` + favicons (estrela). Guia do Search Console pro Woney.
- **Legal:** auditar coleta de dados → Política de Privacidade + Cookies BR/EN/IT + aviso informativo
  dismissível. Marcar onde jurídico deve revisar (GDPR/Itália).

## Deploy
`apps/web` é git-connected na Vercel da empresa (`studio-bicofinos-projects/bicofino-web`),
deploy automático no push do `main` (rootDirectory `apps/web`). `npm run sync` commita+pusha.
