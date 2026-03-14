import { z } from "zod";

export const uuid = z.string().uuid();
export const isoDate = z.string().date();
export const isoDateTime = z.string().datetime({ offset: true });
