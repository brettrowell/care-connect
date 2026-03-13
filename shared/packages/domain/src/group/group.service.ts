import { groupInsertSchema } from "./schema.zod";
import type { GroupInsert } from "./types";

export function parseGroupInsert(input: unknown): GroupInsert {
  return groupInsertSchema.parse(input);
}
