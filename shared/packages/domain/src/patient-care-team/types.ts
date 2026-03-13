import type { Database } from "@care-connect/db";

export type PatientCareTeamRow = Database["public"]["Tables"]["patient_care_team"]["Row"];
export type PatientCareTeamInsert = Database["public"]["Tables"]["patient_care_team"]["Insert"];
export type PatientCareTeamUpdate = Database["public"]["Tables"]["patient_care_team"]["Update"];
export type PatientCareTeamId = PatientCareTeamRow["id"];
