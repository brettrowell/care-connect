-- BridgeCare initial schema + RLS
-- Run in Supabase SQL editor or via supabase db push

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Groups
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Memberships
CREATE TYPE membership_role AS ENUM ('owner', 'guardian', 'provider', 'caregiver', 'family');

CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role membership_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(group_id, user_id)
);

CREATE INDEX idx_memberships_user_id ON memberships(user_id);
CREATE INDEX idx_memberships_group_id ON memberships(group_id);

-- Patients
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  date_of_birth DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_patients_group_id ON patients(group_id);

-- Patient profiles (1:1)
CREATE TABLE patient_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL UNIQUE REFERENCES patients(id) ON DELETE CASCADE,
  diagnoses TEXT[] DEFAULT '{}',
  communication_dictionary JSONB DEFAULT '[]',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Patient supplies (for inventory + event deduction)
CREATE TABLE patient_supplies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  current_quantity INT NOT NULL DEFAULT 0,
  unit TEXT DEFAULT 'each',
  reorder_threshold INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_patient_supplies_patient_id ON patient_supplies(patient_id);

-- Daily events
CREATE TABLE patient_daily_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  data JSONB DEFAULT '{}',
  notes TEXT,
  media_urls TEXT[] DEFAULT '{}',
  consumed_supply_id UUID REFERENCES patient_supplies(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_patient_daily_events_patient_id ON patient_daily_events(patient_id);
CREATE INDEX idx_patient_daily_events_occurred_at ON patient_daily_events(occurred_at DESC);

-- Emergencies
CREATE TABLE emergencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  steps JSONB NOT NULL DEFAULT '[]',
  baselines JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_emergencies_patient_id ON emergencies(patient_id);

-- Handoff tokens
CREATE TABLE handoff_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_handoff_tokens_token ON handoff_tokens(token);
CREATE INDEX idx_handoff_tokens_expires_at ON handoff_tokens(expires_at);

-- Helper: get user's role in a group
CREATE OR REPLACE FUNCTION get_user_role(p_group_id UUID, p_user_id UUID)
RETURNS membership_role AS $$
  SELECT role FROM memberships WHERE group_id = p_group_id AND user_id = p_user_id LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Helper: is user member of group
CREATE OR REPLACE FUNCTION is_group_member(p_group_id UUID, p_user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (SELECT 1 FROM memberships WHERE group_id = p_group_id AND user_id = p_user_id);
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Helper: get group_id for a patient
CREATE OR REPLACE FUNCTION get_patient_group_id(p_patient_id UUID)
RETURNS UUID AS $$
  SELECT group_id FROM patients WHERE id = p_patient_id LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- RLS enable
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_supplies ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_daily_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE handoff_tokens ENABLE ROW LEVEL SECURITY;

-- groups: members can read; owner/guardian can update/delete
CREATE POLICY groups_select ON groups FOR SELECT
  USING (is_group_member(id, auth.uid()));

CREATE POLICY groups_insert ON groups FOR INSERT
  WITH CHECK (true);

CREATE POLICY groups_update ON groups FOR UPDATE
  USING (get_user_role(id, auth.uid()) IN ('owner', 'guardian'));

CREATE POLICY groups_delete ON groups FOR DELETE
  USING (get_user_role(id, auth.uid()) IN ('owner', 'guardian'));

-- memberships: members can read; owner/guardian can insert/update/delete
CREATE POLICY memberships_select ON memberships FOR SELECT
  USING (is_group_member(group_id, auth.uid()));

CREATE POLICY memberships_insert ON memberships FOR INSERT
  WITH CHECK (get_user_role(group_id, auth.uid()) IN ('owner', 'guardian'));

CREATE POLICY memberships_update ON memberships FOR UPDATE
  USING (get_user_role(group_id, auth.uid()) IN ('owner', 'guardian'));

CREATE POLICY memberships_delete ON memberships FOR DELETE
  USING (get_user_role(group_id, auth.uid()) IN ('owner', 'guardian'));

-- patients: members can read; owner/guardian can insert/update/delete
CREATE POLICY patients_select ON patients FOR SELECT
  USING (is_group_member(group_id, auth.uid()));

CREATE POLICY patients_insert ON patients FOR INSERT
  WITH CHECK (get_user_role(group_id, auth.uid()) IN ('owner', 'guardian'));

CREATE POLICY patients_update ON patients FOR UPDATE
  USING (get_user_role(group_id, auth.uid()) IN ('owner', 'guardian'));

CREATE POLICY patients_delete ON patients FOR DELETE
  USING (get_user_role(group_id, auth.uid()) IN ('owner', 'guardian'));

-- patient_profiles: same as patients
CREATE POLICY patient_profiles_select ON patient_profiles FOR SELECT
  USING (is_group_member(get_patient_group_id(patient_id), auth.uid()));

CREATE POLICY patient_profiles_insert ON patient_profiles FOR INSERT
  WITH CHECK (get_user_role(get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

CREATE POLICY patient_profiles_update ON patient_profiles FOR UPDATE
  USING (get_user_role(get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

CREATE POLICY patient_profiles_delete ON patient_profiles FOR DELETE
  USING (get_user_role(get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

-- patient_supplies: members can read; owner/guardian/caregiver/provider can update (for deduct)
CREATE POLICY patient_supplies_select ON patient_supplies FOR SELECT
  USING (is_group_member(get_patient_group_id(patient_id), auth.uid()));

CREATE POLICY patient_supplies_insert ON patient_supplies FOR INSERT
  WITH CHECK (get_user_role(get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

CREATE POLICY patient_supplies_update ON patient_supplies FOR UPDATE
  USING (is_group_member(get_patient_group_id(patient_id), auth.uid()));

CREATE POLICY patient_supplies_delete ON patient_supplies FOR DELETE
  USING (get_user_role(get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

-- patient_daily_events: members can read; owner/guardian/provider/caregiver can insert
CREATE POLICY patient_daily_events_select ON patient_daily_events FOR SELECT
  USING (is_group_member(get_patient_group_id(patient_id), auth.uid()));

CREATE POLICY patient_daily_events_insert ON patient_daily_events FOR INSERT
  WITH CHECK (
    get_user_role(get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian', 'provider', 'caregiver')
    OR (get_user_role(get_patient_group_id(patient_id), auth.uid()) = 'family')
  );

CREATE POLICY patient_daily_events_update ON patient_daily_events FOR UPDATE
  USING (get_user_role(get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

CREATE POLICY patient_daily_events_delete ON patient_daily_events FOR DELETE
  USING (get_user_role(get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

-- emergencies: members can read; owner/guardian can write
CREATE POLICY emergencies_select ON emergencies FOR SELECT
  USING (is_group_member(get_patient_group_id(patient_id), auth.uid()));

CREATE POLICY emergencies_insert ON emergencies FOR INSERT
  WITH CHECK (get_user_role(get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

CREATE POLICY emergencies_update ON emergencies FOR UPDATE
  USING (get_user_role(get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

CREATE POLICY emergencies_delete ON emergencies FOR DELETE
  USING (get_user_role(get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

-- handoff_tokens: only owner/guardian create/read/delete; public read by token via anon or service (see app)
CREATE POLICY handoff_tokens_select ON handoff_tokens FOR SELECT
  USING (get_user_role(get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

CREATE POLICY handoff_tokens_insert ON handoff_tokens FOR INSERT
  WITH CHECK (get_user_role(get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

CREATE POLICY handoff_tokens_delete ON handoff_tokens FOR DELETE
  USING (get_user_role(get_patient_group_id(patient_id), auth.uid()) IN ('owner', 'guardian'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER groups_updated_at BEFORE UPDATE ON groups FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER patient_profiles_updated_at BEFORE UPDATE ON patient_profiles FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER patient_supplies_updated_at BEFORE UPDATE ON patient_supplies FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
CREATE TRIGGER emergencies_updated_at BEFORE UPDATE ON emergencies FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
