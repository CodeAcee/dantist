// Copy for the pearl / liquid-glass design (the 04 direction): only the design's own words.
// Services, prices, the case, doctors, reviews and the service pages come from Sanity.
export type PearlLang = "uk" | "en";

export const pearl = {
  uk: {
    nav: { services: "Послуги", results: "Результати", prices: "Ціни", reviews: "Відгуки", contacts: "Контакти", book: "Записатися", bookFull: "Записатися на огляд", langLabel: "Мова сайту" },
    pages: { h: "Детально про послуги", note: "Кожна послуга має свою сторінку: етапи, ціни, відповіді на часті питання.", more: "Детальніше", askTag: "Консультація", askH: "Не знайшли свою послугу?", askP: "Лікар оглядає зуби і підбирає лікування на безкоштовній консультації.", askMore: "Записатися" },
    visit: { h: "Як нас знайти", note: "Ми в центрі Дніпра. Поруч метро і паркінг.", route: "Прокласти маршрут", call: "Зателефонувати", hoursTitle: "Графік", follow: "Ми в соцмережах", mapTitle: "Клініка на карті", mapShow: "Показати карту", mapNote: "Карта завантажується з Google Maps після натискання." },
    announceClose: "Закрити оголошення",
    svcMore: "Детальніше",
    hero: {
      chipHours: "Пн–Пт до 20:00, Сб до 18:00",
      chipAddr: "вул. Грушевського",
      h1pre: "Стоматологія в центрі",
      h1em: "Дніпра",
      lead: "Вініри, коронки, імпланти й лікування без нотацій. Перша консультація безкоштовна.",
      ctaPrices: "Ціни",
    },
    acts: [
      { tag: "Огляд і діагностика", h: ["Спочатку ", "бачимо", " все"], p: "Лікар оглядає зуби, за потреби робить цифровий скан і називає точну ціну до початку лікування.", price: "" },
      { tag: "Вініри", h: ["Нова форма і ", "колір", ""], p: "Композитні або керамічні E-max. Вісім вінірів ми робили за два тижні.", price: "" },
      { tag: "Коронки й імпланти", h: ["Зуб, який ", "повернули", ""], p: "Коронки з металокераміки або цирконію, імплант замість втраченого кореня.", price: "" },
      { tag: "Результат", h: ["Посмішка, якою ", "хочеться", " ділитися"], p: "2400+ посмішок і 4,9 у Google. Без нотацій і без осуду.", price: "" },
    ],
    services: { h: "Послуги", note: "Ціни «від». Точну суму лікар називає на безкоштовній консультації." },
    cases: { h: "До і після", note: "Реальні випадки пацієнтів клініки. Обери випадок і тягни повзунок.", before: "До", after: "Після" },
    facts: [
      { b: "2400+", count: 2400, suffix: "+", label: "посмішок за роки роботи" },
      { b: "98%", count: 98, suffix: "%", label: "пацієнтів повертаються" },
      { b: "4,9", label: "рейтинг у Google" },
      { b: "14", count: 14, label: "років практики засновниці" },
    ],
    prices: { h: "Повний прайс", note: "Відкрий категорію. Ціни з прайсу клініки, у гривнях." },
    reviews: { h: "Відгуки", badge: "у Google", starsLabel: "5 з 5", patient: "пацієнт" },
    team: { tag: "Лікарі клініки" },
    booking: {
      h: "Запис на огляд",
      note: "Залиш ім’я і телефон. Передзвонимо протягом 2 годин. Перша консультація безкоштовна.",
      addr: ["вул. Михайла Грушевського,", "центр Дніпра"],
      hours: [["Пн–Пт", "9:00–20:00"], ["Сб", "10:00–18:00"], ["Нд", "вихідний"]],
      name: "Ім’я", nameErr: "Напиши, як до тебе звертатися.",
      phone: "Телефон", phoneErr: "Напиши номер у форматі +380XXXXXXXXX.",
      service: "Послуга", servicePlaceholder: "Оберіть",
      note2: "Примітка", notePlaceholder: "Напр. зручніше вранці, трохи хвилююсь",
      submit: "Записатися на огляд",
      idle: "Без спаму. Телефон потрібен лише для запису.",
      fix1: "Виправ одне поле.", fix2: "Виправ два поля.",
      sending: "Надсилаємо…",
      ok: "Готово! Передзвонимо протягом 2 годин.",
      err: "Щось пішло не так. Спробуй ще раз або напиши нам у TikTok.",
    },
    footer: { legal: "вул. Михайла Грушевського, центр Дніпра", credits: "Photographs via Wikimedia Commons" },
  },
  en: {
    nav: { services: "Services", results: "Results", prices: "Prices", reviews: "Reviews", contacts: "Contacts", book: "Book now", bookFull: "Book a check-up", langLabel: "Site language" },
    pages: { h: "Services in detail", note: "Every service has its own page: the steps, the prices, answers to common questions.", more: "Read more", askTag: "Consultation", askH: "Can’t find your service?", askP: "The doctor examines your teeth and picks the treatment at a free consultation.", askMore: "Book now" },
    visit: { h: "How to find us", note: "We are in central Dnipro, close to the metro and parking.", route: "Get directions", call: "Call us", hoursTitle: "Hours", follow: "Follow us", mapTitle: "The clinic on the map", mapShow: "Show the map", mapNote: "The map loads from Google Maps after you click." },
    announceClose: "Close the announcement",
    svcMore: "Read more",
    hero: {
      chipHours: "Mon–Fri till 20:00, Sat till 18:00",
      chipAddr: "Hrushevskoho St",
      h1pre: "A dental clinic in central",
      h1em: "Dnipro",
      lead: "Veneers, crowns, implants and treatment with no lectures. The first consultation is free.",
      ctaPrices: "Prices",
    },
    acts: [
      { tag: "Exam and diagnostics", h: ["First we ", "see", " everything"], p: "The doctor examines your teeth, takes a digital scan if needed and names the exact price before treatment starts.", price: "" },
      { tag: "Veneers", h: ["A new shape and ", "shade", ""], p: "Composite or ceramic E-max. We have fitted eight veneers in two weeks.", price: "" },
      { tag: "Crowns and implants", h: ["The tooth you ", "get back", ""], p: "Metal-ceramic or zirconia crowns, an implant in place of a lost root.", price: "" },
      { tag: "The result", h: ["A smile you ", "want", " to share"], p: "2,400+ smiles and 4.9 on Google. No lectures, no judgement.", price: "" },
    ],
    services: { h: "Services", note: "Prices are “from”. The exact cost is confirmed at the free consultation." },
    cases: { h: "Before and after", note: "Real cases of the clinic’s patients. Pick one and drag the slider.", before: "Before", after: "After" },
    facts: [
      { b: "2400+", count: 2400, suffix: "+", label: "smiles over the years" },
      { b: "98%", count: 98, suffix: "%", label: "of patients come back" },
      { b: "4.9", label: "Google rating" },
      { b: "14", count: 14, label: "years of the founder’s practice" },
    ],
    prices: { h: "Full price list", note: "Open a category. Prices from the clinic’s list, in hryvnias." },
    reviews: { h: "Reviews", badge: "on Google", starsLabel: "5 out of 5", patient: "patient" },
    team: { tag: "Our doctors" },
    booking: {
      h: "Book a check-up",
      note: "Leave your name and phone. We call back within 2 hours. The first consultation is free.",
      addr: ["16 Mykhaila Hrushevskoho St,", "central Dnipro"],
      hours: [["Mon–Fri", "9:00–20:00"], ["Sat", "10:00–18:00"], ["Sun", "closed"]],
      name: "Name", nameErr: "Tell us what to call you.",
      phone: "Phone", phoneErr: "Write the number as +380XXXXXXXXX.",
      service: "Service", servicePlaceholder: "Choose",
      note2: "Note", notePlaceholder: "E.g. mornings are better, a little nervous",
      submit: "Book a check-up",
      idle: "No spam. The phone is only for booking.",
      fix1: "Fix one field.", fix2: "Fix two fields.",
      sending: "Sending…",
      ok: "Done! We will call back within 2 hours.",
      err: "Something went wrong. Try again or message us on TikTok.",
    },
    footer: { legal: "Mykhaila Hrushevskoho St, central Dnipro", credits: "Photographs via Wikimedia Commons" },
  },
} as const;

// the clinic on the map (the same point as the old site's map) and its accounts
export const clinicLinks = {
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10583.881065077816!2d35.03985051583366!3d48.45710003338652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dbe3206666c9dd%3A0x316566a1e70291e4!2sMykhaila%20Hrushevskoho%20St%2C%2029%2C%20Dnipro%2C%20Dnipropetrovs'ka%20oblast%2C%2049000!5e0!3m2!1sen!2sua!4v1780852088302!5m2!1sen!2sua",
  mapLink: "https://maps.app.goo.gl/7qWRBubjgCrJuS2T9",
  tiktok: "https://www.tiktok.com/@mad__dentist",
  instagram: "https://www.instagram.com/mad__dentist/",
  handle: "@mad__dentist",
};

export const icons = {
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03a10.6 10.6 0 0 1-5.82-1.9c-.01 2.92.01 5.84-.02 8.75a7.6 7.6 0 0 1-1.35 3.94 7.4 7.4 0 0 1-5.91 3.21 7.3 7.3 0 0 1-4.08-1.03 7.5 7.5 0 0 1-3.65-5.71c-.02-.5-.03-1-.01-1.49a7.6 7.6 0 0 1 2.58-4.96 7.3 7.3 0 0 1 6.15-1.72c.02 1.48-.04 2.96-.04 4.44a3.4 3.4 0 0 0-3.02.37 3.5 3.5 0 0 0-1.36 1.75c-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87a3.4 3.4 0 0 0 2.77-1.61c.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
};
