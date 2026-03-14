import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const patientNutritionRowSchema = z.object({
  id: uuid,
  patient_id: uuid,
  date: isoDateTime,
  feeding_method: z.enum(["mouth", "gtube", "ng", "nj", "other"]).nullable(),
  food_item: z.string(),
  amount: z.string().nullable(),
  notes: z.string().nullable(),
  created_by: uuid.nullable(),
  created_at: isoDateTime.nullable()
});

export const patientNutritionInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid,
  date: isoDateTime.optional(),
  feeding_method: z.enum(["mouth", "gtube", "ng", "nj", "other"]).nullable().optional(),
  food_item: z.string(),
  amount: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  created_by: uuid.nullable().optional(),
  created_at: isoDateTime.nullable().optional()
});

export const patientNutritionUpdateSchema = patientNutritionInsertSchema.partial();
