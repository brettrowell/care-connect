import { z } from "zod";
import { isoDate, isoDateTime, uuid } from "../shared/schema.zod";

export const patientGrowthRowSchema = z.object({
  id: uuid,
  patient_id: uuid,
  recorded_date: isoDate,
  height: z.number().nullable(),
  weight: z.number().nullable(),
  head_circumference: z.number().nullable(),
  checked_by_entity_id: uuid.nullable(),
  notes: z.string().nullable(),
  created_at: isoDateTime.nullable()
});

export const patientGrowthInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid,
  recorded_date: isoDate,
  height: z.number().nullable().optional(),
  weight: z.number().nullable().optional(),
  head_circumference: z.number().nullable().optional(),
  checked_by_entity_id: uuid.nullable().optional(),
  notes: z.string().nullable().optional(),
  created_at: isoDateTime.nullable().optional()
});

export const patientGrowthUpdateSchema = patientGrowthInsertSchema.partial();
