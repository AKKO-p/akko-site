type Props = {
  size?: number
  /** inner-square fill = the layer hue (var(--c-…)); defaults to gold */
  tint?: string
  /** dim the outer squares when the chip sits on a busy row */
  muted?: boolean
  className?: string
}

/**
 * BlasonChip — the layer marker. The three nested squares of the blason, drawn
 * as a compact glyph whose INNERMOST square carries the layer's hue. Used as a
 * nav entry / list bullet / capture corner. One chip per context; hues never
 * pair up outside the 5-layer overview.
 */
export default function BlasonChip({ size = 16, tint = 'var(--accent)', muted = false, className }: Props) {
  const outline = muted ? 'var(--text-faint)' : 'currentColor'
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-hidden
      style={{ flex: '0 0 auto' }}
    >
      <rect x="2" y="2" width="20" height="20" rx="3" stroke={outline} strokeWidth="1.6" opacity={muted ? 0.5 : 0.75} />
      <rect x="7" y="7" width="10" height="10" rx="2" stroke={outline} strokeWidth="1.5" opacity={muted ? 0.6 : 0.85} />
      <rect x="10.5" y="10.5" width="3" height="3" rx="0.8" fill={tint} />
    </svg>
  )
}
