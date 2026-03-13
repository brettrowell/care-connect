-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.addresses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  zip text,
  country text DEFAULT 'US'::text,
  created_at timestamp with time zone DEFAULT now(),
  entity_id uuid,
  CONSTRAINT addresses_pkey PRIMARY KEY (id),
  CONSTRAINT addresses_entity_fk FOREIGN KEY (entity_id) REFERENCES public.entities(id)
);
CREATE TABLE public.attachments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  storage_path text NOT NULL,
  file_name text,
  mime_type text,
  file_size bigint,
  uploaded_by uuid,
  attached_type text NOT NULL,
  attached_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT attachments_pkey PRIMARY KEY (id),
  CONSTRAINT attachments_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES auth.users(id)
);
CREATE TABLE public.clinical_codes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  code text NOT NULL,
  code_system text NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT clinical_codes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.contact_methods (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  method_type text NOT NULL CHECK (method_type = ANY (ARRAY['phone'::text, 'cell'::text, 'fax'::text, 'email'::text, 'website'::text])),
  value text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  entity_id uuid,
  CONSTRAINT contact_methods_pkey PRIMARY KEY (id),
  CONSTRAINT contact_methods_entity_fk FOREIGN KEY (entity_id) REFERENCES public.entities(id)
);
CREATE TABLE public.diagnoses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL,
  diagnosis_text text NOT NULL,
  type text NOT NULL CHECK (type = ANY (ARRAY['primary'::text, 'secondary'::text, 'tertiary'::text, 'other'::text])),
  notes text,
  onset_date date,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  CONSTRAINT diagnoses_pkey PRIMARY KEY (id),
  CONSTRAINT diagnoses_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id)
);
CREATE TABLE public.entities (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  name text,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  entity_type_id uuid,
  deleted_at timestamp with time zone,
  CONSTRAINT entities_pkey PRIMARY KEY (id),
  CONSTRAINT entities_type_fk FOREIGN KEY (entity_type_id) REFERENCES public.entity_types(id)
);
CREATE TABLE public.entity_attributes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL,
  attribute_name text NOT NULL,
  attribute_value text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT entity_attributes_pkey PRIMARY KEY (id),
  CONSTRAINT entity_attributes_entity_fk FOREIGN KEY (entity_id) REFERENCES public.entities(id)
);
CREATE TABLE public.entity_relationships (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL,
  related_entity_id uuid NOT NULL,
  relationship_type text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT entity_relationships_pkey PRIMARY KEY (id),
  CONSTRAINT entity_relationships_entity_fk FOREIGN KEY (entity_id) REFERENCES public.entities(id),
  CONSTRAINT entity_relationships_related_fk FOREIGN KEY (related_entity_id) REFERENCES public.entities(id)
);
CREATE TABLE public.entity_tags (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  tag_id uuid NOT NULL,
  entity_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT entity_tags_pkey PRIMARY KEY (id),
  CONSTRAINT entity_tags_tag_fk FOREIGN KEY (tag_id) REFERENCES public.tags(id)
);
CREATE TABLE public.entity_types (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  CONSTRAINT entity_types_pkey PRIMARY KEY (id)
);
CREATE TABLE public.event_codes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_event_id uuid NOT NULL,
  clinical_code_id uuid NOT NULL,
  CONSTRAINT event_codes_pkey PRIMARY KEY (id),
  CONSTRAINT event_codes_patient_event_id_fkey FOREIGN KEY (patient_event_id) REFERENCES public.patient_events(id),
  CONSTRAINT event_codes_clinical_code_id_fkey FOREIGN KEY (clinical_code_id) REFERENCES public.clinical_codes(id)
);
CREATE TABLE public.event_participants (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_event_id uuid NOT NULL,
  entity_id uuid NOT NULL,
  role text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT event_participants_pkey PRIMARY KEY (id),
  CONSTRAINT event_participants_patient_event_id_fkey FOREIGN KEY (patient_event_id) REFERENCES public.patient_events(id),
  CONSTRAINT event_participants_entity_id_fkey FOREIGN KEY (entity_id) REFERENCES public.entities(id)
);
CREATE TABLE public.event_types (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT event_types_pkey PRIMARY KEY (id)
);
CREATE TABLE public.family_supports (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL,
  support_type text NOT NULL CHECK (support_type = ANY (ARRAY['support_group'::text, 'religious'::text, 'counseling'::text, 'respite'::text, 'other'::text])),
  website text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  address_id uuid,
  organization_entity_id uuid,
  CONSTRAINT family_supports_pkey PRIMARY KEY (id),
  CONSTRAINT family_supports_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT family_supports_org_fk FOREIGN KEY (organization_entity_id) REFERENCES public.entities(id),
  CONSTRAINT family_supports_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.addresses(id)
);
CREATE TABLE public.group_members (
  group_id uuid NOT NULL,
  user_id uuid NOT NULL,
  role text NOT NULL CHECK (role = ANY (ARRAY['owner'::text, 'admin'::text, 'member'::text, 'patient'::text])),
  CONSTRAINT group_members_pkey PRIMARY KEY (group_id, user_id),
  CONSTRAINT group_members_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id),
  CONSTRAINT group_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.groups (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  owner_id uuid,
  name text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT groups_pkey PRIMARY KEY (id),
  CONSTRAINT groups_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES auth.users(id)
);
CREATE TABLE public.insurances (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL,
  policy_number text NOT NULL,
  group_number text,
  phone_number text,
  deductible_amount numeric,
  active_start_date date NOT NULL,
  active_end_date date,
  insurance_type text NOT NULL CHECK (insurance_type = ANY (ARRAY['primary'::text, 'secondary'::text, 'tertiary'::text, 'other'::text])),
  policy_holder_contact_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  organization_id uuid,
  policy_holder_person_id uuid,
  CONSTRAINT insurances_pkey PRIMARY KEY (id),
  CONSTRAINT insurances_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id)
);
CREATE TABLE public.medical_expenses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL,
  expense_date date NOT NULL,
  provider_entity_id uuid,
  amount numeric NOT NULL,
  description text,
  paid_by text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT medical_expenses_pkey PRIMARY KEY (id),
  CONSTRAINT medical_expenses_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT medical_expenses_provider_entity_id_fkey FOREIGN KEY (provider_entity_id) REFERENCES public.entities(id)
);
CREATE TABLE public.note_attachments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  note_id uuid NOT NULL,
  file_url text NOT NULL,
  file_name text,
  mime_type text,
  uploaded_at timestamp with time zone DEFAULT now(),
  CONSTRAINT note_attachments_pkey PRIMARY KEY (id),
  CONSTRAINT note_attachments_note_fk FOREIGN KEY (note_id) REFERENCES public.notes(id)
);
CREATE TABLE public.notes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid,
  entity_id uuid,
  source_table text,
  source_id uuid,
  title text,
  note text NOT NULL,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  CONSTRAINT notes_pkey PRIMARY KEY (id),
  CONSTRAINT notes_patient_fk FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT notes_entity_fk FOREIGN KEY (entity_id) REFERENCES public.entities(id),
  CONSTRAINT notes_created_by_fk FOREIGN KEY (created_by) REFERENCES auth.users(id)
);
CREATE TABLE public.patient_answers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL,
  question_id uuid,
  custom_question_text text,
  question_type text NOT NULL CHECK (question_type = ANY (ARRAY['boolean'::text, 'text'::text, 'other'::text])),
  answer_boolean boolean,
  answer_text text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patient_answers_pkey PRIMARY KEY (id),
  CONSTRAINT patient_answers_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT patient_answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id)
);
CREATE TABLE public.patient_appointments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL,
  appointment_date timestamp with time zone NOT NULL,
  physician_entity_id uuid,
  provider_entity_id uuid,
  reason_for_visit text,
  questions_to_ask text,
  example_notes text,
  next_appointment_date date,
  status text DEFAULT 'scheduled'::text CHECK (status = ANY (ARRAY['scheduled'::text, 'completed'::text, 'cancelled'::text])),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patient_appointments_pkey PRIMARY KEY (id),
  CONSTRAINT patient_appointments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT patient_appointments_physician_entity_id_fkey FOREIGN KEY (physician_entity_id) REFERENCES public.entities(id),
  CONSTRAINT patient_appointments_provider_entity_id_fkey FOREIGN KEY (provider_entity_id) REFERENCES public.entities(id)
);
CREATE TABLE public.patient_care_team (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid,
  role_category text CHECK (role_category = ANY (ARRAY['primary'::text, 'specialist'::text, 'therapist'::text, 'other'::text])),
  is_active boolean DEFAULT true,
  start_date date,
  end_date date,
  created_at timestamp with time zone DEFAULT now(),
  provider_entity_id uuid,
  CONSTRAINT patient_care_team_pkey PRIMARY KEY (id),
  CONSTRAINT patient_care_team_provider_fk FOREIGN KEY (provider_entity_id) REFERENCES public.entities(id),
  CONSTRAINT patient_care_team_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id)
);
CREATE TABLE public.patient_equipment (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  date_received date NOT NULL,
  date_prescribed date,
  manufacturer text,
  model_number text,
  serial_number text UNIQUE,
  size text,
  prescribed_by_id uuid,
  reason_prescribed text NOT NULL,
  notes text,
  warranty_expiration date,
  maintenance_due_date date,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  status USER-DEFINED DEFAULT 'active'::equipment_status,
  deleted_at timestamp with time zone,
  supplier_id uuid,
  CONSTRAINT patient_equipment_pkey PRIMARY KEY (id),
  CONSTRAINT patient_equipment_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id)
);
CREATE TABLE public.patient_events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL,
  event_type_id uuid,
  title text,
  description text,
  event_date timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  location text,
  status text DEFAULT 'scheduled'::text,
  duration_minutes integer,
  outcome text,
  physician_entity_id uuid,
  organization_entity_id uuid,
  reason text,
  notes text,
  date_from timestamp with time zone,
  date_to timestamp with time zone,
  deleted_at timestamp with time zone,
  CONSTRAINT patient_events_pkey PRIMARY KEY (id),
  CONSTRAINT patient_events_patient_fk FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT patient_events_physician_fk FOREIGN KEY (physician_entity_id) REFERENCES public.entities(id),
  CONSTRAINT patient_events_org_fk FOREIGN KEY (organization_entity_id) REFERENCES public.entities(id)
);
CREATE TABLE public.patient_growth (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL,
  recorded_date date NOT NULL,
  height numeric,
  weight numeric,
  head_circumference numeric,
  checked_by_entity_id uuid,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patient_growth_pkey PRIMARY KEY (id),
  CONSTRAINT patient_growth_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT patient_growth_checked_by_entity_id_fkey FOREIGN KEY (checked_by_entity_id) REFERENCES public.entities(id)
);
CREATE TABLE public.patient_nutrition (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL,
  date timestamp with time zone NOT NULL DEFAULT now(),
  feeding_method text CHECK (feeding_method = ANY (ARRAY['mouth'::text, 'gtube'::text, 'ng'::text, 'nj'::text, 'other'::text])),
  food_item text NOT NULL,
  amount text,
  notes text,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patient_nutrition_pkey PRIMARY KEY (id),
  CONSTRAINT patient_nutrition_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT patient_nutrition_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id)
);
CREATE TABLE public.patient_profile_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid,
  category text NOT NULL,
  value text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patient_profile_items_pkey PRIMARY KEY (id),
  CONSTRAINT patient_profile_items_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id)
);
CREATE TABLE public.patient_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL UNIQUE,
  introduction_text text,
  custom_sections jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patient_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT patient_profiles_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id)
);
CREATE TABLE public.patient_supplies (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  item_number text,
  quantity integer NOT NULL CHECK (quantity >= 0),
  date_ordered date NOT NULL,
  date_received date,
  quantity_back_ordered integer DEFAULT 0 CHECK (quantity_back_ordered >= 0),
  schedule text CHECK (schedule = ANY (ARRAY['daily'::text, 'weekly'::text, 'monthly'::text, 'quarterly'::text, 'as_needed'::text, 'one_time'::text, NULL::text])),
  comments text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  status USER-DEFINED DEFAULT 'pending'::supply_status,
  deleted_at timestamp with time zone,
  organization_id uuid,
  CONSTRAINT patient_supplies_pkey PRIMARY KEY (id),
  CONSTRAINT patient_supplies_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id)
);
CREATE TABLE public.patient_tests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL,
  test_type text NOT NULL,
  description text,
  ordered_by_entity_id uuid,
  location_entity_id uuid,
  ordered_date date,
  test_date date,
  results text,
  comments text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patient_tests_pkey PRIMARY KEY (id),
  CONSTRAINT patient_tests_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT patient_tests_ordered_by_entity_id_fkey FOREIGN KEY (ordered_by_entity_id) REFERENCES public.entities(id),
  CONSTRAINT patient_tests_location_entity_id_fkey FOREIGN KEY (location_entity_id) REFERENCES public.entities(id)
);
CREATE TABLE public.patient_timeline (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL,
  event_date timestamp with time zone NOT NULL,
  source_table text NOT NULL,
  source_id uuid NOT NULL,
  title text,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT patient_timeline_pkey PRIMARY KEY (id),
  CONSTRAINT patient_timeline_patient_fk FOREIGN KEY (patient_id) REFERENCES public.patients(id)
);
CREATE TABLE public.patients (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  group_id uuid NOT NULL UNIQUE,
  user_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  patient_type text,
  date_of_birth date,
  blood_type text CHECK (blood_type = ANY (ARRAY['A+'::text, 'A-'::text, 'B+'::text, 'B-'::text, 'AB+'::text, 'AB-'::text, 'O+'::text, 'O-'::text, 'Unknown'::text])),
  language text,
  interpreter_needed boolean DEFAULT false,
  address_id uuid,
  person_id uuid,
  ssn_last4 text,
  CONSTRAINT patients_pkey PRIMARY KEY (id),
  CONSTRAINT patients_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id),
  CONSTRAINT patients_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT patients_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.addresses(id)
);
CREATE TABLE public.prescriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL,
  medication text NOT NULL,
  dosage text NOT NULL,
  frequency text NOT NULL,
  duration text,
  route text,
  possible_side_effects text,
  instructions text,
  pharmacy_notes text,
  active boolean NOT NULL DEFAULT true,
  start_date date NOT NULL DEFAULT CURRENT_DATE,
  end_date date,
  prescribed_date date,
  status text DEFAULT 'active'::text,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  prescribing_entity_id uuid,
  reason text,
  pharmacy_entity_id uuid,
  prescribing_physician_id uuid,
  CONSTRAINT prescriptions_pkey PRIMARY KEY (id),
  CONSTRAINT prescriptions_entity_fk FOREIGN KEY (prescribing_entity_id) REFERENCES public.entities(id),
  CONSTRAINT prescriptions_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id),
  CONSTRAINT prescriptions_pharmacy_entity_fk FOREIGN KEY (pharmacy_entity_id) REFERENCES public.entities(id),
  CONSTRAINT prescriptions_physician_entity_fk FOREIGN KEY (prescribing_physician_id) REFERENCES public.entities(id)
);
CREATE TABLE public.questions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  question_type text NOT NULL CHECK (question_type = ANY (ARRAY['boolean'::text, 'text'::text, 'other'::text])),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT questions_pkey PRIMARY KEY (id)
);
CREATE TABLE public.tags (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT tags_pkey PRIMARY KEY (id)
);