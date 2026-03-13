import { noteAttachmentInsertSchema } from "./schema.zod";
import type { NoteAttachmentInsert } from "./types";

export function parseNoteAttachmentInsert(input: unknown): NoteAttachmentInsert {
  return noteAttachmentInsertSchema.parse(input);
}
