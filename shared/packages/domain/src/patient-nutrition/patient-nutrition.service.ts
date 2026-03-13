import { patientNutritionInsertSchema } from "./schema.zod";
import type { PatientNutritionInsert } from "./types";

export function parsePatientNutritionInsert(input: unknown): PatientNutritionInsert {
  return patientNutritionInsertSchema.parse(input);
}
