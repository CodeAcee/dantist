import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface FormT {
  name: string; namePlaceholder: string;
  phone: string; phonePlaceholder: string;
  service: string; servicePlaceholder: string; services: string[];
  via: string; viaPlaceholder: string; vias: string[];
  note: string; notePlaceholder: string;
  submit: string; sending: string;
  successTitle: string; successBody: string; error: string;
  trust: string[];
}

interface Props { ft: FormT; source?: string; compact?: boolean }


const base: React.CSSProperties = {
  width:'100%', padding:'10px 12px', background:'#fff',
  border:'1px solid rgba(200,169,110,0.25)', fontFamily:"'DM Sans',system-ui,sans-serif",
  fontSize:13, color:'#1a1f1b', outline:'none', marginBottom:10, borderRadius:2,
};
const lbl: React.CSSProperties = {
  display:'block', fontSize:9, letterSpacing:'.14em',
  textTransform:'uppercase', color:'#7a8578', marginBottom:5,
};

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm({ ft, source = 'main_form', compact = false }: Props) {
  const [form, setForm] = useState({ name:'', phone:'', service:'', contact_via:'', note:'' });
  const [status, setStatus] = useState<Status>('idle');

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus('loading');
    try {
      if (!supabase) {
        await new Promise(r => setTimeout(r, 800));
        setStatus('success');
        return;
      }
      const { error } = await supabase.from('contact_requests').insert({
        name: form.name.trim(), phone: form.phone.trim(),
        service: form.service || null, contact_via: form.contact_via || null,
        note: form.note.trim() || null, source,
      });
      if (error) throw error;
      setStatus('success');
    } catch { setStatus('error'); }
  };

  if (status === 'success') return (
    <div style={{ textAlign:'center', padding:'40px 20px' }}>
      <div style={{ fontSize:36, marginBottom:12, color:'#2a3d2e' }}>✓</div>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, color:'#2a3d2e', marginBottom:8 }}>{ft.successTitle}</div>
      <p style={{ fontSize:13, color:'#7a8578', lineHeight:1.6 }}>{ft.successBody}</p>
    </div>
  );

  return (
    <form onSubmit={submit}>
      <div style={{ display:'grid', gridTemplateColumns: compact ? '1fr' : '1fr 1fr', gap:12 }}>
        <div>
          <label style={lbl}>{ft.name}</label>
          <input required type="text" placeholder={ft.namePlaceholder} value={form.name} onChange={set('name')} style={base} />
        </div>
        <div>
          <label style={lbl}>{ft.phone}</label>
          <input required type="tel" placeholder={ft.phonePlaceholder} value={form.phone} onChange={set('phone')} style={base} />
        </div>
      </div>

      <div>
        <label style={lbl}>{ft.service}</label>
        <select value={form.service} onChange={set('service')} style={{ ...base, appearance:'none', cursor:'pointer', color: form.service ? '#1a1f1b' : '#7a8578' }}>
          <option value="">{ft.servicePlaceholder}</option>
          {ft.services.map((s: string) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label style={lbl}>{ft.via}</label>
        <select value={form.contact_via} onChange={set('contact_via')} style={{ ...base, appearance:'none', cursor:'pointer', color: form.contact_via ? '#1a1f1b' : '#7a8578' }}>
          <option value="">{ft.viaPlaceholder}</option>
          {ft.vias.map((v: string) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      {!compact && (
        <div>
          <label style={lbl}>{ft.note}</label>
          <textarea placeholder={ft.notePlaceholder} rows={3} value={form.note} onChange={set('note')}
            style={{ ...base, resize:'vertical', lineHeight:1.6 }} />
        </div>
      )}

      <button type="submit" disabled={status === 'loading'}
        style={{ width:'100%', background: status === 'loading' ? '#3d5941' : '#2a3d2e', color:'#f5f0e8', fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', padding:15, border:'none', borderRadius:2, cursor: status === 'loading' ? 'wait' : 'pointer', transition:'background .2s', marginTop:4 }}>
        {status === 'loading' ? ft.sending : ft.submit}
      </button>

      {status === 'error' && (
        <p style={{ marginTop:10, fontSize:12, color:'#c0392b', textAlign:'center' }}>{ft.error}</p>
      )}

      <div style={{ display:'flex', gap:20, marginTop:16, paddingTop:14, borderTop:'1px solid rgba(200,169,110,0.2)', flexWrap:'wrap' }}>
        {ft.trust.map((t: string) => (
          <div key={t} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#7a8578' }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:'#c8a96e', flexShrink:0 }} />{t}
          </div>
        ))}
      </div>
    </form>
  );
}
