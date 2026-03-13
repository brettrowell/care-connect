import { patientInsertSchema } from "./schema.zod";
import type { PatientInsert } from "./types";

export function parsePatientInsert(input: unknown): PatientInsert {
  return patientInsertSchema.parse(input);
}
