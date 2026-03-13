import { diagnosisInsertSchema } from "./schema.zod";
import type { DiagnosisInsert } from "./types";

export function parseDiagnosisInsert(input: unknown): DiagnosisInsert {
  return diagnosisInsertSchema.parse(input);
}
