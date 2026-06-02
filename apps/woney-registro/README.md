# Registro de Impacto

App interno do Studio Bicofino que torna **visível** o que os sistemas economizam —
traduzido nas duas moedas que o decisor lê na hora: **horas** e **reais**.

A tela inicial é o argumento, não o formulário: números grandes + as peças produzidas,
amarradas à frase "isto levou 20 min em vez de 1h". O CRUD fica atrás, em telas próprias.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3041
# ou, da raiz do monorepo:
npm run registro
```

## Estado: seed-first

Os dados reais vivem em `src/lib/seed.ts` (settings, sistemas, usos). Toda a lógica de
valor está em `src/lib/calc.ts` — módulo puro, sem banco, com testes:

```bash
npm test          # valida os números contra os critérios de aceite do briefing
```

Números do seed (conferidos): realizado **R$ 13.635** (R$ 885 peças + R$ 12.750 site),
líquido recorrente **~R$ 5.036/mês** (~R$ 60 mil/ano), ferramenta paga **~10,6×**.

## Telas

| Rota          | O que é                                                        |
|---------------|----------------------------------------------------------------|
| `/`           | Painel — números grandes, galeria viva, frases para copiar     |
| `/sistemas`   | Inventário: Eficiência (OpEx) · Infraestrutura (CapEx) · Projetos |
| `/galeria`    | Grade de peças, filtrável por mês e sistema                    |
| `/registrar`  | Captura rápida: sistema → data → legenda → imagem              |
| `/fechamento` | Resumo do mês pronto para apresentar · exporta PDF (`window.print`) |

## Design

CSS puro com os tokens do Bicofino DS (`src/app/globals.css`, reconciliado com
`packages/design-system/tokens.css`). Modo SYSTEM, cantos SHARP, padrão **M-05 Bento de
Dados**, regra 90/10 com um único vibrante (`--current-accent`, sorteado por refresh).

## Próximo passo: Supabase

Migration pronta em `supabase/migrations/0001_init.sql` e variáveis em
`.env.local.example`. Ao conectar, só `src/lib/data.ts` troca de fonte — `calc.ts` e as
telas não mudam.
