import { createClient } from "@supabase/supabase-js";

export type BrowserEnv = {
  url: string;
  anonKey: string;
};

export function createBrowserClient(env?: Partial<BrowserEnv>) {
  const url = env?.url ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anonKey = env?.anonKey ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(url, anonKey);
}
