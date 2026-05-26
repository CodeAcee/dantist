# Natura Dental — GitHub Pages Deployment

This repository is an Astro site. The included GitHub Actions workflow builds the site and deploys the output from `./dist` to GitHub Pages when you push to the `main` branch.

Notes:

- If you are deploying to a project page (https://<username>.github.io/<repo>), set the `base` option in `astro.config.mjs` to `'/<repo>/'` so asset paths resolve correctly. Example:

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
export default defineConfig({
  base: "/REPO_NAME/",
  site: "https://naturasmile.ua",
  // ...
});
```

- The workflow expects the default branch to be `main`. If your default branch is named differently, update `.github/workflows/pages.yml`.
- To use the workflow you must enable GitHub Pages for the repository (GitHub will use the Pages deployment made by the action). No repository secrets are required.

If you want, tell me your GitHub repository name (or whether this is a user/org page) and I can set `base` in `astro.config.mjs` for you.
