import { cookies } from "next/headers";
import { getCurrentUserFromRequest } from "@care-connect/auth/server";
import SignOutButton from "./SignOutButton";

export default async function AppPage() {
  const cookieStore = await cookies();
  const user = await getCurrentUserFromRequest({ cookies: cookieStore });

  return (
    <main className="min-h-screen bg-paper text-ink">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
        <p className="text-sm uppercase tracking-[0.2em] text-brand">Protected</p>
        <h1 className="text-3xl font-semibold">Care Connect App</h1>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Signed in as</p>
          <p className="mt-2 text-lg text-ink">{user?.email ?? user?.id ?? "Unknown user"}</p>
          <div className="mt-6">
            <SignOutButton />
          </div>
        </div>
      </section>
    </main>
  );
}
