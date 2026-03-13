import { patientSupplyInsertSchema } from "./schema.zod";
import type { PatientSupplyInsert } from "./types";

export function parsePatientSupplyInsert(input: unknown): PatientSupplyInsert {
  return patientSupplyInsertSchema.parse(input);
}
