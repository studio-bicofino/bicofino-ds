# Vanguarda — Status

*Apps editoriais que cruzam o corpus VANGUARDA com a lente Bicofino. Audiência fechada (Club + Patriarcas selecionados), `noindex,nofollow`, sem CTA comercial.*

---

## Mapa dos apps

| App | Pasta | Porta | Estado |
|---|---|---|---|
| Mercados Globais | `apps/vanguarda/mercados-globais/` | 3020 | v0.1 — primeira versão completa |
| 100 Ideias | `apps/vanguarda/100-ideias/` | 3021 | v0.1 — primeira versão completa |
| Itália 2027 | `apps/vanguarda/italia-2027/` | 3022 | v0.1 — draft com 6 capítulos |

Os três apps são Next.js 16 (Turbopack) + React 19 + tokens Bicofino do `DESIGN.md`. Cada um é uma sub-app independente com seu próprio `package.json` (não compartilham `node_modules`).

Para subir os três junto com docs/web/ds-studio: `npm run dev` na raiz (pm2 via `ecosystem.config.js`).

---

## Mercados Globais (3020)

**Fonte:** `.planning/vanguarda/outputs/bicofino-cruzamento-mapa.md`

**Estrutura de conteúdo** (em `src/content/cruzamento.ts`):
- Sumário executivo
- Ângulo 1 — 6 prospects Off Pitch (Lovable, EliseAI, Linear, Mercury, Patriarca genérico Cluster C, Cucinelli Digital)
- Ângulo 2 — 5 teses Wealth (capital matrix, scenarios 6-way, geographic plays, vertical AI minoritárias, stablecoin/Cayman)
- Ângulo 3 — 4 matches On↔Off (Kerchner/PropTech, atleta-em-formação/AI tutoring, executivo/CFO stack, BoviChain/agritech)
- Ângulo 4 — 4 formatos Club (Quarteto, Caderno de Casa, Geografia Bicofino, Caderno de Operações)
- Método Quarteto refinado (Soberano 0.35 / Consigliere 0.25 / Criador-Raposa 0.40 · passing grade 8.5)
- Descartes explícitos (8 itens)
- Capabilities para o roadmap Bicofino-Platform (7 itens)

**Estética:** composição editorial em cards estruturados. Cores fiéis ao DESIGN.md.

---

## 100 Ideias (3021)

**Fonte:** `.planning/vanguarda/outputs/bicofino-curadoria-100-ideias.md`

**Estrutura de conteúdo** (em `src/content/curadoria.ts`):
- Sumário executivo
- 30 ideias curadas em 3 trilhas (12 Patriarca + 12 Construtor + 6 Atleta)
- 3 edições-piloto editoriais (Café/EUDR · Harvey BR · Longevidade)
- 5 sinais para o roadmap Bicofino-Platform
- 15 descartes explícitos
- Comparativo VANGUARDA (C1-C10) × filtros Bicofino

**Estética:** trilha-filter sticky no topo (Todas / Patriarca / Construtor / Atleta). Cada trilha tem cor própria sutil. Cards com rank original + score + categoria + 3 campos (angulação / conexão / cuidado).

---

## Itália 2027 (3022)

**Fonte:** Geografia Bicofino · Edição I · Conteúdo-piloto baseado em cruzamento C3

**Estrutura de conteúdo** (em `src/content/italia.ts`):
- Capa (eyebrow + título "Itália" 72-180px + subtítulo + abertura + ficha)
- Sommario (6 capítulos)
- I — As famílias do luxo (Cucinelli, Loro Piana, Della Valle)
- II — A Borsa que aprendeu a esperar (Milão + capital paciente BR)
- III — Calcio como ativo cultural (Zico → Kerchner)
- IV — Passaporte como instrumento (iure sanguinis + impatriati)
- V — O Norte da indústria (Bergamo, Vicenza, Brescia)
- VI — Voltar para ficar (residência fiscal + cálculo do retorno)
- Colofão

**Estética:** book-like, distinta dos outros dois. Background com tom papel (`#f4ede1`), drop cap dourado no primeiro parágrafo de cada capítulo, regra fina de accent marcando início do capítulo, line-height 1.78 no corpo. Sem deeptech (decisão consciente — capítulo de unicórnios IT deixado fora desta edição).

**Aviso editorial:** os 6 capítulos foram preenchidos com prosa de primeira mão para validar tom e layout. Não são versão final.

---

## Componentes compartilhados

Cada app tem seus próprios componentes (sem package compartilhado por simplicidade):

- `BicofinoLogo.tsx` — SVG inline com `fill="currentColor"` (herda light/dark). Source original: `assets Bicofino/Bicofino_logo.svg`.
- `ThemeToggle.tsx` — light/dark com persist em `localStorage` (chave `bf-theme`, compartilhada entre todos os apps Bicofino).
- `globals.css` — tokens DESIGN.md como CSS variables (`--bf-bg-page`, `--bf-text-primary`, `--bf-accent`, etc.) + light/dark via `[data-theme="dark"]`.

---

## Deploy

Os três projetos linkados na Vercel (scope `woney-malians-projects`). `noindex,nofollow` já está no `metadata` do layout de cada um — URLs são públicas mas não indexáveis em motores de busca.

| App | URL | Tipo | Dashboard |
|---|---|---|---|
| Mercados Globais | https://mercados-globais-mg6semr12-woney-malians-projects.vercel.app | preview | https://vercel.com/woney-malians-projects/mercados-globais |
| 100 Ideias | https://100-ideias-8gmhxl6j9-woney-malians-projects.vercel.app | production | https://vercel.com/woney-malians-projects/100-ideias |
| Itália 2027 | https://italia-2027-i3tarsnu8-woney-malians-projects.vercel.app | production | https://vercel.com/woney-malians-projects/italia-2027 |

**Nota:** Mercados Globais ficou como preview porque o primeiro `vercel --yes` falhou com ECONNRESET no upload e o retry usou `vercel deploy` (preview default). Os outros dois foram direto. Para promover Mercados Globais a produção: `cd apps/vanguarda/mercados-globais && vercel deploy --prod`.

**Para deploys futuros:** `vercel` ou `vercel deploy` dentro da pasta do app cria preview. `vercel deploy --prod` promove a produção. Cada app tem `.vercel/` local (gitignored) com o link do projeto — não apagar.

---

## Próximos passos

1. Revisar Itália 2027 capítulo a capítulo (prosa atual é primeiro draft).
2. Mapa Bicofino São Paulo (`apps/mapa-sp/`, porta 3030) — produto comercial separado da vanguarda.
3. Integração futura com base Supabase de clientes — matchmaking entre oportunidades (estes apps) e atores (base de clientes). Ver discussão em `.planning/vanguarda/`.
4. Capability AEO/LLM-monitor interno (vem dos sinais transversais identificados nos dois outputs).

---

*Última atualização: 2026-05-25*
