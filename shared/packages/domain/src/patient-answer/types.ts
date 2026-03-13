import type { Database } from "@care-connect/db";

export type PatientAnswerRow = Database["public"]["Tables"]["patient_answers"]["Row"];
export type PatientAnswerInsert = Database["public"]["Tables"]["patient_answers"]["Insert"];
export type PatientAnswerUpdate = Database["public"]["Tables"]["patient_answers"]["Update"];
export type PatientAnswerId = PatientAnswerRow["id"];
