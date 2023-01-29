import { z } from "../deps.ts";

export const Pattern = z.object({
  pattern: z.array(z.number().min(1)),
  author_id: z.string(),
  display_name: z.string().min(1).max(255),
  note: z.string().min(1).max(2e3).optional(),
});

export type StoredPattern = z.infer<typeof Pattern>;
