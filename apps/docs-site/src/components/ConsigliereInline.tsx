'use client'

import { useState, useRef } from 'react'
import { BicofinoDiamond } from '@/components/BicofinoDiamond'

const C = {
  text:        'var(--bf-text-primary)',
  muted:       'var(--bf-text-secondary)',
  border:      'var(--bf-border)',
  borderStrong:'var(--bf-border-strong)',
  surface:     'var(--bf-surface)',
}
const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'

const SUGGESTIONS = [
  'TEXTO DE SUGESTÃO 1',
  'TEXTO DE SUGESTÃO 2',
  'TEXTO DE SUGESTÃO 3',
]

type State = 'idle' | 'thinking'

export function ConsigliereInline() {
  const [uiState, setUiState]           = useState<State>('idle')
  const [inputValue, setInputValue]     = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const submit = (text?: string) => {
    if (uiState === 'thinking') return
    const q = (text ?? inputValue).trim() || 'Consigliere, me explique o que é o Bicofino'
    setSubmittedQuery(q)
    setUiState('thinking')
    timerRef.current = setTimeout(() => {
      setUiState('idle')
      setInputValue('')
      setSubmittedQuery('')
    }, 5000)
  }

  return (
    <div style={{ marginTop: 40, maxWidth: 700 }}>
      {/* Main box */}
      <div className="cg-box" style={{
        border:        `1px solid ${C.borderStrong}`,
        borderRadius:  20,
        background:    C.surface,
        padding:       '16px 20px 14px',
        display:       'flex',
        flexDirection: 'column',
        minHeight:     98,
      }}>
        {/* Query area */}
        <div style={{ flex: 1 }}>
          {uiState === 'thinking' ? (
            <p className="cg-pulse" style={{
              fontFamily: sans,
              fontSize:   16,
              color:      C.text,
              margin:     0,
              lineHeight: 1.5,
            }}>
              {submittedQuery}
            </p>
          ) : (
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() }
              }}
              placeholder="Consigliere, me explique o que é o Bicofino..."
              rows={2}
              className="cg-textarea"
              style={{
                width:      '100%',
                fontFamily: sans,
                fontSize:   16,
                color:      C.text,
                background: 'transparent',
                border:     'none',
                outline:    'none',
                resize:     'none',
                lineHeight: 1.5,
                padding:    0,
              }}
            />
          )}
        </div>

        {/* Bottom row */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          marginTop:      10,
        }}>
          <span style={{
            fontFamily:  sans,
            fontSize:    14,
            color:       C.text,
            visibility:  uiState === 'thinking' ? 'visible' : 'hidden',
          }}>
            Respondendo...
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontFamily:    mono,
              fontSize:      11,
              letterSpacing: '0.12em',
              color:         C.muted,
              textTransform: 'uppercase',
            }}>
              {uiState === 'thinking' ? 'Pensando' : 'Clicar >'}
            </span>

            <button
              onClick={() => submit()}
              disabled={uiState === 'thinking'}
              aria-label={uiState === 'thinking' ? 'Pensando...' : 'Enviar'}
              className={`cg-btn${uiState === 'thinking' ? ' cg-btn--thinking' : ''}`}
              style={{
                width:      48,
                height:     48,
                borderRadius: 12,
                border:     'none',
                cursor:     uiState === 'thinking' ? 'default' : 'pointer',
                display:    'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 200ms ease-out',
              }}
            >
              <span className={uiState === 'thinking' ? 'cg-spin' : 'cg-icon'}>
                <BicofinoDiamond color="#ffffff" size={20} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Suggestion chips */}
      <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => { setInputValue(s); submit(s) }}
            className="cg-chip"
            style={{
              fontFamily:    mono,
              fontSize:      10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         C.muted,
              border:        `1px solid ${C.border}`,
              borderRadius:  8,
              background:    'transparent',
              padding:       '8px 14px',
              cursor:        'pointer',
              transition:    'border-color 150ms ease-out, color 150ms ease-out',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <style>{`
        /* textarea placeholder */
        .cg-textarea::placeholder { color: var(--bf-text-secondary); }

        /* button base: always dark (--bf-black = #2a2c2b, never inverts) */
        .cg-btn:not(.cg-btn--thinking) { background: var(--bf-black); }
        .cg-btn--thinking              { background: var(--current-accent); }

        /* hover: button turns accent, diamond pulses */
        .cg-btn:not(.cg-btn--thinking):hover {
          background: var(--current-accent) !important;
        }
        .cg-btn:not(.cg-btn--thinking):hover .cg-icon {
          animation: cg-diamond-pulse 0.75s ease-in-out infinite;
        }

        /* dark mode: box outline only (no fill) */
        [data-theme="dark"] .cg-box {
          background: transparent;
        }

        /* chip hover */
        .cg-chip:hover {
          border-color: var(--bf-border-strong) !important;
          color: var(--bf-text-primary) !important;
        }

        /* thinking: submitted text pulses */
        .cg-pulse { animation: cg-text-pulse 1.8s ease-in-out infinite; }

        /* thinking: diamond spins */
        .cg-spin  { display: flex; animation: cg-diamond-spin 1.6s linear infinite; }
        .cg-icon  { display: flex; }

        @keyframes cg-diamond-pulse {
          0%, 100% { transform: scale(1);    opacity: 1;    }
          50%       { transform: scale(1.18); opacity: 0.8; }
        }
        @keyframes cg-text-pulse {
          0%, 100% { opacity: 1;   }
          50%       { opacity: 0.3; }
        }
        @keyframes cg-diamond-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
