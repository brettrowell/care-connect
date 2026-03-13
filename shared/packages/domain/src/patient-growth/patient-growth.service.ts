import { patientGrowthInsertSchema } from "./schema.zod";
import type { PatientGrowthInsert } from "./types";

export function parsePatientGrowthInsert(input: unknown): PatientGrowthInsert {
  return patientGrowthInsertSchema.parse(input);
}
