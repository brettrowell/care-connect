import type { Database } from "@care-connect/db";

export type PatientAppointmentRow = Database["public"]["Tables"]["patient_appointments"]["Row"];
export type PatientAppointmentInsert = Database["public"]["Tables"]["patient_appointments"]["Insert"];
export type PatientAppointmentUpdate = Database["public"]["Tables"]["patient_appointments"]["Update"];
export type PatientAppointmentId = PatientAppointmentRow["id"];
