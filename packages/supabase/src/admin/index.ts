import { createClient } from "@supabase/supabase-js";

export type AdminEnv = {
  url: string;
  serviceRoleKey: string;
};

export function createAdminClient(env?: Partial<AdminEnv>) {
  const url = env?.url ?? process.env.SUPABASE_URL ?? "";
  const serviceRoleKey = env?.serviceRoleKey ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  if (!url || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false }
  });
}
