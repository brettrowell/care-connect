# Phasing

## Phase 0 — Foundation

### Step 1 — Monorepo Setup (In Progress)

**Goal:** Establish the Turborepo + pnpm workspace, app shells, shared packages, and mobile Metro config for monorepo resolution.

**Completed**
- Turborepo config and pnpm workspace wiring.
- `apps/web` Next.js App Router scaffold.
- `apps/mobile` React Native CLI scaffold (no Expo).
- `packages/{db,domain,ui,auth,supabase,config}` package structure.
- Shared Tailwind/NativeWind config package.
- Metro config updated to resolve workspace packages.
- Cross-platform UI package wired with web + native entries.
- Domain model + Zod schemas scaffolded.
- Supabase client factories scaffolded.
- Dependencies installed (`pnpm`).
- React Native CLI init run (ios/ + android/ generated).

**Remaining**
1. Start the web app:
   - `pnpm --filter @care-connect/web dev`

**Notes**
- `apps/mobile` now includes generated `ios/` and `android/` folders.
- Shared Tailwind config lives in `packages/config` and is referenced from `apps/web`.
