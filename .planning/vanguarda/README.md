# .planning/vanguarda/

Workspace para o cruzamento entre o Bicofino e os materiais do projeto **VANGUARDA** (Mapa Global de Mercados 2026 + 100 Melhores Ideias).

Origem do material: `~/Desktop/MAPA-MERCADO-GLOBAL/`

---

## Estrutura

```
.planning/vanguarda/
├── README.md                 ← este arquivo
├── inputs/                   ← cópias locais de materiais de origem (opcional)
├── briefings/                ← briefings prontos para outras sessões Claude
│   ├── BRIEFING-MAPA-MERCADO.md      ← cruzar Bicofino × Mapa Global
│   ├── BRIEFING-100-IDEIAS.md        ← curar 100 ideias com lente Bicofino
│   └── _v1-deprecated.md             ← versão antiga, mantida só para histórico
└── outputs/                  ← devoluções das outras sessões depois de rodadas
```

## Fluxo de uso

1. **Inputs (opcional):** copie aqui os arquivos originais que quiser ter referência local — `R5-final-PAINEL.md`, `12-sweet-spots.json`, `02-setores-macro.json`, `11-customer-type.json`, `BRIEF.md` do projeto 100-ideias. Útil se quiser consultar offline; não obrigatório.
2. **Briefings:** abra o briefing relevante, leve para a sessão Claude/Antigravity rodada na pasta da origem. Cada briefing é autocontido — não precisa de mais nada.
3. **Outputs:** quando a outra sessão devolver o documento, salve aqui (`bicofino-cruzamento-mapa.md`, `bicofino-curadoria-100-ideias.md`). Daí em diante, integramos os achados ao roadmap do Bicofino-Platform e ao Club.

## Estado atual

| Briefing | Status | Próximo passo |
|---|---|---|
| Mapa Global | Pronto v2 | Rodar em sessão Claude na pasta `MAPA-MERCADO-GLOBAL/Mapa Global/` |
| 100 Melhores Ideias | Pronto v1 | Rodar em sessão Claude na pasta `MAPA-MERCADO-GLOBAL/100 melhores ideias/` |

## Por que esta pasta existe

O VANGUARDA é um corpus de qualidade institucional (State of the Art 9+ pela autoavaliação 3-lentes do próprio projeto). Cruzar com o Bicofino exige briefings específicos para preservar o ângulo certo — sem isso, qualquer sessão Claude tenderia a recomendar o Bicofino *fundar SaaS*, quando na verdade o Bicofino é **prestador, mediador, curador e conselheiro** desse universo, não founder.

Esta pasta concentra tudo num lugar para que o trabalho cresça com critério, sem espalhar arquivos pelo monorepo.
