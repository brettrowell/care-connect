import { z } from "zod";
import { isoDate, isoDateTime, uuid } from "../shared/schema.zod";

export const insuranceRowSchema = z.object({
  id: uuid,
  patient_id: uuid,
  policy_number: z.string(),
  group_number: z.string().nullable(),
  phone_number: z.string().nullable(),
  deductible_amount: z.number().nullable(),
  active_start_date: isoDate,
  active_end_date: isoDate.nullable(),
  insurance_type: z.enum(["primary", "secondary", "tertiary", "other"]),
  policy_holder_contact_id: uuid.nullable(),
  created_at: isoDateTime.nullable(),
  updated_at: isoDateTime.nullable(),
  organization_id: uuid.nullable(),
  policy_holder_person_id: uuid.nullable()
});

export const insuranceInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid,
  policy_number: z.string(),
  group_number: z.string().nullable().optional(),
  phone_number: z.string().nullable().optional(),
  deductible_amount: z.number().nullable().optional(),
  active_start_date: isoDate,
  active_end_date: isoDate.nullable().optional(),
  insurance_type: z.enum(["primary", "secondary", "tertiary", "other"]),
  policy_holder_contact_id: uuid.nullable().optional(),
  created_at: isoDateTime.nullable().optional(),
  updated_at: isoDateTime.nullable().optional(),
  organization_id: uuid.nullable().optional(),
  policy_holder_person_id: uuid.nullable().optional()
});

export const insuranceUpdateSchema = insuranceInsertSchema.partial();
