'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ExperimentShell } from '@/components/ExperimentShell'
import { useTuner } from '@/components/Tuner'

/* EXP-12 — assinatura Hubtown: a câmera orbita devagar e revela a forma.
   Figura única ao centro, lida como ARESTAS de wireframe (EdgesGeometry +
   LineSegments) sobre uma malha fosca quase invisível. Um único nó vibrante
   no centro — o accent. OrbitControls com autoRotate + damping; arraste
   também orbita. Instrumento vivo, não demo. Params via Tuner. */

type FigureKind = 'icosaedro' | 'torus-knot' | 'monolito'

type Vals = {
  rotationSpeed: number
  figure: string
  detail: number
  accentEdges: boolean
  distance: number
}

function buildGeometry(figure: FigureKind, detail: number): THREE.BufferGeometry {
  switch (figure) {
    case 'torus-knot':
      return new THREE.TorusKnotGeometry(1.1, 0.34, 140, 18, 2, 3)
    case 'monolito':
      return new THREE.BoxGeometry(1.1, 2.6, 0.7, 1, 2, 1)
    case 'icosaedro':
    default:
      return new THREE.IcosahedronGeometry(1.6, Math.round(detail))
  }
}

export default function OrbitalFigurePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [azimuth, setAzimuth] = useState('000')

  const { values, panel } = useTuner(
    {
      rotationSpeed: { value: 0.4, min: 0, max: 2, step: 0.01, label: 'velocidade de rotação' },
      figure: {
        value: 'icosaedro',
        options: ['icosaedro', 'torus-knot', 'monolito'] as const,
        label: 'figura',
      },
      detail: { value: 1, min: 0, max: 3, step: 1, label: 'subdivisões (icosa)' },
      accentEdges: { value: false, label: 'arestas em accent' },
      distance: { value: 5.2, min: 3, max: 10, step: 0.1, label: 'raio da câmera' },
    },
    { title: '// EXP-12' },
  )

  // Ref vivo p/ os params lidos dentro do rAF sem reconstruir a cena.
  const valuesRef = useRef<Vals>(values)
  valuesRef.current = values

  // Setup estrutural: roda na montagem e quando muda figura/detail.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const width = container.clientWidth || 1
    const height = container.clientHeight || 1

    // ── Tokens em runtime — nenhum literal de cor ──
    const css = getComputedStyle(document.documentElement)
    const accent = css.getPropertyValue('--current-accent').trim()
    const lineColor = css.getPropertyValue('--bf-line-on-dark').trim()
    const steel = css.getPropertyValue('--bf-steel').trim()
    const powerBlack = css.getPropertyValue('--bf-power-black').trim()

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // ── Cena + câmera ──
    const scene = new THREE.Scene()
    // Névoa do mesmo power-black: profundidade sem fundo opaco
    scene.fog = new THREE.Fog(new THREE.Color(powerBlack), 7, 16)

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    camera.position.set(0, 1.4, valuesRef.current.distance)

    // ── Luz ambiente + direcional discreta ──
    const ambient = new THREE.AmbientLight(new THREE.Color(steel), 0.5)
    const dir = new THREE.DirectionalLight(new THREE.Color('white'), 0.6)
    dir.position.set(3, 5, 4)
    scene.add(ambient, dir)

    // ── Figura: malha fosca quase invisível + arestas nítidas ──
    const figure = valuesRef.current.figure as FigureKind
    const detail = valuesRef.current.detail
    const geo = buildGeometry(figure, detail)

    const meshMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(steel),
      roughness: 0.9,
      metalness: 0.1,
      transparent: true,
      opacity: 0.14,
    })
    const mesh = new THREE.Mesh(geo, meshMat)

    const edgesGeo = new THREE.EdgesGeometry(geo, 18)
    const edgesMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(
        valuesRef.current.accentEdges ? accent : lineColor,
      ),
      transparent: true,
      opacity: valuesRef.current.accentEdges ? 0.9 : 1,
    })
    const edges = new THREE.LineSegments(edgesGeo, edgesMat)

    const figureGroup = new THREE.Group()
    figureGroup.add(mesh, edges)
    scene.add(figureGroup)

    // ── Nó vibrante no centro — o único accent garantido ──
    const nodeGeo = new THREE.SphereGeometry(0.06, 16, 16)
    const nodeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accent) })
    const node = new THREE.Mesh(nodeGeo, nodeMat)
    scene.add(node)

    // ── OrbitControls ──
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.enablePan = false
    controls.autoRotate = !reduced
    controls.autoRotateSpeed = valuesRef.current.rotationSpeed
    controls.minDistance = 3
    controls.maxDistance = 10
    controls.target.set(0, 0, 0)
    controls.update()

    // ── Resize ──
    const resize = () => {
      const w = container.clientWidth || 1
      const h = container.clientHeight || 1
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    let lastAzimuth = ''
    const writeAzimuth = () => {
      const rad = controls.getAzimuthalAngle()
      let deg = (rad * 180) / Math.PI
      deg = ((deg % 360) + 360) % 360
      const str = String(Math.round(deg)).padStart(3, '0')
      if (str !== lastAzimuth) {
        lastAzimuth = str
        setAzimuth(str)
      }
    }

    let raf = 0
    const renderOnce = () => {
      // Câmera segue o raio tunável (live) mantendo a direção atual.
      const targetDist = valuesRef.current.distance
      const offset = camera.position.clone().sub(controls.target)
      offset.setLength(targetDist)
      camera.position.copy(controls.target).add(offset)

      controls.autoRotateSpeed = valuesRef.current.rotationSpeed

      // Cor das arestas reativa ao toggle (sem reconstruir cena)
      const wantAccent = valuesRef.current.accentEdges
      edgesMat.color.set(new THREE.Color(wantAccent ? accent : lineColor))
      edgesMat.opacity = wantAccent ? 0.9 : 1

      controls.update()
      writeAzimuth()
      renderer.render(scene, camera)
    }

    if (reduced) {
      // Estático: figura em repouso, sem loop nem autorotate.
      renderOnce()
    } else {
      const loop = () => {
        renderOnce()
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    // ── Cleanup total ──
    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      controls.dispose()
      geo.dispose()
      edgesGeo.dispose()
      nodeGeo.dispose()
      meshMat.dispose()
      edgesMat.dispose()
      nodeMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
    // Reconstrói só em mudança estrutural (figura / subdivisões).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.figure, values.detail])

  return (
    <ExperimentShell slug="12-orbital-figure">
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Palco WebGL — preenche a seção, recebe o arraste */}
        <div
          ref={containerRef}
          style={{ position: 'absolute', inset: 0 }}
          aria-hidden="true"
        />

        {/* Eyebrow + título — não bloqueia o arraste */}
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 32,
            zIndex: 2,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 560,
          }}
        >
          <span className="lab-eyebrow">{'// EXP-12 — FIGURA ORBITAL'}</span>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--bf-white)',
            }}
          >
            A camera revela a forma.
          </h2>
        </div>

        {/* HUD mono — coordenadas / spec-tag */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 32,
            zIndex: 2,
            pointerEvents: 'none',
            fontFamily: 'var(--bf-font-mono)',
            fontSize: 10,
            letterSpacing: '0.1em',
            color: 'var(--lab-text-dim)',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <span>FIG-001 / ORBIT</span>
          <span>
            AZ <span style={{ color: 'var(--lab-text)' }}>{azimuth}°</span>
          </span>
        </div>
      </section>
      {panel}
    </ExperimentShell>
  )
}
