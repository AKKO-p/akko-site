// Shared vocabulary for the AKKO architecture diagram system.
// One grammar, reused by every diagram (site + deck mirror it).

export type Role =
  | 'engine' // moteurs (accent indigo)
  | 'storage' // stockage / lakehouse (bleu calme)
  | 'gov' // gouvernance (ambre)
  | 'science' // data science (vert)
  | 'ai' // IA gouvernée (violet)
  | 'identity' // identité / edge (neutre)

export type EdgeType =
  | 'data' // déplacement / écriture de données (bleu)
  | 'query' // requête / fédération (accent indigo)
  | 'govern' // décision d'autorisation (ambre)
  | 'identity' // identité / authentification (neutre)
  | 'ai' // grounding / inférence (violet)
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
  /** key node: accent border, no glow */
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

// Colours are driven by the shared design tokens (theme-aware, disciplined):
// engine = the indigo accent, storage = a calm blue — never cyan, no gradient.
// Applied in the SVG via `color`/currentColor so light & dark both resolve.
export const ROLE_VAR: Record<Role, string> = {
  engine: 'var(--c-engine)',
  storage: 'var(--c-storage)',
  gov: 'var(--c-gov)',
  science: 'var(--c-science)',
  ai: 'var(--c-ai)',
  identity: 'var(--text-muted)',
}

export const EDGE_VAR: Record<EdgeType, string> = {
  data: 'var(--c-storage)',
  query: 'var(--c-engine)',
  govern: 'var(--c-gov)',
  identity: 'var(--text-muted)',
  ai: 'var(--c-ai)',
  lineage: 'var(--c-science)',
}

export const EDGE_LABEL: Record<EdgeType, string> = {
  data: 'données',
  query: 'requête',
  govern: 'autorise',
  identity: 'identité',
  ai: 'IA',
  lineage: 'lignage',
}
