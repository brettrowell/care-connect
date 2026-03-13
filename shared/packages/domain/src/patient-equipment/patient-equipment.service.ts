import { patientEquipmentInsertSchema } from "./schema.zod";
import type { PatientEquipmentInsert } from "./types";

export function parsePatientEquipmentInsert(input: unknown): PatientEquipmentInsert {
  return patientEquipmentInsertSchema.parse(input);
}
