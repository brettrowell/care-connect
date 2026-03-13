import type { Database } from "@care-connect/db";

export type ContactMethodRow = Database["public"]["Tables"]["contact_methods"]["Row"];
export type ContactMethodInsert = Database["public"]["Tables"]["contact_methods"]["Insert"];
export type ContactMethodUpdate = Database["public"]["Tables"]["contact_methods"]["Update"];
export type ContactMethodId = ContactMethodRow["id"];
