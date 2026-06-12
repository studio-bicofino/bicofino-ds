# BRIEFING — Bicofino Memory Engine

> **Uma memória viva da empresa.** Quando isso estiver maduro, a pergunta deixa de ser
> "o que eu sei sobre isso?" e vira **"o que a Bicofino sabe sobre isso?"**.
>
> O Claude muda. O GPT muda. O Gemini muda. O que ninguém copia é: a história, as
> decisões, os Brand Systems, os handoffs, os clientes, os atletas, os aprendizados,
> os erros, os frameworks, os processos. **Isso é patrimônio intelectual — e patrimônio
> vive no git, não na memória de sessão de nenhuma LLM.**

Criado em: 2026-06-12 · Dono: Woney · Status: MVP em construção

---

## 1. Problema

O conhecimento da Bicofino hoje está capturado mas **disperso e write-only**:

- ~2.000 linhas de HANDOFFs em `.planning/<projeto>/` — escritos uma vez, raramente relidos, nunca cruzados entre si.
- STATUS.md por app, `ecosystem-overview.md` mantido à mão.
- Memória automática do Claude Code — **não viaja** entre máquinas nem entre modelos; não é patrimônio.
- Decisões de marca/negócio tomadas em sessão e que só existem no histórico de conversa.

Não existe ciclo de **consolidação, auditoria e consulta**. Ninguém pergunta hoje "o que a Bicofino já aprendeu sobre X?" e recebe resposta confiável.

## 2. Arquitetura — 4 camadas

```
┌─ 4. CONSULTA ──── "o que a Bicofino sabe sobre X?" (agente sobre memoria/)
│                    → futuro cérebro do Consigliere Widget (roadmap)
├─ 3. SÍNTESE ───── auditoria mensal → auditorias/AAAA-MM.md + LINHA-DO-TEMPO.md
├─ 2. CAPTURA ───── skill /bicofino-memoria ao fechar uma frente (destila HANDOFF + commits)
└─ 1. SUBSTRATO ─── memoria/ no repo — registros tipados, versionados em git
```

**Dashboard fica para depois** — é uma *vista* dos dados; sem 3+ meses de auditorias acumuladas não há o que mostrar. Quando houver, vira app no padrão Vanguarda lendo `memoria/`.

## 3. Substrato — `memoria/` (raiz do repo)

```
memoria/
  README.md            — como o motor funciona, como consultar, como contribuir
  LINHA-DO-TEMPO.md    — evolução acumulativa (Woney + Bicofino), mês a mês
  registros/
    decisao/           — decisões de marca, produto, técnica, negócio (com o PORQUÊ)
    aprendizado/       — lições extraídas (positivas)
    erro/              — o que deu errado + regra extraída (ex.: git reset --hard)
    cliente/           — pessoas e organizações: contexto, preferências, histórico
    atleta/            — material, status de documentação, pendências por atleta
    framework/         — padrões reusáveis provados (ex.: seed-first, multi-zone)
    processo/          — como a Bicofino opera (deploy via worktree, handoff-antes-do-sync)
  auditorias/
    AAAA-MM.md         — relatório mensal de saúde do conhecimento
```

### Schema do registro (frontmatter obrigatório)

```markdown
---
tipo: decisao | aprendizado | erro | cliente | atleta | framework | processo
titulo: <frase curta, específica>
data: AAAA-MM-DD            # quando aconteceu (aproximado ok); NUNCA data relativa
projetos: [casa-nostra, la-rete]   # slugs dos projetos relacionados; [] se geral
fontes: [.planning/casa-nostra-v2/HANDOFF.md]  # de onde o fato foi destilado
status: vigente | superado | em-aberto
tags: [deploy, vercel, supabase]
---

<Corpo em prosa, autossuficiente — legível sem abrir as fontes.>
<decisao: contexto → o que foi decidido → POR QUÊ → alternativas descartadas.>
<aprendizado/erro: o que aconteceu → regra extraída ("a partir de agora...").>
<cliente/atleta: quem é, contexto, o que já foi feito, o que está pendente.>
```

### Regras do substrato

1. **Um fato por arquivo.** Nome: `<slug-curto>.md` dentro da pasta do tipo.
2. **Autossuficiente** — o registro se sustenta sem abrir a fonte; a fonte é rastro, não dependência.
3. **Datas absolutas sempre** (nunca "semana passada").
4. **Superado ≠ deletado** — decisão revertida vira `status: superado` com link para a que substituiu. A história é parte do patrimônio.
5. **Não duplicar o que o repo já registra** — código, git history, DESIGN.md. O registro captura o que NÃO é derivável do código: o porquê, o contexto humano, o aprendizado.
6. **Voz Bicofino, em português**, direto, sem corporativês.

## 4. Captura — skill `/bicofino-memoria`

Skill local em `.claude/skills/bicofino-memoria/`. Invocada **ao fechar uma frente** (junto com a disciplina handoff-antes-do-sync) ou sob demanda ("registra isso na memória").

> Convenção de nomes (12/06): toda skill de projeto da casa leva o prefixo `bicofino-` —
> digitar `/bicofino` lista todas e o Woney não precisa decorar nomes.

Fluxo: lê o HANDOFF/STATUS da frente + commits recentes → identifica decisões, aprendizados, erros e padrões NOVOS (confere contra registros existentes — atualiza em vez de duplicar) → grava registros tipados → apresenta resumo do que foi gravado.

## 5. Síntese — auditoria mensal

Skill irmã `/bicofino-memoria-auditoria` (SKILL.md próprio, pra aparecer no autocomplete). Roda **manualmente nas 2 primeiras rodadas** (calibrar formato); depois, agendável via `/schedule`.

### As 5 perguntas canônicas (o coração do ritual)

1. **Quais clientes estão sem documentação?**
2. **Quais projetos têm informações contraditórias?** (HANDOFF vs STATUS vs registros vs realidade)
3. **Quais atletas têm material incompleto?**
4. **Quais decisões não estão documentadas?** (commits/mudanças grandes sem registro de decisão correspondente)
5. **Quais padrões aparecem em todos os projetos?** (candidatos a framework/processo — e a DESIGN.md via enrichment loop)

### Saídas

- `memoria/auditorias/AAAA-MM.md` — respostas às 5 perguntas + pendências priorizadas.
- Bloco novo no `memoria/LINHA-DO-TEMPO.md` — o mês em retrospecto: o que a Bicofino construiu, decidiu, aprendeu; evolução do Woney como profissional (novas capacidades, novos domínios).

## 6. Consulta

"O que a Bicofino sabe sobre X?" = agente (Explore) varrendo `memoria/` por tipo/tags/projetos. Sem ferramenta nova no MVP — grep + frontmatter resolvem. **Alinhamento estratégico:** este substrato é a camada de dados que o Consigliere Widget (roadmap da plataforma) vai consumir.

## 7. Escopo do MVP (esta frente)

- [x] Este BRIEFING
- [x] Estrutura `memoria/` + README + LINHA-DO-TEMPO inicial
- [x] **Backfill único**: sub-agentes em paralelo destilando os HANDOFFs/STATUS/overview existentes + memória auto do Claude → 73 registros (12/06)
- [x] Skills `/bicofino-memoria` (captura) + `/bicofino-memoria-auditoria` (renomeadas 12/06 — prefixo `bicofino-` por convenção)
- [x] Auditoria-baseline `2026-06.md` — 26 achados (a régua)
- [x] HANDOFF.md desta frente

### Fora do escopo (futuro)

- Dashboard (app Vanguarda-style lendo `memoria/`) — após 3+ auditorias
- Agendamento automático da auditoria via `/schedule`
- Adapter Supabase / busca semântica
- Integração com o Consigliere Widget

## 8. Critério de maturidade

O motor está maduro quando: (a) toda frente fechada gera/atualiza registros sem esforço extra; (b) a auditoria mensal encontra cada vez MENOS buracos; (c) uma pergunta "o que a Bicofino sabe sobre X?" é respondida em minutos só com `memoria/`.
