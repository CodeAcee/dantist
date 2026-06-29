import { C } from "../components/zoomer/theme";

export type Lang = "uk" | "en";

export interface ServiceContent {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  eyebrow: string;
  name: string;
  h1: string;
  intro: string;
  benefitsTitle: string;
  benefits: { title: string; text: string }[];
  processTitle: string;
  process: { title: string; text: string }[];
  priceTitle: string;
  prices: { name: string; price: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
}

export interface Service {
  slug: string;
  accent: string;
  uk: ServiceContent;
  en: ServiceContent;
}

export const PAGE_UI = {
  uk: {
    brandSub: "Косметична стоматологія · Дніпро",
    home: "Головна",
    services: "Послуги",
    otherServices: "Інші послуги",
    book: "Записатись безкоштовно",
    contactsTitle: "Контакти",
    phoneLabel: "Телефон",
    addressLabel: "Адреса",
    hoursLabel: "Графік",
    address: "вул. Михайла Грушевського, 16, Дніпро",
    phone: "+38 (099) 31-21-565",
    hours: "Пн–Пт 9:00–20:00 · Сб 12:00–18:00",
    rights: "Усі права захищено.",
  },
  en: {
    brandSub: "Cosmetic dentistry · Dnipro",
    home: "Home",
    services: "Services",
    otherServices: "Other services",
    book: "Book for free",
    contactsTitle: "Contacts",
    phoneLabel: "Phone",
    addressLabel: "Address",
    hoursLabel: "Hours",
    address: "16 Mykhaila Hrushevskoho St, Dnipro",
    phone: "+38 (099) 31-21-565",
    hours: "Mon–Fri 9:00–20:00 · Sat 12:00–18:00",
    rights: "All rights reserved.",
  },
} as const;

export function serviceSchema(
  service: Service,
  lang: Lang,
  site: string,
  base: string,
): Record<string, unknown>[] {
  const norm = base.replace(/\/?$/, "/");
  const localeBase = lang === "en" ? norm + "en/" : norm;
  const pageUrl = new URL(localeBase + service.slug, site).href;
  const home = new URL(localeBase, site).href;
  const clinicId = new URL(norm, site).href.replace(/\/$/, "") + "/#clinic";
  const t = service[lang];
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: PAGE_UI[lang].home, item: home },
        { "@type": "ListItem", position: 2, name: t.name, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      name: t.name,
      description: t.metaDescription,
      url: pageUrl,
      provider: { "@type": "Dentist", name: "Chirkova Dentist Studio", "@id": clinicId },
      areaServed: { "@type": "City", name: lang === "en" ? "Dnipro" : "Дніпро" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}

export const SERVICES: Service[] = [
  {
    slug: "implantaciya",
    accent: C.cyan,
    uk: {
      metaTitle: "Імплантація зубів у Дніпрі — ціна від 25 000 грн | Chirkova Dentist",
      metaDescription:
        "Імплантація зубів у Дніпрі під ключ: безкоштовна консультація, 3D-планування, перевірені імпланти. Лікар Чиркова Валерія. Записатись →",
      keywords:
        "імплантація зубів Дніпро, імплант зуба ціна, імплантація під ключ Дніпро, вживлення імпланта, стоматолог імплантолог Дніпро",
      eyebrow: "Імплантологія",
      name: "Імплантація зубів",
      h1: "Імплантація зубів у Дніпрі",
      intro:
        "Відновлюємо втрачені зуби імплантами, які виглядають і відчуваються як власні. Повний цикл в одній клініці — від 3D-діагностики до постійної коронки. Перша консультація та план лікування — безкоштовно.",
      benefitsTitle: "Чому імплант",
      benefits: [
        { title: "Назавжди", text: "Титановий корінь зростається з кісткою та служить десятиліттями." },
        { title: "Не чіпаємо сусідні зуби", text: "На відміну від мосту, імплант не вимагає обточування здорових зубів." },
        { title: "Природний вигляд", text: "Керамічна коронка підбирається під колір і форму ваших зубів." },
        { title: "Зберігає кістку", text: "Навантаження на імплант запобігає атрофії щелепної кістки." },
      ],
      processTitle: "Як проходить лікування",
      process: [
        { title: "Консультація та 3D-скан", text: "Оцінюємо стан кістки на комп'ютерному томографі та складаємо план." },
        { title: "Встановлення імпланта", text: "Малоінвазивна процедура під місцевою анестезією, без болю." },
        { title: "Приживлення", text: "2–4 місяці на остеоінтеграцію; на цей час — тимчасова коронка." },
        { title: "Постійна коронка", text: "Фіксуємо керамічну коронку — і ви користуєтесь зубом як своїм." },
      ],
      priceTitle: "Ціни на імплантацію",
      prices: [
        { name: "Імплант під ключ", price: "від 25 000 грн" },
        { name: "Коронка (кераміка)", price: "від 5 500 грн" },
        { name: "Синус-ліфтинг", price: "від 12 000 грн" },
        { name: "Консультація + 3D-план", price: "Безкоштовно" },
      ],
      faqTitle: "Часті запитання",
      faq: [
        { q: "Чи боляче встановлювати імплант?", a: "Ні. Процедуру проводимо під місцевою анестезією; більшість пацієнтів порівнюють її з лікуванням звичайного зуба." },
        { q: "Скільки служить імплант?", a: "При належному догляді — 15–25 років і більше. Виробники часто дають довічну гарантію на самі імпланти." },
        { q: "Скільки коштує імплантація зубів у Дніпрі?", a: "Імплант під ключ — від 25 000 грн. Точну вартість визначає лікар після безкоштовної консультації та 3D-діагностики." },
        { q: "Що робити, якщо не вистачає кісткової тканини?", a: "Виконуємо кісткову пластику або синус-ліфтинг — це дозволяє встановити імплант навіть при дефіциті кістки." },
      ],
      ctaTitle: "Готові повернути усмішку?",
      ctaText: "Запишіться на безкоштовну консультацію — складемо план лікування саме для вас.",
    },
    en: {
      metaTitle: "Dental Implants in Dnipro — from ₴25,000 | Chirkova Dentist",
      metaDescription:
        "Turnkey dental implants in Dnipro: free consultation, 3D planning, trusted implant systems. Dr. Chirkova Valeria. Book now →",
      keywords:
        "dental implants Dnipro, tooth implant cost, turnkey implants Dnipro, implantologist Dnipro",
      eyebrow: "Implantology",
      name: "Dental implants",
      h1: "Dental Implants in Dnipro",
      intro:
        "We restore missing teeth with implants that look and feel like your own. The full cycle in one clinic — from 3D diagnostics to the final crown. First consultation and treatment plan are free.",
      benefitsTitle: "Why an implant",
      benefits: [
        { title: "Built to last", text: "The titanium root fuses with the bone and lasts for decades." },
        { title: "Neighbours untouched", text: "Unlike a bridge, an implant doesn't require grinding healthy teeth." },
        { title: "Natural look", text: "The ceramic crown is matched to the colour and shape of your teeth." },
        { title: "Preserves bone", text: "Chewing load on the implant prevents jawbone atrophy." },
      ],
      processTitle: "How treatment works",
      process: [
        { title: "Consultation & 3D scan", text: "We assess the bone on a CT scanner and build your plan." },
        { title: "Implant placement", text: "A minimally invasive procedure under local anaesthesia, pain-free." },
        { title: "Healing", text: "2–4 months for osseointegration, with a temporary crown meanwhile." },
        { title: "Permanent crown", text: "We fit the ceramic crown — and you use the tooth as your own." },
      ],
      priceTitle: "Implant prices",
      prices: [
        { name: "Implant (turnkey)", price: "from ₴25,000" },
        { name: "Crown (ceramic)", price: "from ₴5,500" },
        { name: "Sinus lift", price: "from ₴12,000" },
        { name: "Consultation + 3D plan", price: "Free" },
      ],
      faqTitle: "Frequently asked",
      faq: [
        { q: "Does placing an implant hurt?", a: "No. It's done under local anaesthesia; most patients compare it to treating an ordinary tooth." },
        { q: "How long does an implant last?", a: "With proper care, 15–25 years and more. Manufacturers often give a lifetime warranty on the implants themselves." },
        { q: "How much do dental implants cost in Dnipro?", a: "A turnkey implant starts at ₴25,000. The exact price is set by the doctor after a free consultation and 3D diagnostics." },
        { q: "What if there isn't enough bone?", a: "We perform bone grafting or a sinus lift, which lets us place an implant even with bone deficiency." },
      ],
      ctaTitle: "Ready to get your smile back?",
      ctaText: "Book a free consultation — we'll build a treatment plan just for you.",
    },
  },
  {
    slug: "viniry",
    accent: C.lime,
    uk: {
      metaTitle: "Вініри у Дніпрі — ціна від 8 000 грн за зуб | Chirkova Dentist",
      metaDescription:
        "Керамічні вініри у Дніпрі: ідеальна усмішка за 2 тижні, цифрове моделювання Digital Smile Design. Безкоштовна консультація. Записатись →",
      keywords:
        "вініри Дніпро, керамічні вініри ціна, естетична реставрація зубів, голлівудська усмішка Дніпро",
      eyebrow: "Естетика",
      name: "Вініри",
      h1: "Вініри у Дніпрі",
      intro:
        "Тонкі керамічні пластинки, що приховують сколи, щілини, потемніння та нерівності. Спочатку показуємо результат у цифровому форматі — ви бачите нову усмішку ще до початку лікування.",
      benefitsTitle: "Що дають вініри",
      benefits: [
        { title: "Результат за 2 тижні", text: "Від зліпка до готової усмішки — зазвичай два візити." },
        { title: "Не темніють", text: "Порцеляна не вбирає барвники від кави, чаю чи вина." },
        { title: "Бачите результат заздалегідь", text: "Digital Smile Design показує форму й колір до лікування." },
        { title: "Мінімум обточування", text: "Знімаємо лише тонкий шар емалі, зберігаючи зуб максимально." },
      ],
      processTitle: "Етапи встановлення",
      process: [
        { title: "Консультація та дизайн усмішки", text: "Обговорюємо форму, колір і моделюємо результат цифрово." },
        { title: "Підготовка зубів", text: "Делікатно обробляємо емаль і знімаємо зліпки." },
        { title: "Виготовлення в лабораторії", text: "Технік створює індивідуальні вініри з кераміки." },
        { title: "Фіксація", text: "Приміряємо та закріплюємо вініри — усмішка готова." },
      ],
      priceTitle: "Ціни на вініри",
      prices: [
        { name: "Порцеляновий вінір (1 зуб)", price: "від 8 000 грн" },
        { name: "Композитна реставрація", price: "від 2 500 грн" },
        { name: "Консультація + дизайн усмішки", price: "Безкоштовно" },
      ],
      faqTitle: "Часті запитання",
      faq: [
        { q: "Скільки коштують вініри у Дніпрі?", a: "Порцеляновий вінір — від 8 000 грн за зуб. Остаточна сума залежить від кількості зубів і матеріалу." },
        { q: "Скільки служать вініри?", a: "Якісні керамічні вініри служать 10–15 років і довше за належного догляду." },
        { q: "Чи псуються зуби під вінірами?", a: "Ні. За належної гігієни зуб під вініром захищений; ми знімаємо мінімум емалі." },
        { q: "Скільки потрібно візитів?", a: "Зазвичай два: підготовка зі зліпками та фіксація готових вінірів." },
      ],
      ctaTitle: "Хочете ідеальну усмішку?",
      ctaText: "Запишіться на безкоштовну консультацію — покажемо вашу майбутню усмішку в цифрі.",
    },
    en: {
      metaTitle: "Veneers in Dnipro — from ₴8,000 per tooth | Chirkova Dentist",
      metaDescription:
        "Porcelain veneers in Dnipro: a perfect smile in 2 weeks with Digital Smile Design preview. Free consultation. Book now →",
      keywords:
        "veneers Dnipro, porcelain veneers cost, smile makeover Dnipro, aesthetic restoration",
      eyebrow: "Aesthetics",
      name: "Veneers",
      h1: "Veneers in Dnipro",
      intro:
        "Thin ceramic shells that hide chips, gaps, discolouration and uneven edges. We preview the result digitally first — you see your new smile before treatment even begins.",
      benefitsTitle: "What veneers give you",
      benefits: [
        { title: "Results in 2 weeks", text: "From impression to finished smile is usually two visits." },
        { title: "Stay white", text: "Porcelain doesn't absorb stains from coffee, tea or wine." },
        { title: "See it in advance", text: "Digital Smile Design shows shape and colour before treatment." },
        { title: "Minimal prep", text: "We remove only a thin layer of enamel, preserving the tooth." },
      ],
      processTitle: "The steps",
      process: [
        { title: "Consultation & smile design", text: "We discuss shape and colour and model the result digitally." },
        { title: "Tooth preparation", text: "We gently prepare the enamel and take impressions." },
        { title: "Lab fabrication", text: "A technician crafts your individual ceramic veneers." },
        { title: "Bonding", text: "We try in and bond the veneers — your smile is ready." },
      ],
      priceTitle: "Veneer prices",
      prices: [
        { name: "Porcelain veneer (1 tooth)", price: "from ₴8,000" },
        { name: "Composite restoration", price: "from ₴2,500" },
        { name: "Consultation + smile design", price: "Free" },
      ],
      faqTitle: "Frequently asked",
      faq: [
        { q: "How much do veneers cost in Dnipro?", a: "A porcelain veneer starts at ₴8,000 per tooth. The final sum depends on the number of teeth and the material." },
        { q: "How long do veneers last?", a: "Quality ceramic veneers last 10–15 years and longer with proper care." },
        { q: "Do teeth decay under veneers?", a: "No. With good hygiene the tooth under a veneer is protected, and we remove minimal enamel." },
        { q: "How many visits are needed?", a: "Usually two: preparation with impressions, then bonding the finished veneers." },
      ],
      ctaTitle: "Want a perfect smile?",
      ctaText: "Book a free consultation — we'll show your future smile digitally.",
    },
  },
  {
    slug: "vidbiliuvannia",
    accent: C.purple,
    uk: {
      metaTitle: "Відбілювання зубів у Дніпрі — від 3 500 грн | Chirkova Dentist",
      metaDescription:
        "Професійне відбілювання зубів у Дніпрі: до 8 тонів за один сеанс, безпечно для емалі. Zoom та домашнє відбілювання. Записатись →",
      keywords:
        "відбілювання зубів Дніпро, Zoom відбілювання ціна, професійне відбілювання, біла усмішка Дніпро",
      eyebrow: "Естетика",
      name: "Відбілювання зубів",
      h1: "Відбілювання зубів у Дніпрі",
      intro:
        "Освітлюємо емаль на кілька тонів безпечно та без чутливості. Перед процедурою лікар оцінює стан зубів і добирає метод — кабінетний Zoom або домашній курс у каппах.",
      benefitsTitle: "Переваги",
      benefits: [
        { title: "До 8 тонів за сеанс", text: "Помітний результат вже після першого відвідування." },
        { title: "Безпечно для емалі", text: "Використовуємо професійні гелі та захист ясен." },
        { title: "Без чутливості", text: "Підготовка та ремінералізація зводять дискомфорт до мінімуму." },
        { title: "Стійкий ефект", text: "За дотримання рекомендацій білизна тримається до 1–2 років." },
      ],
      processTitle: "Як це відбувається",
      process: [
        { title: "Огляд і гігієна", text: "За потреби робимо чистку — відбілювання діє рівномірніше." },
        { title: "Захист ясен", text: "Наносимо бар'єр, щоб гель діяв лише на емаль." },
        { title: "Відбілювання", text: "Активуємо гель лампою Zoom — 2–3 цикли по 15 хвилин." },
        { title: "Ремінералізація", text: "Зміцнюємо емаль і даємо рекомендації по догляду." },
      ],
      priceTitle: "Ціни на відбілювання",
      prices: [
        { name: "Zoom-відбілювання (кабінет)", price: "4 500 грн" },
        { name: "Домашнє відбілювання (каппи)", price: "від 2 800 грн" },
        { name: "Air Flow (чистка перед)", price: "1 500 грн" },
      ],
      faqTitle: "Часті запитання",
      faq: [
        { q: "Чи шкідливе відбілювання для зубів?", a: "Ні, якщо його робить лікар. Професійні протоколи безпечні для емалі та супроводжуються ремінералізацією." },
        { q: "Скільки тримається результат?", a: "Зазвичай 1–2 роки залежно від харчування та звичок (кава, чай, тютюн)." },
        { q: "Скільки коштує відбілювання у Дніпрі?", a: "Кабінетне Zoom-відбілювання — 4 500 грн, домашній курс — від 2 800 грн." },
        { q: "Чи відбіляться коронки та вініри?", a: "Ні, реставрації не змінюють колір. Це враховуємо під час планування усмішки." },
      ],
      ctaTitle: "Готові до яскравої усмішки?",
      ctaText: "Запишіться на консультацію — підберемо безпечний метод відбілювання для вас.",
    },
    en: {
      metaTitle: "Teeth Whitening in Dnipro — from ₴3,500 | Chirkova Dentist",
      metaDescription:
        "Professional teeth whitening in Dnipro: up to 8 shades in one session, safe for enamel. Zoom and home whitening. Book now →",
      keywords:
        "teeth whitening Dnipro, Zoom whitening cost, professional whitening, white smile Dnipro",
      eyebrow: "Aesthetics",
      name: "Teeth whitening",
      h1: "Teeth Whitening in Dnipro",
      intro:
        "We lighten enamel by several shades safely and without sensitivity. Before the procedure the doctor checks your teeth and chooses the method — in-office Zoom or a home course with trays.",
      benefitsTitle: "Benefits",
      benefits: [
        { title: "Up to 8 shades per session", text: "A visible result after the very first visit." },
        { title: "Safe for enamel", text: "We use professional gels and gum protection." },
        { title: "No sensitivity", text: "Prep and remineralisation keep discomfort to a minimum." },
        { title: "Lasting effect", text: "Following our advice, the whiteness holds for 1–2 years." },
      ],
      processTitle: "How it works",
      process: [
        { title: "Check-up & hygiene", text: "If needed we clean first — whitening then acts more evenly." },
        { title: "Gum protection", text: "We apply a barrier so the gel only acts on the enamel." },
        { title: "Whitening", text: "We activate the gel with the Zoom lamp — 2–3 cycles of 15 minutes." },
        { title: "Remineralisation", text: "We strengthen the enamel and give aftercare advice." },
      ],
      priceTitle: "Whitening prices",
      prices: [
        { name: "Zoom whitening (in-office)", price: "₴4,500" },
        { name: "Home whitening (trays)", price: "from ₴2,800" },
        { name: "Air Flow (clean before)", price: "₴1,500" },
      ],
      faqTitle: "Frequently asked",
      faq: [
        { q: "Is whitening bad for teeth?", a: "Not when done by a dentist. Professional protocols are safe for enamel and include remineralisation." },
        { q: "How long does the result last?", a: "Usually 1–2 years depending on diet and habits (coffee, tea, tobacco)." },
        { q: "How much does whitening cost in Dnipro?", a: "In-office Zoom whitening is ₴4,500; a home course starts at ₴2,800." },
        { q: "Will crowns and veneers whiten?", a: "No, restorations don't change colour. We account for this when planning your smile." },
      ],
      ctaTitle: "Ready for a brighter smile?",
      ctaText: "Book a consultation — we'll choose a safe whitening method for you.",
    },
  },
  {
    slug: "elainery",
    accent: C.pink,
    uk: {
      metaTitle: "Елайнери та брекети у Дніпрі — вирівнювання зубів | Chirkova Dentist",
      metaDescription:
        "Виправлення прикусу у Дніпрі: прозорі елайнери та брекет-системи з цифровим плануванням. Безкоштовна консультація ортодонта. Записатись →",
      keywords:
        "елайнери Дніпро, брекети Дніпро, виправлення прикусу, вирівнювання зубів ціна, ортодонт Дніпро",
      eyebrow: "Ортодонтія",
      name: "Елайнери та брекети",
      h1: "Елайнери та брекети у Дніпрі",
      intro:
        "Вирівнюємо зуби та виправляємо прикус прозорими елайнерами або брекет-системами. Цифрове планування показує, як рухатимуться зуби та яким буде результат.",
      benefitsTitle: "Чому до нас",
      benefits: [
        { title: "Прозоро та непомітно", text: "Елайнери майже невидимі — ніхто не помітить, що ви лікуєтесь." },
        { title: "Знімні", text: "Знімаєте на час їжі та чищення — жодних обмежень у харчуванні." },
        { title: "Прогноз результату", text: "3D-симуляція показує фінальну усмішку ще на старті." },
        { title: "Понад 800 кейсів", text: "Досвід ортодонтичного лікування різної складності." },
      ],
      processTitle: "Етапи лікування",
      process: [
        { title: "Консультація та сканування", text: "Робимо 3D-скан і визначаємо план переміщення зубів." },
        { title: "Цифрова симуляція", text: "Показуємо результат і кількість етапів до його досягнення." },
        { title: "Носіння елайнерів", text: "Міняєте набори кожні 1–2 тижні; контроль раз на місяць." },
        { title: "Ретенція", text: "Закріплюємо результат ретейнером, щоб зуби не повернулись." },
      ],
      priceTitle: "Ціни на ортодонтію",
      prices: [
        { name: "Елайнери (повний курс)", price: "від 45 000 грн" },
        { name: "Металева брекет-система", price: "від 18 000 грн" },
        { name: "Ретейнери", price: "від 2 400 грн" },
        { name: "Консультація ортодонта", price: "Безкоштовно" },
      ],
      faqTitle: "Часті запитання",
      faq: [
        { q: "Що краще — елайнери чи брекети?", a: "Елайнери зручніші й непомітні; брекети ефективні у складних випадках. Метод добирає ортодонт після огляду." },
        { q: "Скільки триває лікування?", a: "Залежно від випадку — від 6 до 24 місяців. Точний термін визначає цифрове планування." },
        { q: "Скільки коштують елайнери у Дніпрі?", a: "Повний курс елайнерів — від 45 000 грн. Брекет-система — від 18 000 грн." },
        { q: "Чи боляче носити елайнери?", a: "Перші дні нового набору можливий легкий тиск — це означає, що зуби рухаються. Дискомфорт швидко минає." },
      ],
      ctaTitle: "Час вирівняти усмішку?",
      ctaText: "Запишіться на безкоштовну консультацію ортодонта — покажемо результат у 3D.",
    },
    en: {
      metaTitle: "Aligners & Braces in Dnipro — teeth straightening | Chirkova Dentist",
      metaDescription:
        "Bite correction in Dnipro: clear aligners and braces with digital planning. Free orthodontist consultation. Book now →",
      keywords:
        "aligners Dnipro, braces Dnipro, bite correction, teeth straightening cost, orthodontist Dnipro",
      eyebrow: "Orthodontics",
      name: "Aligners & braces",
      h1: "Aligners & Braces in Dnipro",
      intro:
        "We straighten teeth and correct the bite with clear aligners or braces. Digital planning shows how the teeth will move and what the result will be.",
      benefitsTitle: "Why us",
      benefits: [
        { title: "Clear & discreet", text: "Aligners are almost invisible — no one will notice you're in treatment." },
        { title: "Removable", text: "Take them out to eat and brush — no food restrictions." },
        { title: "Result preview", text: "A 3D simulation shows the final smile right at the start." },
        { title: "800+ cases", text: "Experience with orthodontic treatment of varying complexity." },
      ],
      processTitle: "Treatment steps",
      process: [
        { title: "Consultation & scan", text: "We take a 3D scan and define the tooth-movement plan." },
        { title: "Digital simulation", text: "We show the result and the number of stages to reach it." },
        { title: "Wearing aligners", text: "You change sets every 1–2 weeks; a check-up once a month." },
        { title: "Retention", text: "We lock the result with a retainer so teeth don't shift back." },
      ],
      priceTitle: "Orthodontics prices",
      prices: [
        { name: "Aligners (full course)", price: "from ₴45,000" },
        { name: "Metal braces", price: "from ₴18,000" },
        { name: "Retainers", price: "from ₴2,400" },
        { name: "Orthodontist consultation", price: "Free" },
      ],
      faqTitle: "Frequently asked",
      faq: [
        { q: "Aligners or braces — which is better?", a: "Aligners are more comfortable and discreet; braces are effective in complex cases. The orthodontist chooses after an exam." },
        { q: "How long does treatment take?", a: "Depending on the case, 6 to 24 months. Digital planning gives the exact timeline." },
        { q: "How much do aligners cost in Dnipro?", a: "A full aligner course starts at ₴45,000; braces from ₴18,000." },
        { q: "Do aligners hurt?", a: "The first days of a new set may feel light pressure — that means the teeth are moving. It passes quickly." },
      ],
      ctaTitle: "Time to straighten your smile?",
      ctaText: "Book a free orthodontist consultation — we'll show the result in 3D.",
    },
  },
  {
    slug: "chystka-zubiv",
    accent: C.green,
    uk: {
      metaTitle: "Професійна чистка зубів у Дніпрі — від 1 500 грн | Chirkova Dentist",
      metaDescription:
        "Професійна гігієна та чистка зубів у Дніпрі: ультразвук + Air Flow, зняття каменю й нальоту, поліровка. Записатись на гігієну →",
      keywords:
        "чистка зубів Дніпро, професійна гігієна, Air Flow, зняття зубного каменю, чистка зубов Днепр",
      eyebrow: "Профілактика",
      name: "Професійна чистка зубів",
      h1: "Професійна чистка зубів у Дніпрі",
      intro:
        "Прибираємо зубний камінь, наліт і пігментацію, до яких не дістає щітка. Регулярна гігієна раз на півроку — найдешевший спосіб уникнути карієсу та проблем з яснами.",
      benefitsTitle: "Що дає гігієна",
      benefits: [
        { title: "Профілактика карієсу", text: "Видаляємо наліт там, де він призводить до руйнування емалі." },
        { title: "Здорові ясна", text: "Зняття каменю зупиняє кровоточивість і запалення." },
        { title: "Свіже дихання", text: "Усуваємо причину неприємного запаху, а не маскуємо її." },
        { title: "Світліша емаль", text: "Air Flow прибирає пігмент від кави, чаю та тютюну." },
      ],
      processTitle: "Як проходить чистка",
      process: [
        { title: "Огляд", text: "Лікар оцінює стан зубів і ясен, відмічає проблемні зони." },
        { title: "Ультразвук", text: "М'яко знімаємо твердий зубний камінь над і під яснами." },
        { title: "Air Flow", text: "Струмінь із дрібним порошком прибирає наліт і пігмент." },
        { title: "Поліровка та фторування", text: "Поліруємо емаль і зміцнюємо її захисним покриттям." },
      ],
      priceTitle: "Ціни на гігієну",
      prices: [
        { name: "Комплексна чистка (УЗ + Air Flow)", price: "від 1 500 грн" },
        { name: "Зняття зубного каменю", price: "від 900 грн" },
        { name: "Фторування емалі", price: "від 500 грн" },
      ],
      faqTitle: "Часті запитання",
      faq: [
        { q: "Як часто потрібна чистка зубів?", a: "Зазвичай раз на 6 місяців. Курцям і любителям кави — частіше, за рекомендацією лікаря." },
        { q: "Чи боляче робити чистку?", a: "Ні. Процедура комфортна; за підвищеної чутливості застосовуємо аплікаційну анестезію." },
        { q: "Скільки коштує чистка зубів у Дніпрі?", a: "Комплексна професійна чистка — від 1 500 грн." },
        { q: "Чи відбілює чистка зуби?", a: "Air Flow повертає природний колір, прибираючи наліт, але це не відбілювання емалі." },
      ],
      ctaTitle: "Подбайте про зуби заздалегідь",
      ctaText: "Запишіться на професійну гігієну — це основа здорової усмішки.",
    },
    en: {
      metaTitle: "Professional Teeth Cleaning in Dnipro — from ₴1,500 | Chirkova Dentist",
      metaDescription:
        "Professional dental hygiene in Dnipro: ultrasound + Air Flow, tartar and plaque removal, polishing. Book your hygiene visit →",
      keywords:
        "teeth cleaning Dnipro, professional hygiene, Air Flow, tartar removal, dental cleaning Dnipro",
      eyebrow: "Prevention",
      name: "Professional teeth cleaning",
      h1: "Professional Teeth Cleaning in Dnipro",
      intro:
        "We remove tartar, plaque and pigmentation that a brush can't reach. Regular hygiene twice a year is the cheapest way to avoid cavities and gum problems.",
      benefitsTitle: "What hygiene gives you",
      benefits: [
        { title: "Cavity prevention", text: "We remove plaque where it leads to enamel breakdown." },
        { title: "Healthy gums", text: "Tartar removal stops bleeding and inflammation." },
        { title: "Fresh breath", text: "We remove the cause of odour rather than masking it." },
        { title: "Brighter enamel", text: "Air Flow removes pigment from coffee, tea and tobacco." },
      ],
      processTitle: "How cleaning works",
      process: [
        { title: "Check-up", text: "The doctor assesses teeth and gums and notes problem areas." },
        { title: "Ultrasound", text: "We gently remove hard tartar above and below the gum line." },
        { title: "Air Flow", text: "A fine-powder jet removes plaque and pigment." },
        { title: "Polishing & fluoride", text: "We polish the enamel and strengthen it with a protective coating." },
      ],
      priceTitle: "Hygiene prices",
      prices: [
        { name: "Full cleaning (US + Air Flow)", price: "from ₴1,500" },
        { name: "Tartar removal", price: "from ₴900" },
        { name: "Enamel fluoridation", price: "from ₴500" },
      ],
      faqTitle: "Frequently asked",
      faq: [
        { q: "How often is cleaning needed?", a: "Usually every 6 months. More often for smokers and coffee lovers, on the doctor's advice." },
        { q: "Does cleaning hurt?", a: "No. It's comfortable; for high sensitivity we use a topical anaesthetic." },
        { q: "How much does teeth cleaning cost in Dnipro?", a: "A full professional cleaning starts at ₴1,500." },
        { q: "Does cleaning whiten teeth?", a: "Air Flow restores the natural colour by removing plaque, but it isn't enamel whitening." },
      ],
      ctaTitle: "Take care of your teeth early",
      ctaText: "Book a professional hygiene visit — it's the foundation of a healthy smile.",
    },
  },
];
