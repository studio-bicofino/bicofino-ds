---
tipo: decisao
titulo: Vitrine de produtos — sistemas internos apresentados como produtos vendáveis, com preço de mercado como régua
data: 2026-06-12
projetos: [produtos-bicofino, woney-registro]
fontes: [apps/produtos/STATUS.md]
status: vigente
tags: [produtos, vitrine, comercial, valor]
---

**Contexto:** o Studio acumulou sistemas internos (Casa Nostra, Drive do Atleta, card-jogos, image-pipeline etc.) cujo valor é invisível para quem não acompanha o dia a dia — inclusive para o Fabio.

**Decisão:** criar `apps/produtos` (porta 3043), uma página única que apresenta os 9 sistemas próprios do Studio **como produtos de um catálogo comercial**: o que está construído, o que o mercado cobraria por encomenda equivalente e o que custa operar (assinaturas/ferramentas por produto). A faixa de números do portfólio — **R$ 773 mil de valor de mercado · 81 semanas de fila · 9 produtos** — espelha a dimensão de terceirização do woney-registro (pesquisa BR de 12/06, câmbio 5,40; metodologia em `decisao/terceirizacao-benchmark-obrigatorio.md`).

**Por quê:** a tese é tornar o valor do trabalho interno legível em linguagem de mercado. "Construímos 9 sistemas" não comunica; "isso custaria R$ 773 mil e 81 semanas de fila se fosse encomendado fora" comunica — para o Fabio e, eventualmente, para clientes. A página inclui uma nota de honestidade e mostra **só a referência de mercado, de propósito**: preço Bicofino por produto só será decidido se um dia houver venda real — a vitrine informa e posiciona, não vende ainda.

Visualmente, segue a pegada do Registro de Impacto (tokens DS, Gotham impact, bento, accent randomizado), com card stack no scroll portado do motion-lab EXP-10 e mood dial portado do la-rete via contrato portátil (`framework/mood-dial-contrato-portatil.md`).

**Alternativa descartada:** documento interno ou planilha de valuation — não carrega a credibilidade de ver cada produto apresentado no padrão visual do próprio Studio, que é em si a demonstração do produto.
