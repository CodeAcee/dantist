// Supabase Edge Function — triggered by a Database Webhook
// Setup: Supabase Dashboard → Database → Webhooks → Create webhook
//   Table: contact_requests | Event: INSERT
//   Method: POST | URL: https://<project>.supabase.co/functions/v1/notify-telegram
//
// Required secret: supabase secrets set TELEGRAM_BOT_TOKEN=xxx TELEGRAM_CHAT_ID=xxx

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')!;
const CHAT_ID   = Deno.env.get('TELEGRAM_CHAT_ID')!;

serve(async (req) => {
  try {
    const payload = await req.json();
    // Database webhooks send { type, table, record, old_record }
    const row = payload.record ?? payload;

    const { name, phone, service, contact_via, note, created_at } = row;

    const kyivTime = created_at
      ? new Date(created_at).toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })
      : new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' });

    const lines = [
      '🦷 *New request — Natura Dental*',
      '',
      `👤 *Name:* ${name}`,
      `📞 *Phone:* ${phone}`,
      service     ? `🔬 *Service:* ${service}`       : '',
      contact_via ? `💬 *Contact via:* ${contact_via}` : '',
      note        ? `📝 *Note:* ${note}`               : '',
      '',
      `🕐 ${kyivTime}`,
    ].filter(Boolean).join('\n');

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: lines, parse_mode: 'Markdown' }),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('notify-telegram error:', err);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
});
