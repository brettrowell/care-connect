import type { Database } from "@care-connect/db";

export type PatientGrowthRow = Database["public"]["Tables"]["patient_growth"]["Row"];
export type PatientGrowthInsert = Database["public"]["Tables"]["patient_growth"]["Insert"];
export type PatientGrowthUpdate = Database["public"]["Tables"]["patient_growth"]["Update"];
export type PatientGrowthId = PatientGrowthRow["id"];
