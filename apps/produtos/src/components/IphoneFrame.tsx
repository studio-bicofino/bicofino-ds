/* Mockup flat de um iPhone — moldura em outline (hairline), tokens fechados
   do DS, cantos na linguagem soft via data-corners. Para artes 9:16. */
export function IphoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <figure data-corners="soft" style={{ margin: 0, width: '100%', position: 'relative' }}>
      <div
        style={{
          background: 'var(--bf-bg-page)',
          border: 'var(--bf-hairline)',
          padding: 'var(--sp-2)',
          borderRadius: 'var(--bf-corner-3)',
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: '9 / 16',
            objectFit: 'cover',
            borderRadius: 'var(--bf-corner-2)',
            background: 'var(--bf-surface-subtle)',
          }}
        />
      </div>
      {/* dynamic island */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 'var(--sp-4)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'var(--sp-7)',
          height: 'var(--sp-3)',
          background: 'var(--bf-bg-page)',
          border: 'var(--bf-hairline)',
          borderRadius: 9999,
        }}
      />
    </figure>
  )
}
