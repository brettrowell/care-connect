import type { Database } from "@care-connect/db";

export type PrescriptionRow = Database["public"]["Tables"]["prescriptions"]["Row"];
export type PrescriptionInsert = Database["public"]["Tables"]["prescriptions"]["Insert"];
export type PrescriptionUpdate = Database["public"]["Tables"]["prescriptions"]["Update"];
export type PrescriptionId = PrescriptionRow["id"];
