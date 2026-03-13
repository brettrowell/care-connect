import { patientAnswerInsertSchema } from "./schema.zod";
import type { PatientAnswerInsert } from "./types";

export function parsePatientAnswerInsert(input: unknown): PatientAnswerInsert {
  return patientAnswerInsertSchema.parse(input);
}
