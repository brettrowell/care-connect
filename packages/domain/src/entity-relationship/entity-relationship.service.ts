import { entityRelationshipInsertSchema } from "./schema.zod";
import type { EntityRelationshipInsert } from "./types";

export function parseEntityRelationshipInsert(input: unknown): EntityRelationshipInsert {
  return entityRelationshipInsertSchema.parse(input);
}
