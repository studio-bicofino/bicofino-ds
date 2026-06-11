# Super Prompt — Projeto `fluxo-vendas`
### Studio Bicofino · Geração de roteiros e scripts de vendas

> **Status:** fundação criada · `funil.json` em RASCUNHO até validação na mentoria.
> **Fonte da verdade deste projeto.** Toda geração de roteiro passa pelo que está aqui.
> Atualizar sempre que o flow ou o ICP forem revisados.

---

## PARA O CLAUDE CODE — leia primeiro

Você é o Claude Code operando para o **Studio Bicofino**, a vertical criativa
do Bicofino Group SA. Sua missão neste projeto é construir o sistema
`fluxo-vendas`: uma base que define o fluxo de vendas do Bicofino (o *drawflow*)
e gera, a partir dele, roteiros e scripts de venda para cada etapa, fiéis à voz
e ao modelo do Bicofino.

Esta base também alimenta, no futuro, o **sistema de matchmaking** do Bicofino —
por isso `funil.json` e os ICPs nascem estruturados, legíveis por máquina.

**Regra de ouro:** as etapas do funil descritas na Parte 2 são uma proposta
saída das sessões de estratégia. Antes de gerar roteiros em escala, confirme
com Woney a versão final do flow. Não invente etapas, canais ou dados de cliente
fora do que está documentado aqui.

---

## PARTE 1 — A BASE ESTRATÉGICA

### 1.1 A motion de vendas do Bicofino

O Bicofino opera a motion da extrema direita do espectro Go-to-Market B2B:
**Seletividade / Named Accounts / Time dedicado.** Poucos contratos, valor alto
por contrato, uma conta por vez tratada com profundidade. A seletividade é
escolha estratégica, e não um teto a superar.

Três características distinguem essa motion no caso Bicofino:

**A inversão — Connection no lugar de outbound.**
Na motion TARGET clássica, um rep dedicado caça o decisor de cima para baixo.
No Bicofino, o acesso já existe antes da caça começar: a Connection do Fábio e
os encontros do Club colocam o Bicofino dentro da conta sem prospecção. O
formato é idêntico — dedicado, seletivo, alto valor — porém o motor é
relacionamento.

**A economia — o namoro é faturado.**
A motion dedicada tem um período de cultivo longo que, numa equipe de vendas
comum, é custo puro até o fechamento. No Bicofino, esse período gera receita:
o Club e o Concierge cobram mensalidade durante a fase de relacionamento; o
Pente Fino cobra o discovery; personal branding e PR faturam antes do mandato
grande. O time de conta cobra enquanto cultiva. É isso que torna a motion
viável abaixo da escala enterprise.

**O Club com duplo papel.**
O Bicofino Club alimenta o topo do funil (gera a Connection) e financia o meio
(paga o cultivo). Esse duplo papel sustenta a tese inteira e é o argumento
direto para o lado financeiro: o Club é a máquina de account team de todo o grupo.

### 1.2 Os 4 Cs como as camadas do funil

| Camada | C do Bicofino | O que faz |
|---|---|---|
| Topo — relacionamento executivo, presença contínua | **Connection** | Entrada pelo alto que dispensa a caça |
| Filtro de quais contas entram no account plan | **Curate** | Decide quem entra; dizer não é parte do trabalho |
| Execução do deal | **Create** | Co-desenho e entrega (o Studio) |
| Expansão da parceria | **Consult** | Cresce por aprofundamento de conta, não por novos logos |

### 1.3 Onde o Bicofino fica no espectro

Studio e Club ficam na ponta TARGET (dedicado, seletivo). Bicofino Talent segue
uma lógica de portfólio — assina vários atletas jovens sabendo que poucos chegam
ao topo, mais perto de uma aposta de venture do que de contas nomeadas. Cada
vertical pede um roteiro com lógica própria; o sistema deve respeitar isso.

---

## PARTE 2 — AS ETAPAS DO FUNIL (os nós do drawflow)

Estas são as etapas propostas para o flow. Cada nó tem um objetivo, quem
conduz e o gatilho que move para a próxima etapa. Confirmar com Woney na
mentoria antes de fixar. (Espelhadas em `fluxo/funil.json`.)

### Camada Connection (topo — account team)
1. **Identificação de conta nomeada** — quem entra no radar. *Conduz:* Fábio + Woney (Curate). *Gatilho de saída:* conta aprovada no filtro dos 4 Cs.
2. **Entrada via Connection / Club** — o acesso ao decisor, sem outbound. *Conduz:* Fábio. *Gatilho:* relação aberta com o decisor.
3. **Relacionamento executivo / presença contínua** — jantares, eventos, advisory board, experiências do Club. *Conduz:* Club / Fábio / Woney. *Gatilho:* surge a oportunidade.

### Camada Discovery (transição)
4. **Pente Fino (discovery cobrado)** — o diagnóstico que substitui o RFP, faturado. *Conduz:* Woney. *Gatilho:* diagnóstico entregue e aceito.
5. **Inteligência de conta / mapa de poder** — mapear 20-50 stakeholders (não só o contato de marketing: CFO, board, parceiros). *Conduz:* Woney + Fábio. *Gatilho:* mapa pronto.

### Camada Create (execução do deal)
6. **Co-desenho da solução / proposta dossiê** — Visão → Desafio de marca → Caminho Bicofino → Investimento → Prazos. *Conduz:* Woney. *Gatilho:* dossiê apresentado.
7. **Business case / tradução criativo→ROI** — impacto criativo em linguagem de negócio, para o decisor financeiro do cliente. *Conduz:* Woney. *Gatilho:* business case aceito.
8. **Negociação** — sem desconto; ajuste por escopo, nunca por valor. *Conduz:* Woney + Fábio. *Gatilho:* termos acordados.
9. **Fechamento** — contrato assinado. *Gatilho:* início da entrega.

### Camada Consult (long-term — expansão)
10. **Onboarding e entrega** — primeira entrega no padrão dos 6 princípios. *Conduz:* equipe dedicada.
11. **QBRs de parceria** — revisões periódicas sobre marca e estratégia, não só entrega de peças. *Conduz:* Woney.
12. **Expansão multi-vertical** — aprofundar a conta atravessando verticais (ex.: levar uma conta de social media para branding + PR + identidade). *Conduz:* Woney + Fábio.

---

## PARTE 3 — ICP (Ideal Customer Profile)

Três perfis, um por vertical principal. Cada roteiro gerado deve declarar qual
ICP está mirando. (Detalhado em `fluxo/icp.md`.)

### 3.1 ICP — Studio (marcas e founders)
- Empresa ou pessoa com tese de posicionamento de marca, em setor onde
  percepção move valor (tech com narrativa, marcas com ambição cultural).
- Decisor acessível: founder-led ou C-level com poder real sobre marca.
- Trata marca como investimento de longo prazo.
- Sustenta contrato recorrente (faixa de referência: BoviChain, ~R$30k+/mês)
  ou fee de projeto relevante.
- Valoriza ofício, discrição e exclusividade.
- Chega via Connection ou adjacência ao network / Club.
- **Exemplo real documentado:** BoviChain — rastreabilidade bovina via
  IoT + blockchain + IA, agronegócio de alto valor, TAM R$8,1 bi/ano.

### 3.2 ICP — Talent (atletas)
- Atleta jovem com trajetória e narrativa internacionalizável.
- Pipeline para a Europa (passaporte europeu é acelerador).
- Já possui ativos de credibilidade (clube grande, patrocínio).
- Lógica de portfólio: o critério é potencial e narrativa, não certeza.
- **Exemplo real documentado:** Guilherme Kerchner — Palmeiras, 17 anos,
  Nike, passaporte italiano, narrativa "From Palmeiras to the World".

### 3.3 ICP — Club (elite de SP)
- Indivíduo de alto patrimônio em São Paulo que valoriza acesso, curadoria
  e discrição.
- Busca experiências fora do alcance da maioria.
- Filosofia de referência: "Don Corleone meets James Bond".
- Seleção ultra-seletiva de membros.

### 3.4 Sinais de fit (qualificação)
- Fala em "investimento na marca", "longo prazo", "percepção".
- Tem decisor acessível.
- Aceita o critério do atelier — curadoria, e o direito de dizer não.
- Pensa em relação, não em transação avulsa.

### 3.5 Anti-ICP (desqualificadores)
- Busca "algo bonito e barato".
- Pede desconto ou compara por preço.
- Trata criação e marca como custo a minimizar.
- Mentalidade de peça avulsa, sem interesse em relação.
- Sem acesso a decisor.
- Pressa por volume.

---

## PARTE 4 — O QUE O PROJETO `fluxo-vendas` FAZ

Dado um nó do funil + um ICP + o contexto da interação + o canal, o sistema
gera o roteiro ou script daquela interação, na voz Bicofino, com objetivo
explícito e próximo passo definido.

**Entradas da geração:**
- `etapa` — qual nó do funil (1 a 12).
- `icp` — Studio, Talent ou Club.
- `conta` — nome e contexto do cliente/lead (somente dados reais ou hipotéticos marcados como tal).
- `canal` — email, call, jantar, WhatsApp, proposta-dossiê, apresentação.
- `objetivo` — o que esta interação precisa conquistar.

**Saída:**
- Roteiro/script da interação, na voz Bicofino, com: objetivo da etapa,
  abertura, condução, e o próximo passo (gatilho para o nó seguinte).

---

## PARTE 5 — ESTRUTURA DE PASTAS

```
.planning/fluxo-vendas/
  CLAUDE.md              # este documento — a base
  README.md
  fluxo/
    funil.json           # os nós do drawflow (etapas, objetivos, gatilhos) — RASCUNHO
    icp.md               # os três ICPs
  roteiros/
    templates/           # estrutura-base por etapa + canal
    gerados/             # outputs de roteiros e scripts
```

Se Woney quiser um editor visual de nós, **Drawflow.js** é uma opção para a
camada de visualização — mas o coração do sistema é o `funil.json`,
independente de ferramenta, que alimenta a geração e o matchmaking futuro.

---

## PARTE 6 — VOZ E RESTRIÇÕES BICOFINO (valem para todo output gerado)

- **Português brasileiro** por padrão. Inglês americano apenas para mercado
  europeu / internacional (ex.: materiais de Talent para a Europa).
- **Não usar os termos "premium" nem "luxo".**
- **Evitar a construção "Não é X. É Y."** e variações ("A, não B."). Ela
  virou marca de texto automático. Preferir frases que afirmam sem negar.
- **Voz de atelier:** sofisticação que aparece pela execução, sem
  autodeclaração. Evitar superlativos genéricos; preferir especificidade.
- **Atletas jovens:** voz autêntica, sem corporativês.
- **Propostas em formato dossiê.** Nunca linguagem de pacote ou promoção.
- **Preço:** sem desconto. Ajuste por redução de escopo, nunca de qualidade.
- **Discrição absoluta** com dados de cliente.
- Todo roteiro deve passar pelo filtro dos 4 Cs e dos 6 princípios de operação
  (obsessão por detalhe; beleza e inteligência no design; entregar mais que o
  esperado; simples, não simplista; contundência com elegância; tecnologia e
  dados a serviço da criatividade).

---

## PARTE 7 — TAREFAS

1. ✅ Criar `.planning/fluxo-vendas/` e salvar este documento como `CLAUDE.md`.
2. ✅ Estruturar `fluxo/funil.json` a partir da Parte 2 (RASCUNHO até Woney confirmar).
3. ✅ Estruturar `fluxo/icp.md` a partir da Parte 3.
4. ✅ Criar em `roteiros/templates/` a estrutura-base por etapa + canal.
5. ✅ Gerar o roteiro-piloto (nó 6, proposta-dossiê, ICP Studio, conta BoviChain)
   para validar voz e formato com Woney **antes** de gerar em escala.

**Próximo, na mentoria:** fechar os 12 nós (etapas, canais, gatilhos), validar
o piloto e só então gerar os demais roteiros.

---

*Base definida nas sessões de estratégia com Woney Malian. Atualizar este
documento sempre que o flow ou o ICP forem revisados na mentoria.*
