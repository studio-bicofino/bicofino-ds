'use client'

import { useState, useTransition } from 'react'
import { signInWithMagicLink } from './actions'
import { BicofinoLogo } from '@/components/BicofinoLogo'

type Props = {
  next?: string
  initialError?: string
}

export function LoginForm({ next, initialError }: Props) {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<
    | { kind: 'idle' }
    | { kind: 'error'; message: string }
    | { kind: 'sent'; email: string }
  >(initialError ? { kind: 'error', message: initialError } : { kind: 'idle' })

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await signInWithMagicLink(formData)
      if (result.ok) {
        setStatus({ kind: 'sent', email: result.email })
      } else {
        setStatus({ kind: 'error', message: result.error })
      }
    })
  }

  if (status.kind === 'sent') {
    return (
      <div style={panelStyle}>
        <LogoMark />
        <p className="mono" style={eyebrowStyle}>Casa Nostra</p>
        <h1 style={titleStyle}>Cheque seu email.</h1>
        <p style={bodyStyle}>
          Mandamos um link para <strong>{status.email}</strong>. O link expira em 1 hora e só
          pode ser usado uma vez. Pode fechar essa aba — o clique no email vai te trazer de volta
          já autenticado.
        </p>
      </div>
    )
  }

  return (
    <form action={handleSubmit} style={panelStyle}>
      <LogoMark />
      <p className="mono" style={eyebrowStyle}>Casa Nostra</p>
      <h1 style={titleStyle}>Entrar</h1>
      <p style={bodyStyle}>
        Acesso restrito. Coloca seu email da Bicofino — você recebe um link mágico pra entrar.
      </p>

      <label htmlFor="email" style={labelStyle}>Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        disabled={isPending}
        placeholder="voce@bicofino.com"
        style={inputStyle}
      />
      {next && <input type="hidden" name="next" value={next} />}

      <button
        type="submit"
        disabled={isPending}
        style={{
          ...buttonStyle,
          opacity: isPending ? 0.6 : 1,
          cursor: isPending ? 'wait' : 'pointer',
        }}
      >
        {isPending ? 'Enviando…' : 'Receber link mágico'}
      </button>

      {status.kind === 'error' && (
        <p role="alert" style={errorStyle}>
          {status.message}
        </p>
      )}
    </form>
  )
}

function LogoMark() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        color: 'var(--bf-text-primary)',
        marginBottom: 8,
      }}
    >
      <BicofinoLogo height={22} ariaLabel="Bicofino" />
    </div>
  )
}

const panelStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: 420,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: 32,
  background: 'var(--bf-surface)',
  border: '1px solid var(--bf-border)',
  borderRadius: 16,
}

const eyebrowStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'var(--bf-text-secondary)',
}

const titleStyle: React.CSSProperties = {
  fontSize: 32,
  letterSpacing: '-0.02em',
  color: 'var(--bf-text-primary)',
  marginBottom: 4,
}

const bodyStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  color: 'var(--bf-text-secondary)',
  marginBottom: 8,
}

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: 'var(--bf-text-primary)',
  marginTop: 8,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  fontSize: 14,
  fontFamily: 'inherit',
  color: 'var(--bf-text-primary)',
  background: 'var(--bf-surface-subtle)',
  border: '1px solid var(--bf-border)',
  borderRadius: 4,
  outline: 'none',
}

const buttonStyle: React.CSSProperties = {
  width: '100%',
  marginTop: 8,
  padding: '14px 16px',
  fontSize: 14,
  fontWeight: 600,
  fontFamily: 'inherit',
  color: 'var(--bf-ops-success-fg)',
  background: 'var(--bf-ops-success)',
  border: 'none',
  borderRadius: 9999,
  transition: 'background 180ms ease-out',
}

const errorStyle: React.CSSProperties = {
  marginTop: 8,
  padding: '10px 12px',
  fontSize: 13,
  color: 'var(--bf-ops-danger)',
  background: 'rgba(160,58,58,0.06)',
  border: '1px solid rgba(160,58,58,0.18)',
  borderRadius: 4,
}
