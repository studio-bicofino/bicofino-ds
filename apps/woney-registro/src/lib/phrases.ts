/* Frases para o Connector — geradas a partir dos números reais (bloco 7).
   Tom de atelier. Proibições respeitadas: nenhuma construção "X, não Y",
   nenhum uso de "premium"/"luxo". Afirma sem negar. */

import type { Settings, Sistema } from './types'
import type { Impacto } from './calc'
import { economiaPorUsoH } from './calc'
import { fmtBRL, fmtHoras, fmtX, fmtMin } from './format'

export interface Frase {
  id: string
  texto: string
  /* O dado de eficiência em evidência — número grande + rótulo curto. */
  destaque: { valor: string; rotulo: string }
}

function min(s?: number | null): number {
  return Math.round(s ?? 0)
}

export function gerarFrases(s: Settings, sistemas: Sistema[], imp: Impacto): Frase[] {
  const template = sistemas.find((x) => x.papel === 'template')
  const propostas = sistemas.find((x) => x.papel === 'propostas')
  const site = sistemas.find((x) => x.tipo === 'projeto')
  const ds = sistemas.find((x) => x.tipo === 'infraestrutura')

  const frases: Frase[] = []

  if (template) {
    const liberaH = s.stories_mes * economiaPorUsoH(template)
    frases.push({
      id: 'stories',
      destaque: { valor: fmtHoras(liberaH), rotulo: 'liberadas por mês em stories' },
      texto: `Cada story de jogo passou de ${fmtMin(min(template.tempo_antes_min))} para ${fmtMin(
        min(template.tempo_depois_min),
      )}. No ritmo de ${s.stories_mes} por mês, isso libera ${fmtHoras(
        liberaH,
      )} de produção — capacidade que volta para o trabalho que só eu faço.`,
    })
  }

  if (propostas) {
    frases.push({
      id: 'propostas',
      destaque: {
        valor: fmtMin(min(propostas.tempo_depois_min)),
        rotulo: `por proposta · era ${fmtMin(min(propostas.tempo_antes_min))}`,
      },
      texto: `As propostas saem em ${fmtMin(min(propostas.tempo_depois_min))}, contra cerca de ${fmtMin(
        min(propostas.tempo_antes_min),
      )} antes. O Design System já se pagou em tempo de proposta.`,
    })
  }

  frases.push({
    id: 'ferramenta',
    destaque: { valor: fmtX(imp.ferramentaPagaX), rotulo: 'o Claude Max se paga por mês' },
    texto: `O Claude Max 5x custa cerca de ${fmtBRL(
      imp.custoFerramenta,
    )}/mês e devolve ${fmtBRL(
      imp.economiaMesBrl + imp.custoFixoEvitado,
    )}/mês em tempo que deixou de existir — paga-se ${fmtX(imp.ferramentaPagaX)} por mês.`,
  })

  frases.push({
    id: 'dev',
    destaque: { valor: fmtBRL(imp.custoDevEmpresa), rotulo: 'vaga de dev júnior evitada / mês' },
    texto: `Dashboard, automações, o Design System e este próprio app são trabalho de desenvolvedor. Em vez de abrir uma vaga de dev júnior — ${fmtBRL(
      imp.custoDevEmpresa,
    )}/mês — essa capacidade entra no meu papel, com o Claude Code como alavanca.`,
  })

  if (site) {
    const diasEcon = min(site.tempo_antes_dias) - min(site.tempo_depois_dias)
    frases.push({
      id: 'site',
      destaque: { valor: `${diasEcon} dias`, rotulo: 'a menos que no Framer (site)' },
      texto: `O site do Bicofino saiu em código em uma semana. O mesmo no Framer levaria cerca de ${min(
        site.tempo_antes_dias,
      )} dias úteis — o site da BoviChain, mais complexo, levou seis semanas. O Design System torna esse ritmo possível.`,
    })
  }

  if (ds) {
    frases.push({
      id: 'ds',
      destaque: { valor: '1 mês', rotulo: 'custo único · sustenta tudo' },
      texto: `O Design System custou cerca de um mês do meu tempo, uma vez. Sustenta site, propostas e toda peça futura. Comporta-se como trilho de ferrovia: caro de assentar, barato de usar, e destrava rotas que antes não existiam.`,
    })
  }

  return frases
}
