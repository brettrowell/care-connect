import type { Database } from "@care-connect/db";

export type EventTypeRow = Database["public"]["Tables"]["event_types"]["Row"];
export type EventTypeInsert = Database["public"]["Tables"]["event_types"]["Insert"];
export type EventTypeUpdate = Database["public"]["Tables"]["event_types"]["Update"];
export type EventTypeId = EventTypeRow["id"];
