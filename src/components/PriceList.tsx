import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Item { name: string; price: string }
interface Cat  { cat: string; items: Item[] }
interface Props { locale: string; fallback: Cat[] }

export default function PriceList({ locale, fallback }: Props) {
  const [cats, setCats] = useState<Cat[]>(fallback);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('price_categories')
      .select('id, name, sort_order, price_items(name, price, sort_order, active)')
      .eq('locale', locale)
      .eq('active', true)
      .order('sort_order')
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        const mapped: Cat[] = data.map((cat: any) => ({
          cat: cat.name,
          items: (cat.price_items as any[])
            .filter((i: any) => i.active)
            .sort((a: any, b: any) => a.sort_order - b.sort_order)
            .map((i: any) => ({ name: i.name, price: i.price })),
        }));
        setCats(mapped);
      });
  }, [locale]);

  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:32 }}>
      {cats.map((cat, i) => (
        <div key={i} style={{
          background:'#fff', padding:'28px 24px',
          border:'1px solid rgba(201,168,124,.12)', borderRadius:2,
        }}>
          <div style={{
            fontSize:9, letterSpacing:'.18em', textTransform:'uppercase',
            color:'var(--gold)', marginBottom:20, paddingBottom:12,
            borderBottom:'1px solid rgba(201,168,124,.18)',
          }}>
            {cat.cat}
          </div>
          {cat.items.map((item, j) => (
            <div key={j} style={{ display:'flex', alignItems:'baseline', gap:6, marginBottom:10, fontSize:13 }}>
              <span style={{ color:'var(--text-dark)', whiteSpace:'nowrap' }}>{item.name}</span>
              <span style={{ flex:1, borderBottom:'1px dotted rgba(196,132,154,.35)', marginBottom:3 }} />
              <span style={{ color:'var(--forest)', fontWeight:500, whiteSpace:'nowrap' }}>{item.price}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
