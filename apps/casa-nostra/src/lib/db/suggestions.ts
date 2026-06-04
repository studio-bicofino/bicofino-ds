import { createClient } from '@/lib/supabase/server'
import { buildSuggestions, type Suggestion } from '@/lib/utils/strings'

export type SuggestionField =
  | 'home_city'
  | 'home_country'
  | 'current_company'
  | 'expertise_area'
  | 'language'
  | 'passport'
  | 'region'

export type SuggestionsBundle = {
  home_city: Suggestion[]
  home_country: Suggestion[]
  current_company: Suggestion[]
  expertise_area: Suggestion[]
  language: Suggestion[]
  passport: Suggestion[]
  region: Suggestion[]
}

const EMPTY: SuggestionsBundle = {
  home_city: [],
  home_country: [],
  current_company: [],
  expertise_area: [],
  language: [],
  passport: [],
  region: [],
}

type PeopleRow = {
  home_city: string | null
  home_country: string | null
  current_company: string | null
  expertise_area: string | null
  languages: string[] | null
  passports: string[] | null
}

type GeoRow = { region: string | null }

type WorkRow = { company: string | null }

export async function getAllSuggestions(): Promise<SuggestionsBundle> {
  const supabase = await createClient()

  const [peopleRes, geoRes, workRes] = await Promise.all([
    supabase
      .from('people')
      .select('home_city, home_country, current_company, expertise_area, languages, passports'),
    supabase.from('geography_action').select('region'),
    supabase.from('work_history').select('company'),
  ])

  if (peopleRes.error || geoRes.error || workRes.error) return EMPTY

  const people = (peopleRes.data ?? []) as PeopleRow[]
  const geo = (geoRes.data ?? []) as GeoRow[]
  const work = (workRes.data ?? []) as WorkRow[]

  const cities = people.map((p) => p.home_city)
  const countries = people.map((p) => p.home_country)
  const companies = [
    ...people.map((p) => p.current_company),
    ...work.map((w) => w.company),
  ]
  const areas = people.map((p) => p.expertise_area)
  const languages = people.flatMap((p) => p.languages ?? [])
  const passports = people.flatMap((p) => p.passports ?? [])
  const regions = geo.map((g) => g.region)

  return {
    home_city: buildSuggestions(cities),
    home_country: buildSuggestions(countries),
    current_company: buildSuggestions(companies),
    expertise_area: buildSuggestions(areas),
    language: buildSuggestions(languages),
    passport: buildSuggestions(passports),
    region: buildSuggestions(regions),
  }
}

/**
 * Variante leve usada pela lista de Pessoas (filtros). Só busca cidades.
 */
export async function getCitySuggestions(): Promise<Suggestion[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('people').select('home_city')
  if (error || !data) return []
  return buildSuggestions(data.map((r) => (r as { home_city: string | null }).home_city))
}
