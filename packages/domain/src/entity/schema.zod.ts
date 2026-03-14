import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const entityRowSchema = z.object({
  id: uuid,
  entity_type: z.string(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  created_at: isoDateTime.nullable(),
  updated_at: isoDateTime.nullable(),
  entity_type_id: uuid.nullable(),
  deleted_at: isoDateTime.nullable()
});

export const entityInsertSchema = z.object({
  id: uuid.optional(),
  entity_type: z.string(),
  name: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  created_at: isoDateTime.nullable().optional(),
  updated_at: isoDateTime.nullable().optional(),
  entity_type_id: uuid.nullable().optional(),
  deleted_at: isoDateTime.nullable().optional()
});

export const entityUpdateSchema = entityInsertSchema.partial();
