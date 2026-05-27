'use client'

/**
 * Casa Nostra v2 — PhotoUploaderHero.
 *
 * Versão hero do uploader: avatar 160×160 redondo dominante na coluna esquerda
 * do form, sem caixa tracejada externa (subtração). Botão "Trocar foto" mono
 * 11px abaixo do avatar + dica de paste/drag mono 10px sob o botão.
 *
 * Reaproveita a action `uploadPersonPhoto` da v0.8.1, mas tem UI própria —
 * NÃO modifica `p/_components/sections/PhotoUploader.tsx` (v0.8.1 depende dele
 * intacto). Mesma lógica de useState/dragOver/paste replicada localmente
 * porque o refactor pra hook compartilhado é maior do que vale a duplicação.
 */

import type { CSSProperties } from 'react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { uploadPersonPhoto } from '@/lib/storage/photos'

type Props = {
  value: string | null
  onChange: (url: string | null) => void
  disabled?: boolean
}

const COLUMN_STYLE: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  width: 220,
}

const AVATAR_SIZE = 160

const AVATAR_STYLE: CSSProperties = {
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  borderRadius: '50%',
  background: 'var(--bf-surface-subtle)',
  border: '1px solid var(--bf-border)',
  display: 'grid',
  placeItems: 'center',
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
  flexShrink: 0,
  transition: 'border-color 160ms ease-out, background 160ms ease-out',
}

const BUTTON_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 11,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--bf-text-secondary)',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  transition: 'color 120ms ease-out',
}

const HINT_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 10,
  letterSpacing: '0.06em',
  color: 'var(--bf-text-subtle)',
  textAlign: 'center',
  lineHeight: 1.45,
  margin: 0,
}

const EMPTY_LABEL_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 11,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--bf-text-subtle)',
}

const ERROR_STYLE: CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 10,
  letterSpacing: '0.04em',
  color: 'var(--bf-ops-danger)',
  textAlign: 'center',
  margin: 0,
}

export function PhotoUploaderHero({ value, onChange, disabled }: Props) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const reduce = useReducedMotion()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [pasteFlash, setPasteFlash] = useState(false)

  const handleFile = useCallback(
    async (file: File | null | undefined) => {
      if (!file) return
      setError(null)
      setBusy(true)
      const result = await uploadPersonPhoto(file)
      setBusy(false)
      if (!result.ok) {
        setError(result.error)
        return
      }
      onChange(result.url)
    },
    [onChange],
  )

  useEffect(() => {
    if (disabled) return

    function onPaste(e: ClipboardEvent) {
      const items = e.clipboardData?.items
      if (!items) return
      for (const item of items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          const file = item.getAsFile()
          if (file) {
            e.preventDefault()
            setPasteFlash(true)
            window.setTimeout(() => setPasteFlash(false), 600)
            void handleFile(file)
            return
          }
        }
      }
    }

    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
  }, [disabled, handleFile])

  function openPicker() {
    if (disabled || busy) return
    inputRef.current?.click()
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    setDragOver(false)
    if (disabled || busy) return
    const file = e.dataTransfer.files?.[0]
    if (file) void handleFile(file)
  }

  const hasPhoto = !!value
  const highlighted = dragOver || pasteFlash

  return (
    <div style={COLUMN_STYLE}>
      <label
        htmlFor={inputId}
        role="button"
        tabIndex={0}
        aria-label={hasPhoto ? 'Trocar foto' : 'Enviar foto'}
        onClick={(e) => {
          e.preventDefault()
          openPicker()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openPicker()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled && !busy) setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          ...AVATAR_STYLE,
          borderColor: highlighted ? 'var(--bf-cn-napoli)' : 'var(--bf-border)',
          background: highlighted
            ? 'color-mix(in srgb, var(--bf-cn-napoli) 8%, transparent)'
            : 'var(--bf-surface-subtle)',
          opacity: disabled ? 0.6 : 1,
          cursor: disabled || busy ? 'not-allowed' : 'pointer',
        }}
      >
        <AnimatePresence mode="popLayout">
          {value ? (
            <motion.img
              key={value}
              src={value}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <motion.span
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
              style={EMPTY_LABEL_STYLE}
            >
              sem foto
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {busy && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'color-mix(in srgb, var(--bf-cn-crema) 70%, transparent)',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: '2px solid var(--bf-border-strong)',
                  borderTopColor: 'var(--bf-cn-caffe)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </label>

      <button
        type="button"
        onClick={openPicker}
        disabled={disabled || busy}
        style={{
          ...BUTTON_STYLE,
          opacity: disabled || busy ? 0.6 : 1,
          cursor: disabled || busy ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={(e) => {
          if (!disabled && !busy) e.currentTarget.style.color = 'var(--bf-text-primary)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--bf-text-secondary)'
        }}
      >
        {busy ? 'Enviando…' : hasPhoto ? 'Trocar foto' : 'Enviar foto'}
      </button>

      <p style={HINT_STYLE}>Arraste, clique ou cole (⌘V)</p>

      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={reduce ? { duration: 0 } : { duration: 0.18, ease: 'easeOut' }}
            style={ERROR_STYLE}
          >
            erro · {error}
          </motion.p>
        )}
      </AnimatePresence>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/heic,image/heif"
        onChange={(e) => void handleFile(e.target.files?.[0])}
        disabled={disabled || busy}
        style={{ display: 'none' }}
      />
    </div>
  )
}
