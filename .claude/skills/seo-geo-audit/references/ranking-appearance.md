# Ranking e Aparência nos Resultados

Referência sobre title tags, meta descriptions, imagens, vídeos, dados estruturados e outros elementos que afetam a aparência nos resultados de busca.

---

## Title Tags (`<title>`)

### Importância
- Principal fator de CTR (taxa de cliques) nos resultados
- Primeira impressão do usuário sobre a página
- Exibido em abas do navegador e bookmarks

### Como o Google gera Title Links
O Google pode usar diversas fontes para o title link exibido:
1. `<title>` tag (principal)
2. `<h1>` da página
3. Títulos visuais proeminentes
4. `og:title`
5. Dados estruturados `WebSite` com `name`
6. Anchor text de links externos/internos

### Boas práticas
```html
<!-- ✅ Bom — home page com marca -->
<title>Padaria do João — Pão Artesanal em São Paulo</title>

<!-- ✅ Bom — página de produto -->
<title>Tênis Running X-500 Masculino Azul | Loja Esporte</title>

<!-- ✅ Bom — artigo de blog -->
<title>Como fazer pão de fermentação natural: guia para iniciantes</title>

<!-- ❌ Ruim — vago -->
<title>Início</title>

<!-- ❌ Ruim — keyword stuffing -->
<title>Pão, receita pão, pão artesanal, fermentação natural, como fazer pão</title>

<!-- ❌ Ruim — idêntico em todas as páginas -->
<title>Padaria do João</title>
```

### Comprimento recomendado
- ~50-60 caracteres para evitar truncamento no desktop
- Mobile pode truncar antes
- Sem limite técnico, mas texto além do limite não é exibido

### Dicas avançadas
- Inclua localização em títulos para negócios locais: "Dentista em Curitiba — Clínica X"
- Evite preços em titles de produtos (flutuam e ficam desatualizados)
- Idioma e alfabeto do title deve corresponder ao conteúdo da página

---

## Meta Description

### Importância
- NÃO é fator de ranking direto
- Afeta significativamente o CTR
- Pode ser substituída pelo Google por texto da própria página
- Aparece como snippet nos resultados

### Boas práticas
```html
<!-- ✅ Bom — artigo de receita -->
<meta name="description" content="Aprenda a fazer pão de fermentação natural em casa com nossa receita testada por 3 anos. Inclui dicas para iniciantes e erros comuns a evitar.">

<!-- ✅ Bom — produto -->
<meta name="description" content="Tênis Running X-500 com amortecimento HydroFlex e cabedal respirável. Disponível em 6 cores. Frete grátis para compras acima de R$ 199.">

<!-- ✅ Bom — serviço local -->
<meta name="description" content="Consultoria de marketing digital em BH. Estratégias de SEO, Google Ads e Social Media para PMEs. Mais de 200 clientes atendidos. Orçamento grátis.">

<!-- ❌ Ruim — lista de palavras-chave -->
<meta name="description" content="pão, artesanal, fermentação, natural, receita, como fazer, caseiro">

<!-- ❌ Ruim — sem motivação para clicar -->
<meta name="description" content="Esta página contém informações sobre nosso produto.">
```

### Comprimento recomendado
- 120-158 caracteres
- Mobile: ~120 caracteres antes do truncamento
- Desktop: ~155-160 caracteres

### Controles de snippet
```html
<!-- Sem snippet exibido -->
<meta name="robots" content="nosnippet">

<!-- Snippet limitado a 100 caracteres -->
<meta name="robots" content="max-snippet:100">

<!-- Impedir preview de imagem -->
<meta name="robots" content="max-image-preview:none">

<!-- Para seções específicas: atributo no HTML -->
<p data-nosnippet>Este trecho não será usado como snippet.</p>
```

---

## Open Graph e Social Meta Tags

```html
<!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
<meta property="og:type" content="website">
<meta property="og:title" content="Título da Página">
<meta property="og:description" content="Descrição atraente para compartilhamento.">
<meta property="og:image" content="https://dominio.com/imagem-og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://dominio.com/pagina/">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Nome do Site">

<!-- Twitter/X Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Título da Página">
<meta name="twitter:description" content="Descrição para Twitter.">
<meta name="twitter:image" content="https://dominio.com/imagem-twitter.jpg">
<meta name="twitter:site" content="@nomedomarca">
```

### Dimensões de imagem OG recomendadas
- Mínimo: 600×315px
- Recomendado: 1200×630px
- Proporção: 1.91:1

---

## Imagens — Otimização Completa

### Descoberta pelo Google
```html
<!-- ✅ Indexável -->
<img src="/foto-produto.jpg" alt="Tênis azul de corrida">

<!-- ❌ Não indexável — CSS background -->
.hero { background-image: url('/imagem-hero.jpg'); }
```

### Alt text
```html
<!-- ✅ Bom — descritivo e contextual -->
<img src="pao-fermentacao.jpg" alt="Pão de fermentação natural com crosta dourada recém-saído do forno">

<!-- ✅ Bom — produto -->
<img src="tenis-x500.jpg" alt="Tênis Running X-500 masculino na cor azul marinho, vista lateral">

<!-- ❌ Ruim — keyword stuffing -->
<img src="pao.jpg" alt="pão pão artesanal pão fermentação natural receita pão">

<!-- ❌ Ruim — não descritivo -->
<img src="imagem1.jpg" alt="imagem">

<!-- ❌ Ruim — ausente em imagem com conteúdo -->
<img src="grafico-vendas.jpg">
<!-- Para imagens decorativas, use alt="" -->
<img src="divisor.png" alt="" role="presentation">
```

### Formatos e otimização
```html
<!-- ✅ Responsivo com formatos modernos e fallback -->
<picture>
  <source srcset="/imagem.avif" type="image/avif">
  <source srcset="/imagem.webp" type="image/webp">
  <img src="/imagem.jpg" alt="Descrição" width="800" height="600" loading="lazy">
</picture>

<!-- ✅ Srcset para múltiplas resoluções -->
<img
  src="/imagem-800.jpg"
  srcset="/imagem-400.jpg 400w, /imagem-800.jpg 800w, /imagem-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
  alt="Descrição"
  width="800"
  height="600"
  loading="lazy"
>
```

### Imagem principal da página
```html
<!-- Indica ao Google qual é a imagem principal -->
<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://dominio.com/imagem-principal.jpg"
    }
  }
  </script>
</head>
```

### Nomes de arquivo
```
✅ cachorro-golden-retriever-brincando.jpg
✅ produto-tenis-corrida-azul.webp
❌ IMG_20240115_093412.jpg
❌ image001.png
❌ untitled.jpg
```

---

## Vídeos — Otimização para Resultados

### Elementos HTML aceitos
```html
<!-- HTML5 nativo (preferido) -->
<video controls>
  <source src="/video.mp4" type="video/mp4">
  <source src="/video.webm" type="video/webm">
  <track kind="subtitles" src="/legendas-ptbr.vtt" srclang="pt" label="Português">
</video>

<!-- Embed de plataforma (YouTube/Vimeo) -->
<iframe src="https://www.youtube.com/embed/VIDEO_ID" 
        title="Título descritivo do vídeo"
        width="800" height="450"
        allowfullscreen>
</iframe>
```

### Dados estruturados para vídeo
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Como fazer pão de fermentação natural",
  "description": "Tutorial completo para iniciantes",
  "thumbnailUrl": "https://dominio.com/thumb-pao.jpg",
  "uploadDate": "2024-01-15T08:00:00+00:00",
  "duration": "PT15M30S",
  "contentUrl": "https://dominio.com/videos/pao.mp4",
  "embedUrl": "https://dominio.com/videos/embed/pao",
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": "https://schema.org/WatchAction",
    "userInteractionCount": 5647
  },
  "hasPart": [
    {
      "@type": "Clip",
      "name": "Misturando os ingredientes",
      "startOffset": 120,
      "endOffset": 300
    }
  ]
}
```

### Miniatura de vídeo
- Mínimo: 60×30px (use imagens maiores para melhor aparência)
- Formatos: BMP, GIF, JPEG, PNG, WebP, SVG, AVIF
- URL deve ser estável e acessível
- Pelo menos 80% dos pixels com alfa > 250 (sem transparência excessiva)

---

## Dados Estruturados — Guia Completo

### Formato preferido: JSON-LD
```html
<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Como fazer pão de fermentação natural",
    "author": {
      "@type": "Person",
      "name": "João Silva",
      "url": "https://dominio.com/autor/joao-silva"
    },
    "datePublished": "2024-01-15",
    "dateModified": "2024-06-01",
    "image": "https://dominio.com/pao-foto.jpg",
    "publisher": {
      "@type": "Organization",
      "name": "Padaria do João",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dominio.com/logo.png"
      }
    }
  }
  </script>
</head>
```

### Tipos por categoria de site

**Todos os sites:**
```json
// WebSite — home page
{
  "@type": "WebSite",
  "name": "Nome do Site",
  "url": "https://dominio.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://dominio.com/busca?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

// Organization — home page
{
  "@type": "Organization",
  "name": "Nome da Empresa",
  "url": "https://dominio.com",
  "logo": "https://dominio.com/logo.png",
  "sameAs": [
    "https://www.facebook.com/empresa",
    "https://www.instagram.com/empresa",
    "https://www.linkedin.com/company/empresa"
  ]
}
```

**Blog / Notícias:**
```json
{
  "@type": "Article",
  "headline": "Título do Artigo",
  "author": {"@type": "Person", "name": "Nome do Autor"},
  "datePublished": "2024-01-15",
  "dateModified": "2024-06-01",
  "image": "https://dominio.com/imagem.jpg"
}
```

**E-commerce:**
```json
{
  "@type": "Product",
  "name": "Nome do Produto",
  "image": "https://dominio.com/produto.jpg",
  "description": "Descrição do produto",
  "brand": {"@type": "Brand", "name": "Marca"},
  "sku": "SKU-001",
  "offers": {
    "@type": "Offer",
    "price": "299.00",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock",
    "url": "https://dominio.com/produto/nome"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "127"
  }
}
```

**Negócio local:**
```json
{
  "@type": "LocalBusiness",
  "name": "Nome do Negócio",
  "image": "https://dominio.com/foto-estabelecimento.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Exemplo, 123",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "postalCode": "01310-100",
    "addressCountry": "BR"
  },
  "telephone": "+55-11-99999-9999",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -23.5505,
    "longitude": -46.6333
  }
}
```

**FAQ:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quanto tempo leva o processo de fermentação natural?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O processo leva entre 12 e 48 horas dependendo da temperatura ambiente e da hidratação da massa."
      }
    }
  ]
}
```

**Breadcrumb:**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Início", "item": "https://dominio.com/"},
    {"@type": "ListItem", "position": 2, "name": "Receitas", "item": "https://dominio.com/receitas/"},
    {"@type": "ListItem", "position": 3, "name": "Pão Artesanal", "item": "https://dominio.com/receitas/pao-artesanal/"}
  ]
}
```

### Regras obrigatórias de dados estruturados
1. Dados devem corresponder ao conteúdo visível na página
2. Propriedades obrigatórias do tipo devem estar presentes
3. Validar com Rich Results Test antes de publicar
4. Não criar páginas vazias apenas para hospedar dados estruturados
5. Não marcar conteúdo invisível ao usuário

### Ferramentas de validação
- Rich Results Test: search.google.com/test/rich-results
- Schema Markup Validator: validator.schema.org
- Search Console → Pesquisas aprimoradas (após indexação)

---

## Favicon

```html
<!-- Formatos suportados: ICO, PNG, SVG (moderno) -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<!-- Manifest para PWA -->
<link rel="manifest" href="/site.webmanifest">
```

- Tamanho mínimo: 48×48px
- Deve ser quadrado ou próximo disso
- Acessível em `/favicon.ico` (padrão)
- Não usar imagens inapropriadas (viola políticas do Google)
