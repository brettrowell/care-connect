import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const familySupportRowSchema = z.object({
  id: uuid,
  patient_id: uuid,
  support_type: z.enum(["support_group", "religious", "counseling", "respite", "other"]),
  website: z.string().nullable(),
  created_at: isoDateTime.nullable(),
  updated_at: isoDateTime.nullable(),
  address_id: uuid.nullable(),
  organization_entity_id: uuid.nullable()
});

export const familySupportInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid,
  support_type: z.enum(["support_group", "religious", "counseling", "respite", "other"]),
  website: z.string().nullable().optional(),
  created_at: isoDateTime.nullable().optional(),
  updated_at: isoDateTime.nullable().optional(),
  address_id: uuid.nullable().optional(),
  organization_entity_id: uuid.nullable().optional()
});

export const familySupportUpdateSchema = familySupportInsertSchema.partial();
