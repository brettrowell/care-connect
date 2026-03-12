import { useEffect, useMemo, useState } from "react";
import {
  getCurrentUser,
  getSession,
  onAuthStateChange
} from "@care-connect/auth/client";
import { createSupabaseAdapter } from "@care-connect/auth/adapters";
import type { AuthSession, AuthUser } from "@care-connect/auth/types";
import { supabase } from "../config/supabase";

export type AuthState = {
  status: "loading" | "authenticated" | "unauthenticated";
  user: AuthUser | null;
  session: AuthSession | null;
};

export type GuardOptions = {
  publicRoutes: string[];
  fallbackRoute: string;
};

export function useAuthState(): AuthState {
  const adapter = useMemo(() => createSupabaseAdapter(supabase), []);
  const [state, setState] = useState<AuthState>({
    status: "loading",
    user: null,
    session: null
  });

  useEffect(() => {
    let mounted = true;

    const hydrate = async () => {
      const [user, session] = await Promise.all([
        getCurrentUser({ adapter }),
        getSession({ adapter })
      ]);

      if (!mounted) return;
      setState({
        status: user ? "authenticated" : "unauthenticated",
        user,
        session
      });
    };

    hydrate();

    const subscription = onAuthStateChange((_, nextSession) => {
      const nextUser = nextSession?.user ?? null;
      setState({
        status: nextUser ? "authenticated" : "unauthenticated",
        user: nextUser,
        session: nextSession
      });
    }, { adapter });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [adapter]);

  return state;
}

export function getGuardRedirect(
  routeName: string,
  auth: AuthState,
  options: GuardOptions
): string | null {
  if (auth.status === "loading") return null;
  if (options.publicRoutes.includes(routeName)) return null;
  if (auth.status === "authenticated") return null;
  return options.fallbackRoute;
}
