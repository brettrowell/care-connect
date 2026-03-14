import { contactMethodInsertSchema } from "./schema.zod";
import type { ContactMethodInsert } from "./types";

export function parseContactMethodInsert(input: unknown): ContactMethodInsert {
  return contactMethodInsertSchema.parse(input);
}
