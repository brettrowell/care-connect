import type { CareTeamId, CaregiverId, PatientId } from "./ids";

export type CareTeam = {
  id: CareTeamId;
  name: string;
  patientId: PatientId;
  caregiverIds: CaregiverId[];
  createdAt: string;
  updatedAt: string;
};
