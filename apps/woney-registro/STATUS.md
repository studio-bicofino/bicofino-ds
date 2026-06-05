# STATUS — Registro de Impacto

> Handoff para continuar em outro chat. Última atualização: 2026-06-05.
> App em `apps/woney-registro/`. Dashboard interno que mostra, em horas e reais,
> o valor que os sistemas do Woney (designer + dev com Claude Code) devolvem ao Studio Bicofino.

## ⏩ Onde paramos (2026-06-05) — ler primeiro

**+2 stories de jogos (2026-06-05)** — 2 motions reais do `card-jogos-motion` adicionados como
usos do Template: **Jean — Paulista (06/jun)** e **Cialone — Paulista (07/jun)**. MP4 copiados
p/ `public/pecas/` (`jean-paulista-s17-06jun.mp4`, `cialone-paulista-s14-07jun.mp4`), usos
`uso-9`/`uso-10` no seed. Template subiu de **6 → 8 usos**. Reflexo no realizado (a recorrência
NÃO muda — usa `stories_mes`, não a contagem): peças **R$ 920,83 → R$ 1.168,75**, realizado
**R$ 13.671 → R$ 13.919**. Testes do `calc.ts` atualizados (13/13 ok) + tsc limpo. Contexto: o
Woney automatizou mais um passo do pipeline de vídeo — Claude agora puxa as fotos direto do
Drive do Atleta, abre no Photoshop, recorta/trata e devolve no Drive certo (≈15 min/vídeo a
menos). Ver memória `image-pipeline`.

---

Rodadas anteriores (2026-06-03), ambas **no ar** em produção
(`https://woney-registro.vercel.app`), branch `feat/woney-registro`, commit **`c4b07d3`**:

1. **Drive do Atleta** (commit `c968c97`) — novo sistema **`infraestrutura`** (`sis-drive-atleta`,
   7h de build = capital), showcase na galeria com thumbnail `/pecas/drive-atleta.png` + link
   `drive-atleta.vercel.app`, e uma **frase do Connector** com a projeção de catalogação
   (15× mais rápido · ~1,7h/mês a 100 fotos/semana). Inputs em `settings`
   (`drive_fotos_semana/seg_antes/seg_depois`). **Decisão:** entrou como infra (não "projeto")
   porque era o único tipo que renderiza limpo sem inventar "dias de build". A projeção fica
   **fora** do headline recorrente do topo — fold no `calc` é trivial se o Woney quiser somar lá.
2. **+4 stories de jogos** (commit `c4b07d3`) — 4 motions reais do `card-jogos-motion` como usos do
   Template de stories (Gui Brasileirão 04/jun, Gui Paulista 06/jun, Júlio Paulista 06/jun,
   Ronaldo Copa Rio 07/jun). Template subiu de **2 → 6 usos** → agora **PAGO**.

**Fluxo de edição usado (importante):** o source do woney-registro **só existe na branch
`feat/woney-registro`** (não está na `main` nem na `feat/drive-atleta`). Trabalhei via
**git worktree isolado** (`git worktree add ../woney-registro-edit feat/woney-registro`),
reaproveitando o `node_modules` da árvore principal por symlink (basta p/ vitest+tsc; o Turbopack
recusa symlink p/ fora da raiz, então p/ `next build` local copie o `node_modules`).
Deploy: copiar `.vercel/project.json` pro worktree e `vercel --prod --yes`.

**Pendências de jogos (memória `jogos-semana-junho`):** falta o **Júlio 09/jun**.

## Produção & Git (handoff)

- **Produção:** https://woney-registro.vercel.app — projeto Vercel `woney-registro`, team
  `studio-bicofinos-projects` (org da empresa). `.vercel/` é gitignored.
- **Branch:** `feat/woney-registro` (a partir da `main`), commit `56688a1`, empurrada pros 2 remotes
  (WoneyMalian + studio-bicofino). **PR pendente** se quiser merge na `main`.
- **Não commitado de propósito:** `package-lock.json` da raiz tinha alteração gigante alheia a esta
  frente — deixado fora. Só `package.json` (script `registro`) + `apps/woney-registro/**` entraram.
- **Redeploy:** `cd apps/woney-registro && vercel deploy --prod --yes --scope studio-bicofinos-projects`.

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

| Métrica | Valor (atualizado 2026-06-03) |
|---|---|
| custo/hora | R$ 106,25 (17000/160) |
| Economia até hoje (realizado) | **R$ 13.919** (R$ 1.169 peças + R$ 12.750 site) |
| Peças (eficiência) | R$ 1.168,75 = 8 stories (9,33h) + 2 propostas (1,67h) |
| Capital de infraestrutura | R$ 17.744 (DS 160h + Drive do Atleta 7h) |
| Líquido recorrente/ano | **R$ 61.712** (inalterado — usa volume mensal, não contagem de usos) |
| Líquido recorrente/mês | R$ 5.143 = eficiência 1.169 + dev 4.500 − Claude 526 |
| Claude Max se paga | **10,8×**/mês (custa US$ 100 ≈ R$ 526) |
| Story | 20 min em vez de 1h30 (template **pago**: 8 usos ≥ payback 4) · Proposta 40 min em vez de 1h30 |

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

Seed (`src/lib/seed.ts`): **5 sistemas** (template stories `eficiencia`, propostas `eficiencia`,
Design System `infraestrutura`, site v1 `projeto`, **Drive do Atleta `infraestrutura`**) +
**13 usos** (8 stories até jun, 2 propostas, 2 showcases infra/projeto, 1 showcase Drive).

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
  `<img onError>` → fallback pro placeholder `// sem preview` se algum PNG faltar.
- **Showcases na galeria** — DS (infra) e Site (projeto) entram como peças; não criam mês no
  seletor (`mesesDisponiveis` filtra só eficiência) nem afetam o cálculo. Pill do card varia por
  tipo: eficiência=tempo, projeto=dias, infra="ativo permanente".
- **Propostas reconciliadas com `apps/propostas`** — 2 usos reais:
  O Outro Mapa e BoviClass (masterclass-bovichain).
- **Links "ver ao vivo" ligados** — Site `bicofino.com` · DS `bicofino-ds-umber.vercel.app` ·
  O Outro Mapa (Vercel) · BoviClass `masterclass-bovichain.vercel.app`.

## Aberto / próximos passos

- [x] **Deploy Vercel** — ✅ produção: **https://woney-registro.vercel.app** (projeto `woney-registro`,
      team `studio-bicofinos-projects`). Redeploy: `cd apps/woney-registro && vercel deploy --prod --yes
      --scope studio-bicofinos-projects`.
- [ ] **Supabase** — migration pronta em `supabase/migrations/0001_init.sql`, env em
      `.env.local.example`. Ao conectar, só `src/lib/data.ts` troca de fonte; `calc.ts` e telas não mudam.
      Conta da empresa (woney@bicofino.com). Sem auth por ora.
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
