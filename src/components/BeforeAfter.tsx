import { useState, useRef, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Case { beforeLabel: string; afterLabel: string; treatment: string; duration: string }
interface Props { locale: string; fallback: Case[] }

function fromRow(r: any): Case {
  return {
    beforeLabel: r.before_label,
    afterLabel:  r.after_label,
    treatment:   r.treatment,
    duration:    r.duration,
  };
}

function Slider({ c, num }: { c: Case; num: number }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos(Math.round(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)) * 100));
  }, []);

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true;
    handleMove('touches' in e ? e.touches[0].clientX : e.clientX);
  };

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      handleMove('touches' in e ? e.touches[0].clientX : e.clientX);
    };
    const up = () => { dragging.current = false; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
  }, [handleMove]);

  return (
    <div>
      <div ref={containerRef} onMouseDown={onDown} onTouchStart={onDown}
        style={{ position:'relative', height:280, borderRadius:2, overflow:'hidden', cursor:'ew-resize', userSelect:'none', border:'1px solid rgba(200,169,110,0.18)', touchAction:'none' }}>
        {/* Before panel */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#e0d8cc,#d0c8bc)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:48, opacity:.07, userSelect:'none' }}>Before</div>
        </div>
        {/* After panel */}
        <div style={{ position:'absolute', inset:0, clipPath:`inset(0 ${100-pos}% 0 0)` }}>
          <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#faf8f3,#e8f0e4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:48, opacity:.07, color:'#2a3d2e', userSelect:'none' }}>After</div>
          </div>
        </div>
        {/* Divider */}
        <div style={{ position:'absolute', top:0, bottom:0, left:`${pos}%`, transform:'translateX(-50%)', width:2, background:'#c8a96e', zIndex:10, pointerEvents:'none' }}>
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:38, height:38, borderRadius:'50%', background:'#c8a96e', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 12px rgba(0,0,0,.15)' }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M7 4L3 10L7 16" stroke="#2a3d2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 4L17 10L13 16" stroke="#2a3d2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
        {/* Corner badges */}
        <div style={{ position:'absolute', top:10, left:10, fontSize:8, letterSpacing:'.14em', textTransform:'uppercase', color:'#7a8578', zIndex:5, background:'rgba(245,240,232,.82)', padding:'3px 8px' }}>Before</div>
        <div style={{ position:'absolute', top:10, right:10, fontSize:8, letterSpacing:'.14em', textTransform:'uppercase', color:'#2a3d2e', zIndex:5, background:'rgba(245,240,232,.82)', padding:'3px 8px' }}>After</div>
      </div>
      {/* Metadata row */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginTop:10 }}>
        <div>
          <span style={{ fontFamily:'Cormorant Garamond,serif', fontSize:13, color:'#2a3d2e', fontStyle:'italic' }}>#{num}</span>
          <span style={{ fontSize:11, color:'#7a8578', marginLeft:8 }}>{c.treatment}</span>
        </div>
        <span style={{ fontSize:10, color:'#c8a96e', letterSpacing:'.06em' }}>{c.duration}</span>
      </div>
      {/* Before / after labels below slider */}
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
        <span style={{ fontSize:11, color:'#7a8578' }}>{c.beforeLabel}</span>
        <span style={{ fontSize:11, color:'#2a3d2e', textAlign:'right', maxWidth:'50%' }}>{c.afterLabel}</span>
      </div>
    </div>
  );
}

export default function BeforeAfter({ locale, fallback }: Props) {
  const [cases, setCases] = useState<Case[]>(fallback);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('cases')
      .select('*')
      .eq('locale', locale)
      .eq('active', true)
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setCases(data.map(fromRow));
      });
  }, [locale]);

  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:32 }}>
      {cases.map((c, i) => <Slider key={i} c={c} num={i+1} />)}
    </div>
  );
}
