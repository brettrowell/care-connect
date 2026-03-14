import type { Database } from "@care-connect/db";

export type EntityAttributeRow = Database["public"]["Tables"]["entity_attributes"]["Row"];
export type EntityAttributeInsert = Database["public"]["Tables"]["entity_attributes"]["Insert"];
export type EntityAttributeUpdate = Database["public"]["Tables"]["entity_attributes"]["Update"];
export type EntityAttributeId = EntityAttributeRow["id"];
