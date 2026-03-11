import { z } from "zod";
import { id, isoDateTime } from "./common";

export const noteSchema = z.object({
  id: id("nte"),
  patientId: id("pat"),
  authorId: id("cgv"),
  body: z.string().min(1),
  createdAt: isoDateTime,
  updatedAt: isoDateTime
});
