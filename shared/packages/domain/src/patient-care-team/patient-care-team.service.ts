import { patientCareTeamInsertSchema } from "./schema.zod";
import type { PatientCareTeamInsert } from "./types";

export function parsePatientCareTeamInsert(input: unknown): PatientCareTeamInsert {
  return patientCareTeamInsertSchema.parse(input);
}
