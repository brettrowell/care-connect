import type { PatientId } from "./ids";

export type Patient = {
  id: PatientId;
  firstName: string;
  lastName: string;
  dateOfBirth?: string; // ISO date
  phone?: string;
  email?: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
};
