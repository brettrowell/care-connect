import { z } from "zod";
import { id, isoDateTime } from "./common";

export const careTeamSchema = z.object({
  id: id("ctm"),
  name: z.string().min(1),
  patientId: id("pat"),
  caregiverIds: z.array(id("cgv")),
  createdAt: isoDateTime,
  updatedAt: isoDateTime
});
