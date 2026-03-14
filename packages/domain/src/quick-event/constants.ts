/** Category used in event_types for quick care log (matches migration seed). */
export const QUICK_EVENT_CATEGORY = "quick" as const;

/** Display names for quick event types (must match event_types.name in DB). */
export const QUICK_EVENT_TYPE_NAMES = [
  "Bowel movement",
  "Feeding",
  "Vomit",
  "Medication"
] as const;

export type QuickEventTypeName = (typeof QUICK_EVENT_TYPE_NAMES)[number];
