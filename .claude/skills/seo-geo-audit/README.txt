================================================================================
  SEO-GEO-AUDIT — Skill de auditoria de SEO e GEO para sites
================================================================================

Esta skill ensina o Claude Code a fazer uma auditoria completa de SEO
(Search Engine Optimization) e GEO (Generative Engine Optimization) nos
seus projetos, baseada nas diretrizes oficiais do Google Search Central.

Cobre sites em geral: blogs, sites institucionais, e-commerce, landing pages,
aplicações web, sites multilíngues e qualquer projeto que precise aparecer
no Google — e nas respostas de IA generativa (AI Overview).


--------------------------------------------------------------------------------
  1. O QUE ELA FAZ (em uma frase)
--------------------------------------------------------------------------------

Você digita um comando no Claude Code e ele analisa seu projeto, identifica
os problemas de SEO e GEO, aponta onde estão (arquivo + linha ou URL),
explica o impacto no rankeamento e propõe a correção mínima e eficaz.

Cobre:

  - SEO técnico: robots.txt, sitemaps, canonical, redirecionamentos, HTTPS
  - Performance: Core Web Vitals (LCP, INP, CLS), mobile-friendly
  - JavaScript SEO: React, Vue, Angular, Next.js, Nuxt.js
  - Aparência nos resultados: titles, meta descriptions, dados estruturados
  - Qualidade de conteúdo: E-E-A-T, intenção de busca, links
  - GEO: otimização para AI Overview do Google, experiências agênticas
  - E-commerce: produtos, categorias, filtros, Merchant Center
  - Internacional: hreflang, sites multilíngues, segmentação geográfica


--------------------------------------------------------------------------------
  2. COMO INSTALAR
--------------------------------------------------------------------------------

FORMA A — Usar só em um projeto específico
-------------------------------------------
  1. Copie a pasta inteira:
       .claude/skills/seo-geo-audit/
     para a raiz do SEU projeto (na mesma estrutura: dentro de .claude/skills).

  2. Abra o Claude Code na pasta do projeto.

  3. Pronto. A skill já aparece disponível.

FORMA B — Usar em todos os projetos (recomendado)
--------------------------------------------------
  1. Copie a pasta "seo-geo-audit" para:

       Windows:  C:\Users\<seu-usuario>\.claude\skills\seo-geo-audit\
       Mac:      ~/.claude/skills/seo-geo-audit/
       Linux:    ~/.claude/skills/seo-geo-audit/

  2. Abra o Claude Code em qualquer projeto.

  3. Ela aparece automaticamente.

Como verificar a instalação:
-----------------------------
  Dentro do Claude Code, digite:

     /seo-geo-audit

  Se aparecer autocomplete, está instalado.


--------------------------------------------------------------------------------
  3. COMO USAR — MODOS DISPONÍVEIS
--------------------------------------------------------------------------------

MODO PADRÃO — Auditoria completa
---------------------------------
  Quando usar: quer uma visão geral de tudo.

  Comando:
     /seo-geo-audit

  O Claude analisa 8 áreas: rastreamento, técnico, estrutura, aparência,
  imagens/vídeos, conteúdo, dados estruturados e GEO. Gera relatório
  com Crítico / Alto / Médio / Baixo.


MODO NOVO SITE — Checklist pré-lançamento
------------------------------------------
  Quando usar: está prestes a lançar um site novo e quer garantir
               que tudo está correto antes de indexar.

  Comando:
     /seo-geo-audit novo-site

  Cobre 9 blocos: HTTPS, robots.txt, sitemap, canonical, estrutura,
  aparência, imagens, Core Web Vitals, dados estruturados, Search Console.
  Veredito: verde / amarelo / vermelho para lançamento.


MODO TÉCNICO — Foco em crawling e performance
----------------------------------------------
  Quando usar: suspeita de problema técnico (site não indexado, queda
               de tráfego, robots.txt incorreto, JS bloqueando conteúdo).

  Comando:
     /seo-geo-audit tecnico

  Diagnóstico profundo de robots.txt, sitemaps, canonical, redirects,
  JavaScript SEO, Core Web Vitals, mobile, HTTPS.


MODO CONTEÚDO — Foco em qualidade de texto e aparência
--------------------------------------------------------
  Quando usar: quer melhorar titles, meta descriptions, headings,
               links internos, E-E-A-T, qualidade do conteúdo.

  Comando:
     /seo-geo-audit conteudo

  Avalia E-E-A-T, intenção de busca, titles, meta descriptions,
  headings, links internos/externos, conteúdo raso.


MODO GEO — Otimização para IA Generativa
-----------------------------------------
  Quando usar: quer aparecer nas respostas do AI Overview do Google
               e em outros sistemas de IA generativa.

  Comando:
     /seo-geo-audit geo

  Avalia unicidade do conteúdo, estrutura para extração RAG, presença
  no Google Business Profile e Merchant Center, dados estruturados
  para IA, e desmistifica "hacks" ineficazes de GEO.


MODO E-COMMERCE — SEO para lojas virtuais
------------------------------------------
  Quando usar: site tem catálogo de produtos.

  Comando:
     /seo-geo-audit ecommerce

  Cobre URLs de produto/categoria, dados estruturados Product,
  conteúdo duplicado de variações, filtros/facetas, produtos
  esgotados, Google Merchant Center.


MODO INTERNACIONAL — Sites multilíngues
-----------------------------------------
  Quando usar: site tem versões em múltiplos idiomas ou países.

  Comando:
     /seo-geo-audit internacional

  Cobre hreflang, estruturas de URL (ccTLD/subdomínio/subdiretório),
  redirecionamentos automáticos, conteúdo por idioma, segmentação
  geográfica no Search Console.


--------------------------------------------------------------------------------
  4. EXEMPLOS DE USO
--------------------------------------------------------------------------------

Exemplo 1 — Site novo indo ao ar
----------------------------------
  > /seo-geo-audit novo-site

  [Claude lê o projeto, verifica os 9 blocos, gera relatório]

  ## Auditoria SEO/GEO — pré-lançamento

  ### Resumo Executivo
  2 Críticos, 3 Altos, 5 Médios, 4 Baixos.
  NÃO recomendado lançar com os 2 Críticos abertos.

  ### Achados

  #### [CRÍTICO] robots.txt bloqueando arquivos CSS e JavaScript
  - **Onde:** /robots.txt:linha 4
  - **Situação atual:** Disallow: /assets/
  - **Impacto:** Googlebot não consegue renderizar as páginas corretamente.
                 Conteúdo aparece vazio no índice.
  - **Correção:** Remover a linha "Disallow: /assets/" ou mudar para
                 "Disallow: /assets/admin/" (apenas área restrita)

  #### [ALTO] Sem tag <title> em 12 páginas de produto
  ...

  > Corrija o item 1

  [Claude edita o robots.txt]


Exemplo 2 — Queda de tráfego
------------------------------
  > /seo-geo-audit tecnico

  [Claude investiga causas técnicas da queda]


Exemplo 3 — Melhorar aparência nos resultados
----------------------------------------------
  > /seo-geo-audit conteudo

  [Claude analisa titles, meta descriptions e headings]


Exemplo 4 — "Quero aparecer no AI Overview"
---------------------------------------------
  > /seo-geo-audit geo

  [Claude avalia qualidade do conteúdo para IA generativa e desmistifica
   táticas ineficazes como llms.txt]


--------------------------------------------------------------------------------
  5. PERGUNTAS FREQUENTES
--------------------------------------------------------------------------------

P: Preciso de experiência em SEO para usar?
R: Não. O Claude explica cada problema e sua correção em linguagem acessível.
   Se não entender algo, pergunte: "o que é canonical?", "o que é hreflang?".

P: A skill vai alterar meu código automaticamente?
R: Não. Ela lê e relata. Mudanças só acontecem se você pedir: "corrija o item 1".

P: Funciona com qualquer stack (WordPress, Next.js, Django)?
R: Sim. A skill analisa o código-fonte independente de tecnologia.
   Para frameworks específicos (Next.js, Nuxt) tem orientações específicas.

P: E se meu site já estiver no ar — precisa de auditoria diferente?
R: Use o modo padrão "/seo-geo-audit" ou um modo específico conforme o problema.
   O modo "novo-site" é especificamente para pré-lançamento.

P: GEO realmente funciona? Há garantias?
R: Não há garantias (o próprio Google diz isso). GEO não é uma tática separada
   de SEO — é otimizar conteúdo para ser genuinamente útil e único. Táticas
   como criar arquivos "llms.txt" são ineficazes (documentado pelo Google).

P: A skill funciona com qualquer modelo (Opus, Sonnet, Haiku)?
R: Sim. Opus e Sonnet dão análises mais profundas. Haiku serve para
   verificações pontuais.

P: Como medir se as mudanças funcionaram?
R: Google Search Console (impressões, cliques, posição média) e Google Analytics
   (tráfego orgânico). Aguarde semanas a meses para mudanças refletirem.


--------------------------------------------------------------------------------
  6. ESTRUTURA DA SKILL
--------------------------------------------------------------------------------

  .claude/skills/seo-geo-audit/
   |
   +-- SKILL.md                         → ponto de entrada. Claude lê primeiro.
   |
   +-- workflows/
   |    +-- new-site-checklist.md       → checklist 9 blocos pré-lançamento
   |    +-- technical-audit.md          → auditoria técnica profunda
   |    +-- content-audit.md            → auditoria de qualidade de conteúdo
   |    +-- geo-audit.md                → otimização para IA generativa
   |
   +-- references/
   |    +-- seo-fundamentals.md         → fundamentos SEO, mitos, monitoramento
   |    +-- geo-ai-optimization.md      → GEO, AI Overview, RAG, táticas ineficazes
   |    +-- crawling-indexing.md        → robots.txt, sitemaps, canonical,
   |    |                                  redirects, JavaScript SEO
   |    +-- ranking-appearance.md       → titles, meta descriptions, imagens,
   |    |                                  vídeos, dados estruturados schema.org
   |    +-- technical-seo.md            → Core Web Vitals, HTTPS, mobile,
   |    |                                  performance, headers HTTP
   |    +-- content-quality.md          → E-E-A-T, links internos/externos,
   |    |                                  intenção de busca, conteúdo YMYL
   |    +-- ecommerce-seo.md            → produtos, categorias, filtros, Merchant Center
   |    +-- international-seo.md        → hreflang, estrutura de URL internacional
   |
   +-- README.txt                       → este arquivo


--------------------------------------------------------------------------------
  7. GLOSSÁRIO RÁPIDO
--------------------------------------------------------------------------------

SEO (Search Engine Optimization)
   Conjunto de práticas para melhorar a visibilidade de um site nos
   resultados orgânicos (não pagos) dos mecanismos de busca.

GEO (Generative Engine Optimization)
   Práticas para aparecer nas respostas geradas por IA (como o AI Overview
   do Google). Na prática, é SEO de alta qualidade focado em conteúdo único
   e estruturado.

E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
   Framework usado pelo Google para avaliar qualidade de conteúdo.
   Experiência, Especialização, Autoridade e Confiabilidade.

Core Web Vitals
   Conjunto de métricas do Google que medem a experiência real de usuário:
   LCP (velocidade de carregamento), INP (responsividade a interações),
   CLS (estabilidade visual do layout).

Canonical (rel="canonical")
   Tag HTML que indica ao Google qual é a URL preferida quando há conteúdo
   duplicado ou similar em múltiplas URLs.

hreflang
   Atributo HTML que informa ao Google sobre versões de uma página em
   diferentes idiomas ou regiões.

Sitemap XML
   Arquivo que lista todas as URLs importantes do site para facilitar
   a descoberta pelo Googlebot.

robots.txt
   Arquivo que instrui rastreadores sobre quais áreas do site podem ou
   não ser acessadas. Não é segurança — é gerenciamento de rastreamento.

RAG (Retrieval-Augmented Generation)
   Técnica que o AI Overview do Google usa: recupera páginas relevantes
   do índice e usa o conteúdo para gerar a resposta.

Schema.org / Dados Estruturados
   Vocabulário de marcações que ajuda o Google a entender o tipo de
   conteúdo da página (produto, receita, artigo, FAQ, negócio local).
   Formato recomendado: JSON-LD.

YMYL (Your Money Your Life)
   Categoria de conteúdo com padrões mais altos de E-E-A-T: saúde,
   finanças, jurídico, segurança. Erros aqui têm impacto real na vida.


--------------------------------------------------------------------------------
  FONTES
--------------------------------------------------------------------------------

Esta skill é baseada nas diretrizes oficiais do Google Search Central:
  - developers.google.com/search/docs (documentação completa)
  - Guia de SEO para Iniciantes do Google
  - Guia de Otimização para IA Generativa do Google
  - Google Search Essentials

Última revisão das fontes: Junho 2026.
Verifique sempre a documentação oficial para atualizações.


--------------------------------------------------------------------------------
  LEMBRE-SE
--------------------------------------------------------------------------------

  "Otimize para seus usuários, não para mecanismos de busca.
   Quando você satisfaz genuinamente os usuários, os sistemas
   do Google geralmente reconhecem isso."
                                    — Google Search Central

  SEO é um trabalho contínuo, não uma configuração única.
  Monitore o Search Console regularmente, atualize conteúdo antigo,
  e acompanhe as atualizações do Google Search Central.

================================================================================
