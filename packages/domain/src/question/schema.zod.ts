import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const questionRowSchema = z.object({
  id: uuid,
  question_text: z.string(),
  question_type: z.enum(["boolean", "text", "other"]),
  created_at: isoDateTime.nullable()
});

export const questionInsertSchema = z.object({
  id: uuid.optional(),
  question_text: z.string(),
  question_type: z.enum(["boolean", "text", "other"]),
  created_at: isoDateTime.nullable().optional()
});

export const questionUpdateSchema = questionInsertSchema.partial();
