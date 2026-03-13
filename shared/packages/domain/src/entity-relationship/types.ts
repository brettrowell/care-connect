import type { Database } from "@care-connect/db";

export type EntityRelationshipRow = Database["public"]["Tables"]["entity_relationships"]["Row"];
export type EntityRelationshipInsert = Database["public"]["Tables"]["entity_relationships"]["Insert"];
export type EntityRelationshipUpdate = Database["public"]["Tables"]["entity_relationships"]["Update"];
export type EntityRelationshipId = EntityRelationshipRow["id"];
