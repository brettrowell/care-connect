import type { Database } from "@care-connect/db";

export type PatientEquipmentRow = Database["public"]["Tables"]["patient_equipment"]["Row"];
export type PatientEquipmentInsert = Database["public"]["Tables"]["patient_equipment"]["Insert"];
export type PatientEquipmentUpdate = Database["public"]["Tables"]["patient_equipment"]["Update"];
export type PatientEquipmentId = PatientEquipmentRow["id"];
