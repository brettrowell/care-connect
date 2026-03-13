import { tagInsertSchema } from "./schema.zod";
import type { TagInsert } from "./types";

export function parseTagInsert(input: unknown): TagInsert {
  return tagInsertSchema.parse(input);
}
