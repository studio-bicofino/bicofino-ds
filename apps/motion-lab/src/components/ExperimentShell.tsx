import Link from 'next/link'
import type { ReactNode } from 'react'
import { getExperiment } from '@/lib/registry'

export function ExperimentShell({ slug, children }: { slug: string; children: ReactNode }) {
  const exp = getExperiment(slug)

  return (
    <div>
      <header className="exp-head">
        <Link href="/" className="exp-head__back">
          ← índice
        </Link>
        {exp && (
          <>
            <div className="exp-head__row">
              <span className="exp-head__index">EXP-{exp.index}</span>
              <h1 className="exp-head__title">{exp.title}</h1>
              <span className="lab-chip lab-chip--status">{exp.status}</span>
            </div>
            <p className="exp-head__summary">{exp.summary}</p>
            <div className="exp-head__chips">
              {exp.tags.map((t) => (
                <span key={t} className="lab-chip">
                  {t}
                </span>
              ))}
              {exp.libs.map((l) => (
                <span key={l} className="lab-chip">
                  {l}
                </span>
              ))}
            </div>
          </>
        )}
      </header>
      <main>{children}</main>
    </div>
  )
}
