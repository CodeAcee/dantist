import { useEffect, useRef, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import Aurora from './backgrounds/Aurora';
import SpotlightCard from './SpotlightCard';
import GradientText from './GradientText';

// ── Constants ──────────────────────────────────────────────────────
const SPR = 1000; // scroll pixels per scene
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
    id: 'before-after', label: '03 / ДО / ПІСЛЯ', accent: '#ff3d8b',
    headline: ['ПЕРЕТЯГНИ.', 'ПОБАЧ.', 'ПОВІР.'],
    sub: 'Реальні до/після. Реальні пацієнти.',
  },
  {
    id: 'team', label: '04 / КОМАНДА', accent: '#a855f7',
    headline: ['НЕ', 'СТОМАТОЛОГ', 'ТВОЇХ БАТЬКІВ.'],
    sub: '14 років досвіду. Нуль засуджень. Смачна кава.',
  },
  {
    id: 'reviews', label: '05 / ВІДГУКИ', accent: '#c8ff00',
    headline: ['ВОНИ', 'СКАЗАЛИ.', 'НЕ МИ.'],
    sub: 'Реальні слова. Без фільтрів.',
  },
  {
    id: 'tiktok', label: '06 / ТІКТОК', accent: '#ff3d8b',
    headline: ['ДИВИСЬ.', 'ЯК МИ', 'ЖИВЕМО.'],
    sub: 'Реальне життя клініки — без постановок.',
  },
  {
    id: 'location', label: '07 / АДРЕСА', accent: '#00e5ff',
    headline: ['ЗНАЙДИ.', 'ПРИХОДЬ.', 'ВІДЧУЙ.'],
    sub: 'Дніпро, просп. Яворницького 22.',
  },
  {
    id: 'contact', label: '08 / КОНТАКТ', accent: '#c8ff00',
    headline: ['ДОСИТЬ', 'ДУМАТИ.', 'ПОЧИНАЙ.'],
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

const PRICE_DETAILS = [
  { cat: 'КОСМЕТИКА', items: [
    { name: 'Порцеляновий вінір (1)', price: 'від 8 000 грн' },
    { name: 'Нарощення (1)', price: 'від 2 500 грн' },
    { name: 'Zoom-відбілювання', price: '4 500 грн' },
  ]},
  { cat: 'ІМПЛАНТИ', items: [
    { name: 'Імплант (під ключ)', price: 'від 25 000 грн' },
    { name: 'Коронка (кераміка)', price: 'від 5 500 грн' },
    { name: 'Синус-ліфтинг', price: 'від 12 000 грн' },
  ]},
  { cat: 'ОРТОДОНТІЯ', items: [
    { name: 'Елайнери (повний курс)', price: 'від 45 000 грн' },
    { name: 'Металева брекет-система', price: 'від 18 000 грн' },
    { name: 'Ретейнери', price: 'від 2 400 грн' },
  ]},
  { cat: 'ВІДБІЛЮВАННЯ', items: [
    { name: 'Zoom-відбілювання', price: '4 500 грн' },
    { name: 'Домашнє відбілювання (каппи)', price: 'від 2 800 грн' },
    { name: 'Air Flow (профілактика)', price: '1 500 грн' },
  ]},
  { cat: 'КОНСУЛЬТАЦІЯ', items: [
    { name: 'Первинна консультація', price: 'Безкоштовно' },
    { name: 'Повторна консультація', price: '200 грн' },
    { name: 'Цифровий рентген (повний)', price: '800 грн' },
  ]},
  { cat: 'НЕВІДКЛАДНА ДОПОМОГА', items: [
    { name: 'Огляд + план лікування', price: 'Безкоштовно' },
    { name: 'Видалення зуба', price: 'від 1 200 грн' },
    { name: 'Тимчасова пломба', price: 'від 600 грн' },
  ]},
];

const REVIEWS_LIST = [
  { initials: 'АК', name: 'Аліна К.', age: 24, color: '#c8ff00', text: 'Боялась стоматологів усе життя. Тут зробили так, що... нормально? Я б повернулась добровільно?' },
  { initials: 'МД', name: 'Максим Д.', age: 27, color: '#00e5ff', text: 'Зробив вініри — мечів стало втричі більше. Збіг? Не думаю. 10/10 посміхнувся б знову.' },
  { initials: 'ОС', name: 'Олена С.', age: 22, color: '#ff3d8b', text: 'Нарешті стоматолог, який не читає лекцій про нитку. Просто лагодять. І вайби — бездоганні.' },
];

const CASES_LIST = [
  { treatment: '8 вінірів',    duration: '2 тижні',  before: 'Криві, потемнілі зуби',   after: 'Порцелянові вініри — природна білість', accent: '#c8ff00' },
  { treatment: 'Один імплант', duration: '3 місяці', before: 'Відсутній передній зуб',   after: 'Імплант із керамічною коронкою',        accent: '#00e5ff' },
  { treatment: 'Zoom-відбіл',  duration: '1 сеанс',  before: 'Жовте забарвлення',         after: 'Яскравий рівномірний відтінок',         accent: '#ff3d8b' },
];

const TEAM_LIST = [
  {
    name: 'Д-р Чиркова',
    title: 'Лікар-стоматолог · Косметична та реставраційна стоматологія',
    years: 14, yearsLabel: 'РОКІВ ПРАКТИКИ',
    bio: 'Я відкрила клініку з однією метою: щоб пацієнти почувались дійсно почутими — а не просто зубом у конвеєрі. Кожна усмішка — це унікальна історія.',
    accent: '#ff3d8b',
    ig: 'https://www.instagram.com/mad__dentist/',
    tiktok: 'https://www.tiktok.com/@mad__dentist',
  },
  {
    name: 'Д-р Мельник',
    title: 'Ортодонт · Елайнери та брекет-системи',
    years: 9, yearsLabel: 'РОКІВ ПРАКТИКИ',
    bio: 'Спеціалізується на ортодонтичному лікуванні з використанням сучасних елайнерів та цифрового планування. Понад 800 завершених ортодонтичних випадків.',
    accent: '#a855f7',
    ig: 'https://www.instagram.com/mad__dentist/',
    tiktok: 'https://www.tiktok.com/@mad__dentist',
  },
];

const TIKTOK_VIDEOS = [
  { id: '7643038472294386965', caption: 'Half Price у Дніпрі' },
  { id: '7584496719946173708', caption: 'Пацієнт незадоволений 😳' },
];
const TIKTOK_HANDLE = '@mad__dentist';
const TIKTOK_URL = 'https://www.tiktok.com/@mad__dentist';

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
        <div style={{ fontSize: 'clamp(52px,8vw,96px)', fontWeight: 800, lineHeight: 0.88, letterSpacing: '-0.03em', textTransform: 'uppercase', ...syne }}>
          <GradientText colors={['#c8ff00','#00e5ff','#c8ff00']} animationSpeed={4} className="scene-hl">ТВОЯ</GradientText>
          <GradientText colors={['#f0f0f0','#c8ff00','#f0f0f0']} animationSpeed={7} className="scene-hl">ПОСМІШКА.</GradientText>
          <GradientText colors={['#f0f0f0','#00e5ff','#f0f0f0']} animationSpeed={9} className="scene-hl">ТВОЇ ПРАВИЛА.</GradientText>
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
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const selected = selectedIdx !== null ? SERVICES_LIST[selectedIdx] : null;
  const detail = selectedIdx !== null ? PRICE_DETAILS[selectedIdx] : null;

  return (
    <div style={{ width: '100%', maxWidth: 1000, display: 'grid', gridTemplateColumns: '320px 1fr', gap: 64, alignItems: 'center', position: 'relative' }}>
      <div>
        <div style={ringStyle(scrollY, 1, -0.05, '-10%', '20%', 160, '#00e5ff')} />
        <div style={{ fontSize: 'clamp(42px,5.5vw,68px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', textTransform: 'uppercase', ...syne }}>
          <GradientText colors={['#00e5ff','#0066ff','#00e5ff']} animationSpeed={4} className="scene-hl">ВИПРАВ.</GradientText>
          <GradientText colors={['#f0f0f0','#00e5ff','#f0f0f0']} animationSpeed={7} className="scene-hl">ВИРІВНЯЙ.</GradientText>
          <GradientText colors={['#f0f0f0','#0066ff','#f0f0f0']} animationSpeed={9} className="scene-hl">ЗАБЛИЩИ.</GradientText>
        </div>
        <p style={{ marginTop: 20, fontSize: 14, color: 'rgba(240,240,240,0.45)', lineHeight: 1.7, ...grotesk }}>
          Все що потрібно твоїй посмішці — в одному місці.
        </p>
        <p style={{ marginTop: 10, fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em', textTransform: 'uppercase', ...grotesk }}>
          Натисни на картку — дивись ціни
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {SERVICES_LIST.map((s, i) => (
          <SpotlightCard
            key={s.num}
            spotlightColor={`${s.color}28`}
            onClick={() => setSelectedIdx(selectedIdx === i ? null : i)}
            style={{
              padding: '18px 20px',
              cursor: 'pointer',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              borderColor: selectedIdx === i ? s.color : 'rgba(255,255,255,0.07)',
              boxShadow: selectedIdx === i ? `0 0 18px ${s.color}30` : 'none',
            }}
          >
            <div style={{ fontSize: 9, color: s.color, letterSpacing: '0.18em', marginBottom: 8, ...syne }}>{s.num}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f0f0f0', marginBottom: 4, ...syne }}>{s.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8, ...grotesk }}>{s.desc}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 10, color: s.color, letterSpacing: '0.06em', ...grotesk }}>{s.price}</div>
              <div style={{ fontSize: 9, color: selectedIdx === i ? s.color : 'rgba(255,255,255,0.2)', transition: 'color 0.2s', ...grotesk }}>
                {selectedIdx === i ? '▲ згорнути' : '▼ ціни'}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Expanded pricing panel */}
      {selected && detail && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div
            onClick={() => setSelectedIdx(null)}
            style={{
              pointerEvents: 'auto',
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(8px)',
            }}
          />
          <div style={{
            pointerEvents: 'auto',
            position: 'relative', zIndex: 1,
            background: '#0e0e12',
            border: `1px solid ${selected.color}40`,
            borderRadius: 8,
            padding: '28px 32px',
            minWidth: 340,
            boxShadow: `0 0 40px ${selected.color}25`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 9, color: selected.color, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4, ...grotesk }}>{selected.num} / {selected.name}</div>
                <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', ...grotesk }}>{detail.cat}</div>
              </div>
              <button
                onClick={() => setSelectedIdx(null)}
                style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.4)', width: 28, height: 28, borderRadius: 4, cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >×</button>
            </div>
            <div style={{ borderTop: `1px solid ${selected.color}25`, paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {detail.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: 13 }}>
                  <span style={{ color: 'rgba(255,255,255,0.75)', ...grotesk }}>{item.name}</span>
                  <span style={{ flex: 1, borderBottom: `1px dotted ${selected.color}30`, marginBottom: 3 }} />
                  <span style={{ color: selected.color, fontWeight: 600, whiteSpace: 'nowrap', ...grotesk }}>{item.price}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textAlign: 'center', ...grotesk }}>
              Точну вартість уточнює лікар на консультації — вона безкоштовна
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ZSlider({ c }: { c: typeof CASES_LIST[0] }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      handleMove('touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX);
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: '1 1 0' }}>
      <div
        ref={ref}
        onMouseDown={e => { dragging.current = true; handleMove(e.clientX); }}
        onTouchStart={e => { dragging.current = true; handleMove(e.touches[0].clientX); }}
        style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', cursor: 'ew-resize', userSelect: 'none', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)', touchAction: 'none' }}
      >
        {/* Before */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#1e141f,#0f0a14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, color: 'rgba(255,255,255,0.04)', userSelect: 'none', letterSpacing: '-0.02em' }}>Before</div>
        </div>
        {/* After */}
        <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${pos}%)` }}>
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg,${c.accent}14,#1a0f20)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, color: `${c.accent}12`, userSelect: 'none', letterSpacing: '-0.02em' }}>After</div>
          </div>
        </div>
        {/* Divider */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, transform: 'translateX(-50%)', width: 1.5, background: c.accent, zIndex: 10, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 34, height: 34, borderRadius: '50%', background: c.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px ${c.accent}88` }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M7 4L3 10L7 16" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 4L17 10L13 16" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
        {/* Labels */}
        <div style={{ position: 'absolute', top: 8, left: 10, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', zIndex: 5, fontFamily: "'Space Grotesk',sans-serif" }}>BEFORE</div>
        <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.accent, opacity: 0.8, zIndex: 5, fontFamily: "'Space Grotesk',sans-serif" }}>AFTER</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 10, color: 'rgba(240,240,240,0.5)', fontFamily: "'Space Grotesk',sans-serif" }}>{c.treatment}</span>
        <span style={{ fontSize: 10, color: c.accent, letterSpacing: '0.06em', fontFamily: "'Space Grotesk',sans-serif" }}>{c.duration}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)', fontFamily: "'Space Grotesk',sans-serif" }}>{c.before}</span>
        <span style={{ fontSize: 10, color: 'rgba(240,240,240,0.5)', textAlign: 'right', fontFamily: "'Space Grotesk',sans-serif" }}>{c.after}</span>
      </div>
    </div>
  );
}

function SceneBeforeAfter({ scrollY }: { scrollY: number }) {
  const syne: React.CSSProperties = { fontFamily: "'Syne', sans-serif" };
  const grotesk: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };
  return (
    <div style={{ width: '100%', maxWidth: 1020, display: 'grid', gridTemplateColumns: '230px 1fr', gap: 56, alignItems: 'center' }}>
      <div>
        <div style={ringStyle(scrollY, 2, 0.06, '-5%', '60%', 200, '#ff3d8b')} />
        <div style={{ fontSize: 'clamp(36px,5vw,56px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', textTransform: 'uppercase', ...syne }}>
          <GradientText colors={['#ff3d8b','#ff8c00','#ff3d8b']} animationSpeed={4} className="scene-hl">ПЕРЕТЯГНИ.</GradientText>
          <GradientText colors={['#f0f0f0','#ff3d8b','#f0f0f0']} animationSpeed={7} className="scene-hl">ПОБАЧ.</GradientText>
          <GradientText colors={['#ff8c00','#ff3d8b','#ff8c00']} animationSpeed={5} className="scene-hl">ПОВІР.</GradientText>
        </div>
        <p style={{ marginTop: 20, fontSize: 13, color: 'rgba(240,240,240,0.4)', lineHeight: 1.7, ...grotesk }}>
          Реальні до/після. Реальні пацієнти. Кожен випадок — правда.
        </p>
        <div style={{ marginTop: 24, fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase', ...grotesk }}>
          {CASES_LIST.length} кейси · перетягни повзунок
        </div>
      </div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
        {CASES_LIST.map((c, i) => <ZSlider key={i} c={c} />)}
      </div>
    </div>
  );
}

function SceneTeam({ scrollY }: { scrollY: number }) {
  const syne: React.CSSProperties = { fontFamily: "'Syne', sans-serif" };
  const grotesk: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };
  return (
    <div style={{ width: '100%', maxWidth: 860, display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center' }}>
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <div style={ringStyle(scrollY, 3, -0.07, '70%', '5%', 300, '#a855f7')} />
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10, ...grotesk }}>НАША КОМАНДА</div>
        <div style={{ fontSize: 'clamp(30px,4vw,48px)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.03em', textTransform: 'uppercase', ...syne }}>
          <GradientText colors={['#f0f0f0','#a855f7','#f0f0f0']} animationSpeed={5} className="scene-hl">НЕ СТОМАТОЛОГ</GradientText>
          <GradientText colors={['#a855f7','#ff3d8b','#a855f7']} animationSpeed={4} className="scene-hl">ТВОЇХ БАТЬКІВ.</GradientText>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, width: '100%' }}>
        {TEAM_LIST.map((m, i) => (
          <div key={i} style={{ padding: '24px 22px', border: `1px solid ${m.accent}28`, borderRadius: 4, background: `${m.accent}08`, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Photo placeholder + years badge */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: `linear-gradient(135deg,${m.accent}18,#100c18)`, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: `${m.accent}20`, textTransform: 'uppercase', letterSpacing: '-0.02em', textAlign: 'center', userSelect: 'none' }}>{m.name}</div>
              <div style={{ position: 'absolute', bottom: 8, right: 8, background: m.accent, color: '#0a0a0a', padding: '7px 11px', borderRadius: 2, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, lineHeight: 1 }}>{m.years}</div>
                <div style={{ fontSize: 7, letterSpacing: '0.1em', fontFamily: "'Space Grotesk',sans-serif", marginTop: 2 }}>{m.yearsLabel}</div>
              </div>
            </div>

            {/* Name + title */}
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#f0f0f0', marginBottom: 3, ...syne }}>{m.name}</div>
              <div style={{ fontSize: 8, color: m.accent, letterSpacing: '0.12em', textTransform: 'uppercase', ...grotesk }}>{m.title}</div>
            </div>

            {/* Bio */}
            <p style={{ fontSize: 12, color: 'rgba(240,240,240,0.45)', lineHeight: 1.75, margin: 0, ...grotesk }}>{m.bio}</p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <a href={m.ig} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', borderRadius: 2, textDecoration: 'none', fontSize: 9, color: '#fff', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', ...grotesk }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Instagram
              </a>
              <a href={m.tiktok} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${m.accent}44`, borderRadius: 2, textDecoration: 'none', fontSize: 9, color: m.accent, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', ...grotesk }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.8a8.18 8.18 0 004.78 1.52V6.88a4.85 4.85 0 01-1.01-.19z"/></svg>
                TikTok
              </a>
            </div>
          </div>
        ))}
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
        <div style={{ fontSize: 'clamp(38px,5vw,62px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.03em', textTransform: 'uppercase', ...syne }}>
          <GradientText colors={['#f0f0f0','#c8ff00','#f0f0f0']} animationSpeed={6} className="scene-hl">ВОНИ СКАЗАЛИ.</GradientText>
          <GradientText colors={['#c8ff00','#a855f7','#c8ff00']} animationSpeed={4} className="scene-hl">НЕ МИ.</GradientText>
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

const IG_POSTS = [
  {
    id: 'DWeVhTFDYC3',
    caption: "Zoom відбілювання — 8 тонів за 1 сеанс ✨",
  },
  {
    id: 'DYFoSO5tuGD',
    caption: "Вініри за 2 тижні — кастомний фарфор 🦷",
  },
];

function SceneTikTok({ scrollY }: { scrollY: number }) {
  const [slide, setSlide] = useState(0);
  const syne: React.CSSProperties    = { fontFamily: "'Syne', sans-serif" };
  const grotesk: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };
  const TT_SVG = <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.8a8.18 8.18 0 004.78 1.52V6.88a4.85 4.85 0 01-1.01-.19z"/></svg>;
  const IG_SVG = <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;

  return (
    <div style={{ width: '100%', maxWidth: 1000, display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Tab switcher ── */}
      <div style={{ display: 'flex', gap: 4, alignSelf: 'flex-start' }}>
        {[
          { label: 'TikTok',     icon: TT_SVG, color: '#ff3d8b' },
          { label: 'Instagram',  icon: IG_SVG, color: '#e1306c' },
        ].map((t, i) => (
          <button key={i} onClick={() => setSlide(i)} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 16px', borderRadius: 2, border: 'none', cursor: 'pointer',
            fontFamily: "'Space Grotesk',sans-serif", fontSize: 10, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            background: slide === i ? t.color : 'rgba(255,255,255,0.06)',
            color: slide === i ? '#0a0a0a' : 'rgba(255,255,255,0.4)',
            transition: 'all 0.2s',
          }}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* ── Slide track ── */}
      <div style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)', transform: `translateX(${-slide * 100}%)` }}>

          {/* ── SLIDE 0: TikTok ── */}
          <div style={{ minWidth: '100%', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={ringStyle(scrollY, 5, -0.05, '-8%', '20%', 160, '#ff3d8b')} />
              <div style={ringStyle(scrollY, 5, 0.07, '95%', '70%', 100, '#00e5ff')} />
              <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#ff3d8b"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.8a8.18 8.18 0 004.78 1.52V6.88a4.85 4.85 0 01-1.01-.19z"/></svg>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', ...grotesk }}>TikTok</span>
              </div>
              <div style={{ fontSize: 'clamp(40px,5.5vw,68px)', fontWeight: 800, lineHeight: 0.88, letterSpacing: '-0.03em', textTransform: 'uppercase', ...syne }}>
                <GradientText colors={['#ff3d8b','#ff69b4','#ff3d8b']} animationSpeed={3} className="scene-hl">ДИВИСЬ.</GradientText>
                <GradientText colors={['#f0f0f0','#ff3d8b','#f0f0f0']} animationSpeed={6} className="scene-hl">ЯК МИ</GradientText>
                <GradientText colors={['#f0f0f0','#00e5ff','#f0f0f0']} animationSpeed={8} className="scene-hl">ЖИВЕМО.</GradientText>
              </div>
              <p style={{ marginTop: 18, fontSize: 13, color: 'rgba(240,240,240,0.45)', lineHeight: 1.7, ...grotesk }}>
                Реальне життя клініки без постановок і фільтрів — підписуйся.
              </p>
              <div style={{ marginTop: 20, display: 'flex', gap: 24, paddingTop: 16, borderTop: '1px solid rgba(255,61,139,0.2)' }}>
                {[['6 800+', 'Підписників'], ['249', 'Відео']].map(([v, l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#ff3d8b', letterSpacing: '-0.02em', ...syne }}>{v}</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 3, ...grotesk }}>{l}</div>
                  </div>
                ))}
              </div>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8, background: '#ff3d8b', color: '#0a0a0a', fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '12px 22px', borderRadius: 2, textDecoration: 'none', ...syne }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.8a8.18 8.18 0 004.78 1.52V6.88a4.85 4.85 0 01-1.01-.19z"/></svg>
                {TIKTOK_HANDLE} →
              </a>
            </div>
            {/* TikTok iframes — staggered */}
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', alignItems: 'flex-start' }}>
              {TIKTOK_VIDEOS.map((v, i) => (
                <div key={v.id} style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: '1 1 0', maxWidth: 210, marginTop: i === 1 ? 28 : 0 }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16', borderRadius: 8, overflow: 'hidden', background: '#111', border: `1px solid ${i === 0 ? 'rgba(255,61,139,0.3)' : 'rgba(0,229,255,0.2)'}`, boxShadow: i === 0 ? '0 8px 40px rgba(255,61,139,0.2)' : '0 8px 40px rgba(0,229,255,0.12)' }}>
                    <iframe src={`https://www.tiktok.com/embed/v2/${v.id}`} title={v.caption} allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(240,240,240,0.4)', textAlign: 'center', ...grotesk }}>{v.caption}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SLIDE 1: Instagram ── */}
          <div style={{ minWidth: '100%', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', ...grotesk }}>Instagram</span>
              </div>
              <div style={{ fontSize: 'clamp(38px,5vw,62px)', fontWeight: 800, lineHeight: 0.88, letterSpacing: '-0.03em', textTransform: 'uppercase', ...syne }}>
                <GradientText colors={['#f09433','#dc2743','#bc1888','#f09433']} animationSpeed={3} className="scene-hl">ПІДПИШИСЬ.</GradientText>
                <GradientText colors={['#f0f0f0','#dc2743','#f0f0f0']} animationSpeed={6} className="scene-hl">СЛІДКУЙ.</GradientText>
                <GradientText colors={['#f0f0f0','#bc1888','#f0f0f0']} animationSpeed={8} className="scene-hl">ВІДЧУЙ.</GradientText>
              </div>
              <p style={{ marginTop: 18, fontSize: 13, color: 'rgba(240,240,240,0.45)', lineHeight: 1.7, ...grotesk }}>
                Щоденне життя клініки, результати, команда — все тут.
              </p>
              <div style={{ marginTop: 20, display: 'flex', gap: 24, paddingTop: 16, borderTop: '1px solid rgba(225,48,108,0.2)' }}>
                {[['6 800+', 'Підписників'], ['249', 'Публікацій']].map(([v, l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 22, fontWeight: 800, background: 'linear-gradient(135deg,#f09433,#e1306c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em', ...syne }}>{v}</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 3, ...grotesk }}>{l}</div>
                  </div>
                ))}
              </div>
              <a href="https://www.instagram.com/mad__dentist/" target="_blank" rel="noopener noreferrer" style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color: '#fff', fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '12px 22px', borderRadius: 2, textDecoration: 'none', ...syne }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                @mad__dentist →
              </a>
            </div>
            {/* Instagram post embeds */}
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', alignItems: 'flex-start' }}>
              {IG_POSTS.map((p, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: '1 1 0', maxWidth: 210, marginTop: i === 1 ? 28 : 0 }}>
                  <div style={{ width: '100%', aspectRatio: '9/16', borderRadius: 8, overflow: 'hidden', border: `1px solid rgba(225,48,108,${i === 0 ? '0.3' : '0.2'})`, boxShadow: i === 0 ? '0 8px 40px rgba(225,48,108,0.2)' : '0 8px 40px rgba(188,24,136,0.12)' }}>
                    <iframe
                      src={`https://www.instagram.com/reel/${p.id}/embed/`}
                      style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                      loading="lazy"
                      title={p.caption}
                      allowFullScreen
                    />
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(240,240,240,0.4)', textAlign: 'center', ...grotesk }}>{p.caption}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const GOOGLE_REVIEWS = [
  { name: 'Марія В.',   stars: 5, text: 'Найкраща клініка у Дніпрі! Вініри зробили за 2 тижні — результат вище очікувань.',          ago: '2 тижні тому' },
  { name: 'Дмитро К.',  stars: 5, text: 'Лікар уважний і не поспішає. Вперше не боявся йти до стоматолога!',                         ago: '1 місяць тому' },
  { name: 'Ірина С.',   stars: 5, text: 'Зробили імплант — навіть забула де він. Дякую всій команді за увагу та підтримку!',          ago: '2 місяці тому' },
];

function SceneLocation({ scrollY }: { scrollY: number }) {
  const syne: React.CSSProperties    = { fontFamily: "'Syne', sans-serif" };
  const grotesk: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };
  return (
    <div style={{ width: '100%', maxWidth: 1000, display: 'grid', gridTemplateColumns: '280px 1fr', gap: 52, alignItems: 'start' }}>

      {/* Left: headline */}
      <div>
        <div style={{ fontSize: 'clamp(40px,5vw,62px)', fontWeight: 800, lineHeight: 0.88, letterSpacing: '-0.03em', textTransform: 'uppercase', ...syne }}>
          <GradientText colors={['#00e5ff','#00ff88','#00e5ff']} animationSpeed={4} className="scene-hl">ЗНАЙДИ.</GradientText>
          <GradientText colors={['#f0f0f0','#00e5ff','#f0f0f0']} animationSpeed={6} className="scene-hl">ПРИХОДЬ.</GradientText>
          <GradientText colors={['#00ff88','#c8ff00','#00ff88']} animationSpeed={5} className="scene-hl">ВІДЧУЙ.</GradientText>
        </div>
        <p style={{ marginTop: 18, fontSize: 13, color: 'rgba(240,240,240,0.4)', lineHeight: 1.7, ...grotesk }}>
          Ми в центрі Дніпра. Поруч — метро, паркінг, кава після прийому.
        </p>
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 9 }}>
          {([
            { icon: '☏', label: 'Телефон',  val: '+38 (056) 123-45-67',              color: '#00e5ff', href: 'tel:+380561234567' },
            { icon: '⊙', label: 'Адреса',   val: 'просп. Яворницького 22, Дніпро',   color: '#c8ff00', href: null },
            { icon: '⏱', label: 'Графік',   val: 'Пн–Пт 9:00–20:00 · Сб 10:00–18:00', color: '#a855f7', href: null },
          ] as const).map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
              <div style={{ width: 26, height: 26, borderRadius: 2, border: `1px solid ${d.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: d.color, flexShrink: 0, marginTop: 1 }}>{d.icon}</div>
              <div>
                <div style={{ fontSize: 7, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: 2, ...grotesk }}>{d.label}</div>
                {d.href
                  ? <a href={d.href} style={{ fontSize: 12, color: 'rgba(240,240,240,0.7)', textDecoration: 'none', ...grotesk }}>{d.val}</a>
                  : <div style={{ fontSize: 12, color: 'rgba(240,240,240,0.65)', ...grotesk }}>{d.val}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: map + reviews */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Map */}
        <div style={{ width: '100%', aspectRatio: '16/7', borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(0,229,255,0.14)' }}>
          <iframe
            src="https://maps.google.com/maps?q=просп.+Яворницького+22,+Дніпро,+Україна&output=embed&hl=uk&z=15"
            style={{ width: '100%', height: '100%', border: 'none', filter: 'invert(90%) hue-rotate(180deg) saturate(0.8)', display: 'block' }}
            loading="lazy"
            title="Chirkova Dentist on Google Maps"
          />
        </div>

        {/* Google Reviews */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.22em', textTransform: 'uppercase', ...grotesk }}>GOOGLE ВІДГУКИ</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#c8ff00', lineHeight: 1, ...syne }}>4.9</span>
              <span style={{ color: '#c8ff00', fontSize: 10, letterSpacing: 1 }}>★★★★★</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {GOOGLE_REVIEWS.map(r => (
              <div key={r.name} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'conic-gradient(#4285f4 0 90deg,#ea4335 90deg 180deg,#fbbc05 180deg 270deg,#34a853 270deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff', flexShrink: 0 }}>G</div>
                  <span style={{ fontSize: 10, color: 'rgba(240,240,240,0.7)', fontWeight: 500, ...grotesk }}>{r.name}</span>
                  <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)', marginLeft: 'auto', ...grotesk }}>{r.ago}</span>
                </div>
                <div style={{ color: '#c8ff00', fontSize: 9, marginBottom: 4, letterSpacing: 1 }}>{'★'.repeat(r.stars)}</div>
                <div style={{ fontSize: 10, color: 'rgba(240,240,240,0.4)', lineHeight: 1.5, ...grotesk }}>{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneContact({ scrollY }: { scrollY: number }) {
  const syne: React.CSSProperties  = { fontFamily: "'Syne', sans-serif" };
  const grotesk: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };
  const [form, setForm] = useState({ name: '', phone: '', service: '', contact_via: '', note: '' });
  const [status, setStatus] = useState<'idle'|'loading'|'ok'|'err'>('idle');

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus('loading');
    try {
      if (supabase) {
        await supabase.from('contact_requests').insert({
          name: form.name.trim(), phone: form.phone.trim(),
          service: form.service || null, contact_via: form.contact_via || null,
          note: form.note.trim() || null, source: 'zoomer_form',
        });
      } else {
        await new Promise(r => setTimeout(r, 600));
      }
      setStatus('ok');
    } catch { setStatus('err'); }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '9px 11px', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2,
    fontSize: 12, color: '#f0f0f0', outline: 'none', boxSizing: 'border-box',
    fontFamily: "'Space Grotesk',sans-serif", transition: 'border-color 0.2s',
  };
  const lblStyle: React.CSSProperties = {
    display: 'block', fontSize: 8, letterSpacing: '0.16em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 4, ...grotesk,
  };

  return (
    <div style={{ width: '100%', maxWidth: 1000, display: 'grid', gridTemplateColumns: '300px 1fr', gap: 52, alignItems: 'start' }}>

      {/* ── LEFT: Headline ── */}
      <div>
        <div style={{ fontSize: 'clamp(38px,4.8vw,58px)', fontWeight: 800, lineHeight: 0.88, letterSpacing: '-0.03em', textTransform: 'uppercase', ...syne }}>
          <GradientText colors={['#c8ff00','#00e5ff','#c8ff00']} animationSpeed={4} className="scene-hl">ДОСИТЬ</GradientText>
          <GradientText colors={['#f0f0f0','#c8ff00','#f0f0f0']} animationSpeed={6} className="scene-hl">ДУМАТИ.</GradientText>
          <GradientText colors={['#00e5ff','#c8ff00','#00e5ff']} animationSpeed={5} className="scene-hl">ПОЧИНАЙ.</GradientText>
        </div>
        <p style={{ marginTop: 18, fontSize: 13, color: 'rgba(240,240,240,0.4)', lineHeight: 1.7, ...grotesk }}>
          Перша консультація — безкоштовно. Відповідь за 2 години.
        </p>
      </div>

      {/* ── RIGHT: Form ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 2, ...grotesk }}>ШВИДКИЙ ЗАПИТ</div>

        {status === 'ok' ? (
          <div style={{ padding: '36px 20px', textAlign: 'center', border: '1px solid rgba(0,229,255,0.25)', borderRadius: 4 }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>🦷</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#00e5ff', ...syne }}>Готово!</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 6, ...grotesk }}>Зателефонуємо протягом 2 годин.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

            {/* Name + Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={lblStyle}>Ваше ім'я</label>
                <input required type="text" placeholder="Катерина"
                  value={form.name} onChange={set('name')} style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#00e5ff')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
              </div>
              <div>
                <label style={lblStyle}>Телефон *</label>
                <input required type="tel" placeholder="+38 (0__) ___-__-__"
                  value={form.phone} onChange={set('phone')} style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = '#00e5ff')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
              </div>
            </div>

            {/* Service + Via */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={lblStyle}>Послуга</label>
                <select value={form.service} onChange={set('service')}
                  style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: form.service ? '#f0f0f0' : 'rgba(255,255,255,0.3)' }}>
                  <option value="">Оберіть...</option>
                  {['Безкоштовна консультація','Косметика / вініри','Імпланти','Відбілювання','Елайнери','Огляд','Невідкладна'].map(s =>
                    <option key={s} value={s} style={{ background: '#1a1a1a', color: '#f0f0f0' }}>{s}</option>
                  )}
                </select>
              </div>
              <div>
                <label style={lblStyle}>Зручний зв'язок</label>
                <select value={form.contact_via} onChange={set('contact_via')}
                  style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: form.contact_via ? '#f0f0f0' : 'rgba(255,255,255,0.3)' }}>
                  <option value="">Оберіть...</option>
                  {['Телефон','Telegram','Viber','WhatsApp'].map(v =>
                    <option key={v} value={v} style={{ background: '#1a1a1a', color: '#f0f0f0' }}>{v}</option>
                  )}
                </select>
              </div>
            </div>

            {/* Note */}
            <div>
              <label style={lblStyle}>Примітка (за бажанням)</label>
              <textarea placeholder="Напр. — зручніше вранці, трохи хвилююсь..." rows={3}
                value={form.note} onChange={set('note')}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={e => (e.target.style.borderColor = '#00e5ff')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>

            {/* Submit */}
            <button type="submit" disabled={status === 'loading'}
              style={{ width: '100%', background: '#00e5ff', color: '#0a0a0a', fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '14px', border: 'none', borderRadius: 2, cursor: status === 'loading' ? 'wait' : 'pointer', opacity: status === 'loading' ? 0.7 : 1, transition: 'opacity 0.2s', fontFamily: "'Syne',sans-serif" }}>
              {status === 'loading' ? 'Надсилається...' : 'Надіслати запит →'}
            </button>

            {status === 'err' && <p style={{ fontSize: 11, color: '#ff3d8b', textAlign: 'center', margin: 0, ...grotesk }}>Щось пішло не так. Зателефонуйте напряму.</p>}

            {/* Trust */}
            <div style={{ display: 'flex', gap: 16, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap' }}>
              {['Відповідь за 2 години', 'Без спаму', 'Перший візит безкоштовно'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'rgba(255,255,255,0.25)', ...grotesk }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#00e5ff', flexShrink: 0 }} />{t}
                </div>
              ))}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────
const MARQUEE_ITEMS = ['НЕВІДКЛАДНА ДОПОМОГА', 'КОСМЕТИЧНА СТОМАТОЛОГІЯ', 'ВІДБІЛЮВАННЯ', 'ІМПЛАНТИ', 'ЕЛАЙНЕРИ', 'ВІНІРИ', 'КОРЕНЕВІ КАНАЛИ', 'ОРТОДОНТІЯ', 'ІМПЛАНТАЦІЯ'];

function RunningLine() {
  const grotesk: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };
  const text = MARQUEE_ITEMS.map(i => `${i} •`).join('  ');
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
      background: 'rgba(8,8,10,0.9)', borderTop: '1px solid rgba(255,255,255,0.05)',
      height: 32, overflow: 'hidden', display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        display: 'flex', whiteSpace: 'nowrap',
        animation: 'zm-marquee 32s linear infinite',
      }}>
        <span style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', paddingRight: 64, ...grotesk }}>
          {text}
        </span>
        <span style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', paddingRight: 64, ...grotesk }}>
          {text}
        </span>
      </div>
    </div>
  );
}

export default function ZoomerMode() {
  const [active] = useState(true);             // always active — modern only
  const [visible, setVisible] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const worldRef = useRef<HTMLDivElement>(null);

  // ── Classic-mode toggle removed — modern only ──────────────────
  /* const openZoomer = useCallback(() => {
    localStorage.setItem('designMode', 'zoomer');
    setActive(true);
    requestAnimationFrame(() => setVisible(true));
  }, []); */

  /* const closeZoomer = useCallback(() => {
    setVisible(false);
    setTimeout(() => { setActive(false); setScrollY(0); setSceneIdx(0); }, 300);
    localStorage.setItem('designMode', 'classic');
  }, []); */

  // Load fonts once
  useEffect(() => {
    const id = 'zoomer-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id; link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@300;400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  // Fade in on mount (no classic toggle, always active)
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  // Restore mode from localStorage + listen for nav button — classic only
  /* useEffect(() => {
    if (localStorage.getItem('designMode') === 'zoomer') openZoomer();
    const handler = () => openZoomer();
    window.addEventListener('zoomer:open', handler);
    return () => window.removeEventListener('zoomer:open', handler);
  }, [openZoomer]); */

  // Lock body scroll (always active in modern-only mode)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Wire up scroll listener after world mounts
  const handleScroll = useCallback(() => {
    const el = worldRef.current;
    if (!el) return;
    const y = el.scrollTop;
    setScrollY(y);
    setSceneIdx(Math.min(Math.floor(y / SPR), SCENES.length - 1));
  }, []);

  useEffect(() => {
    const el = worldRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const goToScene = (i: number) => {
    worldRef.current?.scrollTo({ top: i * SPR + 20, behavior: 'smooth' });
  };

  const syne: React.CSSProperties = { fontFamily: "'Syne', sans-serif" };
  const grotesk: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif" };

  // Floating toggle button (classic mode) — removed, modern only
  /* const toggleBtn = (
    <button onClick={openZoomer} style={{ position:'fixed', bottom:24, left:24, zIndex:999, ... }}>
      ◆ Modern Mode
    </button>
  );
  if (!active) return toggleBtn; */

  const totalProgress = Math.min(scrollY / (SPR * SCENES.length), 1);

  const AURORA_PALETTES: string[][] = [
    ['#c8ff00', '#00e5ff', '#0a1a0a'], // hero
    ['#00e5ff', '#0066ff', '#001a1a'], // services
    ['#ff3d8b', '#ff8c00', '#1a000a'], // before-after
    ['#a855f7', '#ff3d8b', '#0d000d'], // team
    ['#c8ff00', '#a855f7', '#0a0a00'], // reviews
    ['#ff3d8b', '#00e5ff', '#1a0010'], // tiktok
    ['#00e5ff', '#00ff88', '#000d0d'], // location
    ['#c8ff00', '#00e5ff', '#000d0d'], // contact
  ];
  const auroraColors = AURORA_PALETTES[sceneIdx] ?? AURORA_PALETTES[0];

  const sceneComponents = [
    <SceneHero scrollY={scrollY} />,
    <SceneServices scrollY={scrollY} />,
    <SceneBeforeAfter scrollY={scrollY} />,
    <SceneTeam scrollY={scrollY} />,
    <SceneReviews scrollY={scrollY} />,
    <SceneTikTok scrollY={scrollY} />,
    <SceneLocation scrollY={scrollY} />,
    <SceneContact scrollY={scrollY} />,
  ];

  return (
    <>
      <style>{`@keyframes zm-marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
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

            {/* Aurora background */}
            <Aurora
              colorStops={auroraColors}
              amplitude={0.9}
              blend={0.5}
              speed={0.6}
              style={{ zIndex: 0 }}
            />

            {/* Grid bg */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
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
                CHIRKOVA<span style={{ color: '#c8ff00' }}>.DENTIST</span>
              </div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.2em', textTransform: 'uppercase', ...grotesk }}>
                {SCENES[sceneIdx]?.label}
              </div>
              {/* ← Classic button removed — modern only */}
            </div>

            {/* Scene indicator */}
            <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)', zIndex: 15, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
              {SCENES.map((s, i) => (
                <button key={s.id} onClick={() => goToScene(i)}
                  style={{
                    width: i === sceneIdx ? 12 : 8,
                    height: i === sceneIdx ? 12 : 8,
                    borderRadius: '50%',
                    background: i === sceneIdx ? s.accent : 'rgba(255,255,255,0.18)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.3s',
                    boxShadow: i === sceneIdx ? `0 0 10px ${s.accent}, 0 0 20px ${s.accent}60` : 'none',
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

            {/* Running line */}
            <RunningLine />
          </div>

          {/* Scroll space — creates the scroll distance */}
          <div style={{ height: SPR * SCENES.length }} />
        </div>
      </div>
    </>
  );
}
