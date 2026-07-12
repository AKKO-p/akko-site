import { useId } from 'react'

type Props = {
  /** opacity of the trame, 0.03–0.04 per the system; default 0.035 */
  opacity?: number
  className?: string
}

/**
 * BlasonField — the proprietary background motif: a trame of concentric squares,
 * monochrome graphite, laid at 3–4% only on section separators and breathing
 * zones. It reads "perimeter", never decoration. Never a gradient, never glass.
 * The parent positions it (absolute, behind content, aria-hidden).
 */
export default function BlasonField({ opacity = 0.035, className }: Props) {
  const id = useId().replace(/:/g, '')
  const pid = `bf-${id}`
  return (
    <svg
      className={className}
      aria-hidden
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, opacity, pointerEvents: 'none', color: 'var(--text)' }}
    >
      <defs>
        <pattern id={pid} width="72" height="72" patternUnits="userSpaceOnUse" patternTransform="translate(0 0)">
          {/* three concentric squares = one blason cell, tiled */}
          <rect x="6" y="6" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="21" y="21" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="31.5" y="31.5" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  )
}
