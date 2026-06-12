---
tipo: framework
titulo: Multi-zone no bicofino.com — app separado servido sob subpath via basePath + rewrites
data: 2026-06-12
projetos: [lancamento-web, docs-site]
fontes: [.planning/auditoria-2026-06/AUDITORIA.md]
status: vigente
tags: [vercel, nextjs, multi-zone, rewrites, dominio]
---

**O padrão.** Para servir um app Next.js independente sob um subpath do domínio principal (zona): (1) o app da zona ganha `basePath: '/<zona>'` no `next.config`; (2) o app dono do domínio (apps/web) ganha rewrites `/<zona>(/:path*)` → `<dominio-prod-da-zona>/<zona>/...`. Cada app continua sendo um projeto Vercel separado, com deploy independente.

**Onde foi provado.** `bicofino.com/brandsystem` → docs-site (`bicofino-ds-umber.vercel.app`), montado e validado em prod em 2026-06-12 (HTML, assets, fontes e favicon 200, sem SSO, home do web intacta).

**Gotchas que custaram fixes — conferir TODOS ao montar uma zona nova:**
- **`public/` não recebe basePath automático.** O Next só prefixa rotas; toda referência a assets/fontes de `public/` precisa do prefixo manual (no docs-site: 37× `/assets` + 6 fontes no globals.css). Rewrite cego de `/assets`/`/fonts` no web é inviável quando ele tem pastas homônimas.
- **Apontar pro domínio prod CERTO do projeto.** `bicofino-ds.vercel.app` (sem sufixo) pertence a OUTRO projeto (conta pessoal) e servia build antigo — o prod real é `bicofino-ds-umber.vercel.app`.
- **Efeito colateral aceito:** a raiz do domínio da zona vira 404 — o site passa a viver sob o subpath.
- **Deployment Protection do projeto da zona** precisa estar desligada/"Standard", senão o subpath serve a página de SSO da Vercel.

**Quando usar.** Sempre que um produto/seção do bicofino.com merecer app próprio (deploy e stack independentes) mas precisar morar sob o domínio principal — o /brandsystem é o template para zonas futuras.
