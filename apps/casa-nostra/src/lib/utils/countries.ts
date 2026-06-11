/**
 * Casa Nostra v2 — países (ISO 3166-1 alpha-2).
 *
 * Fonte única pra Cidadania/Ascendência: lista completa de códigos atribuídos,
 * bandeira derivada via regional indicators (sem assets) e nome pt-BR via
 * Intl.DisplayNames (memoizado). Busca normaliza acentos/caixa dos dois lados.
 */

/** Todos os códigos ISO 3166-1 alpha-2 atribuídos (~249). */
export const COUNTRY_CODES: string[] = [
  'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT',
  'AU', 'AW', 'AX', 'AZ',
  'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN',
  'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ',
  'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO',
  'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ',
  'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ',
  'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET',
  'FI', 'FJ', 'FK', 'FM', 'FO', 'FR',
  'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP',
  'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY',
  'HK', 'HM', 'HN', 'HR', 'HT', 'HU',
  'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT',
  'JE', 'JM', 'JO', 'JP',
  'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ',
  'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY',
  'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO',
  'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ',
  'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ',
  'OM',
  'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT',
  'PW', 'PY',
  'QA',
  'RE', 'RO', 'RS', 'RU', 'RW',
  'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM',
  'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ',
  'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR',
  'TT', 'TV', 'TW', 'TZ',
  'UA', 'UG', 'UM', 'US', 'UY', 'UZ',
  'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU',
  'WF', 'WS',
  'YE', 'YT',
  'ZA', 'ZM', 'ZW',
]

/** Emoji da bandeira via regional indicator symbols (A→🇦 etc.). */
export function flagEmoji(code: string): string {
  return String.fromCodePoint(
    ...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  )
}

let displayNames: Intl.DisplayNames | null | undefined

/** Nome do país em pt-BR. Fallback = o próprio código se a API indisponível. */
export function countryName(code: string): string {
  const upper = code.toUpperCase()
  if (displayNames === undefined) {
    try {
      displayNames = new Intl.DisplayNames(['pt'], { type: 'region' })
    } catch {
      displayNames = null
    }
  }
  if (!displayNames) return upper
  try {
    return displayNames.of(upper) ?? upper
  } catch {
    return upper
  }
}

export type CountryOption = { code: string; name: string; flag: string }

/** NFD + strip de diacríticos + lower + trim — só pra comparação. */
function fold(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

let allOptions: CountryOption[] | null = null

/** Lista completa { code, name, flag }, ordenada pt-BR, memoizada. */
function getAllOptions(): CountryOption[] {
  if (!allOptions) {
    allOptions = COUNTRY_CODES.map((code) => ({
      code,
      name: countryName(code),
      flag: flagEmoji(code),
    })).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  }
  return allOptions
}

/**
 * Busca por nome (acentos/caixa ignorados). Matches que COMEÇAM com a query
 * vêm primeiro, depois os que contêm. `exclude` = códigos já selecionados.
 */
export function searchCountries(
  query: string,
  exclude: string[] = [],
  limit = 8,
): CountryOption[] {
  const q = fold(query)
  if (!q) return []

  const excluded = new Set(exclude.map((c) => c.toUpperCase()))
  const starts: CountryOption[] = []
  const contains: CountryOption[] = []

  for (const opt of getAllOptions()) {
    if (excluded.has(opt.code)) continue
    const name = fold(opt.name)
    if (name.startsWith(q)) starts.push(opt)
    else if (name.includes(q)) contains.push(opt)
    if (starts.length >= limit) break
  }

  return [...starts, ...contains].slice(0, limit)
}
