import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ATHLETES } from '@/lib/athletes'
import { TopBar } from '@/components/TopBar'
import { BicofinoDiamond } from '@/components/BicofinoDiamond'

/* Hub — porta de entrada do Drive do Atleta. Lista todos os atletas;
   cada um leva ao seu /a/<slug>. Fundo power-black, como o fluxo do atleta. */
export default function Home() {
  return (
    <div className="surface-dark" data-surface="dark">
      <TopBar />

      <main className="shell-narrow shell-main">
        <div className="stack-6 bf-reveal" style={{ paddingTop: 'var(--sp-7)' }}>
          <div className="stack-4">
            <span className="bf-eyebrow row" style={{ gap: 'var(--sp-2)' }}>
              <BicofinoDiamond color="var(--current-accent-ink)" size={12} /> Drive do Atleta
            </span>
            <h1 className="bf-impact" style={{ fontSize: 'clamp(2.25rem, 8vw, 4rem)', color: 'var(--bf-text-primary)' }}>
              Selecione o atleta
            </h1>
            <p className="bf-body" style={{ maxWidth: '38ch' }}>
              Escolha o atleta para enviar fotos e vídeos ao acervo Bicofino.
            </p>
          </div>

          <ul className="stack-2" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {ATHLETES.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/a/${a.slug}`}
                  className="cell cell--pad-sm between hub-link"
                  style={{ alignItems: 'center', gap: 'var(--sp-4)', textDecoration: 'none' }}
                >
                  <span className="stack-2" style={{ minWidth: 0 }}>
                    <span style={{ fontWeight: 500, color: 'var(--bf-text-primary)' }}>{a.name}</span>
                    {(a.position || a.club) && (
                      <span className="bf-mono" style={{ color: 'var(--bf-text-subtle)' }}>
                        {[a.position, a.club].filter(Boolean).join('  //  ')}
                      </span>
                    )}
                  </span>
                  <ArrowRight
                    className="hub-link__arrow"
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden
                    style={{ flex: '0 0 auto', color: 'var(--current-accent-ink)' }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
