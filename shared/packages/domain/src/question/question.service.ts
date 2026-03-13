import { questionInsertSchema } from "./schema.zod";
import type { QuestionInsert } from "./types";

export function parseQuestionInsert(input: unknown): QuestionInsert {
  return questionInsertSchema.parse(input);
}
