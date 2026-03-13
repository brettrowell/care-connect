import { prescriptionInsertSchema } from "./schema.zod";
import type { PrescriptionInsert } from "./types";

export function parsePrescriptionInsert(input: unknown): PrescriptionInsert {
  return prescriptionInsertSchema.parse(input);
}
