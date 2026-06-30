import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useContent } from '../i18n/lang'
import '../styles/flagships.css'

const PER_IMAGE_MS = 3800

const stageVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 70 : -70 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -70 : 70 }),
}

export default function Flagships() {
  const t = useContent()
  const items = t.flags.items
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [shot, setShot] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const timer = useRef<number | null>(null)

  const cur = items[active] ?? items[0]

  const goLayer = (i: number, d?: number) => {
    const ni = ((i % items.length) + items.length) % items.length
    setDir(d ?? (ni > active ? 1 : -1))
    setActive(ni)
    setShot(0)
  }

  // auto-tour: advance through each screen of a layer, then roll to the next layer
  useEffect(() => {
    if (paused || reduce) return
    const layer = items[active] ?? items[0]
    timer.current = window.setTimeout(() => {
      setDir(1)
      if (shot < layer.shots.length - 1) {
        setShot(shot + 1)
      } else {
        setActive((active + 1) % items.length)
        setShot(0)
      }
    }, PER_IMAGE_MS)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [active, shot, paused, reduce, items])

  const view = cur.shots[Math.min(shot, cur.shots.length - 1)]

  return (
    <section className={`flg flg--${cur.role}`} id="produit">
      <div className="shell">
        <div className="flg__head">
          <span className="eyebrow">{t.flags.eyebrow}</span>
          <h2 className="flg__title">
            {t.flags.titleA}
            <span className="grad-text">{t.flags.grad}</span>
            {t.flags.titleB}
          </h2>
        </div>

        {/* layer tabs */}
        <div className="flg__tabs" role="tablist" aria-label="Couches phares">
          {items.map((f, i) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={i === active}
              className={`flg__tab${i === active ? ' is-active' : ''}`}
              onClick={() => goLayer(i)}
            >
              <span className="flg__tab-i">{String(i + 1).padStart(2, '0')}</span>
              {f.tab}
            </button>
          ))}
        </div>

        <div
          className="flg__board"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* compact meta */}
          <AnimatePresence mode="wait">
            <motion.div
              className="flg__meta"
              key={cur.key}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flg__meta-l">
                <span className="flg__tag">{cur.layer}</span>
                <h3 className="flg__h3">{cur.title}</h3>
              </div>
              <div className="flg__meta-r">
                <p className="flg__body">{cur.body}</p>
                <p className="flg__change">
                  <span className="flg__change-dot" aria-hidden />
                  {cur.change}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* big screen stage */}
          <div className="flg__stage">
            <div className="flg__halo" aria-hidden />
            <AnimatePresence mode="popLayout" custom={dir}>
              <motion.figure
                className="flg__frame"
                key={`${cur.key}-${shot}`}
                custom={dir}
                variants={reduce ? undefined : stageVariants}
                initial={reduce ? false : 'enter'}
                animate="center"
                exit={reduce ? undefined : 'exit'}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flg__bar">
                  <span /><span /><span />
                  <em>{view.chrome}</em>
                </div>
                <img src={view.src} alt={`${cur.layer} : ${view.chrome}`} />
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* footer: thumbnails + controls */}
          <div className="flg__footer">
            <div className="flg__thumbs">
              {cur.shots.length > 1 &&
                cur.shots.map((s, j) => (
                  <button
                    key={s.src + j}
                    className={`flg__thumb${j === shot ? ' is-active' : ''}`}
                    onClick={() => setShot(j)}
                    aria-label={s.chrome}
                  >
                    <img src={s.src} alt="" loading="lazy" />
                    {j === shot && !reduce && !paused && (
                      <motion.span
                        className="flg__thumb-prog"
                        key={`tp-${active}-${shot}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: PER_IMAGE_MS / 1000, ease: 'linear' }}
                      />
                    )}
                  </button>
                ))}
            </div>
            <div className="flg__controls">
              <button className="flg__arrow" onClick={() => goLayer(active - 1, -1)} aria-label="Couche précédente">←</button>
              <span className="flg__count">
                <b>{String(active + 1).padStart(2, '0')}</b> / {String(items.length).padStart(2, '0')}
              </span>
              <button className="flg__arrow" onClick={() => goLayer(active + 1, 1)} aria-label="Couche suivante">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
