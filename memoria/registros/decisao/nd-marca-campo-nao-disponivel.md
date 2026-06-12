---
tipo: decisao
titulo: Marcação N/D — "não tem" é informação, diferente de "falta preencher"
data: 2026-06-11
projetos: [casa-nostra]
fontes: [.planning/casa-nostra-v2/HANDOFF.md]
status: vigente
tags: [ux, pendencia, dados]
---

Contexto: a listagem de /membros marca pendência (vermelho) quando falta foto ou endereço. Mas há pessoas da rede que simplesmente NÃO TÊM site, Instagram, cargo ou endereço conhecido — e elas acusavam pendência eterna, poluindo o sinal: o Fabio não conseguia distinguir "ainda não preenchi" de "isso não existe pra essa pessoa".

Decisão (Onda 16): toggle mono `n/d` por campo, persistido em `people.unavailable_fields text[]` (17 chaves possíveis, de `photo` a `afiliacoes`). Regras de comportamento: o toggle só aparece com o campo vazio; **preencher de verdade desfaz a marcação automaticamente**; e a pendência de /membros respeita o N/D (foto/endereço marcados não acusam mais). Campos sempre obrigatórios ficam FORA do mecanismo: Nome, Tratamento e Sócio nº não aceitam N/D.

Por quê: ausência declarada é dado de primeira classe num CRM de relação — vira o vazio em informação auditável e devolve o marcador vermelho ao seu único significado: trabalho pendente de verdade. A alternativa descartada (relaxar a regra de pendência ou ignorar campos vazios) destruiria o valor do marcador.

Gotcha de implementação que vale guardar: botão posicionado junto de um input precisa de `onMouseDown={e => e.preventDefault()}` — sem isso o blur do input desmonta o botão antes do click registrar.
