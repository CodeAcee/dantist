import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Review { quote: string; name: string; since: string; bg: string; color: string; initials: string }
interface Props { locale: string; sinceLabel: string; fallback: Review[] }

function fromRow(r: any): Review {
  return {
    quote:    r.quote,
    name:     r.name,
    since:    r.since,
    bg:       r.bg,
    color:    r.color,
    initials: r.initials,
  };
}

export default function ReviewsList({ locale, sinceLabel, fallback }: Props) {
  const [reviews, setReviews] = useState<Review[]>(fallback);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('reviews')
      .select('*')
      .eq('locale', locale)
      .eq('active', true)
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setReviews(data.map(fromRow));
      });
  }, [locale]);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 20,
    }}>
      {reviews.map((r, i) => (
        <article key={i} style={{
          background: '#fff',
          borderRadius: 2,
          padding: '32px 28px',
          border: '1px solid rgba(200,169,110,.12)',
          transition: 'box-shadow .3s',
        }}>
          <div style={{ color: '#c8a96e', fontSize: 13, letterSpacing: 2, marginBottom: 16 }}>★★★★★</div>
          <blockquote style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 17, fontWeight: 400, fontStyle: 'italic',
            color: '#2a3d2e', lineHeight: 1.5, marginBottom: 24,
          }}>
            "{r.quote}"
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: r.bg, color: r.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 500, flexShrink: 0,
            }}>
              {r.initials}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1f1b' }}>{r.name}</div>
              <div style={{ fontSize: 11, color: '#7a8578' }}>{sinceLabel} {r.since}</div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
