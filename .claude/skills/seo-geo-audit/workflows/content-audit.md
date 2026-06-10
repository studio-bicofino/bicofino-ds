# Auditoria de Qualidade de Conteúdo

Foco: E-E-A-T, qualidade de texto, titles, meta descriptions, headings, links.

---

## Passo 1 — Inventário de Conteúdo

Antes de auditar qualidade, mapeie o que existe:

- Quais tipos de páginas existem? (Home, categoria, produto, artigo, sobre, contato)
- Qual a intenção de busca de cada tipo?
- Quantas páginas há no total? (use `site:dominio.com` para estimar)
- Há páginas com conteúdo mínimo ou placeholder?

---

## Passo 2 — E-E-A-T (Experiência, Especialização, Autoridade, Confiabilidade)

E-E-A-T não é fator de ranking direto, mas é o critério usado pelos Quality Raters do Google para avaliar conteúdo. Sites com E-E-A-T alto tendem a performar melhor a longo prazo.

### Experiência (Experience)
- [ ] Conteúdo demonstra experiência de primeira mão? (review com fotos reais, receita testada, tutorial passo a passo)
- [ ] Há evidências de que quem escreveu viveu o que descreve?

### Especialização (Expertise)
- [ ] Autor identificado em artigos? (byline com nome)
- [ ] Biografia do autor com credenciais relevantes?
- [ ] Conteúdo técnico revisado por especialistas?
- [ ] Para saúde, finanças, jurídico (YMYL): autor com credenciais profissionais declaradas?

### Autoridade (Authoritativeness)
- [ ] Outros sites reconhecidos linkam para este conteúdo?
- [ ] Marca mencionada em fontes externas confiáveis?
- [ ] Conteúdo cita fontes primárias (estudos, dados oficiais)?

### Confiabilidade (Trustworthiness)
- [ ] Página "Sobre nós" / "Quem somos" presente e informativa?
- [ ] Informações de contato facilmente acessíveis?
- [ ] Política de privacidade presente (LGPD)?
- [ ] Termos de uso presente?
- [ ] Para e-commerce: política de devolução, garantia, CNPJ visível?
- [ ] HTTPS habilitado (já coberto na auditoria técnica)?
- [ ] Erros ortográficos e gramaticais graves ausentes?

---

## Passo 3 — Qualidade Textual

Para cada página importante, avalie:

### Originalidade
- [ ] Conteúdo é original (não copiado de outras fontes)?
- [ ] Oferece perspectiva, dado ou experiência que não existe em outros sites?
- [ ] Vai além do que qualquer modelo de IA poderia gerar com uma busca simples?

### Utilidade
- [ ] Responde completamente à pergunta/intenção do usuário?
- [ ] Usuário que chegou via Google ficará satisfeito com o conteúdo?
- [ ] Há seções desnecessárias que diluem o foco?

### Atualização
- [ ] Data de publicação/atualização visível quando relevante?
- [ ] Informações desatualizadas foram revisadas?
- [ ] Conteúdo de evergreen revisado periodicamente?

### Estrutura e Legibilidade
- [ ] Parágrafos curtos (3-5 linhas máximo)?
- [ ] Listas usadas quando há enumerações?
- [ ] Headings dividem o conteúdo em seções lógicas?
- [ ] Tabelas usadas quando há comparações?
- [ ] Linguagem adequada ao público-alvo?

### O que evitar
- [ ] Keyword stuffing (repetição excessiva de termos)?
- [ ] Conteúdo gerado em escala sem valor real?
- [ ] Resumos genéricos de conteúdo já existente em outros sites?
- [ ] Clickbait que não corresponde ao conteúdo?
- [ ] Pop-ups intrusivos que impedem leitura?

---

## Passo 4 — Title Tags

Para cada página, verifique e melhore o `<title>`:

### Critérios de avaliação
| Critério | Bom | Ruim |
|---------|-----|------|
| Unicidade | Cada página tem título diferente | Mesmas palavras em todas as páginas |
| Comprimento | 50-60 caracteres | > 70 chars (truncado) ou < 20 chars (vago) |
| Clareza | Descreve exatamente o conteúdo | "Página 1" ou "Início" |
| Marca | Home e páginas principais incluem marca | Marca em todas as páginas internas (desnecessário) |
| Palavras-chave | Incluídas naturalmente | Repetidas forçadamente |

### Exemplos
```html
<!-- ✅ Bom -->
<title>Como fazer pão de fermentação natural — Padaria do João</title>

<!-- ✅ Bom (página de produto) -->
<title>Tênis Running X-500 Azul | Loja Esporte</title>

<!-- ❌ Ruim — vago -->
<title>Página inicial</title>

<!-- ❌ Ruim — keyword stuffing -->
<title>Pão, pão artesanal, pão fermentação natural, como fazer pão, receita pão</title>

<!-- ❌ Ruim — muito longo (será truncado) -->
<title>Aprenda como fazer pão de fermentação natural passo a passo com esta receita completa e detalhada para iniciantes</title>
```

### Fontes que o Google usa para gerar o Title Link
Se o `<title>` for considerado inadequado, o Google pode usar:
- Tag `<h1>` da página
- Texto em destaque visível
- Tag `og:title`
- Anchor text de links externos para a página

---

## Passo 5 — Meta Descriptions

**Lembre-se:** Meta description não é fator de ranking direto, mas afeta CTR (taxa de cliques).

### Critérios
- [ ] Única por página (não duplicada)
- [ ] 120-158 caracteres (mobile trunca em ~120, desktop em ~158)
- [ ] Resume o conteúdo de forma atraente
- [ ] Inclui a proposta de valor / motivação para clicar
- [ ] Para e-commerce: pode incluir preço, avaliação, disponibilidade
- [ ] Para artigos: pode incluir data, autor, resumo do insight principal

### Exemplos
```html
<!-- ✅ Bom — artigo -->
<meta name="description" content="Aprenda a técnica de autólise que torna o pão artesanal mais fácil. Guia passo a passo com fotos de cada etapa. Resultado garantido mesmo para iniciantes.">

<!-- ✅ Bom — produto -->
<meta name="description" content="Tênis Running X-500 com tecnologia de amortecimento HydroFlex. Disponível em 6 cores. A partir de R$ 299. Frete grátis acima de R$ 199.">

<!-- ❌ Ruim — lista de palavras-chave -->
<meta name="description" content="pão, receita, fermentação, natural, artesanal, caseiro, como fazer">

<!-- ❌ Ruim — sem incentivo ao clique -->
<meta name="description" content="Esta página contém informações sobre pão de fermentação natural.">
```

---

## Passo 6 — Headings (H1-H6)

### Verificar por página

```bash
# Extrai todos os headings de uma página HTML local
grep -E "<h[1-6][^>]*>" arquivo.html
```

**Checklist:**
- [ ] Exatamente um `<h1>` por página (o título principal)
- [ ] `<h1>` descreve claramente o conteúdo da página
- [ ] `<h1>` diferente do `<title>` (podem ser parecidos, mas não idênticos idealmente)
- [ ] Hierarquia não pula níveis: H1 → H2 → H3 (não H1 → H3)
- [ ] Headings são descritivos, não decorativos
- [ ] Número de headings proporcional ao tamanho do conteúdo (sem abuso)

---

## Passo 7 — Links Internos

**Propósito:**
1. Distribuir autoridade pelo site
2. Ajudar o Google a entender a estrutura e hierarquia
3. Facilitar descoberta de páginas profundas

**Checklist:**
- [ ] Anchor text descreve o destino (não "clique aqui" ou "saiba mais" sem contexto)
- [ ] Páginas importantes têm links chegando de várias outras páginas
- [ ] Conteúdo relacionado linkado entre si
- [ ] Nenhuma página "órfã" (sem links internos apontando para ela)
- [ ] Links não estão quebrados (retornam 200)
- [ ] Menu de navegação principal é consistente e acessível

---

## Passo 8 — Links Externos (Outbound)

- [ ] Links para fontes externas usam anchor text descritivo
- [ ] Links para fontes não confiáveis ou não verificadas usam `rel="nofollow"`
- [ ] Links patrocinados ou de afiliados usam `rel="sponsored"`
- [ ] Links de conteúdo gerado por usuários (comentários, fóruns) usam `rel="ugc"` ou `rel="nofollow"`
- [ ] Nenhum link externo quebrado

---

## Passo 9 — Conteúdo Fino e Páginas Problemáticas

Identifique e trate:

| Tipo de Problema | Solução |
|-----------------|---------|
| Página com < 200 palavras sem propósito claro | Expandir ou adicionar `noindex` |
| Página de categoria sem texto descritivo | Adicionar introdução de pelo menos 1-2 parágrafos |
| Tags de blog com 1-2 artigos | Consolidar ou `noindex` |
| Páginas de busca interna do site | `noindex` obrigatório |
| Páginas de perfil de usuário vazias | `noindex` ou `nofollow` |
| Conteúdo duplicado (mesmo texto, URL diferente) | `rel="canonical"` + redirect |
| Páginas de paginação profundas | Verificar se agregam valor ou usar `noindex` |

---

## Relatório de Conteúdo

Para cada achado, inclua:
- URL da página
- Problema específico detectado
- Impacto esperado (CTR, ranking, E-E-A-T)
- Recomendação com exemplo concreto de melhoria
- Prioridade baseada no tráfego atual da página
