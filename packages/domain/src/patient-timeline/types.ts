import type { Database } from "@care-connect/db";

export type PatientTimelineRow = Database["public"]["Tables"]["patient_timeline"]["Row"];
export type PatientTimelineInsert = Database["public"]["Tables"]["patient_timeline"]["Insert"];
export type PatientTimelineUpdate = Database["public"]["Tables"]["patient_timeline"]["Update"];
export type PatientTimelineId = PatientTimelineRow["id"];
