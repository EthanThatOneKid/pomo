import { StoredPatternStorer } from "../storer.ts";
import { AddPatternQuery } from "../../v8n/add_pattern_query.ts";
import { StoredPattern } from "../../v8n/stored_pattern.ts";

// Select all queried stored patterns from StoredPatternStorer.
export function addPattern(db: StoredPatternStorer, query: AddPatternQuery) {
  return db.insertInto("patterns")
    .values(makeStoredPattern(query))
    .execute();
}

function makeStoredPattern(
  query: AddPatternQuery,
  timestamp = new Date(),
): StoredPattern {
  return StoredPattern.parse({
    author_id: query.author_id,
    display_name: query.display_name,
    note: query.note,
    pattern: query.pattern,
    created_at: timestamp,
    updated_at: timestamp,
  });
}
