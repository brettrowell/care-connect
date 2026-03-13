import type { Database } from "@care-connect/db";

export type InsuranceRow = Database["public"]["Tables"]["insurances"]["Row"];
export type InsuranceInsert = Database["public"]["Tables"]["insurances"]["Insert"];
export type InsuranceUpdate = Database["public"]["Tables"]["insurances"]["Update"];
export type InsuranceId = InsuranceRow["id"];
