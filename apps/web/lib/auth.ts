import { createBrowserClient } from "@care-connect/supabase";
import { createSupabaseAdapter } from "@care-connect/auth/adapters";

const SESSION_ENDPOINT = "/api/auth/session";

export async function syncAccessTokenCookie(): Promise<void> {
  const adapter = createSupabaseAdapter(createBrowserClient());
  const session = await adapter.getSession();

  if (!session?.accessToken) {
    await clearAccessTokenCookie();
    return;
  }

  await fetch(SESSION_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      accessToken: session.accessToken,
      expiresAt: session.expiresAt ?? null
    })
  });
}

export async function clearAccessTokenCookie(): Promise<void> {
  await fetch(SESSION_ENDPOINT, { method: "DELETE" });
}
