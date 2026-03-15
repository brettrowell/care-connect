-- BridgeCare: adapt EXISTING database for BridgeCare app
-- Run this on top of your current schema. Does not create groups, group_members, patients, etc.
-- Reuses: groups, group_members, patients, patient_profiles, patient_daily_events, patient_supplies, attachments

-- ========== 1. GROUPS ==========
-- Add updated_at if missing
ALTER TABLE public.groups
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- ========== 2. GROUP_MEMBERS (your memberships table) ==========
-- Add id and created_at for BridgeCare compatibility (optional; app can use composite key)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'group_members' AND column_name = 'id') THEN
    ALTER TABLE public.group_members ADD COLUMN id uuid DEFAULT gen_random_uuid();
    UPDATE public.group_members SET id = gen_random_uuid() WHERE id IS NULL;
    ALTER TABLE public.group_members ALTER COLUMN id SET NOT NULL;
    -- Don't add PK on id to keep existing composite PK; id is for app convenience
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'group_members' AND column_name = 'created_at') THEN
    ALTER TABLE public.group_members ADD COLUMN created_at timestamptz DEFAULT now();
  END IF;
END $$;

-- ========== 3. PATIENTS ==========
-- One patient per group (users can be in many groups; each group has at most one patient). Ensure UNIQUE on group_id.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint c
    JOIN pg_class t ON c.conrelid = t.oid
    JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = ANY(c.conkey) AND NOT a.attisdropped
    WHERE t.relname = 'patients' AND c.contype = 'u' AND a.attname = 'group_id'
  ) THEN
    ALTER TABLE public.patients ADD CONSTRAINT patients_group_id_key UNIQUE (group_id);
  END IF;
EXCEPTION WHEN duplicate_object THEN NULL; -- constraint already exists
END $$;

-- Add display_name and updated_at for BridgeCare
ALTER TABLE public.patients
  ADD COLUMN IF NOT EXISTS display_name text;
ALTER TABLE public.patients
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
-- Backfill display_name from existing data if you have entities/person (optional)
-- UPDATE public.patients SET display_name = COALESCE(display_name, (SELECT name FROM entities WHERE id = person_id), 'Patient') WHERE display_name IS NULL;

-- ========== 4. PATIENT_PROFILES ==========
-- Add BridgeCare communication_dictionary (cue/meaning list)
ALTER TABLE public.patient_profiles
  ADD COLUMN IF NOT EXISTS communication_dictionary jsonb DEFAULT '[]'::jsonb;

-- ========== 5. PATIENT_DAILY_EVENTS ==========
-- Your table has event_type, group_id, data, notes, media_attachment_ids, created_by, occurred_at.
-- Add consumed_supply_id for supply deduction on log
ALTER TABLE public.patient_daily_events
  ADD COLUMN IF NOT EXISTS consumed_supply_id uuid REFERENCES public.patient_supplies(id) ON DELETE SET NULL;

-- ========== 6. PATIENT_SUPPLIES ==========
-- You have quantity; add reorder_threshold and unit for BridgeCare low-stock
ALTER TABLE public.patient_supplies
  ADD COLUMN IF NOT EXISTS reorder_threshold int NOT NULL DEFAULT 1;
ALTER TABLE public.patient_supplies
  ADD COLUMN IF NOT EXISTS unit text DEFAULT 'each';

-- ========== 7. NEW TABLES (BridgeCare-only) ==========
CREATE TABLE IF NOT EXISTS public.emergencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  title text NOT NULL,
  steps jsonb NOT NULL DEFAULT '[]'::jsonb,
  baselines jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_emergencies_patient_id ON public.emergencies(patient_id);

CREATE TABLE IF NOT EXISTS public.handoff_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_handoff_tokens_token ON public.handoff_tokens(token);
CREATE INDEX IF NOT EXISTS idx_handoff_tokens_expires_at ON public.handoff_tokens(expires_at);

-- ========== 8. HELPER FUNCTIONS (use group_members, role as text) ==========
CREATE OR REPLACE FUNCTION public.get_user_role(p_group_id uuid, p_user_id uuid)
RETURNS text AS $$
  SELECT role FROM public.group_members WHERE group_id = p_group_id AND user_id = p_user_id LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_group_member(p_group_id uuid, p_user_id uuid)
RETURNS boolean AS $$
  SELECT EXISTS (SELECT 1 FROM public.group_members WHERE group_id = p_group_id AND user_id = p_user_id);
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_patient_group_id(p_patient_id uuid)
RETURNS uuid AS $$
  SELECT group_id FROM public.patients WHERE id = p_patient_id LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- ========== 9. RLS (enable and policies) ==========
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_supplies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_daily_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.handoff_tokens ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (so we can re-run); use unique names to avoid clashes
DROP POLICY IF EXISTS bridgecare_groups_select ON public.groups;
DROP POLICY IF EXISTS bridgecare_groups_insert ON public.groups;
DROP POLICY IF EXISTS bridgecare_groups_update ON public.groups;
DROP POLICY IF EXISTS bridgecare_groups_delete ON public.groups;
DROP POLICY IF EXISTS bridgecare_group_members_select ON public.group_members;
DROP POLICY IF EXISTS bridgecare_group_members_insert ON public.group_members;
DROP POLICY IF EXISTS bridgecare_group_members_update ON public.group_members;
DROP POLICY IF EXISTS bridgecare_group_members_delete ON public.group_members;
DROP POLICY IF EXISTS bridgecare_patients_select ON public.patients;
DROP POLICY IF EXISTS bridgecare_patients_insert ON public.patients;
DROP POLICY IF EXISTS bridgecare_patients_update ON public.patients;
DROP POLICY IF EXISTS bridgecare_patients_delete ON public.patients;
DROP POLICY IF EXISTS bridgecare_patient_profiles_select ON public.patient_profiles;
DROP POLICY IF EXISTS bridgecare_patient_profiles_insert ON public.patient_profiles;
DROP POLICY IF EXISTS bridgecare_patient_profiles_update ON public.patient_profiles;
DROP POLICY IF EXISTS bridgecare_patient_profiles_delete ON public.patient_profiles;
DROP POLICY IF EXISTS bridgecare_patient_supplies_select ON public.patient_supplies;
DROP POLICY IF EXISTS bridgecare_patient_supplies_insert ON public.patient_supplies;
DROP POLICY IF EXISTS bridgecare_patient_supplies_update ON public.patient_supplies;
DROP POLICY IF EXISTS bridgecare_patient_supplies_delete ON public.patient_supplies;
DROP POLICY IF EXISTS bridgecare_patient_daily_events_select ON public.patient_daily_events;
DROP POLICY IF EXISTS bridgecare_patient_daily_events_insert ON public.patient_daily_events;
DROP POLICY IF EXISTS bridgecare_patient_daily_events_update ON public.patient_daily_events;
DROP POLICY IF EXISTS bridgecare_patient_daily_events_delete ON public.patient_daily_events;
DROP POLICY IF EXISTS bridgecare_emergencies_select ON public.emergencies;
DROP POLICY IF EXISTS bridgecare_emergencies_insert ON public.emergencies;
DROP POLICY IF EXISTS bridgecare_emergencies_update ON public.emergencies;
DROP POLICY IF EXISTS bridgecare_emergencies_delete ON public.emergencies;
DROP POLICY IF EXISTS bridgecare_handoff_tokens_select ON public.handoff_tokens;
DROP POLICY IF EXISTS bridgecare_handoff_tokens_insert ON public.handoff_tokens;
DROP POLICY IF EXISTS bridgecare_handoff_tokens_delete ON public.handoff_tokens;

-- groups
CREATE POLICY bridgecare_groups_select ON public.groups FOR SELECT
  USING (public.is_group_member(id, auth.uid()));
CREATE POLICY bridgecare_groups_insert ON public.groups FOR INSERT
  WITH CHECK (true);
CREATE POLICY bridgecare_groups_update ON public.groups FOR UPDATE
  USING (public.get_user_role(id, auth.uid()) IN ('owner', 'guardian'));
CREATE POLICY bridgecare_groups_delete ON public.groups FOR DELETE
  USING (public.get_user_role(id, auth.uid()) IN ('owner', 'guardian'));

-- group_members
CREATE POLICY bridgecare_group_members_select ON public.group_members FOR SELECT
  USING (public.is_group_member(group_id, auth.uid()));
CREATE POLICY bridgecare_group_members_insert ON public.group_members FOR INSERT
  WITH CHECK (public.get_user_role(group_id, auth.uid()) IN ('owner', 'guardian'));
CREATE POLICY bridgecare_group_members_update ON public.group_members FOR UPDATE
  USING (public.get_user_role(group_id, auth.uid()) IN ('owner', 'guardian'));
CREATE POLICY bridgecare_group_members_delete ON public.group_members FOR DELETE
  USING (public.get_user_role(group_id, auth.uid()) IN ('owner', 'guardian'));

-- patients
CREATE POLICY bridgecare_patients_select ON public.patients FOR SELECT
  USING (public.is_group_member(group_id, auth.uid()));
CREATE POLICY bridgecare_patients_insert ON public.patients FOR INSERT
  WITH CHECK (public.get_user_role(group_id, auth.uid()) IN ('owner', 'guardian'));
CREATE POLICY bridgecare_patients_update ON public.patients FOR UPDATE
  USING (public.get_user_role(group_id, auth.uid()) IN ('owner', 'guardian'));
CREATE POLICY bridgecare_patients_delete ON public.patients FOR DELETE
  USING (public.get_user_role(group_id, auth.uid()) IN ('owner', 'guardian'));

-- patient_profiles
CREATE POLICY bridgecare_patient_profiles_select ON public.patient_profiles FOR SELECT
  USING (public.is_group_member(public.get_patient_group_id(patient_id), auth.uid()));
CREATE POLICY bridgecare_patient_profiles_insert ON public.patient_profiles FOR INSERT
  WITH CHECK (public.get_user_role(public.get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));
CREATE POLICY bridgecare_patient_profiles_update ON public.patient_profiles FOR UPDATE
  USING (public.get_user_role(public.get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));
CREATE POLICY bridgecare_patient_profiles_delete ON public.patient_profiles FOR DELETE
  USING (public.get_user_role(public.get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

-- patient_supplies
CREATE POLICY bridgecare_patient_supplies_select ON public.patient_supplies FOR SELECT
  USING (public.is_group_member(public.get_patient_group_id(patient_id), auth.uid()));
CREATE POLICY bridgecare_patient_supplies_insert ON public.patient_supplies FOR INSERT
  WITH CHECK (public.get_user_role(public.get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));
CREATE POLICY bridgecare_patient_supplies_update ON public.patient_supplies FOR UPDATE
  USING (public.is_group_member(public.get_patient_group_id(patient_id), auth.uid()));
CREATE POLICY bridgecare_patient_supplies_delete ON public.patient_supplies FOR DELETE
  USING (public.get_user_role(public.get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

-- patient_daily_events (your table has group_id already)
CREATE POLICY bridgecare_patient_daily_events_select ON public.patient_daily_events FOR SELECT
  USING (public.is_group_member(public.get_patient_group_id(patient_id), auth.uid()));
CREATE POLICY bridgecare_patient_daily_events_insert ON public.patient_daily_events FOR INSERT
  WITH CHECK (
    public.get_user_role(public.get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian', 'provider', 'caregiver')
    OR public.get_user_role(public.get_patient_group_id(patient_id), auth.uid()) = 'family'
  );
CREATE POLICY bridgecare_patient_daily_events_update ON public.patient_daily_events FOR UPDATE
  USING (public.get_user_role(public.get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));
CREATE POLICY bridgecare_patient_daily_events_delete ON public.patient_daily_events FOR DELETE
  USING (public.get_user_role(public.get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

-- emergencies
CREATE POLICY bridgecare_emergencies_select ON public.emergencies FOR SELECT
  USING (public.is_group_member(public.get_patient_group_id(patient_id), auth.uid()));
CREATE POLICY bridgecare_emergencies_insert ON public.emergencies FOR INSERT
  WITH CHECK (public.get_user_role(public.get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));
CREATE POLICY bridgecare_emergencies_update ON public.emergencies FOR UPDATE
  USING (public.get_user_role(public.get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));
CREATE POLICY bridgecare_emergencies_delete ON public.emergencies FOR DELETE
  USING (public.get_user_role(public.get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

-- handoff_tokens
CREATE POLICY bridgecare_handoff_tokens_select ON public.handoff_tokens FOR SELECT
  USING (public.get_user_role(public.get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));
CREATE POLICY bridgecare_handoff_tokens_insert ON public.handoff_tokens FOR INSERT
  WITH CHECK (public.get_user_role(public.get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));
CREATE POLICY bridgecare_handoff_tokens_delete ON public.handoff_tokens FOR DELETE
  USING (public.get_user_role(public.get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

-- ========== 10. UPDATED_AT TRIGGERS (only if column exists) ==========
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'groups' AND column_name = 'updated_at') THEN
    DROP TRIGGER IF EXISTS bridgecare_groups_updated_at ON public.groups;
    CREATE TRIGGER bridgecare_groups_updated_at BEFORE UPDATE ON public.groups FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'patients' AND column_name = 'updated_at') THEN
    DROP TRIGGER IF EXISTS bridgecare_patients_updated_at ON public.patients;
    CREATE TRIGGER bridgecare_patients_updated_at BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'patient_profiles' AND column_name = 'updated_at') THEN
    DROP TRIGGER IF EXISTS bridgecare_patient_profiles_updated_at ON public.patient_profiles;
    CREATE TRIGGER bridgecare_patient_profiles_updated_at BEFORE UPDATE ON public.patient_profiles FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'patient_supplies' AND column_name = 'updated_at') THEN
    DROP TRIGGER IF EXISTS bridgecare_patient_supplies_updated_at ON public.patient_supplies;
    CREATE TRIGGER bridgecare_patient_supplies_updated_at BEFORE UPDATE ON public.patient_supplies FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
  END IF;
END $$;

DROP TRIGGER IF EXISTS bridgecare_emergencies_updated_at ON public.emergencies;
CREATE TRIGGER bridgecare_emergencies_updated_at BEFORE UPDATE ON public.emergencies FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
