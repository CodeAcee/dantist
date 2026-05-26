import { useState } from 'react';

const SERVICES = ['Free consultation', 'Cosmetic / veneers', 'Implants', 'Whitening', 'Invisalign', 'Checkup', 'Emergency'];
const CONTACTS = ['Phone call', 'Telegram', 'Viber', 'WhatsApp'];

const base: React.CSSProperties = {
  width: '100%', padding: '10px 12px', background: '#fff',
  border: '1px solid rgba(200,169,110,0.25)', fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: 13, color: '#1a1f1b', outline: 'none', marginBottom: 10, borderRadius: 2,
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 9, letterSpacing: '.14em',
  textTransform: 'uppercase', color: '#7a8578', marginBottom: 5,
};

type Status = 'idle' | 'loading' | 'success' | 'error';

interface Props {
  source?: string;
  compact?: boolean;
}

export default function ContactForm({ source = 'main_form', compact = false }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', service: '', contact_via: '', note: '' });
  const [status, setStatus] = useState<Status>('idle');

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: '#2a3d2e', marginBottom: 8 }}>Thank you!</div>
        <p style={{ fontSize: 13, color: '#7a8578', lineHeight: 1.6 }}>We'll call you back within 2 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1fr 1fr', gap: 12, marginBottom: 0 }}>
        <div>
          <label style={labelStyle}>Your name</label>
          <input required type="text" placeholder="Kateryna" value={form.name} onChange={set('name')} style={base} />
        </div>
        <div>
          <label style={labelStyle}>Phone *</label>
          <input required type="tel" placeholder="+38 (0__) ___-__-__" value={form.phone} onChange={set('phone')} style={base} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Service</label>
        <select value={form.service} onChange={set('service')} style={{ ...base, appearance: 'none', cursor: 'pointer', color: form.service ? '#1a1f1b' : '#7a8578' }}>
          <option value="">Choose...</option>
          {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Contact via</label>
        <select value={form.contact_via} onChange={set('contact_via')} style={{ ...base, appearance: 'none', cursor: 'pointer', color: form.contact_via ? '#1a1f1b' : '#7a8578' }}>
          <option value="">Choose...</option>
          {CONTACTS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {!compact && (
        <div>
          <label style={labelStyle}>Note (optional)</label>
          <textarea placeholder="E.g. — prefer mornings, a bit anxious..." rows={3} value={form.note} onChange={set('note')}
            style={{ ...base, resize: 'vertical', lineHeight: 1.6 }} />
        </div>
      )}

      <button type="submit" disabled={status === 'loading'}
        style={{ width: '100%', background: status === 'loading' ? '#3d5941' : '#2a3d2e', color: '#f5f0e8', fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', padding: 15, border: 'none', borderRadius: 2, cursor: status === 'loading' ? 'wait' : 'pointer', transition: 'background .2s', marginTop: 4 }}>
        {status === 'loading' ? 'Sending...' : 'Send request →'}
      </button>

      {status === 'error' && (
        <p style={{ marginTop: 10, fontSize: 12, color: '#c0392b', textAlign: 'center' }}>Something went wrong. Please call us directly.</p>
      )}

      <div style={{ display: 'flex', gap: 20, marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(200,169,110,0.2)', flexWrap: 'wrap' }}>
        {['Reply within 2 hours', 'No spam, ever', 'Free first visit'].map(t => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#7a8578' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#c8a96e', flexShrink: 0 }} />{t}
          </div>
        ))}
      </div>
    </form>
  );
}
