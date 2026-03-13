import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const patientProfileItemRowSchema = z.object({
  id: uuid,
  patient_id: uuid.nullable(),
  category: z.string(),
  value: z.string(),
  created_at: isoDateTime.nullable()
});

export const patientProfileItemInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid.nullable().optional(),
  category: z.string(),
  value: z.string(),
  created_at: isoDateTime.nullable().optional()
});

export const patientProfileItemUpdateSchema = patientProfileItemInsertSchema.partial();
