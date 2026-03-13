# Care Connect Phasing Plan (MVC Fast Track)

Goal: ship a minimal, secure, usable MVC ASAP with strict time/money limits. Build the smallest loop that delivers value: **auth → group → patient → shared notes/attachments → basic care team**. Everything else is a later phase.
Last updated: March 13, 2026

## Current Ground Truth
- Authoritative schema: `database/supabase/schema.sql`
- Domain folders: `shared/packages/domain/<table-name>` (aligned to schema)
- Core stack: Expo RN (web+mobile), Express API, Supabase, NativeWind, Zod

## Phase 0: Foundation (Done / Verify)
Keep this lean; only fix what blocks MVC.
1. Monorepo + workspaces + shared config
2. Supabase types + client helpers
3. Auth adapter layer (Supabase now, Cognito stub later)
4. Baseline UI primitives + Tailwind/NativeWind config

## Phase 1: MVC Slice (1–2 weeks)
**Objective:** A caregiver can sign up, create/join a group, add a patient, and share notes/attachments.
Status: Complete (March 13, 2026)

1. Auth + session
- ~~Email sign up/in, session refresh, logout~~
- ~~Guarded routes (web + mobile)~~

2. Groups + group_members
- ~~Create group~~
- ~~Invite/add member (role: owner/admin/member/patient)~~
- ~~RLS: members can only access their groups~~

3. Patients (minimal profile)
- ~~Create patient linked to group~~
- ~~Basic fields: `date_of_birth`, `blood_type`, `language`, `interpreter_needed`~~
- ~~RLS: group members read/write patients in group~~

4. Notes + attachments
- ~~Create note for patient~~
- ~~Attach file via `attachments` table + Supabase Storage~~
- ~~Minimal list/detail views~~
- ~~Storage policies for `attachments` bucket~~

5. Basic UI flow
- ~~Dashboard: group selector + patient summary~~
- ~~Patient detail: notes tab~~
- ~~Patients: list patients across your groups~~

Definition of done (MVC):
- One group, one patient, two users can share notes + attachments without permission leaks.

## Phase 2: Care Team + Entities (2–3 weeks)
**Objective:** Make providers and organizations usable in the patient context.

1. Entities + entity_types
2. Contact methods + addresses
3. Patient care team assignments
4. Link notes/events to entities

## Phase 3: Clinical Core (3–5 weeks)
**Objective:** Day-to-day clinical value without heavy complexity.

1. Patient events + event_types + participants
2. Diagnoses + prescriptions
3. Patient timeline (read-only aggregation)

## Phase 4: Supporting Data (as needed)
Only add when specifically needed by users.
- Insurances
- Patient equipment/supplies
- Medical expenses
- Patient nutrition/growth/tests
- Family supports
- Clinical codes / event codes

## Phase 5: Hardening + Scale
- Full RLS audit
- Audit logging + soft deletes
- Performance indexes
- Notifications
- Auth swap readiness

## Practical Constraints (Time/Money)
- Prefer basic CRUD + lists over complex UX
- Avoid custom admin panels until real users demand it
- Ship thin features end-to-end rather than half-finished breadth
- Use schema-aligned DTOs + Zod validation for every write

## Immediate Next Steps
1. Confirm MVC screens + navigation flow (web + mobile)
2. Implement Phase 1 endpoints and screens
3. Instrument basic analytics/logging for user feedback
