import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-16">
        <p className="text-sm uppercase tracking-[0.2em] text-brand">Phase 0 • Step 1</p>
        <h1 className="text-4xl font-semibold">Care Connect Monorepo</h1>
        <p className="text-lg text-slate-600">
          Turborepo + pnpm workspace with Next.js App Router and React Native CLI.
        </p>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Next steps</p>
          <ul className="mt-3 list-disc pl-5 text-slate-700">
            <li>Install dependencies with pnpm</li>
            <li>Generate the React Native CLI project structure</li>
            <li>Wire shared UI + domain packages</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand/90 active:bg-brand"
              href="/login"
            >
              Sign in
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-brand px-5 py-2 text-sm font-semibold text-brand transition hover:bg-brand/10"
              href="/app"
            >
              Go to app
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
