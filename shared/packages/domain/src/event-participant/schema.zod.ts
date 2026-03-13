import { z } from "zod";
import { isoDateTime, uuid } from "../shared/schema.zod";

export const eventParticipantRowSchema = z.object({
  id: uuid,
  patient_event_id: uuid,
  entity_id: uuid,
  role: z.string().nullable(),
  created_at: isoDateTime.nullable()
});

export const eventParticipantInsertSchema = z.object({
  id: uuid.optional(),
  patient_event_id: uuid,
  entity_id: uuid,
  role: z.string().nullable().optional(),
  created_at: isoDateTime.nullable().optional()
});

export const eventParticipantUpdateSchema = eventParticipantInsertSchema.partial();
