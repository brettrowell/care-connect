import type { Database } from "@care-connect/db";

export type AddressRow = Database["public"]["Tables"]["addresses"]["Row"];
export type AddressInsert = Database["public"]["Tables"]["addresses"]["Insert"];
export type AddressUpdate = Database["public"]["Tables"]["addresses"]["Update"];
export type AddressId = AddressRow["id"];
