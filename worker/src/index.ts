export interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
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
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
        status: 405,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    let body: ContactPayload;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const name = body.name?.trim();
    const phone = body.phone?.trim();
    if (!name || !phone) {
      return new Response(JSON.stringify({ ok: false, error: "name and phone are required" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const kyivTime = new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" });

    const lines = [
      "🦷 *Нова заявка — Chirkova Dentist*",
      "",
      `👤 *Ім'я:* ${name}`,
      `📞 *Телефон:* ${phone}`,
      body.service ? `🔬 *Послуга:* ${body.service}` : "",
      body.contact_via ? `💬 *Зв'язок через:* ${body.contact_via}` : "",
      body.note ? `📝 *Коментар:* ${body.note.trim()}` : "",
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
      return new Response(JSON.stringify({ ok: false, error: "Telegram delivery failed" }), {
        status: 502,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  },
};
