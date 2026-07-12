// Single source of all site copy, in both languages. Reviewed line by line:
// layer-led, concrete, no filler, no self-awarded adjectives, no empty triads.

export type Lang = 'fr' | 'en'

type Role = 'engine' | 'gov' | 'storage' | 'ai' | 'science'
type Shot = { src: string; chrome: string }
type Flag = {
  key: string
  role: Role
  tab: string
  layer: string
  title: string
  body: string
  change: string
  shots: Shot[]
}
type Fact = { k: string; v: string }
type Strip = { src: string; label: string }
type DiagTab = { tab: string; blurb: string }

export type SiteContent = {
  nav: { links: { label: string; href: string }[]; cta: string }
  hero: {
    eyebrow: string
    titleLines: string[]
    grad: string
    sub: string
    ctaPrimary: string
    ctaSecondary: string
    context: string
    helm: string
    facts: Fact[]
  }
  sov: {
    watermark: string
    eyebrow: string
    titleA: string
    grad: string
    titleB: string
    body: string
    caption: string
    tokens: { name: string; tag: string }[]
    never: string
  }
  flags: { eyebrow: string; titleA: string; grad: string; titleB: string; items: Flag[] }
  strip: { eyebrow: string; lead: string; items: Strip[] }
  arch: {
    eyebrow: string
    titleA: string
    grad: string
    titleB: string
    lead: string
    legend: string[]
    note: string
    layers: { label: string; vendor: string; key?: boolean }[]
    coreTag: string
  }
  diag: { eyebrow: string; title: string; lead: string; tabs: DiagTab[] }
  contact: {
    eyebrow: string
    titleA: string
    grad: string
    sub: string
    ctaPrimary: string
    secondary: string
    footTag: string
    footHead: string
    footLinks: { label: string; href: string }[]
    copy: string
    own: string
  }
}

const fr: SiteContent = {
  nav: {
    links: [
      { label: 'Plateforme', href: '#plateforme' },
      { label: 'Les couches', href: '#produit' },
      { label: 'Architecture', href: '#topologie' },
    ],
    cta: 'Nous contacter',
  },
  hero: {
    eyebrow: 'Souveraineté, prouvée',
    titleLines: ['Votre donnée ne sort jamais.'],
    grad: "Même quand l'IA la lit.",
    sub: "AKKO est la plateforme data et IA que vous hébergez sur votre propre cluster Kubernetes. Chaque accès, humain ou agent, franchit une porte de gouvernance. Rien ne s'échappe, et vous pouvez le vérifier vous-même.",
    ctaPrimary: 'Voir la démo gouvernée en action',
    ctaSecondary: 'Déployer avec helm',
    context: 'Pensée pour les secteurs régulés : banque, santé, secteur public. Une installation reproductible, auditable de bout en bout.',
    helm: 'helm install akko helm/akko -n akko --create-namespace',
    facts: [
      { k: '100%', v: 'sur votre infrastructure' },
      { k: 'Ouvert', v: 'formats réversibles' },
      { k: 'Gouverné', v: 'accès par utilisateur' },
      { k: 'On-prem', v: 'modèles souverains' },
    ],
  },
  sov: {
    watermark: 'Maîtrisez chaque couche',
    eyebrow: 'Souveraineté',
    titleA: 'La donnée appartient à ',
    grad: 'votre organisation',
    titleB: ', pas à un fournisseur.',
    body: "AKKO s'installe sur votre infrastructure Kubernetes. Vous gardez le contrôle des données, des modèles, des clés et de la sortie. Aucune dépendance à un service externe, aucune donnée chez un tiers.",
    caption: 'Auto-hébergé. Vos données ne quittent jamais votre périmètre.',
    tokens: [
      { name: 'Données', tag: 'à la source' },
      { name: 'Modèles', tag: 'on-premises' },
      { name: 'Clés', tag: 'vos secrets' },
      { name: 'Sortie', tag: 'vos résultats' },
    ],
    never: 'ne sort jamais',
  },
  flags: {
    eyebrow: 'AKKO en action',
    titleA: 'Les couches, ',
    grad: 'écran par écran',
    titleB: '.',
    items: [
      {
        key: 'fed',
        role: 'engine',
        tab: 'Fédération',
        layer: 'Couche de fédération',
        title: 'Un seul moteur pour toutes vos données.',
        body: "Vos bases, vos fichiers, vos entrepôts répondent à la même requête, ensemble, sans copie. Un seul point d'accès, et plus de pipelines pour rassembler la donnée avant de l'utiliser.",
        change: 'Aucune donnée déplacée, aucune copie à maintenir.',
        shots: [
          { src: '/shots/new-sources.png', chrome: 'Sources de données' },
          { src: '/shots/new-source-add.png', chrome: "Ajout d'une source" },
          { src: '/shots/new-tables.png', chrome: 'Exploration des tables' },
        ],
      },
      {
        key: 'access',
        role: 'gov',
        tab: 'Accès unique',
        layer: "Couche d'accès unique",
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
        role: 'storage',
        tab: 'Lakehouse',
        layer: 'Couche lakehouse ouverte',
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
        role: 'ai',
        tab: 'ADEN',
        layer: 'ADEN · agentique gouvernée',
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
        role: 'gov',
        tab: 'NORA',
        layer: 'NORA · curation souveraine',
        title: 'Un catalogue qui se documente et se relie tout seul.',
        body: 'NORA profile vos données, en déduit descriptions, synonymes et relations, et propose le tout à un référent qui valide. Ce travail nourrit le catalogue et fonde l’IA.',
        change: "Le catalogue reste vivant et l'IA reste fondée, sans service à payer.",
        shots: [{ src: '/shots/new-nora.png', chrome: 'NORA · file de revue' }],
      },
      {
        key: 'lab',
        role: 'science',
        tab: 'Lab',
        layer: 'Couche lab polyglotte',
        title: 'Python, R, Julia, Scala. Sur la donnée gouvernée.',
        body: "Un environnement de notebooks et d'édition de code, dans le langage de chacun, branché sur le moteur et le calcul, avec un assistant connecté à vos modèles. Les mêmes droits s'appliquent.",
        change: "La gouvernance ne s'arrête pas à la porte du lab.",
        shots: [
          { src: '/shots/new-lab.png', chrome: 'Lab · environnements' },
          { src: '/shots/lab-jupyter-ai.png', chrome: 'JupyterHub · assistant' },
          { src: '/shots/lab-code-server.png', chrome: 'Éditeur de code' },
        ],
      },
    ],
  },
  strip: {
    eyebrow: 'Et toute la chaîne',
    lead: 'Connexion, accueil, catalogue, calcul, orchestration, modèles, recherche augmentée, observabilité. Chaque couche est là, gouvernée et remplaçable.',
    items: [
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
    ],
  },
  arch: {
    eyebrow: 'Le principe',
    titleA: 'Le blason, ',
    grad: 'déplié',
    titleB: '.',
    lead: "Trois carrés imbriqués : la métaphore exacte de la plateforme. Chaque couche s'empile sur la précédente et reste remplaçable. Les fournisseurs sont masqués derrière des couches stables, et vous maîtrisez chaque niveau.",
    legend: ['Stockage & lakehouse', 'Moteurs', 'Gouvernance', 'Data science', 'IA gouvernée'],
    note: 'Couches Lego remplaçables. Fournisseurs masqués. 100% Kubernetes auto-hébergé.',
    layers: [
      { label: 'Stockage objet', vendor: 'SeaweedFS · S3' },
      { label: 'Lakehouse ouvert', vendor: 'Apache Iceberg' },
      { label: 'Fédération SQL', vendor: 'Trino', key: true },
      { label: 'Calcul distribué', vendor: 'Apache Spark' },
      { label: 'Orchestration', vendor: 'Apache Airflow' },
      { label: 'Catalogue & gouvernance', vendor: 'OpenMetadata · OPA', key: true },
      { label: 'BI & lab polyglotte', vendor: 'Superset · JupyterHub' },
      { label: 'IA gouvernée', vendor: 'ADEN · NORA', key: true },
      { label: 'Cockpit unifié', vendor: 'Console AKKO' },
    ],
    coreTag: 'cœur',
  },
  diag: {
    eyebrow: "Schémas d'architecture",
    title: 'Comment les couches se parlent.',
    lead: "Quatre schémas, pas des promesses. La topologie, le flux d'une question IA gouvernée, le plan de contrôle des accès, la chaîne d'ingestion. Survolez un composant pour isoler ses liens.",
    tabs: [
      { tab: 'Topologie', blurb: 'La porte SQL unique : tout outil interroge la fédération, chaque requête est autorisée au moteur, le catalogue et le lignage suivent.' },
      { tab: 'Flux IA gouverné', blurb: "Une question en langage naturel devient un dashboard, fondée par NORA et bornée par OPA, sur des modèles qui ne quittent pas votre infrastructure." },
      { tab: "Plan d'accès", blurb: 'Les groupes Keycloak nourrissent OPA. Le masquage des colonnes et le filtrage des lignes par utilisateur sont appliqués au moteur, pour tous les outils.' },
      { tab: 'Ingestion & lignage', blurb: 'Spark et Airflow alimentent le lakehouse, OpenMetadata catalogue et trace, NORA enrichit, et les tags PII deviennent des politiques.' },
    ],
  },
  contact: {
    eyebrow: 'Parlons-en',
    titleA: 'Contactez-nous pour une ',
    grad: 'démonstration.',
    sub: 'Une démonstration sur votre cas d’usage, ou un échange technique.',
    ctaPrimary: 'Contactez-nous pour une démonstration',
    secondary: 'Voir une démo',
    footTag: 'La plateforme data & IA souveraine. Auto-hébergée sur votre infrastructure.',
    footHead: 'Explorer',
    footLinks: [
      { label: 'Plateforme', href: '#plateforme' },
      { label: 'Les couches', href: '#produit' },
      { label: 'Architecture', href: '#topologie' },
      { label: 'Nous contacter', href: 'mailto:contact@akko-ai.com' },
    ],
    copy: '© 2026 AKKO',
    own: 'Own Every Layer',
  },
}

const en: SiteContent = {
  nav: {
    links: [
      { label: 'Platform', href: '#plateforme' },
      { label: 'The layers', href: '#produit' },
      { label: 'Architecture', href: '#topologie' },
    ],
    cta: 'Contact us',
  },
  hero: {
    eyebrow: 'Sovereignty, proven',
    titleLines: ['Your data never leaves.'],
    grad: 'Even when the AI reads it.',
    sub: 'AKKO is the data and AI platform you host on your own Kubernetes cluster. Every access, human or agent, passes through a governance gate. Nothing escapes, and you can verify it yourself.',
    ctaPrimary: 'See the governed demo in action',
    ctaSecondary: 'Deploy with helm',
    context: 'Built for regulated sectors: banking, healthcare, public sector. A reproducible install, auditable end to end.',
    helm: 'helm install akko helm/akko -n akko --create-namespace',
    facts: [
      { k: '100%', v: 'on your infrastructure' },
      { k: 'Open', v: 'reversible formats' },
      { k: 'Governed', v: 'per-user access' },
      { k: 'On-prem', v: 'sovereign models' },
    ],
  },
  sov: {
    watermark: 'Own every layer',
    eyebrow: 'Sovereignty',
    titleA: 'Your data belongs to ',
    grad: 'your organisation',
    titleB: ', not to a vendor.',
    body: 'AKKO installs on your own Kubernetes infrastructure. You keep control of the data, the models, the keys and the output. No dependency on an outside service, no data sitting with a third party.',
    caption: 'Self-hosted. Your data never leaves your perimeter.',
    tokens: [
      { name: 'Data', tag: 'at the source' },
      { name: 'Models', tag: 'on-premises' },
      { name: 'Keys', tag: 'your secrets' },
      { name: 'Output', tag: 'your results' },
    ],
    never: 'never leaves',
  },
  flags: {
    eyebrow: 'AKKO in action',
    titleA: 'The layers, ',
    grad: 'screen by screen',
    titleB: '.',
    items: [
      {
        key: 'fed',
        role: 'engine',
        tab: 'Federation',
        layer: 'Federation layer',
        title: 'One engine for all your data.',
        body: 'Your databases, your files, your warehouses answer the same query, together, without copying anything. One access point, and no more pipelines to gather data before you can use it.',
        change: 'No data moved, no copy to maintain.',
        shots: [
          { src: '/shots/new-sources.png', chrome: 'Data sources' },
          { src: '/shots/new-source-add.png', chrome: 'Add a source' },
          { src: '/shots/new-tables.png', chrome: 'Exploring tables' },
        ],
      },
      {
        key: 'access',
        role: 'gov',
        tab: 'Access',
        layer: 'Single access layer',
        title: 'Set the rules once. Enforced everywhere.',
        body: 'Column masking and row filtering follow each person, from the dashboard to the notebook to the AI. You no longer reconfigure access tool by tool.',
        change: 'A sensitive column stays masked for everyone, everywhere.',
        shots: [
          { src: '/shots/new-access.png', chrome: 'Data access' },
          { src: '/shots/new-roles.png', chrome: 'Platform roles' },
        ],
      },
      {
        key: 'lake',
        role: 'storage',
        tab: 'Lakehouse',
        layer: 'Open lakehouse layer',
        title: 'Your data in a format no one locks down.',
        body: 'Your data lives in an open table format, readable by any engine, versioned, reversible. You switch tools without rewriting everything.',
        change: 'Stored once, readable by everything, no lock-in.',
        shots: [
          { src: '/shots/new-tables.png', chrome: 'Open tables' },
          { src: '/shots/catalog-openmetadata.png', chrome: 'Catalog' },
          { src: '/shots/lineage.png', chrome: 'Lineage' },
        ],
      },
      {
        key: 'aden',
        role: 'ai',
        tab: 'ADEN',
        layer: 'ADEN · governed agent',
        title: 'A question in plain language. An answer within your rules.',
        body: 'ADEN understands the business question, writes the query, runs it, and returns a chart. The answer is grounded in your catalog, bounded by your rights, and the AI runs on your infrastructure.',
        change: 'The AI never sees what the user is not allowed to see.',
        shots: [
          { src: '/shots/new-aden-result.png', chrome: 'ADEN · answer' },
          { src: '/shots/new-aden-steps.png', chrome: 'ADEN · reasoning' },
          { src: '/shots/new-aden-home.png', chrome: 'ADEN · home' },
        ],
      },
      {
        key: 'nora',
        role: 'gov',
        tab: 'NORA',
        layer: 'NORA · sovereign curation',
        title: 'A catalog that documents and connects itself.',
        body: 'NORA profiles your data, infers descriptions, synonyms and relationships, and hands them to a steward who approves. That work feeds the catalog and grounds the AI.',
        change: 'The catalog stays alive and the AI stays grounded, with no service to pay for.',
        shots: [{ src: '/shots/new-nora.png', chrome: 'NORA · review queue' }],
      },
      {
        key: 'lab',
        role: 'science',
        tab: 'Lab',
        layer: 'Polyglot lab layer',
        title: 'Python, R, Julia, Scala. On governed data.',
        body: "A notebook and code-editing environment, in everyone's language, wired to the engine and the compute, with an assistant connected to your models. The same access rights apply.",
        change: "Governance doesn't stop at the lab door.",
        shots: [
          { src: '/shots/new-lab.png', chrome: 'Lab · environments' },
          { src: '/shots/lab-jupyter-ai.png', chrome: 'JupyterHub · assistant' },
          { src: '/shots/lab-code-server.png', chrome: 'Code editor' },
        ],
      },
    ],
  },
  strip: {
    eyebrow: 'And the whole chain',
    lead: 'Login, home, catalog, compute, orchestration, models, retrieval, observability. Every layer is there, governed and replaceable.',
    items: [
      { src: '/shots/new-login.png', label: 'Login · SSO' },
      { src: '/shots/cockpit-home.png', label: 'Cockpit home' },
      { src: '/shots/catalog-openmetadata.png', label: 'Data catalog' },
      { src: '/shots/compute-spark.png', label: 'Distributed compute' },
      { src: '/shots/orchestration-airflow.png', label: 'Pipeline orchestration' },
      { src: '/shots/ai-models.png', label: 'Sovereign models' },
      { src: '/shots/rag.png', label: 'Retrieval (RAG)' },
      { src: '/shots/mlflow.png', label: 'Model tracking' },
      { src: '/shots/new-supervision.png', label: 'Monitoring' },
      { src: '/shots/monitoring-cluster.png', label: 'Cluster health' },
      { src: '/shots/alerts.png', label: 'Alerts' },
    ],
  },
  arch: {
    eyebrow: 'The principle',
    titleA: 'The blason, ',
    grad: 'unfolded',
    titleB: '.',
    lead: 'Three nested squares: the exact metaphor of the platform. Each layer stacks on the one below and stays replaceable. Vendors sit behind stable layers, so you stay in control of every level.',
    legend: ['Storage & lakehouse', 'Engines', 'Governance', 'Data science', 'Governed AI'],
    note: 'Replaceable Lego layers. Vendors hidden. 100% self-hosted on Kubernetes.',
    layers: [
      { label: 'Object storage', vendor: 'SeaweedFS · S3' },
      { label: 'Open lakehouse', vendor: 'Apache Iceberg' },
      { label: 'SQL federation', vendor: 'Trino', key: true },
      { label: 'Distributed compute', vendor: 'Apache Spark' },
      { label: 'Orchestration', vendor: 'Apache Airflow' },
      { label: 'Catalog & governance', vendor: 'OpenMetadata · OPA', key: true },
      { label: 'BI & polyglot lab', vendor: 'Superset · JupyterHub' },
      { label: 'Governed AI', vendor: 'ADEN · NORA', key: true },
      { label: 'Unified cockpit', vendor: 'AKKO console' },
    ],
    coreTag: 'core',
  },
  diag: {
    eyebrow: 'Architecture diagrams',
    title: 'How the layers talk to each other.',
    lead: 'Four diagrams, not promises. The topology, the flow of a governed AI question, the access control plane, the ingestion chain. Hover a component to isolate its links.',
    tabs: [
      { tab: 'Topology', blurb: 'One SQL door: every tool queries the federation, every query is authorized at the engine, catalog and lineage follow.' },
      { tab: 'Governed AI flow', blurb: 'A natural-language question becomes a dashboard, grounded by NORA and bounded by OPA, on models that never leave your infrastructure.' },
      { tab: 'Access plane', blurb: 'Keycloak groups feed OPA. Per-user column masking and row filtering are enforced at the engine, for every tool.' },
      { tab: 'Ingestion & lineage', blurb: 'Spark and Airflow feed the lakehouse, OpenMetadata catalogs and traces, NORA enriches, and PII tags become policies.' },
    ],
  },
  contact: {
    eyebrow: "Let's talk",
    titleA: 'Contact us for a ',
    grad: 'demo.',
    sub: 'A demo on your own use case, or a technical conversation.',
    ctaPrimary: 'Contact us for a demo',
    secondary: 'See a demo',
    footTag: 'The sovereign data & AI platform. Self-hosted on your infrastructure.',
    footHead: 'Explore',
    footLinks: [
      { label: 'Platform', href: '#plateforme' },
      { label: 'The layers', href: '#produit' },
      { label: 'Architecture', href: '#topologie' },
      { label: 'Contact us', href: 'mailto:contact@akko-ai.com' },
    ],
    copy: '© 2026 AKKO',
    own: 'Own Every Layer',
  },
}

export const CONTENT: Record<Lang, SiteContent> = { fr, en }
