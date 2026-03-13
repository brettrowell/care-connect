import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const clinicalCodeRowSchema = z.object({
  id: uuid,
  code: z.string(),
  code_system: z.string(),
  description: z.string().nullable(),
  created_at: isoDateTime.nullable()
});

export const clinicalCodeInsertSchema = z.object({
  id: uuid.optional(),
  code: z.string(),
  code_system: z.string(),
  description: z.string().nullable().optional(),
  created_at: isoDateTime.nullable().optional()
});

export const clinicalCodeUpdateSchema = clinicalCodeInsertSchema.partial();
