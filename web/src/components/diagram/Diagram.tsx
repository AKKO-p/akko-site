import { useId, useMemo, useState } from 'react'
import './diagram.css'
import {
  type DiagEdge,
  type DiagNode,
  type Lane,
  type Side,
  EDGE_COLOR,
  ROLE_COLOR,
} from './types'

type Props = {
  title: string
  nodes: DiagNode[]
  edges: DiagEdge[]
  lanes?: Lane[]
  width?: number
  height?: number
  /** disable hover-dimming (e.g. inside a slide) */
  interactive?: boolean
  className?: string
}

const NODE_W = 168
const NODE_H = 56

function center(n: DiagNode) {
  return { x: n.x + (n.w ?? NODE_W) / 2, y: n.y + (n.h ?? NODE_H) / 2 }
}

function anchor(n: DiagNode, side: Side) {
  const w = n.w ?? NODE_W
  const h = n.h ?? NODE_H
  switch (side) {
    case 'top':
      return { x: n.x + w / 2, y: n.y }
    case 'bottom':
      return { x: n.x + w / 2, y: n.y + h }
    case 'left':
      return { x: n.x, y: n.y + h / 2 }
    case 'right':
      return { x: n.x + w, y: n.y + h / 2 }
  }
}

function autoSides(from: DiagNode, to: DiagNode): [Side, Side] {
  const a = center(from)
  const b = center(to)
  const dx = b.x - a.x
  const dy = b.y - a.y
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0 ? ['right', 'left'] : ['left', 'right']
  }
  return dy >= 0 ? ['bottom', 'top'] : ['top', 'bottom']
}

function outDir(side: Side): [number, number] {
  switch (side) {
    case 'top':
      return [0, -1]
    case 'bottom':
      return [0, 1]
    case 'left':
      return [-1, 0]
    case 'right':
      return [1, 0]
  }
}

function edgePath(from: DiagNode, to: DiagNode, e: DiagEdge): string {
  const [fs, ts] = e.fromSide && e.toSide ? [e.fromSide, e.toSide] : autoSides(from, to)
  const p1 = anchor(from, fs)
  const p2 = anchor(to, ts)
  if (e.route === 'straight') return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`
  const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y)
  const k = e.bend ?? Math.min(120, Math.max(40, dist * 0.4))
  const [dx1, dy1] = outDir(fs)
  const [dx2, dy2] = outDir(ts)
  const c1 = { x: p1.x + dx1 * k, y: p1.y + dy1 * k }
  const c2 = { x: p2.x + dx2 * k, y: p2.y + dy2 * k }
  return `M ${p1.x} ${p1.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`
}

export default function Diagram({
  title,
  nodes,
  edges,
  lanes = [],
  width = 1040,
  height = 620,
  interactive = true,
  className,
}: Props) {
  const uid = useId().replace(/:/g, '')
  const [hover, setHover] = useState<string | null>(null)
  const byId = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes])

  const connected = useMemo(() => {
    if (!hover) return null
    const set = new Set<string>([hover])
    edges.forEach((e) => {
      if (e.from === hover) set.add(e.to)
      if (e.to === hover) set.add(e.from)
    })
    return set
  }, [hover, edges])

  const edgeTypes = useMemo(() => Array.from(new Set(edges.map((e) => e.type))), [edges])

  return (
    <figure className={`dgm${className ? ' ' + className : ''}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="dgm__svg"
        role="img"
        aria-label={title}
        preserveAspectRatio="xMidYMid meet"
      >
        <title>{title}</title>
        <defs>
          <linearGradient id={`${uid}-grad`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7c5cff" />
            <stop offset="1" stopColor="#4dd4e5" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {edgeTypes.map((t) => (
            <marker
              key={t}
              id={`${uid}-arrow-${t}`}
              viewBox="0 0 10 10"
              refX="8.5"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={EDGE_COLOR[t]} />
            </marker>
          ))}
        </defs>

        {/* lanes */}
        {lanes.map((l, i) => (
          <g key={`lane-${i}`} className="dgm__lane">
            <rect
              x={l.x}
              y={l.y}
              width={l.w}
              height={l.h}
              rx="16"
              fill={ROLE_COLOR[l.role]}
              fillOpacity="0.035"
              stroke={ROLE_COLOR[l.role]}
              strokeOpacity="0.16"
            />
            <text x={l.x + 16} y={l.y + 22} className="dgm__lane-label" fill={ROLE_COLOR[l.role]}>
              {l.label.toUpperCase()}
            </text>
          </g>
        ))}

        {/* edges */}
        {edges.map((e, i) => {
          const from = byId[e.from]
          const to = byId[e.to]
          if (!from || !to) return null
          const dim = connected ? !(connected.has(e.from) && connected.has(e.to)) : false
          const active = hover != null && (e.from === hover || e.to === hover)
          const d = edgePath(from, to, e)
          const color = EDGE_COLOR[e.type]
          return (
            <g key={`e-${i}`} className={`dgm__edge${dim ? ' is-dim' : ''}${active ? ' is-active' : ''}`}>
              <path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={active ? 2.4 : 1.6}
                strokeOpacity={active ? 1 : 0.62}
                markerEnd={`url(#${uid}-arrow-${e.type})`}
                strokeDasharray={e.dashed ? '5 6' : undefined}
                className="dgm__edge-path"
              />
              {e.label && active && (
                <EdgeLabel d={d} text={e.label} color={color} />
              )}
            </g>
          )
        })}

        {/* nodes */}
        {nodes.map((n) => {
          const w = n.w ?? NODE_W
          const h = n.h ?? NODE_H
          const dim = connected ? !connected.has(n.id) : false
          const stroke = n.key ? `url(#${uid}-grad)` : ROLE_COLOR[n.role]
          return (
            <g
              key={n.id}
              className={`dgm__node${n.key ? ' is-key' : ''}${dim ? ' is-dim' : ''}`}
              transform={`translate(${n.x} ${n.y})`}
              onMouseEnter={interactive ? () => setHover(n.id) : undefined}
              onMouseLeave={interactive ? () => setHover(null) : undefined}
              filter={n.key ? `url(#${uid}-glow)` : undefined}
            >
              <rect
                width={w}
                height={h}
                rx="11"
                className="dgm__node-box"
                stroke={stroke}
                strokeWidth={n.key ? 1.8 : 1.3}
              />
              <rect x="0" y="0" width="3.5" height={h} rx="2" fill={ROLE_COLOR[n.role]} />
              <text x="16" y={n.tech ? 24 : h / 2 + 5} className="dgm__node-label">
                {n.label}
              </text>
              {n.tech && (
                <text x="16" y="40" className="dgm__node-tech">
                  {n.tech}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* legend */}
      <figcaption className="dgm__legend">
        {edgeTypes.map((t) => (
          <span className="dgm__leg" key={t}>
            <i style={{ background: EDGE_COLOR[t] }} />
            {labelFor(t)}
          </span>
        ))}
      </figcaption>
    </figure>
  )
}

function labelFor(t: string): string {
  const m: Record<string, string> = {
    data: 'flux de données',
    query: 'requête fédérée',
    govern: "décision d'accès",
    identity: 'identité',
    ai: 'grounding / inférence',
    lineage: 'catalogue / lignage',
  }
  return m[t] ?? t
}

// midpoint label chip, placed at the path's parametric center
function EdgeLabel({ d, text, color }: { d: string; text: string; color: string }) {
  const mid = useMemo(() => midpointOfCubic(d), [d])
  if (!mid) return null
  const w = text.length * 6.4 + 14
  return (
    <g transform={`translate(${mid.x - w / 2} ${mid.y - 10})`} className="dgm__edge-label">
      <rect width={w} height="20" rx="6" />
      <text x={w / 2} y="14" fill={color}>
        {text}
      </text>
    </g>
  )
}

function midpointOfCubic(d: string): { x: number; y: number } | null {
  // parse "M x y C c1x c1y c2x c2y x2 y2" (or L for straight)
  const nums = d.match(/-?\d+(\.\d+)?/g)?.map(Number)
  if (!nums) return null
  if (d.includes('C') && nums.length >= 8) {
    const [x0, y0, x1, y1, x2, y2, x3, y3] = nums
    const t = 0.5
    const mt = 1 - t
    const x = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3
    const y = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3
    return { x, y }
  }
  if (nums.length >= 4) {
    return { x: (nums[0] + nums[2]) / 2, y: (nums[1] + nums[3]) / 2 }
  }
  return null
}
