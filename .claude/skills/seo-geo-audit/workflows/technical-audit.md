# Auditoria Técnica de SEO

Foco: rastreamento, indexação, performance, JavaScript SEO, estrutura técnica.

---

## Passo 1 — Diagnóstico Inicial

Execute estas verificações antes de mergulhar no código:

```bash
# Verificar headers HTTP
curl -I https://dominio.com
curl -I http://dominio.com  # deve redirecionar para HTTPS

# Verificar robots.txt
curl -s https://dominio.com/robots.txt

# Verificar sitemap
curl -s https://dominio.com/sitemap.xml | head -50
```

Para cada URL importante:
- Retorna código HTTP correto?
- Header `Content-Type` correto?
- Há `X-Robots-Tag: noindex` indesejado nos headers?

---

## Passo 2 — robots.txt

**Leia o arquivo** e verifique:

```
User-agent: *
Disallow: /admin/
Disallow: /private/
# ✅ OK — bloqueia apenas áreas administrativas

User-agent: Googlebot
Disallow: /
# ❌ CRÍTICO — bloqueia o Google inteiro
```

**Checklist:**
- [ ] CSS e JavaScript NÃO estão bloqueados
- [ ] Imagens NÃO estão bloqueadas (a menos que intencional)
- [ ] Sitemap declarado: `Sitemap: https://dominio.com/sitemap.xml`
- [ ] Nenhuma diretiva acidental bloqueia conteúdo principal
- [ ] Não confie no robots.txt para proteger dados sensíveis (use autenticação)

**Impacto de bloqueio incorreto:**
Googlebot não consegue renderizar a página corretamente → conteúdo não indexado ou classificado como vazio.

---

## Passo 3 — Sitemap XML

**Verificações:**
- [ ] Sitemap acessível em URL declarada
- [ ] Apenas URLs com `200 OK` no sitemap (sem 404, 301, noindex)
- [ ] Para sites grandes (>500 páginas): sitemap index com sitemaps separados por seção
- [ ] Datas `<lastmod>` precisas (não todas iguais — sinal de geração automática ruim)
- [ ] Para e-commerce: sitemap de imagens em `<image:image>`
- [ ] Para sites com vídeo: sitemap de vídeos

**Estrutura mínima válida:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dominio.com/pagina/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## Passo 4 — Canonicalização

**Para cada grupo de URLs que podem acessar o mesmo conteúdo:**

```html
<!-- ✅ Correto: canonical aponta para a URL preferida -->
<link rel="canonical" href="https://www.dominio.com/produto/nome-do-produto/" />

<!-- ❌ Errado: canonical relativo (pode causar problemas) -->
<link rel="canonical" href="/produto/nome-do-produto/" />

<!-- ❌ Errado: canonical ausente em página com parâmetros de filtro -->
<!-- https://loja.com/camisetas?cor=azul&tamanho=M sem canonical -->
```

**Checklist de duplicatas a resolver:**
- [ ] `www.dominio.com` vs `dominio.com` → canonical + redirect 301
- [ ] `http://` vs `https://` → redirect 301 + canonical HTTPS
- [ ] Trailing slash `/` vs sem trailing slash → escolha um, redirecione o outro
- [ ] Parâmetros de URL de filtro/ordenação em e-commerce → `rel="canonical"` para a URL base
- [ ] Páginas de paginação (`?page=2`) → canonical para a primeira página OU `rel="next"`/`rel="prev"`
- [ ] Versões mobile e desktop → canonical para versão desktop (se não for responsivo)

---

## Passo 5 — Redirecionamentos

**Tipos e quando usar:**
| Código | Tipo | Uso correto |
|--------|------|-------------|
| 301 | Permanente | URL mudou para sempre |
| 302 | Temporário | URL mudou temporariamente (promoção, manutenção) |
| 307 | Temporário (preserva método HTTP) | Redirecionar POST |
| 308 | Permanente (preserva método HTTP) | Redirecionar POST permanentemente |

**Problemas a verificar:**
- [ ] Sem cadeias de redirect longas (A→B→C→D) — máximo 2 saltos
- [ ] Sem redirect loops (A→B→A)
- [ ] Sitemaps não contêm URLs que redirecionam
- [ ] Links internos apontam para URLs finais, não para as redirecionadas
- [ ] Páginas deletadas retornam 410 (gone) ou 404, não redirect para home

---

## Passo 6 — JavaScript SEO

### Para frameworks SPA (React, Vue, Angular sem SSR):

**Problema central:** Googlebot renderiza JS, mas o processo é assíncrono e pode falhar.

**Verificar no HTML inicial (sem JS renderizado):**
```bash
curl -s https://dominio.com | grep -E "<title>|<meta name|<h1|<canonical"
```

Se os resultados principais aparecem apenas após JS renderizar → **risco de indexação**.

**Checklist:**
- [ ] Conteúdo principal presente no HTML servido ao servidor (SSR/SSG)
- [ ] `<title>` presente no HTML inicial (não apenas após hidratação)
- [ ] `<meta name="description">` presente no HTML inicial
- [ ] `<link rel="canonical">` presente e correto no HTML inicial
- [ ] SPA usa History API (`pushState`) para roteamento (não hash `#`)
- [ ] Páginas inexistentes retornam HTTP 404 (não 200 com "página não encontrada")
- [ ] Tag `noindex` NÃO é removida via JavaScript (Google pode processar antes da remoção)
- [ ] Imagens com lazy loading usam `loading="lazy"` nativo ou Intersection Observer

### Para Next.js:
- [ ] Páginas críticas usam `getServerSideProps` (SSR) ou `getStaticProps` (SSG)
- [ ] `next/head` usado corretamente para title e meta tags
- [ ] Não há `noindex` acidental em `_document.js`

### Para Nuxt.js:
- [ ] Modo SSR ou SSG ativo para páginas indexáveis
- [ ] `useHead()` ou `useSeoMeta()` configurados por página

### Dados estruturados em JavaScript:
```javascript
// ✅ Correto — JSON-LD injetado via script tag
const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(structuredData);
document.head.appendChild(script);
```

---

## Passo 7 — Core Web Vitals

**Ferramentas:** PageSpeed Insights, Chrome DevTools → Lighthouse, Search Console (Core Web Vitals report)

### LCP (Largest Contentful Paint) — Meta: < 2,5s
**Maiores causas de LCP ruim:**
- [ ] Imagem hero sem `fetchpriority="high"` e sem preload
- [ ] Fonte principal bloqueando renderização
- [ ] Servidor lento (TTFB alto)
- [ ] Imagem não otimizada (muito grande, formato antigo)

**Correção mínima:**
```html
<!-- Preload da imagem hero -->
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high">
<img src="/hero.webp" alt="..." fetchpriority="high">
```

### INP (Interaction to Next Paint) — Meta: < 200ms
- [ ] Event listeners pesados no main thread
- [ ] JavaScript de terceiros bloqueando interações
- [ ] Long tasks > 50ms no main thread

### CLS (Cumulative Layout Shift) — Meta: < 0,1
- [ ] Imagens sem `width` e `height` definidos
- [ ] Anúncios sem espaço reservado
- [ ] Fontes causando FOUT (Flash of Unstyled Text) sem `font-display: swap`
- [ ] Elementos injetados dinamicamente acima do conteúdo existente

---

## Passo 8 — Mobile e Usabilidade

- [ ] Viewport meta tag presente: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] Texto legível sem zoom (fonte mínima 16px recomendado)
- [ ] Botões e links com área de toque ≥ 48×48px
- [ ] Conteúdo não ultrapassa largura da tela (sem scroll horizontal)
- [ ] Pop-ups e intersticiais não cobrem o conteúdo principal logo ao carregar
- [ ] Anúncios não excessivos e não interferem com conteúdo

---

## Passo 9 — Segurança e Headers HTTP

```bash
# Verificar headers de segurança relevantes para SEO
curl -I https://dominio.com | grep -i "strict-transport\|x-content-type\|referrer-policy"
```

- [ ] `Strict-Transport-Security` presente (HSTS)
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy` configurado

---

## Relatório Técnico

Para cada achado, inclua:
- URL ou arquivo específico
- Código atual (curl output, HTML snippet)
- Impacto esperado na indexação/ranking
- Correção com código exato
- Prioridade: Crítico / Alto / Médio / Baixo
