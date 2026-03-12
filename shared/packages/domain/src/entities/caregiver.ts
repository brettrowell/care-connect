import type { CaregiverId } from "./ids";

export type Caregiver = {
  id: CaregiverId;
  firstName: string;
  lastName: string;
  role: "nurse" | "aide" | "therapist" | "family" | "admin";
  phone?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
};
