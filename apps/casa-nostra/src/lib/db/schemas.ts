/**
 * Casa Nostra — zod schemas espelhando as 10 tabelas do schema SQL.
 *
 * Cada tabela exporta:
 *   - `<table>Schema`      → schema base (Row), espelhando as colunas
 *   - `<table>InsertSchema` → omite id / created_at / updated_at
 *                            (campos com default no DB ficam opcionais)
 *   - `<table>UpdateSchema` → todos os campos opcionais, exceto `id`
 *
 * Além disso: `personFormSchema` — schema agregado consumido pelas páginas
 * `/p/[id]` e `/p/novo`, com `person` + arrays das tabelas filhas.
 *
 * Fonte da verdade pros nomes de coluna: `src/lib/db/types.ts`.
 * Fonte da verdade pras constraints: `db/migrations/0001_initial_schema.sql`.
 */

import { z } from 'zod'

// ============================================================
// Enums (espelham CHECK constraints no SQL)
// ============================================================

export const clusterEnum = z.enum(['A', 'B', 'C'])

export const seniorityEnum = z.enum([
  'pleno',
  'senior',
  'executivo',
  'c-suite',
  'referencia',
])

export const contactTypeEnum = z.enum([
  'email',
  'phone',
  'whatsapp',
  'instagram',
  'linkedin',
  'outro',
])

export const futebolLinkTypeEnum = z.enum([
  'time',
  'atleta',
  'estadio',
  'patrocinio',
  'entidade',
  'comissao',
  'outro',
])

export const groupTypeEnum = z.enum([
  'clube',
  'educacional',
  'profissional',
  'empresarial',
  'entidade',
  'pessoal',
])

export const geoScopeEnum = z.enum([
  'cidade',
  'estado',
  'pais',
  'continente',
  'global',
])

export const geoContextEnum = z.enum([
  'mora',
  'atua',
  'tem_negocio',
  'tem_familia',
  'outro',
])

export const movementTypeEnum = z.enum([
  'interesse',
  'lifeevent',
  'capital_move',
  'ask',
  'recusa',
  'outro',
])

// Score 1–5 nullable (intimacy / contact_ease / bicofino_disposition / network_reach)
const scoreSchema = z.number().int().min(1).max(5).nullable()

// ============================================================
// 1. PEOPLE
// ============================================================

export const personSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string().min(1),
  preferred_name: z.string().nullable(),
  photo_url: z.string().nullable(),
  current_company: z.string().nullable(),
  current_title: z.string().nullable(),
  cluster: clusterEnum.nullable(),
  seniority: seniorityEnum.nullable(),
  expertise_area: z.string().nullable(),
  intimacy: scoreSchema,
  contact_ease: scoreSchema,
  bicofino_disposition: scoreSchema,
  network_reach: scoreSchema,
  home_city: z.string().nullable(),
  home_country: z.string().nullable(),
  languages: z.array(z.string()),
  passports: z.array(z.string()),
  intro_by_person_id: z.string().uuid().nullable(),
  cadence_target_per_year: z.number().int().nullable(),
  last_contact_date: z.string().nullable(), // ISO date
  private_notes: z.string().nullable(),
  restrict_visibility: z.boolean(),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
})

export const personInsertSchema = personSchema
  .omit({ id: true, created_at: true, updated_at: true })
  .partial({
    languages: true,
    passports: true,
    restrict_visibility: true,
    created_by: true,
    updated_by: true,
  })

export const personUpdateSchema = personSchema
  .partial()
  .extend({ id: z.string().uuid() })

// ============================================================
// 2. CONTACT_METHODS
// ============================================================

export const contactMethodSchema = z.object({
  id: z.string().uuid(),
  person_id: z.string().uuid(),
  type: contactTypeEnum,
  value: z.string().min(1),
  is_primary: z.boolean(),
  label: z.string().nullable(),
  created_at: z.string(),
})

export const contactMethodInsertSchema = contactMethodSchema
  .omit({ id: true, created_at: true })
  .partial({ is_primary: true, label: true, person_id: true })

export const contactMethodUpdateSchema = contactMethodSchema
  .partial()
  .extend({ id: z.string().uuid() })

// ============================================================
// 3. PERSON_CATEGORIES
// ============================================================

export const personCategorySchema = z.object({
  person_id: z.string().uuid(),
  category_value: z.string().min(1),
})

export const personCategoryInsertSchema = personCategorySchema.partial({
  person_id: true,
})

export const personCategoryUpdateSchema = personCategorySchema.partial().extend({
  person_id: z.string().uuid(),
  category_value: z.string(),
})

// ============================================================
// 4. WORK_HISTORY
// ============================================================

export const workHistorySchema = z.object({
  id: z.string().uuid(),
  person_id: z.string().uuid(),
  company: z.string().min(1),
  role: z.string().nullable(),
  start_year: z.number().int().nullable(),
  end_year: z.number().int().nullable(),
  notes: z.string().nullable(),
  created_at: z.string(),
})

export const workHistoryInsertSchema = workHistorySchema
  .omit({ id: true, created_at: true })
  .partial({ person_id: true, role: true, start_year: true, end_year: true, notes: true })

export const workHistoryUpdateSchema = workHistorySchema
  .partial()
  .extend({ id: z.string().uuid() })

// ============================================================
// 5. FUTEBOL_LINKS
// ============================================================

export const futebolLinkSchema = z.object({
  id: z.string().uuid(),
  person_id: z.string().uuid(),
  link_type: futebolLinkTypeEnum,
  entity_name: z.string().min(1),
  relation: z.string().nullable(),
  notes: z.string().nullable(),
  created_at: z.string(),
})

export const futebolLinkInsertSchema = futebolLinkSchema
  .omit({ id: true, created_at: true })
  .partial({ person_id: true, relation: true, notes: true })

export const futebolLinkUpdateSchema = futebolLinkSchema
  .partial()
  .extend({ id: z.string().uuid() })

// ============================================================
// 6. BICOFINO_HISTORY
// ============================================================

export const bicofinoHistorySchema = z.object({
  id: z.string().uuid(),
  person_id: z.string().uuid(),
  project: z.string().min(1),
  year: z.number().int().nullable(),
  role: z.string().nullable(),
  outcome: z.string().nullable(),
  created_at: z.string(),
})

export const bicofinoHistoryInsertSchema = bicofinoHistorySchema
  .omit({ id: true, created_at: true })
  .partial({ person_id: true, year: true, role: true, outcome: true })

export const bicofinoHistoryUpdateSchema = bicofinoHistorySchema
  .partial()
  .extend({ id: z.string().uuid() })

// ============================================================
// 7. GROUPS
// ============================================================

export const groupSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  group_type: groupTypeEnum,
  created_by: z.string().uuid().nullable(),
  created_at: z.string(),
})

export const groupInsertSchema = groupSchema
  .omit({ id: true, created_at: true })
  .partial({ created_by: true })

export const groupUpdateSchema = groupSchema
  .partial()
  .extend({ id: z.string().uuid() })

// ============================================================
// 8. PERSON_GROUPS
// ============================================================

export const personGroupSchema = z.object({
  person_id: z.string().uuid(),
  group_id: z.string().uuid(),
  joined_year: z.number().int().nullable(),
  notes: z.string().nullable(),
})

export const personGroupInsertSchema = personGroupSchema.partial({
  person_id: true,
  joined_year: true,
  notes: true,
})

export const personGroupUpdateSchema = personGroupSchema.partial().extend({
  person_id: z.string().uuid(),
  group_id: z.string().uuid(),
})

// ============================================================
// 9. GEOGRAPHY_ACTION
// ============================================================

export const geographyActionSchema = z.object({
  id: z.string().uuid(),
  person_id: z.string().uuid(),
  region: z.string().min(1),
  scope: geoScopeEnum.nullable(),
  context: geoContextEnum.nullable(),
  created_at: z.string(),
})

export const geographyActionInsertSchema = geographyActionSchema
  .omit({ id: true, created_at: true })
  .partial({ person_id: true, scope: true, context: true })

export const geographyActionUpdateSchema = geographyActionSchema
  .partial()
  .extend({ id: z.string().uuid() })

// ============================================================
// 10. MOVEMENTS (tabela DB: signals)
// ============================================================

export const movementSchema = z.object({
  id: z.string().uuid(),
  person_id: z.string().uuid(),
  signal_type: movementTypeEnum,
  observed_at: z.string(), // ISO date
  content: z.string().min(1),
  source: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().uuid().nullable(),
})

export const movementInsertSchema = movementSchema
  .omit({ id: true, created_at: true })
  .partial({ person_id: true, source: true, created_by: true, observed_at: true })

export const movementUpdateSchema = movementSchema
  .partial()
  .extend({ id: z.string().uuid() })

// ============================================================
// Form schema agregado (consumido pelas páginas /p/[id] e /p/novo)
// ============================================================
//
// Tudo opcional / default vazio: o usuário pode salvar uma pessoa com
// apenas `full_name` e ir preenchendo o resto depois.
//
// Para tabelas filhas usamos schemas "sem id / sem person_id" — o action
// preenche `person_id` antes do insert.

const personFormFieldsSchema = z.object({
  full_name: z.string().min(1, 'Nome obrigatório'),
  preferred_name: z.string().nullable().optional(),
  photo_url: z.string().nullable().optional(),
  current_company: z.string().nullable().optional(),
  current_title: z.string().nullable().optional(),
  cluster: clusterEnum.nullable().optional(),
  seniority: seniorityEnum.nullable().optional(),
  expertise_area: z.string().nullable().optional(),
  intimacy: z.number().int().min(1).max(5).nullable().optional(),
  contact_ease: z.number().int().min(1).max(5).nullable().optional(),
  bicofino_disposition: z.number().int().min(1).max(5).nullable().optional(),
  network_reach: z.number().int().min(1).max(5).nullable().optional(),
  home_city: z.string().nullable().optional(),
  home_country: z.string().nullable().optional(),
  languages: z.array(z.string()).optional().default([]),
  passports: z.array(z.string()).optional().default([]),
  intro_by_person_id: z.string().uuid().nullable().optional(),
  cadence_target_per_year: z.number().int().nullable().optional(),
  last_contact_date: z.string().nullable().optional(),
  private_notes: z.string().nullable().optional(),
  restrict_visibility: z.boolean().optional().default(false),
})

const contactMethodFormSchema = z.object({
  type: contactTypeEnum,
  value: z.string().min(1),
  is_primary: z.boolean().optional().default(false),
  label: z.string().nullable().optional(),
})

const workHistoryFormSchema = z.object({
  company: z.string().min(1),
  role: z.string().nullable().optional(),
  start_year: z.number().int().nullable().optional(),
  end_year: z.number().int().nullable().optional(),
  notes: z.string().nullable().optional(),
})

const futebolLinkFormSchema = z.object({
  link_type: futebolLinkTypeEnum,
  entity_name: z.string().min(1),
  relation: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
})

const bicofinoHistoryFormSchema = z.object({
  project: z.string().min(1),
  year: z.number().int().nullable().optional(),
  role: z.string().nullable().optional(),
  outcome: z.string().nullable().optional(),
})

const personGroupFormSchema = z.object({
  group_id: z.string().uuid(),
  joined_year: z.number().int().nullable().optional(),
  notes: z.string().nullable().optional(),
})

const geographyActionFormSchema = z.object({
  region: z.string().min(1),
  scope: geoScopeEnum.nullable().optional(),
  context: geoContextEnum.nullable().optional(),
})

const movementFormSchema = z.object({
  signal_type: movementTypeEnum,
  observed_at: z.string(),
  content: z.string().min(1),
  source: z.string().nullable().optional(),
})

export const personFormSchema = personFormFieldsSchema.extend({
  contact_methods: z.array(contactMethodFormSchema).optional().default([]),
  categories: z.array(z.string()).optional().default([]),
  work_history: z.array(workHistoryFormSchema).optional().default([]),
  futebol_links: z.array(futebolLinkFormSchema).optional().default([]),
  bicofino_history: z.array(bicofinoHistoryFormSchema).optional().default([]),
  groups: z.array(personGroupFormSchema).optional().default([]),
  geography_action: z.array(geographyActionFormSchema).optional().default([]),
  signals: z.array(movementFormSchema).optional().default([]),
})

export type PersonFormInput = z.infer<typeof personFormSchema>
