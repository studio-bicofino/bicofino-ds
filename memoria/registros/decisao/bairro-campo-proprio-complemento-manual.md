---
tipo: decisao
titulo: Bairro é campo próprio preenchido pelo CEP; Complemento é 100% manual
data: 2026-06-10
projetos: [casa-nostra]
fontes: [.planning/casa-nostra-v2/HANDOFF.md]
status: vigente
tags: [schema, endereco, viacep]
---

Contexto: o autocomplete de CEP (ViaCEP) da Casa Nostra jogava o `bairro` retornado pela API dentro de `address_complement` — o schema original de endereço (rua, número, complemento, cidade, estado, CEP, país) não tinha coluna de bairro. Resultado: o Complemento, que deveria guardar informação que SÓ o usuário sabe (nº do apto), era poluído por dado automático, e o bairro ficava no campo errado.

Decisão (Onda 15): **Bairro ganhou coluna própria** (`people.address_neighborhood`, migration 0009), preenchida pelo lookup de CEP e exibida lado a lado com Complemento no popover; **Complemento passou a ser 100% manual** — o ViaCEP nunca mais escreve nele.

Por quê: a regra extraída é de propriedade do dado — campo automático e campo manual não dividem coluna. Se a API escreve onde o usuário escreve, ou o dado automático apaga o manual ou o manual contamina o automático.

Nota operacional: o SQL de correção dos dados legados (mover bairro de `address_complement` pra `address_neighborhood`) foi oferecido mas NÃO rodado — registros anteriores à correção precisam de ajuste manual na edição. Os 3 Brancatelli foram verificados limpos via REST em 2026-06-10.
