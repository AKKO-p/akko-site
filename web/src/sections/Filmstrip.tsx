import '../styles/filmstrip.css'

// The rest of the chain, function-labeled, scrolling by.
const STRIP = [
  { src: '/shots/new-login.png', label: 'Connexion · SSO' },
  { src: '/shots/cockpit-home.png', label: 'Accueil du cockpit' },
  { src: '/shots/catalog-openmetadata.png', label: 'Catalogue de données' },
  { src: '/shots/compute-spark.png', label: 'Calcul distribué' },
  { src: '/shots/orchestration-airflow.png', label: 'Orchestration des traitements' },
  { src: '/shots/ai-models.png', label: 'Modèles souverains' },
  { src: '/shots/rag.png', label: 'Recherche augmentée' },
  { src: '/shots/mlflow.png', label: 'Suivi des modèles' },
  { src: '/shots/new-supervision.png', label: 'Supervision' },
  { src: '/shots/monitoring-cluster.png', label: 'État du cluster' },
  { src: '/shots/alerts.png', label: 'Alertes' },
]

export default function Filmstrip() {
  // duplicated once for a seamless marquee loop
  const items = [...STRIP, ...STRIP]
  return (
    <section className="strip" aria-label="Les autres couches de la plateforme">
      <div className="shell strip__head">
        <span className="eyebrow">Et toute la chaîne</span>
        <p className="strip__lead">
          Connexion, accueil, catalogue, calcul, orchestration, modèles, recherche augmentée,
          observabilité. Chaque couche est là, gouvernée et remplaçable.
        </p>
      </div>
      <div className="strip__track-wrap">
        <div className="strip__track">
          {items.map((it, i) => (
            <figure className="strip__item" key={i} aria-hidden={i >= STRIP.length}>
              <div className="strip__frame">
                <span className="strip__dots"><i /><i /><i /></span>
                <img src={it.src} alt={it.label} loading="lazy" />
              </div>
              <figcaption>{it.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
