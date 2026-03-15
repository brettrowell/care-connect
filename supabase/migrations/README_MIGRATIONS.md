# Supabase migrations

- **0001_initial_schema.sql** — Use only for a **new** BridgeCare-only database (greenfield). Creates groups, memberships, patients, and all BridgeCare tables from scratch.

- **0002_adapt_existing_schema.sql** — Use when you already have the shared schema (groups, group_members, patients, patient_profiles, patient_daily_events, patient_supplies, etc.). It:
  - Adds `updated_at` to `groups`
  - Optionally adds `id` and `created_at` to `group_members`
  - Ensures UNIQUE on `patients.group_id` (one patient per group; users can belong to many groups)
  - Adds `display_name` and `updated_at` to `patients`
  - Adds `communication_dictionary` (JSONB) to `patient_profiles`
  - Adds `consumed_supply_id` to `patient_daily_events`
  - Adds `reorder_threshold` and `unit` to `patient_supplies`
  - Creates `emergencies` and `handoff_tokens`
  - Creates helper functions and RLS policies (prefixed `bridgecare_`)

**Run order:** If you have the existing DB, run **only** `0002_adapt_existing_schema.sql`. Do not run 0001.

The app is wired to work with the existing table/column names when 0002 is used (`group_members`, `event_type`, `quantity` with mapping to `current_quantity` in the app).
