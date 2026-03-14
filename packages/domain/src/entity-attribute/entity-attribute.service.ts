import { entityAttributeInsertSchema } from "./schema.zod";
import type { EntityAttributeInsert } from "./types";

export function parseEntityAttributeInsert(input: unknown): EntityAttributeInsert {
  return entityAttributeInsertSchema.parse(input);
}
