import { z } from "zod";
import { isoDate, isoDateTime, uuid } from "../shared/schema.zod";

export const medicalExpenseRowSchema = z.object({
  id: uuid,
  patient_id: uuid,
  expense_date: isoDate,
  provider_entity_id: uuid.nullable(),
  amount: z.number(),
  description: z.string().nullable(),
  paid_by: z.string().nullable(),
  created_at: isoDateTime.nullable()
});

export const medicalExpenseInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid,
  expense_date: isoDate,
  provider_entity_id: uuid.nullable().optional(),
  amount: z.number(),
  description: z.string().nullable().optional(),
  paid_by: z.string().nullable().optional(),
  created_at: isoDateTime.nullable().optional()
});

export const medicalExpenseUpdateSchema = medicalExpenseInsertSchema.partial();
