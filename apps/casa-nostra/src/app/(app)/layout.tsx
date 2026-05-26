import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isAllowed } from '@/lib/auth/allowlist'
import { LogoutButton } from '@/components/LogoutButton'

/**
 * Layout autenticado — tudo dentro de (app)/ exige sessão E allowlist.
 * O middleware já redireciona não-autenticados, mas aqui revalidamos
 * a allowlist (defesa em profundidade: se um email saiu da lista,
 * a sessão antiga ainda funcionaria sem este check).
 */
export default async function AuthedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const email = user.email ?? ''
  if (!isAllowed(email)) {
    await supabase.auth.signOut()
    redirect('/login?error=not_allowed')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '240px 1fr' }}>
      <aside
        style={{
          borderRight: '1px solid var(--bf-border)',
          padding: 32,
          background: 'var(--bf-surface)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <div>
          <p
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--bf-text-secondary)',
              marginBottom: 8,
            }}
          >
            Bicofino
          </p>
          <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>Casa Nostra</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <NavItem href="/" label="Pessoas" />
          <NavItem href="/grupos" label="Grupos" />
          <NavItem href="/sinais" label="Sinais" />
          <NavItem href="/configuracoes" label="Configurações" />
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p
            className="mono"
            style={{ fontSize: 10, color: 'var(--bf-text-secondary)' }}
          >
            {email}
          </p>
          <LogoutButton />
        </div>
      </aside>

      <main>{children}</main>
    </div>
  )
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      style={{
        padding: '8px 12px',
        fontSize: 14,
        color: 'var(--bf-text-primary)',
        borderRadius: 4,
        transition: 'background 120ms ease-out',
      }}
    >
      {label}
    </a>
  )
}
