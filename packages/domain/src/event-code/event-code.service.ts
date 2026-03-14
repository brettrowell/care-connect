import { eventCodeInsertSchema } from "./schema.zod";
import type { EventCodeInsert } from "./types";

export function parseEventCodeInsert(input: unknown): EventCodeInsert {
  return eventCodeInsertSchema.parse(input);
}
