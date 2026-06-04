/* Camada de dados — junta seed + cálculo numa "view".
   Seed-first: tudo síncrono e em memória. Ao plugar o Supabase,
   só estas funções trocam de fonte; calc.ts e as telas não mudam. */

import { settings, sistemas, usos } from './seed'
import { calcularImpacto, type Impacto } from './calc'
import { gerarFrases, type Frase } from './phrases'
import { chaveMes } from './format'
import type { Sistema, Uso } from './types'

export type Periodo = string | 'all'

export interface UsoExpandido extends Uso {
  sistema: Sistema
  economiaPorUsoMin: number
}

export interface View {
  periodo: Periodo
  impacto: Impacto
  frases: Frase[]
  pecas: UsoExpandido[]
  sistemas: Sistema[]
}

/** Meses disponíveis (mais recente primeiro), derivados só das peças mensais
   (eficiência). Showcases de infra/projeto não criam meses no seletor. */
export function mesesDisponiveis(): string[] {
  const eficientes = new Set(sistemas.filter((s) => s.tipo === 'eficiencia').map((s) => s.id))
  const set = new Set<string>()
  usos.forEach((u) => {
    if (eficientes.has(u.sistema_id)) set.add(chaveMes(u.data))
  })
  return [...set].sort().reverse()
}

function expandirUsos(lista: Uso[]): UsoExpandido[] {
  return lista
    .map((u) => {
      const sistema = sistemas.find((s) => s.id === u.sistema_id)!
      const eco = (sistema.tempo_antes_min ?? 0) - (sistema.tempo_depois_min ?? 0)
      return { ...u, sistema, economiaPorUsoMin: eco }
    })
    .sort((a, b) => b.data.localeCompare(a.data))
}

export function getView(periodo: Periodo = 'all'): View {
  if (periodo === 'all') {
    const impacto = calcularImpacto(settings, sistemas, usos)
    return {
      periodo,
      impacto,
      frases: gerarFrases(settings, sistemas, impacto),
      pecas: expandirUsos(usos),
      sistemas,
    }
  }

  // Escopo mensal: usos do mês; projetos/infra contam no mês de lançamento.
  const usosMes = usos.filter((u) => chaveMes(u.data) === periodo)
  const sistemasMes = sistemas.filter((s) => {
    if (s.tipo === 'eficiencia') return true // mantém p/ economia por uso
    return chaveMes(s.criado_em) === periodo
  })
  const impacto = calcularImpacto(settings, sistemasMes, usosMes)
  return {
    periodo,
    impacto,
    frases: gerarFrases(settings, sistemasMes, impacto),
    pecas: expandirUsos(usosMes),
    sistemas: sistemasMes,
  }
}
