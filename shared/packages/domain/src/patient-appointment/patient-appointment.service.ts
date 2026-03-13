import { patientAppointmentInsertSchema } from "./schema.zod";
import type { PatientAppointmentInsert } from "./types";

export function parsePatientAppointmentInsert(input: unknown): PatientAppointmentInsert {
  return patientAppointmentInsertSchema.parse(input);
}
