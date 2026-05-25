# STATUS — BoviClass (Masterclass Agro / BoviChain)

**Data:** 24 de maio de 2026 (v2.1 — pacote único + metric cards com accent napoli e texto explicativo)
**Branch:** experiment/video-hero
**App:** `apps/propostas/masterclass-bovichain/`
**Porta de dev:** `3011` (definida no package.json)
**Cliente:** BoviChain
**Proponente:** Studio Bicofino

---

## Contexto

Orçamento profissional do Studio Bicofino para a campanha **BoviClass** (renomeada a partir de "Masterclass Agro" a pedido do cliente).

**v2.x** — Modelo comercial é **pacote fechado único** de R$ 300.900 com todos os opcionais embutidos. A apresentação foca em ENTREGAS via 4 metric cards de destaque (102 vídeos · 5 diárias · 6 cursos · R$ 2.950/vídeo), com o preço como informação complementar e discreta.

O escopo foi reescrito a partir de conversa real com o cliente (BoviChain) — formato entrevista, 6 cursos × 16 aulas + 1 teaser, cortes verticais para redes, teleprompter, sem trilha, gravação concentrada em junho/2026.

---

## Como rodar

```bash
cd apps/propostas/masterclass-bovichain
npm install          # primeira vez
npm run dev          # porta 3011
```

Abrir `http://localhost:3011`.

---

## O que foi construído (v2.1)

App Next.js 16 + App Router independente, sem Tailwind, sem shadcn. Tokens CSS `--bf-*`, Inter + JetBrains Mono, header global no topo + logo Bicofino (sem sidebar).

### Estrutura de arquivos

```
apps/propostas/masterclass-bovichain/
├── package.json                   Next.js 16.2.6, React 19, lucide-react, motion v12
├── next.config.ts                 turbopack.root apontando para raiz do monorepo
├── tsconfig.json
├── STATUS.md                      Este arquivo
└── src/
    ├── app/
    │   ├── globals.css            Tokens --bf-*, dark mode, cards
    │   ├── layout.tsx             Header global com logo + main
    │   └── page.tsx               Página completa — 6 seções
    └── components/
        ├── BicofinoLogo.tsx       SVG logo Bicofino
        ├── MetricsGrid.tsx        4 metric cards (números accent + texto explicativo + count-up)
        └── InvestmentCard.tsx     Card único R$ 300.900 (estático, compacto)
```

### Seções da página (v2.1 — nova ordem)

| # | ID | Conteúdo |
|---|---|---|
| 1 | `#hero` | Eyebrow + título "BoviClass" + lead enxuto + metadados |
| 2 | `#producao` | **Introdução** — Captação ("Como gravamos") + Incluso ("O que entra no pacote") lado a lado |
| 3 | `#volume` | Volume de entrega — `<MetricsGrid />` + parágrafo explicativo |
| 4 | `#investimento` | Investimento — `<InvestmentCard />` compacto |
| 5 | `#fora-do-escopo` | Apenas o bloco "Fora do escopo" |
| 6 | `#proximo-passo` | CTA email `hello@bicofino.com` |

> Bloco "Prazos" removido — info implícita no metadado do Hero "Janela: Junho de 2026".

### Os 4 metric cards (componente MetricsGrid v2.1)

| # | Número (accent napoli) | Label | Sub-label | Texto explicativo |
|---|---:|---|---|---|
| 1 | **102** | vídeos | 96 + 6 | "96 vídeos horizontais para os cursos e 6 cortes verticais para redes." |
| 2 | **5** | diárias | — | "Gravação concentrada em uma semana, em sequência em estúdio próprio." |
| 3 | **6** | cursos | 16 aulas + 1 teaser | "Cada curso reúne 16 aulas em formato entrevista mais 1 teaser para divulgação." |
| 4 | **2.950** | reais/vídeo | — | "Custo por peça finalizada — captação, edição e pós-produção completa." |

- **Números grandes em accent napoli** (`#77deff`) — JetBrains Mono `clamp(72-128px)`
- Texto explicativo Inter 14px / line-height 1.5 / cor secondary, separado por border-top sutil
- Cards de altura natural (não force 1:1), stretch no grid
- Grid 4col ≥1100px / 2×2 700-1100 / stack <700
- Sem underlines decorativas (removidas em v2.1)
- Count-up scroll-tied mantido nos números
- Sem hover decorativo (só border-color change)

### O pacote (componente InvestmentCard v2.1 — compacto + estático)

- **Total:** R$ 300.900 — exibido **estático** (sem count-up animado)
- **Cálculo:** R$ 300.900 ÷ 102 vídeos = R$ 2.950 exato por vídeo
- **Tamanhos reduzidos vs v2.0:**
  - Preço grande: `clamp(20px, 2.75vw, 32px)` (50% menor)
  - Prefixo "R$ ": `clamp(10px, 1.375vw, 16px)`
  - maxWidth: 520px (era 640)
  - Padding: 32px (era 40)
  - Título: 18px (era 22)
- **Features inclusas** (lista com checks em bullet napoli):
  - Captação em 5 diárias em estúdio próprio
  - Edição completa de 102 vídeos
  - Cortes verticais para redes incluídos
  - Motion, color grading, legendas e cartelas
  - Vinheta de abertura por curso (6 vinhetas)
  - Equipe de criação, atendimento e teleprompter
  - Alimentação da equipe
- **Footer:** "Valor já com honorários (15%) e impostos (14,25%)"
- Entrance scroll-tied + features stagger mantidos

### Escopo da produção (Q&A com cliente — fechado)

**Captação** (em `#producao`)
- Formato entrevista, conforme referência aprovada
- 1 entrevistado por episódio
- 5 diárias em estúdio próprio, em sequência
- Mesma cenografia e mesmo cenário para todos os episódios
- Teleprompter incluído
- Convidados chegam prontos para gravar
- Sem troca de figurino

**Incluso** (em `#producao`)
- Edição dos 102 vídeos finais
- Legendas
- Cartelas
- Seis vinhetas de abertura, uma por curso
- Motion graphics
- Color grading
- Edição de áudio da fala
- Equipe de criação, atendimento e produção
- Alimentação da equipe

**Fora do escopo** (em `#fora-do-escopo`)
- Roteiros
- Imagens de pesquisa (banco de imagens)
- Trilha sonora
- Hair & make dos entrevistados
- Locação externa

### Linguagem — "estúdio próprio" (não "Studio Bicofino")

Quando o texto descreve o **local de filmagem**, usar apenas "estúdio próprio" (não citar Bicofino). "Studio Bicofino" fica preservado apenas como **identificador institucional** (proponente, título do card de investimento, footer com endereço, SEO metadata).

### Motion (Framer Motion v12)

- **MetricsGrid**: entrance scroll-tied (opacity + y 24→0), count-up 1.4s nos números, easing `cubic-bezier(0.2, 0, 0, 1)`
- **InvestmentCard**: entrance scroll-tied (opacity + y 24→0), stagger 80ms nas features, easing `[0.2, 0, 0, 1]`. **Preço estático** — sem count-up.
- `prefers-reduced-motion` respeitado em ambos

### Identidade visual (paleta crema/caffè/nocciola/napoli)

- **Header global** com fundo branco puro — logo Bicofino + tag "Documento confidencial · BoviChain"
- **Fundo do site** = `--bf-crema` `#f3ebd4`
- **Textos** = `--bf-caffe` `#33111a`
- **Surface-subtle** = `--bf-nocciola` `#d8d7d3`
- **Accent** = `--bf-napoli` `#77deff` — usado em: números dos metric cards, outline do investment card, features box do investment card
- **Eyebrows** = `--bf-nocciola-deep` `#8e8378`

---

## Estado atual — o que está pronto (v2.1)

- [x] Refactor estrutural: 3 cards comparativos → 4 metric cards + 1 card de investimento único
- [x] MetricsGrid redesign: números em accent napoli, texto explicativo real (não underlines)
- [x] InvestmentCard compacto e estático (sem count-up, 50% menor)
- [x] Nova ordem de seções com #producao (intro) e #fora-do-escopo (fim)
- [x] Linguagem "estúdio próprio" (Bicofino removido do contexto de filmagem)
- [x] Copy edit completa (16 sugestões do brand voice review aplicadas)
- [x] Motion scroll-tied + count-up nos cards (Framer Motion v12)
- [x] Responsivo
- [x] Dark mode (herdado)
- [x] `prefers-reduced-motion` respeitado
- [x] tsc limpo (sem erros)
- [x] Hot-reload validado no dev server (3011)

---

## O que falta — próximas iterações

### Polimento (opcional)
- [ ] Lighthouse audit
- [ ] Verificar print stylesheet em Safari/Chrome
- [ ] Limpar `transform: none !important` órfão no `@media (prefers-reduced-motion)` do MetricsGrid (no-op atual)

### Diretrizes de design (aguarda cliente)
- [ ] Cliente pediu para enviar diretrizes em mensagem separada — ainda não chegaram

---

## Decisões fechadas (v2.x)

| Decisão | O que ficou |
|---|---|
| Modelo comercial | Pacote fechado único — sem comparação entre opções |
| Valor total | R$ 300.900 (= R$ 2.950 × 102 vídeos exato) |
| Apresentação | 4 metric cards de destaque + card de investimento **compacto** depois |
| Foco visual | Entregas (metric cards com accent napoli), não o preço |
| Escopo | 102 vídeos (96 horizontais + 6 cortes verticais) em 6 cursos |
| Formato | Entrevista, 1 entrevistado por episódio, mesma cenografia |
| Janela | Junho de 2026 |
| Trilha | Sem trilha — apenas edição da fala |
| Cortes verticais | Inclusos (1 teaser por curso = 6 cortes) |
| Teleprompter | Incluído |
| Hair & make / locação externa | NÃO incluídos |
| Accent napoli | Números do MetricsGrid + outline/features do InvestmentCard |
| Preço grande | JetBrains Mono, **estático** (sem count-up), 50% do tamanho anterior |
| Local de filmagem | "Estúdio próprio" (sem nominar Bicofino) |
| Estrutura | Hero → Produção (intro) → Volume (cards) → Investimento → Fora do escopo → CTA |

---

## Histórico de deploys

| Versão | Data | Deploy ID | Notas |
|---|---|---|---|
| v1.0 | 24/05/2026 | `dpl_CNxgGJWbLYXLa2EDGqvFg66WrUGB` | 3 opções (Oitorama/Epro/Bicofino) |
| v1.1 | 24/05/2026 | `dpl_DadK5yYiumn5g3danNhtpvWGS33J` | Paleta crema/caffè/nocciola/napoli, seção `#opcao-1` removida |
| v2.1 | 24/05/2026 | `dpl_9igW1grDYMpFsyN14v797Sdz1YoS` | Pacote único + metric cards accent + estrutura reorganizada. Alias https://masterclass-bovichain.vercel.app re-aliased. |

---

## Como retomar em novo chat

1. Abrir novo chat no diretório `/Users/woneymalian/Desktop/Bicofino-ecossistema`
2. Dizer: *"Retomando o projeto BoviChain BoviClass — leia `apps/propostas/masterclass-bovichain/STATUS.md`"*
3. Rodar o servidor: `cd apps/propostas/masterclass-bovichain && npm run dev`
4. Abrir `http://localhost:3011`

**Branch:** `experiment/video-hero`
**Produção:** https://masterclass-bovichain.vercel.app
