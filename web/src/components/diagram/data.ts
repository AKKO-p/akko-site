import type { DiagEdge, DiagNode, Lane } from './types'

// Coordinates are hand-placed in each diagram's viewBox for clean routing.
// Node data follows 02-architecture-reference.md (verified against the repo).

// ===========================================================================
// D1 : Topologie plateforme (viewBox 1100 x 660)
// ===========================================================================
export const D1 = {
  width: 1100,
  height: 660,
  title: 'Topologie AKKO : identité, stockage, fédération, gouvernance, restitution, IA',
  lanes: [
    { label: 'Restitution & IA', role: 'science', x: 150, y: 24, w: 932, h: 132 },
    { label: 'Fédération & gouvernance', role: 'engine', x: 150, y: 250, w: 932, h: 156 },
    { label: 'Stockage & lakehouse', role: 'storage', x: 150, y: 488, w: 932, h: 132 },
    { label: 'Identité', role: 'identity', x: 12, y: 250, w: 120, h: 156 },
  ] as Lane[],
  nodes: [
    { id: 'bi', label: 'Tableaux de bord', tech: 'Superset', role: 'science', x: 168, y: 58 },
    { id: 'lab', label: 'Lab polyglotte', tech: 'JupyterHub', role: 'science', x: 352, y: 58 },
    { id: 'aden', label: 'ADEN', tech: 'IA gouvernée', role: 'ai', x: 540, y: 58, key: true },
    { id: 'llm', label: 'LLM souverain', tech: 'LiteLLM · Ollama', role: 'ai', x: 724, y: 58 },
    { id: 'cockpit', label: 'Cockpit', tech: 'Console AKKO', role: 'identity', x: 908, y: 58, w: 168 },

    { id: 'spark', label: 'Calcul', tech: 'Spark', role: 'engine', x: 168, y: 286 },
    { id: 'airflow', label: 'Orchestration', tech: 'Airflow', role: 'science', x: 168, y: 350 },
    { id: 'nora', label: 'Profilage souverain', tech: 'NORA', role: 'gov', x: 352, y: 318 },
    { id: 'trino', label: 'Fédération SQL', tech: 'Trino', role: 'engine', x: 540, y: 318, key: true },
    { id: 'opa', label: 'Gouvernance', tech: 'OPA', role: 'gov', x: 724, y: 318, key: true },
    { id: 'om', label: 'Catalogue & lignage', tech: 'OpenMetadata', role: 'gov', x: 908, y: 318, key: true, w: 168 },

    { id: 'keycloak', label: 'Identité', tech: 'Keycloak', role: 'identity', x: 0, y: 304, w: 132, h: 50 },

    { id: 'seaweed', label: 'Stockage objet', tech: 'SeaweedFS · S3', role: 'storage', x: 300, y: 520 },
    { id: 'iceberg', label: 'Lakehouse', tech: 'Apache Iceberg', role: 'storage', x: 540, y: 520, key: true },
    { id: 'polaris', label: 'Catalogue de tables', tech: 'Polaris', role: 'storage', x: 760, y: 520, w: 168 },
  ] as DiagNode[],
  edges: [
    { from: 'bi', to: 'trino', type: 'query', label: 'SQL' },
    { from: 'lab', to: 'trino', type: 'query', label: 'SQL' },
    { from: 'aden', to: 'trino', type: 'query', label: 'SQL gouverné' },
    { from: 'aden', to: 'llm', type: 'ai', label: 'génère SQL' },
    { from: 'cockpit', to: 'om', type: 'lineage', label: 'métadonnées', bend: 50 },
    { from: 'trino', to: 'opa', type: 'govern', label: 'autorise' },
    { from: 'trino', to: 'om', type: 'lineage', label: 'catalogue', bend: 80 },
    { from: 'nora', to: 'trino', type: 'query', label: 'profile' },
    { from: 'nora', to: 'om', type: 'data', label: 'enrichit', bend: 130 },
    { from: 'spark', to: 'iceberg', type: 'data', label: 'écrit' },
    { from: 'airflow', to: 'iceberg', type: 'data' },
    { from: 'airflow', to: 'om', type: 'lineage', label: 'lignage', bend: 90 },
    { from: 'iceberg', to: 'trino', type: 'data', label: 'lit', bend: 70 },
    { from: 'seaweed', to: 'iceberg', type: 'data' },
    { from: 'polaris', to: 'trino', type: 'lineage', bend: 60 },
    { from: 'keycloak', to: 'trino', type: 'identity', label: 'SSO', bend: 60 },
    { from: 'keycloak', to: 'aden', type: 'identity', bend: 150 },
  ] as DiagEdge[],
}

// ===========================================================================
// D2 : Flux d'une question IA gouvernée (ADEN). Snake left->right then ->left.
// viewBox 1100 x 500
// ===========================================================================
export const D2 = {
  width: 1100,
  height: 500,
  title: "Flux d'une question IA gouvernée ADEN, de la question au dashboard",
  lanes: [] as Lane[],
  nodes: [
    // row A (top, left -> right)
    { id: 'q', label: 'Question', tech: 'langage naturel', role: 'identity', x: 30, y: 150 },
    { id: 'intent', label: 'Intent + raccourci', tech: 'verified query', role: 'ai', x: 245, y: 150 },
    { id: 'ground', label: 'Grounding', tech: 'NORA', role: 'gov', x: 460, y: 150, key: true },
    { id: 'opa1', label: 'Pré-filtre gouverné', tech: 'OPA', role: 'gov', x: 675, y: 150 },
    { id: 'llm', label: 'LLM souverain', tech: 'LiteLLM · Ollama', role: 'ai', x: 890, y: 150, key: true },
    // feeders (above ground)
    { id: 'milvus', label: 'Vecteurs', tech: 'Milvus', role: 'storage', x: 405, y: 36, w: 120, h: 48 },
    { id: 'om', label: 'Métadonnées', tech: 'OpenMetadata', role: 'gov', x: 540, y: 36, w: 150, h: 48 },
    // row B (bottom, right -> left)
    { id: 'sqlgen', label: 'SQL : validation', tech: 'sql_guard', role: 'engine', x: 890, y: 330 },
    { id: 'exec', label: 'Exécution gouvernée', tech: 'Trino sous OPA', role: 'engine', x: 675, y: 330, key: true },
    { id: 'opa2', label: 'Masques + filtres', tech: 'OPA · par user', role: 'gov', x: 460, y: 330 },
    { id: 'trust', label: 'Confiance + reçu', tech: 'audit signé', role: 'gov', x: 245, y: 330 },
    { id: 'viz', label: 'Restitution', tech: 'dashboard', role: 'science', x: 30, y: 330 },
  ] as DiagNode[],
  edges: [
    { from: 'q', to: 'intent', type: 'ai', label: 'intention' },
    { from: 'intent', to: 'ground', type: 'ai' },
    { from: 'milvus', to: 'ground', type: 'ai', fromSide: 'bottom', toSide: 'top' },
    { from: 'om', to: 'ground', type: 'ai', fromSide: 'bottom', toSide: 'top' },
    { from: 'ground', to: 'opa1', type: 'govern', label: "n'expose que l'autorisé" },
    { from: 'opa1', to: 'llm', type: 'ai', label: 'prompt fondé' },
    { from: 'llm', to: 'sqlgen', type: 'ai', label: 'SQL candidat', fromSide: 'bottom', toSide: 'top' },
    { from: 'sqlgen', to: 'exec', type: 'query', label: 'read-only' },
    { from: 'exec', to: 'opa2', type: 'govern', label: 'enforce / user' },
    { from: 'opa2', to: 'trust', type: 'govern' },
    { from: 'trust', to: 'viz', type: 'data', label: 'dataviz' },
    { from: 'intent', to: 'viz', type: 'ai', label: 'court-circuit vérifié', fromSide: 'bottom', toSide: 'top', bend: 90 },
  ] as DiagEdge[],
}

// ===========================================================================
// D3 : Plan de contrôle des accès (viewBox 1120 x 600)
// ===========================================================================
export const D3 = {
  width: 1120,
  height: 600,
  title: 'Plan de contrôle des accès : Keycloak vers OPA, enforce dans Trino pour tous les outils',
  lanes: [] as Lane[],
  nodes: [
    { id: 'kc', label: 'Identité', tech: 'Keycloak', role: 'identity', x: 24, y: 70 },
    { id: 'groups', label: 'Groupes RBAC', tech: 'admin · analyst · viewer', role: 'identity', x: 24, y: 250, w: 196 },
    { id: 'o2p', label: 'Garde d\'auth', tech: 'oauth2-proxy', role: 'identity', x: 24, y: 430 },

    { id: 'om', label: 'Tags PII', tech: 'OpenMetadata', role: 'gov', x: 360, y: 40 },
    { id: 'psync', label: 'Propagation PII', tech: 'policy-sync', role: 'gov', x: 360, y: 170 },
    { id: 'opa', label: 'Politiques fines', tech: 'OPA · ABAC', role: 'gov', x: 470, y: 300, key: true, w: 196 },

    { id: 'trino', label: 'Fédération SQL', tech: 'Trino', role: 'engine', x: 760, y: 300, key: true },
    { id: 'data', label: 'Tables', tech: 'colonnes masquées · lignes filtrées', role: 'storage', x: 470, y: 470, w: 260 },

    { id: 'aden', label: 'ADEN', tech: 'IA gouvernée', role: 'ai', x: 944, y: 70, w: 150 },
    { id: 'mcp', label: 'MCP Trino', tech: 'agents', role: 'ai', x: 944, y: 230, w: 150 },
    { id: 'bi', label: 'Superset', tech: 'BI', role: 'science', x: 944, y: 380, w: 150 },
    { id: 'lab', label: 'JupyterHub', tech: 'lab', role: 'science', x: 944, y: 470, w: 150 },
  ] as DiagNode[],
  edges: [
    { from: 'kc', to: 'groups', type: 'identity', label: 'mapping rôles' },
    { from: 'kc', to: 'o2p', type: 'identity', label: 'OIDC' },
    { from: 'groups', to: 'opa', type: 'govern', label: 'sujets ABAC' },
    { from: 'om', to: 'psync', type: 'govern', label: 'colonnes PII' },
    { from: 'psync', to: 'opa', type: 'govern', label: 'masks auto' },
    { from: 'o2p', to: 'trino', type: 'identity', label: 'token user', bend: 90 },
    { from: 'trino', to: 'opa', type: 'govern', label: 'allow / mask / filter' },
    { from: 'opa', to: 'data', type: 'govern', label: 'applique' },
    { from: 'trino', to: 'data', type: 'data', label: 'accès borné', bend: 70 },
    { from: 'aden', to: 'trino', type: 'query', label: 'sous token' },
    { from: 'mcp', to: 'trino', type: 'query', label: 'sous token' },
    { from: 'bi', to: 'trino', type: 'query', label: 'sous token' },
    { from: 'lab', to: 'trino', type: 'query', label: 'sous token' },
    { from: 'aden', to: 'opa', type: 'govern', label: 'filtre avant LLM', bend: 110 },
  ] as DiagEdge[],
}

// ===========================================================================
// D4 : Ingestion -> catalogue -> lignage (viewBox 1160 x 560)
// ===========================================================================
export const D4 = {
  width: 1160,
  height: 560,
  title: 'Ingestion, catalogue et lignage : Spark et Airflow vers Iceberg, OpenMetadata, OPA',
  lanes: [] as Lane[],
  nodes: [
    { id: 'src', label: 'Sources', tech: 'CSV · DB · externes', role: 'identity', x: 30, y: 240 },
    { id: 'airflow', label: 'Orchestration', tech: 'Airflow', role: 'engine', x: 30, y: 400 },
    { id: 'spark', label: 'Calcul', tech: 'Spark', role: 'engine', x: 250, y: 240, key: true },
    { id: 's3', label: 'Stockage objet', tech: 'SeaweedFS', role: 'storage', x: 470, y: 150 },
    { id: 'lake', label: 'Lakehouse', tech: 'Iceberg · Polaris', role: 'storage', x: 470, y: 320, key: true },
    { id: 'ol', label: 'Événements', tech: 'OpenLineage', role: 'gov', x: 250, y: 410 },
    { id: 'nora', label: 'Profilage souverain', tech: 'NORA', role: 'gov', x: 470, y: 460 },
    { id: 'om', label: 'Catalogue & lignage', tech: 'OpenMetadata', role: 'gov', x: 710, y: 280, key: true, w: 178 },
    { id: 'milvus', label: 'Vecteurs', tech: 'Milvus', role: 'storage', x: 710, y: 460, w: 150 },
    { id: 'psync', label: 'Propagation PII', tech: 'policy-sync', role: 'gov', x: 930, y: 200, w: 178 },
    { id: 'opa', label: 'Politiques', tech: 'OPA', role: 'gov', x: 970, y: 360 },
  ] as DiagNode[],
  edges: [
    { from: 'src', to: 'spark', type: 'data', label: 'ingestion' },
    { from: 'airflow', to: 'spark', type: 'identity', label: 'orchestre' },
    { from: 'spark', to: 's3', type: 'data', label: 'écrit' },
    { from: 'spark', to: 'lake', type: 'data', label: 'écrit Iceberg' },
    { from: 'airflow', to: 'ol', type: 'lineage', label: 'émet' },
    { from: 'ol', to: 'om', type: 'lineage', label: 'lignage natif', bend: 120 },
    { from: 'nora', to: 'lake', type: 'query', label: 'profile' },
    { from: 'nora', to: 'om', type: 'data', label: 'enrichit' },
    { from: 'nora', to: 'milvus', type: 'ai', label: 'embeddings' },
    { from: 'lake', to: 'om', type: 'lineage', label: 'catalogue', bend: 50 },
    { from: 'om', to: 'psync', type: 'govern', label: 'tags PII' },
    { from: 'psync', to: 'opa', type: 'govern', label: 'masks colonnes' },
  ] as DiagEdge[],
}

export type DiagramSpec = typeof D1
export const DIAGRAMS: { key: string; tab: string; spec: DiagramSpec; blurb: string }[] = [
  { key: 'd1', tab: 'Topologie', spec: D1, blurb: 'La porte SQL unique : tout outil interroge la fédération, chaque requête est autorisée au moteur, le catalogue et le lignage suivent.' },
  { key: 'd2', tab: 'Flux IA gouverné', spec: D2, blurb: "Une question en langage naturel devient un dashboard, fondée par NORA et bornée par OPA, sur des modèles qui ne quittent pas votre infrastructure." },
  { key: 'd3', tab: 'Plan d\'accès', spec: D3, blurb: 'Les groupes Keycloak nourrissent OPA ; le masquage des colonnes et le filtrage des lignes par utilisateur sont appliqués au moteur, pour tous les outils.' },
  { key: 'd4', tab: 'Ingestion & lignage', spec: D4, blurb: 'Spark et Airflow alimentent le lakehouse ; OpenMetadata catalogue et trace ; NORA enrichit ; les tags PII deviennent des politiques.' },
]
