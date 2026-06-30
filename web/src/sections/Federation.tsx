import '../styles/federation.css'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

/** source nodes fanned on the left, all storage role (cyan) */
const SOURCES = [
  { name: 'PostgreSQL', sub: 'base', cy: 40 },
  { name: 'Hive · Hadoop', sub: 'Kerberos', cy: 122 },
  { name: 'Iceberg · Polaris', sub: 'lakehouse', cy: 210 },
  { name: 'Fichiers', sub: 'CSV · Parquet', cy: 298 },
  { name: 'tpch', sub: 'benchmark', cy: 380 },
]

const TRINO = { x: 268, y: 176, w: 134, h: 68 }
const TRINO_LEFT = { x: 268, y: 210 }

export default function Federation() {
  const reduce = useReducedMotion()

  const edgesWrap: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.16, delayChildren: 0.3 } },
  }
  const edge: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 0.7, ease: EASE } },
  }

  const deviceMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, rotateY: -22, rotateX: 6, y: 34 },
        whileInView: { opacity: 1, rotateY: -9, rotateX: 3, y: 0 },
        viewport: { once: true, margin: '-80px' } as const,
        transition: { duration: 0.9, ease: EASE },
      }

  return (
    <section className="fed" id="federation">
      <div className="shell">
        <motion.div
          className="fed__head"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="eyebrow">Fédération</span>
          <h2 className="fed__title">
            Un seul moteur SQL sur <span className="grad-text">toutes vos sources</span>.
          </h2>
          <p className="fed__body">
            Trino interroge entrepôts, fichiers et bases ensemble, sans déplacer la donnée.
            Un lakehouse au format ouvert Iceberg, lisible par tous les moteurs. Ajout d'une
            source à chaud, depuis l'interface.
          </p>
        </motion.div>

        <div className="fed__grid">
          {/* ---- the hub schema ---- */}
          <div className="fed__hub">
            <svg
              className="fed__svg"
              viewBox="0 0 460 420"
              role="img"
              aria-label="Trino, un moteur SQL unique, interroge cinq sources (PostgreSQL, Hive Hadoop, Iceberg Polaris, fichiers et tpch) par une seule porte, sans déplacer la donnée."
            >
              <defs>
                <linearGradient id="fed-edge" x1="0" y1="0" x2="460" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4dd4e5" />
                  <stop offset="1" stopColor="#7c5cff" />
                </linearGradient>
                <linearGradient id="fed-trino" x1="268" y1="176" x2="402" y2="244" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7c5cff" />
                  <stop offset="1" stopColor="#4dd4e5" />
                </linearGradient>
                <filter id="fed-glow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="6" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* converging edges draw on scroll, one after another */}
              <motion.g
                variants={reduce ? undefined : edgesWrap}
                initial={reduce ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
              >
                {SOURCES.map((s) => (
                  <motion.line
                    key={s.name}
                    x1={142}
                    y1={s.cy}
                    x2={TRINO_LEFT.x}
                    y2={TRINO_LEFT.y}
                    stroke="url(#fed-edge)"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    variants={reduce ? undefined : edge}
                  />
                ))}
              </motion.g>

              {/* source chips */}
              {SOURCES.map((s) => (
                <g key={s.name}>
                  <rect className="fed-node__chip" x={12} y={s.cy - 22} width={130} height={44} rx={11} />
                  <rect className="fed-node__bar" x={12} y={s.cy - 22} width={4} height={44} rx={2} />
                  <text className="fed-node__label" x={28} y={s.cy - 1}>{s.name}</text>
                  <text className="fed-node__sub" x={28} y={s.cy + 13}>{s.sub}</text>
                </g>
              ))}

              {/* the single door: Trino → out to the right */}
              <line x1={402} y1={210} x2={456} y2={210} stroke="url(#fed-trino)" strokeWidth={3.5} strokeLinecap="round" />
              <line className="fed-door" x1={402} y1={210} x2={456} y2={210} stroke="#0a0c16" strokeWidth={2} strokeLinecap="round" opacity={reduce ? 0 : 0.5} />
              <path d="M450 204 L458 210 L450 216" fill="none" stroke="url(#fed-trino)" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />

              {/* Trino central node: the single SQL door */}
              <motion.g
                initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
                style={{ transformOrigin: '334px 210px' }}
              >
                <rect
                  x={TRINO.x} y={TRINO.y} width={TRINO.w} height={TRINO.h} rx={16}
                  fill="url(#fed-trino)" filter="url(#fed-glow)"
                />
                <text className="fed-trino__label" x={334} y={206} textAnchor="middle">Trino</text>
                <text className="fed-trino__sub" x={334} y={224} textAnchor="middle">UNE PORTE SQL</text>
              </motion.g>
            </svg>

            <div className="fed__legend" aria-hidden>
              <span className="fed-leg">
                <span className="fed-leg__dot" style={{ background: 'var(--c-engine)' }} />
                moteur · Trino
              </span>
              <span className="fed-leg">
                <span className="fed-leg__dot" style={{ background: 'var(--c-storage)' }} />
                sources · stockage
              </span>
              <span className="fed-leg">une seule porte SQL · sans déplacer la donnée</span>
            </div>
          </div>

          {/* ---- tilted device frame ---- */}
          <div>
            <div className="fed__device-wrap">
              <motion.div className="fed__device" {...deviceMotion}>
                <div className="fed__chrome">
                  <i /><i /><i />
                  <span>cockpit · catalogue fédéré</span>
                </div>
                <img
                  className="fed__shot"
                  src="/shots/catalog-federation.png"
                  alt="Cockpit AKKO : catalogue fédéré listant les sources connectées et leurs catalogues Trino."
                  loading="lazy"
                />
              </motion.div>
            </div>
            <p className="fed__cap">Ajout d'une source à chaud, depuis l'interface</p>
          </div>
        </div>
      </div>
    </section>
  )
}
