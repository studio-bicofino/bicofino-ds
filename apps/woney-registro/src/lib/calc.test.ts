import { describe, it, expect } from 'vitest'
import { settings, sistemas, usos } from './seed'
import {
  custoHora,
  custoFerramenta,
  economiaPorUsoH,
  analisarEficiencia,
  analisarProjeto,
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
  it('capital de infraestrutura = R$ 18.169 (DS 160h + Drive 7h + Pipeline 3,5h + Estáticos 0,5h)', () => {
    expect(imp.capitalInfraBrl).toBeCloseTo(18168.75, 1)
  })
})
