import { useState, useEffect, useRef } from 'react';
import ContactForm from './ContactForm';

export default function ScrollPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const ticks = useRef(0);
  const shownAt = useRef(0);

  useEffect(() => {
    const handler = () => {
      ticks.current++;
      if (!visible && !dismissed && ticks.current % 25 === 0 && ticks.current > 10) {
        setVisible(true);
        shownAt.current = ticks.current;
      }
      if (visible && ticks.current - shownAt.current > 50) {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [visible, dismissed]);

  if (dismissed) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, width: 320, zIndex: 999,
      background: '#f5f0e8', border: '1px solid rgba(200,169,110,0.3)',
      padding: 24, boxShadow: '0 8px 40px rgba(42,61,46,0.12)',
      animation: visible ? 'slideIn .5s cubic-bezier(.16,1,.3,1) both' : 'slideOut .4s ease both',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      <button onClick={() => { setVisible(false); setDismissed(true); }}
        style={{ position: 'absolute', top: 10, right: 12, background: 'none', border: 'none', fontSize: 18, color: '#7a8578', cursor: 'pointer' }}
        aria-label="Close">×</button>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 300, color: '#2a3d2e', marginBottom: 4 }}>
        Quick <em style={{ fontStyle: 'italic', color: '#c8a96e' }}>booking</em>
      </div>
      <div style={{ fontSize: 11, color: '#7a8578', marginBottom: 16 }}>We'll call you within 2 hours</div>
      <ContactForm source="scroll_popup" compact />
    </div>
  );
}
