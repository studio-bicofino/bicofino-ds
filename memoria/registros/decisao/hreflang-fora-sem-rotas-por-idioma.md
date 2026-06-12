---
tipo: decisao
titulo: hreflang ficou DE FORA do SEO de propósito — idioma troca client-side na mesma URL
data: 2026-06-09
projetos: [lancamento-web, apps-web]
fontes: [.planning/lancamento-web/HANDOFF.md]
status: vigente
tags: [seo, i18n, hreflang]
---

Na Frente B (SEO) do lançamento, o checklist original pedia `alternates.languages`
(hreflang BR/EN/IT). Na execução (2026-06-09) o hreflang **não entrou, de propósito**:
no apps/web o idioma troca client-side na MESMA URL — não existem rotas `/en` ou `/it`.
hreflang exige URLs distintas por idioma; declará-lo sem ter as rotas é anti-pattern
(referência: `international-seo.md` da skill seo-geo-audit) e mente para o Google.

Regra: só declarar hreflang se/quando o site ganhar rotas por idioma. Até lá, o
trilinguismo é feature de UI, não de indexação — o Google indexa o conteúdo BR (default).

Vale como princípio geral de SEO no ecossistema: checklist não se cumpre cegamente;
cada item declarativo (hreflang, canonical, structured data) precisa refletir a
arquitetura REAL do site, senão vira sinal falso.
