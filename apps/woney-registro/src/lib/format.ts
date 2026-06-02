/* Formatação pt-BR — moeda, horas, números, datas. */

const brl0 = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

const brl2 = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const num1 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 })

export function fmtBRL(v: number): string {
  return brl0.format(v)
}

export function fmtBRLcent(v: number): string {
  return brl2.format(v)
}

/** Horas em formato curto: 8,3h */
export function fmtHoras(h: number): string {
  return `${num1.format(h)}h`
}

/** Multiplicador: 10,6× */
export function fmtX(x: number): string {
  return `${num1.format(x)}×`
}

/** Minutos em formato humano: 20 → "20 min", 90 → "1h30", 180 → "3h" */
export function fmtMin(min: number): string {
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`
}

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

/** '2026-05' → 'maio de 2026' */
export function nomeMes(chave: string): string {
  const [ano, mes] = chave.split('-').map(Number)
  return `${MESES[mes - 1]} de ${ano}`
}

/** '2026-05-12' → '12 mai' */
export function dataCurta(iso: string): string {
  const [, mes, dia] = iso.split('-').map(Number)
  return `${dia} ${MESES[mes - 1].slice(0, 3)}`
}

/** Chave de mês 'YYYY-MM' a partir de uma data ISO 'YYYY-MM-DD'. */
export function chaveMes(iso: string): string {
  return iso.slice(0, 7)
}
