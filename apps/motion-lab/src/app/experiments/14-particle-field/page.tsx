'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { ExperimentShell } from '@/components/ExperimentShell'
import { useTuner } from '@/components/Tuner'

/* EXP-14 — Campo de partículas. Alguns milhares de pontos à deriva no
   espaço, respiração lenta tipo o organismo M-01: cada eixo ganha um
   sopro senoidal mínimo em torno da posição-base. O campo segue o mouse
   com amortecimento — paralaxe suave da câmera. Pontos são redondos (um
   sprite radial gerado offscreen), monocromáticos em aço/alumínio com uma
   fração mínima no único vibrante. Instrumento que respira, não demo. */

/* Sprite radial offscreen — alpha suave do centro à borda, dot não quadrado */
function makeDotTexture(): THREE.Texture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.4, 'rgba(255,255,255,0.55)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

const SPREAD = 14 // raio do volume do campo

export default function ParticleFieldPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { values, panel } = useTuner(
    {
      count: { value: 2500, min: 500, max: 6000, step: 100, label: 'partículas (rebuild)' },
      driftSpeed: { value: 0.4, min: 0, max: 1, step: 0.01, label: 'deriva' },
      mouseInfluence: { value: 0.45, min: 0, max: 1, step: 0.01, label: 'influência do mouse' },
      size: { value: 3, min: 1, max: 8, step: 0.1, label: 'tamanho' },
      accentRatio: { value: 0.08, min: 0, max: 0.3, step: 0.01, label: 'fração vibrante (rebuild)' },
      connectLines: { value: false, label: 'linhas (constelação) (rebuild)' },
    },
    { title: '// EXP-14' },
  )

  // Espelho dos valores para leitura ao vivo dentro do rAF
  const valuesRef = useRef(values)
  valuesRef.current = values

  // HUD ao vivo
  const hudRef = useRef<HTMLDivElement>(null)

  // Estruturais: só estes reconstroem a cena
  const { count, accentRatio, connectLines } = values

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Tokens em runtime ──
    const css = getComputedStyle(document.documentElement)
    const accent = css.getPropertyValue('--current-accent').trim()
    const steel = css.getPropertyValue('--bf-steel').trim()
    const aluminium = css.getPropertyValue('--bf-aluminium').trim()
    const line = css.getPropertyValue('--bf-line-on-dark').trim()
    const powerBlack = css.getPropertyValue('--bf-power-black').trim()

    const accentColor = new THREE.Color(accent)
    const steelColor = new THREE.Color(steel)
    const aluColor = new THREE.Color(aluminium)

    // ── Renderer / scene / camera ──
    const width = container.clientWidth
    const height = container.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)
    renderer.domElement.style.display = 'block'

    const scene = new THREE.Scene()
    // Névoa do mesmo power-black para profundidade sem fundo opaco
    scene.fog = new THREE.FogExp2(new THREE.Color(powerBlack).getHex(), 0.022)

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100)
    camera.position.set(0, 0, 26)

    // ── Posições-base + cores por vértice ──
    const n = Math.round(count)
    const basePositions = new Float32Array(n * 3)
    const positions = new Float32Array(n * 3)
    const colors = new Float32Array(n * 3)
    // Fase senoidal por partícula (para deriva dessincronizada)
    const phases = new Float32Array(n * 3)

    for (let i = 0; i < n; i++) {
      const i3 = i * 3
      const x = (Math.random() - 0.5) * 2 * SPREAD
      const y = (Math.random() - 0.5) * 2 * SPREAD
      const z = (Math.random() - 0.5) * 2 * SPREAD
      basePositions[i3] = x
      basePositions[i3 + 1] = y
      basePositions[i3 + 2] = z
      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = z

      phases[i3] = Math.random() * Math.PI * 2
      phases[i3 + 1] = Math.random() * Math.PI * 2
      phases[i3 + 2] = Math.random() * Math.PI * 2

      // Maioria aço/alumínio; pequena fração no vibrante
      const isAccent = Math.random() < accentRatio
      let c: THREE.Color
      if (isAccent) {
        c = accentColor
      } else {
        c = Math.random() < 0.5 ? steelColor : aluColor
      }
      colors[i3] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const dotTexture = makeDotTexture()

    const material = new THREE.PointsMaterial({
      size: valuesRef.current.size * 0.06,
      sizeAttenuation: true,
      map: dotTexture,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.NormalBlending,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // ── Linhas de constelação (opcional, vizinhos próximos) ──
    let lineGeometry: THREE.BufferGeometry | null = null
    let lineMaterial: THREE.LineBasicMaterial | null = null
    let lineSegments: THREE.LineSegments | null = null

    if (connectLines) {
      const NEAR = 1.6 // distância máxima para conectar
      const NEAR2 = NEAR * NEAR
      const MAX_PER = 3 // limite de vizinhos por partícula (densidade controlada)
      const linePts: number[] = []
      // Limita varredura para não estourar custo em counts altos
      const scan = Math.min(n, 1600)
      for (let i = 0; i < scan; i++) {
        const i3 = i * 3
        const ax = basePositions[i3]
        const ay = basePositions[i3 + 1]
        const az = basePositions[i3 + 2]
        let made = 0
        for (let j = i + 1; j < scan && made < MAX_PER; j++) {
          const j3 = j * 3
          const dx = ax - basePositions[j3]
          const dy = ay - basePositions[j3 + 1]
          const dz = az - basePositions[j3 + 2]
          const d2 = dx * dx + dy * dy + dz * dz
          if (d2 < NEAR2) {
            linePts.push(ax, ay, az, basePositions[j3], basePositions[j3 + 1], basePositions[j3 + 2])
            made++
          }
        }
      }
      if (linePts.length > 0) {
        lineGeometry = new THREE.BufferGeometry()
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePts, 3))
        lineMaterial = new THREE.LineBasicMaterial({
          color: new THREE.Color(line),
          transparent: true,
          opacity: 0.5,
        })
        lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial)
        scene.add(lineSegments)
      }
    }

    // ── Pointer → alvo de paralaxe amortecido ──
    const pointerTarget = { x: 0, y: 0 }
    const parallax = { x: 0, y: 0 }

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointerTarget.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      pointerTarget.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    if (!reduced) container.addEventListener('pointermove', onMove)

    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute

    const renderHud = () => {
      if (hudRef.current) {
        hudRef.current.textContent =
          `FIELD / N=${n}   X ${parallax.x.toFixed(2)}  Y ${parallax.y.toFixed(2)}  Z 26.00`
      }
    }

    let raf = 0
    const clock = new THREE.Clock()

    const drawStatic = () => {
      renderer.render(scene, camera)
      renderHud()
    }

    const tick = () => {
      const v = valuesRef.current
      const t = clock.getElapsedTime()
      const drift = v.driftSpeed
      const amp = 0.45 * drift // amplitude da respiração

      // Deriva senoidal lenta por eixo, dessincronizada por fase
      if (drift > 0.0001) {
        for (let i = 0; i < n; i++) {
          const i3 = i * 3
          positions[i3] =
            basePositions[i3] + Math.sin(t * 0.25 + phases[i3]) * amp
          positions[i3 + 1] =
            basePositions[i3 + 1] + Math.sin(t * 0.21 + phases[i3 + 1]) * amp
          positions[i3 + 2] =
            basePositions[i3 + 2] + Math.sin(t * 0.18 + phases[i3 + 2]) * amp
        }
        posAttr.needsUpdate = true
      }

      // Tamanho ao vivo
      material.size = v.size * 0.06

      // Paralaxe da câmera com amortecimento
      const infl = v.mouseInfluence
      parallax.x += (pointerTarget.x * infl * 6 - parallax.x) * 0.04
      parallax.y += (pointerTarget.y * infl * 6 - parallax.y) * 0.04
      camera.position.x = parallax.x
      camera.position.y = -parallax.y
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
      renderHud()
      raf = requestAnimationFrame(tick)
    }

    if (reduced) {
      drawStatic()
    } else {
      raf = requestAnimationFrame(tick)
    }

    // ── Resize via ResizeObserver ──
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      if (reduced) drawStatic()
    })
    ro.observe(container)

    // ── Cleanup completo ──
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      container.removeEventListener('pointermove', onMove)
      geometry.dispose()
      material.dispose()
      dotTexture.dispose()
      lineGeometry?.dispose()
      lineMaterial?.dispose()
      if (lineSegments) scene.remove(lineSegments)
      scene.remove(points)
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [count, accentRatio, connectLines])

  return (
    <ExperimentShell slug="14-particle-field">
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        {/* Canvas Three.js */}
        <div
          ref={containerRef}
          style={{ position: 'absolute', inset: 0 }}
          aria-hidden="true"
        />

        {/* Eyebrow + título por cima */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            padding: '64px 32px 0',
            maxWidth: 720,
          }}
        >
          <span className="lab-eyebrow">{'// EXP-14 — CAMPO DE PARTICULAS'}</span>
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
            Poeira que respira.
          </h2>
        </div>

        {/* HUD mono — coordenadas / spec, ao vivo */}
        <div
          ref={hudRef}
          style={{
            position: 'absolute',
            left: 32,
            bottom: 24,
            zIndex: 1,
            pointerEvents: 'none',
            fontFamily: 'var(--bf-font-mono)',
            fontSize: 10,
            letterSpacing: '0.1em',
            color: 'var(--lab-text-dim)',
            whiteSpace: 'pre',
          }}
        >
          {`FIELD / N=${Math.round(count)}   X 0.00  Y 0.00  Z 26.00`}
        </div>
      </div>
      {panel}
    </ExperimentShell>
  )
}
