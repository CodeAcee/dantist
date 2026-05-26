import { createClient } from '@supabase/supabase-js';

const url  = (import.meta as any).env.PUBLIC_SUPABASE_URL  as string | undefined;
const anon = (import.meta as any).env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

// Returns null during build or when env vars are missing — components fall back to translation data.
export const supabase = (url && anon && !url.includes('dummy'))
  ? createClient(url, anon)
  : null;
