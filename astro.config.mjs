import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";

export default defineConfig({
  base: "/dantist/",
  site: "https://CodeAcee.github.io/dantist",
  integrations: [react()],
  output: "hybrid",
  adapter: node({ mode: "standalone" }),
});
