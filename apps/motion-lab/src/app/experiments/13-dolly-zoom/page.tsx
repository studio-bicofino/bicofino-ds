'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ExperimentShell } from '@/components/ExperimentShell'
import { useTuner } from '@/components/Tuner'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/* EXP-13 — Dolly: aproximação no scroll (ref. Hubtown).
   Corredor de anéis concêntricos recuando em -Z. O scroll faz a câmera
   avançar através deles (dolly). Névoa power-black come os anéis distantes
   → profundidade. Toggle dolly-zoom (vertigo): o fov muda inverso ao avanço,
   o assunto mantém tamanho enquanto a perspectiva se deforma. */

const RING_RADIUS = 3.2
const RING_GAP = 4 // distância -Z entre anéis
const ACCENT_EVERY = 4 // nó accent a cada N anéis

export default function DollyZoomPage() {
  const mountRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  const { values, panel } = useTuner(
    {
      travelDepth: { value: 48, min: 16, max: 100, step: 1, label: 'avanço (z)' },
      fov: { value: 55, min: 30, max: 90, step: 1, label: 'fov (°)' },
      dollyZoom: { value: false, label: 'dolly-zoom (vertigo)' },
      ringCount: { value: 16, min: 6, max: 30, step: 1, label: 'anéis (rebuild)' },
      fog: { value: true, label: 'névoa' },
    },
    { title: '// EXP-13' },
  )

  // valores lidos ao vivo dentro do rAF / scroll
  const valuesRef = useRef(values)
  valuesRef.current = values

  // progresso do scroll 0..1 (atualizado pelo ScrollTrigger; ref p/ o loop)
  const progressRef = useRef(0)
  const [progressHud, setProgressHud] = useState(0)

  // câmera viva entre efeitos (lida pelo useGSAP)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const baseFovRef = useRef(55)

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* ── Three.js: setup + rAF loop. Rebuild só em mudança estrutural (ringCount). ── */
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const css = getComputedStyle(document.documentElement)
    const accent = css.getPropertyValue('--current-accent').trim()
    const lineCol = css.getPropertyValue('--bf-line-on-dark').trim() || '#cfd8e0'
    const powerBlack = css.getPropertyValue('--bf-power-black').trim() || '#061015'

    const scene = new THREE.Scene()
    const fogColor = new THREE.Color(powerBlack)

    const camera = new THREE.PerspectiveCamera(
      valuesRef.current.fov,
      mount.clientWidth / Math.max(1, mount.clientHeight),
      0.1,
      300,
    )
    baseFovRef.current = valuesRef.current.fov
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    // ── Corredor de anéis ──
    const count = Math.round(valuesRef.current.ringCount)
    const group = new THREE.Group()
    scene.add(group)

    const disposables: { dispose(): void }[] = []

    const lineMat = new THREE.LineBasicMaterial({ color: new THREE.Color(lineCol) })
    const accentMat = new THREE.LineBasicMaterial({ color: new THREE.Color(accent) })
    const nodeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accent) })
    disposables.push(lineMat, accentMat, nodeMat)

    // geometria de anel (LineLoop) reutilizada
    const segs = 64
    const ringPts: THREE.Vector3[] = []
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2
      ringPts.push(new THREE.Vector3(Math.cos(a) * RING_RADIUS, Math.sin(a) * RING_RADIUS, 0))
    }
    const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts)
    disposables.push(ringGeo)

    const nodeGeo = new THREE.SphereGeometry(0.08, 12, 12)
    disposables.push(nodeGeo)

    const corridorLength = (count - 1) * RING_GAP

    for (let i = 0; i < count; i++) {
      const z = -i * RING_GAP
      const isAccent = i % ACCENT_EVERY === 0

      const loop = new THREE.LineLoop(ringGeo, isAccent ? accentMat : lineMat)
      loop.position.z = z
      group.add(loop)

      // nó accent no topo de cada anel marcado — o único vibrante
      if (isAccent) {
        const node = new THREE.Mesh(nodeGeo, nodeMat)
        node.position.set(0, RING_RADIUS, z)
        group.add(node)
      }
    }

    // câmera começa antes do primeiro anel, olhando para -Z
    const startZ = 6
    camera.position.set(0, 0, startZ)
    camera.lookAt(0, 0, -corridorLength)

    const applyCamera = () => {
      const v = valuesRef.current
      const p = reduced ? 0.5 : progressRef.current
      // avanço: de startZ até startZ - travelDepth
      camera.position.z = startZ - p * v.travelDepth

      if (v.dollyZoom) {
        // vertigo: fov diminui conforme avança (perspectiva "achata")
        camera.fov = THREE.MathUtils.lerp(v.fov, v.fov * 0.45, p)
      } else {
        camera.fov = v.fov
      }
      camera.updateProjectionMatrix()
    }

    const applyFog = () => {
      scene.fog = valuesRef.current.fog
        ? new THREE.Fog(fogColor, RING_GAP * 1.5, corridorLength + 12)
        : null
    }
    applyFog()
    applyCamera()

    let raf = 0
    let lastFog = valuesRef.current.fog
    const render = () => {
      if (valuesRef.current.fog !== lastFog) {
        applyFog()
        lastFog = valuesRef.current.fog
      }
      applyCamera()
      renderer.render(scene, camera)
      if (!reduced) raf = requestAnimationFrame(render)
    }
    if (reduced) {
      render() // um frame estático no meio do corredor
    } else {
      raf = requestAnimationFrame(render)
    }

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth
      const h = Math.max(1, mount.clientHeight)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      if (reduced) render()
    })
    ro.observe(mount)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      ringGeo.dispose()
      nodeGeo.dispose()
      lineMat.dispose()
      accentMat.dispose()
      nodeMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
      cameraRef.current = null
    }
    // rebuild SÓ na contagem de anéis (estrutural). fov/fog/dolly/depth são lidos ao vivo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.ringCount, reduced])

  /* ── ScrollTrigger: pin + scrub do progresso 0..1 ── */
  useGSAP(
    () => {
      const stage = stageRef.current
      if (!stage || reduced) return

      const st = ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: 'bottom bottom',
        pin: stage.querySelector('.exp13-pin'),
        scrub: 0.6,
        onUpdate: (self) => {
          progressRef.current = self.progress
          setProgressHud(self.progress)
        },
      })

      return () => st.kill()
    },
    { scope: stageRef, dependencies: [reduced] },
  )

  const pct = (reduced ? 50 : progressHud * 100).toFixed(1).padStart(4, '0')

  return (
    <ExperimentShell slug="13-dolly-zoom">
      <div ref={stageRef} style={{ height: '320vh' }}>
        <div
          className="exp13-pin"
          style={{
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* canvas Three.js */}
          <div
            ref={mountRef}
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0 }}
          />

          {/* texto de entrada */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              padding: '0 32px',
              maxWidth: 720,
              pointerEvents: 'none',
            }}
          >
            <span className="lab-eyebrow">{'// EXP-13 — APROXIMAÇÃO'}</span>
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
              O scroll te leva pra dentro.
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
              Role: a câmera avança pelo corredor de anéis, a névoa power-black
              come a distância. Ligue o dolly-zoom para a vertigem — o assunto
              segura o tamanho enquanto a perspectiva se deforma.
            </p>
          </div>

          {/* HUD mono */}
          <div
            style={{
              position: 'absolute',
              left: 32,
              bottom: 28,
              fontFamily: 'var(--bf-font-mono)',
              fontSize: 10,
              letterSpacing: '0.1em',
              color: 'var(--lab-text-dim)',
              pointerEvents: 'none',
            }}
          >
            <div>FIG-013 · CORRIDOR</div>
            <div>DEPTH {pct}%</div>
          </div>
        </div>
      </div>
      {panel}
    </ExperimentShell>
  )
}
