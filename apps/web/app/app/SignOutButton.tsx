"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@care-connect/supabase";
import { clearAccessTokenCookie } from "../../lib/auth";

export default function SignOutButton() {
  const router = useRouter();
  const supabase = useMemo(() => createBrowserClient(), []);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    await clearAccessTokenCookie();
    router.push("/");
  };

  return (
    <button
      className="inline-flex items-center justify-center rounded-full border border-brand px-5 py-2 text-sm font-semibold text-brand transition hover:bg-brand/10 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400"
      disabled={isSigningOut}
      onClick={handleSignOut}
      type="button"
    >
      {isSigningOut ? "Signing out..." : "Sign out"}
    </button>
  );
}
