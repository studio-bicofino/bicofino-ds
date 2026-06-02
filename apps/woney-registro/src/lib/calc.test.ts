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
  it('economia por uso do template = 70min (90→20)', () => {
    expect(economiaPorUsoH(template)).toBeCloseTo(1.1667, 3)
  })
  it('template ainda não pagou (faltam usos)', () => {
    const a = analisarEficiencia(template, usos)
    expect(a.usosAteHoje).toBe(2)
    expect(a.usosPayback).toBe(4)
    expect(a.pago).toBe(false)
    expect(a.status).toContain('Faltam 2')
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

  it('peças ~R$ 425', () => {
    expect(imp.valorEconomizadoBrl).toBeCloseTo(425, 1)
  })
  it('valor realizado até hoje ~R$ 13.175', () => {
    expect(imp.valorRealizadoAteHoje).toBeCloseTo(13175, 1)
  })
  it('valor líquido recorrente ~R$ 5.143/mês', () => {
    expect(imp.valorRecorrenteMes).toBeCloseTo(5142.67, 1)
  })
  it('valor recorrente ~R$ 61,7 mil/ano', () => {
    expect(imp.valorRecorrenteAno).toBeGreaterThan(60000)
    expect(imp.valorRecorrenteAno).toBeLessThan(63000)
  })
  it('ferramenta paga ~10,8x', () => {
    expect(imp.ferramentaPagaX).toBeCloseTo(10.78, 1)
  })
  it('custo fixo evitado = R$ 4.500/mês', () => {
    expect(imp.custoFixoEvitado).toBeCloseTo(4500, 0)
  })
  it('capital de infraestrutura = R$ 17.744 (DS 160h + Drive 7h)', () => {
    expect(imp.capitalInfraBrl).toBeCloseTo(17743.75, 1)
  })
})
