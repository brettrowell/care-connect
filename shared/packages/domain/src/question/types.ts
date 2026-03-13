import type { Database } from "@care-connect/db";

export type QuestionRow = Database["public"]["Tables"]["questions"]["Row"];
export type QuestionInsert = Database["public"]["Tables"]["questions"]["Insert"];
export type QuestionUpdate = Database["public"]["Tables"]["questions"]["Update"];
export type QuestionId = QuestionRow["id"];
