import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useContent } from '../i18n/lang'
import Frame from '../components/Frame'
import Reveal from '../components/Reveal'
import BlasonChip from '../components/BlasonChip'
import '../styles/flagships.css'

const EASE = [0.22, 1, 0.36, 1] as const

/* each layer role maps to exactly one of the 5 cloisonnée hues (never mixed) */
const HUE: Record<string, string> = {
  engine: 'var(--c-engine)',
  gov: 'var(--c-gov)',
  storage: 'var(--c-storage)',
  ai: 'var(--c-ai)',
  science: 'var(--c-science)',
}

/** small lock — the governance signal on each layer's "what changes" line */
function LockMark() {
  return (
    <svg className="flag__lock" width="13" height="14" viewBox="0 0 13 14" fill="none" aria-hidden>
      <rect x="1.6" y="6" width="9.8" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3.7 6V4a2.8 2.8 0 0 1 5.6 0v2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

export default function Flagships() {
  const t = useContent()
  const items = t.flags.items
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [shot, setShot] = useState(0)

  const cur = items[active] ?? items[0]
  const view = cur.shots[Math.min(shot, cur.shots.length - 1)] ?? cur.shots[0]
  const hue = HUE[cur.role] ?? 'var(--accent)'

  const selectLayer = (i: number) => {
    setActive(i)
    setShot(0)
  }

  return (
    <section className="section section--alt flag" id="produit">
      <div className="shell">
        <Reveal className="flag__head">
          <span className="eyebrow">{t.flags.eyebrow}</span>
          <h2 className="heading flag__title">
            {t.flags.titleA}
            <span className="accent-text">{t.flags.grad}</span>
            {t.flags.titleB}
          </h2>
        </Reveal>

        {/* layer selector — each tab carries its layer's blason-chip; the five
            hues appear together here (the sanctioned overview), one per tab */}
        <Reveal className="flag__tabs" role="tablist" aria-label={t.flags.eyebrow} delay={0.05}>
          {items.map((f, i) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={i === active}
              className={`flag__tab${i === active ? ' is-active' : ''}`}
              style={{ '--layer': HUE[f.role] ?? 'var(--accent)' } as React.CSSProperties}
              onClick={() => selectLayer(i)}
            >
              <BlasonChip size={15} tint={HUE[f.role] ?? 'var(--accent)'} muted={i !== active} />
              <span className="flag__tab-l">{f.tab}</span>
            </button>
          ))}
        </Reveal>

        <div className="flag__board" style={{ '--layer': hue } as React.CSSProperties}>
          {/* editorial copy for the active layer */}
          <AnimatePresence mode="wait">
            <motion.div
              className="flag__copy"
              key={cur.key}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.34, ease: EASE }}
            >
              <span className="flag__tag">{cur.layer}</span>
              <h3 className="flag__h3">{cur.title}</h3>
              <p className="flag__body">{cur.body}</p>
              <p className="flag__change">
                <span className="flag__change-mark" aria-hidden>
                  <LockMark />
                </span>
                {cur.change}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* the product — hero of each layer */}
          <div className="flag__stage">
            <AnimatePresence mode="wait">
              <motion.div
                className="flag__shot"
                key={view.src}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <Frame
                  src={view.src}
                  label={view.chrome}
                  ratio="16 / 10"
                  tint={hue}
                  piece={active + 1}
                />
              </motion.div>
            </AnimatePresence>

            {cur.shots.length > 1 && (
              <div className="flag__views" role="tablist" aria-label={cur.layer}>
                {cur.shots.map((s, j) => (
                  <button
                    key={s.src + j}
                    role="tab"
                    aria-selected={j === shot}
                    className={`flag__view${j === shot ? ' is-active' : ''}`}
                    onClick={() => setShot(j)}
                  >
                    <img src={s.src} alt="" loading="lazy" decoding="async" />
                    <span className="flag__view-l">{s.chrome}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
