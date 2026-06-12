/* lib/calc.ts — módulo PURO de cálculo de impacto.
   Sem acesso a banco. Espelha exatamente o bloco 5 do briefing.
   Regra de honestidade: payback não-atingido é mostrado, nunca escondido. */

import type { Settings, Sistema, Uso } from './types'

/* ── Custos-base ── */

export function custoHora(s: Settings): number {
  return s.salario_mensal / s.horas_uteis_mes
}

/** Custo mensal da ferramenta em R$ (Claude Max 5x, com câmbio e encargos de cartão). */
export function custoFerramenta(s: Settings): number {
  return s.ferramenta_usd * s.cambio_usd_brl * (1 + s.encargos_cartao)
}

/* ── Por sistema de eficiência ── */

/** Economia de uma única aplicação do sistema, em horas. */
export function economiaPorUsoH(sistema: Sistema): number {
  const antes = sistema.tempo_antes_min ?? 0
  const depois = sistema.tempo_depois_min ?? 0
  return (antes - depois) / 60
}

export interface SistemaEficiencia {
  sistema: Sistema
  economiaPorUsoH: number
  usosAteHoje: number
  economiaAcumH: number
  saldoLiquidoH: number
  usosPayback: number
  pago: boolean
  status: string
}

export function analisarEficiencia(sistema: Sistema, usos: Uso[]): SistemaEficiencia {
  const ecoUso = economiaPorUsoH(sistema)
  const usosAteHoje = usos.filter((u) => u.sistema_id === sistema.id).length
  const economiaAcumH = ecoUso * usosAteHoje
  const saldoLiquidoH = economiaAcumH - sistema.investimento_horas
  const usosPayback = ecoUso <= 0 ? 0 : Math.ceil(sistema.investimento_horas / ecoUso)
  const pago = usosAteHoje >= usosPayback
  const faltam = usosPayback - usosAteHoje
  const status = pago
    ? 'Pago — lucro líquido'
    : `Faltam ${faltam} uso${faltam === 1 ? '' : 's'} p/ break-even`
  return { sistema, economiaPorUsoH: ecoUso, usosAteHoje, economiaAcumH, saldoLiquidoH, usosPayback, pago, status }
}

/* ── Por projeto (ganho pontual, escala de dias) ── */

export interface ProjetoAnalise {
  sistema: Sistema
  diasEconomizados: number
  horasProj: number
  valorProjetoBrl: number
}

export function analisarProjeto(sistema: Sistema, s: Settings): ProjetoAnalise {
  const antes = sistema.tempo_antes_dias ?? 0
  const depois = sistema.tempo_depois_dias ?? 0
  const diasEconomizados = antes - depois
  const horasProj = diasEconomizados * 8 // dia útil = 8h
  const valorProjetoBrl = horasProj * custoHora(s)
  return { sistema, diasEconomizados, horasProj, valorProjetoBrl }
}

/* ── Terceirização (benchmark de mercado) ──
   Quanto custaria contratar fora o que foi construído por dentro.
   Honestidade: o custo interno inclui as horas de execução, não só o build —
   projeto conta os dias que o trabalho levou; por_uso conta o tempo por entrega. */

/** Horas internas de construção de um sistema (sem a parcela por uso). */
export function horasInternasBuild(x: Sistema): number {
  if (x.tipo === 'projeto') return (x.tempo_depois_dias ?? 0) * 8 + x.investimento_horas
  return x.investimento_horas
}

export interface TerceirizacaoItem {
  sistema: Sistema
  evitadoMinBrl: number
  evitadoBrl: number
  evitadoMaxBrl: number
}

export interface TerceirizacaoResumo {
  itens: TerceirizacaoItem[]
  totalMinBrl: number
  totalBrl: number
  totalMaxBrl: number
  /** soma dos prazos de construção (itens por_uso fora) — fila sequencial, em semanas */
  prazoSemanasTotal: number
  /** o que os mesmos sistemas custaram por dentro (horas × custo/hora) */
  custoInternoBrl: number
  /** quantas vezes o mercado cobra o que custou por dentro */
  multiploMercado: number
}

export function analisarTerceirizacao(s: Settings, sistemas: Sistema[], usos: Uso[]): TerceirizacaoResumo {
  const ch = custoHora(s)
  const comEstimativa = sistemas.filter((x) => x.terceirizacao)

  const itens: TerceirizacaoItem[] = comEstimativa.map((x) => {
    const t = x.terceirizacao!
    const mult = t.por_uso ? usos.filter((u) => u.sistema_id === x.id).length : 1
    return {
      sistema: x,
      evitadoMinBrl: t.valor_min_brl * mult,
      evitadoBrl: t.valor_brl * mult,
      evitadoMaxBrl: t.valor_max_brl * mult,
    }
  })

  const totalMinBrl = itens.reduce((acc, i) => acc + i.evitadoMinBrl, 0)
  const totalBrl = itens.reduce((acc, i) => acc + i.evitadoBrl, 0)
  const totalMaxBrl = itens.reduce((acc, i) => acc + i.evitadoMaxBrl, 0)

  const prazoSemanasTotal = comEstimativa
    .filter((x) => !x.terceirizacao!.por_uso)
    .reduce((acc, x) => acc + x.terceirizacao!.prazo_semanas, 0)

  const horasInternas = comEstimativa.reduce((acc, x) => {
    if (x.terceirizacao!.por_uso) {
      const n = usos.filter((u) => u.sistema_id === x.id).length
      return acc + x.investimento_horas + ((x.tempo_depois_min ?? 0) / 60) * n
    }
    return acc + horasInternasBuild(x)
  }, 0)
  const custoInternoBrl = horasInternas * ch
  const multiploMercado = custoInternoBrl <= 0 ? 0 : totalBrl / custoInternoBrl

  return { itens, totalMinBrl, totalBrl, totalMaxBrl, prazoSemanasTotal, custoInternoBrl, multiploMercado }
}

/* ── Agregação completa ── */

export interface Impacto {
  custoHora: number
  custoFerramenta: number

  /* eficiência */
  eficiencia: SistemaEficiencia[]
  horasEconomizadasTotal: number
  valorEconomizadoBrl: number
  saldoLiquidoBrl: number

  /* infraestrutura (CapEx — não entra em payback de eficiência) */
  capitalInfraBrl: number

  /* projetos (ganhos pontuais) */
  projetos: ProjetoAnalise[]
  valorProjetosTotal: number

  /* realizado até hoje */
  valorRealizadoAteHoje: number

  /* custo fixo evitado (dev júnior não contratado) — recorrente */
  custoDevEmpresa: number
  custoFixoEvitado: number

  /* projeção / valor recorrente no ritmo atual */
  economiaMesH: number
  economiaMesBrl: number
  valorRecorrenteMes: number
  valorRecorrenteAno: number
  ferramentaPagaX: number
}

function acharPapel(sistemas: Sistema[], papel: 'template' | 'propostas'): Sistema | undefined {
  return sistemas.find((s) => s.tipo === 'eficiencia' && s.papel === papel)
}

export function calcularImpacto(s: Settings, sistemas: Sistema[], usos: Uso[]): Impacto {
  const ch = custoHora(s)
  const cf = custoFerramenta(s)

  const eficiencia = sistemas
    .filter((x) => x.tipo === 'eficiencia')
    .map((x) => analisarEficiencia(x, usos))

  const horasEconomizadasTotal = eficiencia.reduce((acc, e) => acc + e.economiaAcumH, 0)
  const valorEconomizadoBrl = horasEconomizadasTotal * ch
  const saldoLiquidoBrl = eficiencia.reduce((acc, e) => acc + e.saldoLiquidoH, 0) * ch

  const capitalInfraBrl = sistemas
    .filter((x) => x.tipo === 'infraestrutura')
    .reduce((acc, x) => acc + x.investimento_horas * ch, 0)

  const projetos = sistemas
    .filter((x) => x.tipo === 'projeto')
    .map((x) => analisarProjeto(x, s))
  const valorProjetosTotal = projetos.reduce((acc, p) => acc + p.valorProjetoBrl, 0)

  const valorRealizadoAteHoje = valorEconomizadoBrl + valorProjetosTotal

  const custoDevEmpresa = s.dev_salario_base * s.dev_mult_empregador
  const custoFixoEvitado = custoDevEmpresa * s.dev_fracao_fte

  const template = acharPapel(sistemas, 'template')
  const propostas = acharPapel(sistemas, 'propostas')
  const ecoTemplate = template ? economiaPorUsoH(template) : 0
  const ecoPropostas = propostas ? economiaPorUsoH(propostas) : 0

  const economiaMesH = s.stories_mes * ecoTemplate + s.propostas_mes * ecoPropostas
  const economiaMesBrl = economiaMesH * ch
  const valorRecorrenteMes = economiaMesBrl + custoFixoEvitado - cf
  const valorRecorrenteAno = valorRecorrenteMes * 12
  const ferramentaPagaX = cf <= 0 ? 0 : (economiaMesBrl + custoFixoEvitado) / cf

  return {
    custoHora: ch,
    custoFerramenta: cf,
    eficiencia,
    horasEconomizadasTotal,
    valorEconomizadoBrl,
    saldoLiquidoBrl,
    capitalInfraBrl,
    projetos,
    valorProjetosTotal,
    valorRealizadoAteHoje,
    custoDevEmpresa,
    custoFixoEvitado,
    economiaMesH,
    economiaMesBrl,
    valorRecorrenteMes,
    valorRecorrenteAno,
    ferramentaPagaX,
  }
}
