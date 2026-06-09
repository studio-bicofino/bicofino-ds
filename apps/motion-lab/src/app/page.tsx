import Link from 'next/link'
import { EXPERIMENTS } from '@/lib/registry'
import { BicofinoLogo } from '@/components/BicofinoLogo'

export default function Home() {
  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '64px 32px 96px' }}>
      <div style={{ marginBottom: 32 }}>
        <BicofinoLogo width={150} color="var(--bf-white)" />
      </div>
      <p className="lab-eyebrow">{'// MOTION LAB'}</p>
      <h1
        style={{
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          color: 'var(--bf-white)',
          margin: '16px 0 0',
          maxWidth: '14ch',
        }}
      >
        Biblioteca viva de movimento
      </h1>
      <p
        style={{
          maxWidth: '46ch',
          fontSize: 14,
          color: 'var(--lab-text-dim)',
          margin: '24px 0 0',
        }}
      >
        Zona franca: aqui as regras de duração do §8 ficam suspensas para
        experimentar. O que for aprovado vira receita nomeada no DESIGN.md e
        primitive no design-system — nada entra nos apps direto daqui.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
          marginTop: 48,
        }}
      >
        {EXPERIMENTS.map((exp) => (
          <Link key={exp.slug} href={`/experiments/${exp.slug}`} className="lab-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="lab-mono" style={{ color: 'var(--current-accent)' }}>
                EXP-{exp.index}
              </span>
              <span className="lab-chip lab-chip--status">{exp.status}</span>
            </div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: 'var(--bf-white)',
                margin: '12px 0 8px',
              }}
            >
              {exp.title}
            </h2>
            <p style={{ fontSize: 13, color: 'var(--lab-text-dim)', margin: 0, maxWidth: '40ch' }}>
              {exp.summary}
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 16 }}>
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
          </Link>
        ))}
      </div>

      <p className="lab-mono" style={{ marginTop: 64 }}>
        pipeline: referência → experimento → aprovado → receita MO-xx no DESIGN.md → primitive →
        apps
      </p>
    </main>
  )
}
