import { Kysely, z } from "../../deps.ts";

import { zutils } from "../mod.ts";

export const StoredPattern = z.object({
  id: zutils.generatedNumber(),
  pattern: z.string().min(1).max(255),
  author_id: z.string(),
  note: z.string().optional().min(1).max(255),
  ...(zutils.timestamps()),
});

export type StoredPattern = z.infer<typeof StoredPattern>;

export const StoredPatternTable = z.object({
  pattern: StoredPattern,
});

export type StoredPatternTable = z.infer<typeof StoredPatternTable>;

export const GetStoredPatternsQuery = z.object({
  author_id: z.string(),
});

export type GetStoredPatternsQuery = z.infer<typeof GetStoredPatternsQuery>;

export function getStoredPatterns(db: Kysely<StoredPatternTable>) {
  return db
    .selectFrom("pattern")
    .selectAll();
}
