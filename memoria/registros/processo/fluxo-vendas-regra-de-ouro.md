---
tipo: processo
titulo: Regra de ouro do fluxo-vendas — não inventar flow nem dados, validar com Woney antes de escalar
data: 2026-06-05
projetos: [fluxo-vendas]
fontes: [.planning/fluxo-vendas/CLAUDE.md, .planning/fluxo-vendas/README.md]
status: vigente
tags: [vendas, validacao, escala, contrato]
---

**A regra:** ao gerar qualquer roteiro ou script de venda no projeto fluxo-vendas, não inventar etapas, canais ou dados de cliente fora do que está documentado no CLAUDE.md do projeto. E antes de gerar roteiros **em escala**, validar a versão final do flow com o Woney — os 12 nós do `funil.json` são proposta saída das sessões de estratégia, não decisão; o arquivo carrega o status RASCUNHO até a mentoria fechar etapas, canais e gatilhos.

**De onde veio:** o projeto nasceu de um workshop de vendas, e a base estratégica (motion Connection/4Cs, ICPs, voz) foi destilada de sessões com o Woney — mas o desenho do funil em si nunca foi homologado. Gerar dezenas de roteiros sobre um funil errado seria retrabalho em massa e, pior, roteiros com dados de cliente inventados circulando como se fossem reais.

**Como aplicar:**
1. Toda geração declara entrada explícita: etapa (nó 1-12) · ICP (Studio/Talent/Club) · conta · canal · objetivo.
2. Dados de conta: somente reais documentados ou hipotéticos **marcados como tal** (o piloto BoviChain usa ⟨…⟩ para todo número não confirmado).
3. Enquanto o funil for rascunho, gerar no máximo pilotos de calibragem (1 por vez), nunca a série completa.
4. Flow ou ICP revisado na mentoria → atualizar o CLAUDE.md do projeto primeiro; ele é a fonte da verdade e toda geração passa por ele.

É a aplicação local do princípio geral "briefing/handoff são contrato" (ver `processo/briefing-handoff-sao-contrato.md`), com o agravante de que aqui o output vai para a mesa de cliente.
