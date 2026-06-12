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
  const drive = sistemas.find((x) => x.id === 'sis-drive-atleta')
  const pipeline = sistemas.find((x) => x.id === 'sis-image-pipeline')

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

  if (drive) {
    const fotosMes = (s.drive_fotos_semana * 52) / 12
    const horasMes = (fotosMes * (s.drive_seg_antes - s.drive_seg_depois)) / 3600
    const speedX = s.drive_seg_depois > 0 ? s.drive_seg_antes / s.drive_seg_depois : 0
    frases.push({
      id: 'drive',
      destaque: { valor: fmtX(speedX), rotulo: 'mais rápido para catalogar mídia' },
      texto: `Cada foto e vídeo do atleta chega ao Drive já nomeado e na pasta certa. Trinta fotos entram em cerca de meio minuto; nomear uma a uma levaria mais de sete minutos. No ritmo de ${s.drive_fotos_semana} fotos por semana, isso devolve ${fmtHoras(
        horasMes,
      )} de catalogação por mês — e o acervo nasce organizado, sem caça a arquivo nem nome genérico.`,
    })
  }

  if (pipeline) {
    const antesImg = min(pipeline.tempo_antes_min)
    const depoisImg = min(pipeline.tempo_depois_min)
    const speedX = depoisImg > 0 ? antesImg / depoisImg : 0
    frases.push({
      id: 'pipeline',
      destaque: { valor: fmtX(speedX), rotulo: 'mais rápido no tratamento de cada foto' },
      texto: `Tratar a foto de um atleta — recorte, granulado e preto e branco — passou de cerca de ${fmtMin(
        antesImg,
      )} para ${fmtMin(
        depoisImg,
      )}, e o story completo, do tratamento ao motion, de duas horas para vinte minutos. A automação levou uma tarde para montar e roda sozinha: as imagens saem do Drive, passam pelo Photoshop e voltam tratadas, em lote e sem desgaste a cada peça.`,
    })
  }

  return frases
}
