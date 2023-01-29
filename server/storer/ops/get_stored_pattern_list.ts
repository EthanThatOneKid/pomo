import { StoredPatternStorer } from "../storer.ts";
import { GetStoredPatternListQuery } from "../../v8n/get_stored_pattern_list_query.ts";

// Select all queried stored patterns from StoredPatternStorer.
export function getStoredPatternList(
  db: StoredPatternStorer,
  query: GetStoredPatternListQuery = {},
) {
  let builder = db.selectFrom("patterns")
    .selectAll();

  if (query.pattern_id) {
    builder = builder.where("id", "=", query.pattern_id);
  }

  if (query.author_id) {
    builder = builder.where("author_id", "=", query.author_id);
  }

  if (query.author_display_name) {
    builder = builder.where(
      "display_name",
      "like",
      `%${query.author_display_name}%`,
    );
  }

  if (query.note) {
    builder = builder.where("note", "like", `%${query.note}%`);
  }

  return builder
    .orderBy("updated_at", "desc")
    .execute();
}
