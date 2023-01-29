import { z } from "../deps.ts";

/**
 * Query for retrieving a list of stored patterns by author ID, pattern ID,
 * author display name, note text content, or a combination of these.
 */
export const GetStoredPatternListQuery = z.object({
  author_id: z.string().optional(),
  pattern_id: z.number().optional(),
  author_display_name: z.string().optional(),
  note: z.string().optional(),
});

export type GetStoredPatternListQuery = z.infer<
  typeof GetStoredPatternListQuery
>;
