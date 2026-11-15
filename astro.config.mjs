import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://chirkovadentist.com",
  base: "/",
  build: { inlineStylesheets: "always" },
});
