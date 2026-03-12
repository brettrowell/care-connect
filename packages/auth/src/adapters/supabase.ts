import type { SupabaseClient, User, Session } from "@supabase/supabase-js";
import type { AuthAdapter, AuthSession, AuthUser } from "../types";

function toAuthUser(user: User | null | undefined): AuthUser | null {
  if (!user) return null;
  return { id: user.id, email: user.email };
}

function toAuthSession(session: Session | null | undefined): AuthSession | null {
  if (!session) return null;
  const user = toAuthUser(session.user);
  if (!user) return null;
  return {
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresAt: session.expires_at ?? null,
    user
  };
}

export function createSupabaseAdapter(client: SupabaseClient): AuthAdapter {
  return {
    async getCurrentUser(options) {
      const accessToken = options?.accessToken;
      const { data, error } = accessToken
        ? await client.auth.getUser(accessToken)
        : await client.auth.getUser();

      if (error) return null;
      return toAuthUser(data.user);
    },
    async getSession() {
      const { data, error } = await client.auth.getSession();
      if (error) return null;
      return toAuthSession(data.session);
    },
    onAuthStateChange(callback) {
      const { data } = client.auth.onAuthStateChange((event, session) => {
        callback(event, toAuthSession(session));
      });

      return {
        unsubscribe: () => data.subscription.unsubscribe()
      };
    },
    async signOut() {
      await client.auth.signOut();
    }
  };
}
