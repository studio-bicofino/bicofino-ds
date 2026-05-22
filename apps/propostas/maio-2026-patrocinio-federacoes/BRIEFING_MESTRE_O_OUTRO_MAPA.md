# BRIEFING MESTRE — "O OUTRO MAPA"

**Para:** Claude Code (Antigravity) — projeto local `Bicofino-ecossistema/docs-site`  
**De:** Studio Bicofino (Woney Malian)  
**Data:** 22 de maio de 2026  
**Status:** PROPOSTA EM DESENVOLVIMENTO — não distribuir antes da validação interna  
**Versão:** v1.1

---

## SUMÁRIO

1. [Como ler este documento](#1-como-ler-este-documento)
2. [Contexto do projeto](#2-contexto-do-projeto)
3. [Antes de codar — leitura obrigatória do DS](#3-antes-de-codar--leitura-obrigatória-do-ds)
4. [A proposta — conteúdo, narrativa e dados](#4-a-proposta--conteúdo-narrativa-e-dados)
5. [Especificação técnica da página](#5-especificação-técnica-da-página)
6. [Conteúdo final pronto para colar (PT-BR)](#6-conteúdo-final-pronto-para-colar-pt-br)
7. [Fontes e auditoria de dados](#7-fontes-e-auditoria-de-dados)
8. [Critérios de aprovação](#8-critérios-de-aprovação)

---

## 1. COMO LER ESTE DOCUMENTO

Este briefing tem duas camadas sobrepostas e não pode ser tratado como um doc convencional:

- **Camada estratégica** (seções 2 e 4): a proposta em si. Toda a narrativa, dados e ângulos competitivos. Esta é a "matéria" da página — o que precisa ser dito.
- **Camada técnica** (seções 3, 5 e 8): instruções operacionais para o Claude Code/Antigravity transformar a matéria em página renderizada no `docs-site`. Esta é a "forma" da página.

**Princípio único de execução:** o Claude Code deve tratar este documento como spec funcional, não como sugestão. Toda a copy já foi redigida com voz Bicofino — não reescrever, não "melhorar", não adicionar emoji. Se algo soar estranho, criar issue para Woney revisar; não improvisar.

---

## 2. CONTEXTO DO PROJETO

### 2.1 O que é "O Outro Mapa"

O Brasil tem 27 federações estaduais de futebol. Quatro delas — Paulista, Carioca, Mineiro e Gaúcho — têm os naming rights tomados por marcas grandes (Casas Bahia, Superbet, Sicoob, Bet365). As outras 23 são o que chamamos de **Outro Mapa**: o Brasil que sustenta o segundo mercado de marca do futebol nacional, hoje fragmentado entre patrocínios individuais, alguns naming rights pontuais e muito espaço comercial aberto.

Esta proposta organiza o acesso a esse mercado em um pacote consolidado. O recorte inicial cobre **catorze federações estratégicas em quatro regiões** — Tier 1, 2 e 3 conforme briefing recebido —, somando 57,7 milhões de habitantes na cobertura direta e alcance qualificado estimado de 73 milhões de brasileiros. O universo total do Outro Mapa (23 estados) reúne cerca de 117 milhões de pessoas e fica como horizonte natural de expansão para temporadas seguintes, conforme contratos vigentes em outras federações vencerem.

A premissa é simples: enquanto os Big 4 estão fechados, os outros 23 estados operam com patrocínios pulverizados ou ausentes. A oportunidade é vender essa cobertura geográfica como um produto consolidado, começando pelas catorze federações já mapeadas.

### 2.2 O papel do Bicofino na operação

Intermediação curatorial. O Bicofino não opera as federações nem distribui as cotas. Atua como:
- Estruturador do produto (pacote consolidado de 14 estaduais)
- Curador da contraparte (qual anunciante faz sentido para esta cobertura)
- Articulador comercial (negociação multilateral entre 14 federações + 1 anunciante)
- Garantidor de execução (entregáveis padronizados ao patrocinador em todas as 14 praças)

### 2.3 Por que o nome "O Outro Mapa"

Funciona em três camadas:
- **Geográfica:** é literalmente outro mapa do Brasil — os 23 estados que sobram quando se tira o eixo São Paulo–Rio–Minas–Rio Grande do Sul
- **Estratégica:** é outro mapa de oportunidade — onde o investidor tradicional não olhou ainda na escala consolidada
- **Editorial:** é um nome que carrega narrativa. Não é "Pacote Regional Tier 1/2/3" (briefing original). É um produto com identidade.

Slug sugerido para URL: `/propostas/o-outro-mapa`  
Tagline da página: **"O Outro Mapa — 23 estados fora do eixo. 14 federações no primeiro recorte. Uma marca."**

### 2.4 Status comercial

- **Briefing original:** recebido de agente parceiro (excluído deste documento por confidencialidade contratual)
- **Pacote financeiro:** R$ 9 mi de custo total aos clubes/federações; R$ 12–14 mi de valor cobrado ao patrocinador final (margem do Bicofino + parceiros)
- **Anunciante-alvo:** ainda não definido. O perfil ideal será detalhado na seção 4.4. Esta página é a ferramenta de qualificação e captura.

---

## 3. ANTES DE CODAR — LEITURA OBRIGATÓRIA DO DS

**Não escrever uma linha de código sem antes ter lido, na ordem:**

```
docs-site/STATUS.md          # estado atual: o que existe, o que está planejado
docs-site/DESIGN.md          # fonte da verdade visual — tokens, regras, filosofia
docs-site/README.md          # como rodar o projeto e onde adicionar a página
docs-site/CLAUDE.md          # convenções específicas que o Claude deve seguir
```

Se faltar token, padrão de spacing, regra de tipografia ou variant de componente para qualquer elemento desta proposta, **parar e criar issue para Woney**. Não criar token ad-hoc. Não usar CSS solto. Não fazer fork visual.

### 3.1 Onde a página entra no docs-site

- **URL local:** `localhost:3001/propostas/o-outro-mapa`
- **Sidebar:** adicionar entrada `Propostas → O Outro Mapa` na navegação principal do docs-site
- **Seção:** se "Propostas" ainda não existe como seção no DS, criar como nova categoria seguindo o padrão do `STATUS.md`
- **Renderização final:** a página completa deve estar acessível e indexada no docs-site, não como build separado

### 3.2 Storybook

Cada componente novo criado para esta página (ex.: `MapaBrasilEstados`, `TierCard`, `EntregavelTable`) deve ter um story correspondente em `Storybook (localhost:6006)` antes de ser integrado à página final.

### 3.3 Idioma

PT-BR. Versão única, sem rota alternativa em outros idiomas.

---

## 4. A PROPOSTA — CONTEÚDO, NARRATIVA E DADOS

### 4.1 A tese central (Hero da página)

> **O Outro Mapa**  
> 23 estados fora do eixo. 14 federações no primeiro recorte. Uma marca.
>
> Quando Casas Bahia comprou o Paulistão, Superbet o Carioca, Sicoob o Mineiro e Bet365 o Gaúcho, o mapa do patrocínio esportivo brasileiro virou um quadrado. Fora dele estão os outros 23 estados do país — três regiões inteiras e algumas das torcidas mais fanáticas do Brasil.
>
> Esta é uma proposta para ocupar esse mapa inteiro de forma coordenada, começando por catorze federações estratégicas.

### 4.2 O contexto de mercado — dados verificados

A página deve ancorar a argumentação em dados reais, citados com fonte. Os números abaixo foram conferidos em fontes públicas e devem aparecer na página com referência inline ou em rodapé.

#### 4.2.1 O mercado de naming rights está aquecido e concentrado

- **18 das 27 federações estaduais brasileiras já firmaram contratos de naming rights em 2026.** Fonte: CNN Brasil, fev/2026
- **Os principais contratos movimentam entre R$ 20 mi e R$ 30 mi/ano.** Fonte: CNN Brasil, fev/2026
- **A Superbet sozinha detém naming rights de 6 estaduais (Carioca, Cearense, Gaúcho, Sergipano, Baiano e Capixaba em 2025).** Fonte: FocusGN/CNN Brasil
- **O Paulistão 2026 trocou Sicredi (após 7 anos) por Casas Bahia.** Os Superclássicos da competição passaram a se chamar "Superclássicos Casas Bahia". Fonte: Lance!, dez/2025
- **A categoria dominante é bet, seguida por cooperativas financeiras (Sicredi, Sicoob, Banpará), varejistas (Casas Bahia, Novo Mundo) e agro (GiroAgro no Roraimense).** Fonte: CNN Brasil

#### 4.2.2 Os Big 4 estão fora do alcance

- Paulistão 2026: **Casas Bahia** (fechado)
- Carioca 2026: **Superbet** (fechado)
- Mineiro 2026: **Sicoob** (fechado)
- Gaúcho 2026: **Bet365** / casa de apostas (fechado)

Restam 22 estaduais sob negociação ativa, com diferentes níveis de tradição, audiência e estrutura. **O Outro Mapa consolida 14 deles em um único produto comercial.**

#### 4.2.3 O torcedor fora do eixo é o mais fanático

Pesquisa Nexus/CBF, 2025 (2.006 entrevistados, 27 UFs, margem de erro 2,2 p.p., 95% confiança):

- **47% dos brasileiros assistem a pelo menos um jogo de futebol por semana**
- **77% consomem futebol pela mídia**
- **O grupo de torcedores mais fanáticos é composto majoritariamente por: homens, 25 a 34 anos, pretos/pardos autodeclarados, residentes do Nordeste, cidades pequenas ou interior**
- **A audiência total do mercado esportivo brasileiro atinge 158 milhões de pessoas**

O torcedor de Big 4 é o mais exposto comercialmente. O torcedor fora do eixo é o mais fiel — e, hoje, o menos disputado.

#### 4.2.4 O tamanho do mercado endereçável (população dos 14 estados)

Fonte: IBGE, Estimativas de População 2025

| Tier | Estado | População 2025 | Região |
|---|---|---|---|
| 1 | Bahia | 14.870.907 | Nordeste |
| 1 | Pernambuco | 9.562.007 | Nordeste |
| 2 | Amazonas | 4.321.616 | Norte |
| 2 | Espírito Santo | 4.126.854 | Sudeste |
| 2 | Mato Grosso | 3.893.659 | Centro-Oeste |
| 2 | Paraíba | 4.164.468 | Nordeste |
| 2 | Alagoas | 3.220.848 | Nordeste |
| 2 | Sergipe | 2.299.425 | Nordeste |
| 3 | Mato Grosso do Sul | 2.924.631 | Centro-Oeste |
| 3 | Piauí | 3.384.547 | Nordeste |
| 3 | Tocantins | 1.586.859 | Norte |
| 3 | Rondônia | 1.751.950 | Norte |
| 3 | Acre | 884.372 | Norte |
| 3 | Roraima | 738.772 | Norte |
| **TOTAL** | **14 estados** | **57.730.915** | **4 regiões** |

> **Refinar narrativa:** os 14 estados cobertos no recorte inicial somam **57,7 milhões de habitantes** — equivalente à população inteira do Nordeste. Considerando o alcance qualificado das transmissões regionais (afiliadas Globo, TVs estaduais, canais digitais das federações), o alcance fica entre 65 e 75 milhões. O número "73 milhões" usado em algumas peças é uma estimativa de alcance qualificado, não de habitantes — deixar isso claro em nota de rodapé.
>
> **O universo completo do Outro Mapa** soma os 23 estados fora dos Big 4: além das 14 federações cobertas no recorte inicial, mais 9 (Cearense, Maranhense, Potiguar, Paraense, Amapaense, Goiano, Brasiliense, Catarinense, Paranaense). Juntos, os 23 estados somam **117,3 milhões de habitantes** (55% da população brasileira). Esse universo é o horizonte natural de expansão do pacote para temporadas seguintes, conforme contratos vigentes em outras federações vencerem.

#### 4.2.5 O consumo no Nordeste sustenta a tese

- **R$ 1,3 trilhão de consumo das famílias no Nordeste em 2024** (17,9% do consumo nacional). Fonte: IPC Maps / Movimento Econômico
- **Bahia é o 7º estado do Brasil em consumo familiar; Pernambuco, o 9º**
- **Salvador é a 4ª capital do país em consumo, líder do Nordeste, seguida por Fortaleza e Recife**

#### 4.2.6 O agronegócio sustenta o Tier 2 e 3 do Centro-Oeste

- **Centro-Oeste é a região mais rentável do agronegócio brasileiro, com 62 dos 100 municípios mais ricos**
- **Mato Grosso lidera com 36 municípios no top 100** (Sorriso é o #1 com R$ 8,3 bi de produção). Fonte: IBGE/PAM via Movimento Econômico, out/2024
- **Mato Grosso e Mato Grosso do Sul somam R$ 6,8 bi de população em poder de consumo + base agronegócio**

### 4.3 O Caminho Bicofino — como o produto se estrutura

Três tiers, três lógicas distintas de valor para o anunciante:

#### TIER 1 — Os clássicos regionais
**Baiano + Pernambucano.** Os dois estaduais mais antigos e populares do Nordeste, com média de público acima de 7.000 pagantes por jogo, finais com 1,4 milhão de telespectadores cada, redes ativas (97k seguidores no Instagram da FBF, 40k na FPF-PE). Clubes com torcida nacional: Bahia, Vitória, Sport, Náutico, Santa Cruz. Valor: **R$ 1,5 mi por campeonato.**

#### TIER 2 — Os mercados estratégicos
**Mato-Grossense, Amazonense, Capixaba, Paraibano, Alagoano, Sergipano.** Estados de porte médio com clubes em ascensão (Cuiabá na Série A, Manaus FC na Série B, Botafogo-PB na Série C), transmissões consolidadas (TV Centro-América, FAF TV, TVE-ES), engajamento digital relevante (Capixabão registrou 1,6 mi de visualizações no YouTube + 12 mi no Instagram em 2024). Cada um cobre uma região distinta. Valor: **R$ 650 mil por campeonato.**

#### TIER 3 — A capilaridade institucional
**Sul-Mato-Grossense, Piauiense, Tocantinense, Rondoniense, Acreano, Roraimense.** Estados de menor escala futebolística, mas alta densidade simbólica: o patrocinador aqui "compra a competição inteira" com exclusividade total e ganha narrativa de presença institucional onde marcas grandes nunca chegaram. Valor: **R$ 350 mil por campeonato.**

> **Total ao anunciante:** R$ 12 mi (base) a R$ 14 mi (ampliado com ativações expandidas).  
> **Custo agregado aos clubes/federações:** R$ 9 mi.  
> **Margem do Bicofino e estrutura de execução:** R$ 3 mi a R$ 5 mi (cobre intermediação, gestão multilateral, padronização de entregáveis, garantias contratuais, ativações).

### 4.4 O perfil do anunciante-alvo

Quem **tem fit**:
- **Cooperativas financeiras de penetração regional** (Sicredi expandiu para 8,5 mi de associados via futebol regional; mesmo case aplicável a Sicoob, Banco do Brasil, Caixa em zonas rurais)
- **Varejistas com ambição de capilaridade Norte/Nordeste/CO** (Magalu, Casas Bahia em segunda frente, Lojas Americanas, Grupo Mateus, Atacadão, Carrefour Bahia)
- **Agro e cadeias produtivas** (JBS, Marfrig, Cargill, John Deere, Stara — todos com forte presença em MT/MS/Norte)
- **Telecom e fintechs com expansão regional** (Vivo, Claro, TIM, Stone, PagBank, Banco Inter)
- **Indústria de bebidas com forte penetração regional** (Ambev linhas regionais, Heineken, Stella, Brahma)
- **Energia e saneamento** (Equatorial, Neoenergia, Eneva — concessões nestas regiões)
- **Marcas globais buscando entrada estruturada no Brasil profundo** (PepsiCo, Unilever, Nestlé regional)

Quem **não tem fit**:
- Bets que já estão saturadas com Big 4 (não há ângulo competitivo claro)
- Marcas de público urbano classe A/B com posicionamento incompatível com a geografia coberta
- Marcas em crise reputacional que precisariam de validação Big 4

### 4.5 O que o patrocinador leva — propriedades padronizadas

Aplicáveis a todos os 14 campeonatos do pacote:

**Identidade e presença**
- Naming rights da competição (ex.: "Baianão Marca X 2027", "Mato-Grossense Marca X 2027")
- Exclusividade no segmento de atuação (a confirmar caso a caso)
- Naming rights no troféu, medalhas e pódio de premiação
- Marca em destaque nos releases e posts oficiais

**Ativações físicas em campo**
- Placa central 12×1m em todos os jogos
- Placas atrás dos dois gols (garante exposição em todos os gols nas transmissões)
- Backdrop de entrevistas no intervalo e ao final
- 50 ingressos por partida (100 nas fases finais; camarote quando disponível)
- Área de ativação na final dos campeonatos

**Ativações digitais e de conteúdo**
- 3 posts exclusivos nas redes sociais oficiais de até 10 campeonatos
- 1 live nas redes sociais em até 5 campeonatos
- 1 ativação especial nas finais em até 5 campeonatos
- 2 credenciais para 2 influenciadores com acesso ao backstage da final
- Direito de produção de conteúdo próprio (custos de produção não inclusos)

**Direitos comerciais**
- Direito de licenciamento de produto ou serviço oficial do campeonato
- Direito de uso da logo dos campeonatos para promoções, sorteios, sampling, distribuição de brindes, tour do troféu, Fan Zone, ações de abertura, material de PDV e campanhas de engajamento

### 4.6 Garantias de execução Bicofino

O Bicofino atua como interface única entre patrocinador e 14 federações. O patrocinador conduz uma negociação única em vez de quatorze. Aprova um fluxo em vez de quatorze. Recebe um dashboard consolidado em vez de quatorze relatórios paralelos.

**Padronização de entregáveis:**
- Templates únicos de materiais visuais aplicáveis em todas as praças
- Calendário consolidado de ativações e marcos por temporada
- Hub digital de assets e relatórios
- Equipe dedicada Bicofino para gestão da operação

**Auditoria e mensuração:**
- Relatório mensal consolidado de exposição (mídia espontânea, ativações, alcance digital)
- Métricas padronizadas por federação para comparação interna
- Relatório final de temporada com ROI estimado por praça

### 4.7 Investimento e cronograma

**Investimento**

| Componente | Valor |
|---|---|
| Pacote base — 14 estaduais | R$ 12.000.000 |
| Pacote ampliado — base + ativações expandidas | R$ 14.000.000 |

Pagamento em parcelas trimestrais, com primeiro aporte na assinatura. Cobertura: temporada 2027 (janeiro a abril) com opção de renovação para 2028.

**Prazos**

| Marco | Data |
|---|---|
| Apresentação ao anunciante-alvo | Junho/2026 |
| Negociação e fechamento | Junho a Agosto/2026 |
| Assinatura do contrato master | Setembro/2026 |
| Lançamento dos contratos individuais com federações | Outubro/2026 |
| Anúncio público da parceria | Novembro/2026 |
| Estreia do pacote | Janeiro/2027 (início dos estaduais) |

---

## 5. ESPECIFICAÇÃO TÉCNICA DA PÁGINA

### 5.1 Estrutura e fluxo

A página é um **dossiê digital de uma única página** (long-scroll), dividido em seções verticais com transições limpas. **Não usar tabs, accordions ou modais** para conteúdo principal — tudo deve estar visível no scroll. Densidade alta de informação, mas com respiração generosa entre blocos.

### 5.2 Seções (ordem de scroll)

A página é organizada em dez seções verticais. Cada uma descrita abaixo apenas pelo conteúdo a apresentar e pela lógica de informação. **As decisões visuais (cor, tipografia, layout, elementos gráficos, marcadores, ribbon, footer) serão passadas por Woney diretamente pelo terminal durante o desenvolvimento.** Consultar `DESIGN.md` para tokens disponíveis; criar issue se faltar token para algo desta lista.

```
SEÇÃO 1 — HERO
  Título: "O OUTRO MAPA"
  Subtítulo curto (uma linha)
  Lead com o ângulo: o quadrado dos Big 4 e o que sobra fora dele
  Eyebrow opcional: "PROPOSTA ✦ CONFIDENCIAL"

SEÇÃO 2 — A TESE
  Bloco de texto-âncora único, sem subdivisão
  Largura controlada (max ~720px) para legibilidade
  Citação destacada do dado: "18 das 27 federações estaduais já firmaram naming rights em 2026."

SEÇÃO 3 — O MAPA
  Visualização central da página: SVG do Brasil
  Três estados de preenchimento dos estados:
    a) Recorte inicial do pacote (14 estados) — destaque
    b) Expansão futura — outras 9 federações do Outro Mapa — destaque suave
    c) Big 4 já comprados — neutro / ocupado
  Legenda lateral explicando as três condições
  Texto explicativo ao lado do mapa (ver seção 6.4)

SEÇÃO 4 — O CONTEXTO
  4 cards horizontais com dados-chave verificados
  Card 1: 47% dos brasileiros assistem futebol semanalmente
  Card 2: 158 mi de pessoas — audiência do mercado esportivo BR
  Card 3: R$ 1,3 tri — consumo Nordeste em 2024
  Card 4: R$ 20-30 mi — faixa anual dos contratos grandes
  Cada card tem: número grande + frase curta + microfonte

SEÇÃO 5 — OS TRÊS TIERS
  Bloco hero com título "O Caminho Bicofino"
  3 tier-cards empilhados verticalmente, cada um com:
    - Header: TIER X — nome
    - Lista de estados
    - Dados-chave (público médio, transmissão, redes)
    - Valor por campeonato
    - Total do tier

SEÇÃO 6 — O PACOTE EM NÚMEROS
  Tabela consolidada de investimento
  Total: R$ 12 mi base / R$ 14 mi ampliado
  Custo aos clubes: R$ 9 mi
  Margem Bicofino: R$ 3-5 mi

SEÇÃO 7 — O QUE O PATROCINADOR LEVA
  4 blocos:
  - Identidade e presença
  - Ativações físicas em campo
  - Ativações digitais e de conteúdo
  - Direitos comerciais
  Lista clara, densidade textual permitida

SEÇÃO 8 — GARANTIAS BICOFINO
  Bloco de texto sobre execução e coordenação contratual
  Pode mencionar de forma sutil os 4 Cs do Bicofino (Connection, Curate, Create, Consult)

SEÇÃO 9 — INVESTIMENTO E CRONOGRAMA
  2 tabelas lado a lado em desktop, empilhadas em mobile
  Investimento: pacote base vs ampliado
  Cronograma: marcos com datas

SEÇÃO 10 — PRÓXIMO PASSO
  CTA discreto: texto único, sem formulário, sem botão pesado
  Email institucional como ponto de contato

FOOTER
  Identificação Bicofino + versão + data + disclaimer de confidencialidade
```

### 5.3 Componentes a criar (se ainda não existem no DS)

| Componente | Função | Reutilizável? |
|---|---|---|
| `ProposalHero` | Hero da proposta com título, subtítulo, lead e eyebrow | Sim — para outras propostas |
| `TeseBlock` | Bloco de texto-âncora com citação destacada | Sim |
| `MapaBrasilEstados` | SVG Brasil com três estados de preenchimento por categoria | Específico desta página |
| `DataCard` | Card de número grande + frase + fonte | Sim |
| `TierCard` | Card de tier com lista, dados e valor | Sim — para outras propostas estruturadas em tiers |
| `EntregavelGrid` | Grid 2x2 ou 4 colunas para entregáveis | Sim |
| `InvestimentoTable` | Tabela de valores formatada padrão Bicofino | Sim |
| `CronogramaTable` | Tabela de marcos por data | Sim |
| `ProposalFooter` | Footer com versão, data, confidencialidade | Sim |

Cada um deles deve ser criado no Storybook antes de entrar na página.

### 5.4 Diretrizes visuais

**Toda decisão visual (paleta, tipografia, layout, elementos gráficos, marcadores, footer, ribbons, ilustrações) será passada por Woney diretamente pelo terminal durante o desenvolvimento.** Não inferir, não improvisar, não importar referências de materiais antigos do projeto.

Regras gerais que valem desde o início:

- Consultar `DESIGN.md` para tokens disponíveis no DS Bicofino
- Usar exclusivamente tokens do DS — zero CSS solto, zero valor hex hardcoded
- Se faltar token para algum elemento, parar e criar issue para Woney decidir
- Não usar componentes shadcn ou outras libs sem theming via DS

### 5.5 Restrições de copy e conteúdo

- **Não usar emojis em copy.** O símbolo ✦ pode aparecer em eyebrows e marcadores, mas seu uso visual final é decisão de Woney pelo terminal
- **Não usar os termos "premium" ou "luxo"** em nenhuma parte da copy visível
- **Não usar construções do tipo "Não é X. É Y."** ou frases curtas justapostas em ritmo de impacto
- **Não traduzir para EN-US** (entrega exclusivamente PT-BR)
- **Não adicionar contato pessoal de quem assinou** — esta é proposta institucional Bicofino
- **Não inventar dados** — usar apenas os números e fontes da seção 7

### 5.6 Responsividade

- Desktop primary (1440px target)
- Tablet funcional (768px+)
- Mobile funcional (375px+) — tabelas viram empilhadas, mapa centralizado e reduzido, hero ajustado para a tela
- Print-ready: a página deve ter um stylesheet de impressão (`@media print`) que gere um PDF respeitável caso seja impressa. Esta é uma proposta que pode ser impressa por executivos antiquados.

### 5.7 Performance e SEO

- Página privada (não indexável) — adicionar `<meta name="robots" content="noindex,nofollow">`
- Mapa SVG inline, não imagem externa
- Sem fontes externas (usar a stack do DS)
- Lighthouse target: 95+ em desktop

---

## 6. CONTEÚDO FINAL PRONTO PARA COLAR (PT-BR)

Os textos abaixo estão prontos para uso direto na página. Não reescrever. Apenas adaptar formatação conforme componentes.

### 6.1 HERO

**Eyebrow (acima do título):** PROPOSTA ✦ CONFIDENCIAL

**Título:** O OUTRO MAPA

**Subtítulo:** 23 estados fora do eixo. 14 federações no primeiro recorte. Uma marca.

**Lead:** Quando Casas Bahia comprou o Paulistão, Superbet o Carioca, Sicoob o Mineiro e Bet365 o Gaúcho, o mapa do patrocínio esportivo brasileiro virou um quadrado. Fora dele estão os outros 23 estados do país — três regiões inteiras e algumas das torcidas mais fanáticas do Brasil. Esta é uma proposta para ocupar esse mapa inteiro de forma coordenada, começando por catorze federações estratégicas.

### 6.2 A TESE

**Bloco único:**

> O futebol brasileiro sustenta dois mercados de marca simultâneos. O primeiro é o eixo dos quatro grandes estaduais — Paulista, Carioca, Mineiro, Gaúcho —, hoje completamente tomado por contratos que vão de R$ 20 a R$ 30 milhões anuais. O segundo é o que sobra do mapa: 23 federações que organizam competições com torcidas fiéis, audiência regional consolidada e abertura comercial real — mas que negociam patrocínios fragmentados, individualmente, para anunciantes locais.
>
> O Outro Mapa organiza esse mercado em um único produto comercial. O recorte inicial cobre catorze federações estratégicas em quatro regiões. O horizonte de expansão é todo o restante do país.

**Citação destacada:**  
*"18 das 27 federações estaduais já firmaram naming rights em 2026." — CNN Brasil*

### 6.3 OS QUATRO DADOS DO CONTEXTO

**Card 1**
- Número: **47%**
- Frase: dos brasileiros assistem a pelo menos um jogo de futebol por semana
- Fonte: Nexus / CBF, 2025

**Card 2**
- Número: **158 milhões**
- Frase: é o tamanho da audiência total do mercado esportivo brasileiro
- Fonte: Meio e Mensagem, 2025

**Card 3**
- Número: **R$ 1,3 trilhão**
- Frase: foi o consumo das famílias do Nordeste em 2024 — 17,9% do consumo nacional
- Fonte: IPC Maps, 2024

**Card 4**
- Número: **R$ 20–30 mi**
- Frase: é a faixa anual dos contratos de naming rights das federações líderes
- Fonte: CNN Brasil, 2026

### 6.4 O MAPA — LEGENDA E NOTA

**Título da seção:** ✦ O MAPA

**Subtítulo:** Onde o pacote opera

**Texto explicativo (à esquerda do mapa em desktop, abaixo em mobile):**

> Vinte e três estados compõem o Outro Mapa — os 27 estados brasileiros menos os quatro Big 4 (São Paulo, Rio, Minas, Rio Grande do Sul). O recorte inicial deste pacote cobre catorze federações estratégicas em quatro regiões, com 57,7 milhões de habitantes na cobertura direta e alcance qualificado estimado em 73 milhões. As outras nove federações do Outro Mapa permanecem como horizonte de expansão para temporadas seguintes, conforme contratos vigentes em outras praças vencerem.

**Legenda do mapa:**
- ✦ Recorte inicial do pacote (14 estados) — categoria de destaque principal
- ✦ Expansão futura — outras 9 federações do Outro Mapa — categoria de destaque secundário
- ✦ Big 4 já comprados — categoria neutra (sinalizando ocupado)

### 6.5 OS TIERS — TEXTOS

**Eyebrow:** O CAMINHO BICOFINO

**Título:** Três tiers, três lógicas de valor

**Intro:**
> O pacote é construído em três níveis. Cada tier oferece um tipo distinto de retorno ao patrocinador. A combinação garante densidade de exposição no Nordeste, alcance institucional no Norte e Centro-Oeste, e narrativa de capilaridade nacional.

#### TIER 1 — Os clássicos regionais

**Estados:** Bahia, Pernambuco  
**Por que estão aqui:** os dois estaduais mais antigos e populares do Nordeste, com clubes de torcida nacional (Bahia, Vitória, Sport, Náutico, Santa Cruz).  
**O que entrega:** média de público acima de 7.000 pagantes por jogo, finais com audiência de 1,4 milhão de telespectadores em cada estado, redes oficiais ativas (97 mil seguidores no Instagram da FBF, 40 mil na FPF-PE), transmissão em TV aberta e YouTube com cobertura estadual.  
**Valor:** R$ 1,5 milhão por campeonato  
**Total do tier:** R$ 3 milhões (2 campeonatos)

#### TIER 2 — Os mercados estratégicos

**Estados:** Mato Grosso, Amazonas, Espírito Santo, Paraíba, Alagoas, Sergipe  
**Por que estão aqui:** cobrem quatro regiões do país, com clubes em ascensão nacional (Cuiabá na Série A, Manaus FC na Série B, Botafogo-PB na Série C, CRB e CSA em AL).  
**O que entrega:** transmissões consolidadas (TV Centro-América, FAF TV, TVE-ES, TV Cabo Branco), engajamento digital relevante — o Capixabão registrou 1,6 milhão de visualizações no YouTube e 12 milhões no Instagram em 2024 —, públicos médios entre 600 e 1.100 por jogo, com exclusividade comercial maior pela menor saturação de patrocinadores.  
**Valor:** R$ 650 mil por campeonato  
**Total do tier:** R$ 3,9 milhões (6 campeonatos)

#### TIER 3 — A capilaridade institucional

**Estados:** Mato Grosso do Sul, Piauí, Tocantins, Rondônia, Acre, Roraima  
**Por que estão aqui:** seis estados onde marcas grandes raramente investem. A escala futebolística é menor, mas a densidade simbólica é alta — o patrocinador chega a praças onde concorrência nenhuma chegou.  
**O que entrega:** exclusividade total em cada competição (o patrocinador "compra o campeonato inteiro"), oportunidade de digitalização e profissionalização da operação (qualquer investimento em transmissão profissional já é diferencial), narrativa de "marca que apoia a base do esporte brasileiro" com reverberação em mídia institucional.  
**Valor:** R$ 350 mil por campeonato  
**Total do tier:** R$ 2,1 milhões (6 campeonatos)

### 6.6 O QUE O PATROCINADOR LEVA

**Eyebrow:** PROPRIEDADES

**Título:** O que está incluído em cada campeonato

**Bloco 1 — Identidade e presença**
- Naming rights da competição
- Exclusividade no segmento de atuação
- Naming rights no troféu, medalhas e pódio de premiação
- Marca em destaque nos releases e posts oficiais

**Bloco 2 — Ativações físicas em campo**
- Placa central 12×1 metros em todos os jogos
- Placas atrás dos dois gols em todos os jogos
- Backdrop de entrevistas no intervalo e ao final
- 50 ingressos por partida (100 nas fases finais)
- Área dedicada de ativação nas finais

**Bloco 3 — Ativações digitais e de conteúdo**
- Três posts exclusivos nas redes sociais oficiais de até dez campeonatos
- Uma live em redes sociais de até cinco campeonatos
- Uma ativação especial nas finais de até cinco campeonatos
- Duas credenciais para influenciadores com acesso ao backstage da final
- Direito de produção de conteúdo próprio (custos de produção não inclusos)

**Bloco 4 — Direitos comerciais**
- Direito de licenciamento de produto ou serviço oficial
- Uso da logo dos campeonatos para promoções, sorteios, sampling, brindes, tour do troféu, Fan Zone, ações de abertura, PDV e campanhas de engajamento

### 6.7 GARANTIAS BICOFINO

**Eyebrow:** EXECUÇÃO

**Título:** Catorze federações sob uma única coordenação contratual

**Texto:**
> O patrocinador conduz uma negociação única em vez de catorze. Aprova um fluxo em vez de catorze. Recebe um dashboard consolidado em vez de catorze relatórios paralelos.
>
> O Bicofino atua como interface única entre o anunciante e as federações estaduais. Padronizamos os entregáveis, consolidamos os calendários, centralizamos os assets digitais, garantimos auditoria mensal e entregamos relatório final de temporada com ROI estimado por praça.
>
> A operação é coordenada por equipe dedicada do Studio Bicofino, com cobertura geográfica garantida em todas as catorze federações ao longo da temporada.

### 6.8 INVESTIMENTO

**Eyebrow:** INVESTIMENTO

**Título:** A estrutura financeira

**Tabela:**

| Componente | Valor |
|---|---|
| Tier 1 — Baiano e Pernambucano (2 × R$ 1,5 mi) | R$ 3.000.000 |
| Tier 2 — Seis campeonatos (6 × R$ 650 mil) | R$ 3.900.000 |
| Tier 3 — Seis campeonatos (6 × R$ 350 mil) | R$ 2.100.000 |
| Coordenação, padronização e garantias Bicofino | R$ 3.000.000 a R$ 5.000.000 |
| **TOTAL — Pacote base** | **R$ 12.000.000** |
| **TOTAL — Pacote ampliado (com ativações expandidas)** | **R$ 14.000.000** |

**Nota:** Pagamento em parcelas trimestrais, primeiro aporte na assinatura. Cobertura: temporada 2027 (janeiro a abril). Opção de renovação para 2028 com reajuste a definir.

### 6.9 CRONOGRAMA

**Eyebrow:** PRAZOS

**Título:** Os marcos da operação

| Marco | Período |
|---|---|
| Apresentação ao anunciante | Junho/2026 |
| Negociação | Junho a Agosto/2026 |
| Assinatura do contrato master | Setembro/2026 |
| Contratos individuais com federações | Outubro/2026 |
| Anúncio público da parceria | Novembro/2026 |
| Estreia do pacote em campo | Janeiro/2027 |

### 6.10 PRÓXIMO PASSO

**Texto único, centralizado, sem CTA agressivo:**

> Esta proposta foi desenhada para ser apresentada em conversa estruturada. Para agendar, escreva para **propostas@bicofino.com**.
>
> Studio Bicofino — São Paulo

### 6.11 FOOTER

```
©bicofino  |  bicofino.com
O Outro Mapa — v1.0 — 22 de maio de 2026
Documento confidencial. Distribuição restrita.
```

---

## 7. FONTES E AUDITORIA DE DADOS

Toda estatística usada na página deve ser rastreável. Lista completa com fonte e data de consulta. Esta tabela deve viver em um arquivo separado `docs-site/propostas/o-outro-mapa/SOURCES.md` para facilitar atualização futura.

| Dado | Valor usado | Fonte | URL | Data consulta |
|---|---|---|---|---|
| População 14 estados (soma) | 57.730.915 | IBGE — Estimativas População 2025 | ftp.ibge.gov.br/Estimativas_de_Populacao/Estimativas_2025/ | 22/05/2026 |
| População Bahia | 14.870.907 | IBGE 2025 | idem | 22/05/2026 |
| População Pernambuco | 9.562.007 | IBGE 2025 | idem | 22/05/2026 |
| % brasileiros que assistem futebol semanalmente | 47% | Pesquisa Nexus/CBF 2025 | nexus.fsb.com.br | 22/05/2026 |
| Audiência mercado esportivo BR | 158 milhões | Meio e Mensagem, citado por Oneck Creative, 2026 | oneckcreative.com.br/blog | 22/05/2026 |
| Consumo famílias Nordeste 2024 | R$ 1,3 trilhão | IPC Maps via Movimento Econômico | movimentoeconomico.com.br | 22/05/2026 |
| Federações com naming rights firmado em 2026 | 18 de 27 | CNN Brasil, fev/2026 | cnnbrasil.com.br/esportes/futebol/ | 22/05/2026 |
| Faixa de valores contratos grandes | R$ 20-30 mi | CNN Brasil, fev/2026 | idem | 22/05/2026 |
| Naming rights Paulistão 2026 → Casas Bahia | confirmado | Lance!, dez/2025 | lance.com.br/lancebiz/ | 22/05/2026 |
| Naming rights Superbet em 6 estaduais | confirmado | FocusGN, jan/2026 | focusgn.com/brasil | 22/05/2026 |
| Naming rights Baiano 2026 → Mansão Green | confirmado | CNN Brasil, fev/2026 | idem | 22/05/2026 |
| Engajamento Capixabão 2024 (1,6 mi YT + 12 mi IG) | conforme briefing original | Briefing recebido (Federações) | doc interno | 22/05/2026 |
| Público médio Baiano 2024 (7.003) | conforme briefing original | Briefing recebido | doc interno | 22/05/2026 |
| Público médio Pernambucano 2024 (7.253) | conforme briefing original | Briefing recebido | doc interno | 22/05/2026 |
| Seguidores FBF / FPF-PE (97k / 40k) | conforme briefing original | Briefing recebido | doc interno | 22/05/2026 |
| Audiência final Baiano e Pernambucano (1,4 mi cada) | conforme briefing original | Briefing recebido | doc interno | 22/05/2026 |
| Mercado global patrocínio esportivo 2030 | US$ 190 bi | Negócios SC via Oneck Creative | oneckcreative.com.br/blog | 22/05/2026 |
| Sicredi expandiu para 8,5 mi associados via futebol | confirmado | Sicredi institucional | sicredi.com.br | 22/05/2026 |

**Importante:** os dados do briefing original (públicos médios, audiências de finais, redes sociais das federações) ainda precisam de validação adicional com cada federação antes da apresentação final ao anunciante. Sinalizar isso como TODO para Woney.

---

## 8. CRITÉRIOS DE APROVAÇÃO

Antes de Woney aprovar a página, validar:

### 8.1 Estrutural e técnico

- [ ] Página renderiza no `docs-site` em `localhost:3001/propostas/o-outro-mapa`
- [ ] Sidebar tem entrada nova para "Propostas → O Outro Mapa"
- [ ] Componentes novos têm story no Storybook
- [ ] Tokens do DS usados em todos os elementos (zero CSS solto, zero hex hardcoded)
- [ ] Nenhum componente shadcn default sem theming via DS
- [ ] Diretrizes visuais específicas validadas com Woney pelo terminal antes de mergear

### 8.2 Conteúdo

- [ ] Toda a copy da seção 6 está na página, sem reescrita
- [ ] Nenhum emoji, exceto ✦
- [ ] Nenhuma menção a "premium" ou "luxo" no copy visível
- [ ] Nenhuma construção "Não é X. É Y." em nenhum bloco
- [ ] Dados citados com fonte rastreável
- [ ] SOURCES.md criado em `docs-site/propostas/o-outro-mapa/SOURCES.md`

### 8.3 Funcional

- [ ] Página é noindex/nofollow
- [ ] Responsivo desktop / tablet / mobile
- [ ] Print stylesheet funcional (gera PDF respeitável)
- [ ] Lighthouse 95+ em desktop
- [ ] Sem console errors no browser
- [ ] Mapa SVG inline (não imagem)

### 8.4 Estratégico

- [ ] Nenhum dado de cliente exposto (BoviChain, Kerchner, etc. não devem aparecer)
- [ ] Tom de dossiê, não de "site comercial"
- [ ] CTA discreto (email, não formulário)
- [ ] Footer com versão e data
- [ ] Marcador de confidencialidade visível

---

## NOTAS FINAIS PARA WONEY

**Decisões já tomadas nesta versão (v1.1):**

1. ✦ Nome "O Outro Mapa" — mantido
2. ✦ Narrativa expandida para 23 estados fora dos Big 4 (com 14 cobertos no recorte inicial)
3. ✦ Números e valores do briefing original — mantidos integralmente
4. ✦ Neutralidade na página — categoria de anunciante-alvo permanece apenas no documento interno (seção 4.4), sem aparecer na página pública
5. ✦ Versão única em PT-BR — backlog EN-US removido
6. ✦ Versão física (dossiê impresso) — possibilidade preservada via stylesheet de impressão
7. ✦ Diretrizes visuais — removidas do briefing; serão passadas por Woney diretamente pelo terminal durante o desenvolvimento

**Pontos abertos que ainda merecem decisão antes da publicação:**

1. **Número "73 milhões"** no contexto de alcance — é estimativa qualificada (TVs estaduais + afiliadas + canais digitais), não soma de habitantes. Soma exata de habitantes dos 14 estados é 57,7 milhões. Decidir se o framing está confortável ou ajustar.

2. **Margem Bicofino (R$ 3-5 mi)** — exposta de forma estruturada no documento. Avaliar se essa transparência é estratégica ou se a apresentação ao anunciante deve fechar apenas o número final (R$ 12-14 mi) sem decomposição.

3. **Validação dos dados das federações** — públicos médios, audiências e seguidores que vieram do briefing original precisam de validação técnica direta com cada uma das 14 federações antes da apresentação ao anunciante. Idealmente, fechar um documento de "Federation Brief" para cada uma.

4. **Apresentação física** — a página digital é a referência. Considerar gerar versão impressa em formato dossiê A4 horizontal para entregas executivas. Pode ser gerada a partir do mesmo conteúdo via stylesheet de impressão.

---

*Fim do briefing mestre. Versão 1.1 — 22 de maio de 2026.*
