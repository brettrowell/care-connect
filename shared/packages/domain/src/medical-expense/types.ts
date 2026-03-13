import type { Database } from "@care-connect/db";

export type MedicalExpenseRow = Database["public"]["Tables"]["medical_expenses"]["Row"];
export type MedicalExpenseInsert = Database["public"]["Tables"]["medical_expenses"]["Insert"];
export type MedicalExpenseUpdate = Database["public"]["Tables"]["medical_expenses"]["Update"];
export type MedicalExpenseId = MedicalExpenseRow["id"];
