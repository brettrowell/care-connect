import type { Database } from "@care-connect/db";

export type PatientEventRow = Database["public"]["Tables"]["patient_events"]["Row"];
export type PatientEventInsert = Database["public"]["Tables"]["patient_events"]["Insert"];
export type PatientEventUpdate = Database["public"]["Tables"]["patient_events"]["Update"];
export type PatientEventId = PatientEventRow["id"];
