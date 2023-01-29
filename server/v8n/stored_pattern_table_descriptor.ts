import { z } from "../deps.ts";

import { StoredPattern } from "./stored_pattern.ts";

export const StoredPatternTableDescriptor = z.object({
  patterns: StoredPattern,
});

export type StoredPatternTableDescriptor = z.infer<
  typeof StoredPatternTableDescriptor
>;
