import { patientProfileItemInsertSchema } from "./schema.zod";
import type { PatientProfileItemInsert } from "./types";

export function parsePatientProfileItemInsert(
  input: unknown
): PatientProfileItemInsert {
  return patientProfileItemInsertSchema.parse(input);
}
