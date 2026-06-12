---
tipo: processo
titulo: Em features grandes, despachar sub-agentes em paralelo e só orquestrar
data: 2026-05-25
projetos: []
fontes: [memoria-auto-claude]
status: vigente
tags: [subagentes, orquestracao, contexto, paralelizacao]
---

Em features grandes ou multi-arquivo, dividir o trabalho em frentes independentes e despachar sub-agentes em paralelo — múltiplas chamadas de Agent numa única mensagem. O agente principal fica com a orquestração: ler briefings, decidir arquitetura, validar resultados. A implementação pesada vai para os sub-agentes.

De onde veio: pedido explícito do Woney em 2026-05-25, durante a Casa Nostra — "Considere criar agentes para fazer as diferentes tarefas para você em paralelização enquanto você apenas orquestra, pra não comprometer sua janela de contexto." A janela do agente principal precisa preservar o contexto de briefing e decisões; sub-agentes fazem o trabalho concreto e devolvem resultados sintetizados.

Como aplicar:
- Feature com 3 ou mais arquivos novos/independentes → planejar como N frentes paralelas.
- Spawn em paralelo, cada sub-agente com prompt autossuficiente: contexto, objetivo, arquivos a tocar, formato de retorno.
- Depois que os agentes retornarem, VERIFICAR o diff real — nunca confiar só no summary do sub-agente.
