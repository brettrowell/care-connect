# Care Connect – Setup & Run

## 1. Install dependencies

From repo root:

```bash
pnpm install
```

Requires Node ≥ 20.18.0 and pnpm 9.x.

## 2. Environment

Use a **single `.env` at the repo root**. Copy the example and set your Supabase project URL and anon key:

```bash
cp .env.example .env
```

If you already had values in **`apps/frontend/.env.example`**, you can copy those into the root **`.env`** instead.

Edit **`.env`** (in the project root):

- `SUPABASE_URL` – Supabase project URL (e.g. `https://xxxx.supabase.co`)
- `SUPABASE_ANON_KEY` – Supabase anon/public key

The Expo app (and any other tooling) reads from this file. Optional keys like `SUPABASE_SERVICE_ROLE_KEY` are for backend/admin use.

## 3. Database (Supabase)

- Point your Supabase project to the schema in `database/supabase/schema.sql` (or apply your existing schema).
- Seed quick event types (bowel, feeding, vomit, medication) by running the migration:

  - If using Supabase CLI:  
    `cd database && supabase db push`  
    or apply the SQL manually from:  
    `database/supabase/migrations/20260313000000_seed_quick_event_types.sql`

  - Or in Supabase Dashboard → SQL Editor, run the contents of that migration file.

## 4. Run the app

**Web**

```bash
cd apps/frontend && pnpm web
```

**Mobile (Expo)**

```bash
cd apps/frontend && pnpm start
```

Then press `i` for iOS or `a` for Android in the Expo CLI.

## 5. Regenerate Supabase types (optional)

After schema changes:

```bash
pnpm supabase:types
```

(Requires Supabase CLI and a linked project in `database/`.)

---

**Quick recap:** `pnpm install` → copy `.env.example` to `.env` at repo root and set `SUPABASE_URL` and `SUPABASE_ANON_KEY` → run event_types migration in Supabase → `cd apps/frontend && pnpm web`.
