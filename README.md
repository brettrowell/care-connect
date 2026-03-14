# Care Connect

Secure caregiver–provider health sharing app: groups, patients, quick care events (bowel, feeding, vomit, meds), and notes. Built as a Turborepo monorepo.

## Stack

- **Monorepo:** Turborepo + pnpm workspaces
- **App:** Expo React Native (mobile + web) with react-native-web
- **Backend:** Node.js + Express (TypeScript), optional
- **Styling:** NativeWind (Tailwind)
- **Validation:** Zod
- **Database:** Supabase (schema in `database/supabase/schema.sql`)

## Structure

- **`apps/frontend`** – Expo React Native app (web + mobile)
- **`apps/backend`** – Express API (TypeScript)
- **`database/`** – Supabase project, SQL, migrations
- **`packages/`**
  - **`db`** – Supabase-generated types
  - **`domain`** – Domain models + Zod schemas (per-entity)
  - **`ui`** – Shared UI primitives
  - **`auth`** – Auth adapter (Supabase now, Cognito-ready)
  - **`supabase`** – Typed Supabase client helpers
  - **`config`** – Shared config (Tailwind / NativeWind / TS)

One **`.env`** at the repo root holds `SUPABASE_URL` and `SUPABASE_ANON_KEY`; see [SETUP.md](./SETUP.md).

## Prereqs

- Node.js ≥ 20.18
- pnpm (e.g. via `corepack enable`)

## Commands

- `pnpm install` – install all dependencies
- `pnpm dev` – run all dev scripts (Turbo)
- `pnpm --filter careconnect-frontend web` – run Expo for web
- `pnpm --filter careconnect-frontend start` – run Expo (then `i` / `a` for simulators)
- `pnpm --filter @care-connect/backend dev` – run API
- `pnpm supabase:types` – regenerate Supabase types
