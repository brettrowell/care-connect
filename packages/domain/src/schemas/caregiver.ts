import { z } from "zod";
import { id, isoDateTime } from "./common";

export const caregiverSchema = z.object({
  id: id("cgv"),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(["nurse", "aide", "therapist", "family", "admin"]),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  createdAt: isoDateTime,
  updatedAt: isoDateTime
});
