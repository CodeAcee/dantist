import { useState, useEffect, useRef } from 'react';
import ContactForm from './ContactForm';

interface PopupT { title: string; titleEm: string; sub: string }
interface Props { t: PopupT; ft: Record<string, any> }

type State = 'idle' | 'entering' | 'visible' | 'leaving';

export default function ScrollPopup({ t, ft }: Props) {
  const [state, setState] = useState<State>('idle');
  const ticks  = useRef(0);
  const timer  = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handler = () => {
      ticks.current++;
      if (state === 'idle' && ticks.current % 25 === 0 && ticks.current > 10) {
        setState('entering');
        timer.current = setTimeout(() => setState('leaving'), 6000);
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [state]);

  const onAnimationEnd = () => {
    if (state === 'leaving') setState('idle');
    if (state === 'entering') setState('visible');
  };

  const dismiss = () => {
    clearTimeout(timer.current);
    setState('leaving');
    ticks.current = -9999;
  };

  if (state === 'idle') return null;

  const animation =
    state === 'entering' ? 'slideIn .45s cubic-bezier(.16,1,.3,1) forwards' :
    state === 'leaving'  ? 'slideOut .3s ease forwards' : 'none';

  return (
    <div onAnimationEnd={onAnimationEnd} style={{ position:'fixed', bottom:24, right:24, width:320, zIndex:999, background:'#f5f0e8', border:'1px solid rgba(200,169,110,0.3)', padding:24, boxShadow:'0 8px 40px rgba(42,61,46,0.12)', animation, willChange:'transform,opacity' }}>
      <button onClick={dismiss} style={{ position:'absolute', top:10, right:12, background:'none', border:'none', fontSize:18, color:'#7a8578', cursor:'pointer', lineHeight:1 }} aria-label="Close">×</button>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:300, color:'#2a3d2e', marginBottom:4 }}>
        {t.title}<em style={{ fontStyle:'italic', color:'#c8a96e' }}>{t.titleEm}</em>
      </div>
      <div style={{ fontSize:11, color:'#7a8578', marginBottom:16 }}>{t.sub}</div>
      <ContactForm ft={ft} source="scroll_popup" compact />
    </div>
  );
}
