import { addressInsertSchema } from "./schema.zod";
import type { AddressInsert } from "./types";

export function parseAddressInsert(input: unknown): AddressInsert {
  return addressInsertSchema.parse(input);
}
