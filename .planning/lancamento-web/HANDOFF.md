# HANDOFF — Lançamento Web (apps/web)

> Estado vivo da frente "lançamento oficial". Ler junto com `BRIEFING.md`.
> Última atualização: **2026-06-10 (noite, 2ª rodada)** — texto de entrada DEFINIDO + intro só star.

## ✅ RESOLVIDO 2026-06-10 — Texto de entrada definido (fim do teste A/E) + intro única (star)

**Woney bateu o martelo no texto final do manifesto.** O teste das 5 variantes (sorteio por
refresh, `?copy=v1..v5`, marcador `// copy vN`) foi DESMONTADO:

- Chaves finais: **`home.mensch.p1/p2/p3`** + `home.mensch.signoff` (paridade BR/EN/IT).
  **3 parágrafos** — o p3 "cidadão global" ("não é new yorker, nem londrino…") entrou na
  1ª rodada mas foi CORTADO na 2ª ("texto acabou ficando muito comprido" — Woney, mesma
  noite); o parágrafo da casa fechou como p3, com o ajuste "não é **só** uma agência,
  nem **só** uma holding…".
- Arco final: tradutores/algo se perde → não traduz, é fluente (vestiário/arte/números/rua/
  moda/negócios) → a casa → Unlike Any Other. **3ª rodada (mesma noite):** lista do p2
  revisada + p3 com ponto ("É uma casa. Fluente em…" — caiu o travessão). **4ª rodada:**
  moda↔números trocados ("…da arte, dos números, da rua, da moda, dos negócios").
- **Login do Club:** placeholder do campo de usuário mudou de "acesso"/"access" → **"Bicofino-ID"**
  (chave `club.access`, BR+EN; IT cai no fallback BR — termo de marca, igual nos 3 idiomas).
- `HeroBlock.tsx`: blocos `⚠️ TEMP` removidos (sorteio, `?copy`, marcador); `MENSCH_KEYS`
  fixo com os 3 parágrafos; signoff entra como 4º bloco da cascata. Chaves `v1–v5` apagadas
  dos 3 idiomas.
- EN/IT traduzidos e auditados pelo `bicofino-copy-editor` (3 ajustes aplicados: "intersect"
  no EN p1, vírgula em vez de travessão no EN p2, "eppure" no IT p2).

**Intro de marca: só a STAR.** Decisão do Woney 10/06 — manter apenas a animação da estrela
(`StarSpin`), descartar as outras 4. `Glitch/SplitScreen/Fragments/RainDrops.tsx` apagados,
sorteio e override `?intro=` removidos do `Intro.tsx` (com 1 variante, basta recarregar pra
testar). DESIGN.md §8 + §11 emendados: a exceção sancionada agora nomeia o star-spin como
abertura única (~1s), com nota histórica das 5 variantes prototipadas.

**Nota (mantida):** intro toca em TODA visita — o guard 1×/sessão foi removido 10/06 porque o
session restore do Chrome ressuscitava o `sessionStorage` e escondia a intro de quem volta.
Navegação interna (client-side) segue sem replay; reduced-motion segue pulando tudo.

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

**Sistema de intro** como exceção sancionada no DESIGN.md (§8 + §11). Nasceu com 5 variantes
sorteadas; **desde 10/06 só a star** (decisão do Woney — ver topo deste doc).

### Arquivos
- `apps/web/components/intro/Intro.tsx` — orquestrador: decide skip (reduced-motion),
  monta overlay e toca a star. SSR mostra um preto liso (pré-decisão) → zero flash.
- `apps/web/components/intro/shared.ts` — contrato `VariantProps`, `OVERLAY_BASE`, `POWER_BLACK`.
- `apps/web/components/intro/variants/StarSpin.tsx` — estrela (sparkle do logo) gira + escala
  como janela na máscara (~1.0s).
- ~~`Glitch/SplitScreen/Fragments/RainDrops.tsx`~~ — apagados 10/06 (recuperáveis no git
  history, commits até `6bad006`).
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
`npm run web` (porta 3002) e abrir `http://localhost:3002/`. A intro toca em todo full page load —
basta recarregar. (O override `?intro=` saiu junto com o sorteio; com uma variante só, não há o
que forçar.)

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

**Fix 10/06:** o projeto tinha um Ignored Build Step custom (`git diff --quiet HEAD^ HEAD .`)
que comparava só o commit do TIP do push com o pai — se o último commit não tocasse `apps/web`,
o build era cancelado mesmo com commits anteriores mudando o site (aconteceu no push do texto
final). Removido via API; vale o comportamento padrão da Vercel (compara com o último deploy).
