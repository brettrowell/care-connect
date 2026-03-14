import { familySupportInsertSchema } from "./schema.zod";
import type { FamilySupportInsert } from "./types";

export function parseFamilySupportInsert(input: unknown): FamilySupportInsert {
  return familySupportInsertSchema.parse(input);
}
