import React from 'react'
import { FocusReveal } from '@/components/motion/FocusReveal'
import { StaggerGroup } from '@/components/motion/StaggerGroup'
import { TextReveal } from '@/components/motion/TextReveal'

/* ─── Tokens ─── */
const C = {
  black:      '#2a2c2b',
  powerBlack: '#061015',
  bg:         '#f2f8ff',
  white:      '#ffffff',
  steel:      '#6d7886',
  aluminium:  '#e2eaf2',
  platinum:   '#a8c9e5',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const hairline = '1px solid rgba(42,44,43,0.08)'
const H_PAD = 'clamp(16px, 5vw, 72px)'

/* ─── Atoms ─── */
function Eyebrow({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: C.steel, margin: '0 0 14px', fontWeight: 600, textTransform: 'uppercase' }}>
      {children}
    </p>
  )
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: 0, maxWidth: 580 }}>
      {children}
    </p>
  )
}

/* ═══════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="sh-hero" style={{ padding: `80px ${H_PAD} 72px`, borderBottom: hairline }}>
      <Eyebrow>// system onboarding</Eyebrow>
      <div
        className="bf-load-stagger"
        style={{
          fontSize: 'clamp(48px, 6.5vw, 88px)',
          lineHeight: 0.92,
          fontWeight: 700,
          fontFamily: sans,
          marginBottom: 40,
        }}
      >
        {(['Start.', 'Operate.', 'Scale.'] as const).map((word, i) => (
          <div
            key={word}
            className="bf-stagger-item"
            style={{ color: C.black, animationDelay: `${i * 70}ms` }}
          >
            {word}
          </div>
        ))}
      </div>
      <Lead>
        A structured guide to AI-OS-BASE — the modular system that powers every Bicofino AI session.
        Read this once. Return when you need it.
      </Lead>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   SECTION 1 — What This Is
   ═══════════════════════════════════════════════════════ */
function WhatThisIs() {
  return (
    <section id="sh-what">
      <FocusReveal style={{ padding: `64px ${H_PAD}`, borderBottom: hairline }}>
        <Eyebrow>// 01 · what this is</Eyebrow>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: '0 0 20px', fontFamily: sans, lineHeight: 1.1 }}>
          AI-OS-BASE
        </h2>
        <Lead>
          AI-OS-BASE is the operating layer beneath all Bicofino AI work. It is not a product — it is an
          infrastructure. A set of agents, prompts, workflows, and templates that standardise how you
          start, run, and close any creative or technical task with an AI assistant.
        </Lead>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: '20px 0 0', maxWidth: 580 }}>
          It exists because context is expensive. Without a system, every session starts from zero.
          With it, every session starts from clarity.
        </p>
      </FocusReveal>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   SECTION 2 — How To Use
   ═══════════════════════════════════════════════════════ */
function HowToUse() {
  const steps = [
    {
      n: '01',
      title: 'Start session',
      desc: 'Open master-prompt.md and paste its contents at the beginning of your Claude session. This activates the operating context.',
    },
    {
      n: '02',
      title: 'Choose agent',
      desc: 'Select the correct agent for your task type: Design, Dev, Copy, QA, or Cleanup. Use Orchestrator when the scope is unclear or spans multiple disciplines.',
    },
    {
      n: '03',
      title: 'Use template',
      desc: 'Open the relevant template from 04_templates/. Fill all required fields. Paste after the master prompt before describing your task.',
    },
    {
      n: '04',
      title: 'Execute task',
      desc: 'Run the session with a clear objective and defined acceptance criteria. Scope before you start — not after.',
    },
    {
      n: '05',
      title: 'Log decisions',
      desc: 'Any non-obvious decision — especially deviations from established patterns — must be recorded in 06_logs/decisions-log.md.',
    },
  ]

  return (
    <section id="sh-how">
      <TextReveal style={{ padding: `56px ${H_PAD} 28px`, borderBottom: hairline }}>
        <Eyebrow>// 02 · how to use</Eyebrow>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, fontFamily: sans, lineHeight: 1.1 }}>
          Session protocol
        </h2>
      </TextReveal>
      <StaggerGroup style={{ margin: `0 ${H_PAD} 72px` }}>
        {steps.map(({ n, title, desc }) => (
          <div
            key={n}
            style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr',
              padding: '24px 0',
              borderBottom: hairline,
              gap: 24,
              alignItems: 'start',
            }}
          >
            <span style={{ fontFamily: mono, fontSize: 10, color: 'var(--current-accent)', letterSpacing: '0.06em', paddingTop: 3 }}>
              {n}
            </span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: C.black, margin: '0 0 6px', letterSpacing: '-0.01em' }}>{title}</p>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, margin: 0 }}>{desc}</p>
            </div>
          </div>
        ))}
      </StaggerGroup>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   SECTION 3 — Core Layers
   ═══════════════════════════════════════════════════════ */
function CoreLayers() {
  const layers = [
    {
      id: '01',
      name: 'agents',
      path: '01_agents/',
      desc: 'Specialised roles — Design, Dev, Copy, QA, Cleanup, Orchestrator. Each has a defined scope and activation pattern.',
    },
    {
      id: '02',
      name: 'prompts',
      path: '02_prompts/',
      desc: 'The master prompt and task template. Foundational context injected at the start of every session.',
    },
    {
      id: '03',
      name: 'workflows',
      path: '03_workflows/',
      desc: 'Multi-step processes for content, design system, versioning, and website tasks. Use when a task spans multiple sessions or agents.',
    },
    {
      id: '04',
      name: 'templates',
      path: '04_templates/',
      desc: 'Reusable scaffolding for CLAUDE.md, DESIGN.md, project briefs, and agent documentation.',
    },
    {
      id: '05',
      name: 'logs',
      path: '06_logs/',
      desc: 'Decision log, changelog, and error records. Written to — not read from. The persistent memory of the system.',
    },
  ]

  return (
    <section id="sh-layers">
      <FocusReveal style={{ padding: `56px ${H_PAD} 32px`, borderBottom: hairline }}>
        <Eyebrow>// 03 · core layers</Eyebrow>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: '0 0 16px', fontFamily: sans, lineHeight: 1.1 }}>
          System architecture
        </h2>
        <Lead>Five layers. Each with a distinct function. Do not mix responsibilities between them.</Lead>
      </FocusReveal>

      <div style={{ margin: `0 ${H_PAD} 72px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '32px 180px 1fr', padding: '8px 0', borderBottom: '1px solid rgba(42,44,43,0.16)', gap: 24 }}>
          {['', 'layer', 'purpose'].map((h, i) => (
            <span key={i} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {layers.map(({ id, name, path, desc }) => (
          <div
            key={id}
            className="bf-reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: '32px 180px 1fr',
              padding: '20px 0',
              borderBottom: hairline,
              gap: 24,
              alignItems: 'start',
            }}
          >
            <span style={{ fontFamily: mono, fontSize: 10, color: C.platinum, paddingTop: 2 }}>{id}</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: C.black, margin: '0 0 5px', letterSpacing: '-0.01em' }}>{name}</p>
              <code style={{ fontFamily: mono, fontSize: 10, color: C.steel }}>{path}</code>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   SECTION 4 — Personal vs Bicofino
   ═══════════════════════════════════════════════════════ */
function PersonalVsBicofino() {
  const rules = [
    { what: 'Bicofino work',             where: '05_projects/bicofino/' },
    { what: 'Personal projects',         where: 'Separate repo — outside this system' },
    { what: 'Agents, prompts, templates',where: '01_agents/  02_prompts/  04_templates/' },
    { what: 'Bicofino decisions',        where: '06_logs/decisions-log.md' },
    { what: 'Personal session notes',    where: 'Do not commit to this repository' },
  ]

  return (
    <section id="sh-separation">
      <TextReveal style={{ padding: `56px ${H_PAD} 28px`, borderBottom: hairline }}>
        <Eyebrow>// 04 · boundaries</Eyebrow>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, fontFamily: sans, lineHeight: 1.1 }}>
          Personal vs Bicofino
        </h2>
      </TextReveal>

      <FocusReveal style={{ padding: `32px ${H_PAD} 32px` }}>
        <Lead>
          AI-OS-BASE serves both personal and professional work. The agents and prompts are neutral —
          but the outputs must stay separated. One session, one context. Never mix client data with
          personal work in the same conversation.
        </Lead>
      </FocusReveal>

      <div style={{ margin: `0 ${H_PAD} 72px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '8px 0', borderBottom: '1px solid rgba(42,44,43,0.16)' }}>
          {['what', 'where it lives'].map(h => (
            <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {rules.map(({ what, where }) => (
          <div
            key={what}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              padding: '18px 0',
              borderBottom: hairline,
              alignItems: 'start',
              gap: 32,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 500, color: C.black, lineHeight: 1.5 }}>{what}</span>
            <code style={{ fontFamily: mono, fontSize: 11, color: C.steel, lineHeight: 1.6 }}>{where}</code>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   SECTION 5 — First Action
   ═══════════════════════════════════════════════════════ */
function FirstAction() {
  return (
    <section id="sh-action">
      <FocusReveal style={{ padding: `64px ${H_PAD} 80px`, borderBottom: hairline }}>
        <Eyebrow>// first action</Eyebrow>
        <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: '0 0 20px', fontFamily: sans, lineHeight: 1.15, maxWidth: 520 }}>
          Open master-prompt.md and start your first task.
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: '0 0 32px', maxWidth: 520 }}>
          That file is the entry point to the system. Every session starts there. Copy its contents,
          paste them at the beginning of your Claude session, then begin.
        </p>
        <code style={{
          fontFamily: mono,
          fontSize: 12,
          color: C.black,
          background: 'rgba(42,44,43,0.05)',
          padding: '10px 16px',
          borderRadius: 4,
          display: 'inline-block',
          borderLeft: '3px solid var(--current-accent)',
          letterSpacing: '0.02em',
        }}>
          AI-OS-BASE/02_prompts/master-prompt.md
        </code>
      </FocusReveal>
    </section>
  )
}

/* ─── Footer ─── */
function PageFooter() {
  return (
    <div style={{ padding: `24px ${H_PAD} 40px` }}>
      <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
        // AI-OS-BASE · system onboarding · Bicofino · 2026
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */
export default function StartHerePage() {
  return (
    <>
      <Hero />
      <WhatThisIs />
      <HowToUse />
      <CoreLayers />
      <PersonalVsBicofino />
      <FirstAction />
      <PageFooter />
    </>
  )
}
