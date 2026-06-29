import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import '../styles/platform.css'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.07 },
  }),
}

type Layer = { name: string; tag: string; color: string }
const LAYERS: Layer[] = [
  { name: 'Stockage objet', tag: 'compatible S3', color: 'var(--c-storage)' },
  { name: 'Lakehouse ouvert', tag: 'Iceberg', color: 'var(--c-storage)' },
  { name: 'Calcul distribué', tag: 'Spark', color: 'var(--c-engine)' },
  { name: 'Fédération SQL', tag: 'Trino', color: 'var(--c-engine)' },
  { name: 'Catalogue & lignage', tag: 'OpenMetadata', color: 'var(--cyan)' },
  { name: 'Orchestration', tag: 'Airflow', color: 'var(--c-science)' },
  { name: 'BI & dataviz', tag: 'Superset', color: 'var(--c-science)' },
  { name: 'Lab polyglotte', tag: 'Python · R · Julia · Scala', color: 'var(--c-science)' },
  { name: 'IA gouvernée', tag: 'ADEN · NORA', color: 'var(--c-ai)' },
  { name: 'Gouvernance', tag: 'OPA', color: 'var(--c-gov)' },
]

type Shot = { src: string; num: string; cap: string; alt: string }
const SHOTS: Shot[] = [
  { src: '/shots/cockpit-home.png', num: '01', cap: 'Cockpit — le point d’entrée unique de la plateforme', alt: 'Page d’accueil du cockpit AKKO' },
  { src: '/shots/aden-result.png', num: '02', cap: 'ADEN — question en langage naturel → SQL gouverné → graphe', alt: 'Résultat d’une requête ADEN' },
  { src: '/shots/aden-steps.png', num: '03', cap: 'ADEN — étapes de raisonnement et reçu d’audit', alt: 'Étapes de raisonnement ADEN' },
  { src: '/shots/governance-roles.png', num: '04', cap: 'Gouvernance — rôles et accès aux données par utilisateur', alt: 'Gestion des rôles et accès' },
  { src: '/shots/catalog-federation.png', num: '05', cap: 'Fédération — une requête, toutes les sources', alt: 'Fédération des catalogues' },
  { src: '/shots/lineage.png', num: '06', cap: 'Lignage — du champ à la source, de bout en bout', alt: 'Graphe de lignage' },
  { src: '/shots/monitoring-supervision.png', num: '07', cap: 'Supervision — santé des couches en temps réel', alt: 'Tableau de supervision' },
  { src: '/shots/lab-spawner.png', num: '08', cap: 'Lab — environnements polyglottes à la demande', alt: 'Lanceur d’environnements du lab' },
]

const PER_PAGE = 4
const PAGES = Math.ceil(SHOTS.length / PER_PAGE)

export default function Platform() {
  const reduce = useReducedMotion()
  const [page, setPage] = useState(0)
  const [dir, setDir] = useState(1)

  const inView = reduce
    ? {}
    : { initial: 'hidden' as const, whileInView: 'show' as const, viewport: { once: true, margin: '-90px' } }

  const go = (next: number) => {
    const p = (next + PAGES) % PAGES
    setDir(p > page || (page === PAGES - 1 && p === 0) ? 1 : -1)
    setPage(p)
  }

  const slice = SHOTS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <section className="plat" id="produit">
      <div className="shell">
        {/* S5 — copy + layer stack */}
        <div className="plat__top">
          <motion.div className="plat__copy" {...inView} variants={rise}>
            <motion.span className="eyebrow" variants={rise} custom={0}>
              Plateforme complète
            </motion.span>
            <motion.h2 className="plat__title" variants={rise} custom={1}>
              Toute la chaîne data &amp; IA, dans un seul{' '}
              <span className="grad-text">cockpit.</span>
            </motion.h2>
            <motion.p className="plat__body" variants={rise} custom={2}>
              Stockage, lakehouse, calcul Spark, fédération Trino, catalogue OpenMetadata avec lignage,
              orchestration Airflow, BI Superset, lab polyglotte (Python, R, Julia, Scala, éditeur de
              code), et l’IA gouvernée. <b>Tout auto-hébergé ; chaque couche est remplaçable.</b>
            </motion.p>
          </motion.div>

          <motion.div className="plat-stack" {...inView} variants={rise}>
            {LAYERS.map((l, i) => (
              <motion.div
                key={l.name}
                className="plat-layer"
                style={{ ['--lc' as string]: l.color, marginLeft: reduce ? 0 : `${Math.min(i, 5) * 7}px` }}
                variants={{
                  hidden: { opacity: 0, x: -22 },
                  show: () => ({
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, ease: EASE, delay: 0.04 * i },
                  }),
                }}
                custom={i}
              >
                <span className="plat-layer__rail" />
                <span className="plat-layer__name">{l.name}</span>
                <span className="plat-layer__tag">{l.tag}</span>
              </motion.div>
            ))}
            <div className="plat-stack__own">Maîtrisez chaque couche</div>
          </motion.div>
        </div>

        {/* S6 — AKKO en action */}
        <div className="plat-gallery">
          <motion.div className="plat-gallery__head" {...inView} variants={rise}>
            <motion.h3 className="plat-gallery__h" variants={rise} custom={0}>
              AKKO <span className="grad-text">en action</span>
            </motion.h3>
            <motion.p className="plat-gallery__sub" variants={rise} custom={1}>
              Captures réelles du cockpit, prises sur une plateforme déployée.
            </motion.p>
          </motion.div>

          <div className="plat-stage">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={page}
                className="plat-collage"
                custom={dir}
                initial={reduce ? false : { opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {slice.map((s, i) => (
                  <figure className="plat-frame" data-pos={i} key={s.src}>
                    <div className="plat-frame__inner">
                      <div className="plat-frame__bar">
                        <span />
                        <span />
                        <span />
                      </div>
                      <img src={s.src} alt={s.alt} loading="lazy" />
                    </div>
                    <figcaption className="plat-frame__cap">
                      <span className="plat-frame__num">{s.num}</span>
                      <span className="plat-frame__txt">{s.cap}</span>
                    </figcaption>
                  </figure>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="plat-pager">
            <button className="plat-pager__arrow" aria-label="Captures précédentes" onClick={() => go(page - 1)}>
              ‹
            </button>
            <div className="plat-pager__dots">
              {Array.from({ length: PAGES }).map((_, i) => (
                <button
                  key={i}
                  className="plat-pager__dot"
                  data-on={i === page}
                  aria-label={`Page ${i + 1}`}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <button className="plat-pager__arrow" aria-label="Captures suivantes" onClick={() => go(page + 1)}>
              ›
            </button>
            <span className="plat-pager__count">
              {String(page + 1).padStart(2, '0')} / {String(PAGES).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
