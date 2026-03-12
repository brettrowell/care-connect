import type { GroupId } from "./ids";

export type Group = {
  id: GroupId;
  name: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
};
