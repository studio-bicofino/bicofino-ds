import { describe, it, expect } from 'vitest'
import { settings, sistemas, usos } from './seed'
import {
  custoHora,
  custoFerramenta,
  economiaPorUsoH,
  analisarEficiencia,
  analisarProjeto,
  analisarTerceirizacao,
  calcularImpacto,
} from './calc'

const template = sistemas.find((s) => s.id === 'sis-template-stories')!
const propostas = sistemas.find((s) => s.id === 'sis-propostas-ds')!
const site = sistemas.find((s) => s.id === 'sis-site-v1')!

describe('custos-base', () => {
  it('custo/hora = salário / horas úteis', () => {
    expect(custoHora(settings)).toBeCloseTo(106.25, 2)
  })
  it('custo da ferramenta inclui câmbio e encargos', () => {
    expect(custoFerramenta(settings)).toBeCloseTo(526.08, 1)
  })
})

describe('eficiência', () => {
  it('economia por uso do template = 96min (120→24, medição real da rodada 11–17/jun)', () => {
    expect(economiaPorUsoH(template)).toBeCloseTo(1.6, 3)
  })
  it('template já pagou (16 usos ≥ payback de 3)', () => {
    const a = analisarEficiencia(template, usos)
    expect(a.usosAteHoje).toBe(16)
    expect(a.usosPayback).toBe(3)
    expect(a.pago).toBe(true)
    expect(a.status).toContain('Pago')
    // 96min = 1,6h por uso · 16 usos = 25,6h
    expect(a.economiaAcumH).toBeCloseTo(25.6, 3)
  })
  it('propostas pagaram (investimento 0)', () => {
    const a = analisarEficiencia(propostas, usos)
    expect(a.usosAteHoje).toBe(2)
    expect(a.pago).toBe(true)
    // 90→40 = 50min = 0,8333h por uso · 2 usos = 1,6667h
    expect(a.economiaAcumH).toBeCloseTo(1.6667, 3)
  })
})

describe('projeto', () => {
  it('site economizou 15 dias = R$ 12.750', () => {
    const p = analisarProjeto(site, settings)
    expect(p.diasEconomizados).toBe(15)
    expect(p.valorProjetoBrl).toBeCloseTo(12750, 0)
  })
})

describe('agregação — critérios de aceite (bloco 9)', () => {
  const imp = calcularImpacto(settings, sistemas, usos)

  it('peças ~R$ 2.897 (16 stories a 96min + 2 propostas)', () => {
    expect(imp.valorEconomizadoBrl).toBeCloseTo(2897.08, 1)
  })
  it('valor realizado até hoje ~R$ 15.647', () => {
    expect(imp.valorRealizadoAteHoje).toBeCloseTo(15647.08, 1)
  })
  it('valor líquido recorrente ~R$ 5.511/mês', () => {
    expect(imp.valorRecorrenteMes).toBeCloseTo(5511.01, 1)
  })
  it('valor recorrente ~R$ 66,1 mil/ano', () => {
    expect(imp.valorRecorrenteAno).toBeGreaterThan(65000)
    expect(imp.valorRecorrenteAno).toBeLessThan(68000)
  })
  it('ferramenta paga ~11,5x', () => {
    expect(imp.ferramentaPagaX).toBeCloseTo(11.48, 1)
  })
  it('custo fixo evitado = R$ 4.500/mês', () => {
    expect(imp.custoFixoEvitado).toBeCloseTo(4500, 0)
  })
  it('capital de infraestrutura = R$ 21.781 (DS 160h + Drive 7h + Pipeline 3,5h + Estáticos 0,5h + Casa Nostra 24h + La Rete 10h)', () => {
    expect(imp.capitalInfraBrl).toBeCloseTo(21781.25, 1)
  })
})

describe('terceirização — benchmark de mercado (pesquisa 2026-06-12)', () => {
  const terc = analisarTerceirizacao(settings, sistemas, usos)

  it('terceirizar tudo custaria ~R$ 773 mil na média (builds R$ 737 mil + 2 propostas a R$ 18 mil)', () => {
    expect(terc.totalBrl).toBeCloseTo(773000, 0)
  })
  it('faixa completa: R$ 507 mil – R$ 1,26 mi', () => {
    expect(terc.totalMinBrl).toBeCloseTo(507000, 0)
    expect(terc.totalMaxBrl).toBeCloseTo(1260000, 0)
  })
  it('fila sequencial de produção = 81 semanas (sem os itens por uso)', () => {
    expect(terc.prazoSemanasTotal).toBe(81)
  })
  it('por dentro custou ~R$ 26,6 mil (249h de build + 1,33h de propostas, a R$ 106,25/h)', () => {
    expect(terc.custoInternoBrl).toBeCloseTo(26597.92, 1)
  })
  it('o mercado cobra ~29× o custo interno', () => {
    expect(terc.multiploMercado).toBeCloseTo(29.06, 1)
  })
  it('propostas multiplicam pelo nº de usos (por_uso)', () => {
    const propostasItem = terc.itens.find((i) => i.sistema.id === 'sis-propostas-ds')!
    expect(propostasItem.evitadoBrl).toBeCloseTo(36000, 0)
  })
})
