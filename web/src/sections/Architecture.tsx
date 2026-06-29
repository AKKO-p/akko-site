import { motion, useReducedMotion } from 'framer-motion'
import '../styles/architecture.css'
import Blason from '../components/Blason'

type Layer = {
  label: string
  vendor: string
  role: 'storage' | 'engine' | 'gov' | 'science' | 'ai'
  key?: boolean
}

// The platform, bottom-up. This is the blason "unfolded": the concentric
// squares dezoom into the stack of replaceable Lego layers.
const LAYERS: Layer[] = [
  { label: 'Stockage objet', vendor: 'SeaweedFS · S3', role: 'storage' },
  { label: 'Lakehouse ouvert', vendor: 'Apache Iceberg', role: 'storage' },
  { label: 'Fédération SQL', vendor: 'Trino', role: 'engine', key: true },
  { label: 'Calcul distribué', vendor: 'Apache Spark', role: 'engine' },
  { label: 'Orchestration', vendor: 'Apache Airflow', role: 'science' },
  { label: 'Catalogue & gouvernance', vendor: 'OpenMetadata · OPA', role: 'gov', key: true },
  { label: 'BI & Lab polyglotte', vendor: 'Superset · JupyterHub', role: 'science' },
  { label: 'IA gouvernée', vendor: 'ADEN · NORA', role: 'ai', key: true },
  { label: 'Cockpit unifié', vendor: 'Console AKKO', role: 'ai' },
]

export default function Architecture() {
  const reduce = useReducedMotion()
  return (
    <section className="arc" id="architecture">
      <div className="shell arc__inner">
        <aside className="arc__intro">
          <span className="eyebrow">Architecture</span>
          <h2 className="arc__title">
            Le blason, <span className="grad-text">déplié</span>.
          </h2>
          <p className="arc__lead">
            Trois carrés imbriqués — la métaphore exacte de la plateforme. Chaque couche
            s'empile sur la précédente et reste <strong>remplaçable</strong>. Les vendors sont
            masqués derrière des couches stables : vous maîtrisez chaque niveau.
          </p>
          <div className="arc__emblem" aria-hidden>
            <Blason size={132} mode="static" breathe />
          </div>
          <ul className="arc__legend">
            <li><i className="dot dot--storage" /> Stockage &amp; lakehouse</li>
            <li><i className="dot dot--engine" /> Moteurs</li>
            <li><i className="dot dot--gov" /> Gouvernance</li>
            <li><i className="dot dot--science" /> Data science</li>
            <li><i className="dot dot--ai" /> IA gouvernée</li>
          </ul>
          <p className="arc__note">Couches Lego remplaçables · vendors masqués · 100% Kubernetes auto-hébergé.</p>
        </aside>

        <div className="arc__stack" role="list" aria-label="Pile des couches AKKO">
          <span className="arc__spine" aria-hidden />
          {LAYERS.map((l, i) => (
            <motion.div
              role="listitem"
              className={`arc__layer arc__layer--${l.role}${l.key ? ' is-key' : ''}`}
              key={l.label}
              initial={reduce ? false : { opacity: 0, x: 40, rotateX: 12 }}
              whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
            >
              <span className="arc__layer-idx">{String(LAYERS.length - i).padStart(2, '0')}</span>
              <span className="arc__layer-body">
                <span className="arc__layer-label">{l.label}</span>
                <span className="arc__layer-vendor">{l.vendor}</span>
              </span>
              {l.key && <span className="arc__layer-tag">cœur</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
