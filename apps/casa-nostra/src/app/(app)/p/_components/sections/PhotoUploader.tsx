'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Upload, X } from 'lucide-react'
import { uploadPersonPhoto } from '@/lib/storage/photos'

const SPRING = { type: 'spring' as const, stiffness: 320, damping: 28 }

type Props = {
  value: string | null
  onChange: (url: string | null) => void
  disabled?: boolean
}

export function PhotoUploader({ value, onChange, disabled }: Props) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
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

  function handleRemove() {
    onChange(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragOver(false)
    if (disabled || busy) return
    const file = e.dataTransfer.files?.[0]
    if (file) void handleFile(file)
  }

  const hasPhoto = !!value

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label
        htmlFor={inputId}
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--bf-text-secondary)',
          fontWeight: 500,
        }}
      >
        Foto
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled && !busy) setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: 14,
          borderRadius: 16,
          border: `1px ${dragOver || pasteFlash ? 'solid' : 'dashed'} ${
            dragOver || pasteFlash ? 'var(--bf-cn-napoli)' : 'var(--bf-border-strong)'
          }`,
          background:
            dragOver || pasteFlash ? 'rgba(119,222,255,0.08)' : 'var(--bf-surface)',
          transition: 'background 240ms ease-out, border-color 240ms ease-out',
        }}
      >
        <Preview value={value} busy={busy} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <button
              type="button"
              onClick={openPicker}
              disabled={disabled || busy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                fontSize: 12,
                fontWeight: 500,
                background: hasPhoto ? 'transparent' : 'var(--bf-ops-edit)',
                color: hasPhoto ? 'var(--bf-text-primary)' : 'var(--bf-ops-edit-fg, #fff)',
                border: hasPhoto
                  ? '1px solid var(--bf-border-strong)'
                  : '1px solid var(--bf-ops-edit)',
                borderRadius: 9999,
                cursor: disabled || busy ? 'not-allowed' : 'pointer',
                transition: 'opacity 160ms ease-out',
                opacity: disabled || busy ? 0.6 : 1,
              }}
            >
              <Upload size={14} strokeWidth={1.5} />
              {busy ? 'Enviando…' : hasPhoto ? 'Trocar' : 'Enviar foto'}
            </button>

            {hasPhoto && !busy && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={disabled}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 12px',
                  fontSize: 12,
                  fontWeight: 500,
                  background: 'transparent',
                  color: 'var(--bf-text-secondary)',
                  border: 'none',
                  borderRadius: 9999,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--bf-ops-danger)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--bf-text-secondary)'
                }}
              >
                <X size={14} strokeWidth={1.5} />
                Remover
              </button>
            )}
          </div>

          <p
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.04em',
              color: 'var(--bf-text-subtle)',
              lineHeight: 1.45,
            }}
          >
            JPG · PNG · WebP · até 5 MB · arraste, clique ou cole (⌘V / Ctrl+V)
          </p>

          <AnimatePresence initial={false}>
            {error && (
              <motion.p
                key="err"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.04em',
                  color: 'var(--bf-ops-danger)',
                }}
              >
                erro · {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

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
    </div>
  )
}

function Preview({ value, busy }: { value: string | null; busy: boolean }) {
  return (
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: 'var(--bf-surface-subtle)',
        border: '1px solid var(--bf-border)',
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      <AnimatePresence mode="popLayout">
        {value ? (
          <motion.img
            key={value}
            src={value}
            alt=""
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={SPRING}
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
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--bf-text-subtle)',
            }}
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
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(243,235,212,0.7)',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                border: '2px solid var(--bf-border-strong)',
                borderTopColor: 'var(--bf-cn-caffe)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
