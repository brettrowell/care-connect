import { z } from "zod";
import { isoDate, isoDateTime, uuid } from "../shared/schema.zod";

export const patientAppointmentRowSchema = z.object({
  id: uuid,
  patient_id: uuid,
  appointment_date: isoDateTime,
  physician_entity_id: uuid.nullable(),
  provider_entity_id: uuid.nullable(),
  reason_for_visit: z.string().nullable(),
  questions_to_ask: z.string().nullable(),
  example_notes: z.string().nullable(),
  next_appointment_date: isoDate.nullable(),
  status: z.enum(["scheduled", "completed", "cancelled"]).nullable(),
  created_at: isoDateTime.nullable()
});

export const patientAppointmentInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid,
  appointment_date: isoDateTime,
  physician_entity_id: uuid.nullable().optional(),
  provider_entity_id: uuid.nullable().optional(),
  reason_for_visit: z.string().nullable().optional(),
  questions_to_ask: z.string().nullable().optional(),
  example_notes: z.string().nullable().optional(),
  next_appointment_date: isoDate.nullable().optional(),
  status: z.enum(["scheduled", "completed", "cancelled"]).nullable().optional(),
  created_at: isoDateTime.nullable().optional()
});

export const patientAppointmentUpdateSchema = patientAppointmentInsertSchema.partial();
