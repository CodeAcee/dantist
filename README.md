# Chirkova Dentist

Marketing site for Chirkova Dentist Studio (Dnipro): a static [Astro](https://astro.build) site whose content (services, prices, service pages, cases, doctors, reviews, announcements) comes from [Sanity](https://www.sanity.io) at build time.

Production domain: **https://chirkovadentist.com** · preview: https://codeacee.github.io/dantist/

## Local development

```bash
npm install
cp .env.example .env   # Sanity project id + the contact Worker URL
npm run dev            # http://localhost:4321
```

## Where things live

- `src/components/PearlSite.astro` — the home page (UA and EN), styles in `src/styles/pearl.css` and `pearl-site.css`, design copy in `src/i18n/pearl.ts`.
- `src/layouts/PearlPage.astro` + `src/components/PearlServiceArticle.astro` — the service pages (`/viniry`, `/en/viniry`, …).
- `src/lib/content.ts` — all Sanity queries.
- `public/pearl/` — the pearl shader, the 3D tooth (`tooth.bin`), phone stills, vendored three.js.
- `studio/` — Sanity Studio (`npx sanity deploy` from that folder). How to edit content: `HOW_TO_CMS.md`.
- `worker/` — Cloudflare Worker that forwards the booking form to Telegram.

## Build & deploy

`.github/workflows/deploy.yml` runs on every push to `master`, on manual dispatch, and on Sanity publish (a webhook sends `repository_dispatch` type `sanity-publish`):

- `build` — builds with base `/` and uploads `dist/` to Hostiq over FTP (secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`).
- `build-pages` / `deploy-pages` — builds with base `/dantist` and publishes to GitHub Pages.
