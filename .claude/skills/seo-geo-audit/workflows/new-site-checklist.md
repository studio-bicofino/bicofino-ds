# Checklist Pré-Lançamento — Site Novo

Use antes de indexar um site novo. Execute cada bloco em ordem. Não avance para produção com itens **Críticos** ou **Altos** abertos.

---

## Bloco 1 — Fundamentos Técnicos

### 1.1 HTTPS e Segurança
- [ ] Certificado SSL/TLS válido e configurado
- [ ] HTTP redireciona para HTTPS com 301
- [ ] `www.` e raiz (`@`) resolvem para a mesma URL com canonical correto
- [ ] HSTS habilitado no servidor (header `Strict-Transport-Security`)

### 1.2 Acessibilidade ao Googlebot
- [ ] `robots.txt` presente em `/robots.txt` e não bloqueia CSS, JS, imagens
- [ ] Nenhuma página importante bloqueada por `noindex` acidental
- [ ] Conteúdo principal não exige login para ser acessado pelo bot
- [ ] Recursos JavaScript e CSS acessíveis (não bloqueados)

### 1.3 Sitemap XML
- [ ] Sitemap criado e acessível em `/sitemap.xml` (ou declarado no robots.txt)
- [ ] Apenas URLs canônicas no sitemap (sem duplicatas, sem noindex)
- [ ] Sitemap submetido no Google Search Console
- [ ] Para sites com mídia: sitemap de imagens e/ou vídeos configurado

### 1.4 Canonicalização
- [ ] Tag `<link rel="canonical">` presente em todas as páginas apontando para si mesma
- [ ] Versões duplicadas (www/non-www, http/https, trailing slash) redirecionam para canonical
- [ ] Parâmetros de URL desnecessários não criam páginas duplicadas

---

## Bloco 2 — Estrutura de Páginas

### 2.1 URLs
- [ ] URLs são descritivas, legíveis e sem caracteres especiais desnecessários
- [ ] Hierarquia de diretórios reflete organização temática do conteúdo
- [ ] URLs em letras minúsculas e com hifens (não underscore) para separar palavras

### 2.2 Códigos de Status HTTP
- [ ] Páginas existentes retornam 200
- [ ] Páginas inexistentes retornam 404 (não soft-404)
- [ ] Redirecionamentos usam 301 (permanente) ou 302 (temporário) corretamente
- [ ] Nenhuma cadeia de redirecionamentos com mais de 2 saltos

### 2.3 Links Internos
- [ ] Menu de navegação principal com links para todas as seções importantes
- [ ] Breadcrumbs implementados em páginas profundas
- [ ] Todas as páginas importantes alcançáveis a partir da home em ≤ 3 cliques
- [ ] Anchor text dos links internos é descritivo (não "clique aqui")

---

## Bloco 3 — Aparência nos Resultados

### 3.1 Title Tags
- [ ] Cada página tem `<title>` único
- [ ] Títulos são descritivos e concisos (recomendado: até ~60 caracteres)
- [ ] Home page inclui nome da marca
- [ ] Não há keyword stuffing nos títulos
- [ ] Páginas de erro e busca interna têm `noindex` (não aparecem nos resultados)

### 3.2 Meta Descriptions
- [ ] Cada página importante tem `<meta name="description">` única
- [ ] Descrições resumem o conteúdo de forma atraente e informativa
- [ ] Evita repetição de palavras-chave em excesso

### 3.3 Headings
- [ ] Cada página tem exatamente um `<h1>` descritivo
- [ ] Hierarquia H1→H2→H3 é lógica e não salta níveis
- [ ] Headings descrevem o conteúdo da seção (não são decorativos)

### 3.4 Open Graph / Redes Sociais
- [ ] `og:title` configurado
- [ ] `og:description` configurado
- [ ] `og:image` configurado (mínimo 1200×630px recomendado)
- [ ] `og:url` configurado com URL canônica
- [ ] Twitter Card tags configuradas (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)

---

## Bloco 4 — Imagens

- [ ] Todas as imagens têm atributo `alt` descritivo e relevante
- [ ] Nomes de arquivo de imagens são descritivos (ex: `cachorro-golden-retriever.jpg`)
- [ ] Imagens em formato moderno: WebP ou AVIF (com fallback PNG/JPEG)
- [ ] Atributo `srcset` implementado para responsividade
- [ ] Imagens não são maiores do que o necessário para exibição
- [ ] `loading="lazy"` em imagens abaixo do fold
- [ ] Imagem principal da página indicada via `og:image` ou `primaryImageOfPage` (schema)

---

## Bloco 5 — Performance (Core Web Vitals)

- [ ] LCP (Largest Contentful Paint) < 2,5s
- [ ] INP (Interaction to Next Paint) < 200ms
- [ ] CLS (Cumulative Layout Shift) < 0,1
- [ ] Site é mobile-friendly (teste no Google Mobile-Friendly Test)
- [ ] PageSpeed Insights aprovado para mobile e desktop
- [ ] Fontes carregadas com `font-display: swap`
- [ ] Imagens acima do fold não usam lazy loading
- [ ] Não há recursos que bloqueiam renderização desnecessariamente

---

## Bloco 6 — Dados Estruturados

- [ ] `WebSite` com `SearchAction` (sitelinks searchbox) — home page
- [ ] `Organization` ou `Person` com informações da marca — home page
- [ ] `BreadcrumbList` em páginas internas com profundidade ≥ 2
- [ ] Tipo específico conforme conteúdo:
  - Blog: `Article` ou `BlogPosting`
  - E-commerce: `Product`, `Offer`, `AggregateRating`
  - Local: `LocalBusiness` com endereço, telefone, horário
  - FAQ: `FAQPage`
- [ ] Formato JSON-LD usado (não Microdata ou RDFa)
- [ ] Validado sem erros no [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Dados estruturados correspondem ao conteúdo visível na página

---

## Bloco 7 — Qualidade de Conteúdo

- [ ] Conteúdo principal é original (não copiado de outras fontes)
- [ ] Texto sem erros ortográficos e gramaticais relevantes
- [ ] Conteúdo responde claramente à intenção de busca do usuário
- [ ] Estrutura legível: parágrafos curtos, headings, listas quando adequado
- [ ] Não há páginas "placeholder" ou com conteúdo mínimo ("em breve")
- [ ] Informações de contato/sobre acessíveis (constrói confiança — E-E-A-T)
- [ ] Política de privacidade presente (obrigatório para LGPD)

---

## Bloco 8 — Google Search Console

- [ ] Propriedade do site verificada no Search Console
- [ ] Sitemap submetido
- [ ] Nenhum erro crítico de cobertura de índice
- [ ] Ferramenta de Inspeção de URL testada na home e páginas principais
- [ ] Alertas de e-mail habilitados para problemas de segurança

---

## Bloco 9 — GEO (Otimização para IA Generativa)

- [ ] Conteúdo oferece perspectiva única que se destaca entre múltiplas fontes
- [ ] Informações factuais são precisas e verificáveis
- [ ] Estrutura clara facilita extração: perguntas respondidas diretamente
- [ ] Para negócios locais: Perfil da Empresa no Google atualizado
- [ ] Para e-commerce: produtos no Google Merchant Center
- [ ] Nenhum "hack" de GEO implementado (llms.txt especial, fragmentação artificial)

---

## Veredito

**Verde (pode indexar):** Todos Críticos e Altos resolvidos.
**Amarelo (indexar com cautela):** Médios pendentes — indexe mas corrija em 2 semanas.
**Vermelho (não indexar):** Qualquer Crítico aberto — resolva antes.

**Itens Críticos por bloco:**
- Bloco 1: HTTPS sem certificado, robots.txt bloqueando tudo, conteúdo inacessível
- Bloco 2: Soft-404 em páginas principais, cadeias de redirect quebradas
- Bloco 3: Ausência total de titles e h1
- Bloco 5: Core Web Vitals críticos no mobile
- Bloco 6: Dados estruturados com erros que causam penalidade (spam)
- Bloco 8: Propriedade não verificada no Search Console
