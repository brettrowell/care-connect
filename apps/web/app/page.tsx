import { Button } from "@care-connect/ui";

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
          <div className="mt-4">
            <Button>Launch checklist</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
