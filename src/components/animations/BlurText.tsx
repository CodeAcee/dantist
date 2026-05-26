import { useState, useEffect, useRef } from 'react';

interface Props {
  children: string;
  delay?: number;
  style?: React.CSSProperties;
}

export default function BlurText({ children, delay = 0, style = {} }: Props) {
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
    <span ref={ref} style={{ display: 'inline', ...style }}>
      {children.split(' ').map((w, i) => (
        <span key={i} style={{
          display: 'inline-block',
          opacity: visible ? 1 : 0,
          filter: visible ? 'blur(0)' : 'blur(12px)',
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          transition: `all 0.6s ${delay + i * 0.15}s cubic-bezier(.16,1,.3,1)`,
          marginRight: '0.3em',
        }}>{w}</span>
      ))}
    </span>
  );
}
