---
tipo: cliente
titulo: Fabio Brancatelli — sócio Bicofino, usuário primário da Casa Nostra
data: 2026-06-10
projetos: [casa-nostra, drive-atleta, la-rete]
fontes: [.planning/casa-nostra-v2/HANDOFF.md, .planning/casa-nostra/HANDOFF.md, .planning/casa-nostra/BRIEFING.md]
status: vigente
tags: [fabio, socio, usuario-interno]
---

Fabio Brancatelli é sócio da Bicofino e a audiência primária da Casa Nostra — o app existe pra ELE cadastrar e gerenciar a rede de relacionamento da casa ("CRM de relação, não de pipeline"). Família Brancatelli, Jardim Europa/SP; os 3 primeiros membros reais do banco são ele, Salvatore e Luigi. Também usa o Drive do Atleta no dia a dia.

**O que o trava:** complexidade. Form com 10 sections o fez congelar a v1 inteira ("complicado, muitos campos"). Ele não usa variáveis analíticas (clusters, scores, avaliações) — usa campos concretos: endereço de correspondência, WhatsApp, foto, nascimento. Se a tela pede mais do que ele precisa, ele não preenche.

**Como ele trabalha:** melhor formato é a sessão ao vivo iterativa — em 2026-06-10 foram 4 rodadas na mesma sessão (Ondas 12-15), ele testando e pedindo ajustes na hora (Bicofino ID, Tratamento, Sócio nº, Geração, Família, Cidadania/Ascendência). Aprova rápido quando vê funcionando; preferiu validar preview antes de promover pra prod (Onda 9). Quis o banco **zerado** pra começar limpo em vez de herdar dados de teste.

**Preferências reveladas:** vocabulário próprio importa — "Sinais" virou "Movimentos", "Afiliações" virou "Domínios" (renames só de label, DB intacto). Versão de software não é informação de UI — mandou tirar todo "v2"/"v1.0" das telas. Pensa em ordem de associado (Sócio nº antes do Bicofino ID) e em gerações da família (1ª-4ª Geração). Gerencia o próprio vocabulário de tags via /grupos quando o CRUD é simples.
