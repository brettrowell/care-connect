import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const addressRowSchema = z.object({
  id: uuid,
  address_line1: z.string().nullable(),
  address_line2: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  zip: z.string().nullable(),
  country: z.string().nullable(),
  created_at: isoDateTime.nullable(),
  entity_id: uuid.nullable()
});

export const addressInsertSchema = z.object({
  id: uuid.optional(),
  address_line1: z.string().nullable().optional(),
  address_line2: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  zip: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  created_at: isoDateTime.nullable().optional(),
  entity_id: uuid.nullable().optional()
});

export const addressUpdateSchema = addressInsertSchema.partial();
