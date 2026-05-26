import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  base: "/dantist/",
  site: "https://CodeAcee.github.io/dantist",
  integrations: [react()],
  output: "static",
});
