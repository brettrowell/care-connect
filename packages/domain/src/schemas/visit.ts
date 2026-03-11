import { z } from "zod";
import { id, isoDateTime } from "./common";

export const visitSchema = z.object({
  id: id("vst"),
  patientId: id("pat"),
  caregiverId: id("cgv").optional(),
  scheduledStart: isoDateTime,
  scheduledEnd: isoDateTime.optional(),
  status: z.enum(["scheduled", "in_progress", "completed", "cancelled"]),
  location: z.string().optional(),
  createdAt: isoDateTime,
  updatedAt: isoDateTime
});
