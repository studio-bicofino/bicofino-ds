'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { nomeMes } from '@/lib/format'

/* Troca o mês recalcula tudo para aquele período (via ?mes=). */
export function MonthSelector({ meses }: { meses: string[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const atual = params.get('mes') ?? 'all'

  function go(valor: string) {
    const q = new URLSearchParams(params.toString())
    if (valor === 'all') q.delete('mes')
    else q.set('mes', valor)
    const qs = q.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  const opts = [{ v: 'all', label: 'Tudo até hoje' }, ...meses.map((m) => ({ v: m, label: nomeMes(m) }))]

  return (
    <div className="no-print" style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
      {opts.map((o) => {
        const active = atual === o.v
        return (
          <button
            key={o.v}
            type="button"
            onClick={() => go(o.v)}
            className="pill"
            style={{
              cursor: 'pointer',
              textTransform: 'capitalize',
              borderColor: active ? 'var(--bf-text-primary)' : undefined,
              color: active ? 'var(--bf-text-primary)' : undefined,
              fontWeight: active ? 500 : 400,
            }}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
