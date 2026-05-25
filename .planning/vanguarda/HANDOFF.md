# HANDOFF — VANGUARDA × Bicofino

*Documento de retomada. Sessão originadora: 2026-05-25.
Para continuar em chat novo, mande este arquivo via `@.planning/vanguarda/HANDOFF.md` na primeira mensagem.*

---

## Estado atual

**Fase**: aguardando outputs de duas sessões Claude rodadas em paralelo no projeto VANGUARDA externo (`~/Desktop/MAPA-MERCADO-GLOBAL/`).

**Bloqueio**: nenhum. O trabalho da nossa side está pronto até a chegada dos outputs.

---

## O que foi feito nesta conversa

1. **Discussão estratégica** sobre como o Bicofino pode se beneficiar do VANGUARDA (mapa global de mercados 2026 + projeto irmão "100 melhores ideias").
2. **Descoberta de 4 pontos críticos** que reorientaram o trabalho:
   - O domínio do VANGUARDA é tese para founders tech+design SaaS — não agronegócio nem coisa semelhante.
   - O Bicofino **não vai fundar SaaS**: opera como prestador, mediador, curador e conselheiro desse universo.
   - As oportunidades reais estão em 5 ângulos, não 1 (Cliente Off Pitch, Tese Wealth, Conexão On↔Off, Produto Club, Método replicável).
   - O projeto "100 melhores ideias" tem público que bate quase 1:1 com Cluster C do Bicofino (Patriarcas) — exige briefing próprio.
3. **Estrutura criada** em `.planning/vanguarda/`:
   - `README.md` (índice e fluxo)
   - `briefings/BRIEFING-MAPA-MERCADO.md` (v2, 277 linhas — substitui v1 arquivada como `_v1-deprecated.md`)
   - `briefings/BRIEFING-100-IDEIAS.md` (v1, 182 linhas)
   - `inputs/` e `outputs/` (vazios, prontos pra uso)
4. **Proposta inicial da Metodologia 3-Lentes Bicofino** embutida no briefing principal (seção 7): Soberano · Consigliere · Criador-Raposa, pesos 0.30/0.30/0.40, espelho da metodologia VANGUARDA mas mapeada nos arquétipos do BRAND.md. A outra sessão Claude vai validar/refinar essa proposta.

---

## Materiais que o usuário já forneceu nesta sessão (não precisa pedir de novo)

Tudo abaixo está no histórico desta conversa. Se começar um chat novo, o conteúdo precisa ser fornecido novamente OU salvo em `.planning/vanguarda/inputs/` para referência local.

- **`R3-critica-FOUNDER.md`** — crítica original que pontuou o VANGUARDA em 5.5/10
- **`R3-final-FOUNDER.md`** — re-avaliação pós-patches, foi pra 7.5/10
- **`R4-PAINEL.md`** — painel 3 especialistas (CEO 8.6 / Design 8.0 / Founder 8.3 / Composta 8.3), veredicto "requer mais uma rodada"
- **`R5-PAINEL.md`** — painel final (CEO 9.2 / Design 8.8 / Founder 9.0 / Composta 9.0), veredicto State of the Art 9+
- **`11-customer-type.json`** — segmentação completa de modelos de cliente B2B/B2C com benchmarks 2025-2026
- **`12-sweet-spots.json`** — 28 sweet spots completos com pain/target/ACV/distribuição/scores
- **`02-setores-macro.json`** — 17 setores macro globais com TAM/CAGR/players/barreiras
- **`BRIEF.md` do projeto 100-ideias** — rubrica C1-C10, esquema de saída, princípios de qualidade
- **Screenshots do mapa** (2 telas: mapa-mundi + barreiras de entrada com heatmap denso + cards de verticais com SWEET SPOT/FECHADA)

---

## Próximos passos — em ordem

### 1 · Rodar BRIEFING-MAPA-MERCADO em sessão Claude externa
- **Onde**: `~/Desktop/MAPA-MERCADO-GLOBAL/Mapa Global/`
- **Como**: abre Claude/Antigravity nessa pasta, cola o briefing OU copia o `.md` pra dentro e manda `Leia @BRIEFING-MAPA-MERCADO.md e execute o prompt da seção 8.`
- **Saída esperada**: `bicofino-cruzamento-mapa.md` na raiz dessa pasta
- **Mover para**: `.planning/vanguarda/outputs/bicofino-cruzamento-mapa.md`

### 2 · Rodar BRIEFING-100-IDEIAS em sessão Claude externa
- **Onde**: `~/Desktop/MAPA-MERCADO-GLOBAL/100 melhores ideias/`
- **Como**: mesmo procedimento
- **Saída esperada**: `bicofino-curadoria-100-ideias.md` na raiz dessa pasta
- **Mover para**: `.planning/vanguarda/outputs/bicofino-curadoria-100-ideias.md`

### 3 · Voltar pro Bicofino-ecossistema e integrar
- Trazer os dois `.md` de output (ou avisar que estão em `outputs/`).
- Eu leio os dois e proponho integração ao roadmap Bicofino-Platform (Consigliere Widget, Club, Bicofino-Wealth).

### 4 · Item ainda em aberto desta sessão (não esquecer)
O usuário fez duas perguntas no início desta conversa. Só a **#1** (briefing pra cruzar oportunidades) está sendo respondida. A **#2 está pendente**:
- **Reuso visual do design do mapa** (paleta Bicofino, tokens, logo) e
- **Como tratar features fora do DS Bicofino** (mapa geo, heatmap, scatter, sparklines, Cmd+K, persona toggle, compare tray, scenarios, etc.).

Já tenho diagnóstico inicial (extension pack `DESIGN-DATAVIZ.md`, não inflar core DS), mas falta especificar componentes, decidir onde mora (sub-app em `apps/propostas/` ou novo `apps/vanguarda-bicofino/` ou bloco no docs-site) e desenhar a primeira página piloto. **Retomar isso depois dos outputs**, porque os outputs vão informar quais features de viz são prioritárias.

---

## Como retomar em chat novo

Primeira mensagem sugerida:

> Lê `@.planning/vanguarda/HANDOFF.md` pra contexto. Estamos no passo [N — Rodar briefing X / Integrar outputs / Item 2 pendente]. [colar outputs se for o caso].

---

## Arquivos-chave referenciados

| Arquivo | Para que |
|---|---|
| `BRAND.md` (root) | Fonte da voz Bicofino, arquétipos, clusters, 4 Cs |
| `BRANDCOMPLETO.md` (root) | Versão estendida do BRAND |
| `DESIGN.md` (root) | Single source of truth para tokens visuais |
| `CLAUDE.md` (root) | Instruções de operação no monorepo |
| `apps/web/content/br.ts` | Conteúdo público do site (4 Cs, On Pitch, Off Pitch, Foundation) |
| `apps/docs-site/src/content/br.ts` | Conteúdo do Brand System site |
| `HANDOFF.md` (root) | Handoff geral do ecossistema — NÃO confundir com este |

---

*Fim do handoff. Continuação esperada após chegada dos outputs das duas sessões externas.*
