# Fundamentos de SEO — Google Search Central

Referência consolidada dos princípios fundamentais do Google Search. Fonte: developers.google.com/search/docs

---

## Como o Google encontra e indexa conteúdo

### Processo de indexação
1. **Descoberta** — Googlebot encontra URLs via links, sitemaps ou submissão
2. **Rastreamento** — Baixa o conteúdo da página (HTML, CSS, JS, imagens)
3. **Renderização** — Executa JavaScript (Chromium headless)
4. **Indexação** — Analisa e armazena o conteúdo para uso nos resultados

### Verificação de indexação
- Operador `site:dominio.com` nos resultados do Google
- Ferramenta de Inspeção de URL no Search Console
- Se a página não aparecer: verifique robots.txt, noindex, erros de crawl

---

## O que não é garantido

- Submeter sitemap NÃO garante indexação
- Atender a todos os requisitos técnicos NÃO garante ranking
- SEO perfeito NÃO garante posição #1
- Mudanças levam horas a meses para refletir nos resultados

---

## Os maiores influenciadores de ranking

Em ordem de impacto:

1. **Qualidade e utilidade do conteúdo** — o maior fator
2. **Relevância para a consulta** — o conteúdo responde à intenção de busca?
3. **Sinais de autoridade e confiabilidade** — links, menções, E-E-A-T
4. **Experiência técnica** — Core Web Vitals, mobile, HTTPS, indexabilidade
5. **Aparência nos resultados** — titles, meta descriptions, dados estruturados

---

## Mitos desmascarados pelo Google

| Mito | Realidade |
|------|-----------|
| Meta keywords ajudam no ranking | Google ignora completamente a meta keywords |
| Repetir palavras-chave muitas vezes melhora | Keyword stuffing prejudica — viola políticas anti-spam |
| Palavras-chave no domínio/URL são essenciais | Impacto mínimo; escolha o domínio pela marca |
| Extensão do domínio (.com vs .org) importa muito | Impacto mínimo (exceto ccTLDs para segmentação geográfica) |
| Há número mínimo de palavras por página | Não existe — qualidade supera quantidade |
| Subdomínio vs subdiretório muda muito o ranking | Similar; escolha por necessidade operacional |
| Conteúdo duplicado gera penalidade manual | Não gera penalidade automática — é ineficiente, não punido |
| E-E-A-T é fator de ranking direto | É critério de avaliação de qualidade, não sinal técnico direto |
| Mais H1s prejudica o ranking | Ordem semântica importa para acessibilidade, não para SEO |
| PageRank é o principal fator | É um de muitos sinais; há "muito mais na Pesquisa do que links" |

---

## Conteúdo duplicado — entendendo o impacto real

**O que acontece com conteúdo duplicado:**
- Google escolhe uma URL canônica e indexa ela
- As outras variações são descartadas do índice
- Recursos de rastreamento são desperdiçados
- NÃO há penalidade manual automática

**Quando vira problema:**
- Scraping de conteúdo alheio (viola políticas anti-spam)
- Grande quantidade de páginas com conteúdo idêntico sem canonical
- Múltiplas URLs chegando ao mesmo conteúdo sem redirect

**Solução:**
1. `rel="canonical"` apontando para a URL preferida
2. Redirect 301 para a URL canônica
3. Definir URL preferida no Search Console (menos eficaz)

---

## Foco no usuário como princípio central

A diretriz mais fundamental do Google Search Central é:

> "Priorize o que visitantes gostariam de ver, que achariam útil e que os deixaria satisfeitos."

Toda decisão de SEO deve ser filtrada por essa pergunta. Táticas que enganam ou frustram usuários — mesmo que funcionem temporariamente — são sancionadas por atualizações do Google.

---

## Promoção de conteúdo — o que funciona e o que não funciona

### Funciona
- Links orgânicos de outros sites (backlinks naturais)
- Compartilhamento em redes sociais (gera tráfego que pode gerar links)
- Menções em comunidades relevantes
- Relações públicas digitais (cobertura em mídia do setor)
- Newsletter própria que traz visitantes recorrentes
- Boca a boca (mais lento, mais duradouro)

### Não funciona ou prejudica
- Compra de links em massa
- Esquemas de troca de links em escala
- Links em sites de spam ou diretórios sem valor
- Conteúdo criado apenas para gerar links (sem valor real)
- Excesso de promoção que parece spam para usuários

---

## Monitoramento e ciclo de otimização

### Ferramentas essenciais
- **Google Search Console** — dados de impressões, cliques, erros, indexação
- **Google Analytics** — comportamento de usuários, conversões, fontes de tráfego
- **PageSpeed Insights** — Core Web Vitals por URL
- **Rich Results Test** — validação de dados estruturados
- **Google Trends** — tendências de busca por tema

### Frequência recomendada de monitoramento
- **Semanal:** Search Console — erros de cobertura, quedas de tráfego
- **Mensal:** Performance geral, Core Web Vitals, rastreamento de keywords principais
- **Trimestral:** Auditoria de conteúdo, revisão de dados estruturados, análise de links

### Expectativa de resultados
- Mudanças técnicas: dias a semanas para refletir
- Novas páginas: semanas a meses para ganhar ranking
- Campanhas de link building: meses para impacto
- Nem toda mudança terá efeito mensurável — teste e monitore
