import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isAllowed } from '@/lib/auth/allowlist'
import { getSession, isAuthBypassed } from '@/lib/auth/session'
import { Sidebar } from './_components/Sidebar'

/**
 * Layout autenticado — tudo dentro de (app)/ exige sessão E allowlist.
 * Em CASA_NOSTRA_AUTH_BYPASS=1 ambas as guardas são puladas.
 */
export default async function AuthedLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session) redirect('/login')

  if (session.isAuthenticated && !isAllowed(session.email)) {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login?error=not_allowed')
  }

  const displayEmail = isAuthBypassed() ? 'modo construção' : session.email

  return (
    <div className="cn-app-shell">
      <Sidebar email={displayEmail} />
      <main style={{ minWidth: 0 }}>{children}</main>
    </div>
  )
}
