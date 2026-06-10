# Qualidade de Conteúdo — E-E-A-T, Links, Boas Práticas

---

## E-E-A-T — Experiência, Especialização, Autoridade, Confiabilidade

E-E-A-T é o framework usado pelos Quality Raters do Google para avaliar conteúdo. Não é um fator de ranking técnico direto, mas influencia a percepção de qualidade que os sistemas do Google desenvolvem sobre um site.

### Experiência (Experience) — novo em 2022
Evidência de que o criador tem experiência direta com o tema.

**Como demonstrar:**
- Fotos originais (não stock) de produtos, lugares, processos
- Resultados pessoais mensuráveis ("economizei R$ 3.000 em 6 meses")
- Detalhes específicos que só quem vivenciou saberia
- Erros cometidos e aprendizados (perspectiva de quem passou por isso)

### Especialização (Expertise)
Conhecimento profundo do tema.

**Como demonstrar:**
- Byline do autor com nome completo
- Biografia do autor com formação e experiência relevante
- Referências a fontes primárias (estudos, dados, especialistas)
- Terminologia técnica usada corretamente
- Para YMYL (saúde, finanças, jurídico): credenciais profissionais explícitas

### Autoridade (Authoritativeness)
Reconhecimento externo como fonte confiável.

**Como demonstrar:**
- Links de outros sites relevantes e reconhecidos
- Menções em mídia, podcasts, outros blogs do setor
- Conteúdo citado como referência
- Parcerias e colaborações visíveis
- Depoimentos e avaliações verificáveis

### Confiabilidade (Trustworthiness)
Transparência e honestidade.

**Como demonstrar:**
- HTTPS habilitado
- Política de privacidade presente e clara (obrigatório LGPD)
- Termos de uso acessíveis
- Informações de contato reais (não apenas formulário)
- CNPJ visível para empresas (e-commerce especialmente)
- Divulgação clara de conteúdo patrocinado/afiliado
- Data de publicação e atualização visíveis
- Fontes citadas com links

---

## Intenção de Busca — O Fundamento do Conteúdo

Antes de criar ou auditar qualquer página, identifique a intenção de busca:

| Tipo | Intenção | Exemplo | O que a página deve entregar |
|------|----------|---------|------------------------------|
| Informacional | Aprender algo | "como fazer pão artesanal" | Guia completo, tutorial, explicação |
| Navegacional | Encontrar site específico | "receitas da padaria do joão" | A própria homepage ou seção |
| Comercial | Pesquisar antes de comprar | "melhor farinha para pão artesanal" | Comparativo, reviews, recomendações |
| Transacional | Comprar/contratar | "comprar farinha de trigo especial" | Página de produto, checkout fácil |

**Sinal de problemas:** Página de produto aparecendo para consulta informacional, ou guia sem CTA aparecendo para consulta transacional.

---

## Práticas de Escrita para SEO

### Antecipação de Variações de Consulta

O Google entende sinônimos e variações. Não é necessário repetir a mesma palavra-chave:

```
Escrever naturalmente inclui variações organicamente:
- "pão artesanal" / "pão caseiro" / "pão de fermentação lenta"
- "receita" / "como fazer" / "passo a passo"
- "ingredientes" / "o que precisa" / "lista de materiais"
```

### Estrutura de Conteúdo Eficaz

```
1. Resposta direta à intenção (primeiros 100 palavras)
2. Expansão e contexto (por que, como, quando)
3. Detalhes e especificidades (exemplos, dados, nuances)
4. Casos de uso, variações, exceções
5. Resumo acionável (o que fazer)
6. Recursos adicionais (links internos relacionados)
```

### Evitar Problemas de Qualidade

| Problema | Descrição | Impacto |
|---------|-----------|---------|
| Keyword stuffing | Repetição excessiva de termos | Penalidade anti-spam |
| Conteúdo raso | Texto que não vai além do óbvio | Baixo ranking |
| Duplicação | Mesmo conteúdo em múltiplas URLs | Dilui link equity |
| Conteúdo obsoleto | Informações desatualizadas | Perda de E-E-A-T |
| Clickbait | Título não corresponde ao conteúdo | Alta taxa de rejeição → sinal negativo |
| Conteúdo parede de texto | Sem estrutura legível | Alta taxa de rejeição |

---

## Links Internos — Estratégia

### Propósito dos links internos
1. Ajudar o Google a entender a estrutura e hierarquia do site
2. Distribuir autoridade (link equity) de páginas principais para páginas secundárias
3. Facilitar descoberta de páginas profundas pelo Googlebot
4. Melhorar navegação do usuário e reduzir taxa de rejeição

### Arquitetura de links: modelo Hub & Spoke

```
Home (hub principal)
├── Categoria A (hub secundário)
│   ├── Artigo A1 (spoke)
│   ├── Artigo A2 (spoke)
│   └── Artigo A3 (spoke)
└── Categoria B (hub secundário)
    ├── Artigo B1 (spoke)
    └── Artigo B2 (spoke)

Spokes também linkam entre si quando relevante:
Artigo A1 ← links relacionados → Artigo B2
```

### Anchor text — boas práticas

```html
<!-- ✅ Descritivo — diz o que o usuário encontrará -->
<a href="/guia-fermentacao-natural">guia completo de fermentação natural</a>

<!-- ✅ Contextual — faz sentido na frase -->
<p>Para fazer um bom pão, você precisa entender
<a href="/sobre-gluten">como o glúten funciona</a>.</p>

<!-- ❌ Genérico — não informa sobre o destino -->
<a href="/guia-fermentacao-natural">clique aqui</a>
<a href="/guia-fermentacao-natural">saiba mais</a>
<a href="/guia-fermentacao-natural">leia mais</a>

<!-- ❌ Keyword stuffing no anchor text -->
<a href="/pao">pão artesanal pão caseiro receita de pão</a>
```

### Verificação de links internos
```bash
# Encontrar links em arquivos HTML
grep -r 'href="/' *.html | grep -v "nofollow"

# Verificar se link existe
curl -sI https://dominio.com/pagina-linkada | grep "HTTP/"
```

---

## Links Externos — Atributos rel

### Tabela de atributos

| Situação | Atributo | Descrição |
|---------|----------|-----------|
| Link editorial normal | (nenhum) | Endossa o destino |
| Link não confiável | `rel="nofollow"` | Não passa autoridade |
| Link patrocinado / afiliado | `rel="sponsored"` | Obrigatório pelo Google |
| Conteúdo gerado por usuário | `rel="ugc"` | Comentários, fóruns |

```html
<!-- Link editorial (nenhum atributo) -->
<a href="https://estudocitado.com/pesquisa">estudo da Universidade X</a>

<!-- Link não confiável -->
<a href="https://site-duvidoso.com" rel="nofollow">menção necessária</a>

<!-- Link patrocinado / afiliado -->
<a href="https://parceiro.com/produto?ref=meusite" rel="sponsored">produto recomendado*</a>

<!-- Link de comentário de usuário -->
<a href="https://site-usuario.com" rel="ugc nofollow">site do usuário</a>
```

### Configuração automática em CMS

Para WordPress, Drupal e outros CMS que permitem comentários:
- Configure para adicionar `rel="ugc nofollow"` automaticamente em todos os links de comentários
- Evita spam e protege a reputação do site

---

## Conteúdo em Escala — Riscos e Boas Práticas

### Conteúdo legítimo em escala
Conteúdo programático é permitido quando:
- Cada página entrega valor único (dados de produto, localização, especificações)
- Páginas de listagem de imóveis/empregos/produtos com dados reais distintos
- Meta descriptions geradas programaticamente mas com informações específicas da página

### Conteúdo problemático em escala
```
❌ Proibido pelo Google:
- Artigos gerados por IA em massa sem valor único
- Variações do mesmo artigo com palavras-chave diferentes
- Páginas de "doorway" para redirecionar para conteúdo principal
- Conteúdo de scraping/cópia de outras fontes
- Conteúdo traduzido automaticamente sem revisão ou valor adicionado
```

### Sinal de alerta: ratio páginas × tráfego
Se o site tem 10.000 páginas mas apenas 100 recebem tráfego, investigue:
- Páginas com conteúdo duplicado ou mínimo
- Páginas de tag, categoria, arquivo com conteúdo vazio
- Páginas de paginação profunda sem valor

---

## Conteúdo para YMYL (Your Money Your Life)

Categorias que requerem padrões de E-E-A-T mais altos:

- **Saúde:** diagnósticos, tratamentos, medicamentos, saúde mental
- **Finanças:** investimentos, impostos, empréstimos, aposentadoria
- **Jurídico:** orientações legais, direitos, processos
- **Segurança:** segurança física, produtos perigosos
- **Notícias:** cobertura de eventos atuais com impacto significativo

**Para sites YMYL, E-E-A-T alto é essencial:**
- Autores com credenciais verificáveis e identificáveis
- Revisão por especialistas listados com nome e qualificação
- Fontes primárias citadas (estudos peer-reviewed, órgãos oficiais)
- Data de atualização visível (informação médica/financeira envelhece)
- Disclaimers adequados ("consulte um profissional")
- Sem claims não substanciados

---

## Atualização e Manutenção de Conteúdo

### Ciclo de revisão recomendado
- **Evergreen (tutoriais, guias):** revisão anual ou quando o tema muda
- **Conteúdo sazonal:** revisão antes da temporada relevante
- **Notícias e tendências:** verificação de relevância a cada 6 meses
- **Preços e dados:** verificação mensal (ou automatização)

### O que fazer com conteúdo desatualizado
1. Conteúdo desatualizado mas ainda relevante → atualizar e publicar nova data
2. Conteúdo sem mais tráfego ou relevância → 301 redirect para conteúdo relacionado
3. Conteúdo temporário já expirado → 410 (Gone) ou 404
4. Conteúdo de baixíssima qualidade irrecuperável → remover com redirect

### Sinais de que conteúdo precisa de atualização
- Bounce rate alto comparado a outras páginas similares
- Ranking caindo progressivamente
- Dados, preços ou ferramentas citadas não existem mais
- Comentários de usuários apontando desatualização
