export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

const BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID   = import.meta.env.TELEGRAM_CHAT_ID;

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  const { name, phone, service, contact_via, note, source } = body;

  if (!name?.trim() || !phone?.trim()) {
    return json({ ok: false, error: 'Name and phone are required' }, 422);
  }

  // 1. Save to Supabase
  const { error: dbError } = await supabase.from('contact_requests').insert({
    name: name.trim(),
    phone: phone.trim(),
    service: service?.trim() || null,
    contact_via: contact_via?.trim() || null,
    note: note?.trim() || null,
    source: source || 'main_form',
  });

  if (dbError) {
    console.error('Supabase insert error:', dbError);
    return json({ ok: false, error: 'Database error' }, 500);
  }

  // 2. Send Telegram notification
  if (BOT_TOKEN && CHAT_ID) {
    const lines = [
      '🦷 *New request — Natura Dental*',
      '',
      `👤 *Name:* ${name.trim()}`,
      `📞 *Phone:* ${phone.trim()}`,
      service     ? `🔬 *Service:* ${service}`       : '',
      contact_via ? `💬 *Contact via:* ${contact_via}` : '',
      note        ? `📝 *Note:* ${note.trim()}`        : '',
      '',
      `🕐 ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })}`,
    ].filter(Boolean).join('\n');

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: lines, parse_mode: 'Markdown' }),
    }).catch(e => console.error('Telegram error:', e));
  }

  return json({ ok: true });
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
