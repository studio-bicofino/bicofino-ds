'use client'

import { useRef, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { useLang } from '@/content'
import type { Lang as ContentLang } from '@/content'

const C = {
  bg: 'var(--bf-bg-page)',
  surface: 'var(--bf-surface)',
  text: 'var(--bf-text-primary)',
  muted: 'var(--bf-text-secondary)',
  border: 'var(--bf-border)',
  accent: 'var(--bf-accent)',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'

const LANG_MAP: Record<ContentLang, string> = {
  br: 'pt-BR',
  en: 'en',
  it: 'it',
}

type TextPart = { type: 'text'; text: string }

function extractText(parts: unknown[]): string {
  return (parts as TextPart[])
    .filter((p) => p.type === 'text')
    .map((p) => p.text)
    .join('')
}

const transport = new DefaultChatTransport({ api: '/api/consigliere/chat' })

export function ConsigliereWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const pathname = usePathname()
  const { lang } = useLang()
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, error } = useChat({ transport })

  const isStreaming = status === 'streaming' || status === 'submitted'

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || isStreaming) return
    setInput('')
    await sendMessage(
      { text },
      { body: { pageContext: { key: pathname, lang: LANG_MAP[lang] } } },
    )
  }

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Consigliere"
          style={{
            position: 'fixed',
            bottom: 88,
            right: 24,
            width: 380,
            maxHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            background: C.bg,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            zIndex: 9999,
            overflow: 'hidden',
            animation: 'cg-in 200ms ease-out',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: `1px solid ${C.border}`,
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: mono,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: C.muted,
            }}>
              // Consigliere
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar Consigliere"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: C.muted,
                display: 'flex',
                alignItems: 'center',
                padding: 4,
                lineHeight: 1,
              }}
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            minHeight: 0,
          }}>
            {messages.length === 0 && (
              <p style={{
                fontFamily: sans,
                fontSize: 13,
                color: C.muted,
                margin: 0,
                lineHeight: 1.6,
              }}>
                Como posso ajudar com o universo Bicofino?
              </p>
            )}

            {messages.map((m) => {
              const isUser = m.role === 'user'
              const text = Array.isArray(m.parts) && m.parts.length > 0
                ? extractText(m.parts as unknown[])
                : (m as unknown as { content: string }).content ?? ''

              if (!text) return null

              return (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{
                    maxWidth: '85%',
                    padding: '8px 12px',
                    borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: isUser ? C.accent : C.surface,
                    color: isUser ? '#ffffff' : C.text,
                    fontFamily: sans,
                    fontSize: 13,
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {text}
                  </div>
                </div>
              )
            })}

            {isStreaming && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.muted }}>
                <Loader2 size={14} strokeWidth={1.5} style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.08em' }}>···</span>
              </div>
            )}

            {error && (
              <p style={{ fontFamily: sans, fontSize: 12, color: '#c0392b', margin: 0 }}>
                Erro ao conectar. Tente novamente.
              </p>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            style={{
              display: 'flex',
              gap: 8,
              padding: '12px 16px',
              borderTop: `1px solid ${C.border}`,
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre a marca…"
              disabled={isStreaming}
              style={{
                flex: 1,
                fontFamily: sans,
                fontSize: 13,
                color: C.text,
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 6,
                padding: '8px 12px',
                outline: 'none',
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              aria-label="Enviar"
              style={{
                background: C.accent,
                border: 'none',
                borderRadius: 6,
                padding: '0 12px',
                cursor: isStreaming || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: isStreaming || !input.trim() ? 0.4 : 1,
                display: 'flex',
                alignItems: 'center',
                color: '#ffffff',
                transition: 'opacity 150ms ease-out',
                flexShrink: 0,
              }}
            >
              <Send size={16} strokeWidth={1.5} />
            </button>
          </form>
        </div>
      )}

      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Fechar Consigliere' : 'Abrir Consigliere'}
        aria-expanded={open}
        aria-haspopup="dialog"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: C.accent,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          zIndex: 10000,
          boxShadow: '0 2px 16px rgba(0,0,0,0.14)',
          transition: 'transform 150ms ease-out',
        }}
      >
        {open ? <X size={20} strokeWidth={1.5} /> : <MessageCircle size={20} strokeWidth={1.5} />}
      </button>

      <style>{`
        @keyframes cg-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
