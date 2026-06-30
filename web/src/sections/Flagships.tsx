import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import '../styles/flagships.css'

type Shot = { src: string; chrome: string }
type Flagship = {
  key: string
  tab: string
  layer: string
  role: 'engine' | 'gov' | 'storage' | 'ai' | 'science'
  title: string
  body: string
  change: string
  shots: Shot[]
}

// Layer-led, not vendor-led. Each item says what the layer DOES.
const FLAGSHIPS: Flagship[] = [
  {
    key: 'fed',
    tab: 'Fédération',
    layer: 'Couche de fédération',
    role: 'engine',
    title: 'Un seul moteur pour toutes vos données.',
    body: "Vos bases, vos fichiers, vos entrepôts répondent à la même requête, ensemble, sans copie. Un seul point d'accès, plus de pipelines pour rassembler la donnée avant de l'utiliser.",
    change: 'Aucune donnée déplacée, aucune copie à maintenir.',
    shots: [
      { src: '/shots/new-sources.png', chrome: 'Sources de données' },
      { src: '/shots/new-source-add.png', chrome: "Ajout d'une source" },
      { src: '/shots/new-tables.png', chrome: 'Exploration des tables' },
    ],
  },
  {
    key: 'access',
    tab: 'Accès unique',
    layer: "Couche d'accès unique",
    role: 'gov',
    title: 'Les droits, définis une fois. Respectés partout.',
    body: "Le masquage des colonnes et le filtrage des lignes suivent chaque personne, du tableau de bord au notebook jusqu'à l'IA. Vous ne reconfigurez plus les droits outil par outil.",
    change: 'Une colonne sensible reste masquée pour tout le monde, partout.',
    shots: [
      { src: '/shots/new-access.png', chrome: 'Accès aux données' },
      { src: '/shots/new-roles.png', chrome: 'Rôles plateforme' },
    ],
  },
  {
    key: 'lake',
    tab: 'Lakehouse',
    layer: 'Couche lakehouse ouverte',
    role: 'storage',
    title: 'Vos données dans un format que personne ne verrouille.',
    body: "Vos données vivent dans un format de table ouvert, lisible par n'importe quel moteur, versionné, réversible. Vous changez d'outil sans tout réécrire.",
    change: 'Stockées une fois, lisibles par tout, sans dépendance.',
    shots: [
      { src: '/shots/new-tables.png', chrome: 'Tables ouvertes' },
      { src: '/shots/catalog-openmetadata.png', chrome: 'Catalogue' },
      { src: '/shots/lineage.png', chrome: 'Lignage' },
    ],
  },
  {
    key: 'aden',
    tab: 'ADEN',
    layer: 'ADEN · agentique gouvernée',
    role: 'ai',
    title: 'Une question en français. Une réponse dans vos règles.',
    body: "ADEN comprend la question métier, écrit la requête, l'exécute, et rend un graphe. La réponse est fondée sur votre catalogue, bornée par vos droits, et l'IA tourne sur votre infrastructure.",
    change: "L'IA ne voit jamais ce que l'utilisateur n'a pas le droit de voir.",
    shots: [
      { src: '/shots/new-aden-result.png', chrome: 'ADEN · réponse' },
      { src: '/shots/new-aden-steps.png', chrome: 'ADEN · raisonnement' },
      { src: '/shots/new-aden-home.png', chrome: 'ADEN · accueil' },
    ],
  },
  {
    key: 'nora',
    tab: 'NORA',
    layer: 'NORA · curation souveraine',
    role: 'gov',
    title: 'Un catalogue qui se documente et se relie tout seul.',
    body: "NORA profile vos données, en déduit descriptions, synonymes et relations, et propose le tout à un référent qui valide. Ce travail nourrit le catalogue et fonde l'IA.",
    change: "Le catalogue reste vivant et l'IA reste fondée, sans service à payer.",
    shots: [{ src: '/shots/new-nora.png', chrome: 'NORA · file de revue' }],
  },
  {
    key: 'lab',
    tab: 'Lab',
    layer: 'Couche lab polyglotte',
    role: 'science',
    title: 'Python, R, Julia, Scala. Sur la donnée gouvernée.',
    body: "Un environnement de notebooks et d'édition de code, dans le langage de chacun, branché sur le moteur et le calcul, avec un assistant connecté à vos modèles. Les mêmes droits s'appliquent.",
    change: "La gouvernance ne s'arrête pas à la porte du lab.",
    shots: [
      { src: '/shots/new-lab.png', chrome: 'Lab · environnements' },
      { src: '/shots/lab-jupyter-ai.png', chrome: 'JupyterHub · assistant' },
      { src: '/shots/lab-code-server.png', chrome: 'Éditeur de code' },
    ],
  },
]

const AUTOPLAY_MS = 7000

const stageVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 70 : -70 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -70 : 70 }),
}

export default function Flagships() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [shot, setShot] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const timer = useRef<number | null>(null)

  const cur = FLAGSHIPS[active]

  const goLayer = (i: number, d?: number) => {
    const ni = ((i % FLAGSHIPS.length) + FLAGSHIPS.length) % FLAGSHIPS.length
    setDir(d ?? (ni > active ? 1 : -1))
    setActive(ni)
    setShot(0)
  }

  useEffect(() => {
    if (paused || reduce) return
    timer.current = window.setTimeout(() => {
      setDir(1)
      setActive((a) => (a + 1) % FLAGSHIPS.length)
      setShot(0)
    }, AUTOPLAY_MS)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [active, paused, reduce])

  const view = cur.shots[Math.min(shot, cur.shots.length - 1)]

  return (
    <section className={`flg flg--${cur.role}`} id="produit">
      <div className="shell">
        <div className="flg__head">
          <span className="eyebrow">AKKO en action</span>
          <h2 className="flg__title">
            Les couches, <span className="grad-text">écran par écran</span>.
          </h2>
        </div>

        {/* layer tabs */}
        <div className="flg__tabs" role="tablist" aria-label="Couches phares">
          {FLAGSHIPS.map((f, i) => (
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
                  </button>
                ))}
            </div>
            <div className="flg__controls">
              <button className="flg__arrow" onClick={() => goLayer(active - 1, -1)} aria-label="Couche précédente">←</button>
              <span className="flg__count">
                <b>{String(active + 1).padStart(2, '0')}</b> / {String(FLAGSHIPS.length).padStart(2, '0')}
              </span>
              <button className="flg__arrow" onClick={() => goLayer(active + 1, 1)} aria-label="Couche suivante">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
