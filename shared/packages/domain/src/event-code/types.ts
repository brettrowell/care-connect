import type { Database } from "@care-connect/db";

export type EventCodeRow = Database["public"]["Tables"]["event_codes"]["Row"];
export type EventCodeInsert = Database["public"]["Tables"]["event_codes"]["Insert"];
export type EventCodeUpdate = Database["public"]["Tables"]["event_codes"]["Update"];
export type EventCodeId = EventCodeRow["id"];
