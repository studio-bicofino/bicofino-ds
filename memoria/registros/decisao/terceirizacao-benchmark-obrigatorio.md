---
tipo: decisao
titulo: Todo sistema novo nasce com bloco de terceirização (benchmark de mercado)
data: 2026-06-12
projetos: [registro-impacto]
fontes: [apps/woney-registro/STATUS.md]
status: vigente
tags: [valor, terceirizacao, benchmark, regra]
---

**Contexto.** O Registro de Impacto media o valor dos sistemas internos só pela ótica do tempo economizado e do custo interno. Faltava a comparação que mais fala com terceiros: quanto custaria CONTRATAR o mesmo sistema fora.

**Decisão (Woney, 2026-06-12).** Cada sistema do Registro ganhou um bloco `terceirizacao` (em `types.ts`): faixa mín–média–máx em R$, prazo em semanas, escopo e fontes — preço de software house/agência BR (pesquisa de mercado 2025/26: IT Show, UDS, Plathanus, Coruja Lab, APPWRK/Taction p/ DAM, Via Agência Digital/ID7 p/ branding, câmbio 5,40). `analisarTerceirizacao()` em `calc.ts` agrega o total (na data: média R$ 773 mil, faixa R$ 507 mil–1,26 mi), a fila sequencial (81 semanas ≈ 19 meses), o custo interno honesto (~R$ 26,6 mil) e o múltiplo (~29×). Itens `por_uso: true` (propostas) multiplicam pelos usos.

**A REGRA daqui pra frente (pedido explícito do Woney):** todo sistema novo registrado deve NASCER com o bloco `terceirizacao` preenchido — valor e prazo que custaria fora. Não é retrofit opcional; é parte do registro.

**Por quê.** O custo interno sozinho subestima o valor: o múltiplo de ~29× só aparece quando se compara com o mercado, e a fila de 19 meses mostra o que velocidade interna significa. É o argumento de venda do modelo designer+dev.

**Cuidado registrado junto:** estimativas de horas feitas sem o Woney (na data: `sis-casa-nostra` 24h, `sis-la-rete` 10h) são provisórias e devem ser calibradas com ele — o benchmark de mercado vale, a hora interna chutada não.
