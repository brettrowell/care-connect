import type { Database } from "@care-connect/db";

export type PatientProfileRow = Database["public"]["Tables"]["patient_profiles"]["Row"];
export type PatientProfileInsert = Database["public"]["Tables"]["patient_profiles"]["Insert"];
export type PatientProfileUpdate = Database["public"]["Tables"]["patient_profiles"]["Update"];
export type PatientProfileId = PatientProfileRow["id"];
