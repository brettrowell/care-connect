import { z } from "zod";
import { isoDate, isoDateTime, uuid } from "../shared/schema.zod";

export const patientTestRowSchema = z.object({
  id: uuid,
  patient_id: uuid,
  test_type: z.string(),
  description: z.string().nullable(),
  ordered_by_entity_id: uuid.nullable(),
  location_entity_id: uuid.nullable(),
  ordered_date: isoDate.nullable(),
  test_date: isoDate.nullable(),
  results: z.string().nullable(),
  comments: z.string().nullable(),
  created_at: isoDateTime.nullable()
});

export const patientTestInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid,
  test_type: z.string(),
  description: z.string().nullable().optional(),
  ordered_by_entity_id: uuid.nullable().optional(),
  location_entity_id: uuid.nullable().optional(),
  ordered_date: isoDate.nullable().optional(),
  test_date: isoDate.nullable().optional(),
  results: z.string().nullable().optional(),
  comments: z.string().nullable().optional(),
  created_at: isoDateTime.nullable().optional()
});

export const patientTestUpdateSchema = patientTestInsertSchema.partial();
