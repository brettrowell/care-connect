import { z } from "zod";
import { isoDate, isoDateTime, uuid } from "../shared/schema.zod";

export const patientCareTeamRowSchema = z.object({
  id: uuid,
  patient_id: uuid.nullable(),
  role_category: z.enum(["primary", "specialist", "therapist", "other"]).nullable(),
  is_active: z.boolean().nullable(),
  start_date: isoDate.nullable(),
  end_date: isoDate.nullable(),
  created_at: isoDateTime.nullable(),
  provider_entity_id: uuid.nullable()
});

export const patientCareTeamInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid.nullable().optional(),
  role_category: z.enum(["primary", "specialist", "therapist", "other"]).nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  start_date: isoDate.nullable().optional(),
  end_date: isoDate.nullable().optional(),
  created_at: isoDateTime.nullable().optional(),
  provider_entity_id: uuid.nullable().optional()
});

export const patientCareTeamUpdateSchema = patientCareTeamInsertSchema.partial();
