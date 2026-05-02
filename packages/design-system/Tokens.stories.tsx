import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta = {
  title: '00 · Design System / Tokens',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta
type Story = StoryObj

const C = {
  black:      '#2a2c2b',
  bg:         '#f2f8ff',
  white:      '#ffffff',
  steel:      '#6d7886',
  aluminium:  '#e2eaf2',
  platinum:   '#a8c9e5',
  crema:      '#f3ebd4',
  caffe:      '#33111a',
  cacao:      '#5e4c41',
  torino:     '#821324',
  como:       '#0d8aff',
  spfc:       '#f0535e',
}

const sans = '"Inter", sans-serif'
const mono = '"JetBrains Mono", monospace'
const hairline = '1px solid rgba(42,44,43,0.1)'

export const ColorTokens: Story = {
  name: 'Color Tokens',
  render: () => (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: sans, padding: '64px 72px' }}>
      <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: C.steel, margin: '0 0 12px', textTransform: 'uppercase' as const }}>
        // packages/design-system
      </p>
      <h1 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.025em', color: C.black, margin: '0 0 8px', fontFamily: sans }}>
        Color Tokens
      </h1>
      <p style={{ fontSize: 14, color: C.steel, margin: '0 0 48px', lineHeight: 1.6 }}>
        CSS custom properties defined in <code style={{ fontFamily: mono, fontSize: 12 }}>tokens.css</code>.
        TypeScript constants in <code style={{ fontFamily: mono, fontSize: 12 }}>tokens.ts</code>.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 1, background: 'rgba(42,44,43,0.1)', borderRadius: 2 }}>
        {[
          { token: '--bf-black',       hex: C.black,    name: 'bf Black',   dark: true  },
          { token: '--bf-bg',          hex: C.bg,       name: 'bf BG',      dark: false },
          { token: '--bf-white',       hex: C.white,    name: 'white',      dark: false },
          { token: '--bf-steel',       hex: C.steel,    name: 'bf Steel',   dark: true  },
          { token: '--bf-aluminium',   hex: C.aluminium,name: 'Aluminium',  dark: false },
          { token: '--bf-platinum',    hex: C.platinum, name: 'Platinum',   dark: false },
          { token: '--bf-crema',       hex: C.crema,    name: 'crema',      dark: false },
          { token: '--bf-caffe',       hex: C.caffe,    name: 'caffè',      dark: true  },
          { token: '--bf-cacao',       hex: C.cacao,    name: 'cacao',      dark: true  },
          { token: '--bf-torino',      hex: C.torino,   name: 'torino',     dark: true  },
          { token: '--bf-como',        hex: C.como,     name: 'como',       dark: true  },
          { token: '--bf-spfc',        hex: C.spfc,     name: 'bf SPFC',    dark: true  },
        ].map(({ token, hex, name, dark }) => (
          <div key={token} style={{ background: hex, padding: '20px 16px 16px', minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.08em', color: dark ? 'rgba(242,248,255,0.45)' : 'rgba(42,44,43,0.45)', margin: 0, lineHeight: 1.5 }}>
              {token}
            </p>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: dark ? C.bg : C.black, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{name}</p>
              <p style={{ fontFamily: mono, fontSize: 11, color: dark ? 'rgba(242,248,255,0.6)' : C.steel, margin: 0 }}>{hex}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48 }}>
        <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.12em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' as const }}>// spacing scale</p>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
          {[
            ['--sp-1', 4],  ['--sp-2', 8],  ['--sp-3', 12], ['--sp-4', 16],
            ['--sp-5', 24], ['--sp-6', 32], ['--sp-7', 48], ['--sp-8', 64], ['--sp-9', 96],
          ].map(([token, px]) => (
            <div key={token as string} style={{ display: 'grid', gridTemplateColumns: '100px 60px 1fr', alignItems: 'center', padding: '10px 0', borderBottom: hairline, gap: 16 }}>
              <code style={{ fontFamily: mono, fontSize: 11, color: C.black }}>{token}</code>
              <span style={{ fontSize: 13, color: C.steel }}>{px}px</span>
              <div style={{ width: px as number, height: 5, background: C.black, borderRadius: 1 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

export const TypographyTokens: Story = {
  name: 'Typography Tokens',
  render: () => (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: sans, padding: '64px 72px' }}>
      <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: C.steel, margin: '0 0 12px', textTransform: 'uppercase' as const }}>
        // packages/design-system
      </p>
      <h1 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.025em', color: C.black, margin: '0 0 48px', fontFamily: sans }}>
        Typography Tokens
      </h1>

      {[
        { label: 'display-xl', size: 96, fw: 700, ls: '-0.03em' },
        { label: 'display-l',  size: 72, fw: 700, ls: '-0.025em' },
        { label: 'h1',         size: 44, fw: 700, ls: '-0.02em' },
        { label: 'h2',         size: 32, fw: 700, ls: '-0.015em' },
        { label: 'h3',         size: 24, fw: 600, ls: '-0.01em' },
        { label: 'body-l',     size: 18, fw: 400, ls: '0' },
        { label: 'body',       size: 16, fw: 400, ls: '0' },
        { label: 'caption',    size: 12, fw: 400, ls: '0' },
      ].map(({ label, size, fw, ls }) => (
        <div key={label} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 200px', alignItems: 'center', borderBottom: hairline, padding: '10px 0', gap: 24 }}>
          <span style={{ fontFamily: mono, fontSize: 10, color: C.steel }}>{label}</span>
          <span style={{ fontSize: size, fontWeight: fw, letterSpacing: ls, color: C.black, fontFamily: sans, lineHeight: 1.1 }}>Aa</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: C.steel }}>{size}px · {fw} · {ls || '0'}</span>
        </div>
      ))}
    </div>
  ),
}
