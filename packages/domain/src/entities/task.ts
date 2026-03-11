import type { TaskId, CarePlanId, PatientId, CaregiverId } from "./ids";

export type Task = {
  id: TaskId;
  carePlanId: CarePlanId;
  patientId: PatientId;
  assigneeId?: CaregiverId;
  title: string;
  status: "todo" | "in_progress" | "done" | "cancelled";
  dueDate?: string; // ISO date
  createdAt: string;
  updatedAt: string;
};
