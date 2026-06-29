import { createImageUrlBuilder } from "@sanity/image-url";
import { sanity } from "../db/sanity";
import type { Lang } from "../components/zoomer/strings";

export interface ServiceRow {
  num: string;
  name: string;
  desc: string;
  price: string;
  items: { name: string; price: string }[];
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
  priceItems[]{ nameUk, nameEn, priceUk, priceEn }
}`;

const CASES_QUERY = `*[_type == "caseStudy"] | order(order asc) {
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
