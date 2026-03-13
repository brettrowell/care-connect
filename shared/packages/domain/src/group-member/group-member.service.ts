import { groupMemberInsertSchema } from "./schema.zod";
import type { GroupMemberInsert } from "./types";

export function parseGroupMemberInsert(input: unknown): GroupMemberInsert {
  return groupMemberInsertSchema.parse(input);
}
