# SEO para E-commerce

Práticas específicas para lojas virtuais, marketplaces e sites com catálogo de produtos.

---

## Estrutura do Site

### Hierarquia de URLs recomendada
```
dominio.com/                              → Home
dominio.com/categoria/                    → Listagem de categoria
dominio.com/categoria/subcategoria/       → Subcategoria
dominio.com/categoria/produto-nome/       → Página de produto
dominio.com/marca/nome-da-marca/          → Listagem por marca
```

### Evitar URLs problemáticas
```
❌ /produtos?cat=12&sort=price&page=3&color=blue
✅ /camisetas-femininas/ (com filtros via canonical para URL base)
✅ /camisetas-femininas/azul/ (se gera volume de busca próprio)
```

---

## Páginas de Produto

### Checklist por página de produto
- [ ] `<title>` único: `[Nome Produto] [Variação] | [Marca]`
- [ ] `<meta name="description">` com preço, disponibilidade, benefício principal
- [ ] `<h1>` com nome completo do produto
- [ ] Descrição original (não copiar do fabricante — conteúdo duplicado com concorrentes)
- [ ] Múltiplas imagens do produto com `alt` descritivo
- [ ] Avaliações de clientes visíveis
- [ ] Informações claras: preço, disponibilidade, prazo de entrega, garantia
- [ ] Breadcrumb presente e clicável
- [ ] Produtos relacionados linkados
- [ ] Dados estruturados `Product` completos

### Dados estruturados de produto
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Tênis Running X-500 Masculino",
  "image": [
    "https://loja.com/tenis-x500-frente.jpg",
    "https://loja.com/tenis-x500-lateral.jpg",
    "https://loja.com/tenis-x500-traseira.jpg"
  ],
  "description": "Tênis de corrida masculino com tecnologia de amortecimento HydroFlex. Ideal para corridas de até 10km.",
  "brand": {
    "@type": "Brand",
    "name": "MarcaX"
  },
  "sku": "TX500-AZ-42",
  "gtin13": "7891234567890",
  "offers": {
    "@type": "Offer",
    "price": "299.90",
    "priceCurrency": "BRL",
    "priceValidUntil": "2024-12-31",
    "availability": "https://schema.org/InStock",
    "url": "https://loja.com/tenis-x500-azul-42/",
    "seller": {
      "@type": "Organization",
      "name": "Loja Esporte"
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": "0",
        "currency": "BRL"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 1,
          "unitCode": "DAY"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": 1,
          "maxValue": 5,
          "unitCode": "DAY"
        }
      }
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "234"
  }
}
```

---

## Páginas de Categoria e Listagem

### Problemas comuns e soluções

**Conteúdo mínimo em categorias:**
```html
<!-- ❌ Apenas grade de produtos — sem texto -->
<div class="category-page">
  <div class="product-grid">...</div>
</div>

<!-- ✅ Com introdução de categoria -->
<div class="category-page">
  <h1>Tênis de Corrida Masculino</h1>
  <p>Encontre os melhores tênis de corrida para homens. 
     Nossa seleção inclui modelos para iniciantes e corredores experientes, 
     com tecnologias de amortecimento, estabilidade e respirabilidade.</p>
  <div class="product-grid">...</div>
  <!-- Opcional: texto adicional ao final da página -->
</div>
```

**Paginação:**
```html
<!-- ✅ Para paginação — links para próxima e anterior -->
<link rel="prev" href="https://loja.com/camisetas/?page=2">
<link rel="next" href="https://loja.com/camisetas/?page=4">

<!-- ✅ Canonical em páginas de paginação (opcional — Google lida bem) -->
<!-- Use canonical para URL sem parâmetro apenas se preferir -->
```

**Filtros e facetas:**
```
Problema: /camisetas?cor=azul&tamanho=M&preco=100-200 cria URLs duplicadas

Solução 1: canonical apontando para /camisetas/ em todas as variações
Solução 2: parâmetros configurados como "não rastrear" no Search Console
Solução 3: URLs limpas por filtros com volume de busca (/camisetas-azuis/)
```

---

## Produto Esgotado ou Descontinuado

| Situação | Ação | Código HTTP |
|---------|------|-------------|
| Temporariamente esgotado | Manter página, informar previsão de retorno | 200 |
| Esgotado com retorno incerto | Manter com produtos similares linkados | 200 |
| Descontinuado (modelo antigo) | Redirect 301 para nova versão ou categoria | 301 |
| Produto nunca mais disponível | Redirect 301 para categoria ou produto similar | 301 |
| Sem substituto relevante | 410 Gone (melhor que 404 para produtos) | 410 |

**Nunca redirecionar para a home page** — redirect 301 de /produto-especifico/ para / é sinal de spam para o Google.

---

## Conteúdo Duplicado em E-commerce

### Fontes comuns de duplicação
1. **Variações de produto:** /tenis-azul-42/ e /tenis-azul-43/ com mesmo conteúdo
2. **Descrições do fabricante:** copiadas por múltiplas lojas
3. **Produtos em múltiplas categorias:** /homem/camisetas/produto/ e /oferta/produto/
4. **Parâmetros de URL:** ?sort=price, ?view=list, ?color=azul

### Soluções

**Para variações de produto:**
```html
<!-- Opção A: canonical da variante para a página mãe -->
<!-- Em /tenis-azul-43/ -->
<link rel="canonical" href="https://loja.com/tenis-x500/">

<!-- Opção B: uma URL por variação com conteúdo único (se há volume de busca) -->
<!-- /tenis-azul-42/ tem conteúdo específico sobre o tamanho 42 -->
```

**Para descrições de fabricante:**
- Reescrever descrições originalmente
- Adicionar avaliações de clientes (conteúdo único)
- Adicionar informações de uso, dicas, compatibilidade

**Para categorias cruzadas:**
```html
<!-- Produto em múltiplas categorias → canonical para URL primária -->
<link rel="canonical" href="https://loja.com/camisetas-masculinas/produto/">
```

---

## Google Merchant Center e Shopping

### Por que é importante para SEO/GEO
- Produtos aparecem no Google Shopping (topo das SERPs)
- Alimenta respostas de IA sobre produtos
- Melhora aparência nos resultados com preço e disponibilidade

### Requisitos mínimos do feed
- ID único do produto
- Título descritivo e preciso
- Descrição de qualidade
- Link para a página do produto
- Link da imagem principal
- Preço atualizado
- Disponibilidade (in stock, out of stock, preorder)

### Sincronização com dados estruturados
Merchant Center + dados estruturados `Product` na página devem ter informações consistentes:
- Preço igual
- Disponibilidade igual
- Título similar
- Imagem similar

Inconsistências podem causar rejeição de produtos no Merchant Center.

---

## SEO para Busca Interna

- [ ] Páginas de resultado de busca interna têm `noindex` (evitar indexação)
- [ ] URL de busca interna tem parâmetro identificável (para excluir no Search Console)
- [ ] Sem resultados de busca interna não indexados pelo Google

```html
<!-- Páginas de busca interna -->
<meta name="robots" content="noindex, follow">
```

---

## Reviews e Avaliações

Avaliações de clientes são conteúdo único e valioso para SEO:

- [ ] Sistema de avaliações implementado
- [ ] Avaliações visíveis na página (não apenas carregadas via JS após clique)
- [ ] Dados estruturados `Review` e `AggregateRating` configurados
- [ ] Avaliações reais de clientes (não fabricadas — viola políticas)
- [ ] Resposta a avaliações negativas (sinal de E-E-A-T)

---

## Performance em E-commerce

Sites de e-commerce têm desafios específicos de performance:

### Core Web Vitals — problemas comuns
- LCP: imagem de produto hero sem preload
- CLS: carregamento assíncrono de preço/estoque que desloca layout
- INP: filtros e ordenação com renderização pesada

### CLS com conteúdo dinâmico (preço/estoque)
```javascript
// ❌ Causa CLS — adiciona elemento após load
document.querySelector('.price').innerHTML = fetchedPrice;

// ✅ Reserva espaço com skeleton loader
// HTML inicial já tem o elemento com dimensão mínima reservada
```

### Imagens de produto
- Serve sempre em WebP/AVIF com fallback JPEG
- Múltiplas resoluções via srcset
- Imagem miniatura diferente da imagem full (não apenas resized)
- Lazy loading em imagens de grid de produto
- fetchpriority="high" na imagem principal do produto acima do fold
