import { z } from "zod";
import { isoDate, isoDateTime, uuid } from "../shared/schema.zod";

export const diagnosisRowSchema = z.object({
  id: uuid,
  patient_id: uuid,
  diagnosis_text: z.string(),
  type: z.enum(["primary", "secondary", "tertiary", "other"]),
  notes: z.string().nullable(),
  onset_date: isoDate.nullable(),
  created_at: isoDateTime.nullable(),
  updated_at: isoDateTime.nullable(),
  deleted_at: isoDateTime.nullable()
});

export const diagnosisInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid,
  diagnosis_text: z.string(),
  type: z.enum(["primary", "secondary", "tertiary", "other"]),
  notes: z.string().nullable().optional(),
  onset_date: isoDate.nullable().optional(),
  created_at: isoDateTime.nullable().optional(),
  updated_at: isoDateTime.nullable().optional(),
  deleted_at: isoDateTime.nullable().optional()
});

export const diagnosisUpdateSchema = diagnosisInsertSchema.partial();
