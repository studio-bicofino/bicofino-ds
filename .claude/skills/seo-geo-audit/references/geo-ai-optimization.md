# GEO — Otimização para IA Generativa

Referência completa baseada no guia oficial do Google: "Otimização para IA Generativa na Pesquisa".
Fonte: developers.google.com/search/docs/fundamentals/ai-optimization-guide

---

## Como o AI Overview do Google funciona

### RAG (Retrieval-Augmented Generation)
1. Consulta do usuário é recebida
2. Sistema de ranking tradicional recupera páginas relevantes do índice
3. Modelo de IA analisa essas páginas para gerar resposta
4. Páginas citadas recebem links de destaque na resposta

**Implicação:** Para aparecer no AI Overview, a página precisa primeiro ser rastreada, indexada e considerada relevante — os mesmos critérios do SEO tradicional.

### Desdobramento de Consulta
O sistema gera múltiplas consultas relacionadas para buscar mais fontes e cobrir diferentes ângulos da resposta.

---

## O que impulsiona visibilidade no AI Overview

### 1. Conteúdo com Perspectiva Única

**Critério central:** O conteúdo oferece algo que modelos de IA não encontram reproduzido em múltiplas outras fontes.

| Baixo valor | Alto valor |
|------------|-----------|
| "5 benefícios do exercício físico" | "Por que parei de correr 5x por semana e corri melhor com 3x — minha experiência com periodização" |
| Lista genérica de dicas de dieta | Resultado real de 90 dias com fotos, medições e aprendizados |
| Resumo de pesquisas existentes | Análise original de dados primários com metodologia descrita |
| Conteúdo que qualquer IA geraria | Conteúdo que apenas quem viveu poderia escrever |

### 2. Conteúdo Centrado no Usuário (People-First)

Critério usado: "Útil, confiável e que prioriza as pessoas."

Verificar:
- [ ] A principal motivação de criação é ajudar leitores (não manipular ranking)?
- [ ] Há indicação de quem escreveu e por que é confiável?
- [ ] Informações são precisas e verificáveis?
- [ ] Usuário que chegou via AI Overview ficará satisfeito com a página completa?

### 3. Organização Clara e Legível

Sistemas RAG extraem informações mais facilmente de conteúdo bem estruturado:

- Parágrafos curtos com uma ideia central cada
- Headings descritivos que anunciam o que vem a seguir
- Respostas diretas antes de expansão (resposta → explicação → exemplos)
- Listas quando há enumerações
- Tabelas para comparações

### 4. Multimídia de Qualidade

- Imagens originais e de alta qualidade aumentam oportunidades de citação
- Vídeos próprios sobre o tema aumentam autoridade percebida
- Infográficos com dados únicos são altamente citáveis
- Seguir práticas de SEO para imagens e vídeos

---

## O que NÃO fazer

### Táticas comprovadamente ineficazes

**Arquivos especiais para IA:**
```
❌ /llms.txt
❌ /ai-content.txt
❌ /sitemap-ai.xml
❌ Marcações especiais "para IA"
❌ Versões Markdown das páginas para bots
```
Google descobre e processa múltiplos formatos. Nenhum arquivo especial recebe tratamento privilegiado.

**Fragmentação artificial:**
```
❌ Dividir "Guia de pão artesanal" em 20 páginas para "melhor entendimento da IA"
✅ Uma página completa bem estruturada sobre "Guia de pão artesanal"
```
Sistemas Google entendem múltiplos tópicos em uma página. "Grande quantidade de páginas não aumenta qualidade."

**Reescrita específica para IA:**
```
❌ Tentar escrever do jeito que "IA entende melhor"
✅ Escrever para humanos com clareza e estrutura
```
IA compreende sinônimos e significado contextual — não é preciso padrões de linguagem especiais.

**Menções artificiais:**
```
❌ Contratar serviços de "menção de marca para GEO"
❌ Esquemas de cross-linking para aumentar autoridade
✅ Criar conteúdo que ganha menções orgânicas por ser valioso
```

---

## Conteúdo gerado por IA — o que é permitido e o que não é

### Permitido
- Usar IA como ferramenta de escrita com revisão e curadoria humana
- Gerar rascunhos que são revisados, enriquecidos e corrigidos
- Usar IA para SEO técnico (meta tags, alt text em escala com revisão)

### Não permitido (viola políticas anti-spam do Google)
- Conteúdo em massa gerado automaticamente sem valor real
- Conteúdo duplicado em escala (variações do mesmo artigo)
- Conteúdo criado apenas para preencher keywords sem informação útil

### Critério de decisão
> "Este conteúdo satisfaria um leitor que chegou aqui buscando esta informação?"

Se a resposta for "sim", provavelmente está dentro das políticas, independente de como foi produzido.

---

## Plataformas Google que alimentam respostas de IA

### Google Business Profile (negócios locais)
Informações do perfil são usadas diretamente em respostas sobre negócios locais:
- Nome, endereço, telefone (NAP consistente)
- Horário de funcionamento atualizado
- Categorias de negócio corretas
- Fotos de qualidade
- Avaliações e respostas

### Google Merchant Center (e-commerce)
Dados de produto alimentam respostas de IA sobre compras:
- Título otimizado do produto
- Descrição completa
- Preço atualizado
- Disponibilidade em estoque
- GTIN quando disponível
- Imagens de alta qualidade

### Dados estruturados Schema.org
Dados estruturados não são obrigatórios para o AI Overview, mas ajudam na compreensão e podem qualificar para recursos especiais:

| Tipo | Benefício |
|------|-----------|
| FAQPage | Respostas podem ser extraídas diretamente |
| HowTo | Passos podem ser listados em respostas |
| Product | Informações de produto estruturadas |
| Article | Metadados de autoria e data |
| Review | Avaliações em destaque |

---

## Experiências Agênticas — O Futuro

Agentes de IA são sistemas que realizam tarefas autonomamente (reservar hotel, comparar produtos, preencher formulários).

### Como se preparar agora
- Conteúdo principal acessível sem JavaScript obrigatório
- Estrutura DOM semântica (elementos com papéis claros)
- Informações-chave em texto (preços, disponibilidade, CTAs) — não apenas em imagens
- Acessibilidade implementada (beneficia agentes de navegador)
- Forms claramente estruturados e labelados

### Protocolo emergente
O Google está desenvolvendo protocolos para permitir que agentes executem ações em sites parceiros. Acompanhe atualizações no blog do Search Central.

---

## Métricas para monitorar GEO

| Métrica | Onde verificar | Frequência |
|---------|---------------|-----------|
| Impressões em AI Overview | Search Console (tipo de resultado) | Mensal |
| CTR de trechos em destaque | Search Console (filtro featured snippet) | Mensal |
| Tráfego de busca de cauda longa | Search Console / GA4 | Mensal |
| Menções de marca | Google Alerts, Search Console | Semanal |
| Posição média por consulta | Search Console | Mensal |
