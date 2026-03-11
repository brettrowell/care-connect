# Care Connect — Agent Guide

## Repo structure
- `apps/web`: Next.js App Router (web shell + routing + web-only UI).
- `apps/mobile`: React Native CLI (native shell + navigation + native-only UI).
- `packages/*`: shared logic + design system.

## Shared package responsibilities
- `packages/domain`: pure domain model + validation + use-cases. No platform or network code.
- `packages/auth`: auth flows, session helpers, and access policies. Split by client/server.
- `packages/supabase`: Supabase client setup for browser, server, and admin/service role.
- `packages/db`: database types, query helpers, and server-only data access.
- `packages/ui`: cross-platform design system. Web uses Tailwind; mobile uses NativeWind.
- `packages/config`: shared Tailwind/NativeWind + base TS config.

## UI strategy (practical approach)
- `@care-connect/ui` uses conditional exports:
  - web: `packages/ui/src/web/*` (Tailwind + DOM)
  - native: `packages/ui/src/native/*` (React Native + NativeWind)
- Shared tokens live in `packages/ui/src/shared/*`.

## Import rules
- App shells (`apps/web`, `apps/mobile`) can import from any package.
- `packages/domain` must stay pure: no React, no Supabase, no platform APIs.
- `packages/db` and `packages/supabase/server` are server-only.
- `packages/ui` must not import from `packages/db` or `packages/supabase`.

## Domain conventions
- Entities are typed in `packages/domain/src/entities`.
- Runtime validation uses `zod` schemas in `packages/domain/src/schemas`.
- Use-cases live in `packages/domain/src/usecases`.

## Supabase conventions
- Browser client: `createBrowserClient()` reads `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Server client: `createServerClient()` reads `SUPABASE_URL` + `SUPABASE_ANON_KEY`.
- Admin client: `createAdminClient()` reads `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`.

## NativeWind setup (mobile)
- `apps/mobile/babel.config.js` includes `nativewind/babel`.
- `apps/mobile/tailwind.config.cjs` extends `@care-connect/config/nativewind`.
- Add `nativewind` + `tailwindcss` to `apps/mobile` dependencies (already stubbed).

## Where to put new code
- New domain concepts: `packages/domain/src/entities` and `packages/domain/src/schemas`.
- New use-cases: `packages/domain/src/usecases`.
- Auth flows: `packages/auth/src/client` or `packages/auth/src/server`.
- Supabase client factories: `packages/supabase/src/{client,server,admin}`.
- Cross-platform UI: `packages/ui/src/{web,native}` + shared tokens in `shared`.
