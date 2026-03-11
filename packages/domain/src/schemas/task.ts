import { z } from "zod";
import { id, isoDate, isoDateTime } from "./common";

export const taskSchema = z.object({
  id: id("tsk"),
  carePlanId: id("cpl"),
  patientId: id("pat"),
  assigneeId: id("cgv").optional(),
  title: z.string().min(1),
  status: z.enum(["todo", "in_progress", "done", "cancelled"]),
  dueDate: isoDate.optional(),
  createdAt: isoDateTime,
  updatedAt: isoDateTime
});
