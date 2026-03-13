import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const tagRowSchema = z.object({
  id: uuid,
  name: z.string(),
  created_at: isoDateTime.nullable()
});

export const tagInsertSchema = z.object({
  id: uuid.optional(),
  name: z.string(),
  created_at: isoDateTime.nullable().optional()
});

export const tagUpdateSchema = tagInsertSchema.partial();
