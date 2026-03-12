"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@care-connect/supabase";
import { syncAccessTokenCookie } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => createBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      setStatus("error");
      setError(signInError.message);
      return;
    }

    await syncAccessTokenCookie();
    router.push("/app");
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      <section className="mx-auto flex max-w-md flex-col gap-6 px-6 py-16">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-brand">Web auth</p>
          <h1 className="mt-2 text-3xl font-semibold">Sign in</h1>
          <p className="mt-2 text-sm text-slate-600">
            Use your Supabase email + password credentials.
          </p>
        </div>
        <form className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm text-slate-600">
            Email
            <input
              className="rounded-xl border border-slate-200 px-4 py-2 text-base text-ink outline-none focus:border-brand"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-600">
            Password
            <input
              className="rounded-xl border border-slate-200 px-4 py-2 text-base text-ink outline-none focus:border-brand"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          <button
            className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand/90 active:bg-brand disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
