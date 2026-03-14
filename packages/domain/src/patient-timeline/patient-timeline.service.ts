import { patientTimelineInsertSchema } from "./schema.zod";
import type { PatientTimelineInsert } from "./types";

export function parsePatientTimelineInsert(input: unknown): PatientTimelineInsert {
  return patientTimelineInsertSchema.parse(input);
}
