import { createClient } from "@supabase/supabase-js";
import type { Database } from "@care-connect/db";
import { readEnv } from "../env";

export type AdminEnv = {
  url: string;
  serviceRoleKey: string;
};

export function createAdminClient(env?: Partial<AdminEnv>) {
  const url = env?.url ?? readEnv("SUPABASE_URL") ?? "";
  const serviceRoleKey = env?.serviceRoleKey ?? readEnv("SUPABASE_SERVICE_ROLE_KEY") ?? "";

  if (!url || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false }
  });
}
