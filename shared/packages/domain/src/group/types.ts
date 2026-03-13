import type { Database } from "@care-connect/db";

export type GroupRow = Database["public"]["Tables"]["groups"]["Row"];
export type GroupInsert = Database["public"]["Tables"]["groups"]["Insert"];
export type GroupUpdate = Database["public"]["Tables"]["groups"]["Update"];
export type GroupId = GroupRow["id"];
