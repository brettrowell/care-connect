import { z } from "zod";
import { uuid } from "../shared/schema.zod";

export const entityTypeRowSchema = z.object({
  id: uuid,
  name: z.string()
});

export const entityTypeInsertSchema = z.object({
  id: uuid.optional(),
  name: z.string()
});

export const entityTypeUpdateSchema = entityTypeInsertSchema.partial();
