import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const entityTagRowSchema = z.object({
  id: uuid,
  tag_id: uuid,
  entity_id: uuid,
  created_at: isoDateTime.nullable()
});

export const entityTagInsertSchema = z.object({
  id: uuid.optional(),
  tag_id: uuid,
  entity_id: uuid,
  created_at: isoDateTime.nullable().optional()
});

export const entityTagUpdateSchema = entityTagInsertSchema.partial();
