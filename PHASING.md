# Recommended Build Order for Care Coordination App

Based on the provided Supabase schema, this is the suggested phased build order.  
Priorities:  
- Security & authorization first (auth + RLS + groups)  
- Core patient + ownership loop early (MVP value)  
- Entity modeling next (providers, organizations)  
- Clinical daily-use features after foundations  
- Supporting features iteratively

## Phase 0: Foundation (1–2 weeks – do this first!)

Must be solid before anything else.

1. Monorepo setup (DONE)
   - Turborepo + pnpm workspace  
   - apps/web (Next.js 15/16 App Router)  
   - apps/mobile (bare React Native CLI – NO Expo)  
   - packages/{db, domain, ui, auth, supabase, config}  
   - Shared Tailwind/NativeWind config  
   - Metro config fix for mobile monorepo resolution

2. Supabase project setup & auth foundation (DONE)  
   - Create Supabase project (DONE)  
   - Web env configured (DONE)  
     - `apps/web/.env.local` populated  
   - Mobile env configured (DONE)  
     - `apps/mobile/.env` + `react-native-dotenv` in Babel  
   - Supabase client helpers wired + typed (DONE)  
     - `packages/supabase/*` typed with `Database`  
     - `apps/mobile/src/config/supabase.ts` typed with `Database`  
   - Auth enabled (email only) (DONE)  
   - Basic RLS policies on initial tables (DONE)  
   - Group owner bootstrap trigger (DONE)  
     - `supabase/schema.sql`  
   - Generate & commit Supabase types (DONE)  
     - `pnpm supabase:types` → `packages/db/src/types/supabase.ts`  
   - Export DB types for use in code (DONE)  
     - `packages/db/src/types/index.ts` → `export type { Database } from "./supabase";`

3. Auth abstraction layer (packages/auth)  
   - Thin adapter pattern (supabase-adapter + future cognito stub)  
   - `getCurrentUser()` / session helpers (server + client)  
   - Protected routes/layout in web (middleware) & mobile (navigation guards)

4. Core shared infrastructure  
   - Supabase client helpers (typed, RLS-aware) in packages/supabase  
   - Zod + domain base schemas in packages/domain (start with Patient, Entity, Group)  
   - UI primitives (shadcn/ui web + NativeWind equivalents) in packages/ui

## Phase 1: Groups + Patients + Basic Ownership (MVP Core – 3–5 weeks)

Build the "who owns / can see what" foundation.

5. Groups & group_members  
   - CRUD for groups (owner creates group)  
   - Add/remove members with roles (owner, admin, member, patient)  
   - RLS: users can only see groups they're in

6. Patients table + linkage  
   - Create patient → assign to group (1:1 via group_id)  
   - Basic patient profile view/edit (date_of_birth, blood_type, language, etc.)  
   - RLS: only group members can read/write patients in their group

7. Patient list + detail screen (web + mobile)  
   - Dashboard showing patients in current user's groups  
   - Simple patient detail page with tabs (profile, notes, events, etc. – placeholders)

Goal: Working "closed group around a patient" loop – already useful for early testing.

## Phase 2: Entities + Core Relationships (2–4 weeks)

Entities are the glue for providers/organizations.

8. Entities + entity_types + addresses + contact_methods  
   - CRUD for entities (with type filtering)  
   - Attach addresses/contacts

9. Entity relationships & tags  
   - Link entities (e.g. patient → primary care physician entity)

10. Patient care team  
    - Assign providers/entities to patient with role_category + active status

## Phase 3: Time-Sensitive & Clinical Core Features (4–8 weeks)

Daily-use clinical content.

11. Patient events/appointments + event_types + participants  
    - Create/view/edit events (appointments, visits, etc.)  
    - Participants (link entities)

12. Notes + note_attachments  
    - Rich notes attached to patient/entity/event  
    - File uploads (Supabase Storage)

13. Documents  
    - Upload/view documents linked to patient/entity

14. Diagnoses + Prescriptions  
    - Add/edit diagnoses (with type, onset)  
    - Active prescriptions list + history

## Phase 4: Supporting & Operational Features (iterative – 4–10 weeks)

Add polish and secondary workflows.

15. Insurances + policy_holder links  
16. Patient supplies + equipment  
17. Medical expenses  
18. Patient nutrition / growth / tests  
19. Family supports  
20. Clinical codes + event_codes (if needed for standardization)

## Phase 5: Polish, Search, Timeline, UX Improvements

21. Patient timeline (aggregate view from events/notes/documents/etc.)  
22. Search/filter across patient data (within group permissions)  
23. Notifications (if adding real-time or email/SMS)  
24. Mobile-specific UX (offline hints, push if possible)  
25. Basic analytics/dashboard views for caregivers/providers

## Phase 6: Security, Compliance, Future-Proofing

26. Full RLS audit (row-level + column if needed)  
27. Audit logging / soft deletes consistency  
28. Auth swap readiness test (stub Cognito adapter)  
29. HIPAA/GDPR considerations (encryption at rest, access logs, etc.)  
30. Performance (indexes, pagination, caching)

## Quick Prioritization Rationale

| Priority | Why first?                          | Risk if delayed                  |
|----------|-------------------------------------|----------------------------------|
| Auth + Groups + Patients | Controls all access                | Security holes, rework later     |
| Entities + Care team     | Defines "who is the provider"      | Hard to retrofit relationships   |
| Events/Notes/Documents   | Daily collaboration value          | Core reason users open the app   |
| Prescriptions/Diagnoses  | Clinical heart of records          | High-value data, complex forms   |
| Supplies/Equipment/etc.  | Important but secondary workflows  | Can add incrementally            |

Start small: Get one patient visible and editable by 2–3 users in a group → that's your MVP proof-of-concept. Then expand outward.
