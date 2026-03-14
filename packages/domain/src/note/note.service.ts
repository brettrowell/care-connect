import { noteInsertSchema } from "./schema.zod";
import type { NoteInsert } from "./types";

export function parseNoteInsert(input: unknown): NoteInsert {
  return noteInsertSchema.parse(input);
}
