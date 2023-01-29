import { z } from "../deps.ts";
import { Pattern } from "./pattern.ts";

/**
 * Query for adding a pattern to the database.
 */
export const AddPatternQuery = Pattern;

export type AddPatternQuery = z.infer<typeof AddPatternQuery>;
