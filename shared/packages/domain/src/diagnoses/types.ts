import type { Database } from "@care-connect/db";

export type DiagnosisRow = Database["public"]["Tables"]["diagnoses"]["Row"];
export type DiagnosisInsert = Database["public"]["Tables"]["diagnoses"]["Insert"];
export type DiagnosisUpdate = Database["public"]["Tables"]["diagnoses"]["Update"];
export type DiagnosisId = DiagnosisRow["id"];
