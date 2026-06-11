/**
 * Casa Nostra v2 — schema do form de cadastro.
 *
 * Separado de cadastro.ts ('use server') porque Next.js 16 / React 19 rejeita
 * exports não-async-function em arquivos 'use server'. Esquema fica aqui pra
 * ser compartilhado entre client (form) e server (action).
 */

import { z } from 'zod'

const contactBlockSchema = z.object({
  whatsapp: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
})

const addressBlockSchema = z.object({
  street: z.string().optional().nullable(),
  number: z.string().optional().nullable(),
  complement: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zip: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
})

export const cadastroV2Schema = z.object({
  full_name: z.string().min(1, 'Nome obrigatório').trim(),
  bicofino_id: z.string().optional().nullable(),
  member_number: z.string().optional().nullable(),
  honorific: z.string().optional().nullable(),
  birth_date: z.string().optional().nullable(),
  generation: z.string().optional().nullable(),
  current_title: z.string().optional().nullable(),
  current_company: z.string().optional().nullable(),
  photo_url: z.string().optional().nullable(),
  contacts: contactBlockSchema.optional().default({}),
  address: addressBlockSchema.optional().default({}),
  skills: z.array(z.string().min(1)).optional().default([]),
  grupos: z.array(z.string().min(1)).optional().default([]),
  familias: z.array(z.string().min(1)).optional().default([]),
  afiliacoes: z.array(z.string().min(1)).optional().default([]),
})

export type CadastroV2Input = z.infer<typeof cadastroV2Schema>
