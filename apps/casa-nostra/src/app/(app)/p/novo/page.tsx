import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PersonForm } from '@/app/(app)/p/_components/PersonForm'
import { createPerson } from '@/app/(app)/p/_actions/persons'
import type { PersonFormInput } from '@/lib/db/schemas'
import type { Group } from '@/lib/db/types'

export const dynamic = 'force-dynamic'

type IntroCandidate = { id: string; full_name: string }

export default async function NovaPessoaPage() {
  const supabase = await createClient()

  const [groupsRes, peopleRes] = await Promise.all([
    supabase
      .from('groups')
      .select('id, name, group_type')
      .order('name', { ascending: true }),
    supabase.from('people').select('id, full_name').order('full_name', { ascending: true }),
  ])

  const groups = (groupsRes.data ?? []) as Array<Pick<Group, 'id' | 'name' | 'group_type'>>
  const introCandidates = (peopleRes.data ?? []) as IntroCandidate[]

  async function handleCreate(input: PersonFormInput) {
    'use server'
    const result = await createPerson(input)
    if (result.ok) {
      redirect(`/p/${result.id}`)
    }
    return result
  }

  return (
    <div
      style={{
        padding: '48px 56px 64px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        maxWidth: 1280,
      }}
    >
      <header style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <nav
          className="mono"
          aria-label="Breadcrumb"
          style={{
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--bf-text-secondary)',
          }}
        >
          <Link
            href="/"
            style={{
              color: 'var(--bf-text-secondary)',
              textDecoration: 'none',
            }}
          >
            Pessoas
          </Link>
          <span style={{ margin: '0 8px', color: 'var(--bf-text-subtle)' }}>·</span>
          <span style={{ color: 'var(--bf-text-primary)' }}>Nova pessoa</span>
        </nav>

        <h1
          style={{
            fontSize: 'clamp(32px, 4vw, 44px)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: 'var(--bf-text-primary)',
          }}
        >
          Nova pessoa
        </h1>
        <p
          style={{
            fontSize: 15,
            color: 'var(--bf-text-secondary)',
            maxWidth: 520,
          }}
        >
          Cadastre a substância qualitativa que separa um registro de relação de uma linha
          de pipeline.
        </p>
      </header>

      <section
        style={{
          background: 'var(--bf-surface)',
          border: '1px solid var(--bf-border)',
          borderRadius: 16,
          padding: 32,
        }}
      >
        <PersonForm
          initial={null}
          groups={groups}
          introCandidates={introCandidates}
          onSubmit={handleCreate}
        />
      </section>
    </div>
  )
}
