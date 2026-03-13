import type { Database } from "@care-connect/db";

export type EntityRow = Database["public"]["Tables"]["entities"]["Row"];
export type EntityInsert = Database["public"]["Tables"]["entities"]["Insert"];
export type EntityUpdate = Database["public"]["Tables"]["entities"]["Update"];
export type EntityId = EntityRow["id"];
