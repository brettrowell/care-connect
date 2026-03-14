import { clinicalCodeInsertSchema } from "./schema.zod";
import type { ClinicalCodeInsert } from "./types";

export function parseClinicalCodeInsert(input: unknown): ClinicalCodeInsert {
  return clinicalCodeInsertSchema.parse(input);
}
