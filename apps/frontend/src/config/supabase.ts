import { createClient } from "@supabase/supabase-js";
import type { Database } from "@care-connect/db";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@env";

const url = typeof SUPABASE_URL === "string" ? SUPABASE_URL : "";
const anonKey = typeof SUPABASE_ANON_KEY === "string" ? SUPABASE_ANON_KEY : "";
if (!url || !anonKey) {
  const msg =
    "Care Connect: Set SUPABASE_URL and SUPABASE_ANON_KEY in the root .env file (see SETUP.md).";
  if (typeof window !== "undefined") {
    console.error(msg);
  }
  throw new Error(msg);
}

export const supabase = createClient<Database>(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false
  }
});
