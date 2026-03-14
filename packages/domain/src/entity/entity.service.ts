import { entityInsertSchema } from "./schema.zod";
import type { EntityInsert } from "./types";

export function parseEntityInsert(input: unknown): EntityInsert {
  return entityInsertSchema.parse(input);
}
