import { z } from "zod";
import { uuid } from "../shared/schema.zod";

export const eventCodeRowSchema = z.object({
  id: uuid,
  patient_event_id: uuid,
  clinical_code_id: uuid
});

export const eventCodeInsertSchema = z.object({
  id: uuid.optional(),
  patient_event_id: uuid,
  clinical_code_id: uuid
});

export const eventCodeUpdateSchema = eventCodeInsertSchema.partial();
