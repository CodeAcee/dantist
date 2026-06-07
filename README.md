# Chirkova Dentist

Marketing site for Chirkova Dentist Studio (Dnipro), built with [Astro](https://astro.build) + React. The site is a single-page app (`src/components/ZoomerMode.tsx`) with a Supabase backend for the contact form and dynamic content (services, prices, cases, team, reviews).

Production domain: **https://chirkovadentist.com**

## Local development

```bash
npm install
cp .env.example .env   # then fill in your Supabase keys
npm run dev            # http://localhost:4321
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

- `PUBLIC_SUPABASE_URL` / `PUBLIC_SUPABASE_ANON_KEY` — used by the browser to read content and submit the contact form. Safe to expose.
- `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` — **server-side only**, used by the Supabase edge function (`supabase/functions/notify-telegram`). Set these with `supabase secrets set`, never in the deployed front-end.

`.env` is git-ignored — never commit real keys.

## Build & deploy

```bash
npm run build     # outputs the static site to ./dist
npm run preview   # preview the production build locally
```

Deployment runs automatically via `.github/workflows/deploy.yml` on every push to `master` (GitHub Pages). The custom domain is configured through `public/CNAME` (`chirkovadentist.com`); set the same domain in the repository's Pages settings. The `PUBLIC_SUPABASE_*` values are injected from repository secrets at build time.

## Backend

- `supabase/schema.sql`, `supabase/services.sql`, `supabase/prices.sql` — database schema and seed data.
- `supabase/functions/notify-telegram` — edge function that forwards new contact requests to Telegram (triggered by a Database Webhook on `contact_requests`).
