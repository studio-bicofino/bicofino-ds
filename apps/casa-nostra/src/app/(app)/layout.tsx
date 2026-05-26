import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isAllowed } from '@/lib/auth/allowlist'
import { Sidebar } from './_components/Sidebar'

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
    <div className="cn-app-shell">
      <Sidebar email={email} />
      <main style={{ minWidth: 0 }}>{children}</main>
    </div>
  )
}
