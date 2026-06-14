'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { ExperimentShell } from '@/components/ExperimentShell'
import { useTuner } from '@/components/Tuner'

/* EXP-15 — paralaxe REAL com PerspectiveCamera (ref. Hubtown).
   Distinto do EXP-09 (DOM/SVG plano): aqui as camadas de grafismo
   técnico flutuam em Z diferentes; o cursor desloca a câmera e cada
   camada se move num ritmo aparente próprio — profundidade de verdade.
   Câmera olha por -Z. Lerp por quadro. Instrumento vivo, não demo. */

type LayerKind = 'dots' | 'rings' | 'hairlines' | 'crosshair'

const LAYER_ORDER: LayerKind[] = ['dots', 'rings', 'hairlines', 'crosshair']

function readColors() {
  const css = getComputedStyle(document.documentElement)
  const line = css.getPropertyValue('--bf-line-on-dark').trim()
  const accent = css.getPropertyValue('--current-accent').trim()
  const black = css.getPropertyValue('--bf-power-black').trim()
  return {
    line: new THREE.Color(line || '#cfd9e3'),
    accent: new THREE.Color(accent || '#f0535e'),
    black: new THREE.Color(black || '#061015'),
  }
}

/* Camada funda — grade esparsa de pontos */
function buildDots(line: THREE.Color): THREE.Object3D {
  const cols = 14
  const rows = 9
  const stepX = 4.4
  const stepY = 4.2
  const positions: number[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      positions.push((c - (cols - 1) / 2) * stepX, (r - (rows - 1) / 2) * stepY, 0)
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  const mat = new THREE.PointsMaterial({
    color: line,
    size: 1.4,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.85,
  })
  return new THREE.Points(geo, mat)
}

/* Camada órbitas — anéis grandes + ticks */
function buildRings(line: THREE.Color): THREE.Object3D {
  const group = new THREE.Group()
  const mat = new THREE.LineBasicMaterial({ color: line, transparent: true, opacity: 0.8 })

  for (const radius of [18, 12]) {
    const pts: THREE.Vector3[] = []
    const seg = 128
    for (let i = 0; i <= seg; i++) {
      const a = (i / seg) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    group.add(new THREE.Line(geo, mat))
  }

  // Ticks na órbita externa (16 posições)
  const tickPts: THREE.Vector3[] = []
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2
    tickPts.push(new THREE.Vector3(Math.cos(a) * 17.4, Math.sin(a) * 17.4, 0))
    tickPts.push(new THREE.Vector3(Math.cos(a) * 18.6, Math.sin(a) * 18.6, 0))
  }
  const tickGeo = new THREE.BufferGeometry().setFromPoints(tickPts)
  group.add(new THREE.LineSegments(tickGeo, mat))
  return group
}

/* Camada hairlines — linhas finas + polyline esquemática */
function buildHairlines(line: THREE.Color): THREE.Object3D {
  const group = new THREE.Group()
  const mat = new THREE.LineBasicMaterial({ color: line, transparent: true, opacity: 0.7 })

  const segPts = [
    new THREE.Vector3(-22, 0, 0),
    new THREE.Vector3(-7, 0, 0),
    new THREE.Vector3(7, 0, 0),
    new THREE.Vector3(22, 0, 0),
  ]
  const segGeo = new THREE.BufferGeometry().setFromPoints(segPts)
  group.add(new THREE.LineSegments(segGeo, mat))

  const polyPts = [
    new THREE.Vector3(4, 10, 0),
    new THREE.Vector3(10, 16, 0),
    new THREE.Vector3(20, 16, 0),
  ]
  const polyGeo = new THREE.BufferGeometry().setFromPoints(polyPts)
  group.add(new THREE.Line(polyGeo, mat))

  const poly2Pts = [
    new THREE.Vector3(-20, -14, 0),
    new THREE.Vector3(-11, -14, 0),
    new THREE.Vector3(-5, -8, 0),
  ]
  const poly2Geo = new THREE.BufferGeometry().setFromPoints(poly2Pts)
  group.add(new THREE.Line(poly2Geo, mat))
  return group
}

/* Camada frente — crosshair + nó vibrante (o único accent) */
function buildCrosshair(line: THREE.Color, accent: THREE.Color): THREE.Object3D {
  const group = new THREE.Group()
  const mat = new THREE.LineBasicMaterial({ color: line, transparent: true, opacity: 0.9 })

  const crossPts = [
    new THREE.Vector3(0, 2.4, 0),
    new THREE.Vector3(0, 6, 0),
    new THREE.Vector3(0, -2.4, 0),
    new THREE.Vector3(0, -6, 0),
    new THREE.Vector3(-6, 0, 0),
    new THREE.Vector3(-2.4, 0, 0),
    new THREE.Vector3(2.4, 0, 0),
    new THREE.Vector3(6, 0, 0),
  ]
  const crossGeo = new THREE.BufferGeometry().setFromPoints(crossPts)
  group.add(new THREE.LineSegments(crossGeo, mat))

  const ringPts: THREE.Vector3[] = []
  const seg = 64
  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * Math.PI * 2
    ringPts.push(new THREE.Vector3(Math.cos(a) * 1.6, Math.sin(a) * 1.6, 0))
  }
  const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts)
  group.add(new THREE.Line(ringGeo, mat))

  // Nó vibrante — o único colorido da composição
  const nodeGeo = new THREE.SphereGeometry(0.5, 16, 16)
  const nodeMat = new THREE.MeshBasicMaterial({ color: accent })
  group.add(new THREE.Mesh(nodeGeo, nodeMat))
  return group
}

function disposeObject(obj: THREE.Object3D) {
  obj.traverse((child) => {
    const mesh = child as THREE.Mesh & { geometry?: THREE.BufferGeometry; material?: THREE.Material }
    if (mesh.geometry) mesh.geometry.dispose()
    if (mesh.material) {
      const m = mesh.material as THREE.Material | THREE.Material[]
      if (Array.isArray(m)) m.forEach((mm) => mm.dispose())
      else m.dispose()
    }
  })
}

export default function DepthParallaxPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { values, panel } = useTuner(
    {
      parallaxStrength: { value: 0.7, min: 0, max: 1.5, step: 0.01, label: 'paralaxe' },
      layerSpacing: { value: 6, min: 1, max: 12, step: 0.5, label: 'espaçamento Z' },
      damping: { value: 0.08, min: 0.02, max: 0.3, step: 0.01, label: 'amortecimento' },
      layerCount: { value: 4, min: 2, max: 5, step: 1, label: 'nº de camadas' },
      depthFog: { value: true, label: 'névoa de profundidade' },
    },
    { title: '// EXP-15' },
  )

  // Ref de valores lidos ao vivo no rAF (params suaves sem rebuild)
  const valuesRef = useRef(values)
  valuesRef.current = values

  // Rebuild estrutural só quando muda o nº de camadas
  const layerCount = values.layerCount

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const colors = readColors()

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      400,
    )
    camera.position.set(0, 0, 60)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)
    renderer.domElement.style.display = 'block'

    // Constrói o nº de camadas pedido, da funda (índice 0) à frente
    const count = Math.max(2, Math.min(5, layerCount))
    const kinds = LAYER_ORDER.slice(0, count)
    // Garante que a camada da frente seja sempre o crosshair (com accent)
    if (!kinds.includes('crosshair')) kinds[kinds.length - 1] = 'crosshair'

    const layers: { group: THREE.Object3D; depth: number }[] = []
    kinds.forEach((kind, i) => {
      let obj: THREE.Object3D
      if (kind === 'dots') obj = buildDots(colors.line)
      else if (kind === 'rings') obj = buildRings(colors.line)
      else if (kind === 'hairlines') obj = buildHairlines(colors.line)
      else obj = buildCrosshair(colors.line, colors.accent)
      scene.add(obj)
      // depth normalizado: 0 = fundo (move pouco), 1 = frente (move muito)
      const depth = count > 1 ? i / (count - 1) : 1
      layers.push({ group: obj, depth })
    })

    const positionLayers = (spacing: number, fogOn: boolean) => {
      const n = layers.length
      layers.forEach((l, i) => {
        // funda mais distante (Z muito negativo), frente perto de 0
        const z = -(n - 1 - i) * spacing
        l.group.position.z = z
      })
      if (fogOn) {
        scene.fog = new THREE.Fog(colors.black, 50, 130)
      } else {
        scene.fog = null
      }
    }
    positionLayers(valuesRef.current.layerSpacing, valuesRef.current.depthFog)

    // Alvo do cursor, normalizado -0.5..0.5
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      target.x = (e.clientX - rect.left) / rect.width - 0.5
      target.y = (e.clientY - rect.top) / rect.height - 0.5
    }
    if (!reduced) container.addEventListener('pointermove', onMove)

    let raf = 0
    const renderOnce = () => renderer.render(scene, camera)

    const tick = () => {
      const v = valuesRef.current
      // re-posiciona camadas ao vivo (espaçamento / névoa)
      positionLayers(v.layerSpacing, v.depthFog)

      // lerp do cursor com amortecimento tunável
      const damp = v.damping
      current.x += (target.x - current.x) * damp
      current.y += (target.y - current.y) * damp

      // Câmera desloca; cada camada, por estar em Z diferente, exibe
      // ritmo aparente próprio (paralaxe de perspectiva real)
      const reach = 24 * v.parallaxStrength
      camera.position.x = current.x * reach
      camera.position.y = -current.y * reach
      camera.lookAt(0, 0, 0)

      // micro-reforço por camada: a frente desloca um pouco mais
      layers.forEach((l) => {
        const extra = 2.5 * v.parallaxStrength * l.depth
        l.group.position.x = current.x * extra
        l.group.position.y = -current.y * extra
      })

      renderOnce()
      raf = requestAnimationFrame(tick)
    }

    if (reduced) {
      renderOnce()
    } else {
      raf = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(() => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderOnce()
    })
    ro.observe(container)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      container.removeEventListener('pointermove', onMove)
      layers.forEach((l) => {
        scene.remove(l.group)
        disposeObject(l.group)
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [layerCount])

  const hudStyle: React.CSSProperties = {
    position: 'absolute',
    fontFamily: 'var(--bf-font-mono)',
    fontSize: 10,
    letterSpacing: '0.1em',
    color: 'var(--lab-text-dim)',
    pointerEvents: 'none',
    zIndex: 2,
  }

  return (
    <ExperimentShell slug="15-depth-parallax">
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
        }}
      >
        {/* Canvas Three.js — preenche o palco */}
        <div
          ref={containerRef}
          style={{ position: 'absolute', inset: 0 }}
          aria-hidden="true"
        />

        {/* HUD mono — spec-tags espalhadas (como EXP-09) */}
        <span style={{ ...hudStyle, top: 24, right: 32 }}>BF-077</span>
        <span style={{ ...hudStyle, bottom: 28, left: 32 }}>TRACK</span>
        <span style={{ ...hudStyle, bottom: 28, right: 32 }}>45.4408° N</span>
        <span style={{ ...hudStyle, top: 24, left: 32 }}>FIG-001 · Z-STACK</span>

        {/* Texto de entrada por cima */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            padding: '0 32px',
            maxWidth: 760,
            minHeight: '100vh',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span className="lab-eyebrow">{'// EXP-15 — PROFUNDIDADE'}</span>
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
            Camadas reais, profundidade real.
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
            Mexa o mouse: a câmera de perspectiva desliza e cada camada de
            grafismo, num Z diferente, responde no seu próprio ritmo aparente.
            A grade funda quase parada; o crosshair da frente acompanha mais —
            paralaxe de profundidade de verdade, não plano.
          </p>
        </div>
      </div>
      {panel}
    </ExperimentShell>
  )
}
