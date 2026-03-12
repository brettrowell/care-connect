import type { EntityId, GroupId } from "./ids";

export type Entity = {
  id: EntityId;
  groupId?: GroupId;
  name: string;
  type: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
};
