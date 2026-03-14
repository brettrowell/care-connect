import { eventTypeInsertSchema } from "./schema.zod";
import type { EventTypeInsert } from "./types";

export function parseEventTypeInsert(input: unknown): EventTypeInsert {
  return eventTypeInsertSchema.parse(input);
}
