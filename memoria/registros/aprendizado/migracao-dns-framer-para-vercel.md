---
tipo: aprendizado
titulo: Migração bicofino.com Framer→Vercel — preservar SPF, 308 www→apex preserva ranking, cert via CLI
data: 2026-06-11
projetos: [lancamento-web, apps-web]
fontes: [.planning/lancamento-web/HANDOFF.md]
status: vigente
tags: [dns, dominio, vercel, seo, namecheap]
---

Em 2026-06-11 o domínio `bicofino.com` saiu do Framer (site antigo) e passou a servir o
apps/web na Vercel, no ar com HTTPS na mesma noite. O que essa migração ensinou:

1. **NUNCA apagar o registro TXT de SPF do Google** ao limpar o DNS — ele é do e-mail
   (Google Workspace), não do site. Na limpeza da Namecheap saíram só os registros do
   Framer (`A 31.43.160.6`, `CNAME www → sites.framer.app`) e um TXT órfão; o SPF ficou.
2. **O site antigo vivia em `www.bicofino.com`** — por isso o `www` foi configurado com
   **redirect 308 → apex**, preservando o ranking das URLs já indexadas. Consistente com
   o canonical do site novo (`metadataBase = https://bicofino.com`, sem www). Apex 200,
   www→apex 308, http→https 308, tudo verificado.
3. **Certificado demorou a emitir sozinho** após a propagação; resolvido forçando via CLI:
   `vercel certs issue bicofino.com www.bicofino.com`.
4. Remover o custom domain no painel do antigo provedor (Framer) é só limpeza — **DNS é
   quem manda**; o site novo já respondia antes disso.

Padrão reutilizável para qualquer migração de domínio do ecossistema: limpar só os
registros do provedor antigo, decidir o lado canônico (www vs apex) pelo histórico de
indexação, redirecionar o outro com 308, e só depois fazer Search Console.
