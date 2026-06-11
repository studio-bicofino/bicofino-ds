# La Rete — HANDOFF

> Matchmaking da rede Casa Nostra: grafo vivo de ligações, motor de oportunidades,
> aderência a tendências (Vanguarda) e Radar de notícias externas.
> Construído em 10–11/06/2026 (Fable 5). **EM PROD: https://la-rete.vercel.app**

Este documento é escrito para a PRÓXIMA sessão — possivelmente um modelo menor
(Opus/Sonnet) fazendo ajustes. Siga as receitas e os checklists literalmente;
as decisões de arquitetura já foram tomadas e estão marcadas como invariantes.

---

## 1 · Estado e como rodar

- App: `apps/la-rete` · porta 3060 · `npm run la-rete` na raiz (ou `npm run dev` no app)
- Build: `cd apps/la-rete && npm run build` — precisa terminar VERDE antes de qualquer commit
- Prod: projeto Vercel `la-rete`, team **studio-bicofinos-projects**, SSO OFF (link público)
- Dados: 26 pessoas FAKE; tipos espelham o schema real do Casa Nostra
- 3 rotas: `/` (grafo + filtros + oportunidades) · `/tendencias` (12 seeds Vanguarda)
  · `/radar` (cola link/texto de notícia → quem acende)

## 2 · Mapa de arquivos (o que mora onde)

```
src/lib/data/types.ts        ← CONTRATO de dados. Mudou aqui, mudou em tudo. Cuidado máximo.
src/lib/data/tags.ts         ← vocabulário canônico de tags (ids estáveis sk-/gr-/af-/fa-/ca-/em-)
src/lib/data/people.ts       ← 26 pessoas fake (bios em voz Bicofino)
src/lib/data/trends.ts       ← 12 tendências seedadas (hooks referenciam NOMES exatos de tags.ts)
src/lib/engine/edges.ts      ← arestas por tags compartilhadas + REGRA DO PADRONE (ver §4)
src/lib/engine/matchmaking.ts← 163 oportunidades, 3 kinds, scoring comentado em PT
src/lib/engine/adherence.ts  ← tendência × pessoa (0–100)
src/lib/engine/radar.ts      ← léxico local notícia→tags (modo mockup do Radar)
src/app/api/radar/route.ts   ← fetch server-side de URL (futuro: ponto de entrada da IA)
src/components/ForceGraph.tsx← coração visual: d3-force + SVG (ver gotchas §7)
src/components/MoodDial.tsx  ← dial de mood PORTÁTIL (contrato de 4 CSS vars, ver header do arquivo)
src/components/Avatar.tsx    ← retratos B&W com curadoria por pessoa (public/avatars/)
src/app/globals.css          ← todos os estilos; tokens no topo; responsivo no fim
```

## 3 · Invariantes — NÃO mudar sem o Woney aprovar

1. **DESIGN.md é lei.** Tokens fechados, um vibrante por composição, cantos SHARP,
   Inter + JetBrains Mono (+ Gotham só no lockup "LA Rete" e impacto 1–2 palavras).
2. **Contrato de mood**: todo CSS de cor deriva de `--lr-ground`, `--lr-ink-rgb`,
   `--lr-dim-alpha`, `--current-accent`. NUNCA escreva um hex novo em um seletor —
   derive da tinta com `rgba(var(--lr-ink-rgb), alpha)` ou use token do canon.
3. **Motores determinísticos**: nada de `Math.random()`/`Date.now()` em `lib/engine/`
   e `lib/data/` (datas vêm de fora como argumento/ISO string).
4. **Motion**: só `transform`/`opacity`; durações `--dur-fast/base/slow`; loop
   ambiente só o `lr-breath`; tudo gated por `prefers-reduced-motion`.
5. **Voz Bicofino** em qualquer copy: sóbrio, concreto, sem hype, sem emoji
   (só ✦ e //), nunca "Não é X, é Y".

## 4 · Regras de produto já decididas

- **Padrone**: o sócio nº 1 (Fabio) conecta a rede INTEIRA — `buildEdges` injeta fio
  `intro`/'A casa' (peso 0.2) onde não há laço calculado. Genérico por `memberNumber === 1`.
- **Moods**: 11 pares chão/tinta MEDIDOS por contraste WCAG (tinta ≥4.5:1, dim ≥4.5:1
  via `dimAlpha`, accent ≥3:1). Para adicionar mood: medir ANTES (script de contraste
  no histórico ou refazer: luminância relativa WCAG), adicionar em `MOODS` com `dimAlpha` medido.
- **Accent em chão escuro**: usa/torino fora do sorteio (DESIGN.md §5, emendado 11/06).
- **Radar v1 = input estruturado** (link/texto → análise), NÃO chat aberto. Fase IA
  decidida: AI SDK + Vercel AI Gateway na MESMA rota `/api/radar`, structured output
  no shape `Trend`, léxico local como fallback sem chave.

## 5 · Receitas de mudanças comuns

- **Mudar pesos do matchmaking** → `matchmaking.ts`, helpers nomeados com comentário;
  manter score 0–100 inteiro.
- **Adicionar pessoa fake** → `people.ts` (id `p-<nome>`, memberNumber sequencial,
  só tag ids existentes em tags.ts, introBy alcançável a partir de p-fabio) +
  entrada em `Avatar.tsx` FILE_BY_PERSON.
- **Adicionar tendência** → `trends.ts`; `hooks[].tagName` tem que ser NOME EXATO de tags.ts.
- **Adicionar mood** → ver §4 (medir contraste primeiro).
- **Mexer no grafo** → ler gotchas §7 ANTES de tocar em ForceGraph.tsx.
- **Plugar Supabase real** → escrever adapter `PersonWithRelations → Person` (casa-nostra
  `src/lib/db/types.ts` → nosso `types.ts`); mesma instância do Casa Nostra; fotos reais =
  mapear `photo_url` (bucket `people-photos`) dentro de `Avatar.tsx`.

## 6 · Processo obrigatório antes de commitar (checklist)

1. `npx tsc --noEmit` limpo e `npm run build` verde.
2. Testar no browser em **1440px E 375px** (responsivo: <1100px vira pilha
   grafo→painel→filtros; já quebrou uma vez por pular este passo).
3. Se mexeu em UI: rodar agentes `bicofino-design-reviewer` e `bicofino-motion-curator`.
   Se mexeu em copy/dados: `bicofino-copy-editor`. Aplicar o que fizer sentido,
   surfacear tradeoffs pro Woney (nunca barrar skill em silêncio).
4. Atualizar ESTE HANDOFF se a mudança for relevante (regra da casa: handoff
   ANTES do sync — a memória do Claude não viaja entre máquinas, o repo viaja).
5. Commit com `Co-Authored-By`, depois `npm run sync` (ATENÇÃO: faz `git add -A`
   da raiz — confira `git status` antes pra não levar lixo junto).

## 7 · Gotchas técnicos (caros de redescobrir)

- **ForceGraph**: posições atualizadas IMPERATIVAMENTE no tick (refs), React só
  re-renderiza estrutura; `positions.current` preserva layout entre filtros (é isso
  que dá a fluidez). NÃO transicionar `transform` de `.lr-node` via CSS.
- **CSS transform × SVG**: animação CSS de `transform` SOBRESCREVE o atributo
  `transform` do SVG no mesmo elemento — por isso a foto de hover usa DOIS `<g>`
  (externo posiciona por atributo, interno anima). Não "simplificar" isso.
- **clipPath ids** precisam ser únicos por instância (Avatar usa personId+size).
- **next.config**: `turbopack.root` só quando existe package.json no monorepo root —
  é o que faz o MESMO código buildar local (monorepo) e na Vercel (standalone). Não remover.
- **Deploy**: `cd apps/la-rete && vercel deploy --prod --yes --scope studio-bicofinos-projects`.
  Sem worktree, sem project.json manual (o `.vercel/project.json` local já linka).
- **prefers-reduced-motion**: sim no breath/transições de movimento; o grafo
  pré-assenta (`sim.tick()` em loop) e revela parado.
- **iCloud**: se aparecerem arquivos " 2"/" 3", é o iCloud duplicando — não commitar.

## 8 · Roadmap (ordem de valor)

1. Calibragem com Fabio/Woney: pesos, topologia, copy das oportunidades.
2. Fase IA do Radar (arquitetura pronta — ver §4; sessão de modelo forte recomendada
   para o DESENHO do prompt/schema; a implementação um Opus faz).
3. Adapter Supabase (quando houver volume real no Casa Nostra).
4. Ideias guardadas: zoom/pan no grafo, modo "só oportunidades", export de briefing
   por par, drag de nó em touch (hoje touch = tap/selecionar; drag só com mouse).

## 9 · Histórico de commits relevantes

`d3cdba2` app inicial · `1b27000` emenda DESIGN.md §5 · `87d8db3` MoodDial+logo ·
`2c198e1` Radar+header Gotham · `cf6272c` avatares+header 2 níveis · `b42ddc7` fotos
B&W+masthead · `a37dafa` padrone hub+minúsculas · `b6ade94` lockup LA Rete ·
(este) responsivo mobile.
