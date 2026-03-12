import { createBrowserClient } from "@care-connect/supabase";
import { createSupabaseAdapter } from "../adapters/supabase";
import type { AuthAdapter, AuthSession, AuthUser } from "../types";

export type ClientAuthOptions = {
  adapter?: AuthAdapter;
};

function resolveAdapter(options?: ClientAuthOptions): AuthAdapter {
  if (options?.adapter) return options.adapter;
  const client = createBrowserClient();
  return createSupabaseAdapter(client);
}

export async function getCurrentUser(options?: ClientAuthOptions): Promise<AuthUser | null> {
  const adapter = resolveAdapter(options);
  return adapter.getCurrentUser();
}

export async function getSession(options?: ClientAuthOptions): Promise<AuthSession | null> {
  const adapter = resolveAdapter(options);
  return adapter.getSession();
}

export function onAuthStateChange(
  callback: (event: string, session: AuthSession | null) => void,
  options?: ClientAuthOptions
) {
  const adapter = resolveAdapter(options);
  return adapter.onAuthStateChange?.(callback);
}

export async function signOut(options?: ClientAuthOptions) {
  const adapter = resolveAdapter(options);
  return adapter.signOut?.();
}
