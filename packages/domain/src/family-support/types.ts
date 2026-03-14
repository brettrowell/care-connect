import type { Database } from "@care-connect/db";

export type FamilySupportRow = Database["public"]["Tables"]["family_supports"]["Row"];
export type FamilySupportInsert = Database["public"]["Tables"]["family_supports"]["Insert"];
export type FamilySupportUpdate = Database["public"]["Tables"]["family_supports"]["Update"];
export type FamilySupportId = FamilySupportRow["id"];
