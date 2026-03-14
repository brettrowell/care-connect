import { entityTagInsertSchema } from "./schema.zod";
import type { EntityTagInsert } from "./types";

export function parseEntityTagInsert(input: unknown): EntityTagInsert {
  return entityTagInsertSchema.parse(input);
}
