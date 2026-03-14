import { z } from "zod";
import { isoDate, isoDateTime, uuid } from "../shared/schema.zod";

export const patientRowSchema = z.object({
  id: uuid,
  group_id: uuid,
  user_id: uuid.nullable(),
  created_at: isoDateTime.nullable(),
  patient_type: z.string().nullable(),
  date_of_birth: isoDate.nullable(),
  blood_type: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"])
    .nullable(),
  language: z.string().nullable(),
  interpreter_needed: z.boolean().nullable(),
  address_id: uuid.nullable(),
  person_id: uuid.nullable(),
  ssn_last4: z.string().nullable()
});

export const patientInsertSchema = z.object({
  id: uuid.optional(),
  group_id: uuid,
  user_id: uuid.nullable().optional(),
  created_at: isoDateTime.nullable().optional(),
  patient_type: z.string().nullable().optional(),
  date_of_birth: isoDate.nullable().optional(),
  blood_type: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"])
    .nullable()
    .optional(),
  language: z.string().nullable().optional(),
  interpreter_needed: z.boolean().nullable().optional(),
  address_id: uuid.nullable().optional(),
  person_id: uuid.nullable().optional(),
  ssn_last4: z.string().nullable().optional()
});

export const patientUpdateSchema = patientInsertSchema.partial();
