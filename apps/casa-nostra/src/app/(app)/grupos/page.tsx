import { createClient } from '@/lib/supabase/server'
import type { Group, GroupType } from '@/lib/db/types'
import { AddGroupForm } from './_components/AddGroupForm'
import { GroupList } from './_components/GroupRow'

const GROUP_TYPE_ORDER: GroupType[] = [
  'clube',
  'educacional',
  'profissional',
  'empresarial',
  'entidade',
  'pessoal',
]

const GROUP_TYPE_LABEL: Record<GroupType, string> = {
  clube: 'Clube',
  educacional: 'Educacional',
  profissional: 'Profissional',
  empresarial: 'Empresarial',
  entidade: 'Entidade',
  pessoal: 'Pessoal',
}

export default async function GruposPage() {
  const supabase = await createClient()

  const [groupsResult, linksResult] = await Promise.all([
    supabase.from('groups').select('*').order('group_type').order('name'),
    supabase.from('person_groups').select('group_id'),
  ])

  const groups = (groupsResult.data ?? []) as Group[]
  const links = (linksResult.data ?? []) as Array<{ group_id: string }>
  const error = groupsResult.error?.message ?? null

  // Agrega contagem no client (cheap, < 1k linhas).
  const counts: Record<string, number> = {}
  for (const link of links) {
    counts[link.group_id] = (counts[link.group_id] ?? 0) + 1
  }

  // Agrupa por group_type respeitando ordem canônica.
  const byType = new Map<GroupType, Group[]>()
  for (const t of GROUP_TYPE_ORDER) byType.set(t, [])
  for (const g of groups) {
    const bucket = byType.get(g.group_type)
    if (bucket) bucket.push(g)
  }

  return (
    <div className="cn-page cn-page--narrow">
      <Hero total={groups.length} />

      <div style={{ height: 1, background: 'var(--bf-border)' }} aria-hidden />

      <AddGroupForm />

      {error ? (
        <ErrorBlock message={error} />
      ) : groups.length === 0 ? (
        <EmptyState />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {GROUP_TYPE_ORDER.map((type) => {
            const list = byType.get(type) ?? []
            if (list.length === 0) return null
            return (
              <section
                key={type}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <header
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    padding: '0 4px',
                  }}
                >
                  <h2
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--bf-text-secondary)',
                      fontWeight: 500,
                    }}
                  >
                    {GROUP_TYPE_LABEL[type]}
                  </h2>
                  <span
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.08em',
                      color: 'var(--bf-text-subtle)',
                    }}
                  >
                    {list.length}
                  </span>
                </header>

                <div
                  style={{
                    background: 'var(--bf-surface)',
                    border: '1px solid var(--bf-border)',
                    borderRadius: 16,
                    overflow: 'hidden',
                  }}
                >
                  <GroupList groups={list} counts={counts} />
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Hero({ total }: { total: number }) {
  return (
    <header style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--bf-text-secondary)',
        }}
      >
        Bicofino · Casa Nostra · Grupos
      </p>
      <h1
        style={{
          fontSize: 'clamp(36px, 4.4vw, 48px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: 'var(--bf-text-primary)',
        }}
      >
        Grupos
      </h1>
      <p
        style={{
          fontSize: 15,
          color: 'var(--bf-text-secondary)',
          maxWidth: 560,
        }}
      >
        Os círculos pelos quais cada pessoa entra na nossa órbita — clubes, escolas, organizações.
        {' '}
        <span className="mono" style={{ fontSize: 12, letterSpacing: '0.04em' }}>
          {total} {total === 1 ? 'grupo' : 'grupos'}
        </span>
      </p>
    </header>
  )
}

function EmptyState() {
  return (
    <div
      style={{
        background: 'var(--bf-surface)',
        border: '1px dashed var(--bf-border-strong)',
        borderRadius: 16,
        padding: 48,
        textAlign: 'center',
        color: 'var(--bf-text-secondary)',
      }}
    >
      <p
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 10,
        }}
      >
        Nenhum grupo cadastrado
      </p>
      <p style={{ fontSize: 14, maxWidth: 380, margin: '0 auto' }}>
        Crie o primeiro grupo pelo formulário acima.
      </p>
    </div>
  )
}

function ErrorBlock({ message }: { message: string }) {
  return (
    <div
      style={{
        background: 'var(--bf-surface)',
        border: '1px solid var(--bf-ops-danger)',
        borderRadius: 16,
        padding: 24,
        color: 'var(--bf-ops-danger)',
        fontSize: 14,
      }}
    >
      <p className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', marginBottom: 8 }}>
        ERRO AO CARREGAR
      </p>
      <p>{message}</p>
    </div>
  )
}
