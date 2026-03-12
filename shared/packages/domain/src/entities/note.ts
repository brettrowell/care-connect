import type { NoteId, PatientId, CaregiverId } from "./ids";

export type Note = {
  id: NoteId;
  patientId: PatientId;
  authorId: CaregiverId;
  body: string;
  createdAt: string;
  updatedAt: string;
};
