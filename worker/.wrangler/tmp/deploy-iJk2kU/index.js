var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.ts
var ALLOWED_ORIGINS = /* @__PURE__ */ new Set([
  "https://codeacee.github.io",
  "https://chirkovadentist.com",
  "http://localhost:4321"
]);
function corsHeaders(origin) {
  const allow = origin && ALLOWED_ORIGINS.has(origin) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}
__name(corsHeaders, "corsHeaders");
var index_default = {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin);
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
        status: 405,
        headers: { ...cors, "Content-Type": "application/json" }
      });
    }
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" }
      });
    }
    const name = body.name?.trim();
    const phone = body.phone?.trim();
    if (!name || !phone) {
      return new Response(JSON.stringify({ ok: false, error: "name and phone are required" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" }
      });
    }
    const kyivTime = (/* @__PURE__ */ new Date()).toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" });
    const lines = [
      "\u{1F9B7} *\u041D\u043E\u0432\u0430 \u0437\u0430\u044F\u0432\u043A\u0430 \u2014 Chirkova Dentist*",
      "",
      `\u{1F464} *\u0406\u043C'\u044F:* ${name}`,
      `\u{1F4DE} *\u0422\u0435\u043B\u0435\u0444\u043E\u043D:* ${phone}`,
      body.service ? `\u{1F52C} *\u041F\u043E\u0441\u043B\u0443\u0433\u0430:* ${body.service}` : "",
      body.contact_via ? `\u{1F4AC} *\u0417\u0432'\u044F\u0437\u043E\u043A \u0447\u0435\u0440\u0435\u0437:* ${body.contact_via}` : "",
      body.note ? `\u{1F4DD} *\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440:* ${body.note.trim()}` : "",
      "",
      `\u{1F550} ${kyivTime}`
    ].filter(Boolean).join("\n");
    const tgRes = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: lines,
          parse_mode: "Markdown"
        })
      }
    );
    if (!tgRes.ok) {
      const errText = await tgRes.text();
      console.error("Telegram send failed:", errText);
      return new Response(JSON.stringify({ ok: false, error: "Telegram delivery failed" }), {
        status: 502,
        headers: { ...cors, "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" }
    });
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
