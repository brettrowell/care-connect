import type { Database } from "@care-connect/db";

export type EntityTypeRow = Database["public"]["Tables"]["entity_types"]["Row"];
export type EntityTypeInsert = Database["public"]["Tables"]["entity_types"]["Insert"];
export type EntityTypeUpdate = Database["public"]["Tables"]["entity_types"]["Update"];
export type EntityTypeId = EntityTypeRow["id"];
