import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const groupRowSchema = z.object({
  id: uuid,
  owner_id: uuid.nullable(),
  name: z.string().nullable(),
  created_at: isoDateTime.nullable()
});

export const groupInsertSchema = z.object({
  id: uuid.optional(),
  owner_id: uuid.nullable().optional(),
  name: z.string().nullable().optional(),
  created_at: isoDateTime.nullable().optional()
});

export const groupUpdateSchema = groupInsertSchema;
