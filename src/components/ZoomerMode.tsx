import { useEffect, useRef, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

// ── Constants ──────────────────────────────────────────────────────
const SPR = 900; // scroll pixels per scene
const SCENES = [
  {
    id: 'hero', label: '01 / INTRO', accent: '#c8ff00',
    headline: ['ТВОЯ', 'ПОСМІШКА.', 'ТВОЇ ПРАВИЛА.'],
    sub: 'Без нотацій. Без осуду. Просто якісна допомога.',
  },
  {
    id: 'services', label: '02 / ПОСЛУГИ', accent: '#00e5ff',
    headline: ['ВИПРАВ.', 'ВИРІВНЯЙ.', 'ЗАБЛИЩИ.'],
    sub: 'Все що потрібно твоїй посмішці — в одному місці.',
  },
  {
    id: 'results', label: '03 / РЕЗУЛЬТАТИ', accent: '#ff3d8b',
    headline: ['ДОКАЗ.', 'НЕ', 'ОБІЦЯНКИ.'],
    sub: 'Реальні до/після. Реальні пацієнти.',
  },
  {
    id: 'about', label: '04 / ПРО НАС', accent: '#a855f7',
    headline: ['НЕ', 'СТОМАТОЛОГ', 'ТВОЇХ БАТЬКІВ.'],
    sub: '14 років досвіду. Нуль засуджень. Смачна кава.',
  },
  {
    id: 'reviews', label: '05 / ВІДГУКИ', accent: '#c8ff00',
    headline: ['ВОНИ', 'СКАЗАЛИ.', 'НЕ МИ.'],
    sub: 'Реальні слова. Без фільтрів.',
  },
  {
    id: 'contact', label: '06 / КОНТАКТ', accent: '#00e5ff',
    headline: ['ХВАТИТЬ', 'ДУМАТИ.', 'ПОЧИНАЙ.'],
    sub: 'Перша консультація — безкоштовно.',
  },
];

const SERVICES_LIST = [
  { num: '01', name: 'Вініри', desc: 'Кастомний фарфор. 2 тижні.', price: 'від 8 000 грн', color: '#c8ff00' },
  { num: '02', name: 'Імпланти', desc: 'Титанові корені. Назавжди.', price: 'від 18 000 грн', color: '#00e5ff' },
  { num: '03', name: 'Елайнери', desc: 'Ніхто не помітить. Ти — відчуєш.', price: 'від 25 000 грн', color: '#ff3d8b' },
  { num: '04', name: 'Відбілювання', desc: '1 сеанс. 8 тонів яскравіше.', price: 'від 3 500 грн', color: '#a855f7' },
  { num: '05', name: 'Огляд', desc: '30 хв. Повний скан. Кава включена.', price: 'БЕЗКОШТОВНО', color: '#c8ff00' },
  { num: '06', name: 'Терміново', desc: 'Зламаний зуб? Того ж дня.', price: 'Телефонуй', color: '#00e5ff' },
];

const REVIEWS_LIST = [
  { initials: 'АК', name: 'Аліна К.', age: 24, color: '#c8ff00', text: 'Боялась стоматологів усе життя. Тут зробили так, що... нормально? Я б повернулась добровільно?' },
  { initials: 'МД', name: 'Максим Д.', age: 27, color: '#00e5ff', text: 'Зробив вініри — мечів стало втричі більше. Збіг? Не думаю. 10/10 посміхнувся б знову.' },
  { initials: 'ОС', name: 'Олена С.', age: 22, color: '#ff3d8b', text: 'Нарешті стоматолог, який не читає лекцій про нитку. Просто лагодять. І вайби — бездоганні.' },
];

// ── Helpers ───────────────────────────────────────────────────────
function sceneStyle(i: number, scrollY: number): React.CSSProperties {
  const progress = (scrollY - i * SPR) / SPR;
  if (progress < -0.35 || progress >= 1) return { opacity: 0, pointerEvents: 'none', transform: 'translateY(0)' };
  let opacity = 1;
  let ty = 0;
  if (progress < 0) {
    opacity = (progress + 0.35) / 0.35;
    ty = 50 * (1 - opacity);
  } else if (progress < 0.65) {
    opacity = 1;
    ty = -progress * 24;
  } else {
    opacity = 1 - (progress - 0.65) / 0.35;
    ty = -progress * 24;
  }
  return {
    opacity: Math.max(0, Math.min(1, opacity)),
    transform: `translateY(${ty}px)`,
    pointerEvents: (opacity > 0.1 ? 'auto' : 'none') as React.CSSProperties['pointerEvents'],
  };
}

function ringStyle(scrollY: number, sceneIndex: number, speed: number, x: string, y: string, size: number, color: string): React.CSSProperties {
  const localScroll = scrollY - sceneIndex * SPR;
  return {
    position: 'absolute',
    left: x, top: y,
    width: size, height: size,
    border: `1.5px solid ${color}`,
    borderRadius: '50%',
    opacity: 0.18,
    transform: `translateY(${localScroll * speed}px)`,
    pointerEvents: 'none',
  };
}

// ── Scene components ──────────────────────────────────────────────
function SceneHero({ scrollY }: { scrollY: number }) {
  const syne: React.CSSProperties = { fontFamily: "'Syne', sans-serif" };
  const grotesk: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };
  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 32 }}>
      {/* Decorative rings */}
      <div style={ringStyle(scrollY, 0, -0.06, '8%', '15%', 180, '#c8ff00')} />
      <div style={ringStyle(scrollY, 0, 0.08, '78%', '10%', 120, '#00e5ff')} />
      <div style={ringStyle(scrollY, 0, -0.04, '85%', '65%', 260, '#ff3d8b')} />
      <div style={ringStyle(scrollY, 0, 0.05, '2%', '70%', 90, '#a855f7')} />

      <div>
        <div style={{ fontSize: 'clamp(52px,8vw,96px)', fontWeight: 800, lineHeight: 0.88, color: '#f0f0f0', letterSpacing: '-0.03em', textTransform: 'uppercase', ...syne }}>
          <span style={{ color: '#c8ff00' }}>ТВОЯ</span><br />
          ПОСМІШКА.<br />
          ТВОЇ ПРАВИЛА.
        </div>
      </div>

      <p style={{ fontSize: 15, color: 'rgba(240,240,240,0.55)', maxWidth: 380, lineHeight: 1.65, ...grotesk }}>
        Без нотацій. Без осуду. Просто якісна допомога — і справді хороша кава.
      </p>

      <a href="#contact" style={{ display: 'inline-block', background: '#c8ff00', color: '#0a0a0a', fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '14px 36px', borderRadius: 2, textDecoration: 'none', ...syne }}>
        Записатись безкоштовно →
      </a>

      <div style={{ display: 'flex', gap: 48, marginTop: 8 }}>
        {[['2400+', 'Щасливих посмішок'], ['98%', 'Повертаються знову'], ['4.9', 'Google рейтинг']].map(([v, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 700, color: '#c8ff00', letterSpacing: '-0.02em', ...syne }}>{v}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 4, ...grotesk }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SceneServices({ scrollY }: { scrollY: number }) {
  const syne: React.CSSProperties = { fontFamily: "'Syne', sans-serif" };
  const grotesk: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };
  return (
    <div style={{ width: '100%', maxWidth: 1000, display: 'grid', gridTemplateColumns: '320px 1fr', gap: 64, alignItems: 'center' }}>
      <div>
        <div style={ringStyle(scrollY, 1, -0.05, '-10%', '20%', 160, '#00e5ff')} />
        <div style={{ fontSize: 'clamp(42px,5.5vw,68px)', fontWeight: 800, lineHeight: 0.9, color: '#f0f0f0', letterSpacing: '-0.03em', textTransform: 'uppercase', ...syne }}>
          <span style={{ color: '#00e5ff' }}>ВИПРАВ.</span><br />
          ВИРІВНЯЙ.<br />
          ЗАБЛИЩИ.
        </div>
        <p style={{ marginTop: 20, fontSize: 14, color: 'rgba(240,240,240,0.45)', lineHeight: 1.7, ...grotesk }}>
          Все що потрібно твоїй посмішці — в одному місці.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {SERVICES_LIST.map(s => (
          <div key={s.num}
            style={{ padding: '18px 20px', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 4, background: 'rgba(255,255,255,0.03)', position: 'relative', overflow: 'hidden', cursor: 'default' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = s.color; (e.currentTarget as HTMLDivElement).style.borderLeftWidth = '3px'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLDivElement).style.borderLeftWidth = '1px'; }}
          >
            <div style={{ fontSize: 9, color: s.color, letterSpacing: '0.18em', marginBottom: 8, ...syne }}>{s.num}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f0f0f0', marginBottom: 4, ...syne }}>{s.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8, ...grotesk }}>{s.desc}</div>
            <div style={{ fontSize: 10, color: s.color, letterSpacing: '0.06em', ...grotesk }}>{s.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SceneResults({ scrollY }: { scrollY: number }) {
  const syne: React.CSSProperties = { fontFamily: "'Syne', sans-serif" };
  const grotesk: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };
  return (
    <div style={{ width: '100%', maxWidth: 1000, display: 'grid', gridTemplateColumns: '280px 1fr', gap: 64, alignItems: 'center' }}>
      <div>
        <div style={ringStyle(scrollY, 2, 0.06, '-5%', '60%', 200, '#ff3d8b')} />
        <div style={{ fontSize: 'clamp(42px,5.5vw,68px)', fontWeight: 800, lineHeight: 0.9, color: '#f0f0f0', letterSpacing: '-0.03em', textTransform: 'uppercase', ...syne }}>
          <span style={{ color: '#ff3d8b' }}>ДОКАЗ.</span><br />
          НЕ<br />
          ОБІЦЯНКИ.
        </div>
        <p style={{ marginTop: 20, fontSize: 14, color: 'rgba(240,240,240,0.45)', lineHeight: 1.7, ...grotesk }}>
          Реальні до/після. Реальні пацієнти. Нічого не приховуємо.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {[
          { treatment: '8 Вінірів', duration: '2 тижні', before: 'Криві, пожовклі зуби', after: 'Фарфорові вініри — натуральний білий', accentBefore: 'rgba(255,255,255,0.08)', accentAfter: 'rgba(200,255,0,0.08)' },
          { treatment: 'Імплант', duration: '3 місяці', before: 'Відсутній передній зуб', after: 'Імплант з керамічною коронкою', accentBefore: 'rgba(255,255,255,0.08)', accentAfter: 'rgba(0,229,255,0.08)' },
        ].map((c, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ padding: '24px 20px', background: c.accentBefore, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', marginBottom: 6, ...syne }}>ДО</div>
              <div style={{ fontSize: 12, color: 'rgba(240,240,240,0.6)', ...grotesk }}>{c.before}</div>
            </div>
            <div style={{ padding: '24px 20px', background: c.accentAfter, border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{ fontSize: 9, color: '#ff3d8b', letterSpacing: '0.18em', marginBottom: 6, ...syne }}>ПІСЛЯ</div>
              <div style={{ fontSize: 12, color: '#f0f0f0', ...grotesk }}>{c.after}</div>
              <div style={{ marginTop: 8, fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', ...grotesk }}>{c.treatment} · {c.duration}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SceneAbout({ scrollY }: { scrollY: number }) {
  const syne: React.CSSProperties = { fontFamily: "'Syne', sans-serif" };
  const grotesk: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };
  return (
    <div style={{ width: '100%', maxWidth: 900, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
      <div>
        <div style={ringStyle(scrollY, 3, -0.07, '70%', '5%', 300, '#a855f7')} />
        <div style={{ fontSize: 'clamp(42px,5.5vw,68px)', fontWeight: 800, lineHeight: 0.9, color: '#f0f0f0', letterSpacing: '-0.03em', textTransform: 'uppercase', ...syne }}>
          НЕ<br />
          <span style={{ color: '#a855f7' }}>СТОМАТОЛОГ</span><br />
          ТВОЇХ БАТЬКІВ.
        </div>
        <div style={{ marginTop: 40, display: 'flex', gap: 32 }}>
          {[['14', 'Років\nдосвіду'], ['2400+', 'Пацієнтів'], ['0', 'Засуджень']].map(([v, l]) => (
            <div key={v}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#a855f7', letterSpacing: '-0.02em', ...syne }}>{v}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4, whiteSpace: 'pre-line', ...grotesk }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ width: '100%', aspectRatio: '3/4', background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28, color: 'rgba(168,85,247,0.4)', fontSize: 12, letterSpacing: '0.1em', ...grotesk }}>
          Фото лікаря
        </div>
        <p style={{ fontSize: 14, color: 'rgba(240,240,240,0.5)', lineHeight: 1.75, ...grotesk }}>
          Д-р Чиркова заснувала клініку тому, що їй набридли місця, де пацієнти почуваються приниженими. Реальна розмова, реальний догляд — і справді хороша кава.
        </p>
      </div>
    </div>
  );
}

function SceneReviews({ scrollY }: { scrollY: number }) {
  const syne: React.CSSProperties = { fontFamily: "'Syne', sans-serif" };
  const grotesk: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };
  return (
    <div style={{ width: '100%', maxWidth: 1000 }}>
      <div style={ringStyle(scrollY, 4, 0.05, '90%', '15%', 140, '#c8ff00')} />
      <div style={{ marginBottom: 40, textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(38px,5vw,62px)', fontWeight: 800, lineHeight: 0.9, color: '#f0f0f0', letterSpacing: '-0.03em', textTransform: 'uppercase', ...syne }}>
          ВОНИ СКАЗАЛИ. <span style={{ color: '#c8ff00' }}>НЕ МИ.</span>
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: 'rgba(240,240,240,0.4)', ...grotesk }}>Реальні слова. Без фільтрів.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {REVIEWS_LIST.map(r => (
          <div key={r.initials} style={{ padding: '28px 24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontSize: 13, color: 'rgba(240,240,240,0.7)', lineHeight: 1.7, fontStyle: 'italic', ...grotesk }}>
              "{r.text}"
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#0a0a0a', flexShrink: 0, ...syne }}>
                {r.initials}
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#f0f0f0', fontWeight: 500, ...grotesk }}>{r.name}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', ...grotesk }}>{r.age} років</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SceneContact({ scrollY }: { scrollY: number }) {
  const syne: React.CSSProperties = { fontFamily: "'Syne', sans-serif" };
  const grotesk: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'ok'|'err'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setStatus('loading');
    try {
      if (supabase) {
        await supabase.from('contact_requests').insert({ name, phone, design_mode: 'zoomer', source: 'website' });
      }
      setStatus('ok');
    } catch {
      setStatus('err');
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: 900, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
      <div>
        <div style={ringStyle(scrollY, 5, -0.06, '-8%', '30%', 220, '#00e5ff')} />
        <div style={{ fontSize: 'clamp(42px,5.5vw,68px)', fontWeight: 800, lineHeight: 0.9, color: '#f0f0f0', letterSpacing: '-0.03em', textTransform: 'uppercase', ...syne }}>
          ХВАТИТЬ<br />
          ДУМАТИ.<br />
          <span style={{ color: '#00e5ff' }}>ПОЧИНАЙ.</span>
        </div>
        <p style={{ marginTop: 20, fontSize: 14, color: 'rgba(240,240,240,0.45)', lineHeight: 1.7, marginBottom: 32, ...grotesk }}>
          Перша консультація — безкоштовно. Просто залиш контакт.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Instagram', href: 'https://instagram.com/chirkovadentist', color: '#ff3d8b' },
            { label: 'Telegram', href: 'https://t.me/chirkovadentist', color: '#00e5ff' },
            { label: '+38 (056) 123-45-67', href: 'tel:+380561234567', color: '#c8ff00' },
          ].map(s => (
            <a key={s.label} href={s.href}
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, transition: 'color 0.2s', ...grotesk }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = s.color; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)'; }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, display: 'inline-block', flexShrink: 0 }} />
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {status === 'ok' ? (
          <div style={{ padding: '40px 24px', textAlign: 'center', border: '1px solid rgba(0,229,255,0.3)', borderRadius: 4 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🦷</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#00e5ff', ...syne }}>Готово!</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 8, ...grotesk }}>Зв'яжемось найближчим часом.</div>
          </div>
        ) : (
          <>
            {[
              { val: name, set: setName, placeholder: "Як тебе звати", label: "Ім'я" },
              { val: phone, set: setPhone, placeholder: "+380 00 000 00 00", label: "Телефон *" },
            ].map(f => (
              <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', textTransform: 'uppercase', ...grotesk }}>{f.label}</label>
                <input
                  value={f.val}
                  onChange={e => f.set(e.target.value)}
                  placeholder={f.placeholder}
                  style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', padding: '10px 0', fontSize: 14, color: '#f0f0f0', outline: 'none', fontFamily: "'Space Grotesk', sans-serif", transition: 'border-color 0.2s' }}
                  onFocus={e => { (e.target as HTMLInputElement).style.borderBottomColor = '#00e5ff'; }}
                  onBlur={e => { (e.target as HTMLInputElement).style.borderBottomColor = 'rgba(255,255,255,0.15)'; }}
                />
              </div>
            ))}
            <button type="submit" disabled={status === 'loading'}
              style={{ marginTop: 8, background: '#00e5ff', color: '#0a0a0a', fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '15px 28px', border: 'none', borderRadius: 2, cursor: 'pointer', fontFamily: "'Syne', sans-serif", opacity: status === 'loading' ? 0.6 : 1, transition: 'opacity 0.2s' }}>
              {status === 'loading' ? '...' : 'Записатись →'}
            </button>
            {status === 'err' && (
              <div style={{ fontSize: 12, color: '#ff3d8b', ...grotesk }}>Щось пішло не так. Спробуй ще раз.</div>
            )}
          </>
        )}
      </form>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────
export default function ZoomerMode() {
  const [active, setActive]   = useState(false);
  const [visible, setVisible] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const worldRef = useRef<HTMLDivElement>(null);

  const openZoomer = useCallback(() => {
    localStorage.setItem('designMode', 'zoomer');
    setActive(true);
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const closeZoomer = useCallback(() => {
    setVisible(false);
    setTimeout(() => { setActive(false); setScrollY(0); setSceneIdx(0); }, 300);
    localStorage.setItem('designMode', 'classic');
  }, []);

  // Load fonts once
  useEffect(() => {
    const id = 'zoomer-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id; link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@300;400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  // Restore mode from localStorage + listen for nav button
  useEffect(() => {
    if (localStorage.getItem('designMode') === 'zoomer') openZoomer();
    const handler = () => openZoomer();
    window.addEventListener('zoomer:open', handler);
    return () => window.removeEventListener('zoomer:open', handler);
  }, [openZoomer]);

  // Lock body scroll while zoomer is active
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  // Wire up scroll listener after world mounts
  const handleScroll = useCallback(() => {
    const el = worldRef.current;
    if (!el) return;
    const y = el.scrollTop;
    setScrollY(y);
    setSceneIdx(Math.min(Math.floor(y / SPR), SCENES.length - 1));
  }, []);

  useEffect(() => {
    if (!active) return;
    const el = worldRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [active, handleScroll]);

  const goToScene = (i: number) => {
    worldRef.current?.scrollTo({ top: i * SPR + 20, behavior: 'smooth' });
  };

  const syne: React.CSSProperties = { fontFamily: "'Syne', sans-serif" };
  const grotesk: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };

  // Floating toggle button (classic mode)
  const toggleBtn = (
    <button
      onClick={openZoomer}
      style={{
        position: 'fixed', bottom: 24, left: 24, zIndex: 999,
        background: '#0a0a0a', color: '#c8ff00',
        border: '1px solid #c8ff00', borderRadius: 2,
        padding: '9px 18px', fontSize: 10, fontWeight: 700,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        cursor: 'pointer', ...syne, transition: 'all 0.2s',
      }}
      onMouseEnter={e => { const t = e.currentTarget; t.style.background = '#c8ff00'; t.style.color = '#0a0a0a'; }}
      onMouseLeave={e => { const t = e.currentTarget; t.style.background = '#0a0a0a'; t.style.color = '#c8ff00'; }}
    >
      ◆ Modern Mode
    </button>
  );

  if (!active) return toggleBtn;

  const totalProgress = Math.min(scrollY / (SPR * SCENES.length), 1);

  const sceneComponents = [
    <SceneHero scrollY={scrollY} />,
    <SceneServices scrollY={scrollY} />,
    <SceneResults scrollY={scrollY} />,
    <SceneAbout scrollY={scrollY} />,
    <SceneReviews scrollY={scrollY} />,
    <SceneContact scrollY={scrollY} />,
  ];

  return (
    <>
      {/* Dimmed classic-site overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 200,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}>
        {/* Scrollable world */}
        <div
          ref={worldRef}
          style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}
        >
          {/* Sticky viewport */}
          <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#0a0a0a' }}>

            {/* Grid bg */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              transform: `translateY(${scrollY * 0.04}px)`,
            }} />

            {/* Progress bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, height: 2, background: '#c8ff00', width: `${totalProgress * 100}%`, zIndex: 20, transition: 'width 0.08s linear' }} />

            {/* Nav */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, zIndex: 15,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 32px',
            }}>
              <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.02em', color: '#f0f0f0', ...syne }}>
                SMILE<span style={{ color: '#c8ff00' }}>.LAB</span>
              </div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.2em', textTransform: 'uppercase', ...grotesk }}>
                {SCENES[sceneIdx]?.label}
              </div>
              <button
                onClick={closeZoomer}
                style={{ background: 'none', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.5)', padding: '7px 16px', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2, ...grotesk, transition: 'all 0.2s' }}
                onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = '#c8ff00'; t.style.color = '#c8ff00'; }}
                onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'rgba(255,255,255,0.18)'; t.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                ← Classic
              </button>
            </div>

            {/* Scene indicator */}
            <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)', zIndex: 15, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
              {SCENES.map((s, i) => (
                <button key={s.id} onClick={() => goToScene(i)}
                  style={{
                    width: i === sceneIdx ? 8 : 5,
                    height: i === sceneIdx ? 8 : 5,
                    borderRadius: '50%',
                    background: i === sceneIdx ? s.accent : 'rgba(255,255,255,0.18)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.3s',
                    boxShadow: i === sceneIdx ? `0 0 8px ${s.accent}` : 'none',
                  }}
                  aria-label={s.label}
                />
              ))}
            </div>

            {/* Scenes */}
            {SCENES.map((s, i) => (
              <div key={s.id}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '80px 64px 60px',
                  ...sceneStyle(i, scrollY),
                }}
              >
                {sceneComponents[i]}
              </div>
            ))}
          </div>

          {/* Scroll space — creates the scroll distance */}
          <div style={{ height: SPR * SCENES.length }} />
        </div>
      </div>
    </>
  );
}
