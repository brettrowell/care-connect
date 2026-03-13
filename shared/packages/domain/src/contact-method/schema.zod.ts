import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const contactMethodRowSchema = z.object({
  id: uuid,
  method_type: z.enum(["phone", "cell", "fax", "email", "website"]),
  value: z.string(),
  created_at: isoDateTime.nullable(),
  entity_id: uuid.nullable()
});

export const contactMethodInsertSchema = z.object({
  id: uuid.optional(),
  method_type: z.enum(["phone", "cell", "fax", "email", "website"]),
  value: z.string(),
  created_at: isoDateTime.nullable().optional(),
  entity_id: uuid.nullable().optional()
});

export const contactMethodUpdateSchema = contactMethodInsertSchema.partial();
