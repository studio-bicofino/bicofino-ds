---
tipo: decisao
titulo: bicofino.com é cookie-light — sem Analytics, sem Pixel, sem request a terceiro
data: 2026-06-04
projetos: [lancamento-web, apps-web]
fontes: [.planning/lancamento-web/BRIEFING.md, .planning/lancamento-web/HANDOFF.md]
status: vigente
tags: [privacidade, seo, cookies, legal]
---

Decisão travada pelo Woney em 2026-06-04: o site público NÃO usa Google Analytics,
Meta Pixel nem nenhum tracker. **Cookie-light de verdade** — a auditoria de 11/06
confirmou ZERO coleta de dados (sem forms funcionais, sem API routes; só `localStorage`
de preferências: `bf-lang`, `bf-theme`, `bf-notice`).

Por quê: o objetivo do site é ranquear #1 para "bicofino" no Google, e **trackers não
são fator de ranking** — isso ficou claro com o Woney na decisão. O que ranqueia é
Search Console + sitemap + structured data + metadata, tudo sem cookie. O tracker só
adicionaria peso legal (consentimento) e nenhum ganho.

Consequências em cascata:
- **Sem banner de consentimento bloqueante** (não há cookie não-essencial para opt-in);
  basta um aviso informativo discreto, dismissível via `localStorage`.
- Políticas de Privacidade e Cookies curtíssimas (BR/EN/IT), com operadores declarados
  (Vercel + Google Workspace) e pontos de revisão jurídica marcados.
- Em 2026-06-11 a postura foi levada ao limite: Inter + JetBrains Mono **self-hosted**
  (`@import` do Google Fonts removido) → o site faz **zero request a terceiro**.

Alternativa descartada: instalar GA "para ter dados" — descartada porque medição de
busca vem do Search Console, que é a ferramenta que importa para indexação.
