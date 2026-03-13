import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const patientEventRowSchema = z.object({
  id: uuid,
  patient_id: uuid,
  event_type_id: uuid.nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  event_date: isoDateTime.nullable(),
  created_at: isoDateTime.nullable(),
  location: z.string().nullable(),
  status: z.string().nullable(),
  duration_minutes: z.number().int().nullable(),
  outcome: z.string().nullable(),
  physician_entity_id: uuid.nullable(),
  organization_entity_id: uuid.nullable(),
  reason: z.string().nullable(),
  notes: z.string().nullable(),
  date_from: isoDateTime.nullable(),
  date_to: isoDateTime.nullable(),
  deleted_at: isoDateTime.nullable()
});

export const patientEventInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid,
  event_type_id: uuid.nullable().optional(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  event_date: isoDateTime.nullable().optional(),
  created_at: isoDateTime.nullable().optional(),
  location: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  duration_minutes: z.number().int().nullable().optional(),
  outcome: z.string().nullable().optional(),
  physician_entity_id: uuid.nullable().optional(),
  organization_entity_id: uuid.nullable().optional(),
  reason: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  date_from: isoDateTime.nullable().optional(),
  date_to: isoDateTime.nullable().optional(),
  deleted_at: isoDateTime.nullable().optional()
});

export const patientEventUpdateSchema = patientEventInsertSchema.partial();
