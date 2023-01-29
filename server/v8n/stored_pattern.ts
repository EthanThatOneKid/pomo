import { z } from "../deps.ts";

import { StoredResource } from "./stored_resource.ts";
import { Pattern } from "./pattern.ts";

export const StoredPattern = StoredResource.merge(Pattern);

export type StoredPattern = z.infer<typeof StoredPattern>;
