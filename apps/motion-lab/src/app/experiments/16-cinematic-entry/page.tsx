'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { ExperimentShell } from '@/components/ExperimentShell'
import { useTuner } from '@/components/Tuner'

/* EXP-16 — Entrada cinematográfica (assinatura Hubtown).
   Fase A: contador mono 000% → 100% com hairline de progresso que
   preenche, 'carregando' → 'pronto para explorar'. Por trás, uma
   figura wireframe gira devagar, escondida (blur + opacity 0).
   Fase B (100%): o loader some, a cena REVELA com movimento de
   câmera (dolly/girar/subir), o canvas desfoca→nítido e a headline
   surge. Instrumento que liga, não demo. */

type CameraMove = 'dolly' | 'girar' | 'subir'

export default function CinematicEntryPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  const [pct, setPct] = useState(0)

  const { values, panel, replay } = useTuner(
    {
      loadDuration: { value: 2.4, min: 1, max: 5, step: 0.1, label: 'duração load (s)' },
      revealDuration: { value: 1.6, min: 0.6, max: 3, step: 0.1, label: 'duração reveal (s)' },
      cameraMove: {
        value: 'dolly',
        options: ['dolly', 'girar', 'subir'] as const,
        label: 'movimento de câmera',
      },
    },
    { title: '// EXP-16' },
  )

  // Valores lidos ao vivo dentro do rAF (params suaves sem rebuild)
  const valuesRef = useRef(values)
  valuesRef.current = values

  /* ── Three.js: monta UMA vez, lê tokens em runtime, full cleanup ── */
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const css = getComputedStyle(document.documentElement)
    const accent = css.getPropertyValue('--current-accent').trim()
    const steel = css.getPropertyValue('--bf-steel').trim()
    const line = css.getPropertyValue('--bf-line-on-dark').trim()
    const powerBlack = css.getPropertyValue('--bf-power-black').trim()

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(new THREE.Color(powerBlack), 8, 26)

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0, 9)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    // Figura wireframe — icosaedro técnico, hairline steel
    const geometry = new THREE.IcosahedronGeometry(2.6, 1)
    const edges = new THREE.EdgesGeometry(geometry)
    const wireMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(line || steel),
      transparent: true,
      opacity: 0.55,
    })
    const figure = new THREE.LineSegments(edges, wireMat)
    scene.add(figure)

    // Vértices como nós — o único vibrante é o ponto central
    const nodeGeo = new THREE.IcosahedronGeometry(2.6, 1)
    const nodeMat = new THREE.PointsMaterial({
      color: new THREE.Color(steel),
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
    })
    const nodes = new THREE.Points(nodeGeo, nodeMat)
    scene.add(nodes)

    // Núcleo vibrante — o único accent da composição
    const coreGeo = new THREE.SphereGeometry(0.12, 16, 16)
    const coreMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accent) })
    const core = new THREE.Mesh(coreGeo, coreMat)
    scene.add(core)

    let raf = 0
    let start = performance.now()

    const render = () => renderer.render(scene, camera)

    // Estado de revelação dirigido pelo timeline JS (0 escondido → 1 revelado)
    const revealState = { v: reduced ? 1 : 0 }

    const applyCamera = (rev: number, t: number) => {
      const move = valuesRef.current.cameraMove as CameraMove
      // Antes do reveal a câmera está "longe/torta"; depois assenta
      const back = (1 - rev) // 1 = ainda carregando
      if (move === 'dolly') {
        camera.position.set(0, 0, 9 + back * 7)
        camera.rotation.set(0, 0, back * 0.06)
      } else if (move === 'girar') {
        camera.position.set(Math.sin(back * 0.9) * 6, 0, 9 + back * 3)
      } else {
        camera.position.set(0, -back * 6, 9 + back * 2)
      }
      camera.lookAt(0, 0, 0)
      // respiro lento contínuo na figura (vivo, nunca ocupado)
      figure.rotation.y = t * 0.12
      figure.rotation.x = t * 0.05
      nodes.rotation.copy(figure.rotation)
    }

    if (reduced) {
      applyCamera(1, 0)
      render()
    } else {
      const loop = (now: number) => {
        const t = (now - start) / 1000
        applyCamera(revealState.v, t)
        render()
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    // Expor o estado de reveal para o efeito de sequência abaixo
    revealStateRef.current = revealState
    resetClockRef.current = () => {
      start = performance.now()
    }

    const ro = new ResizeObserver(() => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      render()
    })
    ro.observe(container)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      revealStateRef.current = null
      resetClockRef.current = null
      geometry.dispose()
      edges.dispose()
      wireMat.dispose()
      nodeGeo.dispose()
      nodeMat.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
    // monta uma vez; params suaves via valuesRef
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ponte entre o efeito do Three e o efeito da sequência
  const revealStateRef = useRef<{ v: number } | null>(null)
  const resetClockRef = useRef<(() => void) | null>(null)

  /* ── Sequência de entrada — contador + reveal, via rAF tweens.
        Reinicia em replay e quando os tempos/movimento mudam. ── */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const loader = loaderRef.current
    const headline = headlineRef.current
    const bar = barRef.current
    const label = labelRef.current
    const container = containerRef.current

    const setCanvasReveal = (rev: number) => {
      if (revealStateRef.current) revealStateRef.current.v = rev
      if (container) {
        container.style.filter = `blur(${(1 - rev) * 14}px)`
        container.style.opacity = String(0.25 + rev * 0.75)
      }
    }

    // Reduced motion: pula contador, mostra cena revelada em repouso
    if (reduced) {
      setPct(100)
      setCanvasReveal(1)
      if (loader) loader.style.opacity = '0'
      if (loader) loader.style.pointerEvents = 'none'
      if (headline) headline.style.opacity = '1'
      if (headline) headline.style.transform = 'none'
      if (bar) bar.style.transform = 'scaleX(1)'
      if (label) label.textContent = 'pronto para explorar'
      return
    }

    // Estado inicial da sequência
    resetClockRef.current?.()
    setPct(0)
    setCanvasReveal(0)
    if (loader) {
      loader.style.opacity = '1'
      loader.style.pointerEvents = 'auto'
    }
    if (headline) {
      headline.style.opacity = '0'
      headline.style.transform = 'translateY(16px)'
    }
    if (bar) bar.style.transform = 'scaleX(0)'
    if (label) label.textContent = 'carregando'

    const loadMs = valuesRef.current.loadDuration * 1000
    const revealMs = valuesRef.current.revealDuration * 1000

    let raf = 0
    let phase: 'load' | 'reveal' = 'load'
    let loadStart = performance.now()
    let revealStart = 0

    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3)
    const easeInOut = (x: number) =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2

    const tick = (now: number) => {
      if (phase === 'load') {
        const p = Math.min((now - loadStart) / loadMs, 1)
        const eased = easeOut(p)
        const value = Math.round(eased * 100)
        setPct(value)
        if (bar) bar.style.transform = `scaleX(${eased})`
        if (p >= 1) {
          setPct(100)
          if (bar) bar.style.transform = 'scaleX(1)'
          if (label) label.textContent = 'pronto para explorar'
          phase = 'reveal'
          revealStart = now
        }
        raf = requestAnimationFrame(tick)
        return
      }

      // Fase de reveal
      const p = Math.min((now - revealStart) / revealMs, 1)
      const eased = easeInOut(p)
      setCanvasReveal(eased)
      if (loader) loader.style.opacity = String(1 - easeOut(p))
      if (headline) {
        headline.style.opacity = String(easeOut(Math.max(0, (p - 0.25) / 0.75)))
        headline.style.transform = `translateY(${(1 - easeOut(p)) * 16}px)`
      }
      if (p >= 1) {
        if (loader) loader.style.pointerEvents = 'none'
        setCanvasReveal(1)
        return
      }
      raf = requestAnimationFrame(tick)
    }

    loadStart = performance.now()
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replay, values.loadDuration, values.revealDuration, values.cameraMove])

  const pad = String(pct).padStart(3, '0')
  const ready = pct >= 100

  return (
    <ExperimentShell slug="16-cinematic-entry">
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* ── Cena 3D (fundo, desfoca→nítido no reveal) ── */}
        <div
          ref={containerRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.25,
            filter: 'blur(14px)',
            willChange: 'filter, opacity',
          }}
        />

        {/* ── HUD mono (canto): spec-tag + estado ── */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 32,
            display: 'flex',
            gap: 16,
            fontFamily: 'var(--bf-font-mono)',
            fontSize: 10,
            letterSpacing: '0.1em',
            color: 'var(--lab-text-dim)',
            textTransform: 'uppercase',
            zIndex: 3,
          }}
        >
          <span>FIG-001</span>
          <span>SEQ {pad}/100</span>
          <span style={{ color: ready ? 'var(--current-accent)' : 'var(--lab-text-dim)' }}>
            {ready ? 'ready' : 'boot'}
          </span>
        </div>

        {/* ── Loader centrado (Fase A) ── */}
        <div
          ref={loaderRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            zIndex: 2,
            willChange: 'opacity',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--bf-font-mono)',
              fontSize: 'clamp(64px, 16vw, 200px)',
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              fontVariantNumeric: 'tabular-nums',
              color: ready ? 'var(--current-accent)' : 'var(--lab-text)',
              transition: 'color 200ms var(--ease-standard)',
            }}
          >
            {pad}
            <span style={{ fontSize: '0.35em', marginLeft: '0.15em', color: 'var(--lab-text-dim)' }}>
              %
            </span>
          </div>

          {/* Hairline de progresso — 1px, preenche da esquerda em accent */}
          <div
            style={{
              position: 'relative',
              width: 'min(420px, 70vw)',
              height: 1,
              background: 'var(--bf-line-on-dark)',
            }}
          >
            <div
              ref={barRef}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--current-accent)',
                transformOrigin: 'left center',
                transform: 'scaleX(0)',
                willChange: 'transform',
              }}
            />
          </div>

          <span
            ref={labelRef}
            style={{
              fontFamily: 'var(--bf-font-mono)',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--lab-text-dim)',
            }}
          >
            carregando
          </span>
        </div>

        {/* ── Headline revelada (Fase B) ── */}
        <div
          ref={headlineRef}
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            padding: '0 32px',
            maxWidth: 720,
            textAlign: 'center',
            alignItems: 'center',
            opacity: 0,
            transform: 'translateY(16px)',
            willChange: 'opacity, transform',
            pointerEvents: 'none',
          }}
        >
          <span className="lab-eyebrow">
            {'// EXP-16 — ENTRADA CINEMATOGRÁFICA'}
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--bf-white)',
            }}
          >
            Pronto para explorar.
          </h2>
          <p
            style={{
              margin: 0,
              maxWidth: '42ch',
              fontSize: 15,
              lineHeight: 1.7,
              color: 'var(--lab-text-dim)',
            }}
          >
            A casa carrega antes de abrir a porta. O contador chega a 100, o
            grafismo ganha foco e a câmera assenta — a cena se revela como quem
            convida a entrar.
          </p>
        </div>
      </div>
      {panel}
    </ExperimentShell>
  )
}
