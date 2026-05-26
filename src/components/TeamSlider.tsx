import { useState, useEffect, useRef } from 'react';

interface Member {
  name: string;
  title: string;
  bio: string;
  years: number;
  yearsLabel: string;
  imgAlt: string;
}

interface Props {
  members: Member[];
  prevLabel?: string;
  nextLabel?: string;
}

export default function TeamSlider({ members, prevLabel = '←', nextLabel = '→' }: Props) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<'left' | 'right'>('right');
  const [animating, setAnimating] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const go = (next: number, direction: 'left' | 'right') => {
    if (animating) return;
    setDir(direction);
    setAnimating(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setIdx(next);
      setAnimating(false);
    }, 320);
  };

  const prev = () => go((idx - 1 + members.length) % members.length, 'right');
  const next = () => go((idx + 1) % members.length, 'left');

  const m = members[idx];

  const slideStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: 40,
    alignItems: 'center',
    opacity: animating ? 0 : 1,
    transform: animating ? `translateX(${dir === 'left' ? '-24px' : '24px'})` : 'translateX(0)',
    transition: 'opacity .32s ease, transform .32s ease',
  };

  return (
    <div>
      <div style={slideStyle}>
        {/* Photo placeholder */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 200, height: 240, borderRadius: 2, overflow: 'hidden',
            background: 'linear-gradient(135deg,#3d5941,#2a3d2e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(200,169,110,0.2)',
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, color: 'rgba(245,240,232,.15)', textAlign: 'center', padding: 16, lineHeight: 1.3 }}>
              {m.imgAlt}
            </div>
          </div>
          {/* Years badge */}
          <div style={{
            position: 'absolute', bottom: -14, right: -14,
            background: '#c8a96e', color: '#2a3d2e',
            padding: '12px 16px', borderRadius: 2, textAlign: 'center',
            boxShadow: '0 4px 20px rgba(200,169,110,.3)',
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 300, lineHeight: 1 }}>{m.years}</div>
            <div style={{ fontSize: 8, letterSpacing: '.12em', textTransform: 'uppercase', marginTop: 3 }}>{m.yearsLabel}</div>
          </div>
        </div>

        {/* Text */}
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontStyle: 'italic', color: '#2a3d2e', marginBottom: 4 }}>
            {m.name}
          </div>
          <div style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#c8a96e', marginBottom: 20 }}>
            {m.title}
          </div>
          <p style={{ fontSize: 14, color: '#5a6b5c', lineHeight: 1.8, margin: 0 }}>{m.bio}</p>
        </div>
      </div>

      {/* Nav */}
      {members.length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 40 }}>
          <button onClick={prev} style={btnStyle} aria-label="Previous team member">{prevLabel}</button>
          <div style={{ display: 'flex', gap: 6 }}>
            {members.map((_, i) => (
              <button key={i} onClick={() => go(i, i > idx ? 'left' : 'right')}
                style={{
                  width: i === idx ? 24 : 6, height: 6, borderRadius: 3,
                  background: i === idx ? '#c8a96e' : 'rgba(200,169,110,.3)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all .3s ease',
                }}
                aria-label={`Go to team member ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} style={btnStyle} aria-label="Next team member">{nextLabel}</button>
        </div>
      )}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  width: 40, height: 40, borderRadius: 2, border: '1px solid rgba(200,169,110,0.3)',
  background: 'transparent', color: '#c8a96e', fontSize: 16, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'all .2s ease',
};
