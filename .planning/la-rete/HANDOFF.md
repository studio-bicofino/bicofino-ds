# La Rete — HANDOFF

> Matchmaking da rede Casa Nostra: grafo vivo de ligações, motor de oportunidades
> e aderência a tendências (Vanguarda). Construído na madrugada de 10→11/06/2026.

## Estado: MOCKUP FUNCIONAL COMPLETO

- **App:** `apps/la-rete` · porta **3060** · `npm run la-rete` na raiz
- Build verde, type-check limpo, ambas as rotas (`/` e `/tendencias`) renderizando.
- Dados **fake** (26 pessoas), mas o modelo espelha o schema real do Casa Nostra —
  plugar o Supabase é escrever um adapter, não refazer nada.

## O que existe

### `/` — Rete (grafo da rede)
- **Grafo de força** (`d3-force` + SVG): 26 membros, 108 ligações derivadas de tags
  compartilhadas. Nó dimensionado por `networkReach`; ✦ marca membros de família.
- **Filtros fluidos** (trilho esquerdo): tipos de ligação (família/empresa/afiliação/
  grupo/skill/apresentação), clusters A/B/C, e todas as tags por kind. Ligar/desligar
  um filtro reaquece a simulação — quem fica desliza para o novo arranjo, quem sai
  vira ponto-fantasma na última posição. Posições sobrevivem entre filtros.
- **Interação:** hover destaca vizinhos; clique abre painel do membro; nós arrastáveis
  (física responde); teclado funciona (tab + enter).
- **Painel direito:** sem seleção = top 10 oportunidades da casa; com seleção = perfil
  (scores 1–5 em barras, tags por kind, sinais, apresentado-por) + oportunidades do membro.
  Clicar numa oportunidade entre membros acende o par no grafo.

### `/tendencias` — aderência a tendências
- 12 tendências seedadas do universo **Vanguarda** (100 Ideias, Mercados Globais,
  Italia 2027) + 3 enquadradas como notícia externa (Reuters, Sifted, Bloomberg Línea).
- Selecionar uma tendência **acende os membros aderentes no vibrante** (brilho ∝ score
  0–100) e ranqueia no painel direito com a razão concreta de cada um.
- Motor: hooks de tag com peso + boosts (reach, disposição, sinal com keyword da
  tendência). Ex.: EUDR acende 9/26 membros.

### MoodDial — dial de mood portátil (pedido 11/06)
- Botão fixo embaixo à esquerda (referência: "Pick your vibe" do wantedfornothing.com):
  cada clique cicla o esquema de cor inteiro da página. **11 moods do canon**, todos
  medidos WCAG sobre o chão (tinta ≥4.5:1, tinta dim ≥4.5:1 via `dimAlpha` por mood,
  accent ≥3:1): Notte (default, mantém o sorteio), USA, Torino, Caffè (escuros c/ tinta
  clara), Crema, Cielo, Champagne (claros c/ tinta escura), Australia, Miami, SPFC,
  Como (chãos vibrantes — ali o vibrante é o próprio chão, sinal vira a tinta, M-03).
- **Portátil por contrato de 4 variáveis** (`--lr-ground`, `--lr-ink-rgb`,
  `--lr-dim-alpha`, `--current-accent`): o CSS do app inteiro deriva da tinta via
  `rgba(var(--lr-ink-rgb), alpha)` — o dial não conhece nenhum seletor do app. Para
  levar a outro app: copiar `src/components/MoodDial.tsx`, derivar o CSS das 4 vars,
  renderizar `<MoodDial storageKey="bf-mood:<app>" />`. Persiste em localStorage.
- Logo Bicofino no chrome (portado de casa-nostra, `currentColor` — acompanha o mood).

### Radar — leitura de notícia externa (pedido 11/06)
- Rota `/radar`: campo para **colar link OU texto** de notícia. Link → `/api/radar`
  busca a página server-side (sem CORS), extrai título/descrição/corpo; texto → direto.
- A leitura vira uma **Trend sintética** via léxico local (`src/lib/engine/radar.ts`:
  ~20 padrões PT → tags do canon, título pesa 3x) e cai no MESMO motor de aderência —
  grafo acende quem se beneficia, painel ranqueia com razões. Histórico de leituras na sessão.
- **Fase IA (decidido como caminho):** mesma rota `/api/radar` passa a chamar um modelo
  (AI SDK + Vercel AI Gateway, structured output no shape `Trend`) usando a extração
  atual como contexto. Léxico vira fallback sem chave. Página não muda. Input estruturado
  (link/texto → análise) escolhido em vez de chat aberto para a v1; thread de refinamento
  conversacional fica para depois, se a calibragem pedir.

### Header de produto (11/06)
- 64px: logo Bicofino (16px) + **LA RETE em Gotham Black** (exceção de impacto §6,
  fontes self-hosted copiadas do motion-lab) + nav (Rete · Tendências · Radar) +
  meta + **MoodDial no topo à direita** (saiu do canto inferior).

### Motores (puros, determinísticos, testáveis)
- `src/lib/engine/edges.ts` — arestas por tags compartilhadas, peso por kind
  (família 1.0 > empresa 0.8 > intro 0.6 > afiliação 0.5 > grupo 0.45 > skill 0.3).
- `src/lib/engine/matchmaking.ts` — 163 oportunidades em 3 kinds: **entre-membros**
  (12 teses de complementaridade, ex. Agro×Fintech, Atleta×Wealth), **com-bicofino**
  (disposição ≥4 + frentes da casa), **mercado** (sinais × demandas). Score 0–100 com
  rationale em frases; bônus de intermediação quando o par ainda não se conhece
  ("a casa faz a ponte").
- `src/lib/engine/adherence.ts` — aderência tendência×pessoa.
- `src/lib/data/types.ts` — contrato; espelha types do Casa Nostra (TagKind, Cluster,
  Score 1–5, cidadanias ISO, sinais).

## Decisões de design (auditadas)

- Chão **power-black**, modo SYSTEM, cantos SHARP, M-01 grafismo técnico: o grafo É o
  organismo vivo (respiração ambiente nos nós, 6s dessincronizada, gated por
  `prefers-reduced-motion` — com reduced motion o layout assenta pré-calculado).
- 3 auditorias rodadas e aplicadas (design-reviewer, motion-curator, copy-editor):
  tokens no canon, breath em `opacity` real, escala de fonte fechada, 6 rewrites de
  copy ("Não é X, é Y" eliminados dos dados gerados).
- **Proposta de emenda ao DESIGN.md §5 (decidir com Woney):** em chão power-black o
  sorteio do `--current-accent` exclui Highlights que reprovam contraste no escuro
  (usa `#05185c`, torino `#821324`). Está como comentário em `src/app/layout.tsx`;
  se aprovado, dobrar no DESIGN.md (enrichment loop).
- Chevron do trilho é glifo mono `›` (lucide a 20px não cabe na régua de 10px) —
  comentado no código; trocar se incomodar.

## Próximos passos (em ordem de valor)

1. **Sessão de ajustes com Woney** — é mockup: topologia, pesos e copy são chumbo de calibragem.
2. **Plugar Supabase real do Casa Nostra** — adapter `PersonWithRelations → Person`
   (campos já mapeados em types.ts); mesma instância `grqbmzgntqfxxoelvtpy`.
3. **Tendências reais** — trocar seed por ingestão (RSS/API de notícias ou o próprio
   Vanguarda quando virar produto); o motor de aderência já aceita qualquer Trend.
4. **Deploy** — padrão da casa: projeto Vercel no team studio-bicofinos-projects,
   rootDir `apps/la-rete`. Nada commitado em public/.
5. Ideias guardadas: zoom/pan no grafo, modo "só oportunidades" (arestas = opps),
   export de briefing de apresentação por par.

## Gotchas

- `people.ts` é fake — os 3 Brancatelli reais estão genéricos de propósito (p-fabio,
  p-enzo, p-luca). Os outros 23 são inventados; nomes não correspondem a pessoas reais.
- Dev server pode ter ficado rodando na 3060 (`/tmp/la-rete-dev.log`).
- A simulação roda client-side; primeira pintura tem fade de 360ms enquanto assenta.
