/* Formatação pt-BR — mesma família do Registro de Impacto. */

const brl0 = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

export function fmtBRL(v: number): string {
  return brl0.format(v)
}

/** Faixa compacta: 'R$ 90 mil – R$ 300 mil' */
export function fmtFaixa(min: number, max: number): string {
  return `${fmtBRL(min)} – ${fmtBRL(max)}`
}

const num1 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 })

/** Multiplicador: 10,6× */
export function fmtX(x: number): string {
  return `${num1.format(x)}×`
}

/** Horas em formato curto: 8,3h */
export function fmtHoras(h: number): string {
  return `${num1.format(h)}h`
}
