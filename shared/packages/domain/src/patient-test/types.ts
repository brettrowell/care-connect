import type { Database } from "@care-connect/db";

export type PatientTestRow = Database["public"]["Tables"]["patient_tests"]["Row"];
export type PatientTestInsert = Database["public"]["Tables"]["patient_tests"]["Insert"];
export type PatientTestUpdate = Database["public"]["Tables"]["patient_tests"]["Update"];
export type PatientTestId = PatientTestRow["id"];
