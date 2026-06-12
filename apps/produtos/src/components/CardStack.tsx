'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { IphoneFrame } from './IphoneFrame'
import { MacbookFrame } from './MacbookFrame'
import { produtos } from '@/lib/produtos'
import { fmtBRL, fmtFaixa } from '@/lib/format'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/* Card stack no scroll — portado do motion-lab EXP-10 com os valores calibrados
   no tuner (scrub 1 · recuo 0.05 · offset topo 24px · 100% de scroll por card ·
   snap). Container pinado; cada card entra de baixo e o deck recua em escala.
   Roda em qualquer viewport com motion permitido — em reduced-motion os cards
   fluem como lista normal (gsap.matchMedia + CSS com a mesma media query).
   No mobile o card ganha dimensionamento próprio (92svh, padding menor,
   mockups reduzidos) e overflow-y auto como válvula de segurança. */

const STACK_MEDIA = '(prefers-reduced-motion: no-preference)'
const SCRUB = 1
const STEP = 0.05 // recuo de escala por profundidade
const OFFSET = 24 // px de topo entre cards assentados
const DISTANCIA = 100 // % de scroll por card

/* basePath '/produtos': <img> puro não ganha o prefixo automático do Next */
const BASE = '/produtos'

export function CardStack() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(STACK_MEDIA, () => {
        const stage = containerRef.current?.querySelector<HTMLElement>('.pstack-stage')
        const cards = gsap.utils.toArray<HTMLElement>('.pstack-card')
        if (!stage || cards.length === 0) return

        const total = cards.length
        const entries = total - 1

        cards.forEach((card, i) => {
          gsap.set(card, {
            y: OFFSET * i,
            yPercent: i === 0 ? 0 : 120,
            transformOrigin: 'center top',
          })
        })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: `+=${total * DISTANCIA}%`,
            pin: true,
            scrub: SCRUB,
            snap: 1 / entries,
          },
        })

        for (let i = 1; i < total; i++) {
          tl.to(cards[i], { yPercent: 0, duration: 1 }, i - 1)
          for (let j = 0; j < i; j++) {
            const depth = i - j
            tl.to(
              cards[j],
              { scale: 1 - STEP * depth, y: OFFSET * j - depth * 4, duration: 1 },
              i - 1,
            )
          }
        }

        ScrollTrigger.refresh()
      })
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef}>
      <div className="pstack-stage">
        {produtos.map((p) => (
          <article key={p.id} className="cell pstack-card" style={{ display: 'flex', gap: 'var(--sp-6)', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                <h3 className="bf-h3">
                  {p.nome}
                  {p.modulo && (
                    <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)', marginLeft: 'var(--sp-2)' }}>
                      // módulo da Fábrica de stories
                    </span>
                  )}
                </h3>
                <p className="bf-body-sm" style={{ margin: 0, maxWidth: 560 }}>{p.pitch}</p>
              </div>

              <div style={{ display: 'flex', gap: 'var(--sp-6)', flexWrap: 'wrap' }}>
                <Metric
                  k="Faixa de mercado"
                  v={fmtFaixa(p.mercado.min, p.mercado.max)}
                  sub={p.mercado.porEntrega ? 'por entrega, em agência' : 'encomenda equivalente, BR'}
                />
                <Metric
                  k="Prazo no mercado"
                  v={`${p.mercado.prazoSemanas} sem${p.mercado.prazoSemanas > 1 ? 'anas' : 'ana'}`}
                  sub={p.mercado.porEntrega ? 'cada entrega' : 'da encomenda ao entregue'}
                />
                <Metric k="Operação do cliente" v={p.infraMensal} sub="assinaturas e ferramentas" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
                {p.infra.map((item) => (
                  <span key={item.nome} className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)' }}>
                    · {item.nome} — {item.custo}
                  </span>
                ))}
                {p.infraNota && (
                  <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)' }}>
                    · {p.infraNota}
                  </span>
                )}
              </div>

              <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-secondary)', marginTop: 'auto' }}>
                // prova — {p.prova}
              </span>
            </div>

            <div
              className="produto-aside"
              style={{
                flex: '0 1 340px',
                minWidth: 240,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-4)',
              }}
            >
              <span className="pill pill--accent" style={{ whiteSpace: 'nowrap' }}>
                {fmtBRL(p.mercado.medio)}{p.mercado.porEntrega ? ' por entrega' : ' no mercado'}
              </span>
              {p.tela &&
                (p.telaFrame === 'iphone' ? (
                  <div className="tela-iphone">
                    <IphoneFrame src={`${BASE}${p.tela}`} alt={`Tela do produto ${p.nome}`} />
                  </div>
                ) : (
                  <div className="tela-macbook">
                    <MacbookFrame src={`${BASE}${p.tela}`} alt={`Tela do produto ${p.nome}`} />
                  </div>
                ))}
            </div>
          </article>
        ))}
      </div>

      <style>{`
        /* fluxo normal (reduced-motion): lista empilhada */
        .pstack-stage { display: grid; gap: var(--sp-4); }
        .tela-iphone { width: min(200px, 100%); }
        .tela-macbook { width: 100%; }

        @media ${STACK_MEDIA} {
          .pstack-stage {
            display: block;
            position: relative;
            height: 100svh;
            overflow: hidden;
          }
          .pstack-card {
            position: absolute;
            top: 6svh;
            /* centralização sem transform — o transform é todo do GSAP */
            left: 0;
            right: 0;
            margin-inline: auto;
            width: min(1080px, 94vw);
            height: min(640px, 82svh);
            overflow: hidden;
            will-change: transform;
            background: var(--bf-bg-page);
          }
        }

        /* mobile dentro do stack: card mais alto, respiro menor, mockups
           reduzidos; overflow-y auto segura conteúdo que ainda passar */
        @media (max-width: 899px) and ${STACK_MEDIA} {
          .pstack-card {
            top: 2svh;
            height: 92svh;
            padding: var(--sp-4);
            overflow-y: auto;
            gap: var(--sp-4);
          }
          .pstack-card .tela-iphone { width: min(150px, 100%); }
          .pstack-card .tela-macbook { width: min(280px, 100%); }
        }
      `}</style>
    </div>
  )
}

function Metric({ k, v, sub }: { k: string; v: string; sub: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
      <span className="bf-eyebrow">{k}</span>
      <span className="bignum" style={{ fontSize: '1.5rem' }}>{v}</span>
      <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)' }}>{sub}</span>
    </div>
  )
}
