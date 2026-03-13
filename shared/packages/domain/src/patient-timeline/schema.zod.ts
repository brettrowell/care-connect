import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const patientTimelineRowSchema = z.object({
  id: uuid,
  patient_id: uuid,
  event_date: isoDateTime,
  source_table: z.string(),
  source_id: uuid,
  title: z.string().nullable(),
  description: z.string().nullable(),
  created_at: isoDateTime.nullable()
});

export const patientTimelineInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid,
  event_date: isoDateTime,
  source_table: z.string(),
  source_id: uuid,
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  created_at: isoDateTime.nullable().optional()
});

export const patientTimelineUpdateSchema = patientTimelineInsertSchema.partial();
