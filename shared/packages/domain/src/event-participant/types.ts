import type { Database } from "@care-connect/db";

export type EventParticipantRow = Database["public"]["Tables"]["event_participants"]["Row"];
export type EventParticipantInsert = Database["public"]["Tables"]["event_participants"]["Insert"];
export type EventParticipantUpdate = Database["public"]["Tables"]["event_participants"]["Update"];
export type EventParticipantId = EventParticipantRow["id"];
