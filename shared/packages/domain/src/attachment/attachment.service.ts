import { attachmentInsertSchema } from "./schema.zod";
import type { AttachmentInsert } from "./types";

export function parseAttachmentInsert(input: unknown): AttachmentInsert {
  return attachmentInsertSchema.parse(input);
}
