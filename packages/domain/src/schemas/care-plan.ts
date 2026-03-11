import { z } from "zod";
import { id, isoDate, isoDateTime } from "./common";

export const carePlanSchema = z.object({
  id: id("cpl"),
  patientId: id("pat"),
  careTeamId: id("ctm").optional(),
  title: z.string().min(1),
  status: z.enum(["draft", "active", "completed", "archived"]),
  startDate: isoDate.optional(),
  endDate: isoDate.optional(),
  createdAt: isoDateTime,
  updatedAt: isoDateTime
});
