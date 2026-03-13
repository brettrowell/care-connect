import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const entityRelationshipRowSchema = z.object({
  id: uuid,
  entity_id: uuid,
  related_entity_id: uuid,
  relationship_type: z.string(),
  created_at: isoDateTime.nullable()
});

export const entityRelationshipInsertSchema = z.object({
  id: uuid.optional(),
  entity_id: uuid,
  related_entity_id: uuid,
  relationship_type: z.string(),
  created_at: isoDateTime.nullable().optional()
});

export const entityRelationshipUpdateSchema = entityRelationshipInsertSchema.partial();
