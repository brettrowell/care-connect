# Care Connect

Secure caregiver-provider health sharing app built with a Turborepo monorepo.

## Stack
- Monorepo: Turborepo + pnpm workspaces
- Backend: Node.js + Express (TypeScript)
- Frontend: Expo React Native (mobile + web) with react-native-web
- Styling: NativeWind (Tailwind v4)
- Validation: Zod
- Database: Supabase (schema in `database/supabase/schema.sql`)

## Structure
- `frontend/` Expo React Native app (web + mobile)
- `backend/` Express API (TypeScript)
- `database/` Supabase project, SQL, and infra
- `shared/`
  - `packages/db` Supabase-generated types
  - `packages/domain` Domain models + Zod schemas (per-entity folders)
  - `packages/ui` Shared UI primitives
  - `packages/auth` Auth adapter layer
  - `packages/supabase` Typed Supabase client helpers
  - `packages/config` Shared configs (Tailwind/NativeWind/TS)

## Prereqs
- Node.js >= 22.11
- pnpm (via `corepack`)
- Expo SDK 50 (macOS 13.7.8 compatible)

## Common Commands
- `pnpm dev` runs all package dev scripts
- `pnpm --filter @care-connect/backend dev` start API
- `pnpm --filter careconnect-frontend start` start Expo
- `pnpm supabase:types` regenerate Supabase types
