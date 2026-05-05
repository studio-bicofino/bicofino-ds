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
const ease = 'cubic-bezier(0.2,0,0,1)'

// ─── Types ────────────────────────────────────────────────────────────────────

type LucideEntry = { kind: 'lucide'; name: string; Icon: LucideIcon }
type CustomEntry = { kind: 'custom'; name: string; file: string; paths: string[] }
type IconEntry   = LucideEntry | CustomEntry

// ─── Custom SVG wrapper ───────────────────────────────────────────────────────
// Normalises fill-based 20×20 SVGs to respond to currentColor (matching Lucide visual weight)

function CustomSvgIcon({ paths }: { paths: string[] }) {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  )
}

// ─── Lucide icons ─────────────────────────────────────────────────────────────

const LUCIDE_ICONS: LucideEntry[] = [
  { kind: 'lucide', name: 'Home', Icon: Home },
  { kind: 'lucide', name: 'Search', Icon: Search },
  { kind: 'lucide', name: 'Menu', Icon: Menu },
  { kind: 'lucide', name: 'X', Icon: X },
  { kind: 'lucide', name: 'ChevronRight', Icon: ChevronRight },
  { kind: 'lucide', name: 'ChevronLeft', Icon: ChevronLeft },
  { kind: 'lucide', name: 'ChevronUp', Icon: ChevronUp },
  { kind: 'lucide', name: 'ChevronDown', Icon: ChevronDown },
  { kind: 'lucide', name: 'ArrowRight', Icon: ArrowRight },
  { kind: 'lucide', name: 'ArrowLeft', Icon: ArrowLeft },
  { kind: 'lucide', name: 'ArrowUp', Icon: ArrowUp },
  { kind: 'lucide', name: 'ArrowDown', Icon: ArrowDown },
  { kind: 'lucide', name: 'Plus', Icon: Plus },
  { kind: 'lucide', name: 'Minus', Icon: Minus },
  { kind: 'lucide', name: 'Edit2', Icon: Edit2 },
  { kind: 'lucide', name: 'Trash2', Icon: Trash2 },
  { kind: 'lucide', name: 'Copy', Icon: Copy },
  { kind: 'lucide', name: 'Download', Icon: Download },
  { kind: 'lucide', name: 'Upload', Icon: Upload },
  { kind: 'lucide', name: 'Share2', Icon: Share2 },
  { kind: 'lucide', name: 'Link', Icon: Link },
  { kind: 'lucide', name: 'ExternalLink', Icon: ExternalLink },
  { kind: 'lucide', name: 'Check', Icon: Check },
  { kind: 'lucide', name: 'AlertCircle', Icon: AlertCircle },
  { kind: 'lucide', name: 'AlertTriangle', Icon: AlertTriangle },
  { kind: 'lucide', name: 'Info', Icon: Info },
  { kind: 'lucide', name: 'HelpCircle', Icon: HelpCircle },
  { kind: 'lucide', name: 'Bell', Icon: Bell },
  { kind: 'lucide', name: 'Play', Icon: Play },
  { kind: 'lucide', name: 'Pause', Icon: Pause },
  { kind: 'lucide', name: 'Volume2', Icon: Volume2 },
  { kind: 'lucide', name: 'Camera', Icon: Camera },
  { kind: 'lucide', name: 'Mic', Icon: Mic },
  { kind: 'lucide', name: 'Settings', Icon: Settings },
  { kind: 'lucide', name: 'Sliders', Icon: Sliders },
  { kind: 'lucide', name: 'Filter', Icon: Filter },
  { kind: 'lucide', name: 'Grid', Icon: Grid },
  { kind: 'lucide', name: 'List', Icon: List },
  { kind: 'lucide', name: 'LayoutGrid', Icon: LayoutGrid },
  { kind: 'lucide', name: 'Briefcase', Icon: Briefcase },
  { kind: 'lucide', name: 'Globe', Icon: Globe },
  { kind: 'lucide', name: 'Target', Icon: Target },
  { kind: 'lucide', name: 'Star', Icon: Star },
  { kind: 'lucide', name: 'Heart', Icon: Heart },
  { kind: 'lucide', name: 'TrendingUp', Icon: TrendingUp },
  { kind: 'lucide', name: 'TrendingDown', Icon: TrendingDown },
  { kind: 'lucide', name: 'BarChart2', Icon: BarChart2 },
  { kind: 'lucide', name: 'Code', Icon: Code },
  { kind: 'lucide', name: 'Terminal', Icon: Terminal },
  { kind: 'lucide', name: 'Cpu', Icon: Cpu },
  { kind: 'lucide', name: 'Wifi', Icon: Wifi },
  { kind: 'lucide', name: 'Lock', Icon: Lock },
  { kind: 'lucide', name: 'Shield', Icon: Shield },
  { kind: 'lucide', name: 'User', Icon: User },
  { kind: 'lucide', name: 'Users', Icon: Users },
  { kind: 'lucide', name: 'Mail', Icon: Mail },
  { kind: 'lucide', name: 'Phone', Icon: Phone },
  { kind: 'lucide', name: 'Calendar', Icon: Calendar },
  { kind: 'lucide', name: 'Clock', Icon: Clock },
  { kind: 'lucide', name: 'Tag', Icon: Tag },
  { kind: 'lucide', name: 'Bookmark', Icon: Bookmark },
  { kind: 'lucide', name: 'Zap', Icon: Zap },
  { kind: 'lucide', name: 'Activity', Icon: Activity },
  { kind: 'lucide', name: 'Timer', Icon: Timer },
  { kind: 'lucide', name: 'Layers', Icon: Layers },
  { kind: 'lucide', name: 'Package', Icon: Package },
  { kind: 'lucide', name: 'Eye', Icon: Eye },
  { kind: 'lucide', name: 'Send', Icon: Send },
]

// ─── Custom on-field icons ────────────────────────────────────────────────────
// Source: public/assets/on-field/icons/ — 20×20 viewBox, fill normalised to currentColor

const CUSTOM_ICONS: CustomEntry[] = [
  {
    kind: 'custom', name: 'Body', file: 'icon-body.svg',
    paths: [
      'M10,5.62c-.8,0-1.46-.65-1.46-1.46s.65-1.46,1.46-1.46,1.46.65,1.46,1.46-.65,1.46-1.46,1.46ZM10,3.96c-.11,0-.21.09-.21.21,0,.23.42.23.42,0,0-.11-.09-.21-.21-.21Z',
      'M12.5,17.29c-.23,0-.45-.13-.56-.35l-1.94-3.88-1.94,3.88c-.15.31-.53.43-.84.28-.31-.15-.43-.53-.28-.84l2.5-5c.21-.42.91-.42,1.12,0l2.5,5c.15.31.03.68-.28.84-.09.04-.19.07-.28.07Z',
      'M10,8.96c-.07,0-.13-.01-.2-.03l-5-1.67c-.33-.11-.5-.46-.4-.79.11-.33.46-.51.79-.4l4.8,1.6,4.8-1.6c.33-.11.68.07.79.4.11.33-.07.68-.4.79l-5,1.67c-.06.02-.13.03-.2.03Z',
      'M10,12.29c-.35,0-.62-.28-.62-.62v-3.33c0-.34.28-.62.62-.62s.62.28.62.62v3.33c0,.34-.28.62-.62.62Z',
    ],
  },
  {
    kind: 'custom', name: 'Dumbbell', file: 'icon-dumbbell.svg',
    paths: [
      'M18.35,4.01l-.74-.74.75-.75c.24-.24.24-.64,0-.88-.24-.24-.64-.24-.88,0l-.75.75-.74-.74c-.43-.43-1.01-.67-1.62-.67h0c-.61,0-1.19.24-1.62.67-.26.26-.45.57-.56.91l-.03-.03c-.89-.89-2.35-.89-3.24,0s-.89,2.35,0,3.24l2.21,2.21-3.14,3.14-2.21-2.21c-.89-.89-2.35-.89-3.24,0s-.89,2.35,0,3.24l.03.03c-.34.11-.65.3-.91.56-.89.89-.89,2.35,0,3.24l.74.74-.75.75c-.24.24-.24.64,0,.88.12.12.28.18.44.18s.32-.06.44-.18l.75-.75.74.74c.43.43,1.01.67,1.62.67h0c.61,0,1.19-.24,1.62-.67.27-.27.45-.58.56-.91l.03.03c.87.87,2.38.87,3.24,0,.89-.89.89-2.35,0-3.24l-2.21-2.21,3.14-3.14,2.21,2.21c.43.43,1.01.67,1.62.67s1.19-.24,1.62-.67c.89-.89.89-2.35,0-3.24l-.03-.03c.33-.11.65-.29.91-.56.89-.89.89-2.35,0-3.24ZM10.5,15.84c0,.28-.11.54-.31.74-.39.39-1.08.39-1.47,0l-1.47-1.47c-.24-.24-.64-.24-.88,0s-.24.64,0,.88h0c.4.41.4,1.07,0,1.47-.2.2-.46.31-.74.31s-.54-.11-.74-.31l-2.36-2.36c-.41-.41-.41-1.07,0-1.47.2-.2.46-.31.74-.31s.54.11.73.3h0c.24.25.64.25.88,0s.24-.64,0-.88h0s-1.47-1.47-1.47-1.47c-.41-.41-.41-1.07,0-1.47s1.07-.41,1.47,0l5.3,5.3c.2.2.31.46.31.74ZM17.46,6.37c-.41.41-1.06.41-1.47,0h0c-.24-.25-.64-.25-.88,0s-.24.64,0,.88c0,0,0,0,0,0l1.47,1.47c.2.2.31.46.31.74s-.11.54-.31.74c-.39.39-1.08.39-1.47,0l-5.3-5.3c-.41-.41-.41-1.07,0-1.47.2-.2.47-.3.74-.3s.53.1.74.3l1.47,1.47c.24.24.64.24.88,0,.24-.24.24-.64,0-.88-.2-.2-.3-.46-.3-.74s.11-.54.31-.74c.2-.2.46-.3.74-.3h0c.28,0,.54.11.74.3l2.36,2.36c.41.41.41,1.07,0,1.47Z',
    ],
  },
  {
    kind: 'custom', name: 'Fingerprint', file: 'icon-fingerprint.svg',
    paths: [
      'M8.15,13.96s-.04,0-.07,0c-.34-.04-.59-.34-.55-.69.13-1.24.21-2.46.21-3.27,0-1.26,1.03-2.29,2.29-2.29.35,0,.62.28.62.62s-.28.62-.62.62c-.57,0-1.04.47-1.04,1.04,0,.86-.08,2.1-.22,3.4-.03.32-.31.56-.62.56Z',
      'M10.86,18.96c-.08,0-.16-.01-.23-.04-.32-.13-.48-.49-.35-.81.79-1.97.79-5.22.79-7.17,0-.35.28-.62.62-.62s.62.28.62.62c0,2.03,0,5.44-.88,7.63-.1.24-.33.39-.58.39Z',
      'M14.44,18.14s-.08,0-.12-.01c-.34-.07-.56-.4-.49-.74.11-.57.36-1.92.41-2.45.03-.34.34-.59.68-.56.34.03.6.34.56.68-.06.66-.34,2.14-.43,2.58-.06.3-.32.5-.61.5Z',
      'M1.7,10.62c-.35,0-.62-.28-.62-.62C1.07,5.06,5.09,1.04,10.03,1.04c2.8,0,5.48,1.34,7.17,3.58.21.28.15.67-.12.88-.28.21-.67.15-.88-.12-1.45-1.93-3.75-3.08-6.17-3.08-4.25,0-7.71,3.46-7.71,7.71,0,.35-.28.62-.62.62Z',
      'M1.71,13.96c-.35,0-.63-.28-.63-.62s.28-.62.62-.62h0c.35,0,.62.28.62.62s-.28.62-.62.62Z',
      'M18.2,13.96s-.04,0-.06,0c-.34-.03-.59-.34-.56-.68.17-1.67.1-4.39,0-4.81-.07-.34.15-.67.49-.74.34-.07.67.15.74.49.13.62.18,3.48,0,5.19-.03.32-.3.56-.62.56Z',
      'M4.2,16.88c-.07,0-.13-.01-.2-.03-.33-.11-.5-.46-.4-.79.4-1.2.8-3.66.8-6.05,0-.64.11-1.27.32-1.87.11-.33.47-.5.8-.38.33.11.5.47.38.8-.17.47-.25.96-.25,1.46,0,2.65-.45,5.2-.87,6.45-.09.26-.33.43-.59.43Z',
      'M7.24,18.96c-.06,0-.13,0-.19-.03-.33-.1-.51-.46-.41-.79l.1-.31c.14-.44.28-.85.35-1.27.06-.34.38-.57.72-.51.34.06.57.38.51.72-.09.5-.24.98-.4,1.44l-.1.31c-.08.27-.33.44-.6.44Z',
      'M15.03,12.29c-.35,0-.62-.28-.62-.62v-1.67c0-.77-.2-1.53-.59-2.19-.58-1.01-1.53-1.74-2.66-2.04-1.13-.3-2.31-.15-3.32.44-.3.17-.68.07-.85-.23s-.07-.68.23-.85c1.3-.75,2.82-.95,4.27-.56,1.45.39,2.66,1.32,3.42,2.62.49.85.75,1.83.75,2.82v1.67c0,.35-.28.62-.62.62Z',
    ],
  },
  {
    kind: 'custom', name: 'Fist', file: 'icon-fist.svg',
    paths: [
      'M15.83,3.54c-.39,0-.75.11-1.08.28-.17-1.1-1.11-1.95-2.26-1.95-.49,0-.93.15-1.31.41-.38-.74-1.14-1.25-2.03-1.25s-1.65.51-2.03,1.25c-.37-.26-.82-.41-1.31-.41-1.26,0-2.29,1.03-2.29,2.29v3.91l-.31.31c-.88.88-1.36,2.04-1.36,3.29,0,4.02,3.27,7.29,7.29,7.29h1.67c4.02,0,7.29-3.27,7.29-7.29v-5.83c0-1.26-1.03-2.29-2.29-2.29ZM12.5,3.13c.57,0,1.04.47,1.04,1.04v2.5c0,.21-.06.41-.18.58-.15.23-.39.39-.66.44-.14.03-.29.02-.43,0,0-.06.02-.12.02-.18,0-.71-.33-1.33-.83-1.75v-1.58c0-.57.47-1.04,1.04-1.04ZM8.12,3.33c0-.57.47-1.04,1.04-1.04s1.04.47,1.04,1.04v1.9c-.07,0-.14-.02-.21-.02h-1.88v-1.88ZM4.79,4.17c0-.57.47-1.04,1.04-1.04s1.04.47,1.04,1.04v1.17c-.52.14-.99.4-1.38.79l-.7.7v-2.66ZM16.88,11.67c0,3.33-2.71,6.04-6.04,6.04h-1.67c-3.33,0-6.04-2.71-6.04-6.04,0-.91.35-1.76,1-2.4l.49-.49h0s1.77-1.77,1.77-1.77c.35-.35.83-.55,1.33-.55h2.3c.57,0,1.04.47,1.04,1.04s-.47,1.04-1.04,1.04h-.98c-.61,0-1.19.24-1.62.67l-1,1c-.23.23-.36.53-.36.86,0,.33.12.64.35.87.23.23.54.36.86.36h.26c1.03,0,1.88.84,1.88,1.88,0,.34.28.62.62.62s.62-.28.62-.62c0-1.72-1.4-3.12-3.12-3.12l-.24.04,1-1c.2-.2.46-.31.74-.31h.98c.75,0,1.42-.37,1.84-.93.22.07.44.1.66.1.46,0,.92-.16,1.3-.42.38.74,1.14,1.26,2.03,1.26.38,0,.73-.09,1.04-.25v2.13ZM16.88,7.5c0,.57-.47,1.04-1.04,1.04s-1.04-.47-1.04-1.04v-1.67c0-.57.47-1.04,1.04-1.04s1.04.47,1.04,1.04v1.67Z',
    ],
  },
  {
    kind: 'custom', name: 'Football', file: 'icon-footbal.svg',
    paths: [
      'M10,.92s-.04,0-.07,0c0,0-.01,0-.02,0-.01,0-.02,0-.03,0C4.93.98.92,5.03.92,10c0,2.93,1.4,5.53,3.56,7.19,0,0,.01.02.02.03.03.03.06.04.1.06,1.51,1.12,3.38,1.8,5.4,1.8,5.01,0,9.08-4.08,9.08-9.08S15.01.92,10,.92ZM16.86,6.79c-.91.26-1.95.69-2.57.96-.56-.55-1.87-1.77-3.62-2.64v-2.66c2.75.24,5.07,1.95,6.19,4.34ZM7.75,12.82c-.95-1.3-1.18-3.09-1.23-3.86.02-.05.02-.09.03-.14,1.19-1.25,2.73-2.09,3.37-2.41,1.67.8,2.93,2.02,3.4,2.49-.08,1.99-.92,3.42-1.26,3.92-1.84.36-3.66.11-4.31,0ZM9.17,2.46v2.65c-.76.38-2.34,1.27-3.63,2.6-.61-.27-1.56-.67-2.38-.95,1.1-2.32,3.35-4,6.01-4.29ZM2.42,10c0-.63.09-1.24.23-1.83.75.25,1.72.66,2.38.95.07.93.35,2.87,1.41,4.43-.36.51-1,1.39-1.53,2.05-1.53-1.39-2.49-3.38-2.49-5.6ZM6.11,16.5c.58-.74,1.26-1.68,1.61-2.17.51.08,1.32.18,2.29.18.65,0,1.37-.07,2.1-.19.35.49,1.07,1.47,1.7,2.23-1.12.65-2.42,1.04-3.81,1.04s-2.75-.4-3.89-1.09ZM15.02,15.67c-.56-.66-1.25-1.6-1.63-2.13.46-.71,1.27-2.27,1.41-4.37.67-.3,1.75-.74,2.56-.96.14.58.22,1.18.22,1.79,0,2.25-.99,4.27-2.56,5.67Z',
    ],
  },
  {
    kind: 'custom', name: 'Medal1', file: 'icon-medal-1.svg',
    paths: [
      'M18.17,3.74l-1.33-1.78c-.2-.27-.46-.48-.75-.63-.01,0-.02-.02-.03-.03,0,0-.02,0-.03,0-.32-.16-.67-.25-1.03-.25H5c-.36,0-.71.09-1.03.25,0,0-.02,0-.03,0-.01,0-.02.02-.03.03-.29.16-.55.37-.75.63l-1.34,1.78c-.55.74-.61,1.72-.15,2.52l3.77,6.5c-.14.45-.23.91-.23,1.4,0,2.64,2.15,4.79,4.79,4.79s4.79-2.15,4.79-4.79c0-.49-.1-.95-.23-1.4l3.77-6.51c.46-.8.39-1.79-.16-2.52ZM10,9.38c-.15,0-.3.03-.45.05l-1.78-2.96h4.46l-1.78,2.96c-.15-.01-.3-.05-.45-.05ZM12.98,5.21h-5.96l-1.75-2.92h9.46l-1.75,2.92ZM2.76,5.64c-.21-.36-.18-.81.07-1.15l1.28-1.71,4.16,6.93c-.88.34-1.63.93-2.17,1.69l-3.34-5.77ZM10,17.71c-1.95,0-3.54-1.59-3.54-3.54s1.59-3.54,3.54-3.54,3.54,1.59,3.54,3.54-1.59,3.54-3.54,3.54ZM17.24,5.64l-3.34,5.77c-.54-.76-1.29-1.35-2.17-1.69l4.16-6.93,1.28,1.71c.25.33.28.78.07,1.14Z',
      'M10,12.71h-.42c-.35,0-.62.28-.62.62,0,.27.17.5.42.59v1.08c0,.35.28.62.62.62s.62-.28.62-.62v-1.67c0-.34-.28-.62-.62-.62Z',
    ],
  },
  {
    kind: 'custom', name: 'Medal', file: 'icon-medal.svg',
    paths: [
      'M15.62,6.67c0-3.1-2.52-5.62-5.62-5.62s-5.62,2.52-5.62,5.62c0,1.74.8,3.3,2.05,4.34l-1.2,6.74c-.05.3.03.6.22.83.18.22.43.35.7.38.28.03.55-.05.74-.21l2.99-2.24c.07-.05.17-.06.25,0l2.96,2.22c.19.15.42.24.66.24.06,0,.12,0,.17-.01.57-.1.95-.63.85-1.21l-1.2-6.73c1.25-1.03,2.05-2.59,2.05-4.34ZM5.62,6.67c0-2.41,1.96-4.38,4.38-4.38s4.38,1.96,4.38,4.38-1.96,4.38-4.38,4.38-4.38-1.96-4.38-4.38ZM13.45,17.43l-2.58-1.93c-.51-.38-1.23-.38-1.75,0l-2.58,1.93,1.01-5.7c.74.36,1.56.56,2.44.56s1.7-.21,2.44-.56l1.01,5.7Z',
    ],
  },
  {
    kind: 'custom', name: 'Pitch', file: 'icon-pitch.svg',
    paths: [
      'M17.5,3.54H2.5c-.84,0-1.46.61-1.46,1.46v10c0,.84.61,1.46,1.46,1.46h15c.85,0,1.46-.61,1.46-1.46V5c0-.84-.61-1.46-1.46-1.46ZM17.71,11.88h-2.08v-3.75h2.08v3.75ZM10,11.04c-.57,0-1.04-.47-1.04-1.04s.47-1.04,1.04-1.04,1.04.47,1.04,1.04-.47,1.04-1.04,1.04ZM2.29,8.12h2.08v3.75h-2.08v-3.75ZM2.29,15v-1.88h2.71c.35,0,.62-.28.62-.62v-5c0-.35-.28-.62-.62-.62h-2.71v-1.88c0-.16.05-.21.21-.21h6.88v3.01c-.96.27-1.67,1.15-1.67,2.19s.71,1.92,1.67,2.19v3.01H2.5c-.16,0-.21-.05-.21-.21ZM17.5,15.21h-6.88v-3.01c.96-.27,1.67-1.15,1.67-2.19s-.71-1.92-1.67-2.19v-3.01h6.88c.16,0,.21.05.21.21v1.88h-2.71c-.35,0-.62.28-.62.62v5c0,.35.28.62.62.62h2.71v1.88c0,.16-.05.21-.21.21Z',
    ],
  },
  {
    kind: 'custom', name: 'Sneaker', file: 'icon-sneaker.svg',
    paths: [
      'M16.69,8.64c-.41,0-1-.08-1.48-.48l-5.14-3.48c-.53-.4-1.23-.37-1.83.08-.05.04-.09.08-.12.12-.16.21-.51.6-.78.73-.04.02-.07.04-.11.07-.79.63-1.93.65-2.72.09-.31-.24-.72-.65-.88-.8-.16-.28-.41-.49-.72-.61-.35-.13-.73-.11-1.06.04-.61.28-.93.98-.76,1.62v7.41c0,1.26,1.03,2.29,2.29,2.29h10.83c2.69,0,4.79-2.1,4.79-4.79,0-1.26-1.03-2.29-2.29-2.29ZM14.19,14.47H3.36c-.57,0-1.04-.47-1.04-1.04v-1.66c.52.39,1.16.62,1.88.62h5.83c.35,0,.62-.28.62-.62s-.28-.62-.62-.62h-5.83c-1.07,0-1.88-.81-1.88-1.88v-3.33c0-.07-.01-.15-.04-.21-.03-.07,0-.15.07-.18.01,0,.03,0,.05,0,.06,0,.12.03.14.08.03.07.07.13.13.18.02.02.61.61,1.08.98,1.26.9,2.98.87,4.2-.06.49-.27.92-.77,1.09-.98.08-.04.2-.1.3-.03l1.58,1.07-.98,1.28c-.21.27-.16.67.12.88.11.09.25.13.38.13.19,0,.37-.08.5-.25l1.02-1.34,1.71,1.16-.81,1.1c-.21.28-.15.67.13.87.11.08.24.12.37.12.19,0,.38-.09.5-.25l.84-1.14c.54.36,1.22.56,1.99.56.57,0,1.04.47,1.04,1.04,0,1.99-1.56,3.54-3.54,3.54Z',
    ],
  },
  {
    kind: 'custom', name: 'Speed', file: 'icon-speed.svg',
    paths: [
      'M18.33,14.38h-2.5c-.35,0-.62.28-.62.62s.28.62.62.62h2.5c.35,0,.62-.28.62-.62s-.28-.62-.62-.62Z',
      'M15,17.71h-5.63l8.92-9.42c.43-.43.67-1.01.67-1.62,0-.61-.24-1.19-.67-1.62-.08-.08-.16-.15-.25-.21l-4.68-3.51c-.31-.23-.7-.32-1.08-.26-.39.06-.72.27-.95.58-.18.25-.28.55-.28.86v1.67c0,.46-.29.85-.71.99l-3.3.96c-.59.2-.99.76-.99,1.37-.11,4.76-1.44,6.89-2.71,6.89s-2.29,1.03-2.29,2.29,1.03,2.29,2.29,2.29h11.67c.35,0,.62-.28.62-.62s-.28-.62-.62-.62ZM7.65,17.71H3.33c-.57,0-1.04-.47-1.04-1.04s.47-1.04,1.04-1.04c.88,0,3.78-.58,3.96-8.12,0-.09.06-.17.11-.19l3.29-.96c.96-.3,1.6-1.18,1.6-2.18v-1.67s.01-.09.04-.12c.04-.06.11-.09.17-.09.04,0,.08.01.11.04l2.95,2.21-3.52,3.72c-.24.25-.23.65.02.88.12.11.28.17.43.17.17,0,.33-.07.45-.2l3.62-3.82.72.54s.08.06.11.1c.2.2.3.46.3.74s-.11.54-.32.75l-9.74,10.29Z',
    ],
  },
  {
    kind: 'custom', name: 'StarCircle', file: 'icon-star-circle.svg',
    paths: [
      'M10,18.96c-4.94,0-8.96-4.02-8.96-8.96S5.06,1.04,10,1.04s8.96,4.02,8.96,8.96-4.02,8.96-8.96,8.96ZM10,2.29c-4.25,0-7.71,3.46-7.71,7.71s3.46,7.71,7.71,7.71,7.71-3.46,7.71-7.71-3.46-7.71-7.71-7.71Z',
      'M12.1,14.52c-.29,0-.58-.09-.82-.25l-1.18-.6c-.06-.03-.13-.03-.19,0l-1.18.61c-.64.44-1.52.29-1.99-.34-.27-.37-.36-.85-.22-1.29l.21-1.3c.01-.07-.01-.13-.06-.18l-.93-.93c-.29-.22-.49-.54-.55-.9-.07-.38.01-.77.24-1.09.27-.39.72-.63,1.2-.63h0l1.26-.21c.07-.01.12-.05.15-.11l.61-1.19c.13-.35.38-.63.71-.8.35-.18.74-.21,1.11-.09.44.14.78.48.93.91l.59,1.17c.03.06.09.1.15.11l1.36.21c.3-.02.66.15.94.42.27.28.42.64.42,1.03,0,.46-.22.9-.59,1.17l-.91.91s-.07.11-.06.18l.21,1.29c.11.35.08.72-.08,1.05-.17.35-.46.62-.83.75-.16.06-.32.08-.49.08ZM10,12.38c.23,0,.46.05.67.16l1.22.62s.06.03.09.06c.06.04.13.05.19.03.09-.03.16-.17.13-.27-.01-.04-.02-.07-.03-.11l-.22-1.34c-.07-.46.08-.93.41-1.26l.98-.97c.12-.1.16-.16.16-.23,0-.1-.11-.21-.21-.21l-1.46-.22c-.46-.07-.86-.36-1.08-.78l-.61-1.21s-.03-.07-.04-.1c-.02-.07-.07-.12-.13-.14-.09-.03-.23.04-.26.13-.01.03-.02.06-.04.09l-.62,1.23c-.21.42-.61.71-1.08.78l-1.36.21c-.17,0-.23.04-.27.1-.06.08-.03.23.05.29.03.02.06.04.09.07l.96.96c.33.33.48.8.41,1.26l-.21,1.34s-.02.07-.03.11c-.02.06-.01.14.03.19.07.09.2.11.29.04.03-.02.06-.04.09-.05l1.22-.62c.21-.11.44-.16.66-.16ZM9.21,6.35h0,0Z',
    ],
  },
  {
    kind: 'custom', name: 'Trophy', file: 'icon-trophy.svg',
    paths: [
      'M15.59,8.12h.66c1.49,0,2.71-1.21,2.71-2.71s-1.21-2.71-2.71-2.71h-.62v-.21c0-.8-.65-1.46-1.46-1.46H5.83c-.8,0-1.46.65-1.46,1.46v.21h-.62c-1.49,0-2.71,1.21-2.71,2.71s1.21,2.71,2.71,2.71h.66c.22,2.01,1.52,3.71,3.3,4.51v.93c0,.36-.2.7-.56.92-1.04.77-1.73,1.95-1.9,3.23h-1.92c-.35,0-.62.28-.62.62s.28.62.62.62h13.33c.35,0,.62-.28.62-.62s-.28-.62-.62-.62h-1.92c-.17-1.28-.86-2.46-1.95-3.26-.31-.19-.5-.52-.51-.88v-.94c1.78-.8,3.07-2.49,3.3-4.51ZM16.25,3.96c.8,0,1.46.65,1.46,1.46s-.65,1.46-1.46,1.46h-.62v-2.92h.62ZM2.29,5.42c0-.8.65-1.46,1.46-1.46h.62v2.92h-.62c-.8,0-1.46-.65-1.46-1.46ZM5.62,7.5V2.5c0-.11.09-.21.21-.21h8.33c.11,0,.21.09.21.21v5c0,2.41-1.96,4.38-4.38,4.38s-4.38-1.96-4.38-4.38ZM12.11,15.49c.73.54,1.2,1.34,1.36,2.22h-6.93c.16-.88.62-1.68,1.31-2.19.68-.41,1.11-1.15,1.12-1.95v-.55c.34.06.69.1,1.04.1s.7-.04,1.04-.1v.55c0,.79.44,1.54,1.07,1.91Z',
    ],
  },
  {
    kind: 'custom', name: 'Watch', file: 'icon-watch.svg',
    paths: [
      'M2.27,6.92c-.33-.11-.68.08-.78.41-.56,1.76-.56,3.62,0,5.38.08.27.33.44.6.44.06,0,.13,0,.19-.03.33-.1.51-.46.41-.78-.48-1.51-.48-3.11,0-4.62.1-.33-.08-.68-.41-.78Z',
      'M18.51,7.32c-.1-.33-.45-.51-.78-.41-.33.1-.51.46-.41.78.48,1.51.48,3.11,0,4.62-.1.33.08.68.41.78.06.02.13.03.19.03.27,0,.51-.17.6-.44.56-1.76.56-3.62,0-5.38Z',
      'M14.02,6.08l-.64-3.18c-.22-1.09-1.19-1.86-2.28-1.85h-2.22c-1.11-.01-2.07.76-2.29,1.85l-.61,3.19c-.99,1.01-1.6,2.39-1.6,3.92s.62,2.92,1.61,3.94l.63,3.15c.21,1.08,1.16,1.85,2.24,1.85.01,0,.03,0,.04,0h2.25c1.11.03,2.08-.75,2.29-1.84l.65-3.25c.95-1.01,1.53-2.36,1.53-3.84s-.62-2.92-1.61-3.93ZM8.87,2.3h2.25c.52-.02.94.34,1.04.84l.37,1.85c-.76-.38-1.62-.6-2.52-.6s-1.78.22-2.55.62l.36-1.86c.1-.5.53-.86,1.05-.84ZM10,5.64c2.41,0,4.38,1.96,4.38,4.38s-1.96,4.38-4.38,4.38-4.38-1.96-4.38-4.38,1.96-4.38,4.38-4.38ZM11.17,17.7h-2.28c-.51.02-.94-.34-1.04-.84l-.36-1.82c.76.38,1.61.6,2.52.6s1.82-.23,2.59-.64l-.37,1.86c-.1.5-.56.85-1.05.84Z',
      'M10.39,11.29c.12.12.28.18.44.18s.32-.06.44-.18c.24-.24.24-.64,0-.88l-.65-.65v-1.41c0-.35-.28-.62-.62-.62s-.62.28-.62.62v1.67c0,.17.07.32.18.44l.83.83Z',
    ],
  },
]

const ALL_ICONS: IconEntry[] = [...LUCIDE_ICONS, ...CUSTOM_ICONS]

// ─── Component ────────────────────────────────────────────────────────────────

export function IconGrid() {
  const [query, setQuery]     = useState('')
  const [copied, setCopied]   = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const filtered = query.trim()
    ? ALL_ICONS.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
    : ALL_ICONS

  function handleCopy(entry: IconEntry) {
    const text = entry.kind === 'lucide'
      ? `<${entry.name} size={20} strokeWidth={1.5} />`
      : `/assets/on-field/icons/${entry.file}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(entry.name)
      setTimeout(() => setCopied(null), 1800)
    })
  }

  function copyTitle(entry: IconEntry) {
    return entry.kind === 'lucide'
      ? `Copy <${entry.name} size={20} strokeWidth={1.5} />`
      : `Copy path — /assets/on-field/icons/${entry.file}`
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
        {filtered.length} / {ALL_ICONS.length} ICONS · {LUCIDE_ICONS.length} lucide · {CUSTOM_ICONS.length} custom · size 20
      </p>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))', gap: 1, background: 'rgba(42,44,43,0.07)' }}>
        {filtered.map((entry) => {
          const { name } = entry
          const isHov  = hovered === name
          const isDone = copied === name
          return (
            <button
              key={name}
              onMouseEnter={() => setHovered(name)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleCopy(entry)}
              title={copyTitle(entry)}
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
                {entry.kind === 'lucide'
                  ? <entry.Icon size={20} strokeWidth={1.5} />
                  : <CustomSvgIcon paths={entry.paths} />
                }
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
