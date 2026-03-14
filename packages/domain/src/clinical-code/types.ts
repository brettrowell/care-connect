import type { Database } from "@care-connect/db";

export type ClinicalCodeRow = Database["public"]["Tables"]["clinical_codes"]["Row"];
export type ClinicalCodeInsert = Database["public"]["Tables"]["clinical_codes"]["Insert"];
export type ClinicalCodeUpdate = Database["public"]["Tables"]["clinical_codes"]["Update"];
export type ClinicalCodeId = ClinicalCodeRow["id"];
