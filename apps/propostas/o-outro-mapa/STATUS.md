# STATUS — O Outro Mapa

**Data:** 23 de maio de 2026 (atualizado: responsividade tablet/mobile + CTA email)  
**Branch:** experiment/video-hero  
**App:** `apps/propostas/o-outro-mapa/`  
**Porta de dev:** `3003` (definida no package.json) — se ocupada, usar `npx next dev -p 3010`

---

## Como rodar

```bash
cd apps/propostas/o-outro-mapa
npm run dev          # porta 3003
# ou, se 3003 estiver ocupada:
npx next dev -p 3010
```

Sempre checar porta com `lsof -i :3003` antes.

---

## O que foi construído

App Next.js 16 + App Router completamente independente. Sem Tailwind, sem shadcn, sem dependências do docs-site. Estética Bicofino (mesmos tokens CSS, mesmas fontes Inter + JetBrains Mono).

### Estrutura de arquivos

```
apps/propostas/o-outro-mapa/
├── package.json                  Next.js 16.2.6, React 19, lucide-react
├── next.config.ts                turbopack.root apontando para raiz do monorepo
├── tsconfig.json
├── SOURCES.md                    Tabela de fontes dos dados da proposta
├── STATUS.md                     Este arquivo
└── src/
    ├── app/
    │   ├── globals.css           Tokens --bf-*, dark mode, reset, print, hover do mapa
    │   ├── layout.tsx            Layout raiz: sidebar fixa + main scroll, script anti-FOUC
    │   └── page.tsx              Página completa — 10 seções em long-scroll
    └── components/
        ├── BicofinoLogo.tsx      SVG logo Bicofino (copiado do docs-site, width configurável)
        ├── Sidebar.tsx           Sidebar + MobileTopbar (IntersectionObserver, drawer mobile)
        ├── ProposalHero.tsx      Seção 1 — hero com eyebrow, título 80px, subtítulo, lead
        ├── TeseBlock.tsx         Seção 2 — parágrafos + citação com borda accent
        ├── MapaBrasil.tsx        Seção 3 — SVG real (brazil-states.svg), 27 estados, 3 grupos editoriais
        ├── MapaBrasilEstados.tsx (legado — polígonos aproximados, substituído)
        ├── DataCard.tsx          Seção 4 — número grande + frase + fonte
        ├── TierCard.tsx          Seção 5 — tier com estados, descrição, valor, total
        ├── EntregavelGrid.tsx    Seção 7 — grid flex-wrap de blocos de entregáveis
        ├── InvestimentoTable.tsx Seção 6/9 — tabela de valores hardcoded
        ├── CronogramaTable.tsx   Seção 9 — tabela de marcos hardcoded
        └── ProposalFooter.tsx    Footer — versão, data, disclaimer
```

### As 10 seções da página (IDs âncora)

| ID | Seção | Componente principal |
|---|---|---|
| `#hero` | O Outro Mapa | `ProposalHero` |
| `#tese` | A Tese | `TeseBlock` |
| `#mapa` | O Mapa | `MapaBrasilEstados` (SVG) |
| `#contexto` | Contexto de Mercado | 4× `DataCard` |
| `#tiers` | Os Tiers | 3× `TierCard` |
| `#pacote` | Pacote em Números | `InvestimentoTable` |
| `#entregaveis` | Entregáveis | `EntregavelGrid` |
| `#garantias` | Garantias Bicofino | texto puro |
| `#investimento` | Investimento & Cronograma | `InvestimentoTable` + `CronogramaTable` |
| `#proximo-passo` | Próximo Passo | texto + email |

### Mapa SVG — MapaBrasil.tsx (componente atual)

**Fonte da geometria:** `public/maps/brazil-states.svg` (SimpleMaps, licença comercial livre)  
**ViewBox:** `0 0 1000 912` — 27 estados, caminhos reais extraídos por ID `BRXX`

Grupos e paleta editorial (Bloomberg / FT aesthetic):

| Grupo | Estados | Cor | Opacity base | Opacity hover |
|---|---|---|---|---|
| `ACTIVE_PACKAGE` | GO, BA, PE, CE, PA, PR, SC, MT, MS, ES, DF, AM, RN, AL | `#C4AA88` (champagne) | 0.85 | 1.0 |
| `EXPANSION_FUTURE` | MA, PI, TO, RO, AC, AP, RR, SE, PB | `#BFC3C7` (platinum) | 0.55 | 0.80 |
| `BIG4` | SP, RJ, MG, RS | `#3D4045` (graphite) | 0.72 | 0.90 |

Interação: hover por `useState` — transição `opacity 180ms ease-out`, tooltip inline com nome do estado + grupo. Sem CSS global, sem hydration mismatch.

---

## Estado atual — o que está pronto

- [x] App scaffolded e rodando sem erros de TypeScript
- [x] Zero erros de hydration (corrigido: `<title>` SVG → `aria-label`, `<style>` SVG → globals.css)
- [x] Sidebar com IntersectionObserver (active state por scroll) e drawer mobile
- [x] Dark mode (script anti-FOUC no layout, tokens dark em globals.css)
- [x] Responsivo: sidebar some em mobile, drawer abre pelo hamburger
- [x] Print stylesheet: sidebar oculta, cores revertem para preto/branco
- [x] `<meta robots noindex,nofollow>` no metadata do layout
- [x] Toda a copy do briefing v1.1 implementada fielmente
- [x] `SOURCES.md` com tabela de 11 fontes e TODO de validação
- [x] **Logo Bicofino SVG** na sidebar (componente `BicofinoLogo`, width=100, cor dinâmica via token)
- [x] **Sidebar verdadeiramente fixa** — layout pattern idêntico ao docs-site: `body { display: flex; height: 100dvh; overflow: hidden }`, só o `<main>` faz scroll
- [x] **Scroll suave nos links** — `onClick` com `e.preventDefault()` + `scrollIntoView({ behavior: 'smooth' })` no scroll container correto (`<main>`), respeita `prefers-reduced-motion`
- [x] **Menu hamburger mobile** com mesmo comportamento do docs-site (drawer + overlay, `position: fixed`)
- [x] **Mapa SVG real** — `MapaBrasil.tsx` usa `public/maps/brazil-states.svg` (geometria oficial SimpleMaps), 27 estados renderizados por ID `BRXX`, paleta editorial champagne/platinum/graphite, hover + tooltip React
- [x] **Apresentado ao cliente** — v1 entregue em 22/05/2026
- [x] **Deploy v1.1 (preview)** — 23/05/2026 — `https://o-outro-mapa-r9oxshmvy-woney-malians-projects.vercel.app`
- [x] **TierCard responsivo** — colapsa para 1 coluna abaixo de 960px (resolve textos com 1-2 palavras por linha em tablet)
- [x] **Seção O Mapa responsiva** — texto + SVG empilham abaixo de 1024px; mapa não desaparece mais em mobile/tablet (max-width 560px, centralizado)
- [x] **CTA final** — email atualizado para `hello@bicofino.com`

---

## O que falta — próximas iterações (pós-apresentação)

### Visual (aguarda feedback do cliente)

- [ ] Paleta do mapa pode ser ajustada por feedback
- [ ] Accent color da proposta — atualmente `#BFA37A` (Bicofino gold). Pode virar outra cor temática
- [ ] Espaçamento do hero — padding `80px 72px` pode precisar de ajuste
- [ ] Tipografia do título — atualmente 80px Inter 700
- [ ] Layout do mapa — proporção coluna texto / SVG no desktop
- [ ] DataCards — flex-wrap atual vs grid 2×2 fixo vs linha de 4

### Funcional
- [x] ~~Testar responsividade em mobile (375px) e tablet (768px)~~ — verificado e ajustado em 23/05/2026 (TierCard + seção O Mapa)
- [ ] Verificar print stylesheet em Safari/Chrome
- [ ] Lighthouse audit (target 95+ desktop)
- [ ] Adicionar entrada no `package.json` raiz para rodar com `npm run proposta` ou similar

### Conteúdo (aguarda validação de Woney)
- [ ] Dados do briefing (públicos médios, audiências de finais, seguidores) — confirmar com federações antes de apresentar ao anunciante
- [ ] Decidir framing do "73 milhões" (alcance qualificado vs soma de habitantes 57,7 mi)
- [ ] Decidir se margem Bicofino (R$ 3-5 mi) aparece na tabela ou só o total final

---

## Briefing de referência

`apps/propostas/maio-2026-patrocinio-federacoes/BRIEFING_MESTRE_O_OUTRO_MAPA.md`

O briefing v1.1 está implementado integralmente. Seção 5.4 do briefing diz explicitamente que as decisões visuais finais serão passadas por Woney pelo terminal.

---

## Tokens CSS disponíveis (globals.css)

```css
--current-accent:    #BFA37A    /* dourado Bicofino — pode ser alterado */
--bf-bg-page:        #f2f8ff    /* fundo geral (light) */
--bf-surface:        #ffffff
--bf-text-primary:   #2a2c2b
--bf-text-secondary: #6d7886
--bf-text-subtle:    #a8c9e5
--bf-border:         rgba(42,44,43,0.08)
--bf-border-strong:  rgba(42,44,43,0.16)
```

---

## Como retomar em novo chat

1. Abrir novo chat com Claude Code no diretório `/Users/woneymalian/Desktop/Bicofino-ecossistema`
2. Dizer: *"Retomando o projeto O Outro Mapa — leia `apps/propostas/o-outro-mapa/STATUS.md`"*
3. Rodar o servidor: `cd apps/propostas/o-outro-mapa && npx next dev -p 3010`
4. Abrir `http://localhost:3010` e passar os ajustes visuais (screenshots anotadas em magenta)
