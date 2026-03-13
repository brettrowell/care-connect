import { patientProfileInsertSchema } from "./schema.zod";
import type { PatientProfileInsert } from "./types";

export function parsePatientProfileInsert(input: unknown): PatientProfileInsert {
  return patientProfileInsertSchema.parse(input);
}
