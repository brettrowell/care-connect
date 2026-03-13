import { patientEventInsertSchema } from "./schema.zod";
import type { PatientEventInsert } from "./types";

export function parsePatientEventInsert(input: unknown): PatientEventInsert {
  return patientEventInsertSchema.parse(input);
}
