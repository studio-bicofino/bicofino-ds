# SEO Técnico — Core Web Vitals, Mobile, HTTPS, Performance

---

## Core Web Vitals

Métricas essenciais dos sistemas de classificação do Google. Parte do "Page Experience" como sinal de ranking.

### LCP — Largest Contentful Paint (Meta: < 2,5s)

**O que mede:** Tempo até o maior elemento visível renderizar (geralmente imagem hero ou bloco de texto principal).

**Principais causas de LCP ruim:**

| Causa | Solução |
|-------|---------|
| Servidor lento (TTFB alto) | CDN, cache, hospedagem melhor |
| Imagem hero sem preload | `<link rel="preload" as="image">` + `fetchpriority="high"` |
| Imagem hero em formato pesado | Converter para WebP/AVIF |
| Fonte web bloqueando texto | `font-display: swap`, preload da fonte |
| JS bloqueando renderização | Defer/async, code splitting |

**Implementação para imagem hero:**
```html
<!-- Na <head> — preload da imagem LCP -->
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high"
      imagesrcset="/hero-400.webp 400w, /hero-800.webp 800w, /hero-1200.webp 1200w"
      imagesizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px">

<!-- No body -->
<img src="/hero.webp"
     srcset="/hero-400.webp 400w, /hero-800.webp 800w, /hero-1200.webp 1200w"
     sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
     alt="Descrição da imagem hero"
     width="1200" height="600"
     fetchpriority="high">
     <!-- NÃO use loading="lazy" na imagem LCP -->
```

### INP — Interaction to Next Paint (Meta: < 200ms)

**O que mede:** Latência da interação mais lenta do usuário (clique, toque, teclado) para próxima renderização.

**Principais causas:**
- Long tasks (> 50ms) no main thread durante interação
- JavaScript de terceiros pesado (chat, analytics, ads)
- Eventos síncronos em handlers de clique

**Diagnóstico no Chrome:**
1. DevTools → Performance → gravar interação
2. Identificar tasks longas (vermelho)
3. Usar `scheduler.postTask()` ou `setTimeout` para dividir tasks

**Código problemático:**
```javascript
// ❌ Bloqueia main thread
button.addEventListener('click', () => {
  const result = heavyCalculation(); // sincronamente
  updateUI(result);
});

// ✅ Melhor — divide a task
button.addEventListener('click', async () => {
  updateUIWithLoading();
  const result = await new Promise(resolve => {
    setTimeout(() => resolve(heavyCalculation()), 0);
  });
  updateUI(result);
});
```

### CLS — Cumulative Layout Shift (Meta: < 0,1)

**O que mede:** Soma de todas as mudanças inesperadas de layout durante o ciclo de vida da página.

**Principais causas:**

```html
<!-- ❌ Causa CLS — imagem sem dimensões -->
<img src="produto.jpg" alt="Produto">

<!-- ✅ Reserva espaço — sem CLS -->
<img src="produto.jpg" alt="Produto" width="400" height="300">

<!-- ❌ Causa CLS — ad container sem altura reservada -->
<div class="ad-container"></div>

<!-- ✅ Reserva espaço para anúncio -->
<div class="ad-container" style="min-height: 250px;"></div>

<!-- ❌ Causa CLS — fonte causando FOUT -->
@font-face {
  font-family: 'MinhaFonte';
  src: url('/fonte.woff2');
}

<!-- ✅ Evita FOUT com font-display: swap -->
@font-face {
  font-family: 'MinhaFonte';
  src: url('/fonte.woff2') format('woff2');
  font-display: swap;
}
```

### Ferramentas de diagnóstico
- **PageSpeed Insights:** pagespeed.web.dev — Core Web Vitals por URL
- **Chrome DevTools → Lighthouse:** audit local com sugestões
- **Search Console → Core Web Vitals:** dados reais de usuários (CrUX)
- **web.dev/measure:** análise detalhada

---

## HTTPS e Segurança

### Verificações
```bash
# Verificar certificado
curl -I https://dominio.com

# Verificar redirect HTTP → HTTPS
curl -I http://dominio.com

# Verificar HSTS
curl -I https://dominio.com | grep -i strict
```

### Configuração mínima
```apache
# Apache — redirecionar HTTP para HTTPS
<VirtualHost *:80>
  ServerName dominio.com
  Redirect permanent / https://dominio.com/
</VirtualHost>

# HSTS no servidor
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

```nginx
# Nginx — redirecionar HTTP para HTTPS
server {
  listen 80;
  server_name dominio.com www.dominio.com;
  return 301 https://dominio.com$request_uri;
}

# HSTS
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### Sinais de problema
- Conteúdo misto (mixed content): página HTTPS carrega recursos HTTP
- Certificado expirado ou inválido
- Domínio www e não-www sem redirect consistente

---

## Mobile-Friendly

### Viewport meta tag (obrigatório)
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

### Checklist mobile
- [ ] Viewport configurado corretamente
- [ ] Texto legível sem zoom (mínimo 16px para corpo do texto)
- [ ] Área de toque dos botões ≥ 48×48px (Google recomenda ≥ 48dp)
- [ ] Elementos não se sobrepõem em telas pequenas
- [ ] Sem scroll horizontal
- [ ] Conteúdo não requer orientação específica (funciona em portrait e landscape)

### Elementos interativos com área adequada
```css
/* ✅ Botão com área de toque adequada */
.button {
  min-height: 48px;
  min-width: 48px;
  padding: 12px 24px;
  font-size: 16px;
}

/* ✅ Links de navegação */
nav a {
  display: inline-block;
  min-height: 48px;
  line-height: 48px;
  padding: 0 16px;
}
```

### Teste
- Google Mobile-Friendly Test: search.google.com/test/mobile-friendly
- DevTools → Responsive design mode

---

## Performance Geral

### Priorização de recursos críticos
```html
<head>
  <!-- 1. DNS prefetch para domínios de terceiros -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  <link rel="dns-prefetch" href="//analytics.google.com">

  <!-- 2. Preconnect para recursos críticos de terceiros -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- 3. Preload de recursos críticos -->
  <link rel="preload" href="/fonte-principal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/hero.webp" as="image" fetchpriority="high">
  <link rel="preload" href="/styles-criticos.css" as="style">

  <!-- 4. CSS crítico inline ou no topo -->
  <style>/* CSS acima do fold inline */</style>
  <link rel="stylesheet" href="/styles.css">
</head>

<!-- 5. Scripts não críticos com defer ou async -->
<script defer src="/main.js"></script>
<script async src="https://analytics.example.com/analytics.js"></script>
```

### Lazy loading
```html
<!-- ✅ Imagens abaixo do fold -->
<img src="imagem.jpg" alt="..." width="800" height="600" loading="lazy">

<!-- ❌ NÃO use lazy na imagem LCP (acima do fold) -->
<img src="hero.jpg" alt="..." loading="lazy"> <!-- ruim para LCP -->

<!-- ✅ Iframes (vídeos embed) -->
<iframe src="https://www.youtube.com/embed/ID"
        loading="lazy"
        title="Título do vídeo"
        width="560" height="315">
</iframe>
```

### Fontes web
```css
/* ✅ Fontes auto-hospedadas (mais rápidas) */
@font-face {
  font-family: 'MinhaFonte';
  src: url('/fonts/fonte.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Evita texto invisível */
}

/* ✅ Subset de caracteres para reduzir tamanho */
@font-face {
  font-family: 'MinhaFonte';
  src: url('/fonts/fonte-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF; /* Latin básico */
}
```

---

## Intersticiais e Anúncios

O Google penaliza páginas com intersticiais que prejudicam a experiência mobile:

### O que evitar
```
❌ Pop-up que cobre o conteúdo logo após o clique nos resultados de busca
❌ Banner que ocupa tela inteira antes de exibir conteúdo
❌ Layout que empurra conteúdo principal para baixo da tela

✅ Pop-up de aceite de cookies (obrigatório por lei — permitido)
✅ Banner de verificação de idade (requerimento legal — permitido)
✅ Intersticiais após interação do usuário (não imediatamente ao chegar)
✅ Banners pequenos não intrusivos (facilmente dispensáveis)
```

### Anúncios
- Não devem desviar a atenção principal do conteúdo
- Não devem sobrepor conteúdo de forma que dificulte leitura
- Espaço reservado para evitar CLS
- Não devem fazer scroll automático para o anúncio

---

## Headers HTTP para SEO

```bash
# Verificar todos os headers
curl -I https://dominio.com
```

### Headers relevantes para SEO

```
# HTTPS obrigatório
Strict-Transport-Security: max-age=31536000; includeSubDomains

# Controle de indexação via header (alternativa a meta robots)
X-Robots-Tag: noindex
X-Robots-Tag: nosnippet
X-Robots-Tag: max-snippet:100

# Cache — para performance
Cache-Control: public, max-age=31536000, immutable  # assets com hash
Cache-Control: public, max-age=3600, must-revalidate  # HTML

# Compressão — sempre habilitar
Content-Encoding: gzip  (ou br para Brotli)

# Tipo de conteúdo correto
Content-Type: text/html; charset=utf-8
```

---

## Checklist de Diagnóstico Rápido

Execute para um diagnóstico inicial:

```bash
# 1. Verificar redirect HTTP → HTTPS
curl -sI http://dominio.com | grep "Location:"

# 2. Verificar HTTPS
curl -sI https://dominio.com | grep -E "HTTP/|Content-Type|X-Robots"

# 3. Verificar robots.txt
curl -s https://dominio.com/robots.txt

# 4. Verificar sitemap
curl -sI https://dominio.com/sitemap.xml | grep "HTTP/"

# 5. Verificar title na home
curl -s https://dominio.com | grep -i "<title>"

# 6. Verificar canonical na home
curl -s https://dominio.com | grep -i 'rel="canonical"'

# 7. Verificar meta description na home
curl -s https://dominio.com | grep -i 'name="description"'
```
