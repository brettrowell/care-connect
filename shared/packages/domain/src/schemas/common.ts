import { z } from "zod";

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function isValidIsoDate(value: string): boolean {
  if (!isoDatePattern.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return false;
  return date.toISOString().startsWith(value);
}

export const isoDate = z.string().refine(isValidIsoDate, "Invalid ISO date");
export const isoDateTime = z.string().datetime();

export const id = (prefix: string) => z.string().regex(new RegExp(`^${prefix}_[A-Za-z0-9-]+$`));
