'use client'

import { useState } from 'react'
import {
  Home, Search, Menu, X, ChevronRight, ChevronLeft, ChevronUp, ChevronDown,
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Plus, Minus, Edit2, Trash2,
  Copy, Download, Upload, Share2, Link, ExternalLink,
  Check, AlertCircle, AlertTriangle, Info, HelpCircle, Bell,
  Play, Pause, Volume2, Camera, Mic, Settings, Sliders, Filter,
  Grid, List, LayoutGrid,
  Briefcase, Globe, Target, Star, Heart, TrendingUp, BarChart2,
  Code, Terminal, Cpu, Wifi, Lock, Shield, User, Users,
  Mail, Phone, Calendar, Clock, Tag, Bookmark, Zap, Activity,
  Timer, TrendingDown, Layers, Package, Eye, Send,
  type LucideIcon,
} from 'lucide-react'

const C = {
  black:     'var(--bf-text-primary)',
  white:     'var(--bf-surface)',
  steel:     'var(--bf-text-secondary)',
  platinum:  'var(--bf-text-subtle)',
  bg:        'var(--bf-bg-page)',
  aluminium: '#e2eaf2',
}
const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const ease = 'cubic-bezier(0.2,0,0,1)'

const ALL_ICONS: { name: string; Icon: LucideIcon }[] = [
  { name: 'Home', Icon: Home }, { name: 'Search', Icon: Search }, { name: 'Menu', Icon: Menu }, { name: 'X', Icon: X },
  { name: 'ChevronRight', Icon: ChevronRight }, { name: 'ChevronLeft', Icon: ChevronLeft },
  { name: 'ChevronUp', Icon: ChevronUp }, { name: 'ChevronDown', Icon: ChevronDown },
  { name: 'ArrowRight', Icon: ArrowRight }, { name: 'ArrowLeft', Icon: ArrowLeft },
  { name: 'ArrowUp', Icon: ArrowUp }, { name: 'ArrowDown', Icon: ArrowDown },
  { name: 'Plus', Icon: Plus }, { name: 'Minus', Icon: Minus },
  { name: 'Edit2', Icon: Edit2 }, { name: 'Trash2', Icon: Trash2 },
  { name: 'Copy', Icon: Copy }, { name: 'Download', Icon: Download },
  { name: 'Upload', Icon: Upload }, { name: 'Share2', Icon: Share2 },
  { name: 'Link', Icon: Link }, { name: 'ExternalLink', Icon: ExternalLink },
  { name: 'Check', Icon: Check }, { name: 'AlertCircle', Icon: AlertCircle },
  { name: 'AlertTriangle', Icon: AlertTriangle }, { name: 'Info', Icon: Info },
  { name: 'HelpCircle', Icon: HelpCircle }, { name: 'Bell', Icon: Bell },
  { name: 'Play', Icon: Play }, { name: 'Pause', Icon: Pause },
  { name: 'Volume2', Icon: Volume2 }, { name: 'Camera', Icon: Camera }, { name: 'Mic', Icon: Mic },
  { name: 'Settings', Icon: Settings }, { name: 'Sliders', Icon: Sliders },
  { name: 'Filter', Icon: Filter }, { name: 'Grid', Icon: Grid },
  { name: 'List', Icon: List }, { name: 'LayoutGrid', Icon: LayoutGrid },
  { name: 'Briefcase', Icon: Briefcase }, { name: 'Globe', Icon: Globe },
  { name: 'Target', Icon: Target }, { name: 'Star', Icon: Star },
  { name: 'Heart', Icon: Heart }, { name: 'TrendingUp', Icon: TrendingUp },
  { name: 'TrendingDown', Icon: TrendingDown }, { name: 'BarChart2', Icon: BarChart2 },
  { name: 'Code', Icon: Code }, { name: 'Terminal', Icon: Terminal },
  { name: 'Cpu', Icon: Cpu }, { name: 'Wifi', Icon: Wifi },
  { name: 'Lock', Icon: Lock }, { name: 'Shield', Icon: Shield },
  { name: 'User', Icon: User }, { name: 'Users', Icon: Users },
  { name: 'Mail', Icon: Mail }, { name: 'Phone', Icon: Phone },
  { name: 'Calendar', Icon: Calendar }, { name: 'Clock', Icon: Clock },
  { name: 'Tag', Icon: Tag }, { name: 'Bookmark', Icon: Bookmark },
  { name: 'Zap', Icon: Zap }, { name: 'Activity', Icon: Activity },
  { name: 'Timer', Icon: Timer }, { name: 'Layers', Icon: Layers },
  { name: 'Package', Icon: Package }, { name: 'Eye', Icon: Eye },
  { name: 'Send', Icon: Send },
]

export function IconGrid() {
  const [query, setQuery]     = useState('')
  const [copied, setCopied]   = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const filtered = query.trim()
    ? ALL_ICONS.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
    : ALL_ICONS

  function handleCopy(name: string) {
    navigator.clipboard.writeText(`<${name} size={20} strokeWidth={1.5} />`).then(() => {
      setCopied(name)
      setTimeout(() => setCopied(null), 1800)
    })
  }

  return (
    <div>
      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <Search
          size={14}
          strokeWidth={1.5}
          style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: C.steel, pointerEvents: 'none' }}
        />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search icons…"
          style={{
            width: '100%',
            padding: '9px 12px 9px 34px',
            fontFamily: mono,
            fontSize: 11,
            color: C.black,
            background: C.white,
            border: '1px solid rgba(42,44,43,0.14)',
            borderRadius: 4,
            outline: 'none',
            letterSpacing: '0.02em',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', color: C.steel, padding: 2,
            }}
          >
            <X size={12} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Count */}
      <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, letterSpacing: '0.1em', margin: '0 0 16px' }}>
        {filtered.length} / {ALL_ICONS.length} ICONS · lucide-react · stroke 1.5 · size 20
      </p>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))', gap: 1, background: 'rgba(42,44,43,0.07)' }}>
        {filtered.map(({ name, Icon }) => {
          const isHov = hovered === name
          const isDone = copied === name
          return (
            <button
              key={name}
              onMouseEnter={() => setHovered(name)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleCopy(name)}
              title={`Copy <${name} size={20} strokeWidth={1.5} />`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                padding: '20px 8px 16px',
                background: isDone ? 'rgba(47,210,152,0.06)' : isHov ? C.aluminium : C.white,
                border: 'none',
                cursor: 'pointer',
                transition: `background 140ms ${ease}`,
              }}
            >
              <div style={{
                color: isDone ? '#2fd298' : isHov ? C.black : C.steel,
                transition: `color 140ms ${ease}`,
              }}>
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <span style={{
                fontFamily: mono,
                fontSize: 8,
                letterSpacing: '0.03em',
                color: isDone ? '#2fd298' : isHov ? C.black : C.platinum,
                wordBreak: 'break-all' as const,
                textAlign: 'center' as const,
                lineHeight: 1.4,
                transition: `color 140ms ${ease}`,
              }}>
                {isDone ? 'copied' : name}
              </span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ fontFamily: mono, fontSize: 11, color: C.steel, padding: '32px 0', textAlign: 'center' as const, letterSpacing: '0.06em' }}>
          no icons match "{query}"
        </p>
      )}
    </div>
  )
}
