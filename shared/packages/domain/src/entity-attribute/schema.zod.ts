import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const entityAttributeRowSchema = z.object({
  id: uuid,
  entity_id: uuid,
  attribute_name: z.string(),
  attribute_value: z.string().nullable(),
  created_at: isoDateTime.nullable()
});

export const entityAttributeInsertSchema = z.object({
  id: uuid.optional(),
  entity_id: uuid,
  attribute_name: z.string(),
  attribute_value: z.string().nullable().optional(),
  created_at: isoDateTime.nullable().optional()
});

export const entityAttributeUpdateSchema = entityAttributeInsertSchema.partial();
