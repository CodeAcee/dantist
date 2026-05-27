import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface Member {
  name: string;
  title: string;
  bio: string;
  years: number;
  yearsLabel: string;
  imgAlt: string;
}

interface Props {
  locale: string;
  fallback: Member[];
  prevLabel?: string;
  nextLabel?: string;
}

function fromRow(r: any): Member {
  return {
    name: r.name,
    title: r.title,
    bio: r.bio,
    years: r.years,
    yearsLabel: r.years_label,
    imgAlt: r.img_alt,
  };
}

export default function TeamSlider({ locale, fallback, prevLabel = '←', nextLabel = '→' }: Props) {
  const [members, setMembers] = useState<Member[]>(fallback);
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<'left' | 'right'>('right');
  const [animating, setAnimating] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('team')
      .select('*')
      .eq('locale', locale)
      .eq('active', true)
      .order('sort_order')
      .then(({ data, error }) => {
        if (error) { console.error('[TeamSlider] Supabase error:', error); return; }
        if (data && data.length > 0) setMembers(data.map(fromRow));
      });
  }, [locale]);

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
            background: 'linear-gradient(135deg, var(--forest-mid), var(--forest))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(201,168,124,0.2)',
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond',serif", fontSize: 32,
              color: 'rgba(253,249,248,.12)', textAlign: 'center', padding: 16, lineHeight: 1.3,
            }}>
              {m.imgAlt}
            </div>
          </div>
          {/* Years badge */}
          <div style={{
            position: 'absolute', bottom: -14, right: -14,
            background: 'var(--gold)', color: 'var(--forest)',
            padding: '12px 16px', borderRadius: 2, textAlign: 'center',
            boxShadow: '0 4px 20px rgba(201,168,124,.35)',
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 300, lineHeight: 1 }}>{m.years}</div>
            <div style={{ fontSize: 8, letterSpacing: '.12em', textTransform: 'uppercase', marginTop: 3 }}>{m.yearsLabel}</div>
          </div>
        </div>

        {/* Text */}
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontStyle: 'italic', color: 'var(--forest)', marginBottom: 4 }}>
            {m.name}
          </div>
          <div style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rose)', marginBottom: 20 }}>
            {m.title}
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.8, margin: 0 }}>{m.bio}</p>
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
                  background: i === idx ? 'var(--rose)' : 'rgba(196,132,154,.3)',
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
  width: 40, height: 40, borderRadius: 2,
  border: '1px solid rgba(196,132,154,0.3)',
  background: 'transparent', color: 'var(--rose)', fontSize: 16, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'all .2s ease',
};
