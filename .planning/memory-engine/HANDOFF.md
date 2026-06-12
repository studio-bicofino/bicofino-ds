# HANDOFF — Bicofino Memory Engine

Última atualização: 2026-06-12 · Estado: **MVP COMPLETO, não commitado**

## O que é

Memória viva da empresa, versionada em git. Contrato: `BRIEFING.md` ao lado deste arquivo.
A pergunta que o motor responde: **"o que a Bicofino sabe sobre isso?"** — independente de qual LLM esteja na máquina.

## O que foi entregue (12/06/2026, sessão única)

1. **`memoria/`** na raiz do repo — substrato com README, LINHA-DO-TEMPO.md e `registros/<tipo>/`.
2. **Backfill: 73 registros tipados** destilados por sub-agentes em paralelo dos HANDOFFs de `.planning/`, STATUS dos apps, ecosystem-overview, docs da raiz e da memória auto do Claude (que não viaja entre máquinas — agora os fatos duráveis viajam no repo). Por tipo: decisao 31 · processo 13 · aprendizado 9 · erro 9 · framework 9 · cliente 1 · atleta 1.
3. **Skills `/bicofino-memoria`** (captura — ao fechar uma frente; destila HANDOFF+commits, atualiza em vez de duplicar) **e `/bicofino-memoria-auditoria`** (mensal; as 5 perguntas canônicas → `auditorias/AAAA-MM.md` + bloco novo na LINHA-DO-TEMPO), em `.claude/skills/`. Convenção (12/06): skill de projeto da casa leva prefixo `bicofino-` — `/bicofino` no prompt lista todas.
4. **Auditoria-baseline** `memoria/auditorias/2026-06.md` — 26 achados; é a régua que as próximas auditorias devem fazer cair. Top 3: (a) contradição viva sobre o bicofino-web ser ou não git-connected, com /produtos em 404; (b) BoviChain e Guilherme Kerchner sem registro de cliente apesar de serem as relações comerciais mais citadas; (c) decisões de motion de junho (sparkles Onda 17, graduação do card stack EXP-10) sem registro e sem a emenda prometida no DESIGN.md §8.
5. **Linha do tempo baseline** `memoria/LINHA-DO-TEMPO.md` — Gênese → Maio → Junho 2026, com a evolução do Woney (designer → designer+dev → operador de plataforma) ancorada em registros.

## Incidente da sessão

O primeiro despacho de 6 sub-agentes de backfill caiu no limite de sessão — mas 5 deles já tinham gravado os arquivos antes de morrer (a mensagem de erro veio na resposta final, não no trabalho). Na retomada: verificação em disco, 1 duplicata fundida (iCloud), 1 agente extra cobriu os 3 buracos (canal-youtube, regra de ouro do fluxo-vendas, tese da vitrine de produtos).

## Regras do motor (resumo; íntegra no BRIEFING §3)

- Um fato por arquivo, autossuficiente, datas absolutas, voz Bicofino.
- Nunca duplicar (grep antes; atualizar o existente) · nunca deletar história (`status: superado`).
- Não registrar o derivável do código/git — registrar o PORQUÊ, o contexto humano, a regra extraída.

## Como retomar / operar

- **Fechou uma frente?** → `/bicofino-memoria` (captura).
- **Virou o mês?** → `/bicofino-memoria-auditoria` (julho será a 2ª rodada; comparar com a baseline de junho — o nº de achados tem que cair). Após 2 rodadas manuais, considerar agendar via `/schedule`.
- **Consulta:** grep/agente sobre `memoria/registros/` — frontmatter é o índice.

## Pendências

- [ ] **Commitar `memoria/` + skills + .planning/memory-engine/** (não commitado de propósito — e lembrar: push na main = deploy do web em prod; há commits locais segurados de propósito desde a auditoria pré-Opus).
- [ ] Atacar os 26 achados da baseline (priorizados no fim de `auditorias/2026-06.md`) — começar pelos 3 do topo.
- [ ] 2ª auditoria em julho/2026 (manual).
- [ ] Futuro (fora do MVP): dashboard lendo `memoria/` (padrão Vanguarda, após 3+ auditorias) · agendamento automático · integração com o Consigliere Widget (o motor é a camada de dados que ele consome).
