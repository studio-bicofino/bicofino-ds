# STATUS — Produtos Bicofino

> Handoff para continuar em outro chat. Última atualização: 2026-06-12.
> App em `apps/produtos/` (porta 3043, `npm run produtos` na raiz). Vitrine comercial
> dos sistemas próprios do Studio — para mostrar ao Fabio (e a clientes) o que está
> construído, o que o mercado cobra por encomenda equivalente e o que custa operar.

## O que é

Página única na pegada do Registro de Impacto (tokens DS, Gotham impact, bento,
accent randomizado, logo Bicofino wordmark): hero, faixa de números do portfólio
(R$ 773 mil de valor de mercado · 81 semanas de fila · 9 produtos), catálogo em
**card stack no scroll**, seção de ferramentas/assinaturas e nota de honestidade.
Dados espelham a dimensão de terceirização do woney-registro (pesquisa BR 12/06,
câmbio 5,40) + a **operação do cliente** (assinaturas por produto).

## Produção & domínio

- **Canônico: https://bicofino.com/produtos** — multi-zone igual /brandsystem e
  /casa-nostra: `basePath: '/produtos'` aqui + rewrites no `apps/web/next.config.ts`.
- Projeto Vercel `produtos-bicofino` (team `studio-bicofinos-projects`), ssoProtection
  OFF via REST. No domínio `produtos-bicofino.vercel.app` as rotas ficam sob
  `/produtos` (raiz dá 404 — normal).
- Deploy: `cd apps/produtos && vercel deploy --prod --yes --scope studio-bicofinos-projects`.
- Gotchas resolvidos: projeto criado via `vercel project add` nasce com framework
  `None` (serve 404; corrigido via PATCH REST `{"framework":"nextjs"}`);
  `turbopack.root` do monorepo só no dev local (na Vercel desloca os manifests);
  com basePath, `<img>` puro e `@font-face` precisam do prefixo `/produtos` manual.

## Decisões de design (com o Woney, 12/06)

1. **Card stack no scroll** — portado do motion-lab EXP-10 com os valores do tuner
   (scrub 1 · recuo 0.05 · offset 24px · 100%/card · snap). `CardStack.tsx` com GSAP
   ScrollTrigger, gated por `gsap.matchMedia` + CSS na MESMA media query:
   `(min-width: 900px) and (prefers-reduced-motion: no-preference)`. Fora disso
   (mobile/reduced-motion) os cards fluem como lista normal.
2. **Mockups em outline** — MacbookFrame e IphoneFrame com hairline (sem fundo
   preto), tokens fechados, iPhone com cantos soft via `data-corners` e dynamic
   island. Telas em `public/telas/` (9/9 produtos com tela).
3. **Responsivo** — coluna lateral (pill + mockup) alinha à esquerda ≤900px
   (classe `.produto-aside` no globals).
4. **Favicon** — P em Gotham Black (glifo real via fontTools) sobre o verde
   `bf-ops-success` (#2FD298), espelhando o do Casa Nostra (`src/app/icon.svg`).
5. Accent-fill no card grande do hero mantido de propósito (padrão aprovado do
   Painel do registro); copy auditada pelo bicofino-copy-editor.

## Como rodar / validar

```bash
cd apps/produtos
npm install
npm run dev      # http://localhost:3043/produtos (basePath!)
npx tsc --noEmit
npm run build
```
Validação local de prod: `npm run start` — se a porta 3043 estiver presa com build
velho, `lsof -ti :3043 | xargs kill -9`.

## Aberto / próximos passos

- [ ] Revisão do stack com o Woney no ar (altura do card `min(640px, 82vh)` foi
      calibrada a olho; cards têm folga embaixo em telas altas).
- [ ] Atualizar telas quando os produtos evoluírem (`public/telas/`, 1600px de largura).
- [ ] Se um dia tiver venda real: decidir preço Bicofino por produto (a página
      mostra só a referência de mercado, de propósito).

Memória persistente: `project-produtos-bicofino` no MEMORY.md do Claude.
