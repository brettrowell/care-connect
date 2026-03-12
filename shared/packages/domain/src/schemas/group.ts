import { z } from "zod";
import { id, isoDateTime } from "./common";

export const groupSchema = z.object({
  id: id("grp"),
  name: z.string().min(1),
  createdAt: isoDateTime,
  updatedAt: isoDateTime
});
