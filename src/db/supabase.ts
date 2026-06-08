import { createClient } from "@supabase/supabase-js";

// Used both at build time (Astro frontmatter — reads content) and in the
// browser (contact form insert). The publishable/anon key is safe to expose;
// row-level security restricts writes to inserts on contact_requests.
const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export const supabase = url && key ? createClient(url, key) : null;
