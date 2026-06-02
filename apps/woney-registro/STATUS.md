# STATUS — Registro de Impacto

> Handoff para continuar em outro chat. Última atualização: 2026-06-01.
> App em `apps/woney-registro/`. Dashboard interno que mostra, em horas e reais,
> o valor que os sistemas do Woney (designer + dev com Claude Code) devolvem ao Studio Bicofino.

## Como rodar / validar

```bash
cd apps/woney-registro
npm install
npm run dev      # http://localhost:3041  (ou `npm run registro` na raiz)
npm test         # 13 testes do calc.ts — todos passando
npx tsc --noEmit # typecheck limpo
npm run build    # build de produção ok (7 rotas)
```

## Decisões travadas (com o Woney)

1. **CSS puro + tokens do DS** (não Tailwind) — coerência com web/docs-site/casa-nostra.
2. **Seed-first** — dados reais em `src/lib/seed.ts`; sem Supabase ainda. Sem auth.
3. **Premissa de cálculo:** vídeo/story sem sistema = **90 min** (não 60). Atualizado no seed.
4. **Gotham self-hosted** — copiada do docs-site para `public/fonts/` (Black/Bold/Book/Light).
   `--bf-font-impact` + `.bf-impact` no globals.css. Usada só no título (M-02).
5. **Sistema de accent curado (3 variáveis)** — `AccentRandomizer.tsx` sorteia entre 7 cores:
   spfc, sep, niederland, como, venezia (usáveis como texto E fundo) + australia, napoli
   (**só fundo, texto preto por cima**, nunca como texto sobre fundo claro). O randomizer seta:
   `--current-accent` (cor), `--current-accent-on` (preto/branco sobre o fundo accent) e
   `--current-accent-ink` (accent como texto; cai p/ preto quando a cor é clara demais).
   Card "Economia até hoje" usa accent como **fundo** (não mais o recorrente — invertido).
6. **Motion** — `AnimatedNumber.tsx` faz count-up (ease-out cúbico, 750ms, gated por
   reduced-motion). Reveals escalonados via `.bf-reveal` + animationDelay (cards 0/65/130ms,
   frases index*60ms). Auditado pelo motion-curator: sem violações.

## Modelo de cálculo (lib/calc.ts — puro, testado)

Espelha o bloco 5 do `PROMPT_MASTER_Registro_de_Impacto.md`. Números atuais do seed:

| Métrica | Valor |
|---|---|
| custo/hora | R$ 106,25 (17000/160) |
| Economia até hoje (realizado) | **R$ 13.175** (R$ 425 peças + R$ 12.750 site) |
| Líquido recorrente/ano | **R$ 61.712** |
| Líquido recorrente/mês | R$ 5.143 = eficiência 1.169 + dev 4.500 − Claude 526 |
| Claude Max se paga | **10,8×**/mês (custa US$ 100 ≈ R$ 526) |
| Story | 20 min em vez de 1h30 · Proposta 40 min em vez de 1h30 |

> **Correções 2026-06-01:** vaga de dev júnior = **R$ 4.500/mês** (era 9.000 carregado no card;
> `custoFixoEvitado` já era 4.500, recorrente não mudou). Propostas: tempo antes **90 min** (era 180).
> Removida a proposta "Patrocínio federações" (era duplicata do O Outro Mapa) → propostas viraram
> **2 usos**, o que baixou peças (R$ 425) e realizado (R$ 13.175). Recorrente não muda (usa a taxa
> `propostas_mes`, não a contagem histórica). Título: accent agora em **sistemas** (não "desenvolvidos").

## Motion (2026-06-01)

`Reveal.tsx` (`useReveal` + `<Reveal>`) — scroll-reveal via IntersectionObserver, dispara uma vez,
fade+translateY(12px), `--dur-reveal: 280ms` ease-out, stagger `index*60ms`. Reduced-motion mostra
na hora; `@media print` força `opacity:1` (PDF do fechamento seguro). Aplicado em cards, títulos e
blocos das 5 telas (acima da dobra segue `.bf-reveal` de load). Auditado pelo motion-curator: PASS.

Seed (`src/lib/seed.ts`): 4 sistemas (template stories `eficiencia`, propostas `eficiencia`,
Design System `infraestrutura`, site v1 `projeto`) + 5 usos (todos em maio/2026).

## Telas (todas prontas, seed-first)

- `/` Painel — título heavy/light, faixa de 3 números, decomposição, galeria viva, frases p/ copiar
- `/sistemas` — Eficiência (OpEx) · Infraestrutura (CapEx) · Projetos, com payback honesto
- `/galeria` — grade filtrável por mês + sistema
- `/registrar` — captura 3 campos + drag de imagem (confirma local; persiste no Supabase depois)
- `/fechamento` — resumo do mês → exporta PDF (`window.print`)

## Histórico de ajustes visuais (rodadas de feedback em magenta)

- Nav: marca vetorial `BicofinoDiamond` (não o ✦ glyph) + "// Woney Malian"
- Título: **ECONOMIA** (Gotham Black) + **com sistemas** (Inter Light) — bloco M-02
- Eyebrow do hero: **removido**
- Cards: ordem Economia → Recorrente(accent fill) → Claude Max. Card do meio = **fundo accent**,
  texto branco. Economia em preto (não accent). Claude Max: eyebrow "Claude Max se paga" (sem "O").
- Eyebrows dos cards brancos e textos da caixa de decomposição em **bf-black**
- Decomposição: "Programador júnior", "Claude Max", "Ganho líquido recorrente" (accent);
  **dividida em dois boxes** (equação | "9,3h economizadas · pagamento Woney R$ 17.000")
- Meses derivam só das peças (some Fevereiro/Abril) — tudo em Maio
- Nav invertido: **Woney Malian** (Inter bold) + estrela + "// Registro de Impacto" (eyebrow)
- Título: contracanto "com sistemas **desenvolvidos**" (última palavra em accent-ink)
- Cards invertidos: **Economia** (R$ 13.742) com fundo accent; Recorrente (R$ 65.537) branco
- Seção "Frases para fechamento" → **"Eficiência em números"**: bento com o número em
  destaque (accent-ink) + frase de suporte + copiar. Dados via `phrases.ts` (`destaque`)

## Responsivo (2026-06-01)

App nasceu **sem breakpoints** (só `prefers-reduced-motion` e `print`). Adicionado em `globals.css`:
- `.bento` (12 col) empilha em 1 coluna **≤900px** (`grid-column: 1/-1 !important` p/ vencer os spans inline; `min-width:0`).
- `Nav` colapsa **≤720px**: marca em cima, links viram fileira rolável (`.nav-links`), tag mono some (`.nav-tag`). Classes `nav-inner/nav-links/nav-tag` adicionadas no `Nav.tsx`.
- `.shell` reduz folga lateral p/ `--sp-4` **≤480px**.
- Demais grades (`galeria`, `fechamento`, frases) já eram `auto-fill/minmax` → ok.

## Galeria & previews (2026-06-01)

- **Vídeos reais ligados** — 2 MP4 do `card-jogos-motion` copiados pra `public/pecas/`
  (`julio-brasileiro-s17-01jun.mp4`, `guilherme-brasileiro-s17-30maio.mp4`). `PecaMedia.tsx`
  toca no hover (mudo/loop), gated por reduced-motion, com badge Play. `Uso` ganhou
  `video_url` e `link`.
- **Screenshots em produção** — 4 PNGs reais em `public/pecas/`: `site-bicofino.png`,
  `design-system.png`, `proposta-o-outro-mapa.png`, `proposta-boviclass.png`. `PecaMedia` usa
  `<img onError>` → quem não tem PNG (patrocínio federações) cai no placeholder `// sem preview`.
- **Showcases na galeria** — DS (infra) e Site (projeto) entram como peças; não criam mês no
  seletor (`mesesDisponiveis` filtra só eficiência) nem afetam o cálculo. Pill do card varia por
  tipo: eficiência=tempo, projeto=dias, infra="ativo permanente".
- **Propostas reconciliadas com `apps/propostas`** — os 3 usos viraram os artefatos reais:
  O Outro Mapa, BoviClass (masterclass-bovichain) e Patrocínio federações (só briefing, sem preview).
- **Links "ver ao vivo" ligados** — Site `bicofino.com` · DS `bicofino-ds-umber.vercel.app` ·
  O Outro Mapa (Vercel) · BoviClass `masterclass-bovichain.vercel.app`.

## Aberto / próximos passos

- [ ] Preview da proposta **Patrocínio federações** quando ela sair do briefing (hoje placeholder).
- [ ] **Supabase** — migration pronta em `supabase/migrations/0001_init.sql`, env em
      `.env.local.example`. Ao conectar, só `src/lib/data.ts` troca de fonte; `calc.ts` e telas não mudam.
      Conta da empresa (woney@bicofino.com). Sem auth por ora.
- [ ] **Deploy Vercel** — projeto novo na org studio-bicofino.
- [ ] Confirmar com o Woney se o rodapé deve mostrar **só** "pagamento Woney" ou também "capital de infra".
- [ ] Revisar `/sistemas`, `/galeria`, `/fechamento` com o mesmo rigor visual do Painel
      (o feedback em magenta até agora focou no Painel).

## Arquitetura de arquivos

```
src/
  app/{page,sistemas,galeria,registrar,fechamento}/  ← telas (App Router)
  app/globals.css                                    ← tokens DS + @font-face Gotham + M-05 Bento
  components/{Nav,BigStat(inline),BicofinoDiamond,MonthSelector,PecaCard,CopyPhrase,PrintButton,AccentRandomizer}
  lib/{types,seed,calc,calc.test,data,phrases,format}.ts
```

Fonte do briefing: `PROMPT_MASTER_Registro_de_Impacto.md` (raiz do app).
Memória persistente: `project-registro-impacto` no MEMORY.md do Claude.
