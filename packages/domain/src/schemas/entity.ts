import { z } from "zod";
import { id, isoDateTime } from "./common";

export const entitySchema = z.object({
  id: id("ent"),
  groupId: id("grp").optional(),
  name: z.string().min(1),
  type: z.string().min(1),
  createdAt: isoDateTime,
  updatedAt: isoDateTime
});
