// Supabase Edge Function — bridges a Database Webhook to a GitHub Actions rebuild.
//
// Why a bridge: GitHub's repository_dispatch API needs a body of
// { "event_type": "..." }, but a raw Supabase webhook sends its own row payload.
// This function ignores the incoming payload and sends the correct request.
//
// Setup:
//   supabase secrets set GITHUB_TOKEN=<fine-grained PAT with "Contents: write">
//   (optional) supabase secrets set GITHUB_OWNER=codeacee GITHUB_REPO=dantist
//   supabase functions deploy trigger-rebuild --no-verify-jwt
// Then add a Database Webhook (Database → Webhooks) on the content tables
// (services, price_categories, price_items, cases, team, reviews) for
// INSERT / UPDATE / DELETE → target this function.

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const GH_TOKEN = Deno.env.get("GITHUB_TOKEN")!;
const GH_OWNER = Deno.env.get("GITHUB_OWNER") ?? "codeacee";
const GH_REPO = Deno.env.get("GITHUB_REPO") ?? "dantist";

serve(async () => {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/dispatches`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${GH_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
          "User-Agent": "chirkova-dentist-rebuild",
        },
        body: JSON.stringify({ event_type: "supabase-content-update" }),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("GitHub dispatch failed:", res.status, text);
      return new Response(JSON.stringify({ ok: false, status: res.status }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("trigger-rebuild error:", err);
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
