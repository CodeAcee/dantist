import { useState, useEffect, useRef } from 'react';

interface Props {
  children: string;
  delay?: number;
  style?: React.CSSProperties;
}

export default function SplitText({ children, delay = 0, style = {} }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (typeof children !== 'string') return <span style={style}>{children}</span>;

  return (
    <span ref={ref} style={{ display: 'inline-block', perspective: '600px', ...style }}>
      {children.split('').map((c, i) => (
        <span key={i} style={{
          display: 'inline-block',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) rotateX(0)' : 'translateY(100%) rotateX(-80deg)',
          transition: `all 0.45s ${delay + i * 0.032}s cubic-bezier(.16,1,.3,1)`,
          transformOrigin: 'bottom center',
          whiteSpace: c === ' ' ? 'pre' : undefined,
        }}>{c === ' ' ? ' ' : c}</span>
      ))}
    </span>
  );
}
