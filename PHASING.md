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

**Remaining**
1. Install dependencies from the repo root:
   - `pnpm install`
2. Initialize the native platforms (React Native CLI):
   - `cd apps/mobile`
   - `npx react-native init CareConnect --directory . --template react-native-template-typescript`
   - Re-apply `metro.config.js`, `babel.config.js`, `index.js`, `src/App.tsx` if the init overwrites them.
3. Start the web app:
   - `pnpm --filter @care-connect/web dev`

**Notes**
- `apps/mobile` is intentionally minimal until the CLI init generates `ios/` and `android/`.
- Shared Tailwind config lives in `packages/config` and is referenced from `apps/web`.
