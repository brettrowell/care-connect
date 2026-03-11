import { createClient } from "@supabase/supabase-js";

export type ServerEnv = {
  url: string;
  anonKey: string;
};

export function createServerClient(env?: Partial<ServerEnv>) {
  const url = env?.url ?? process.env.SUPABASE_URL ?? "";
  const anonKey = env?.anonKey ?? process.env.SUPABASE_ANON_KEY ?? "";

  if (!url || !anonKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
  }

  return createClient(url, anonKey);
}
