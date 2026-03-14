import { insuranceInsertSchema } from "./schema.zod";
import type { InsuranceInsert } from "./types";

export function parseInsuranceInsert(input: unknown): InsuranceInsert {
  return insuranceInsertSchema.parse(input);
}
