import { createClient } from "@supabase/supabase-js";
import type { Database } from "@care-connect/db";
import { readEnv } from "../env";

export type ServerEnv = {
  url: string;
  anonKey: string;
};

export function createServerClient(env?: Partial<ServerEnv>) {
  const url = env?.url ?? readEnv("SUPABASE_URL") ?? "";
  const anonKey = env?.anonKey ?? readEnv("SUPABASE_ANON_KEY") ?? "";

  if (!url || !anonKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
  }

  return createClient<Database>(url, anonKey);
}

export type ServerAuthOptions = {
  accessToken: string;
};

export function createServerClientWithAccessToken(
  options: ServerAuthOptions,
  env?: Partial<ServerEnv>
) {
  const url = env?.url ?? readEnv("SUPABASE_URL") ?? "";
  const anonKey = env?.anonKey ?? readEnv("SUPABASE_ANON_KEY") ?? "";

  if (!url || !anonKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
  }

  return createClient<Database>(url, anonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${options.accessToken}`
      }
    }
  });
}
