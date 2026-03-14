import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const noteRowSchema = z.object({
  id: uuid,
  patient_id: uuid.nullable(),
  entity_id: uuid.nullable(),
  source_table: z.string().nullable(),
  source_id: uuid.nullable(),
  title: z.string().nullable(),
  note: z.string(),
  created_by: uuid.nullable(),
  created_at: isoDateTime.nullable(),
  updated_at: isoDateTime.nullable(),
  deleted_at: isoDateTime.nullable()
});

export const noteInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid.nullable().optional(),
  entity_id: uuid.nullable().optional(),
  source_table: z.string().nullable().optional(),
  source_id: uuid.nullable().optional(),
  title: z.string().nullable().optional(),
  note: z.string(),
  created_by: uuid.nullable().optional(),
  created_at: isoDateTime.nullable().optional(),
  updated_at: isoDateTime.nullable().optional(),
  deleted_at: isoDateTime.nullable().optional()
});

export const noteUpdateSchema = noteInsertSchema.partial();
