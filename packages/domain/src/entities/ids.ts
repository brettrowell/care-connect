export type Id<T extends string> = `${T}_${string}`;

export type PatientId = Id<"pat">;
export type GroupId = Id<"grp">;
export type EntityId = Id<"ent">;
export type CaregiverId = Id<"cgv">;
export type CareTeamId = Id<"ctm">;
export type CarePlanId = Id<"cpl">;
export type TaskId = Id<"tsk">;
export type VisitId = Id<"vst">;
export type NoteId = Id<"nte">;
