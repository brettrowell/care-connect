import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const patientAnswerRowSchema = z.object({
  id: uuid,
  patient_id: uuid,
  question_id: uuid.nullable(),
  custom_question_text: z.string().nullable(),
  question_type: z.enum(["boolean", "text", "other"]),
  answer_boolean: z.boolean().nullable(),
  answer_text: z.string().nullable(),
  created_at: isoDateTime.nullable(),
  updated_at: isoDateTime.nullable()
});

export const patientAnswerInsertSchema = z.object({
  id: uuid.optional(),
  patient_id: uuid,
  question_id: uuid.nullable().optional(),
  custom_question_text: z.string().nullable().optional(),
  question_type: z.enum(["boolean", "text", "other"]),
  answer_boolean: z.boolean().nullable().optional(),
  answer_text: z.string().nullable().optional(),
  created_at: isoDateTime.nullable().optional(),
  updated_at: isoDateTime.nullable().optional()
});

export const patientAnswerUpdateSchema = patientAnswerInsertSchema.partial();
