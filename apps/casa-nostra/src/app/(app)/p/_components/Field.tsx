'use client'

import type { CSSProperties, ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react'
import { forwardRef } from 'react'

/**
 * Field — wrapper editorial reutilizável.
 * Label mono pequena uppercase + controle pill (radius 10, border subtle).
 *
 * Suporta input, textarea e select via prop `as`. Para casos custom
 * (chips, sliders, listas dinâmicas) usar `<FieldShell>` + children.
 */

const LABEL_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 10,
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--bf-text-secondary)',
  display: 'block',
  marginBottom: 8,
}

const INPUT_BASE: CSSProperties = {
  width: '100%',
  fontFamily: 'inherit',
  fontSize: 14,
  lineHeight: 1.5,
  padding: '12px 14px',
  background: 'var(--bf-surface)',
  color: 'var(--bf-text-primary)',
  border: '1px solid var(--bf-border)',
  borderRadius: 10,
  outline: 'none',
  transition: 'border-color 120ms ease-out, box-shadow 120ms ease-out',
}

const ERROR_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 10,
  color: 'var(--bf-ops-danger)',
  marginTop: 6,
  letterSpacing: '0.04em',
}

const HINT_STYLE: CSSProperties = {
  fontSize: 12,
  color: 'var(--bf-text-secondary)',
  marginTop: 6,
  lineHeight: 1.45,
}

type ShellProps = {
  label?: ReactNode
  error?: string
  hint?: string
  htmlFor?: string
  children: ReactNode
  style?: CSSProperties
}

export function FieldShell({ label, error, hint, htmlFor, children, style }: ShellProps) {
  return (
    <div className="cn-field-shell" style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {label ? (
        <label htmlFor={htmlFor} style={LABEL_STYLE}>
          {label}
        </label>
      ) : null}
      {children}
      {error ? <span style={ERROR_STYLE}>{error}</span> : null}
      {!error && hint ? <span style={HINT_STYLE}>{hint}</span> : null}
    </div>
  )
}

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'label'> & {
  label?: ReactNode
  error?: string
  hint?: string
}

export const TextField = forwardRef<HTMLInputElement, InputProps>(function TextField(
  { label, error, hint, id, style, ...rest },
  ref,
) {
  return (
    <FieldShell label={label} error={error} hint={hint} htmlFor={id}>
      <input ref={ref} id={id} {...rest} style={{ ...INPUT_BASE, ...style }} />
    </FieldShell>
  )
})

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'label'> & {
  label?: ReactNode
  error?: string
  hint?: string
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function TextAreaField({ label, error, hint, id, style, rows = 4, ...rest }, ref) {
    return (
      <FieldShell label={label} error={error} hint={hint} htmlFor={id}>
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          {...rest}
          style={{ ...INPUT_BASE, resize: 'vertical', fontFamily: 'inherit', ...style }}
        />
      </FieldShell>
    )
  },
)

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'label'> & {
  label?: ReactNode
  error?: string
  hint?: string
  children: ReactNode
}

export const SelectField = forwardRef<HTMLSelectElement, SelectProps>(function SelectField(
  { label, error, hint, id, style, children, ...rest },
  ref,
) {
  return (
    <FieldShell label={label} error={error} hint={hint} htmlFor={id}>
      <select
        ref={ref}
        id={id}
        {...rest}
        style={{
          ...INPUT_BASE,
          appearance: 'none',
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%236d7886%27 stroke-width=%271.5%27><polyline points=%276 9 12 15 18 9%27/></svg>")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          paddingRight: 36,
          ...style,
        }}
      >
        {children}
      </select>
    </FieldShell>
  )
})

export const fieldInputBaseStyle = INPUT_BASE
export const fieldLabelStyle = LABEL_STYLE
