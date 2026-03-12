"use client";

import { useEffect, useMemo } from "react";
import { createBrowserClient } from "@care-connect/supabase";
import { clearAccessTokenCookie, syncAccessTokenCookie } from "../lib/auth";

export default function AuthSync() {
  const supabase = useMemo(() => createBrowserClient(), []);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      if (!mounted) return;
      await syncAccessTokenCookie();
    };

    run();

    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        clearAccessTokenCookie();
      } else {
        syncAccessTokenCookie();
      }
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, [supabase]);

  return null;
}
