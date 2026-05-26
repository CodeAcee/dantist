interface Props {
  style?: React.CSSProperties;
  variant?: 'dark' | 'light';
}

export default function GrainientBg({ style, variant = 'dark' }: Props) {
  const stops =
    variant === 'dark'
      ? 'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(61,89,65,0.9) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(200,169,110,0.12) 0%, transparent 55%), radial-gradient(ellipse 100% 100% at 50% 50%, rgba(42,61,46,0.98) 0%, rgba(26,40,28,1) 100%)'
      : 'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(245,240,232,0.95) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(200,169,110,0.15) 0%, transparent 55%), radial-gradient(ellipse 100% 100% at 50% 50%, rgba(240,235,220,1) 0%, rgba(230,225,210,1) 100%)';

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* Animated gradient layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: stops,
          animation: 'grainientShift 8s ease-in-out infinite alternate',
        }}
      />

      {/* Grain overlay — SVG noise filter */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: variant === 'dark' ? 0.4 : 0.25 }}>
        <filter id={`grain-${variant}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="multiply" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${variant})`} opacity="1" />
      </svg>

      {/* Subtle chromatic aberration shimmer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, transparent 40%, rgba(200,169,110,0.06) 50%, transparent 60%)',
          animation: 'grainientSweep 6s ease-in-out infinite',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  );
}
