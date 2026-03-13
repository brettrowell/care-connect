import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const noteAttachmentRowSchema = z.object({
  id: uuid,
  note_id: uuid,
  file_url: z.string(),
  file_name: z.string().nullable(),
  mime_type: z.string().nullable(),
  uploaded_at: isoDateTime.nullable()
});

export const noteAttachmentInsertSchema = z.object({
  id: uuid.optional(),
  note_id: uuid,
  file_url: z.string(),
  file_name: z.string().nullable().optional(),
  mime_type: z.string().nullable().optional(),
  uploaded_at: isoDateTime.nullable().optional()
});

export const noteAttachmentUpdateSchema = noteAttachmentInsertSchema.partial();
