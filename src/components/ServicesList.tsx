import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Service { name: string; desc: string; img: string }
interface Props { locale: string; fallback: Service[] }

export default function ServicesList({ locale, fallback }: Props) {
  const [list, setList] = useState<Service[]>(fallback);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('services')
      .select('name, description, img, sort_order')
      .eq('locale', locale)
      .eq('active', true)
      .order('sort_order')
      .then(({ data, error }) => {
        if (error) { console.error('[ServicesList] Supabase error:', error); return; }
        if (!data || data.length === 0) return;
        setList(data.map((s: any) => ({ name: s.name, desc: s.description, img: s.img })));
      });
  }, [locale]);

  return (
    <div className="services-grid">
      {list.map((svc, i) => (
        <article key={i} className="service-card" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
          <div className="img-slot svc-img">{svc.img}</div>
          <div className="svc-body">
            <div className="svc-num">0{i + 1}</div>
            <h3 className="svc-name">{svc.name}</h3>
            <p className="svc-desc">{svc.desc}</p>
            <div className="svc-arrow">→</div>
          </div>
        </article>
      ))}
    </div>
  );
}
