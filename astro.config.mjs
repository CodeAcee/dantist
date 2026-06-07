import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Deployed to GitHub Pages project page: https://codeacee.github.io/dantist/
// To move to the chirkovadentist.com custom domain: set base "/", set
// site "https://chirkovadentist.com", re-add public/CNAME, update robots/sitemap.
export default defineConfig({
  site: "https://codeacee.github.io",
  base: "/dantist",
  integrations: [react()],
});
