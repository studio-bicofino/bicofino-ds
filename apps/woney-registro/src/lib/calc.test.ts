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
  it('economia por uso do template = 100min (120→20)', () => {
    expect(economiaPorUsoH(template)).toBeCloseTo(1.6667, 3)
  })
  it('template já pagou (8 usos ≥ payback de 3)', () => {
    const a = analisarEficiencia(template, usos)
    expect(a.usosAteHoje).toBe(8)
    expect(a.usosPayback).toBe(3)
    expect(a.pago).toBe(true)
    expect(a.status).toContain('Pago')
    // 100min = 1,6667h por uso · 8 usos = 13,33h
    expect(a.economiaAcumH).toBeCloseTo(13.3333, 3)
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

  it('peças ~R$ 1.594 (8 stories a 100min + 2 propostas)', () => {
    expect(imp.valorEconomizadoBrl).toBeCloseTo(1593.75, 1)
  })
  it('valor realizado até hoje ~R$ 14.344', () => {
    expect(imp.valorRealizadoAteHoje).toBeCloseTo(14343.75, 1)
  })
  it('valor líquido recorrente ~R$ 5.568/mês', () => {
    expect(imp.valorRecorrenteMes).toBeCloseTo(5567.67, 1)
  })
  it('valor recorrente ~R$ 66,8 mil/ano', () => {
    expect(imp.valorRecorrenteAno).toBeGreaterThan(65000)
    expect(imp.valorRecorrenteAno).toBeLessThan(68000)
  })
  it('ferramenta paga ~11,6x', () => {
    expect(imp.ferramentaPagaX).toBeCloseTo(11.58, 1)
  })
  it('custo fixo evitado = R$ 4.500/mês', () => {
    expect(imp.custoFixoEvitado).toBeCloseTo(4500, 0)
  })
  it('capital de infraestrutura = R$ 18.116 (DS 160h + Drive 7h + Pipeline 3,5h)', () => {
    expect(imp.capitalInfraBrl).toBeCloseTo(18115.625, 1)
  })
})
