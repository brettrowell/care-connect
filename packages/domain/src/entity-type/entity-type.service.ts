import { entityTypeInsertSchema } from "./schema.zod";
import type { EntityTypeInsert } from "./types";

export function parseEntityTypeInsert(input: unknown): EntityTypeInsert {
  return entityTypeInsertSchema.parse(input);
}
