import { z } from "zod";
import { uuid } from "../shared/schema.zod";

export const groupMemberRowSchema = z.object({
  group_id: uuid,
  user_id: uuid,
  role: z.enum(["owner", "admin", "member", "patient"])
});

export const groupMemberInsertSchema = groupMemberRowSchema;

export const groupMemberUpdateSchema = groupMemberRowSchema.partial();
