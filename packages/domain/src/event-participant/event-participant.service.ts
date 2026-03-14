import { eventParticipantInsertSchema } from "./schema.zod";
import type { EventParticipantInsert } from "./types";

export function parseEventParticipantInsert(input: unknown): EventParticipantInsert {
  return eventParticipantInsertSchema.parse(input);
}
