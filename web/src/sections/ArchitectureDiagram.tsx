import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import '../styles/archdiagram.css'
import Diagram from '../components/diagram/Diagram'
import { DIAGRAMS } from '../components/diagram/data'

export default function ArchitectureDiagram() {
  const [active, setActive] = useState(0)
  const cur = DIAGRAMS[active]

  return (
    <section className="adg" id="topologie">
      <div className="shell">
        <div className="adg__head">
          <div>
            <span className="eyebrow">Schémas d'architecture</span>
            <h2 className="adg__title">Comment les couches se parlent.</h2>
          </div>
          <p className="adg__lead">
            Quatre schémas, pas des promesses. La topologie, le flux d'une question IA gouvernée, le
            plan de contrôle des accès, la chaîne d'ingestion. Survolez un composant pour isoler ses
            liens.
          </p>
        </div>

        <div className="adg__tabs" role="tablist" aria-label="Schémas d'architecture">
          {DIAGRAMS.map((d, i) => (
            <button
              key={d.key}
              role="tab"
              aria-selected={i === active}
              className={`adg__tab${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="adg__tab-n">{String(i + 1).padStart(2, '0')}</span>
              {d.tab}
            </button>
          ))}
        </div>

        <motion.div
          className="adg__frame"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="adg__blurb">{cur.blurb}</p>
              <Diagram
                title={cur.spec.title}
                nodes={cur.spec.nodes}
                edges={cur.spec.edges}
                lanes={cur.spec.lanes}
                width={cur.spec.width}
                height={cur.spec.height}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
