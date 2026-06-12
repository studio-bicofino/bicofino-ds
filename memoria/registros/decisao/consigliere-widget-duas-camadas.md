---
tipo: decisao
titulo: Consigliere Widget — IA contextual em duas camadas como visão de plataforma
data: 2026-05-19
projetos: [consigliere, docs-site, plataforma]
fontes: [.planning/consigliere/PLAN.md]
status: em-aberto
tags: [ia, consigliere, plataforma, docs-site]
---
Contexto: visão de plataforma de uma IA com a voz Bicofino embutida nos
produtos da casa, planejada em 19/05/2026 para o docs-site.

O conceito tem duas camadas: a camada 1 é o widget contextual público — página
/consigliere cheia ("casa" do produto) + FAB flutuante em todas as outras
rotas, ciente da página atual. A camada 2 é local e privada (matchmaking de
clientes × Bicofino, rodando só no iMac com Supabase local) — explicitamente
fora do MVP.

Decisões fixas do plano, com porquês: auth adiada (MVP rápido, sem acoplar
Supabase agora); backend único /api/consigliere/chat compartilhado por página e
widget; contexto da página via mapa estático rota→resumo em vez de DOM scraping
(scraping é frágil, o mapa é determinístico); streaming via Vercel AI SDK;
brand voice cozida no system prompt — a qualidade depende inteiramente de
extrair as seções certas do BRAND.md, risco nº 1 apontado.

Estado: Fase 1 (backend + system prompt) foi entregue em 19/05, mas o widget
nunca foi ao ar — e a primeira implementação REAL do Consigliere acabou saindo
em outro contexto (a rota de análise do la-rete, em prod desde 11/06/2026).
Nota de 12/06 no próprio plano: ao retomar o widget, reaproveitar/extrair o
serviço do la-rete em vez de manter duas implementações.
