import type { VisitId, PatientId, CaregiverId } from "./ids";

export type Visit = {
  id: VisitId;
  patientId: PatientId;
  caregiverId?: CaregiverId;
  scheduledStart: string; // ISO timestamp
  scheduledEnd?: string; // ISO timestamp
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  location?: string;
  createdAt: string;
  updatedAt: string;
};
