import { createImageUrlBuilder } from "@sanity/image-url";
import { sanity } from "../db/sanity";
import type { Lang } from "../components/zoomer/strings";

export interface ServiceRow {
  num: string;
  name: string;
  desc: string;
  price: string;
  items: { name: string; price: string }[];
  page?: string;
}
export interface CaseRow {
  treatment: string;
  duration: string;
  before: string;
  after: string;
  beforeImg?: string;
  afterImg?: string;
}
export interface TeamRow {
  name: string;
  title: string;
  years: number;
  yearsLabel: string;
  bio: string;
  img?: string;
}
export interface ReviewRow {
  initials: string;
  name: string;
  age: string;
  text: string;
}
export interface ClinicMediaRow {
  type: "image" | "video";
  imageUrl?: string;
  videoUrl?: string;
  caption?: string;
}

export interface SiteContent {
  services: ServiceRow[];
  cases: CaseRow[];
  team: TeamRow[];
  reviews: ReviewRow[];
  clinicMedia: ClinicMediaRow[];
}

const EMPTY: SiteContent = {
  services: [],
  cases: [],
  team: [],
  reviews: [],
  clinicMedia: [],
};

const builder = sanity ? createImageUrlBuilder(sanity) : null;
function imgUrl(source: unknown): string | undefined {
  if (!builder || !source) return undefined;
  return builder.image(source as never).url();
}

const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  nameUk, nameEn, descUk, descEn, startingPriceUk, startingPriceEn,
  priceItems[]{ nameUk, nameEn, priceUk, priceEn },
  "page": *[_type == "servicePage" && priceCategory._ref == ^._id][0].slug.current
}`;

const CASES_QUERY = `*[_type == "caseStudy"] | order(order asc, _createdAt asc) {
  treatmentUk, treatmentEn, durationUk, durationEn,
  beforeDescUk, beforeDescEn, afterDescUk, afterDescEn,
  beforeImage, afterImage
}`;

const TEAM_QUERY = `*[_type == "teamMember"] | order(order asc) {
  name, titleUk, titleEn, bioUk, bioEn, years, yearsLabelUk, yearsLabelEn, photo
}`;

const REVIEWS_QUERY = `*[_type == "review"] | order(order asc) {
  name, initials, since, textUk, textEn
}`;

const CLINIC_QUERY = `*[_type == "clinicMedia"] | order(order asc) {
  mediaType, image, "videoUrl": video.asset->url, captionUk, captionEn
}`;

export async function getContent(lang: Lang): Promise<SiteContent> {
  if (!sanity) return EMPTY;
  const en = lang === "en";
  try {
    const [services, cases, team, reviews, clinicMedia] = await Promise.all([
      sanity.fetch(SERVICES_QUERY),
      sanity.fetch(CASES_QUERY),
      sanity.fetch(TEAM_QUERY),
      sanity.fetch(REVIEWS_QUERY),
      sanity.fetch(CLINIC_QUERY),
    ]);

    return {
      services: (services ?? []).map((s: any, i: number) => ({
        num: String(i + 1).padStart(2, "0"),
        name: en ? s.nameEn : s.nameUk,
        desc: en ? s.descEn : s.descUk,
        price: en ? s.startingPriceEn : s.startingPriceUk,
        page: s.page ?? undefined,
        items: (s.priceItems ?? []).map((it: any) => ({
          name: en ? it.nameEn : it.nameUk,
          price: en ? it.priceEn : it.priceUk,
        })),
      })),
      cases: (cases ?? []).map((c: any) => ({
        treatment: en ? c.treatmentEn : c.treatmentUk,
        duration: en ? c.durationEn : c.durationUk,
        before: en ? c.beforeDescEn : c.beforeDescUk,
        after: en ? c.afterDescEn : c.afterDescUk,
        beforeImg: imgUrl(c.beforeImage),
        afterImg: imgUrl(c.afterImage),
      })),
      team: (team ?? []).map((m: any) => ({
        name: m.name,
        title: en ? m.titleEn : m.titleUk,
        years: m.years,
        yearsLabel: en ? m.yearsLabelEn : m.yearsLabelUk,
        bio: en ? m.bioEn : m.bioUk,
        img: imgUrl(m.photo),
      })),
      reviews: (reviews ?? []).map((r: any) => ({
        initials: r.initials,
        name: r.name,
        age: r.since != null ? `${en ? "since" : "з"} ${r.since}` : "",
        text: en ? r.textEn : r.textUk,
      })),
      clinicMedia: (clinicMedia ?? []).map((m: any) => ({
        type: m.mediaType,
        imageUrl: imgUrl(m.image),
        videoUrl: m.videoUrl,
        caption: en ? m.captionEn : m.captionUk,
      })),
    };
  } catch {
    return EMPTY;
  }
}

/* ---------- service pages (/viniry, /implantaciya, ...) ---------- */
import type { Service, ServiceContent } from "../i18n/services";

const SERVICE_PAGES_QUERY = `*[_type == "servicePage" && defined(slug.current)] | order(order asc) {
  "slug": slug.current, order,
  nameUk, nameEn, eyebrowUk, eyebrowEn, metaTitleUk, metaTitleEn, metaDescriptionUk, metaDescriptionEn,
  keywordsUk, keywordsEn, h1Uk, h1En, introUk, introEn,
  benefitsTitleUk, benefitsTitleEn, benefits[]{ titleUk, titleEn, textUk, textEn },
  processTitleUk, processTitleEn, process[]{ titleUk, titleEn, textUk, textEn },
  priceTitleUk, priceTitleEn,
  "catItems": priceCategory->priceItems[]{ nameUk, nameEn, priceUk, priceEn },
  prices[]{ nameUk, nameEn, priceUk, priceEn },
  faqTitleUk, faqTitleEn, faq[]{ qUk, qEn, aUk, aEn },
  ctaTitleUk, ctaTitleEn, ctaTextUk, ctaTextEn
}`;

let pagesCache: Promise<Service[]> | null = null;

// The service pages exist only in Sanity. A failed fetch at build time fails the build: shipping a site
// without its service pages (and their URLs) would be worse than not shipping.
export function getServicePages(): Promise<Service[]> {
  if (!sanity) return Promise.reject(new Error("Sanity is not configured (PUBLIC_SANITY_PROJECT_ID / PUBLIC_SANITY_DATASET)"));
  pagesCache ??= sanity.fetch(SERVICE_PAGES_QUERY).then((rows: any[]) =>
    (rows ?? []).map((p: any) => {
      const pick = (l: "Uk" | "En"): ServiceContent => ({
        metaTitle: p[`metaTitle${l}`], metaDescription: p[`metaDescription${l}`], keywords: p[`keywords${l}`] ?? "",
        eyebrow: p[`eyebrow${l}`], name: p[`name${l}`], h1: p[`h1${l}`], intro: p[`intro${l}`],
        benefitsTitle: p[`benefitsTitle${l}`], benefits: (p.benefits ?? []).map((b: any) => ({ title: b[`title${l}`], text: b[`text${l}`] })),
        processTitle: p[`processTitle${l}`], process: (p.process ?? []).map((b: any) => ({ title: b[`title${l}`], text: b[`text${l}`] })),
        priceTitle: p[`priceTitle${l}`],
        prices: (p.catItems ?? p.prices ?? []).map((it: any) => ({ name: it[`name${l}`], price: it[`price${l}`] })),
        faqTitle: p[`faqTitle${l}`], faq: (p.faq ?? []).map((f: any) => ({ q: f[`q${l}`], a: f[`a${l}`] })),
        ctaTitle: p[`ctaTitle${l}`], ctaText: p[`ctaText${l}`],
      });
      return { slug: p.slug, accent: "", uk: pick("Uk"), en: pick("En") };
    }),
  );
  return pagesCache;
}
