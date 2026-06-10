# Rastreamento e Indexação

Referência consolidada sobre sitemaps, robots.txt, canonicalização, redirecionamentos e JavaScript SEO.

---

## robots.txt

### Propósito correto
- Gerenciar volume de requisições do Googlebot ao servidor
- Evitar rastreamento de conteúdo irrelevante (páginas admin, staging)
- **NÃO** serve para remover páginas dos resultados de busca
- **NÃO** oferece segurança real (rastreadores mal-intencionados ignoram)

### Limitações críticas
1. Páginas bloqueadas podem aparecer nos resultados se outros sites linkarem para elas (sem snippet)
2. Rastreadores de terceiros podem ignorar robots.txt
3. Diferentes rastreadores interpretam a sintaxe de formas distintas
4. Combinar múltiplas regras pode causar conflitos

### Formato correto
```
User-agent: *
Disallow: /admin/
Disallow: /internal/
Disallow: /search?
Allow: /

Sitemap: https://dominio.com/sitemap.xml
```

### O que NÃO bloquear
```
# ❌ NUNCA bloqueie estes recursos
User-agent: Googlebot
Disallow: /assets/css/   # CSS necessário para renderização
Disallow: /assets/js/    # JS necessário para conteúdo
Disallow: /images/       # imagens necessárias para avaliação
```

### Para remover páginas dos resultados: use noindex
```html
<!-- Na página que quer remover dos resultados -->
<meta name="robots" content="noindex">
<!-- ou via header HTTP -->
X-Robots-Tag: noindex
```

### Para proteger dados sensíveis: use autenticação
- Autenticação por senha no servidor
- Não confiar em robots.txt para proteger URLs privadas

---

## Sitemaps XML

### Quando são essenciais
- Sites com > 500 páginas
- Sites novos com poucos links externos
- Sites com mídia (imagens, vídeos)
- Conteúdo que não é facilmente alcançável via navegação

### Quando não são necessários
- Sites pequenos (< 500 páginas) bem estruturados
- Sites com boa linkagem interna

### Formato XML básico
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dominio.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dominio.com/artigo/titulo/</loc>
    <lastmod>2024-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Sitemap Index (para sites grandes)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://dominio.com/sitemap-posts.xml</loc>
    <lastmod>2024-01-15</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://dominio.com/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://dominio.com/sitemap-products.xml</loc>
  </sitemap>
</sitemapindex>
```

### Sitemap de imagens
```xml
<url>
  <loc>https://dominio.com/receita/pao/</loc>
  <image:image>
    <image:loc>https://cdn.dominio.com/imagens/pao-fermentacao.jpg</image:loc>
    <image:title>Pão de fermentação natural</image:title>
    <image:caption>Pão artesanal com crosta crocante</image:caption>
  </image:image>
</url>
```

**Nota:** `<image:loc>` pode referenciar URLs de CDNs externos — permitido em sitemaps de imagem.

### Sitemap de vídeos
```xml
<url>
  <loc>https://dominio.com/video/tutorial-pao/</loc>
  <video:video>
    <video:thumbnail_loc>https://dominio.com/thumb/pao.jpg</video:thumbnail_loc>
    <video:title>Como fazer pão de fermentação natural</video:title>
    <video:description>Tutorial completo passo a passo</video:description>
    <video:content_loc>https://dominio.com/videos/pao.mp4</video:content_loc>
    <video:duration>1800</video:duration>
  </video:video>
</url>
```

### Regras críticas para sitemaps
- **Somente URLs canônicas** no sitemap
- **Sem URLs com noindex** no sitemap
- **Sem URLs que redirecionam** (use o destino final)
- **Sem URLs retornando 404/410**
- Submetê-lo no Search Console

---

## Canonicalização

### Quando ocorre duplicação
- `www.dominio.com` vs `dominio.com`
- `http://` vs `https://`
- Trailing slash: `/produto/` vs `/produto`
- Parâmetros de URL: `/produtos?sort=price` vs `/produtos`
- Variantes de dispositivo (se não responsivo)
- Conteúdo em múltiplos idiomas com partes iguais

### Como indicar canonical
```html
<!-- Na <head> de todas as páginas -->
<link rel="canonical" href="https://www.dominio.com/pagina-preferida/" />
```

### Regras importantes
1. Usar URL absoluta (com protocolo e domínio) — não relativa
2. A URL canônica deve retornar 200
3. A URL canônica deve estar no sitemap
4. Canonical é uma **dica** para o Google, não uma regra obrigatória — o Google pode ignorar se houver sinais conflitantes
5. Uma página pode apontar para si mesma como canonical (self-referential canonical)

### Para páginas com parâmetros (e-commerce)
```html
<!-- Página: /camisetas?cor=azul&tamanho=M -->
<link rel="canonical" href="https://dominio.com/camisetas/" />
<!-- Aponta para a página de categoria base -->
```

### Redirecionamento vs canonical
| Situação | Use |
|---------|-----|
| Pode redirecionar (não mantém URL antiga) | Redirect 301 |
| Deve manter ambas as URLs funcionais | rel="canonical" |
| Parâmetros de filtro/ordenação | rel="canonical" para URL base |
| Paginação | rel="canonical" + rel="next/prev" |

---

## Redirecionamentos

### Tipos de redirecionamento
| Código | Tipo | Uso | Impacto SEO |
|--------|------|-----|-------------|
| 301 | Permanente | URL mudou para sempre | Passa a maioria do link equity |
| 302 | Temporário | Mudança temporária | Pode não passar link equity |
| 307 | Temporário (preserva método) | POST temporário | Similar ao 302 |
| 308 | Permanente (preserva método) | POST permanente | Similar ao 301 |
| 410 | Gone | Conteúdo deletado permanentemente | Sinal mais forte que 404 |

### Boas práticas
```
✅ A → B (1 salto)
✅ A → B → C (2 saltos, aceitável)
❌ A → B → C → D → E (cadeia longa, prejudica performance e link equity)
❌ A → B → A (loop — nunca chegará à página)
```

- Atualizar links internos para apontar diretamente para URL final (não via redirect)
- Sitemaps devem conter apenas URLs finais (não redirecionadas)
- Redirect 301 de HTTP → HTTPS em toda URL
- Redirect 301 de non-www → www (ou vice-versa, conforme canonical)

---

## JavaScript SEO

### Como o Googlebot processa JavaScript
1. Rastreia a URL e baixa o HTML inicial
2. Enfileira para renderização (pode levar horas/dias em sites grandes)
3. Executa JavaScript via Chromium headless
4. Indexa o conteúdo renderizado

### Risco principal
Conteúdo que depende 100% de JavaScript para existir pode:
- Não ser indexado se a renderização falhar
- Ser indexado com atraso significativo
- Ter qualidade diferente da percebida pelo usuário

### Checklist para sites com JavaScript

**Verificação rápida:**
```bash
# HTML inicial (sem JS)
curl -s https://dominio.com | grep -E "<title>|<h1|<meta name=\"description\""

# Se não retornar nada → conteúdo depende de JS → risco de indexação
```

**Para SPAs (React, Vue, Angular sem SSR):**
- [ ] Implementar SSR (Server-Side Rendering) ou SSG (Static Site Generation)
- [ ] Content principal presente no HTML servido ao servidor
- [ ] Title e meta description no HTML inicial

**Para Next.js:**
```javascript
// ✅ SSR — conteúdo presente no HTML inicial
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}

// ✅ SSG — gerado em build time
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}
```

**Roteamento:**
```javascript
// ✅ Correto — History API
window.history.pushState({}, '', '/nova-url');

// ❌ Errado — hash fragments
window.location.hash = '#nova-secao'; // Googlebot não processa confiável
```

**Códigos de status:**
```javascript
// ✅ SPA que retorna 404 corretamente
if (!pageFound) {
  res.status(404); // no servidor (Next.js/Nuxt.js)
}

// ❌ Soft-404 — retorna 200 com "página não encontrada"
// Google pode indexar a mensagem de erro
```

**Tag noindex em JavaScript:**
```javascript
// ❌ PROBLEMÁTICO — Google pode processar antes de remover
// Não remova noindex via JavaScript após carregamento
```

**Dados estruturados em JS:**
```javascript
// ✅ Injeção de JSON-LD via JavaScript é aceita pelo Google
const ld = document.createElement('script');
ld.type = 'application/ld+json';
ld.text = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Título do artigo"
});
document.head.appendChild(ld);
```

**Componentes Web / Shadow DOM:**
```html
<!-- ✅ Use <slot> para que conteúdo seja visível no HTML renderizado -->
<my-component>
  <p slot="content">Texto indexável</p>
</my-component>
```

---

## Metatags de Robôs

### Via HTML
```html
<!-- Indexável e rastreável (padrão) -->
<meta name="robots" content="index, follow">

<!-- Não indexar, mas seguir links -->
<meta name="robots" content="noindex, follow">

<!-- Indexar, mas não seguir links -->
<meta name="robots" content="index, nofollow">

<!-- Não indexar, não seguir links -->
<meta name="robots" content="noindex, nofollow">

<!-- Específico para Googlebot -->
<meta name="googlebot" content="noindex">
```

### Via header HTTP
```
X-Robots-Tag: noindex
X-Robots-Tag: nosnippet
X-Robots-Tag: max-snippet:150
X-Robots-Tag: max-image-preview:large
```

### Atenção
- `robots.txt` não garante que página não será indexada se houver links externos para ela
- `noindex` é o método correto para remover da indexação
- Se página tem `noindex` via robots.txt bloqueado, o Google não consegue ver o noindex → conflito → pode indexar
