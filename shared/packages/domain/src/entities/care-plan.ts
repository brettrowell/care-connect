import type { CarePlanId, PatientId, CareTeamId } from "./ids";

export type CarePlan = {
  id: CarePlanId;
  patientId: PatientId;
  careTeamId?: CareTeamId;
  title: string;
  status: "draft" | "active" | "completed" | "archived";
  startDate?: string; // ISO date
  endDate?: string; // ISO date
  createdAt: string;
  updatedAt: string;
};
