'use client'

export function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute', top: -9999, left: -9999,
        zIndex: 9999, padding: '8px 16px',
        background: '#2a2c2b', color: '#f2f8ff',
        fontFamily: 'Inter, sans-serif', fontSize: 14,
        borderRadius: '0 0 4px 0', textDecoration: 'none',
      }}
      onFocus={e => { e.currentTarget.style.top = '0'; e.currentTarget.style.left = '0' }}
      onBlur={e => { e.currentTarget.style.top = '-9999px'; e.currentTarget.style.left = '-9999px' }}
    >
      Pular para o conteúdo
    </a>
  )
}
