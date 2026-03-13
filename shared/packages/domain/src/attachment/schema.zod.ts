import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const attachmentRowSchema = z.object({
  id: uuid,
  storage_path: z.string(),
  file_name: z.string().nullable(),
  mime_type: z.string().nullable(),
  file_size: z.number().int().nullable(),
  uploaded_by: uuid.nullable(),
  attached_type: z.string(),
  attached_id: uuid,
  created_at: isoDateTime.nullable()
});

export const attachmentInsertSchema = z.object({
  id: uuid.optional(),
  storage_path: z.string(),
  file_name: z.string().nullable().optional(),
  mime_type: z.string().nullable().optional(),
  file_size: z.number().int().nullable().optional(),
  uploaded_by: uuid.nullable().optional(),
  attached_type: z.string(),
  attached_id: uuid,
  created_at: isoDateTime.nullable().optional()
});

export const attachmentUpdateSchema = attachmentInsertSchema.partial();
