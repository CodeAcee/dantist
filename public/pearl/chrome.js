// The shared chrome of the pearl pages (service pages): the pearl ground, liquid glass on the marked
// elements with a pointer spot, the reveal on scroll and the pearl name in the footer.
const PB = window.__PB || '/';
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

import(PB + 'pearl.js').then(m => m.mountPearl(document.getElementById('pearl'))).catch(e => console.warn('pearl', e));

document.querySelectorAll('.nav, .chip, .btn--ghost, .glass, .pc, .bar').forEach(el => el.classList.add('lg'));
let gq = null;
addEventListener('pointermove', e => {
  if (gq) return; gq = requestAnimationFrame(() => {
    gq = null;
    const g = e.target.closest && e.target.closest('.lg');
    if (!g) return;
    const r = g.getBoundingClientRect();
    g.style.setProperty('--mx', (e.clientX - r.left) + 'px'); g.style.setProperty('--my', (e.clientY - r.top) + 'px');
    g.style.setProperty('--ang', (Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2) * 57.3 + 90) + 'deg');
  });
}, { passive: true });

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('[data-rv]').forEach(el => io.observe(el));

const word = document.getElementById('word');
if (word) {
  let on = false, idle = 0;
  const set = (x, y) => {
    const r = word.getBoundingClientRect(), fx = (x - r.left) / r.width, fy = (y - r.top) / r.height;
    word.style.setProperty('--mx', (fx * 100) + '%'); word.style.setProperty('--my', (fy * 100) + '%');
    word.style.setProperty('--h', ((fx - .5) * 90) + 'deg');
    if (!still) { word.style.setProperty('--ry', (clamp(fx, -.2, 1.2) - .5) * 14 + 'deg'); word.style.setProperty('--rx', (.5 - clamp(fy, -1, 2)) * 10 + 'deg'); }
  };
  addEventListener('pointermove', e => { if (on) { idle = performance.now(); set(e.clientX, e.clientY); } }, { passive: true });
  new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on && !still) drift(); }).observe(word);
  function drift(now = performance.now()) {
    if (!on) return;
    if (now - idle > 2500) { const r = word.getBoundingClientRect(), k = now / 2600; set(r.left + r.width * (.5 + .45 * Math.sin(k)), r.top + r.height * (.4 + .25 * Math.cos(k * 1.3))); }
    requestAnimationFrame(drift);
  }
}

// the phone bar: after the first screen
const bar = document.getElementById('bar');
if (bar) addEventListener('scroll', () => bar.classList.toggle('show', scrollY > innerHeight * .6), { passive: true });
