import { z } from "../deps.ts";

import { zutils } from "./zutils.ts";

export const StoredResource = z.object({
  id: zutils.generatedNumber(),
  ...(zutils.timestamps()),
});

export type StoredResource = z.infer<typeof StoredResource>;
