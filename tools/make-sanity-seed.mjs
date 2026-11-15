// Builds seed.ndjson for `sanity dataset import`: the doctors, the reviews and the five service pages
// that until now lived in the site's code (strings.ts, services.ts). Deterministic _ids, so a re-import
// with --replace overwrites instead of duplicating.
import fs from 'node:fs';
import { SERVICES } from './lib/i18n/services.js';
import { STRINGS } from './lib/components/zoomer/strings.js';

const out = [];
const key = (p, i) => `${p}${i}`;

// doctors
STRINGS.uk.team.members.forEach((m, i) => {
  const en = STRINGS.en.team.members[i];
  out.push({
    _id: `teamMember-${i + 1}`, _type: 'teamMember', order: i + 1, name: m.name,
    titleUk: m.title, titleEn: en.title, bioUk: m.bio, bioEn: en.bio,
    years: m.years, yearsLabelUk: m.yearsLabel.toLowerCase(), yearsLabelEn: en.yearsLabel.toLowerCase(),
  });
});

// reviews
STRINGS.uk.reviews.list.forEach((r, i) => {
  const en = STRINGS.en.reviews.list[i];
  const since = Number(String(r.age).match(/\d{4}/)?.[0]) || undefined;
  out.push({ _id: `review-${i + 1}`, _type: 'review', order: i + 1, name: r.name, initials: r.initials, since, textUk: r.text, textEn: en.text });
});

// service pages: prices by reference to a price category where the clinic's list has one
const CATEGORY = { viniry: 'JDb171zXarnrftlrgrOlbn', vidbiliuvannia: 'a3g4kndQ23xGSuWPYqBrv3', elainery: 'Xc2TFiVgv3Yo2fTPPUR7RQ' };
const pairs = (uk, en, mk) => uk.map((x, i) => ({ _key: key('k', i), _type: 'item', ...mk(x, en[i]) }));
SERVICES.forEach((s, i) => {
  const u = s.uk, e = s.en;
  const doc = {
    _id: `servicePage-${s.slug}`, _type: 'servicePage', order: i + 1,
    slug: { _type: 'slug', current: s.slug },
    nameUk: u.name, nameEn: e.name, eyebrowUk: u.eyebrow, eyebrowEn: e.eyebrow,
    metaTitleUk: u.metaTitle, metaTitleEn: e.metaTitle, metaDescriptionUk: u.metaDescription, metaDescriptionEn: e.metaDescription,
    keywordsUk: u.keywords, keywordsEn: e.keywords,
    h1Uk: u.h1, h1En: e.h1, introUk: u.intro, introEn: e.intro,
    benefitsTitleUk: u.benefitsTitle, benefitsTitleEn: e.benefitsTitle,
    benefits: pairs(u.benefits, e.benefits, (a, b) => ({ titleUk: a.title, titleEn: b.title, textUk: a.text, textEn: b.text })),
    processTitleUk: u.processTitle, processTitleEn: e.processTitle,
    process: pairs(u.process, e.process, (a, b) => ({ titleUk: a.title, titleEn: b.title, textUk: a.text, textEn: b.text })),
    priceTitleUk: u.priceTitle, priceTitleEn: e.priceTitle,
    faqTitleUk: u.faqTitle, faqTitleEn: e.faqTitle,
    faq: pairs(u.faq, e.faq, (a, b) => ({ qUk: a.q, qEn: b.q, aUk: a.a, aEn: b.a })),
    ctaTitleUk: u.ctaTitle, ctaTitleEn: e.ctaTitle, ctaTextUk: u.ctaText, ctaTextEn: e.ctaText,
  };
  if (CATEGORY[s.slug]) doc.priceCategory = { _type: 'reference', _ref: CATEGORY[s.slug] };
  else doc.prices = u.prices.map((p, j) => ({ _key: key('p', j), _type: 'priceItem', nameUk: p.name, nameEn: e.prices[j].name, priceUk: p.price, priceEn: e.prices[j].price }));
  out.push(doc);
});

fs.writeFileSync(process.argv[2] || 'seed.ndjson', out.map((d) => JSON.stringify(d)).join('\n') + '\n');
console.log(`${out.length} documents:`, out.reduce((m, d) => (m[d._type] = (m[d._type] || 0) + 1, m), {}));
