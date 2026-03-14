import type { QuickEventTypeName } from "./constants";

export type QuickEventFormInput = {
  eventTypeName: QuickEventTypeName;
  description: string;
  notes?: string | null;
};
