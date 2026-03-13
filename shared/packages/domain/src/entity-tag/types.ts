import type { Database } from "@care-connect/db";

export type EntityTagRow = Database["public"]["Tables"]["entity_tags"]["Row"];
export type EntityTagInsert = Database["public"]["Tables"]["entity_tags"]["Insert"];
export type EntityTagUpdate = Database["public"]["Tables"]["entity_tags"]["Update"];
export type EntityTagId = EntityTagRow["id"];
