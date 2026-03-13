import { patientTestInsertSchema } from "./schema.zod";
import type { PatientTestInsert } from "./types";

export function parsePatientTestInsert(input: unknown): PatientTestInsert {
  return patientTestInsertSchema.parse(input);
}
