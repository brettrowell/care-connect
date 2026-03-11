import type { CarePlan, CarePlanId, PatientId } from "../entities";

export function createCarePlanDraft(input: {
  id: CarePlanId;
  patientId: PatientId;
  title: string;
  createdAt: string;
}): CarePlan {
  return {
    id: input.id,
    patientId: input.patientId,
    title: input.title,
    status: "draft",
    createdAt: input.createdAt,
    updatedAt: input.createdAt
  };
}
