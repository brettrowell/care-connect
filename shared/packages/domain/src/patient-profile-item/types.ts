import type { Database } from "@care-connect/db";

export type PatientProfileItemRow = Database["public"]["Tables"]["patient_profile_items"]["Row"];
export type PatientProfileItemInsert = Database["public"]["Tables"]["patient_profile_items"]["Insert"];
export type PatientProfileItemUpdate = Database["public"]["Tables"]["patient_profile_items"]["Update"];
export type PatientProfileItemId = PatientProfileItemRow["id"];
