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

// The service pages themselves (texts, steps, FAQ, prices) live in Sanity: see servicePage in studio/
// and getServicePages() in lib/content.ts.
