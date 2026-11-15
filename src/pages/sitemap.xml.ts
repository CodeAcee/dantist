import type { APIRoute } from "astro";
import { getServicePages } from "../lib/content";

// home and every Sanity service page, UA and EN
export const GET: APIRoute = async ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
  const paths = ["", ...(await getServicePages()).map((s) => s.slug)].flatMap((p) => [p, "en/" + p]);
  const urls = paths.map((p) => `<url><loc>${new URL(base + p, site)}</loc></url>`).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, { headers: { "Content-Type": "application/xml" } });
};
