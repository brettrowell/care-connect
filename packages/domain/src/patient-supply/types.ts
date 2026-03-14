import type { Database } from "@care-connect/db";

export type PatientSupplyRow = Database["public"]["Tables"]["patient_supplies"]["Row"];
export type PatientSupplyInsert = Database["public"]["Tables"]["patient_supplies"]["Insert"];
export type PatientSupplyUpdate = Database["public"]["Tables"]["patient_supplies"]["Update"];
export type PatientSupplyId = PatientSupplyRow["id"];
