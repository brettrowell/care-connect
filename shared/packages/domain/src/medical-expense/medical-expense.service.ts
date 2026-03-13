import { medicalExpenseInsertSchema } from "./schema.zod";
import type { MedicalExpenseInsert } from "./types";

export function parseMedicalExpenseInsert(input: unknown): MedicalExpenseInsert {
  return medicalExpenseInsertSchema.parse(input);
}
