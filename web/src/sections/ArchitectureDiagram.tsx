import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import '../styles/archdiagram.css'
import Diagram from '../components/diagram/Diagram'
import { DIAGRAMS } from '../components/diagram/data'
import { useContent, useLang } from '../i18n/lang'

export default function ArchitectureDiagram() {
  const t = useContent()
  const { lang } = useLang()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const cur = DIAGRAMS[active]
  const tab = t.diag.tabs[active]

  return (
    <section className="adg" id="topologie">
      <div className="shell">
        <div className="adg__head">
          <div>
            <span className="eyebrow">{t.diag.eyebrow}</span>
            <h2 className="adg__title">{t.diag.title}</h2>
          </div>
          <p className="adg__lead">{t.diag.lead}</p>
        </div>

        <div className="adg__tabs" role="tablist" aria-label={t.diag.eyebrow}>
          {DIAGRAMS.map((d, i) => (
            <button
              key={d.key}
              role="tab"
              aria-selected={i === active}
              className={`adg__tab${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="adg__tab-n">{String(i + 1).padStart(2, '0')}</span>
              {t.diag.tabs[i].tab}
            </button>
          ))}
        </div>

        <motion.div
          className="adg__frame"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.key + lang}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="adg__blurb">{tab.blurb}</p>
              <Diagram
                title={cur.spec.title}
                nodes={cur.spec.nodes}
                edges={cur.spec.edges}
                lanes={cur.spec.lanes}
                width={cur.spec.width}
                height={cur.spec.height}
                lang={lang}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
