import { createClient } from "@supabase/supabase-js";
import type { Database } from "@care-connect/db";
import { readEnv } from "../env";

export type BrowserEnv = {
  url: string;
  anonKey: string;
};

export function createBrowserClient(env?: Partial<BrowserEnv>) {
  const url = env?.url ?? readEnv("NEXT_PUBLIC_SUPABASE_URL") ?? "";
  const anonKey = env?.anonKey ?? readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") ?? "";

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient<Database>(url, anonKey);
}
