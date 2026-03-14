import { z } from "zod";
import { isoDate, isoDateTime, uuid } from "../shared/schema.zod";

export const prescriptionRowSchema = z.object({
  id: uuid,
  patient_id: uuid,
  medication: z.string(),
  dosage: z.string(),
  frequency: z.string(),
  duration: z.string().nullable(),
  route: z.string().nullable(),
  possible_side_effects: z.string().nullable(),
  instructions: z.string().nullable(),
  pharmacy_notes: z.string().nullable(),
  active: z.boolean(),
  start_date: isoDate,
  end_date: isoDate.nullable(),
  prescribed_date: isoDate.nullable(),
  status: z.string().nullable(),
  notes: z.string().nullable(),
  created_at: isoDateTime.nullable(),
  updated_at: isoDateTime.nullable(),
  deleted_at: isoDateTime.nullable(),
  prescribing_entity_id: uuid.nullable(),
  reason: z.string().nullable(),
  pharmacy_entity_id: uuid.nullable(),
  prescribing_physician_id: uuid.nullable()
});

export const prescriptionInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid,
  medication: z.string(),
  dosage: z.string(),
  frequency: z.string(),
  duration: z.string().nullable().optional(),
  route: z.string().nullable().optional(),
  possible_side_effects: z.string().nullable().optional(),
  instructions: z.string().nullable().optional(),
  pharmacy_notes: z.string().nullable().optional(),
  active: z.boolean().optional(),
  start_date: isoDate.optional(),
  end_date: isoDate.nullable().optional(),
  prescribed_date: isoDate.nullable().optional(),
  status: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  created_at: isoDateTime.nullable().optional(),
  updated_at: isoDateTime.nullable().optional(),
  deleted_at: isoDateTime.nullable().optional(),
  prescribing_entity_id: uuid.nullable().optional(),
  reason: z.string().nullable().optional(),
  pharmacy_entity_id: uuid.nullable().optional(),
  prescribing_physician_id: uuid.nullable().optional()
});

export const prescriptionUpdateSchema = prescriptionInsertSchema.partial();
