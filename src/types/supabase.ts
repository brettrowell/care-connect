export type MembershipRole = 'owner' | 'guardian' | 'provider' | 'caregiver' | 'family';

export interface Group {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Membership {
  id: string;
  group_id: string;
  user_id: string;
  role: MembershipRole;
  created_at: string;
  groups?: Group;
}

export interface Patient {
  id: string;
  group_id: string;
  display_name: string;
  date_of_birth: string | null;
  created_at: string;
  updated_at: string;
}

export interface CommunicationCue {
  cue: string;
  meaning: string;
}

export interface PatientProfile {
  id: string;
  patient_id: string;
  diagnoses: string[] | null;
  communication_dictionary: CommunicationCue[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type DailyEventType =
  | 'feeding'
  | 'med_given'
  | 'seizure'
  | 'vomit'
  | 'custom'
  | 'therapy'
  | 'diaper'
  | 'other';

export interface PatientDailyEvent {
  id: string;
  patient_id: string;
  type: DailyEventType;
  occurred_at: string;
  data: Record<string, unknown>;
  notes: string | null;
  media_urls: string[];
  consumed_supply_id: string | null;
  created_by: string | null;
  created_at: string;
}

export interface PatientSupply {
  id: string;
  patient_id: string;
  name: string;
  current_quantity: number;
  unit: string;
  reorder_threshold: number;
  created_at: string;
  updated_at: string;
}

export interface EmergencyStep {
  order: number;
  text: string;
}

export interface Emergency {
  id: string;
  patient_id: string;
  title: string;
  steps: EmergencyStep[];
  baselines: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface HandoffToken {
  id: string;
  patient_id: string;
  token: string;
  expires_at: string;
  created_by: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      groups: { Row: Group; Insert: Omit<Group, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Group> };
      memberships: { Row: Membership; Insert: Omit<Membership, 'id' | 'created_at'>; Update: Partial<Membership> };
      patients: { Row: Patient; Insert: Omit<Patient, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Patient> };
      patient_profiles: { Row: PatientProfile; Insert: Omit<PatientProfile, 'id' | 'created_at' | 'updated_at'>; Update: Partial<PatientProfile> };
      patient_daily_events: { Row: PatientDailyEvent; Insert: Omit<PatientDailyEvent, 'id' | 'created_at'>; Update: Partial<PatientDailyEvent> };
      patient_supplies: { Row: PatientSupply; Insert: Omit<PatientSupply, 'id' | 'created_at' | 'updated_at'>; Update: Partial<PatientSupply> };
      emergencies: { Row: Emergency; Insert: Omit<Emergency, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Emergency> };
      handoff_tokens: { Row: HandoffToken; Insert: Omit<HandoffToken, 'id' | 'created_at'>; Update: Partial<HandoffToken> };
    };
  };
}
