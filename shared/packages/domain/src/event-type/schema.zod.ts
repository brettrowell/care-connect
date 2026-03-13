import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const eventTypeRowSchema = z.object({
  id: uuid,
  name: z.string(),
  description: z.string().nullable(),
  category: z.string().nullable(),
  created_at: isoDateTime.nullable()
});

export const eventTypeInsertSchema = z.object({
  id: uuid.optional(),
  name: z.string(),
  description: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  created_at: isoDateTime.nullable().optional()
});

export const eventTypeUpdateSchema = eventTypeInsertSchema.partial();
