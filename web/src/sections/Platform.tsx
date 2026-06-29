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

type Shot = { src: string; cap: string; alt: string }
type Group = { theme: string; lead: string; color: string; shots: Shot[] }

// Themed pages: each page = one capability area, shown as an editorial collage.
const GROUPS: Group[] = [
  {
    theme: 'Cockpit & assistant',
    lead: 'Un seul point d’entrée, l’IA gouvernée à portée de question.',
    color: 'var(--c-ai)',
    shots: [
      { src: '/shots/cockpit-home.png', cap: 'Un point d’entrée unique vers tous les outils de la plateforme.', alt: 'Page d’accueil du cockpit AKKO' },
      { src: '/shots/aden-home.png', cap: 'ADEN : posez votre question métier en langage naturel.', alt: 'Écran d’accueil d’ADEN' },
      { src: '/shots/aden-explain.png', cap: 'ADEN montre le SQL généré et explique son résultat.', alt: 'ADEN : SQL généré et interprétation du résultat' },
    ],
  },
  {
    theme: 'Modèles souverains & RAG',
    lead: 'Des modèles servis chez vous, accessibles par une seule API.',
    color: 'var(--c-engine)',
    shots: [
      { src: '/shots/ai-models.png', cap: 'Modèles servis sur votre infrastructure, derrière une API unique.', alt: 'Registre des modèles servis par la plateforme' },
      { src: '/shots/rag.png', cap: 'RAG documentaire : réponses citées, rien ne quitte votre cluster.', alt: 'Interface de recherche documentaire RAG' },
      { src: '/shots/mlflow.png', cap: 'Suivi des expériences et registre des modèles.', alt: 'Suivi des expériences et registre de modèles' },
    ],
  },
  {
    theme: 'Catalogue & lignage',
    lead: 'Comprendre la donnée : domaines, glossaire, dépendances.',
    color: 'var(--c-storage)',
    shots: [
      { src: '/shots/catalog-openmetadata.png', cap: 'Catalogue : domaines, glossaire et métriques métier.', alt: 'Catalogue de données avec glossaire et domaines' },
      { src: '/shots/lineage.png', cap: 'Lignage : dépendances entre services et jeux de données.', alt: 'Graphe de lignage entre services' },
    ],
  },
  {
    theme: 'Calcul & orchestration',
    lead: 'Le traitement distribué et les pipelines, supervisés au même endroit.',
    color: 'var(--c-engine)',
    shots: [
      { src: '/shots/compute-spark.png', cap: 'Calcul distribué Spark, piloté depuis le cockpit.', alt: 'Interface du moteur de calcul Spark' },
      { src: '/shots/orchestration-airflow.png', cap: 'Orchestration des pipelines et de leurs exécutions.', alt: 'Tableau de bord d’orchestration Airflow' },
    ],
  },
  {
    theme: 'Lab polyglotte',
    lead: 'Des environnements à la demande, au plus près des données.',
    color: 'var(--c-science)',
    shots: [
      { src: '/shots/lab-spawner.png', cap: 'Environnements à la demande, dimensionnés par profil.', alt: 'Lanceur d’environnements du lab' },
      { src: '/shots/lab-jupyter-ai.png', cap: 'Notebooks Python, R, Julia, Scala, assistés par l’IA.', alt: 'Notebooks polyglottes avec assistance IA' },
      { src: '/shots/lab-code-server.png', cap: 'Éditeur de code intégré, au plus près des données.', alt: 'Éditeur de code intégré au lab' },
    ],
  },
  {
    theme: 'Observabilité',
    lead: 'La santé de la plateforme, en temps réel, du cluster aux alertes.',
    color: 'var(--c-gov)',
    shots: [
      { src: '/shots/monitoring-cluster.png', cap: 'Santé du cluster : CPU, mémoire, état des pods.', alt: 'Vue d’ensemble de la santé du cluster' },
      { src: '/shots/monitoring-supervision.png', cap: 'Supervision des couches, en temps réel.', alt: 'Tableau de supervision des couches' },
      { src: '/shots/alerts.png', cap: 'Alertes actives et résolues, centralisées.', alt: 'Liste des alertes actives et résolues' },
    ],
  },
]

const PAGES = GROUPS.length

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

  const group = GROUPS[page]

  return (
    <section className="plat" id="produit">
      <div className="shell">
        {/* S5 : copy + layer stack */}
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

        {/* S6 : AKKO en action */}
        <div className="plat-gallery">
          <motion.div className="plat-gallery__head" {...inView} variants={rise}>
            <motion.h3 className="plat-gallery__h" variants={rise} custom={0}>
              AKKO <span className="grad-text">en action</span>
            </motion.h3>
            <motion.p className="plat-gallery__sub" variants={rise} custom={1}>
              Captures réelles du cockpit, prises sur une plateforme déployée. Navigation par thème.
            </motion.p>
          </motion.div>

          <div className="plat-stage">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={page}
                className="plat-page"
                custom={dir}
                initial={reduce ? false : { opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="plat-theme">
                  <span className="plat-theme__rail" style={{ background: group.color, boxShadow: `0 0 14px ${group.color}` }} />
                  <span className="plat-theme__name">{group.theme}</span>
                  <span className="plat-theme__lead">{group.lead}</span>
                </div>

                <div className="plat-collage" data-count={group.shots.length}>
                  {group.shots.map((s, i) => (
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
                        <span className="plat-frame__num">{String(i + 1).padStart(2, '0')}</span>
                        <span className="plat-frame__txt">{s.cap}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="plat-pager">
            <button className="plat-pager__arrow" aria-label="Thème précédent" onClick={() => go(page - 1)}>
              ‹
            </button>
            <div className="plat-pager__dots">
              {GROUPS.map((g, i) => (
                <button
                  key={g.theme}
                  className="plat-pager__dot"
                  data-on={i === page}
                  aria-label={g.theme}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <button className="plat-pager__arrow" aria-label="Thème suivant" onClick={() => go(page + 1)}>
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
