# Auditoria GEO — Otimização para IA Generativa

Foco: visibilidade em AI Overview do Google, respostas de modelos de linguagem, experiências agênticas.

---

## Contexto: O que é GEO e por que importa

**GEO (Generative Engine Optimization)** — também chamado de AEO (Answer Engine Optimization) — refere-se a práticas que aumentam a probabilidade de seu conteúdo aparecer em respostas geradas por IA, como o AI Overview do Google.

**Fundamento crítico:** O AI Overview do Google usa as mesmas bases de ranking tradicional. Não há atalho — otimizar para GEO é otimizar para SEO de qualidade. Táticas como criar arquivos `llms.txt`, fragmentar conteúdo artificialmente ou reescrever especificamente para IA são ineficazes ou prejudiciais.

**Como o Google AI Overview funciona:**
1. **RAG (Retrieval-Augmented Generation):** Recupera páginas relevantes do índice e as usa para gerar respostas
2. **Desdobramento de Consulta:** Gera múltiplas consultas relacionadas para buscar mais fontes
3. Páginas citadas são aquelas que passaram pelos filtros normais de qualidade e relevância

---

## Passo 1 — Diagnóstico de Qualidade do Conteúdo para GEO

### 1.1 Unicidade e Perspectiva Original

**Pergunta-chave:** O que este conteúdo oferece que um modelo de IA não encontraria em nenhuma outra fonte?

- [ ] Conteúdo inclui experiência de primeira mão (avaliações pessoais, resultados reais, fotos originais)?
- [ ] Há dados proprietários, pesquisas originais ou estatísticas exclusivas?
- [ ] Opinião de especialista identificado com credenciais verificáveis?
- [ ] Perspectiva que vai contra o senso comum mas com embasamento?
- [ ] Conteúdo gerado por IA sem diferenciação → sinal de baixo valor para GEO

**Exemplos:**
```
❌ Baixo valor GEO: "7 dicas para comprar imóvel" (conteúdo genérico, reproduzível por qualquer IA)

✅ Alto valor GEO: "Por que dispensamos a inspeção pré-compra e economizamos R$ 12k — nossa experiência com 3 imóveis"
(experiência real, números específicos, perspectiva única)
```

### 1.2 Conteúdo Não-Genérico

- [ ] Evita fórmulas de conteúdo genérico ("X passos para Y", "tudo que você precisa saber sobre Z")
- [ ] Vai além do conhecimento comum disponível em qualquer enciclopédia
- [ ] Inclui nuances, exceções e casos específicos (não apenas regras gerais)
- [ ] Para guias e tutoriais: inclui erros comuns e como evitá-los (perspectiva de quem já fez)

---

## Passo 2 — Estrutura para Extração por Sistemas RAG

O Google usa RAG para extrair informações das páginas. Conteúdo bem estruturado é mais fácil de processar.

### 2.1 Respostas Diretas
- [ ] Páginas respondem perguntas diretamente no início das seções?
- [ ] Definições e conceitos aparecem cedo no texto (não enterrados em parágrafos)?
- [ ] Perguntas frequentes têm respostas concisas antes de expandir?

**Estrutura recomendada:**
```
## O que é fermentação natural?

Fermentação natural é o processo de leavening do pão usando apenas 
farinha, água e microorganismos selvagens presentes no ambiente, 
sem fermento comercial. [resposta direta]

O processo leva entre 12-48 horas dependendo... [expansão]
```

### 2.2 Headings Descritivos
- [ ] Headings são frases completas que comunicam o conteúdo (não apenas palavras-chave)?
- [ ] H2 e H3 poderiam ser perguntas que usuários fariam?
- [ ] Estrutura de headings cria outline lógico do assunto?

### 2.3 Dados Estruturados para Extração
- [ ] `FAQPage` implementado para perguntas frequentes?
- [ ] `HowTo` implementado para tutoriais passo a passo?
- [ ] `Article` com `datePublished`, `dateModified`, `author` corretos?
- [ ] `Review` ou `AggregateRating` para avaliações?

---

## Passo 3 — O que NÃO fazer (táticas ineficazes)

### 3.1 Arquivos especiais para IA

```
❌ NÃO criar: /llms.txt
❌ NÃO criar: /ai-training.txt
❌ NÃO criar: marcações especiais "para IA"
❌ NÃO criar: versões Markdown das páginas especialmente para bots
```

**Por que não funciona:** Google descobre múltiplos formatos de arquivo e não dá tratamento especial a arquivos novos criados por webmasters.

### 3.2 Fragmentação Artificial de Conteúdo

```
❌ NÃO dividir: "Como fazer pão" em 15 páginas separadas para "melhor entendimento da IA"

✅ CORRETO: Uma página completa sobre "Como fazer pão" com boa estrutura de seções
```

**Por que não funciona:** Sistemas Google entendem nuance de múltiplos tópicos em uma única página. Não há tamanho ideal de página para IA.

### 3.3 Reescrita específica para IA
- Não escreva conteúdo pensando em "como uma IA leria" — escreva para pessoas
- IA compreende sinônimos e significado geral — não é preciso capturar todas as variações
- Não crie conteúdo separado para cada variação de busca

### 3.4 Menções artificiais e link building para GEO
- Menções não-autênticas têm menos valor do que parecem
- Foco em conteúdo de alta qualidade que ganha menções orgânicas

---

## Passo 4 — Conteúdo Gerado por IA

Se o site usa IA para gerar conteúdo:

- [ ] Conteúdo gerado por IA passa pela revisão de especialista humano?
- [ ] Há valor real adicionado (não apenas expansão de texto)?
- [ ] Conteúdo não viola a política de "abuso de conteúdo em escala" do Google?
- [ ] Informações factuais verificadas (IA comete erros factuais frequentemente)?
- [ ] Perspectiva única adicionada ao conteúdo base gerado por IA?

**Política do Google:** Conteúdo gerado por IA em si não é proibido. O problema é conteúdo em massa, sem valor real, criado especificamente para manipular rankings.

---

## Passo 5 — Presença em Plataformas de Descoberta por IA

### 5.1 Google Business Profile (negócios locais)
- [ ] Perfil da Empresa no Google criado e verificado?
- [ ] Informações completas: endereço, telefone, horário, site?
- [ ] Fotos de alta qualidade adicionadas?
- [ ] Categorias corretas configuradas?
- [ ] Avaliações respondidas (positivas e negativas)?
- [ ] Posts regulares publicados?

**Impacto GEO:** Informações do Google Business são incluídas em respostas de IA sobre negócios locais.

### 5.2 Google Merchant Center (e-commerce)
- [ ] Feed de produtos enviado ao Merchant Center?
- [ ] Produtos com dados completos: título, descrição, preço, disponibilidade, imagem?
- [ ] Dados estruturados `Product` nas páginas de produto?
- [ ] GTIN (código de barras) incluído quando disponível?

**Impacto GEO:** Produtos no Merchant Center podem aparecer em respostas de IA sobre produtos e comparações.

### 5.3 Schema.org para Extração de Dados
Tipos prioritários para GEO:
- [ ] `Organization` / `LocalBusiness` com informações completas
- [ ] `Product` com `offers`, `aggregateRating`
- [ ] `Article` / `BlogPosting` com `author`, `datePublished`
- [ ] `FAQPage` para perguntas frequentes
- [ ] `HowTo` para tutoriais

---

## Passo 6 — Confiabilidade e Autoridade para IA

Modelos de IA tendem a citar fontes consideradas confiáveis e autoritativas.

- [ ] Autor identificado com nome completo em artigos?
- [ ] Biografia do autor com experiência relevante?
- [ ] Conteúdo cita fontes primárias (estudos, dados oficiais, pesquisas)?
- [ ] Links para e de fontes reconhecidas do setor?
- [ ] Informações são verificáveis e precisas?
- [ ] Data de atualização visível (conteúdo atual tem mais credibilidade)?

---

## Passo 7 — Preparação para Agentes de IA (Futuro)

Agentes de IA são sistemas autônomos que realizam tarefas (reservas, comparações, compras) em nome de usuários.

- [ ] Site carrega corretamente sem JavaScript obrigatório para conteúdo principal?
- [ ] Estrutura DOM semântica e limpa?
- [ ] Informações-chave acessíveis via acessibilidade (aria-labels, estrutura lógica)?
- [ ] Forms e CTAs claramente identificados no DOM?
- [ ] Preços, disponibilidade e informações-chave em texto (não apenas em imagens)?

---

## Relatório GEO

### Seção de Posicionamento Competitivo

Para cada tópico principal do site, avalie:

1. **Unicidade do conteúdo:** O que este site oferece que nenhum outro oferece?
2. **Sinal de confiabilidade:** Quais credenciais/dados legitimam este conteúdo?
3. **Facilidade de extração:** Quão fácil é para sistemas RAG extrair a informação central?
4. **Presença nas plataformas Google:** Business Profile, Merchant Center configurados?

### Prioridades por impacto GEO

| Prioridade | Ação | Impacto Esperado |
|-----------|------|-----------------|
| Alta | Adicionar experiências de primeira mão a conteúdo genérico | Diferenciação imediata |
| Alta | Implementar FAQPage schema em páginas com perguntas | Elegibilidade para AI Overview |
| Alta | Completar Google Business Profile (se local) | Presença em respostas locais |
| Média | Identificar e reescrever conteúdo genérico com perspectiva única | Melhor qualidade geral |
| Média | Adicionar dados estruturados Article com author completo | Sinal de autoridade |
| Baixa | Revisar estrutura de headings para facilitar extração | Melhoria incremental |
| Evitar | Criar arquivos especiais para IA, fragmentar conteúdo | Ineficaz / prejudicial |
