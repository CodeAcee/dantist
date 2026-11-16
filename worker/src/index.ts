export interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  // Workers rate-limiting binding (wrangler.toml); absent in local dev
  LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
}

const ALLOWED_ORIGINS = new Set([
  "https://codeacee.github.io",
  "https://chirkovadentist.com",
  "http://localhost:4321",
]);

function corsHeaders(origin: string | null): HeadersInit {
  const allow = origin && ALLOWED_ORIGINS.has(origin) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

interface ContactPayload {
  name?: string;
  phone?: string;
  service?: string;
  contact_via?: string;
  note?: string;
  website?: string; // honeypot: humans never see this field
}

// Telegram Markdown v1: these four characters open formatting entities; escaped, user text
// stays literal and cannot inject links or break the message
const esc = (s: string) => s.replace(/([_*`[])/g, "\\$1");
const clip = (s: string | undefined, max: number) => (s ?? "").trim().slice(0, max);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin);
    const json = (status: number, body: unknown) =>
      new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }
    if (request.method !== "POST") {
      return json(405, { ok: false, error: "Method not allowed" });
    }
    if (Number(request.headers.get("Content-Length") ?? 0) > 4096) {
      return json(413, { ok: false, error: "Payload too large" });
    }

    // a few submissions a minute per IP is plenty for a booking form
    if (env.LIMITER) {
      const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
      const { success } = await env.LIMITER.limit({ key: ip });
      if (!success) return json(429, { ok: false, error: "Too many requests" });
    }

    let body: ContactPayload;
    try {
      body = await request.json();
    } catch {
      return json(400, { ok: false, error: "Invalid JSON" });
    }

    // a filled honeypot is a bot: pretend success, send nothing
    if (body.website) return json(200, { ok: true });

    const name = clip(body.name, 80);
    const phone = clip(body.phone, 32);
    if (!name || !phone) {
      return json(400, { ok: false, error: "name and phone are required" });
    }
    const service = clip(body.service, 120);
    const via = clip(body.contact_via, 40);
    const note = clip(body.note, 600);

    const kyivTime = new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" });

    const lines = [
      "🦷 *Нова заявка — Chirkova Dentist*",
      "",
      `👤 *Ім'я:* ${esc(name)}`,
      `📞 *Телефон:* ${esc(phone)}`,
      service ? `🔬 *Послуга:* ${esc(service)}` : "",
      via ? `💬 *Зв'язок через:* ${esc(via)}` : "",
      note ? `📝 *Коментар:* ${esc(note)}` : "",
      "",
      `🕐 ${kyivTime}`,
    ]
      .filter(Boolean)
      .join("\n");

    const tgRes = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: lines,
          parse_mode: "Markdown",
        }),
      },
    );

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      console.error("Telegram send failed:", errText);
      return json(502, { ok: false, error: "Telegram delivery failed" });
    }

    return json(200, { ok: true });
  },
};
