import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const patientProfileRowSchema = z.object({
  id: uuid,
  patient_id: uuid,
  introduction_text: z.string().nullable(),
  custom_sections: z.unknown().nullable(),
  created_at: isoDateTime.nullable(),
  updated_at: isoDateTime.nullable()
});

export const patientProfileInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid,
  introduction_text: z.string().nullable().optional(),
  custom_sections: z.unknown().nullable().optional(),
  created_at: isoDateTime.nullable().optional(),
  updated_at: isoDateTime.nullable().optional()
});

export const patientProfileUpdateSchema = patientProfileInsertSchema.partial();
