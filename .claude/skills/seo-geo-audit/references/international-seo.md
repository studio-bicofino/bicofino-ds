# SEO Internacional — Sites Multilíngues e Multi-regionais

---

## Conceitos Fundamentais

### Multilíngue vs Multi-regional

| Tipo | Definição | Exemplo |
|------|-----------|---------|
| **Multilíngue** | Conteúdo em mais de um idioma | Mesmo conteúdo em PT e EN |
| **Multi-regional** | Segmenta usuários em países específicos | Versão BR e versão PT |
| **Ambos** | Idiomas e regiões diferentes | PT-BR, PT-PT, EN-US, EN-GB |

### Como o Google determina o idioma
- Analisa o **conteúdo visível da página** — não o atributo `lang` do HTML
- Não usa cookies ou preferências do navegador para indexação
- Não varia a origem do Googlebot para detectar variações

---

## hreflang — Anotações de Idioma e Região

### O que faz
Informa ao Google sobre versões alternativas de uma página em outros idiomas/regiões, garantindo que o resultado correto seja exibido para cada usuário.

### Implementação via HTML (na `<head>`)
```html
<!-- Página principal em Português do Brasil -->
<link rel="alternate" hreflang="pt-BR" href="https://dominio.com/pt-br/pagina/">
<link rel="alternate" hreflang="pt-PT" href="https://dominio.com/pt-pt/pagina/">
<link rel="alternate" hreflang="en-US" href="https://dominio.com/en-us/pagina/">
<link rel="alternate" hreflang="en-GB" href="https://dominio.com/en-gb/pagina/">
<!-- x-default: fallback para usuários sem correspondência -->
<link rel="alternate" hreflang="x-default" href="https://dominio.com/pagina/">
```

### Implementação via Sitemap (recomendado para sites grandes)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://dominio.com/pt-br/artigo/</loc>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://dominio.com/pt-br/artigo/"/>
    <xhtml:link rel="alternate" hreflang="pt-PT" href="https://dominio.com/pt-pt/artigo/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://dominio.com/en/artigo/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://dominio.com/en/artigo/"/>
  </url>
  <url>
    <loc>https://dominio.com/pt-pt/artigo/</loc>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://dominio.com/pt-br/artigo/"/>
    <xhtml:link rel="alternate" hreflang="pt-PT" href="https://dominio.com/pt-pt/artigo/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://dominio.com/en/artigo/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://dominio.com/en/artigo/"/>
  </url>
</urlset>
```

### Regras críticas do hreflang
1. **Recíproco:** Se página A aponta para página B via hreflang, página B deve apontar de volta para A
2. **Self-referencial:** Cada página deve incluir seu próprio hreflang
3. **x-default:** Use para a versão "genérica" sem idioma/região específico
4. **URLs absolutas:** Sempre use URLs completas (com protocolo e domínio)
5. **Todos os idiomas em cada página:** Cada versão lista todas as alternativas

### Códigos de idioma e região
```
Apenas idioma:    hreflang="pt" (qualquer Português)
Idioma + região:  hreflang="pt-BR" (Português do Brasil)
                  hreflang="pt-PT" (Português de Portugal)
                  hreflang="en-US" (Inglês dos EUA)
                  hreflang="es" (Espanhol genérico)
Fallback:         hreflang="x-default" (padrão quando nenhum combina)
```

---

## Estruturas de URL para Sites Internacionais

### Opção 1 — ccTLD (Country Code Top-Level Domain)
```
dominio.com.br   → Brasil
dominio.pt       → Portugal
dominio.co.uk    → Reino Unido
dominio.mx       → México
```
**Vantagens:** Sinal de geolocalização muito forte; percepção de site local pelos usuários
**Desvantagens:** Custo alto (múltiplos domínios); infraestrutura separada; SEO começa do zero em cada domínio

### Opção 2 — Subdomínios
```
br.dominio.com   → Brasil
pt.dominio.com   → Portugal
en.dominio.com   → Inglês
```
**Vantagens:** Fácil configuração; pode ter servidores diferentes por região
**Desvantagens:** Tratado como site separado — autoridade não é totalmente compartilhada

### Opção 3 — Subdiretórios (Recomendado na maioria dos casos)
```
dominio.com/pt-br/   → Brasil
dominio.com/pt-pt/   → Portugal
dominio.com/en/      → Inglês
```
**Vantagens:** Um único domínio; autoridade compartilhada; mais fácil de manter
**Desvantagens:** Servidor único (mas CDN pode compensar); segmentação geográfica menos óbvia

### Opção 4 — Parâmetros de URL (Não recomendado)
```
❌ dominio.com?lang=pt-br
❌ dominio.com?country=BR
```
Google consegue processar, mas é a opção mais fraca para comunicar localização.

---

## Conteúdo Multilíngue — Boas Práticas

### Idioma único por página
```html
<!-- ✅ Página inteiramente em Português -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>...</head>
<body>
  <p>Texto completamente em português.</p>
</body>
</html>

<!-- ❌ Texto lado a lado em dois idiomas na mesma página
     Prejudica a experiência e confunde o Google -->
<p>Bem-vindo! / Welcome!</p>
```

### URLs localizadas
```
✅ dominio.com/pt-br/receitas/pao-artesanal/
✅ dominio.com/en/recipes/artisan-bread/
✅ dominio.es/recetas/pan-artesanal/

❌ dominio.com/pt-br/recipes/artisan-bread/
   (URL em inglês com conteúdo em português)
```

### Tradução de qualidade
- Tradução humana ou revisada por humano (não apenas tradução automática bruta)
- Adaptar para contexto cultural (não apenas traduzir palavra por palavra)
- Adaptar moeda, unidades de medida, datas para o formato local
- Adaptar exemplos e referências para o mercado local quando relevante

---

## Conteúdo Duplicado Cross-Idioma

### Quando páginas de idiomas diferentes são duplicatas
O Google considera duplicatas quando:
- Apenas cabeçalho, rodapé e elementos não essenciais foram traduzidos
- Corpo do conteúdo permanece igual em outro idioma

**Solução:** Mesmo conteúdo em idiomas diferentes não é duplicata se realmente traduzido.
Não é necessário canonical entre idiomas — use hreflang.

### Quando usar canonical cross-idioma
Apenas se você tem conteúdo quase idêntico em múltiplos idiomas por acidente:
```html
<!-- Página espanhola que é cópia quase idêntica da portuguesa -->
<link rel="canonical" href="https://dominio.com/pt-br/pagina/">
<!-- E hreflang apontando para ambas -->
```

---

## Evitar Redirecionamentos Automáticos

### O problema
```javascript
// ❌ Problemático para SEO
if (navigator.language.startsWith('en')) {
  window.location.href = '/en/';
}
```

**Por quê?** O Googlebot geralmente rastreia de IPs dos EUA. Se o site redirecionar automaticamente para versão em inglês baseado na localização, o Google nunca verá as outras versões.

### Solução correta
```html
<!-- ✅ Ofereça links para outras versões — deixe o usuário escolher -->
<div class="language-selector">
  <a href="/pt-br/" hreflang="pt-BR">Português (Brasil)</a>
  <a href="/en/" hreflang="en">English</a>
  <a href="/es/" hreflang="es">Español</a>
</div>
```

Se quiser redirecionar, faça apenas na **primeira visita** e guarde preferência em cookie — nunca bloqueie acesso às outras versões.

---

## Segmentação Geográfica no Search Console

O Search Console permite indicar segmentação geográfica para sites com gTLDs (.com, .org):

1. Search Console → Configurações do site → Segmentação internacional
2. Selecionar país alvo
3. Isso é uma dica, não uma regra — o Google ainda considera outros sinais

**Para ccTLDs (.com.br, .pt):** Geolocalização automática — não precisa configurar.

---

## Checklist de SEO Internacional

### Configuração básica
- [ ] Estrutura de URL escolhida (ccTLD / subdomínio / subdiretório)
- [ ] hreflang implementado corretamente em todas as páginas
- [ ] hreflang é recíproco (todas versões se referenciam mutuamente)
- [ ] x-default configurado para a versão padrão
- [ ] Sitemaps incluem todas as versões de idioma

### Conteúdo
- [ ] Cada versão de idioma tem conteúdo genuinamente traduzido
- [ ] URLs localizadas no idioma correto
- [ ] Atributo `lang` no `<html>` correto para cada versão
- [ ] Moeda, datas e unidades adaptadas ao mercado local
- [ ] Informações de contato e endereço no formato local

### Técnico
- [ ] Nenhum redirect automático baseado em IP/idioma bloqueando Googlebot
- [ ] Links para outras versões de idioma visíveis nas páginas
- [ ] canonical correto em cada versão (self-referential)
- [ ] Sem mistura de idiomas na mesma página

### Negócios locais (multi-regional)
- [ ] Google Business Profile separado para cada localização física
- [ ] Informações NAP (Nome, Endereço, Telefone) consistentes em todo o site
- [ ] Dados estruturados `LocalBusiness` com endereço local correto
- [ ] Páginas de localização individuais para cada loja/escritório

---

## Domínios Genéricos (gTLDs) como ccTLD

Alguns ccTLDs são tratados pelo Google como gTLDs (sem geolocalização automática):

| ccTLD | Tratado como gTLD? | Motivo |
|-------|-------------------|--------|
| .tv (Tuvalu) | Sim | Usado globalmente para TV |
| .me (Montenegro) | Sim | Usado globalmente |
| .io (Território Britânico) | Sim | Muito usado em tech |
| .co (Colômbia) | Sim | Alternativa ao .com |
| .ai (Anguilla) | Sim | Usado em IA/tech |
| .app | Sim | gTLD |
| .dev | Sim | gTLD |

Para esses, use hreflang ou Search Console para indicar segmentação geográfica.
