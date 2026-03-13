import { z } from "zod";
import { isoDate, isoDateTime, uuid } from "../shared/schema.zod";

export const patientSupplyRowSchema = z.object({
  id: uuid,
  patient_id: uuid,
  name: z.string(),
  description: z.string().nullable(),
  item_number: z.string().nullable(),
  quantity: z.number().int(),
  date_ordered: isoDate,
  date_received: isoDate.nullable(),
  quantity_back_ordered: z.number().int().nullable(),
  schedule: z
    .enum(["daily", "weekly", "monthly", "quarterly", "as_needed", "one_time"])
    .nullable(),
  comments: z.string().nullable(),
  created_at: isoDateTime.nullable(),
  updated_at: isoDateTime.nullable(),
  status: z.string().nullable(),
  deleted_at: isoDateTime.nullable(),
  organization_id: uuid.nullable()
});

export const patientSupplyInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid,
  name: z.string(),
  description: z.string().nullable().optional(),
  item_number: z.string().nullable().optional(),
  quantity: z.number().int(),
  date_ordered: isoDate,
  date_received: isoDate.nullable().optional(),
  quantity_back_ordered: z.number().int().nullable().optional(),
  schedule: z
    .enum(["daily", "weekly", "monthly", "quarterly", "as_needed", "one_time"])
    .nullable()
    .optional(),
  comments: z.string().nullable().optional(),
  created_at: isoDateTime.nullable().optional(),
  updated_at: isoDateTime.nullable().optional(),
  status: z.string().nullable().optional(),
  deleted_at: isoDateTime.nullable().optional(),
  organization_id: uuid.nullable().optional()
});

export const patientSupplyUpdateSchema = patientSupplyInsertSchema.partial();
