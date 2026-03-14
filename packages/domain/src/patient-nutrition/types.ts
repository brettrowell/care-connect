import type { Database } from "@care-connect/db";

export type PatientNutritionRow = Database["public"]["Tables"]["patient_nutrition"]["Row"];
export type PatientNutritionInsert = Database["public"]["Tables"]["patient_nutrition"]["Insert"];
export type PatientNutritionUpdate = Database["public"]["Tables"]["patient_nutrition"]["Update"];
export type PatientNutritionId = PatientNutritionRow["id"];
