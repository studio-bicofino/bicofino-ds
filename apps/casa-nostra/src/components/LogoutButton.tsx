'use client'

import { useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'

export function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  function handleLogout() {
    startTransition(async () => {
      const supabase = createClient()
      await supabase.auth.signOut()
      window.location.href = '/login'
    })
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      style={{
        padding: '6px 10px',
        fontSize: 12,
        color: 'var(--bf-text-secondary)',
        background: 'transparent',
        border: '1px solid var(--bf-border)',
        borderRadius: 4,
        cursor: isPending ? 'wait' : 'pointer',
        textAlign: 'left',
        fontFamily: 'inherit',
        transition: 'border-color 120ms ease-out, color 120ms ease-out',
      }}
    >
      {isPending ? 'Saindo…' : 'Sair'}
    </button>
  )
}
