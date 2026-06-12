/* Mockup flat de um MacBook aberto — moldura em tokens fechados do DS
   (sem sombra, sem gradiente). A tela recebe o screenshot do produto. */
export function MacbookFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <figure style={{ margin: 0, width: '100%' }}>
      {/* tampa/tela */}
      <div
        style={{
          background: 'var(--bf-black)',
          padding: 'var(--sp-2)',
          borderRadius: 'var(--bf-corner-3) var(--bf-corner-3) 0 0',
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: '16 / 10',
            objectFit: 'cover',
            objectPosition: 'top',
            borderRadius: 'var(--bf-corner-1)',
            background: 'var(--bf-surface-subtle)',
          }}
        />
      </div>
      {/* base/teclado visto de frente */}
      <div
        style={{
          width: 'calc(100% + var(--sp-5))',
          marginLeft: 'calc(var(--sp-5) / -2)',
          height: 'var(--sp-3)',
          background: 'var(--bf-surface-subtle)',
          border: 'var(--bf-hairline)',
          borderRadius: '0 0 var(--bf-corner-3) var(--bf-corner-3)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* rebaixo de abertura da tampa */}
        <span
          aria-hidden
          style={{
            width: 'var(--sp-8)',
            height: 'var(--sp-1)',
            background: 'var(--bf-bg-page)',
            border: 'var(--bf-hairline)',
            borderTop: 'none',
            borderRadius: '0 0 var(--bf-corner-1) var(--bf-corner-1)',
          }}
        />
      </div>
    </figure>
  )
}
