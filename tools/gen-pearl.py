#!/usr/bin/env python3
# Generates src/components/PearlSite.astro from the approved demo (redesign/04/index.html):
# CSS and JS verbatim (with base-path and real-form patches), markup templated for Sanity data.
import re, sys, os

ASTRO = sys.argv[1]
DEMO = sys.argv[2]
src = open(DEMO, encoding='utf-8').read()

css = src[src.index('<style>') + 7: src.index('</style>')]
m = re.search(r"<script type=\"module\">\n(.*?)\n</script>\n</body>", src, re.S)
assert m, 'module script not found'
js = m.group(1)

def rep(s, a, b):
    assert a in s, 'MISSING: ' + a[:70]
    return s.replace(a, b, 1)

js = "const PB = window.__PB || '/';\n" + js
js = rep(js, "import('./pearl.js').then(m => m.mountPearl(document.getElementById('pearl')))",
          "import(PB + 'pearl.js').then(m => m.mountPearl(document.getElementById('pearl')))")
js = rep(js, "const { mountTooth } = await import('./tooth.js');",
          "const { mountTooth } = await import(PB + 'tooth.js');")
js = rep(js, "{ progress: () => P, still, host: story });",
          "{ progress: () => P, still, host: story, src: PB + 'tooth.bin' });")

start = js.index("document.getElementById('form').addEventListener('submit', e => {")
tail = js[start:]
anchor = tail.index("два поля")
old_form = tail[:anchor + tail[anchor:].index("});") + 3]
new_form = """const formEl = document.getElementById('form'), statusEl = document.getElementById('f-status'), FD = formEl.dataset;
formEl.addEventListener('submit', async e => {
  e.preventDefault();
  let bad = [];
  [['f-name', 'e-name', v => v.trim().length > 1], ['f-phone', 'e-phone', v => /^\\+?3?8?0\\d{9}$/.test(v.replace(/[\\s()-]/g, ''))]].forEach(([f, er, ok]) => {
    const i = document.getElementById(f), m = document.getElementById(er), good = ok(i.value);
    i.setAttribute('aria-invalid', !good); m.hidden = good; if (!good) bad.push(i);
  });
  if (bad.length) { bad[0].focus(); statusEl.textContent = bad.length === 1 ? FD.fix1 : FD.fix2; return; }
  const btn = formEl.querySelector('button[type=submit]');
  btn.disabled = true; statusEl.textContent = FD.sending;
  try {
    if (!window.__CONTACT) throw new Error('no endpoint');
    const res = await fetch(window.__CONTACT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      name: document.getElementById('f-name').value.trim(),
      phone: document.getElementById('f-phone').value.trim(),
      service: document.getElementById('f-service').value || undefined,
      note: document.getElementById('f-note').value.trim() || undefined,
    }) });
    if (!res.ok) throw new Error('bad status');
    statusEl.textContent = FD.ok; formEl.reset();
  } catch (err) { console.warn('form', err); statusEl.textContent = FD.err; }
  btn.disabled = false;
});"""
js = js.replace(old_form, new_form)

frontmatter = '''---
// The pearl / liquid-glass site (the 04 direction) as one component: markup from the approved demo,
// copy from i18n/pearl. Services, prices, the case, doctors and reviews come only from Sanity.
// Regenerate from the demo with: python3 tools/gen-pearl.py (see the redesign branch history).
import "../styles/pearl.css";
import SeoHead from "./SeoHead.astro";
import { getContent, getServicePages } from "../lib/content";
import { translations } from "../i18n/translations";
import { pearl, type PearlLang } from "../i18n/pearl";
import { PAGE_UI } from "../i18n/services";

interface Props { lang: PearlLang; }
const { lang } = Astro.props;
const t = pearl[lang];
const tr = translations[lang];
const data = await getContent(lang);
const ui = PAGE_UI[lang];
const tel = "tel:" + ui.phone.replace(/[^+\d]/g, "");
const home = lang === "en" ? import.meta.env.BASE_URL.replace(/\/?$/, "/") + "en/" : import.meta.env.BASE_URL.replace(/\/?$/, "/");

const pages = await getServicePages();
const svcAll = data.services;
const svc = svcAll.slice(0, 6);
const reviews = data.reviews.slice(0, 8);
const team = data.team;
const founder = team[0];
const kase = data.cases[0];

const base = import.meta.env.BASE_URL.replace(/\\/?$/, "/");
const P = base + "pearl/";
const photos = ["photo-f29462631-960.jpg", "photo-f123751291-960.jpg", "photo-f156042973-960.jpg", "photo-f190774253-960.jpg", "photo-f14101125-960.jpg", "photo-f130333575-960.jpg"].map((f) => P + "img/" + f);
const caseBefore = kase?.beforeImg;
const caseAfter = kase?.afterImg;
const slides = [[572, 1163], [598, 1214], [617, 1242], [592, 922], [842, 1696]];
const importmap = JSON.stringify({ imports: { three: P + "vendor/three.module.min.js", "three/addons/": P + "vendor/" } });
const CONTACT = import.meta.env.PUBLIC_CONTACT_WORKER_URL || "";
const bootstrap = `window.__PB=${JSON.stringify(P)};window.__CONTACT=${JSON.stringify(CONTACT)};document.documentElement.classList.add("js")`;
---
'''

markup = '''<!doctype html>
<html lang={tr.htmlLang}>
<head>
<SeoHead title={tr.seo.title} description={tr.seo.description} keywords={tr.seo.keywords} lang={tr.htmlLang} ogLocale={tr.ogLocale} />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400..700&family=Playfair+Display:ital,wght@1,400;1,500&display=swap" rel="stylesheet">
<link rel="preload" href={P + "tooth.bin"} as="fetch" crossorigin media="(min-width: 900px)">
<link rel="preload" href={P + "slides/act0.webp"} as="image" media="(max-width: 899px)">
<script type="importmap" is:inline set:html={importmap} />
<script is:inline set:html={bootstrap} />
</head>
<body>
<canvas id="pearl" aria-hidden="true"></canvas>
<a class="skip" href="#booking">{t.nav.bookFull}</a>

<header class="nav">
  <a class="logo" href={base}><i aria-hidden="true"></i>Chirkova Dentist</a>
  <ul>
    <li><a href="#services">{t.nav.services}</a></li>
    <li><a href="#cases">{t.nav.results}</a></li>
    <li><a href="#prices">{t.nav.prices}</a></li>
    <li><a href="#reviews">{t.nav.reviews}</a></li>
  </ul>
  <a class="btn btn--ink" href="#booking">{t.nav.book}</a>
</header>

<main id="top">
  <section class="story" id="story" aria-label={t.nav.services}>
    <div class="stage">
      <div class="glow" aria-hidden="true"></div>
      <canvas id="tooth" aria-hidden="true"></canvas>
      <div class="progress" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="acts">
        <div class="act act--hero is-on" data-act="0">
          <div class="meta"><span class="chip"><i></i>{t.hero.chipHours}</span><span class="chip">{t.hero.chipAddr}</span></div>
          <h1 style="margin-top: 18px">{t.hero.h1pre} <em class="s">{t.hero.h1em}</em></h1>
          <p class="lead">{t.hero.lead}</p>
          <img class="act__img" src={P + "slides/act0.webp"} width={slides[0][0]} height={slides[0][1]} alt="" decoding="async" fetchpriority="high">
          <div class="row"><a class="btn btn--ink" href="#booking">{t.nav.bookFull}</a><a class="btn btn--ghost" href="#prices">{t.hero.ctaPrices}</a></div>
        </div>
        {t.acts.map((a, i) => (
          <div class="act" data-act={i + 1}>
            <img class="act__img" src={P + `slides/act${i + 1}.webp`} width={slides[i + 1][0]} height={slides[i + 1][1]} alt="" decoding="async" loading="lazy">
            <span class="act__n"><b>{"0" + (i + 1)}</b>{a.tag}</span>
            <h2>{a.h[0]}<em class="s">{a.h[1]}</em>{a.h[2]}</h2>
            <p>{a.p}</p>
            {a.price && <span class="price">{a.price}</span>}
          </div>
        ))}
      </div>
    </div>
  </section>

  <section class="hs" id="services" aria-labelledby="svc-h">
    <div class="hs__stick">
      <div class="wrap head">
        <h2 id="svc-h" class="split">{t.services.h}</h2>
        <p data-rv>{t.services.note}</p>
      </div>
      <div class="hs__track" id="hs-track">
        {svc.map((s, i) => (
          <a class="svc" href="#booking">
            <figure><img src={photos[i % photos.length]} width="960" height="720" alt={s.name} loading="lazy"><span class="svc__n">{s.num}</span></figure>
            <div class="svc__b"><h3>{s.name}</h3><p>{s.desc}</p><span class="from">{s.price}</span></div>
          </a>
        ))}
      </div>
      <div class="hs__bar" aria-hidden="true"><i id="hs-bar"></i></div>
    </div>
  </section>

  {kase && caseBefore && caseAfter && <section class="blk" id="cases" aria-labelledby="cases-h">
    <div class="wrap">
      <div class="head">
        <h2 id="cases-h" class="split">{t.cases.h}</h2>
        <p data-rv>{t.cases.note}</p>
      </div>
      <div class="ba" id="ba" data-rv style="--pos: 50%">
        <img src={caseBefore} width="820" height="615" alt={kase?.before ?? ""}>
        <img class="ba__after" src={caseAfter} width="820" height="615" alt={kase?.after ?? ""}>
        <span class="ba__tag ba__tag--l">{t.cases.before}</span><span class="ba__tag ba__tag--r">{t.cases.after}</span>
        <span class="ba__line" aria-hidden="true"></span><span class="ba__knob" aria-hidden="true">⇆</span>
        <input type="range" min="0" max="100" value="50" aria-label={t.cases.h}>
      </div>
      <div class="facts">
        {t.facts.map((f, i) => (
          <div class="fact" data-rv style={`--i:${i}`}><b {...(f.count ? { "data-count": f.count, "data-suffix": f.suffix || "" } : {})}>{f.b}</b><span>{f.label}</span></div>
        ))}
      </div>
    </div>
  </section>}

  <section class="blk" id="prices" aria-labelledby="prices-h">
    <div class="wrap">
      <div class="head">
        <h2 id="prices-h" class="split">{t.prices.h}</h2>
        <p data-rv>{t.prices.note}</p>
      </div>
      <div class="pc">
        {svcAll.map((s, i) => (
          <details open={i === 0}>
            <summary><b>{s.name}</b><span>{s.price}</span><i aria-hidden="true">+</i></summary>
            <ul>{s.items.map((it) => <li><span>{it.name}</span><span>{it.price}</span></li>)}</ul>
          </details>
        ))}
      </div>
    </div>
  </section>

  {reviews.length > 0 && <section class="blk" id="reviews" aria-labelledby="reviews-h" style="padding-bottom: 60px">
    <div class="wrap head">
      <h2 id="reviews-h" class="split">{t.reviews.h}</h2>
      <p class="g49" data-rv><b>4,9</b><span>{t.reviews.badge}</span></p>
    </div>
    <div class="rv" tabindex="0" aria-label={t.reviews.h}>
      {reviews.map((r) => (
        <figure>
          <blockquote>«{r.text}»</blockquote>
          <footer><span class="av">{r.initials}</span><span>{r.name}<br/>{t.reviews.patient} {r.age}</span><span class="st" aria-label={t.reviews.starsLabel}>★★★★★</span></footer>
        </figure>
      ))}
    </div>
  </section>}

  {founder && <section class="blk" id="team" aria-labelledby="team-h">
    <div class="wrap founder">
      <div>
        <p class="sr-only" id="team-h">{t.team.tag}</p>
        <blockquote data-rv>«{founder.bio}»</blockquote>
        <div class="who" data-rv style="--i:1">
          {team.map((d) => (
            <div class="doc"><span>{d.name} · {d.title}</span><span>{d.years} {d.yearsLabel.toLowerCase()}</span></div>
          ))}
        </div>
      </div>
      <div class="orbpic" data-rv style="--i:2"><img src={founder.img || P + "img/photo-f22521718-960.jpg"} width="960" height="798" alt={founder.img ? founder.name : ""} loading="lazy"></div>
    </div>
  </section>}

  <section class="blk" id="booking" aria-labelledby="booking-h">
    <div class="wrap book">
      <div>
        <h2 id="booking-h" class="split">{t.booking.h}</h2>
        <p style="margin-top: 18px; max-width: 34ch" data-rv>{t.booking.note}</p>
        <address class="addr" data-rv>{ui.address}</address>
        <p data-rv style="margin-top: 14px"><a class="btn btn--ghost" href={tel}>{ui.phone}</a></p>
        <dl class="hours" data-rv>{t.booking.hours.map(([d, h]) => <><dt>{d}</dt><dd>{h}</dd></>)}</dl>
      </div>
      <form class="form" id="form" novalidate data-rv data-fix1={t.booking.fix1} data-fix2={t.booking.fix2} data-sending={t.booking.sending} data-ok={t.booking.ok} data-err={t.booking.err}>
        <div class="field"><label for="f-name">{t.booking.name}</label><input id="f-name" name="name" autocomplete="name" required aria-describedby="e-name"><p class="field__err" id="e-name" hidden>{t.booking.nameErr}</p></div>
        <div class="field"><label for="f-phone">{t.booking.phone}</label><input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required aria-describedby="e-phone"><p class="field__err" id="e-phone" hidden>{t.booking.phoneErr}</p></div>
        <div class="field"><label for="f-service">{t.booking.service}</label><select id="f-service" name="service"><option value="">{t.booking.servicePlaceholder}</option>{svcAll.map((s) => <option>{s.name}</option>)}</select></div>
        <div class="field"><label for="f-note">{t.booking.note2}</label><textarea id="f-note" name="note" placeholder={t.booking.notePlaceholder}></textarea></div>
        <button class="btn btn--ink" type="submit">{t.booking.submit}</button>
        <p role="status" id="f-status" style="font-size: 14px; color: var(--muted)">{t.booking.idle}</p>
      </form>
    </div>
  </section>
</main>

<footer class="end">
  <div class="wrap">
    <nav class="end__svc" aria-label={ui.services}>{pages.map((s) => <a class="chip" href={home + s.slug}>{s[lang].name}</a>)}</nav>
    <p class="word" id="word" aria-hidden="true">Chirkova</p>
    <div class="end__row">
      <span>© {new Date().getFullYear()} Chirkova Dentist · {ui.address} · <a href={tel}>{ui.phone}</a></span>
      <span><a href="https://www.tiktok.com/@mad__dentist" target="_blank" rel="noopener">TikTok</a><a href="https://www.instagram.com/mad__dentist/" target="_blank" rel="noopener">Instagram</a><a href={lang === "en" ? base : base + "en/"}>{lang === "en" ? "Укр" : "EN"}</a></span>
    </div>
  </div>
</footer>

<div class="bar" id="bar"><a class="btn btn--ink" href="#booking">{t.nav.bookFull}</a></div>

<style is:global>.end__svc { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 40px; } .end__svc a { text-decoration: none; }</style>
<script is:inline type="module">__JS__</script>
</body>
</html>
'''

open(os.path.join(ASTRO, 'src/styles/pearl.css'), 'w', encoding='utf-8').write('/* generated from the approved demo (redesign/04) by tools/gen-pearl.py */\n' + css)
out = frontmatter + markup.replace('__JS__', js)
open(os.path.join(ASTRO, 'src/components/PearlSite.astro'), 'w', encoding='utf-8').write(out)
print('PearlSite.astro:', len(out.splitlines()), 'lines')
