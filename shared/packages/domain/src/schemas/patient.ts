import { z } from "zod";
import { id, isoDate, isoDateTime } from "./common";

export const patientSchema = z.object({
  id: id("pat"),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: isoDate.optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  createdAt: isoDateTime,
  updatedAt: isoDateTime
});
