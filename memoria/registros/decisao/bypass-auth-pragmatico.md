---
tipo: decisao
titulo: Bypass de login mantido conscientemente; mitigação por obscuridade, sem Disallow no robots.txt
data: 2026-06-12
projetos: [casa-nostra]
fontes: [.planning/casa-nostra-v2/HANDOFF.md, .planning/casa-nostra/HANDOFF.md]
status: em-aberto
tags: [auth, seguranca, pragmatismo]
---

Contexto: a Casa Nostra nasceu com magic link + allowlist, mas o login virou atrito durante a construção e nas sessões com o Fabio. O bypass (`CASA_NOSTRA_AUTH_BYPASS=1`) foi religado em 2026-05-26 — primeiro pra facilitar acesso à v1 congelada como referência, depois herdado pela v2 inteira. Histórico de vaivém: desligado e religado na mesma noite de 26/05 conforme a decisão de congelar a v1.

Decisão (reafirmada em 2026-06-12, já com o app exposto em bicofino.com/casa-nostra): **AINDA NÃO ligar o login.** Mitigação atual = obscuridade + `noindex,nofollow` no layout + fora do sitemap. Regra importante descoberta no caminho: **NÃO pôr /casa-nostra no robots.txt — um Disallow ANUNCIA o caminho** pra quem ler o arquivo; noindex sem Disallow é a combinação certa pra rota que deve existir mas não ser achada.

Por quê: a audiência é 2-3 pessoas internas e o atrito do magic link (Gmail prefetch consumindo tokens, sessão expirando pro Fabio) custava mais que o risco aceito. É decisão pragmática consciente, não esquecimento — o HANDOFF carrega alerta explícito de privacidade (CRM com dados pessoais da família acessível publicamente).

Efeitos colaterais aceitos: `created_by`/`updated_by` ficam `null` nos registros (já causou problema de RLS em delete na v1). Pra religar: deletar a env nas 3 envs Vercel + Infisical + redeploy, e corrigir `NEXT_PUBLIC_SITE_URL` pro domínio canônico.

Status em-aberto: revisitar quando Woney/Fabio pedirem — ligar o login real é o próximo passo recomendado desde que o app foi pro domínio público.
