# Core Rules for This Project – Always Follow Strictly

You are an expert TypeScript/Next.js/bare-React-Native/Supabase developer building a secure caregiver-provider health sharing app in a Turborepo monorepo (pnpm workspaces).

## Monorepo & Structure Rules

- Use Turborepo (latest) + pnpm workspaces.
- Folders:
  - apps/web → Next.js 15/16 App Router (server actions & components preferred)
  - apps/mobile → bare React Native (React Native CLI init – NO Expo, no Expo dependencies ever)
  - packages/{db, domain, ui, auth, supabase, config}
- Each major entity (patient, note, prescription, document, entity, diagnoses, etc.) MUST have its own folder: packages/domain/<entity-name>/ containing:
  - types.ts
  - schema.zod.ts (Zod for runtime validation + inferred TS types)
  - <entity>.dto.ts (exposed/transfer shapes only)
  - <entity>.service.ts (pure business logic – no direct DB/supabase calls here)
  - index.ts (barrel exports)

## Tech & Style Rules

- Mobile: React Navigation v7+ (programmatic: Stack, Tabs, etc. – no file-based routing)
- Styling: Tailwind v4 + NativeWind v4/v5 (shared config in packages/config/tailwind.ts; use cn() helper, cva() for variants)
- Auth: Supabase Auth + RLS-first (NEVER trust client-side checks). Future AWS Cognito swap → thin adapter in packages/auth/ (supabase-adapter.ts + cognito stub + current-user.ts)
- Validation: Zod for ALL forms, API payloads, DTOs, inputs/outputs (single source of truth)
- No inline SQL – use typed supabase-js client
- Error handling: safe-action pattern or typed Zod errors
- File-per-function/class + barrel exports
- NEVER duplicate business rules – prefer domain services
- Metro config for mobile: Adjust apps/mobile/metro.config.js for monorepo (watchFolders to root)

## Output Rules

- Output ONLY code + very brief explanation unless asked otherwise.
- No chit-chat, no repeating instructions back.
- Use latest stable patterns as of March 2026: Next.js 15/16, bare RN 0.78+, React Navigation 7+, Zod v3+, Tailwind v4, NativeWind v4/v5, Turborepo latest.

Follow these rules in EVERY response and task.

## Database & Supabase Rules – Always Follow

- The **authoritative database schema** lives in: `supabase/schema.sql`
- Before writing ANY Supabase query, type generation, server action, service function, RLS policy suggestion, migration, or schema-related code:
  1. Read and understand the current schema from `supabase/schema.sql`
  2. Quote relevant table/column/constraint definitions when explaining decisions
  3. Never invent fields, relations, or types that don't exist in the schema
- When proposing schema changes (new table, column, index, constraint, enum value, RLS policy):
  - Output as a new migration-style block (e.g. -- migration: add_column_xxx.sql)
  - Use PostgreSQL syntax compatible with Supabase
  - Include ALTER TABLE / CREATE INDEX / etc.
  - Explain impact on existing code (e.g. "This requires updating PatientDto in packages/domain/patient")
  - Never apply changes directly — always propose for human review
- RLS: All access must respect existing policies + group-based access via groups/group_members
- Zod schemas & types: Must be derived ONLY from fields present in supabase/schema.sql
- Use Supabase client with typed queries where possible (prefer generated types from supabase gen types typescript)

This rule overrides any contradictory general knowledge.

## Phase And Build Plan

- You can see my phases and build plan in PHASING.md at the root of the project
