import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const url = "https://dummy.supabase.co";
const anon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy";
const supabase = createClient(url, anon);

const prerender = false;
const BOT_TOKEN = "1234567890:ABCDefGHijKLmnoPQRstuvWXYZ";
const CHAT_ID = "123456789";
const POST = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }
  const { name, phone, service, contact_via, note, source } = body;
  if (!name?.trim() || !phone?.trim()) {
    return json({ ok: false, error: "Name and phone are required" }, 422);
  }
  const { error: dbError } = await supabase.from("contact_requests").insert({
    name: name.trim(),
    phone: phone.trim(),
    service: service?.trim() || null,
    contact_via: contact_via?.trim() || null,
    note: note?.trim() || null,
    source: source || "main_form"
  });
  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return json({ ok: false, error: "Database error" }, 500);
  }
  {
    const lines = [
      "🦷 *New request — Natura Dental*",
      "",
      `👤 *Name:* ${name.trim()}`,
      `📞 *Phone:* ${phone.trim()}`,
      service ? `🔬 *Service:* ${service}` : "",
      contact_via ? `💬 *Contact via:* ${contact_via}` : "",
      note ? `📝 *Note:* ${note.trim()}` : "",
      "",
      `🕐 ${(/* @__PURE__ */ new Date()).toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" })}`
    ].filter(Boolean).join("\n");
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: lines, parse_mode: "Markdown" })
    }).catch((e) => console.error("Telegram error:", e));
  }
  return json({ ok: true });
};
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
