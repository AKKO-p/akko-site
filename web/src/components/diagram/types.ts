// Shared vocabulary for the AKKO architecture diagram system.
// One grammar, reused by every diagram (site + deck mirror it).

export type Role =
  | 'engine' // moteurs (violet)
  | 'storage' // stockage / lakehouse (cyan)
  | 'gov' // gouvernance (amber)
  | 'science' // data science (vert)
  | 'ai' // IA gouvernée (dégradé)
  | 'identity' // identité / edge (neutre)

export type EdgeType =
  | 'data' // déplacement / écriture de données (cyan)
  | 'query' // requête / fédération (violet)
  | 'govern' // décision d'autorisation (amber)
  | 'identity' // identité / authentification (neutre)
  | 'ai' // grounding / inférence (dégradé)
  | 'lineage' // catalogue / lignage (vert)

export type DiagNode = {
  id: string
  label: string
  tech?: string
  role: Role
  /** top-left, in the diagram's viewBox coordinate space */
  x: number
  y: number
  w?: number
  h?: number
  /** key node: gradient border + glow */
  key?: boolean
}

export type DiagEdge = {
  from: string
  to: string
  type: EdgeType
  label?: string
  /** routing style */
  route?: 'curve' | 'straight' | 'elbow-h' | 'elbow-v'
  /** anchor sides override (auto by default) */
  fromSide?: Side
  toSide?: Side
  /** curve bend strength */
  bend?: number
  dashed?: boolean
}

export type Side = 'top' | 'right' | 'bottom' | 'left'

export type Lane = {
  label: string
  role: Role
  x: number
  y: number
  w: number
  h: number
}

export const ROLE_COLOR: Record<Role, string> = {
  engine: '#9b86ff',
  storage: '#4dd4e5',
  gov: '#ffb454',
  science: '#41d693',
  ai: '#b58cff',
  identity: '#8b93b0',
}

export const EDGE_COLOR: Record<EdgeType, string> = {
  data: '#4dd4e5',
  query: '#9b86ff',
  govern: '#ffb454',
  identity: '#8b93b0',
  ai: '#b58cff',
  lineage: '#41d693',
}

export const EDGE_LABEL: Record<EdgeType, string> = {
  data: 'données',
  query: 'requête',
  govern: 'autorise',
  identity: 'identité',
  ai: 'IA',
  lineage: 'lignage',
}
