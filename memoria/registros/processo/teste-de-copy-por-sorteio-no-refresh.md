---
tipo: processo
titulo: Teste A/E de copy por sorteio no refresh — variantes ao vivo, martelo do Woney, desmonte total
data: 2026-06-10
projetos: [lancamento-web, apps-web]
fontes: [.planning/lancamento-web/HANDOFF.md, .planning/lancamento-web/BRIEFING.md]
status: vigente
tags: [copy, processo, ab-test, decisao-ao-vivo]
---

Padrão provado para decidir copy (e variantes visuais) com o Woney, usado duas vezes
no lançamento web:

1. **Montar N variantes reais no site** — sorteadas no client a cada refresh (pós-hydrate,
   sem hydration mismatch), com override por query param para forçar uma específica
   (`?copy=v1..v5` no manifesto; `?intro=star|glitch|...` na intro) e marcador no código
   (`// copy vN`) para saber qual está na tela.
2. **Iterar ao vivo na sessão** — o Woney reage à variante em contexto real (fonte, medida,
   cascata de entrada), não a um doc de texto. No manifesto foram 4 rodadas na mesma noite
   (corte do p3 "cidadão global", vírgulas no p2, ponto no lugar do travessão, ordem
   moda↔números).
3. **Bater o martelo e DESMONTAR tudo** — sorteio, query param, marcadores e chaves
   `v1–v5` apagados dos 3 idiomas; fica só o texto final em chaves definitivas. Na intro,
   o mesmo: das 5 variantes ficou só a star, e o aparato de teste saiu junto.

Quando usar: qualquer decisão de copy ou variante de marca que dependa do olho do Woney.
Quando NÃO usar: não deixar o aparato de teste vivo depois da decisão — variante sorteada
sem dono vira dívida e ambiguidade de canon.
