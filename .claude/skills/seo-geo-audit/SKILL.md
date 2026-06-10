---
name: seo-geo-audit
description: Auditoria completa de SEO (Search Engine Optimization) e GEO (Generative Engine Optimization) para sites em geral — baseada nas diretrizes oficiais do Google Search Central. Use quando for lançar um site novo, otimizar um site existente, investigar queda de tráfego, preparar site para respostas de IA generativa, ou quando o usuário pedir "auditoria SEO", "otimizar SEO", "melhorar rankeamento", "aparecer no Google", "aparecer no AI Overview".
when_to_use: Invocar quando o usuário precisar otimizar um site para mecanismos de busca ou para respostas de IA generativa, quando houver queda de tráfego orgânico, ao lançar um site novo, ao revisar qualidade de conteúdo, ao verificar configurações técnicas (sitemaps, robots.txt, canonical, hreflang), ao otimizar aparência nos resultados (title, meta description, dados estruturados), ou quando mencionar "SEO", "GEO", "AEO", "rankeamento", "Google", "AI Overview", "pesquisa generativa".
argument-hint: [url-ou-pasta | "novo-site" | "tecnico" | "conteudo" | "geo" | "ecommerce" | "internacional"]
allowed-tools: Read Grep Glob Bash(curl -I *) Bash(curl -s *) Bash(git log *) Bash(git status *) WebFetch WebSearch
---

# seo-geo-audit — Auditoria de SEO & GEO

Você está executando uma auditoria de SEO e GEO baseada nas diretrizes oficiais do Google Search Central. Seja concreto: cite arquivos com números de linha, mostre o código atual, explique o impacto e proponha a correção mínima e eficaz. Nunca invente achados; se incerto, diga o que precisaria verificar.

## Escolha o modo

Baseado em `$ARGUMENTS` e nos sinais do projeto:

- **`novo-site`** → execute [workflows/new-site-checklist.md](workflows/new-site-checklist.md). Checklist pré-lançamento com todos os itens críticos antes de indexar.
- **`tecnico`** → execute [workflows/technical-audit.md](workflows/technical-audit.md). Foco em crawling, indexação, performance técnica, JavaScript SEO.
- **`conteudo`** → execute [workflows/content-audit.md](workflows/content-audit.md). Foco em qualidade de conteúdo, E-E-A-T, titles, meta descriptions, links.
- **`geo`** → execute [workflows/geo-audit.md](workflows/geo-audit.md). Foco em otimização para IA generativa e AI Overview do Google.
- **`ecommerce`** → inclua [references/ecommerce-seo.md](references/ecommerce-seo.md) na auditoria.
- **`internacional`** → inclua [references/international-seo.md](references/international-seo.md) na auditoria.
- **`<url>` ou `<pasta>` ou vazio** → execute a auditoria completa de 8 áreas abaixo.

Se não souber o modo, pergunte: "É um site novo indo ao ar, um site existente com problema, ou você quer focar em uma área específica (técnica, conteúdo, GEO)?"

## Princípios operacionais

1. **Fundamentos primeiro.** SEO técnico correto é base para tudo; GEO/IA generativa depende dos mesmos sistemas de ranking tradicionais.
2. **Conteúdo supera tática.** Nenhuma otimização técnica compensa conteúdo de baixa qualidade.
3. **Impacto × esforço.** Priorize achados pelo impacto no tráfego e na experiência do usuário.
4. **Não invente hacks.** Ignore táticas como "llms.txt especial", fragmentação artificial de conteúdo ou reescrita específica para IA.
5. **Mensurável.** Toda recomendação deve ter uma métrica de sucesso observável no Search Console.
6. **Pessoas primeiro.** Se o conteúdo satisfaz usuários reais, geralmente satisfaz o Google e modelos de IA.

## Auditoria completa — 8 áreas

Execute em sequência. Relate achados conforme avança.

### Área 1 — Rastreamento e Indexação

- Verifique se o site está indexado: `site:dominio.com`
- Leia `robots.txt` — bloqueia recursos essenciais (CSS, JS, imagens)?
- Sitemap XML existe e está válido? Submetido no Search Console?
- URLs usam HTTPS? Há versões HTTP acessíveis sem redirect 301?
- Há conteúdo duplicado acessível por múltiplas URLs?
- Tags `rel="canonical"` corretas e consistentes?
- Redirecionamentos: 301 para permanentes, 302 para temporários?
- Páginas retornam código HTTP correto (200, 301, 404, 410)?
- Ver [references/crawling-indexing.md](references/crawling-indexing.md)

### Área 2 — SEO Técnico e Performance

- Core Web Vitals: LCP, INP, CLS estão no verde?
- Site é mobile-friendly? Responsivo?
- Tempo de carregamento adequado?
- JavaScript não bloqueia indexação de conteúdo crítico?
- SPAs (React/Vue/Angular/Next.js) usam SSR ou SSG para conteúdo indexável?
- Lazy loading de imagens implementado com `loading="lazy"`?
- Recursos de terceiros minimizados ou carregados de forma assíncrona?
- Ver [references/technical-seo.md](references/technical-seo.md)

### Área 3 — Estrutura e URLs

- URLs são descritivas e legíveis por humanos?
- Hierarquia de diretórios faz sentido semântico?
- URLs evitam parâmetros desnecessários?
- Estrutura de links internos distribui autoridade corretamente?
- Breadcrumbs implementados (HTML + dados estruturados)?

### Área 4 — Aparência nos Resultados

- Cada página tem `<title>` único, descritivo e conciso (até ~60 chars)?
- Cada página tem `<meta name="description">` única e informativa?
- Títulos não contêm keyword stuffing?
- `<h1>` presente e único por página?
- Hierarquia de headings (H1→H2→H3) lógica?
- Favicon presente e válido?
- Open Graph tags (`og:title`, `og:description`, `og:image`) configuradas?
- Ver [references/ranking-appearance.md](references/ranking-appearance.md)

### Área 5 — Imagens e Vídeos

- Todas imagens têm atributo `alt` descritivo?
- Nomes de arquivos de imagem são descritivos (`produto-vermelho.jpg` vs `IMG001.jpg`)?
- Imagens em formato moderno (WebP, AVIF)?
- Imagens servidas em tamanho adequado (srcset implementado)?
- Vídeos têm metadados: título, descrição, miniatura?
- Sitemap de imagens/vídeos submetido?
- Ver [references/ranking-appearance.md](references/ranking-appearance.md)

### Área 6 — Qualidade de Conteúdo (E-E-A-T)

- Conteúdo é original e oferece perspectiva única?
- Conteúdo demonstra Experiência, Especialização, Autoridade, Confiabilidade?
- Informações estão atualizadas e precisas?
- Estrutura legível: parágrafos curtos, headings, listas?
- Conteúdo evita keyword stuffing?
- Links internos com anchor text descritivo?
- Links externos para fontes confiáveis com `rel="nofollow"` quando adequado?
- Conteúdo gerado por usuários usa `nofollow` automático?
- Ver [references/content-quality.md](references/content-quality.md)

### Área 7 — Dados Estruturados

- Dados estruturados relevantes para o tipo de site implementados?
  - Todos os sites: `WebSite`, `Organization`/`Person`, `BreadcrumbList`
  - Blog/Notícias: `Article`, `NewsArticle`
  - E-commerce: `Product`, `Offer`, `Review`
  - Local: `LocalBusiness`
  - FAQ: `FAQPage`
  - Receitas: `Recipe`
  - Eventos: `Event`
- Formato JSON-LD (preferido pelo Google)?
- Validado com Google Rich Results Test?
- Dados correspondem ao conteúdo visível da página?
- Ver [references/ranking-appearance.md](references/ranking-appearance.md)

### Área 8 — GEO (Otimização para IA Generativa)

- Conteúdo oferece ponto de vista único que modelos de IA não encontram em outras fontes?
- Estrutura clara facilita extração de informações por sistemas RAG?
- Não há fragmentação artificial de conteúdo?
- Merchant Center/Perfis de Empresa configurados (se relevante)?
- Conteúdo evita ser genérico e facilmente reproduzível por IA?
- Ver [references/geo-ai-optimization.md](references/geo-ai-optimization.md)

## Formato do relatório

```
## Auditoria SEO/GEO — <escopo>

### Resumo Executivo
<contagem crítico/alto/médio/baixo, top 3 riscos, recomendação de priorização>

### Achados

#### [SEVERIDADE] <título curto>
- **Onde:** arquivo/URL:linha ou seletor
- **Situação atual:** <código/valor atual>
- **Impacto:** <efeito no ranking/tráfego/experiência>
- **Correção:** <mudança mínima e concreta; preferir solução nativa do CMS/framework>
- **Referência:** <link para documentação Google ou seção deste skill>

### Pontos Positivos
<o que está funcionando bem — vale preservar>

### Fora do Escopo / Necessita Verificação
<o que não foi possível inspecionar e por quê>
```

**Escala de severidade:**
- **Crítico** = impede indexação, bloqueia rastreamento de conteúdo principal, canonical errado em toda a home
- **Alto** = título/meta ausentes, imagens sem alt em toda a home, dados estruturados inválidos em páginas principais
- **Médio** = otimizações de performance, melhorias de conteúdo, dados estruturados faltando
- **Baixo** = ajustes finos, oportunidades GEO, melhorias incrementais

## Referências

- [workflows/new-site-checklist.md](workflows/new-site-checklist.md) — checklist pré-lançamento para sites novos
- [workflows/technical-audit.md](workflows/technical-audit.md) — auditoria técnica profunda
- [workflows/content-audit.md](workflows/content-audit.md) — auditoria de qualidade de conteúdo
- [workflows/geo-audit.md](workflows/geo-audit.md) — otimização para IA generativa
- [references/seo-fundamentals.md](references/seo-fundamentals.md) — fundamentos de SEO segundo Google
- [references/geo-ai-optimization.md](references/geo-ai-optimization.md) — GEO e AI Overview
- [references/crawling-indexing.md](references/crawling-indexing.md) — sitemaps, robots.txt, canonical, redirects, JS SEO
- [references/ranking-appearance.md](references/ranking-appearance.md) — titles, meta descriptions, imagens, vídeos, dados estruturados
- [references/technical-seo.md](references/technical-seo.md) — Core Web Vitals, mobile, HTTPS, JavaScript SEO
- [references/content-quality.md](references/content-quality.md) — E-E-A-T, links, qualidade de conteúdo
- [references/ecommerce-seo.md](references/ecommerce-seo.md) — SEO para e-commerce
- [references/international-seo.md](references/international-seo.md) — SEO internacional, hreflang, multilíngue

ultrathink sobre o impacto de cada achado antes de escrever o relatório.
