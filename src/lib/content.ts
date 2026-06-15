import { supabase } from "../db/supabase";
import type { Lang } from "../components/zoomer/strings";

export interface ServiceRow {
  num: string;
  name: string;
  desc: string;
  price: string;
}
export interface PriceCategoryRow {
  cat: string;
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

export interface SiteContent {
  services: ServiceRow[];
  priceCategories: PriceCategoryRow[];
  cases: CaseRow[];
  team: TeamRow[];
  reviews: ReviewRow[];
}

const EMPTY: SiteContent = {
  services: [],
  priceCategories: [],
  cases: [],
  team: [],
  reviews: [],
};

// Fetched once per locale at build time and baked into the static HTML.
export async function getContent(lang: Lang): Promise<SiteContent> {
  if (!supabase) return EMPTY;
  try {
    const [services, prices, cases, team, reviews] = await Promise.all([
      supabase
        .from("services")
        .select("name, description, starting_price, sort_order")
        .eq("locale", lang)
        .eq("active", true)
        .order("sort_order"),
      supabase
        .from("price_categories")
        .select("name, sort_order, price_items(name, price, sort_order)")
        .eq("locale", lang)
        .eq("active", true)
        .order("sort_order"),
      supabase
        .from("cases")
        .select("before_label, after_label, treatment, duration, before_img, after_img, sort_order")
        .eq("locale", lang)
        .eq("active", true)
        .order("sort_order"),
      supabase
        .from("team")
        .select("name, title, bio, years, years_label, img, sort_order")
        .eq("locale", lang)
        .eq("active", true)
        .order("sort_order"),
      supabase
        .from("reviews")
        .select("quote, name, since, initials, sort_order")
        .eq("locale", lang)
        .eq("active", true)
        .order("sort_order"),
    ]);

    return {
      services: (services.data ?? []).map((s: any, i: number) => ({
        num: String(i + 1).padStart(2, "0"),
        name: s.name,
        desc: s.description,
        price: s.starting_price,
      })),
      priceCategories: (prices.data ?? []).map((c: any) => ({
        cat: String(c.name).toUpperCase(),
        items: (c.price_items ?? [])
          .sort((a: any, b: any) => a.sort_order - b.sort_order)
          .map((it: any) => ({ name: it.name, price: it.price })),
      })),
      cases: (cases.data ?? []).map((c: any) => ({
        treatment: c.treatment,
        duration: c.duration,
        before: c.before_label,
        after: c.after_label,
        beforeImg: c.before_img ?? undefined,
        afterImg: c.after_img ?? undefined,
      })),
      team: (team.data ?? []).map((m: any) => ({
        name: m.name,
        title: m.title,
        years: m.years,
        yearsLabel: m.years_label,
        bio: m.bio,
        img: m.img ?? undefined,
      })),
      reviews: (reviews.data ?? []).map((r: any) => ({
        initials: r.initials,
        name: r.name,
        age:
          r.since != null
            ? `${lang === "en" ? "since" : "з"} ${r.since}`
            : "",
        text: r.quote,
      })),
    };
  } catch {
    return EMPTY;
  }
}
