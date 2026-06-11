/**
 * Casa Nostra — types do schema SQL.
 * Espelha db/migrations/0001_initial_schema.sql.
 * Mantém em sincronia manual até gerarmos via `supabase gen types typescript`.
 */

// ============================================================
// Enums
// ============================================================

export type Cluster = 'A' | 'B' | 'C'

export type Seniority = 'pleno' | 'senior' | 'executivo' | 'c-suite' | 'referencia'

export type ContactType =
  | 'email'
  | 'phone'
  | 'whatsapp'
  | 'instagram'
  | 'linkedin'
  | 'website'
  | 'outro'

export type FutebolLinkType =
  | 'time'
  | 'atleta'
  | 'estadio'
  | 'patrocinio'
  | 'entidade'
  | 'comissao'
  | 'outro'

export type GroupType =
  | 'clube'
  | 'educacional'
  | 'profissional'
  | 'empresarial'
  | 'entidade'
  | 'pessoal'

export type GeoScope = 'cidade' | 'estado' | 'pais' | 'continente' | 'global'

export type GeoContext = 'mora' | 'atua' | 'tem_negocio' | 'tem_familia' | 'outro'

export type MovementType =
  | 'interesse'
  | 'lifeevent'
  | 'capital_move'
  | 'ask'
  | 'recusa'
  | 'outro'

export type OrganizationKind =
  | 'empresa'
  | 'clube'
  | 'midia'
  | 'escola'
  | 'entidade'

export type TagKind = 'skill' | 'grupo' | 'afiliacao' | 'familia' | 'cargo' | 'empresa'

export type CategoryValue =
  | 'cliente'
  | 'ex-cliente'
  | 'prospect'
  | 'parceiro'
  | 'fornecedor'
  | 'investidor'
  | 'concorrente'
  | 'imprensa'
  | 'referencia'
  | 'familia'

// Escala 1–5 (intimidade, contato, disposição, alcance)
export type Score = 1 | 2 | 3 | 4 | 5

// ============================================================
// Tables
// ============================================================

export interface Person {
  id: string
  full_name: string
  preferred_name: string | null
  // Ondas 12-14 (jun/2026)
  bicofino_id: string | null
  member_number: number | null
  honorific: string | null
  birth_date: string | null
  generation: string | null
  citizenships: string[] | null
  ancestries: string[] | null
  photo_url: string | null
  current_company: string | null
  current_title: string | null
  cluster: Cluster | null
  seniority: Seniority | null
  expertise_area: string | null
  intimacy: Score | null
  contact_ease: Score | null
  bicofino_disposition: Score | null
  network_reach: Score | null
  home_city: string | null
  home_country: string | null
  address_street: string | null
  address_number: string | null
  address_complement: string | null
  address_state: string | null
  address_zip: string | null
  languages: string[]
  passports: string[]
  intro_by_person_id: string | null
  cadence_target_per_year: number | null
  last_contact_date: string | null
  private_notes: string | null
  restrict_visibility: boolean
  created_by: string | null
  updated_by: string | null
  created_at: string
  updated_at: string
}

export interface ContactMethod {
  id: string
  person_id: string
  type: ContactType
  value: string
  is_primary: boolean
  label: string | null
  created_at: string
}

export interface PersonCategory {
  person_id: string
  category_value: string
}

export interface WorkHistoryEntry {
  id: string
  person_id: string
  company: string
  role: string | null
  start_year: number | null
  end_year: number | null
  notes: string | null
  created_at: string
}

export interface FutebolLink {
  id: string
  person_id: string
  link_type: FutebolLinkType
  entity_name: string
  relation: string | null
  notes: string | null
  created_at: string
}

export interface BicofinoHistoryEntry {
  id: string
  person_id: string
  project: string
  year: number | null
  role: string | null
  outcome: string | null
  created_at: string
}

export interface Group {
  id: string
  name: string
  group_type: GroupType
  created_by: string | null
  created_at: string
}

export interface PersonGroup {
  person_id: string
  group_id: string
  joined_year: number | null
  notes: string | null
}

export interface GeographyAction {
  id: string
  person_id: string
  region: string
  scope: GeoScope | null
  context: GeoContext | null
  created_at: string
}

export interface Movement {
  id: string
  person_id: string
  signal_type: MovementType
  observed_at: string
  content: string
  source: string | null
  created_at: string
  created_by: string | null
}

export interface Organization {
  id: string
  name: string
  name_key: string
  kind: OrganizationKind
  logo_url: string | null
  created_by: string | null
  created_at: string
}

export interface PersonOrganization {
  id: string
  person_id: string
  org_id: string
  role: string | null
  start_year: number | null
  end_year: number | null
  is_current: boolean
  notes: string | null
  sort_order: number
  created_at: string
}

// Helper consumido pela UI: vínculo + organização populada via select join.
export interface PersonOrganizationWithOrg extends PersonOrganization {
  org: Organization
}

export interface Tag {
  id: string
  name: string
  name_key: string
  kind: TagKind
  metadata: Record<string, unknown>
  created_at: string
  created_by: string | null
}

export interface PersonTag {
  person_id: string
  tag_id: string
  sort_order: number
  created_at: string
}

// Helper consumido pela UI: vínculo + tag populada via select join.
export interface PersonTagWithTag extends PersonTag {
  tag: Tag
}

// ============================================================
// Aggregate (view-model usado nas telas)
// ============================================================

export interface PersonWithRelations extends Person {
  contact_methods: ContactMethod[]
  categories: PersonCategory[]
  work_history: WorkHistoryEntry[]
  futebol_links: FutebolLink[]
  bicofino_history: BicofinoHistoryEntry[]
  groups: Group[]
  geography_action: GeographyAction[]
  signals: Movement[]
  person_organizations: PersonOrganizationWithOrg[]
  person_tags: PersonTagWithTag[]
}

// ============================================================
// Supabase Database type (consumido pelos clients)
// ============================================================

export type Database = {
  public: {
    Tables: {
      people: TableShape<Person>
      contact_methods: TableShape<ContactMethod>
      person_categories: TableShape<PersonCategory>
      work_history: TableShape<WorkHistoryEntry>
      futebol_links: TableShape<FutebolLink>
      bicofino_history: TableShape<BicofinoHistoryEntry>
      groups: TableShape<Group>
      person_groups: TableShape<PersonGroup>
      geography_action: TableShape<GeographyAction>
      signals: TableShape<Movement>
      organizations: TableShape<Organization>
      person_organizations: TableShape<PersonOrganization>
      tags: TableShape<Tag>
      person_tags: TableShape<PersonTag>
    }
  }
}

type TableShape<Row> = {
  Row: Row
  Insert: Partial<Row>
  Update: Partial<Row>
}
