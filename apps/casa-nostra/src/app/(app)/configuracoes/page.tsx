import { createClient } from '@/lib/supabase/server'
import { getAllowlist } from '@/lib/auth/allowlist'
import { getSession, isAuthBypassed } from '@/lib/auth/session'

export const dynamic = 'force-dynamic'

const APP_VERSION = 'v0.4'
const APP_PERIOD = 'Maio 2026'

type Counts = {
  people: number
  groups: number
  movements: number
}

async function fetchCounts(): Promise<Counts> {
  const supabase = await createClient()
  const [people, groups, movements] = await Promise.all([
    supabase.from('people').select('id', { count: 'exact', head: true }),
    supabase.from('groups').select('id', { count: 'exact', head: true }),
    supabase.from('signals').select('id', { count: 'exact', head: true }),
  ])
  return {
    people: people.count ?? 0,
    groups: groups.count ?? 0,
    movements: movements.count ?? 0,
  }
}

export default async function ConfiguracoesPage() {
  const session = await getSession()
  const allowlist = getAllowlist()
  const bypassOn = isAuthBypassed()
  const counts = await fetchCounts()

  return (
    <div className="cn-page cn-stagger">
      <Hero />

      <div style={{ height: 1, background: 'var(--bf-border)' }} aria-hidden />

      {bypassOn && <BypassAlert />}

      <Section eyebrow="01 · Estado" title="Sistema">
        <KeyValueGrid
          items={[
            { k: 'Versão', v: `${APP_VERSION} · ${APP_PERIOD}` },
            { k: 'Modo', v: bypassOn ? 'Construção (login desligado)' : 'Produção' },
            { k: 'Sessão', v: session?.email ?? '—' },
            { k: 'Stack', v: 'Next 16 · React 19 · Supabase' },
          ]}
        />
      </Section>

      <Section eyebrow="02 · Volume" title="O que vive na casa">
        <StatGrid counts={counts} />
      </Section>

      <Section
        eyebrow="03 · Acesso"
        title="Allowlist"
        subtitle={
          bypassOn
            ? 'Lista efetiva quando o login estiver religado. Hoje sem efeito.'
            : 'Emails autorizados a receber magic link.'
        }
      >
        <Allowlist emails={allowlist} />
      </Section>

      <Section eyebrow="04 · Em breve" title="Próximas frentes">
        <Roadmap />
      </Section>
    </div>
  )
}

function Hero() {
  return (
    <header style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p
        className="mono"
        style={{
          fontSize: 12,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--bf-cn-caffe)',
          fontWeight: 500,
        }}
      >
        // Configurações
      </p>
      <h1
        style={{
          fontSize: 'clamp(40px, 5.6vw, 64px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: 'var(--bf-text-primary)',
        }}
      >
        Ajustes da Casa
      </h1>
      <p
        style={{
          fontSize: 16,
          color: 'var(--bf-text-secondary)',
          maxWidth: 560,
        }}
      >
        Estado do sistema, acessos, volume. A vitrine das engrenagens — o que está
        em construção fica claro aqui antes de virar problema.
      </p>
    </header>
  )
}

function BypassAlert() {
  return (
    <aside
      role="status"
      style={{
        background: 'rgba(255,193,7,0.08)',
        border: '1px solid rgba(255,193,7,0.4)',
        borderRadius: 16,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <p
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--bf-cn-caffe)',
          fontWeight: 600,
        }}
      >
        ⚠︎ Modo construção
      </p>
      <p style={{ fontSize: 14, color: 'var(--bf-text-primary)', lineHeight: 1.55 }}>
        O bypass de login está ativo. Qualquer pessoa que encontrar a URL entra
        sem autenticação. Dados criados aqui são de teste.
      </p>
      <p
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: '0.04em',
          color: 'var(--bf-text-subtle)',
          lineHeight: 1.55,
        }}
      >
        pra religar · remover <code>CASA_NOSTRA_AUTH_BYPASS</code> das 3 envs Vercel + Infisical · limpar dados de teste · re-deploy
      </p>
    </aside>
  )
}

function Section({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <header style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--bf-cn-caffe)',
            fontWeight: 500,
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: 'var(--bf-text-primary)',
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: 13, color: 'var(--bf-text-secondary)', maxWidth: 560 }}>
            {subtitle}
          </p>
        )}
      </header>
      {children}
    </section>
  )
}

function KeyValueGrid({ items }: { items: Array<{ k: string; v: string }> }) {
  return (
    <dl
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 1,
        background: 'var(--bf-border)',
        border: '1px solid var(--bf-border)',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      {items.map((item) => (
        <div
          key={item.k}
          style={{
            background: 'var(--bf-surface)',
            padding: '14px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <dt
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--bf-text-subtle)',
              fontWeight: 500,
            }}
          >
            {item.k}
          </dt>
          <dd
            style={{
              fontSize: 14,
              color: 'var(--bf-text-primary)',
              fontWeight: 500,
            }}
          >
            {item.v}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function StatGrid({ counts }: { counts: Counts }) {
  const items = [
    { label: 'Pessoas', value: counts.people, href: '/' },
    { label: 'Grupos', value: counts.groups, href: '/grupos' },
    { label: 'Movimentos', value: counts.movements, href: '/sinais' },
  ]
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 12,
      }}
    >
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          style={{
            background: 'var(--bf-surface)',
            border: '1px solid var(--bf-border)',
            borderRadius: 16,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            textDecoration: 'none',
            transition: 'border-color 160ms ease-out, transform 160ms ease-out',
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--bf-text-subtle)',
            }}
          >
            {item.label}
          </span>
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--bf-text-primary)',
              lineHeight: 1,
            }}
          >
            {item.value}
          </span>
        </a>
      ))}
    </div>
  )
}

function Allowlist({ emails }: { emails: string[] }) {
  if (emails.length === 0) {
    return (
      <p
        style={{
          fontSize: 13,
          color: 'var(--bf-text-secondary)',
          padding: '14px 18px',
          background: 'var(--bf-surface)',
          border: '1px dashed var(--bf-border-strong)',
          borderRadius: 16,
        }}
      >
        Nenhum email cadastrado em <code>CASA_NOSTRA_ALLOWLIST</code>.
      </p>
    )
  }

  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bf-surface)',
        border: '1px solid var(--bf-border)',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      {emails.map((email, i) => (
        <li
          key={email}
          style={{
            padding: '14px 18px',
            borderTop: i === 0 ? 'none' : '1px solid var(--bf-border)',
            fontSize: 14,
            color: 'var(--bf-text-primary)',
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            letterSpacing: '0.02em',
          }}
        >
          {email}
        </li>
      ))}
    </ul>
  )
}

function Roadmap() {
  const items = [
    'Editar allowlist via UI (hoje só env var)',
    'Exportar dados (CSV / JSON)',
    'Template editorial do email Supabase',
    'Vincular pessoas a apps Vanguarda (matchmaking)',
  ]
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {items.map((item) => (
        <li
          key={item}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            padding: '12px 18px',
            background: 'var(--bf-surface)',
            border: '1px solid var(--bf-border)',
            borderRadius: 9999,
            fontSize: 14,
            color: 'var(--bf-text-primary)',
            lineHeight: 1.4,
          }}
        >
          <span
            className="mono"
            aria-hidden
            style={{
              fontSize: 10,
              letterSpacing: '0.12em',
              color: 'var(--bf-text-subtle)',
              flexShrink: 0,
              paddingTop: 2,
            }}
          >
            ☐
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>{item}</span>
        </li>
      ))}
    </ul>
  )
}
