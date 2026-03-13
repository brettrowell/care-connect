import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3001)
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
