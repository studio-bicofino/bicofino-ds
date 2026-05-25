# STATUS — BoviClass (Masterclass Agro / BoviChain)

**Data:** 24 de maio de 2026 (v1.1 — paleta crema/caffè/nocciola/napoli em produção)
**Branch:** experiment/video-hero
**App:** `apps/propostas/masterclass-bovichain/`
**Porta de dev:** `3011` (definida no package.json)
**Cliente:** BoviChain
**Proponente:** Studio Bicofino

---

## Contexto

Orçamento profissional do Studio Bicofino para a campanha **BoviClass** (renomeada a partir de "Masterclass Agro" a pedido do cliente). O documento apresenta três cenários de produção com o mesmo escopo de captação/edição, variando apenas o estúdio de gravação:

- **Oitorama** — R$ 195.000,00 (estúdio parceiro)
- **Epro** — R$ 235.000,00 (locação externa)
- **Studio Bicofino** — R$ 278.250,73 (recomendada, estúdio próprio)

O orçamento foi reconstruído a partir do template original "Suba" (que vazou no email do cliente). Removidas todas as menções à Suba e a "decupagem", e adaptado para identidade Studio Bicofino.

---

## Como rodar

```bash
cd apps/propostas/masterclass-bovichain
npm install          # primeira vez
npm run dev          # porta 3011
```

Abrir `http://localhost:3011`.

---

## O que foi construído

App Next.js 16 + App Router independente, sem Tailwind, sem shadcn. Mesma estética do `o-outro-mapa` (tokens CSS `--bf-*`, Inter + JetBrains Mono), porém **sem sidebar** — logo Bicofino fica num header global no topo.

### Estrutura de arquivos

```
apps/propostas/masterclass-bovichain/
├── package.json                  Next.js 16.2.6, React 19, lucide-react, motion v12
├── next.config.ts                turbopack.root apontando para raiz do monorepo
├── tsconfig.json
├── STATUS.md                     Este arquivo
└── src/
    ├── app/
    │   ├── globals.css           Tokens --bf-*, --bf-sep, dark mode, tabela orçamento, cards de preço
    │   ├── layout.tsx            Header global com logo (fundo branco) + main (sem sidebar)
    │   └── page.tsx              Página completa — 5 seções
    └── components/
        ├── BicofinoLogo.tsx      SVG logo Bicofino (mesmo do o-outro-mapa)
        └── PricingCards.tsx      'use client' — cards das 3 opções com motion scroll-tied + count-up
```

### Seções da página

| ID | Seção | Conteúdo |
|---|---|---|
| `#hero` | Hero | Eyebrow + título "BoviClass" + subtitle + lead + metadados (Cliente / Proponente / Campanha / Janela) |
| `#opcoes` | Três cenários | 3 cards comparativos (Oitorama → Epro → Studio Bicofino) com count-up + scroll-tied entrance |
| `#escopo` | Escopo | 4 blocos: Captação, Incluso, Prazos, Não incluso |
| `#proximo-passo` | Próximo passo | CTA email `hello@bicofino.com` |

> v1.1 removeu a seção `#opcao-1` (Composição detalhada do orçamento) a pedido do cliente.
> O cálculo do total do Studio Bicofino (R$ 278.250,73) virou constante hardcoded em `page.tsx`.

### Cálculo do orçamento — Opção 1 (Studio Bicofino)

| Item | Valor Total | Honorários (15%) | Impostos (14,25%) | Valor Final |
|---|---:|---:|---:|---:|
| CAPTAÇÃO E EDIÇÃO (5 diárias) | R$ 150.000,00 | R$ 22.500,00 | R$ 28.666,18 | R$ 201.166,18 |
| EQUIPE (Criação e Atendimento) | R$ 25.000,00 | R$ 0,00 | R$ 4.154,52 | R$ 29.154,52 |
| ALIMENTAÇÃO EQUIPE | R$ 14.000,00 | R$ 2.100,00 | R$ 2.675,51 | R$ 18.775,51 |
| ESTÚDIO (5×R$5.000) | R$ 25.000,00 | R$ 0,00 | R$ 4.154,52 | R$ 29.154,52 |
| **Valor da produção** | | | | **R$ 278.250,73** |

**Fórmula:** Honorários aplicados apenas em CAPTAÇÃO e ALIMENTAÇÃO. Imposto via gross-up:
`Valor Final = (Valor Total + Honorários) / (1 − 0,1425)`.

A alíquota é **14,25%** (não 14,2% como o header da tabela original Suba indicava). O valor total bate exatamente em R$ 278.250,73 com essa alíquota.

Opções 2 e 3 mostram apenas o headline total — sem decupar item-a-item, conforme combinado com Fabio.

### Motion (Framer Motion v12)

- **Cards** entram com `useScroll` + `useTransform` por card (opacity 0→1, y 40→0) entre offset `start 0.9` e `start 0.45`. Animação **scrub-tied ao scroll** — não dispara e termina sozinha.
- **Preço** faz count-up de 0 até o valor final em 1.4s (easing cubic-bezier 0.2,0,0,1) quando o card cruza 85% da viewport.
- **Features** entram em cascata por card (stagger 80ms) com slide horizontal -10→0.
- Respeita `prefers-reduced-motion` — neutraliza todas as transforms.

### Identidade visual (v1.1 — paleta nova)

- **Header global** com fundo **branco puro** (`#ffffff`) — logo Bicofino + tag "Documento confidencial · BoviChain"
- **Fundo do site** = `--bf-crema` `#f3ebd4` (cream amarelado quente)
- **Textos/escuros** = `--bf-caffe` `#33111a` (marrom muito escuro, quase preto)
- **Destaques (surface-subtle)** = `--bf-nocciola` `#d8d7d3` (cinza-bege claro)
- **Accent** = `--bf-napoli` `#77deff` (azul claro) — **restrito** ao card recomendado (outline + features box)
- **Eyebrows** = `--bf-nocciola-deep` `#8e8378` (nocciola escurecido pra legibilidade sobre crema)
- Card recomendado (Studio Bicofino):
  - Superfície branca
  - Outline napoli 1.5px
  - Eyebrow nocciola-deep (igual aos outros) — "Opção 3 · Recomendada"
  - Features box napoli sólido com texto caffè e checks caffè com tick branco
- Cards não-recomendados (Oitorama, Epro):
  - Features box nocciola sólido (`#d8d7d3`)
  - Eyebrow nocciola-deep — "Opção 1" / "Opção 2"
- Preço grande em **JetBrains Mono** (todos os 3 cards)

---

## Estado atual — o que está pronto

- [x] App scaffolded e rodando em `localhost:3011`
- [x] Header global com logo Bicofino (fundo branco), sem sidebar
- [x] Hero com título "BoviClass" e metadados do projeto
- [x] 3 cards comparativos na ordem Oitorama → Epro → Studio Bicofino
- [x] Card recomendado com identidade verde bf SEP (outline + features box)
- [x] Tabela detalhada do orçamento com cálculo 14,25% batendo exato em R$ 278.250,73
- [x] Blocos de escopo (Captação, Incluso, Prazos, Não incluso) — sem "Suba", sem "decupagem"
- [x] CTA final com email `hello@bicofino.com`
- [x] Motion scroll-tied nos cards (Framer Motion v12)
- [x] Count-up nos preços
- [x] Stagger nas features
- [x] Responsivo (cards stackam abaixo de 900px, tabela com scroll horizontal)
- [x] Dark mode (herdado do globals.css)
- [x] Print stylesheet
- [x] `<meta robots noindex,nofollow>`
- [x] **Deploy v1.0** — 24/05/2026 — `dpl_CNxgGJWbLYXLa2EDGqvFg66WrUGB`
  - Alias estável: `https://masterclass-bovichain.vercel.app`
  - URL único do deploy: `https://masterclass-bovichain-1sxhnze6c-woney-malians-projects.vercel.app`
  - Time: `woney-malians-projects` (deployment protection ativa — acesso pelo navegador logado)
- [x] **Deploy v1.1** — 24/05/2026 — `dpl_DadK5yYiumn5g3danNhtpvWGS33J`
  - Alias estável: `https://masterclass-bovichain.vercel.app` (re-aliased)
  - URL único do deploy: `https://masterclass-bovichain-mxgpgkemg-woney-malians-projects.vercel.app`
  - Mudanças: paleta crema/caffè/nocciola/napoli, eyebrows renomeados ("Opção 1/2/3 · Recomendada"), seção `#opcao-1` (tabela) removida

---

## O que falta — próximas iterações

### Diretrizes de design (aguarda Woney)
- [ ] Cliente pediu para enviar diretrizes de design em mensagem separada — ainda não chegaram. Quando chegarem, refinar tipografia/espaçamentos/cores.

### Visual
- [ ] Lighthouse audit
- [ ] Verificar print stylesheet em Safari/Chrome
- [ ] Confirmar com Fabio se "descrições por estúdio" (texto curto sob cada nome) estão alinhadas

### Conteúdo
- [ ] Confirmar com cliente se os entregáveis listados em "Incluso" estão completos
- [ ] Validar lista de "Não incluso" — atualmente: roteiros, imagens de pesquisa, trilha sonora
- [ ] Validar versão (v1.0 — maio de 2026) no footer

---

## Decisões fechadas

| Decisão | O que ficou |
|---|---|
| Nome da campanha | **BoviClass** (não mais "Masterclass Agro") |
| Sidebar | **Sem sidebar** — só header global com logo no topo |
| Alíquota de imposto | **14,25%** via gross-up (estava como 14,2% no header original Suba mas batia 14,25%) |
| Honorários | **15%** aplicado só em CAPTAÇÃO e ALIMENTAÇÃO |
| Decupagem por opção | **Só Opção 1 detalhada** — Epro/Oitorama mostram só total |
| Ordem dos cards | **Oitorama → Epro → Bicofino** — termina na recomendada |
| Accent | **bf SEP `#2fd298`** (verde) em todo o documento |
| Card recomendado | Superfície branca + outline verde + features box verde com letras brancas |
| Preço grande | **JetBrains Mono** |
| Motion | Scroll-tied (`useScroll` por card) + count-up + stagger |

---

## Tokens CSS disponíveis (globals.css — v1.1)

```css
/* Paleta nomeada */
--bf-crema:         #f3ebd4    /* fundo do site */
--bf-caffe:         #33111a    /* textos e escuros */
--bf-nocciola:      #d8d7d3    /* destaques / surface-subtle */
--bf-nocciola-deep: #8e8378    /* eyebrows legíveis sobre crema */
--bf-napoli:        #77deff    /* accent — só no card recomendado */
--bf-white:         #ffffff

/* Tokens semânticos */
--bf-sep:            #77deff
--current-accent:    #77deff
--bf-bg-page:        #f3ebd4
--bf-surface:        #ffffff
--bf-surface-subtle: #d8d7d3
--bf-text-primary:   #33111a
--bf-text-secondary: rgba(51,17,26,0.62)
--bf-text-subtle:    rgba(51,17,26,0.42)
--bf-border:         rgba(51,17,26,0.10)
--bf-border-strong:  rgba(51,17,26,0.20)
```

---

## Como retomar em novo chat

1. Abrir novo chat no diretório `/Users/woneymalian/Desktop/Bicofino-ecossistema`
2. Dizer: *"Retomando o projeto BoviChain BoviClass — leia `apps/propostas/masterclass-bovichain/STATUS.md`"*
3. Rodar o servidor: `cd apps/propostas/masterclass-bovichain && npm run dev`
4. Abrir `http://localhost:3011`
