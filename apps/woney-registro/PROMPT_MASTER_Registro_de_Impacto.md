# PROMPT MASTER — App "Registro de Impacto" (Studio Bicofino)

> Cole este bloco inteiro no Claude Code, na raiz de um repositório novo ou dentro do monorepo do Design System. Ajuste os caminhos marcados com ⚠️ antes de rodar.

---

Você vai construir um web app chamado **Registro de Impacto**. Leia este briefing inteiro antes de escrever qualquer código.

## 1. Por que este app existe (não pule)

Eu construo sistemas e automações que economizam tempo e dinheiro para o Studio Bicofino. O problema não é técnico: é de percepção. Quem decide enxerga a arte que sai pronta, mas não enxerga o sistema que a produziu, nem o tempo que deixou de ser gasto. Este app existe para tornar **visível** o que hoje é invisível — traduzir trabalho de sistemas em duas moedas que o decisor lê na hora: **horas economizadas** e **reais**.

A consequência disso governa todo o produto:

- **A tela inicial é o argumento, não o formulário.** Quem abre o app vê números grandes e as artes produzidas, lado a lado. O CRUD de cadastro fica atrás, em telas próprias. Nunca receba o usuário com um formulário.
- **Simples, não simplista.** Captura de dado é de 3 campos e um arrastar de imagem. A complexidade do cálculo mora no código, nunca na cara do usuário.
- **A arte é a evidência; o número é o argumento.** Toda peça (story, card, proposta) aparece sempre amarrada à frase "isto levou 20 min em vez de 1h". Imagem e número são uma coisa só.

## 2. Stack (use exatamente este)

- **Next.js (App Router) + TypeScript + Tailwind CSS**, deploy na Vercel.
- **Supabase**: Postgres para dados, Storage para as imagens das peças. Use o cliente `@supabase/supabase-js`. Variáveis em `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- Sem libs de UI pesadas. Componentes próprios + Tailwind.
- ⚠️ **Design tokens:** importe os tokens do Design System Bicofino. Leia `DESIGN.md`, `STATUS.md` e `CLAUDE.md` do repositório do DS e use as variáveis de cor, tipografia e espaçamento de lá como fonte da verdade. Não invente paleta nova. Se este app viver fora do monorepo, copie o arquivo de tokens e referencie no `tailwind.config`.

## 3. Identidade visual (regras inegociáveis)

- Estética contida: muito espaço em branco, tipografia como protagonista, paleta restrita aos tokens do DS. Hierarquia por tamanho e peso, não por cor saturada.
- Os números de impacto são os maiores elementos de cada tela. Tudo o mais é suporte.
- **Proibido na escrita da interface e nos textos gerados:**
  - A construção "X, não Y" e variações ("não é A, é B", "rápido, não caro"). Afirme sem negar.
  - As palavras "premium" e "luxo".
- Tom dos textos: de atelier — a sofisticação aparece na execução, não na autodeclaração. Sem superlativo genérico.

## 4. Modelo de dados (Supabase)

Crie estas tabelas. Gere as migrations.

```sql
-- Configurações globais (uma única linha, id = 1)
create table settings (
  id int primary key default 1,
  salario_mensal numeric default 17000,
  horas_uteis_mes numeric default 160,
  ferramenta_usd numeric default 100,       -- Claude Max 5x, US$/mês
  cambio_usd_brl numeric default 5.04,
  encargos_cartao numeric default 0.0438,   -- IOF/spread
  stories_mes numeric default 8,            -- premissa de projeção
  propostas_mes numeric default 2,
  dev_salario_base numeric default 5000,    -- dev júnior, base R$/mês (SP, jun/2026)
  dev_mult_empregador numeric default 1.8,  -- CLT carregado; ~1.0–1.1 se PJ
  dev_fracao_fte numeric default 0.5        -- fração de um dev que eu cubro
);

-- Sistemas e automações construídos
create table sistemas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  tipo text not null check (tipo in ('eficiencia','infraestrutura','projeto')),
  criado_em date default now(),
  investimento_horas numeric default 0,     -- custo único de construir
  tempo_antes_min numeric,                  -- só eficiência (por peça)
  tempo_depois_min numeric,                 -- só eficiência (por peça)
  tempo_antes_dias numeric,                 -- só projeto (escala de projeto)
  tempo_depois_dias numeric,                -- só projeto
  destravou text,                           -- só infraestrutura
  natureza_valor text,                      -- só infraestrutura
  notas text
);

-- Cada aplicação de um sistema de eficiência (gera a galeria)
create table usos (
  id uuid primary key default gen_random_uuid(),
  sistema_id uuid references sistemas(id) on delete cascade,
  data date default now(),
  legenda text,                             -- ex: "Anúncio Kerchner x Santos"
  imagem_url text                           -- screenshot da peça no Supabase Storage
);
```

Bucket de Storage: `pecas` (público para leitura).

## 5. Lógica de cálculo (espelhe exatamente — sem improviso)

Implemente num módulo puro `lib/calc.ts`, testável, sem acesso a banco.

```
custo_hora        = salario_mensal / horas_uteis_mes
custo_ferramenta  = ferramenta_usd * cambio_usd_brl * (1 + encargos_cartao)   // R$/mês

// por sistema de eficiência:
economia_por_uso_h = (tempo_antes_min - tempo_depois_min) / 60
usos_ate_hoje      = COUNT(usos do sistema)
economia_acum_h    = economia_por_uso_h * usos_ate_hoje
saldo_liquido_h    = economia_acum_h - investimento_horas
usos_payback       = economia_por_uso_h <= 0 ? 0 : CEIL(investimento_horas / economia_por_uso_h)
status             = usos_ate_hoje >= usos_payback
                      ? "Pago — lucro líquido"
                      : `Faltam ${usos_payback - usos_ate_hoje} usos p/ break-even`

// totais de eficiência: soma sobre sistemas tipo 'eficiencia'
horas_economizadas_total = Σ economia_acum_h
valor_economizado_brl    = horas_economizadas_total * custo_hora
saldo_liquido_brl        = (Σ saldo_liquido_h) * custo_hora

// infraestrutura (não entra em payback de eficiência):
capital_infra_brl = Σ (investimento_horas * custo_hora)  sobre tipo 'infraestrutura'

// ganhos pontuais de projeto (escala de dias, uma vez) — ex: site em código vs Framer:
dias_economizados   = tempo_antes_dias - tempo_depois_dias
horas_proj          = dias_economizados * 8           // dia útil = 8h
valor_projeto_brl   = horas_proj * custo_hora
valor_projetos_total = Σ valor_projeto_brl  sobre tipo 'projeto'

// realizado até hoje (one-time + acumulado de peças):
valor_realizado_ate_hoje = valor_economizado_brl + valor_projetos_total

// custo fixo evitado (dev júnior que não foi contratado) — recorrente:
custo_dev_empresa   = dev_salario_base * dev_mult_empregador   // R$/mês fully loaded
custo_fixo_evitado  = custo_dev_empresa * dev_fracao_fte       // R$/mês
// nota: a alternativa real era salário + dev; a capacidade entra no meu papel, sem nova vaga.

// projeção / valor recorrente no ritmo atual:
economia_mes_h    = stories_mes * economia_por_uso_h(template) + propostas_mes * economia_por_uso_h(propostas)
economia_mes_brl  = economia_mes_h * custo_hora
valor_recorrente_mes = economia_mes_brl + custo_fixo_evitado - custo_ferramenta
valor_recorrente_ano = valor_recorrente_mes * 12
ferramenta_paga_x = (economia_mes_brl + custo_fixo_evitado) / custo_ferramenta
```

Regra de honestidade: se um sistema ainda não atingiu payback, **mostre isso**, não esconda. Número honesto vale mais com o sócio cético do que número inflado.

## 6. Telas

### 6.1 Painel (`/`) — a tela do fechamento
A primeira coisa que se vê. Em ordem:
1. Faixa de **números grandes**: Valor líquido recorrente/ano (R$), Economia até hoje (R$), "A ferramenta se paga Nx por mês". Tipografia enorme, tokens do DS. Logo abaixo, em segundo plano, a decomposição: economia de eficiência + custo fixo evitado (dev) − custo da ferramenta.
2. **Galeria viva**: tira horizontal com as peças mais recentes (imagem + legenda + "20 min em vez de 1h"). Clicável.
3. **Frases para o Connector**: 3–4 frases geradas a partir dos números reais, prontas para copiar (botão "copiar"). Use exatamente o tom do bloco 7 abaixo. Respeite as proibições de escrita.
4. Seletor de mês no topo: trocar o mês recalcula tudo para aquele período (ver 6.5).

### 6.2 Sistemas (`/sistemas`)
Lista os sistemas com payback, economia acumulada e status. Botão para criar/editar (formulário simples). Separe visualmente **Eficiência** de **Infraestrutura** — essa divisão é o argumento de CapEx vs OpEx e precisa ficar clara.

### 6.3 Registrar uso (`/registrar`)
Captura rápida: escolher sistema → data → legenda → arrastar a imagem da peça. Salva em `usos` + Storage. Três campos. Nada além disso.

### 6.4 Galeria (`/galeria`)
Grade de todas as peças, filtrável por mês e por sistema. Cada card: imagem, legenda, sistema de origem, tempo economizado. É a prova visual amarrada ao número.

### 6.5 Fechamento do mês (`/fechamento`)
Seleciona um mês e gera uma página de resumo pronta para mostrar: números daquele mês + galeria das peças daquele mês + as frases. Botão "exportar" (print para PDF via `window.print()` com folha de estilo de impressão limpa) e link compartilhável. É o artefato que eu apresento no fim do mês.

## 7. Frases geradas (tom obrigatório)

Gere dinamicamente a partir dos números, neste registro. Exemplos do alvo:

- "Cada story de jogo passou de 1h para 20 min. No ritmo de {stories_mes} por mês, isso libera {x}h de produção — capacidade que volta para o trabalho que só eu faço."
- "As propostas saem em 40 min, contra cerca de 3h antes. O Design System já se pagou em tempo de proposta."
- "O Claude Max 5x custa cerca de R$ {custo_ferramenta}/mês e devolve R$ {economia_mes_brl}/mês em tempo que deixou de existir — paga-se {ferramenta_paga_x} vezes."
- "Dashboard, automações, o Design System e este próprio app são trabalho de desenvolvedor. Em vez de abrir uma vaga de dev júnior — cerca de R$ {custo_dev_empresa}/mês carregado — essa capacidade entra no meu papel, com o Claude Code como alavanca."
- "O site do Bicofino saiu em código em uma semana. O mesmo no Framer levaria cerca de 20 dias — o site da BoviChain, mais complexo, levou seis semanas. O Design System torna esse ritmo possível."
- "O Design System custou ~1 mês do meu tempo, uma vez. Sustenta site, propostas e toda peça futura. Comporta-se como trilho de ferrovia: caro de assentar, barato de usar, destrava rotas que antes não existiam."

## 8. Seed (popule o banco já com meus dados reais)

`settings`: usar os defaults acima.

`sistemas`:
1. nome "Template de stories animados (jogos)", tipo `eficiencia`, investimento_horas 4, tempo_antes_min 60, tempo_depois_min 20.
2. nome "Propostas via Design System", tipo `eficiencia`, investimento_horas 0, tempo_antes_min 180, tempo_depois_min 40. (notas: capital viabilizador está no Design System)
3. nome "Design System Bicofino", tipo `infraestrutura`, investimento_horas 160, destravou "Base das propostas, do site e de toda peça, padrão de marca, capability de Claude Code do zero", natureza_valor "Ativo permanente; infraestrutura, não despesa".
4. nome "Site Bicofino v1 (em código)", tipo `projeto`, tempo_antes_dias 20, tempo_depois_dias 5. (notas: benchmark — site BoviChain levou 6 semanas no Framer; Bicofino é mais simples; base no Design System)

`usos`: 2 registros para o sistema 1 e 3 registros para o sistema 2 (imagens podem ficar vazias por ora; eu subo depois).

## 9. Critérios de aceite

- Abrir em `/` mostra números grandes e galeria — nunca um formulário.
- Os números batem com a lógica do bloco 5 (com o seed: **valor realizado até hoje ~R$ 13.635** — sendo ~R$ 885 em peças e R$ 12.750 no site; valor líquido recorrente ~R$ 5.036/mês ≈ R$ 60 mil/ano; ferramenta paga ~10,6x).
- Registrar um uso novo atualiza o Painel sem recarregar manualmente.
- `/fechamento` de um mês imprime limpo em PDF.
- Nenhum texto da interface usa a construção "X, não Y" nem as palavras "premium"/"luxo".
- Deploy na Vercel funcionando, conectado ao Supabase.

Comece criando as migrations e o `lib/calc.ts` com testes, depois o Painel, depois as demais telas. Me mostre o `calc.ts` e o esquema do banco antes de seguir para o resto.
